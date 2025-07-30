import React, { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Plus, Edit, Trash2, Save, X } from 'lucide-react';

interface TeamMember {
  id: string;
  name: string;
  role: string;
  email?: string;
  bio?: string;
  image?: string;
  linkedin_url?: string;
  github_url?: string;
  expertise?: string[];
  display_order: number;
  active: boolean;
}

const TeamManagement = () => {
  const [members, setMembers] = useState<TeamMember[]>([]);
  const [editingMember, setEditingMember] = useState<TeamMember | null>(null);
  const [isAdding, setIsAdding] = useState(false);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetchTeamMembers();
  }, []);

  const fetchTeamMembers = async () => {
    const { data, error } = await supabase
      .from('team_members')
      .select('*')
      .order('display_order', { ascending: true });

    if (error) {
      toast({
        title: "Error",
        description: "Failed to fetch team members",
        variant: "destructive"
      });
    } else {
      setMembers(data || []);
    }
    setLoading(false);
  };

  const handleSave = async (member: Partial<TeamMember>) => {
    if (member.id) {
      // Update existing member
      const { error } = await supabase
        .from('team_members')
        .update({
          name: member.name,
          role: member.role,
          email: member.email,
          bio: member.bio,
          image: member.image,
          linkedin_url: member.linkedin_url,
          github_url: member.github_url,
          expertise: member.expertise?.filter(e => e.trim() !== ''),
          display_order: member.display_order,
          active: member.active
        })
        .eq('id', member.id);

      if (error) {
        toast({
          title: "Error",
          description: "Failed to update team member",
          variant: "destructive"
        });
      } else {
        toast({ title: "Success", description: "Team member updated" });
        fetchTeamMembers();
        setEditingMember(null);
      }
    } else {
      // Add new member
      const { error } = await supabase
        .from('team_members')
        .insert({
          name: member.name,
          role: member.role,
          email: member.email,
          bio: member.bio,
          image: member.image,
          linkedin_url: member.linkedin_url,
          github_url: member.github_url,
          expertise: member.expertise?.filter(e => e.trim() !== ''),
          display_order: member.display_order || 0,
          active: member.active ?? true
        });

      if (error) {
        toast({
          title: "Error",
          description: "Failed to add team member",
          variant: "destructive"
        });
      } else {
        toast({ title: "Success", description: "Team member added" });
        fetchTeamMembers();
        setIsAdding(false);
      }
    }
  };

  const handleDelete = async (id: string) => {
    const { error } = await supabase
      .from('team_members')
      .delete()
      .eq('id', id);

    if (error) {
      toast({
        title: "Error",
        description: "Failed to delete team member",
        variant: "destructive"
      });
    } else {
      toast({ title: "Success", description: "Team member deleted" });
      fetchTeamMembers();
    }
  };

  const MemberForm = ({ member, onSave, onCancel }: {
    member?: TeamMember;
    onSave: (member: Partial<TeamMember>) => void;
    onCancel: () => void;
  }) => {
    const [formData, setFormData] = useState({
      name: member?.name || '',
      role: member?.role || '',
      email: member?.email || '',
      bio: member?.bio || '',
      image: member?.image || '',
      linkedin_url: member?.linkedin_url || '',
      github_url: member?.github_url || '',
      expertise: member?.expertise?.join(', ') || '',
      display_order: member?.display_order || 0,
      active: member?.active ?? true
    });

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      onSave({
        ...member,
        ...formData,
        expertise: formData.expertise.split(',').map(s => s.trim()).filter(s => s !== '')
      });
    };

    return (
      <Card>
        <CardHeader>
          <CardTitle>{member ? 'Edit Team Member' : 'Add Team Member'}</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="name">Name *</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                />
              </div>
              <div>
                <Label htmlFor="role">Role *</Label>
                <Input
                  id="role"
                  value={formData.role}
                  onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="image">Image URL</Label>
                <Input
                  id="image"
                  value={formData.image}
                  onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                />
              </div>
            </div>

            <div>
              <Label htmlFor="bio">Bio</Label>
              <Textarea
                id="bio"
                value={formData.bio}
                onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                rows={3}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="linkedin">LinkedIn URL</Label>
                <Input
                  id="linkedin"
                  value={formData.linkedin_url}
                  onChange={(e) => setFormData({ ...formData, linkedin_url: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="github">GitHub URL</Label>
                <Input
                  id="github"
                  value={formData.github_url}
                  onChange={(e) => setFormData({ ...formData, github_url: e.target.value })}
                />
              </div>
            </div>

            <div>
              <Label htmlFor="expertise">Expertise (comma-separated)</Label>
              <Input
                id="expertise"
                value={formData.expertise}
                onChange={(e) => setFormData({ ...formData, expertise: e.target.value })}
                placeholder="React, TypeScript, Node.js"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="display_order">Display Order</Label>
                <Input
                  id="display_order"
                  type="number"
                  value={formData.display_order}
                  onChange={(e) => setFormData({ ...formData, display_order: parseInt(e.target.value) || 0 })}
                />
              </div>
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="active"
                  checked={formData.active}
                  onChange={(e) => setFormData({ ...formData, active: e.target.checked })}
                />
                <Label htmlFor="active">Active</Label>
              </div>
            </div>

            <div className="flex space-x-2">
              <Button type="submit">
                <Save className="h-4 w-4 mr-2" />
                Save
              </Button>
              <Button type="button" variant="outline" onClick={onCancel}>
                <X className="h-4 w-4 mr-2" />
                Cancel
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    );
  };

  if (loading) {
    return <div>Loading team members...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Team Management</h2>
          <p className="text-muted-foreground">Manage team member profiles</p>
        </div>
        <Button onClick={() => setIsAdding(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Add Team Member
        </Button>
      </div>

      {isAdding && (
        <MemberForm
          onSave={handleSave}
          onCancel={() => setIsAdding(false)}
        />
      )}

      {editingMember && (
        <MemberForm
          member={editingMember}
          onSave={handleSave}
          onCancel={() => setEditingMember(null)}
        />
      )}

      <div className="grid gap-4">
        {members.map((member) => (
          <Card key={member.id}>
            <CardContent className="p-4">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <h3 className="font-semibold">{member.name}</h3>
                  <p className="text-sm text-muted-foreground">{member.role}</p>
                  {member.email && <p className="text-sm">{member.email}</p>}
                  {member.expertise && member.expertise.length > 0 && (
                    <p className="text-sm mt-1">
                      <span className="font-medium">Expertise:</span> {member.expertise.join(', ')}
                    </p>
                  )}
                  <p className="text-xs text-muted-foreground mt-1">
                    Order: {member.display_order} | Status: {member.active ? 'Active' : 'Inactive'}
                  </p>
                </div>
                <div className="flex space-x-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => setEditingMember(member)}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={() => handleDelete(member.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default TeamManagement;