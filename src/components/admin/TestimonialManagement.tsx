import React, { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { v4 as uuidv4 } from 'uuid'; // Import uuidv4 for unique filenames
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Plus, Edit, Trash2, Save, X, Star } from 'lucide-react';

interface Testimonial {
  id: string;
  client_name: string;
  position?: string;
  company: string;
  content: string;
  impact?: string;
  rating?: number;
  image?: string;
  featured: boolean;
  active: boolean;
  display_order: number;
}

const TestimonialManagement = () => {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [editingTestimonial, setEditingTestimonial] = useState<Testimonial | null>(null);
  const [isAdding, setIsAdding] = useState(false);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const fetchTestimonials = async () => {
    const { data, error } = await supabase
      .from('testimonials')
      .select('*')
      .order('display_order', { ascending: true });

    if (error) {
      toast({
        title: "Error",
        description: "Failed to fetch testimonials",
        variant: "destructive"
      });
    } else {
      setTestimonials(data || []);
    }
    setLoading(false);
  };

  const handleSave = async (testimonial: Partial<Testimonial>) => {
    if (testimonial.id) {
      // Update existing testimonial
      const { error } = await supabase
        .from('testimonials')
        .update({
          client_name: testimonial.client_name,
          position: testimonial.position,
          company: testimonial.company,
          content: testimonial.content,
          impact: testimonial.impact,
          rating: testimonial.rating,
          image: testimonial.image,
          featured: testimonial.featured,
          active: testimonial.active,
          display_order: testimonial.display_order
        })
        .eq('id', testimonial.id);

      if (error) {
        toast({
          title: "Error",
          description: "Failed to update testimonial",
          variant: "destructive"
        });
      } else {
        toast({ title: "Success", description: "Testimonial updated" });
        fetchTestimonials();
        setEditingTestimonial(null);
      }
    } else {
      // Add new testimonial
      const { error } = await supabase
        .from('testimonials')
        .insert({
          client_name: testimonial.client_name,
          position: testimonial.position,
          company: testimonial.company,
          content: testimonial.content,
          impact: testimonial.impact,
          rating: testimonial.rating,
          image: testimonial.image,
          featured: testimonial.featured ?? false,
          active: testimonial.active ?? true,
          display_order: testimonial.display_order || 0
        });

      if (error) {
        toast({
          title: "Error",
          description: "Failed to add testimonial",
          variant: "destructive"
        });
      } else {
        toast({ title: "Success", description: "Testimonial added" });
        fetchTestimonials();
        setIsAdding(false);
      }
    }
  };

  const handleDelete = async (id: string) => {
    const { error } = await supabase
      .from('testimonials')
      .delete()
      .eq('id', id);

    if (error) {
      toast({
        title: "Error",
        description: "Failed to delete testimonial",
        variant: "destructive"
      });
    } else {
      toast({ title: "Success", description: "Testimonial deleted" });
      fetchTestimonials();
    }
  };

  const TestimonialForm = ({ testimonial, onSave, onCancel }: {
    testimonial?: Testimonial;
    onSave: (testimonial: Partial<Testimonial>) => void;
    onCancel: () => void;
  }) => {
    const [formData, setFormData] = useState({
      client_name: testimonial?.client_name || '',
      position: testimonial?.position || '',
      company: testimonial?.company || '',
      content: testimonial?.content || '',
      impact: testimonial?.impact || '',
      rating: testimonial?.rating || 5,
      image: testimonial?.image || '',
      featured: testimonial?.featured ?? false,
      active: testimonial?.active ?? true,
      display_order: testimonial?.display_order || 0
    });
    const [uploading, setUploading] = useState(false); // State for upload status

    // Handle image file upload to Supabase Storage
    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>): Promise<void> => {
      const file = e.target.files?.[0];
      if (!file) return;
      setUploading(true);
      try {
        const fileExt = file.name.split('.').pop();
        const fileName = `${uuidv4()}.${fileExt}`;
        const filePath = `team-members/${fileName}`; // Changed bucket path
        let { error: uploadError } = await supabase.storage.from('team-members').upload(filePath, file, {
          cacheControl: '3600',
          upsert: false
        });
        if (uploadError) throw uploadError;
        // Get public URL
        const { data } = supabase.storage.from('team-members').getPublicUrl(filePath);
        setFormData((prev) => ({ ...prev, image: data.publicUrl }));
      } catch (error) {
        toast({ title: 'Error', description: 'Image upload failed', variant: 'destructive' });
      } finally {
        setUploading(false);
      }
    };

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      onSave({
        ...testimonial,
        ...formData
      });
    };

    return (
      <Card>
        <CardHeader>
          <CardTitle>{testimonial ? 'Edit Testimonial' : 'Add Testimonial'}</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="client_name">Client Name *</Label>
                <Input
                  id="client_name"
                  value={formData.client_name}
                  onChange={(e) => setFormData({ ...formData, client_name: e.target.value })}
                  required
                />
              </div>
              <div>
                <Label htmlFor="company">Company *</Label>
                <Input
                  id="company"
                  value={formData.company}
                  onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="position">Position</Label>
                <Input
                  id="position"
                  value={formData.position}
                  onChange={(e) => setFormData({ ...formData, position: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="image">Client Image</Label>
                <Input
                  id="image"
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  disabled={uploading}
                />
                {uploading && <div className="text-xs text-muted-foreground mt-1">Uploading...</div>}
                {formData.image && (
                  <div className="mt-2">
                    <img src={formData.image} alt="Client" className="w-20 h-20 object-cover rounded-full border" />
                    <Input
                      className="mt-2"
                      value={formData.image}
                      onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                      placeholder="Image URL"
                    />
                  </div>
                )}
              </div>
            </div>

            <div>
              <Label htmlFor="content">Testimonial Content *</Label>
              <Textarea
                id="content"
                value={formData.content}
                onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                required
                rows={4}
              />
            </div>

            <div>
              <Label htmlFor="impact">Impact/Results</Label>
              <Textarea
                id="impact"
                value={formData.impact}
                onChange={(e) => setFormData({ ...formData, impact: e.target.value })}
                rows={3}
              />
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div>
                <Label htmlFor="rating">Rating (1-5)</Label>
                <Input
                  id="rating"
                  type="number"
                  min="1"
                  max="5"
                  value={formData.rating}
                  onChange={(e) => setFormData({ ...formData, rating: parseInt(e.target.value) || 5 })}
                />
              </div>
              <div>
                <Label htmlFor="display_order">Display Order</Label>
                <Input
                  id="display_order"
                  type="number"
                  value={formData.display_order}
                  onChange={(e) => setFormData({ ...formData, display_order: parseInt(e.target.value) || 0 })}
                />
              </div>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="featured"
                    checked={formData.featured}
                    onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                  />
                  <Label htmlFor="featured">Featured</Label>
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
    return <div>Loading testimonials...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Testimonials Management</h2>
          <p className="text-muted-foreground">Manage client testimonials and reviews</p>
        </div>
        <Button onClick={() => setIsAdding(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Add Testimonial
        </Button>
      </div>

      {isAdding && (
        <TestimonialForm
          onSave={handleSave}
          onCancel={() => setIsAdding(false)}
        />
      )}

      {editingTestimonial && (
        <TestimonialForm
          testimonial={editingTestimonial}
          onSave={handleSave}
          onCancel={() => setEditingTestimonial(null)}
        />
      )}

      <div className="grid gap-4">
        {testimonials.map((testimonial) => (
          <Card key={testimonial.id}>
            <CardContent className="p-4">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold">{testimonial.client_name}</h3>
                    <div className="flex">
                      {Array.from({ length: testimonial.rating || 5 }).map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {testimonial.position && `${testimonial.position}, `}{testimonial.company}
                  </p>
                  <p className="text-sm mt-1 line-clamp-2">{testimonial.content}</p>
                  {testimonial.impact && (
                    <p className="text-sm mt-1">
                      <span className="font-medium">Impact:</span> {testimonial.impact}
                    </p>
                  )}
                  <p className="text-xs text-muted-foreground mt-1">
                    Order: {testimonial.display_order} |
                    {testimonial.featured ? ' Featured' : ' Regular'} |
                    {testimonial.active ? ' Active' : ' Inactive'}
                  </p>
                </div>
                <div className="flex space-x-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => setEditingTestimonial(testimonial)}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={() => handleDelete(testimonial.id)}
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

export default TestimonialManagement;