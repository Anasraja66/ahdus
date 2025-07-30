import React, { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Plus, Edit, Trash2, Save, X } from 'lucide-react';

interface CaseStudy {
  id: string;
  title: string;
  category: string;
  industry: string;
  summary: string;
  impact: string;
  content?: string;
  icon?: string;
  image?: string;
  tags?: string[];
  featured: boolean;
  display_order: number;
}

const CaseStudyManagement = () => {
  const [caseStudies, setCaseStudies] = useState<CaseStudy[]>([]);
  const [editingStudy, setEditingStudy] = useState<CaseStudy | null>(null);
  const [isAdding, setIsAdding] = useState(false);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetchCaseStudies();
  }, []);

  const fetchCaseStudies = async () => {
    const { data, error } = await supabase
      .from('case_studies')
      .select('*')
      .order('display_order', { ascending: true });

    if (error) {
      toast({
        title: "Error",
        description: "Failed to fetch case studies",
        variant: "destructive"
      });
    } else {
      setCaseStudies(data || []);
    }
    setLoading(false);
  };

  const handleSave = async (study: Partial<CaseStudy>) => {
    if (study.id) {
      // Update existing case study
      const { error } = await supabase
        .from('case_studies')
        .update({
          title: study.title,
          category: study.category,
          industry: study.industry,
          summary: study.summary,
          impact: study.impact,
          content: study.content,
          icon: study.icon,
          image: study.image,
          tags: study.tags?.filter(t => t.trim() !== ''),
          featured: study.featured,
          display_order: study.display_order
        })
        .eq('id', study.id);

      if (error) {
        toast({
          title: "Error",
          description: "Failed to update case study",
          variant: "destructive"
        });
      } else {
        toast({ title: "Success", description: "Case study updated" });
        fetchCaseStudies();
        setEditingStudy(null);
      }
    } else {
      // Add new case study
      const { error } = await supabase
        .from('case_studies')
        .insert({
          title: study.title,
          category: study.category,
          industry: study.industry,
          summary: study.summary,
          impact: study.impact,
          content: study.content,
          icon: study.icon,
          image: study.image,
          tags: study.tags?.filter(t => t.trim() !== ''),
          featured: study.featured ?? false,
          display_order: study.display_order || 0
        });

      if (error) {
        toast({
          title: "Error",
          description: "Failed to add case study",
          variant: "destructive"
        });
      } else {
        toast({ title: "Success", description: "Case study added" });
        fetchCaseStudies();
        setIsAdding(false);
      }
    }
  };

  const handleDelete = async (id: string) => {
    const { error } = await supabase
      .from('case_studies')
      .delete()
      .eq('id', id);

    if (error) {
      toast({
        title: "Error",
        description: "Failed to delete case study",
        variant: "destructive"
      });
    } else {
      toast({ title: "Success", description: "Case study deleted" });
      fetchCaseStudies();
    }
  };

  const CaseStudyForm = ({ study, onSave, onCancel }: {
    study?: CaseStudy;
    onSave: (study: Partial<CaseStudy>) => void;
    onCancel: () => void;
  }) => {
    const [formData, setFormData] = useState({
      title: study?.title || '',
      category: study?.category || '',
      industry: study?.industry || '',
      summary: study?.summary || '',
      impact: study?.impact || '',
      content: study?.content || '',
      icon: study?.icon || '',
      image: study?.image || '',
      tags: study?.tags?.join(', ') || '',
      featured: study?.featured ?? false,
      display_order: study?.display_order || 0
    });

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      onSave({
        ...study,
        ...formData,
        tags: formData.tags.split(',').map(s => s.trim()).filter(s => s !== '')
      });
    };

    return (
      <Card>
        <CardHeader>
          <CardTitle>{study ? 'Edit Case Study' : 'Add Case Study'}</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="title">Title *</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  required
                />
              </div>
              <div>
                <Label htmlFor="category">Category *</Label>
                <Input
                  id="category"
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="industry">Industry *</Label>
                <Input
                  id="industry"
                  value={formData.industry}
                  onChange={(e) => setFormData({ ...formData, industry: e.target.value })}
                  required
                />
              </div>
              <div>
                <Label htmlFor="icon">Icon URL</Label>
                <Input
                  id="icon"
                  value={formData.icon}
                  onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
                />
              </div>
            </div>

            <div>
              <Label htmlFor="image">Image URL</Label>
              <Input
                id="image"
                value={formData.image}
                onChange={(e) => setFormData({ ...formData, image: e.target.value })}
              />
            </div>

            <div>
              <Label htmlFor="summary">Summary *</Label>
              <Textarea
                id="summary"
                value={formData.summary}
                onChange={(e) => setFormData({ ...formData, summary: e.target.value })}
                required
                rows={3}
              />
            </div>

            <div>
              <Label htmlFor="impact">Impact *</Label>
              <Textarea
                id="impact"
                value={formData.impact}
                onChange={(e) => setFormData({ ...formData, impact: e.target.value })}
                required
                rows={3}
              />
            </div>

            <div>
              <Label htmlFor="content">Detailed Content</Label>
              <Textarea
                id="content"
                value={formData.content}
                onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                rows={5}
              />
            </div>

            <div>
              <Label htmlFor="tags">Tags (comma-separated)</Label>
              <Input
                id="tags"
                value={formData.tags}
                onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                placeholder="React, TypeScript, E-commerce"
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
                  id="featured"
                  checked={formData.featured}
                  onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                />
                <Label htmlFor="featured">Featured</Label>
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
    return <div>Loading case studies...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Case Study Management</h2>
          <p className="text-muted-foreground">Manage case studies and success stories</p>
        </div>
        <Button onClick={() => setIsAdding(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Add Case Study
        </Button>
      </div>

      {isAdding && (
        <CaseStudyForm
          onSave={handleSave}
          onCancel={() => setIsAdding(false)}
        />
      )}

      {editingStudy && (
        <CaseStudyForm
          study={editingStudy}
          onSave={handleSave}
          onCancel={() => setEditingStudy(null)}
        />
      )}

      <div className="grid gap-4">
        {caseStudies.map((study) => (
          <Card key={study.id}>
            <CardContent className="p-4">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <h3 className="font-semibold">{study.title}</h3>
                  <p className="text-sm text-muted-foreground">{study.category} • {study.industry}</p>
                  <p className="text-sm mt-1">{study.summary}</p>
                  {study.tags && study.tags.length > 0 && (
                    <p className="text-sm mt-1">
                      <span className="font-medium">Tags:</span> {study.tags.join(', ')}
                    </p>
                  )}
                  <p className="text-xs text-muted-foreground mt-1">
                    Order: {study.display_order} | {study.featured ? 'Featured' : 'Regular'}
                  </p>
                </div>
                <div className="flex space-x-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => setEditingStudy(study)}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={() => handleDelete(study.id)}
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

export default CaseStudyManagement;