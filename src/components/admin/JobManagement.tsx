import React, { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Plus, Edit, Trash2, Save, X } from 'lucide-react';

interface JobOpening {
  id: string;
  title: string;
  department: string;
  location: string;
  employment_type: string;
  description: string;
  requirements?: string[];
  benefits?: string[];
  salary_range?: string;
  active: boolean;
  display_order: number;
}

const JobManagement = () => {
  const [jobs, setJobs] = useState<JobOpening[]>([]);
  const [editingJob, setEditingJob] = useState<JobOpening | null>(null);
  const [isAdding, setIsAdding] = useState(false);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    const { data, error } = await supabase
      .from('job_openings')
      .select('*')
      .order('display_order', { ascending: true });

    if (error) {
      toast({
        title: "Error",
        description: "Failed to fetch job openings",
        variant: "destructive"
      });
    } else {
      setJobs(data || []);
    }
    setLoading(false);
  };

  const handleSave = async (job: Partial<JobOpening>) => {
    if (job.id) {
      // Update existing job
      const { error } = await supabase
        .from('job_openings')
        .update({
          title: job.title,
          department: job.department,
          location: job.location,
          employment_type: job.employment_type,
          description: job.description,
          requirements: job.requirements?.filter(r => r.trim() !== ''),
          benefits: job.benefits?.filter(b => b.trim() !== ''),
          salary_range: job.salary_range,
          active: job.active,
          display_order: job.display_order
        })
        .eq('id', job.id);

      if (error) {
        toast({
          title: "Error",
          description: "Failed to update job opening",
          variant: "destructive"
        });
      } else {
        toast({ title: "Success", description: "Job opening updated" });
        fetchJobs();
        setEditingJob(null);
      }
    } else {
      // Add new job
      const { error } = await supabase
        .from('job_openings')
        .insert({
          title: job.title,
          department: job.department,
          location: job.location,
          employment_type: job.employment_type,
          description: job.description,
          requirements: job.requirements?.filter(r => r.trim() !== ''),
          benefits: job.benefits?.filter(b => b.trim() !== ''),
          salary_range: job.salary_range,
          active: job.active ?? true,
          display_order: job.display_order || 0
        });

      if (error) {
        toast({
          title: "Error",
          description: "Failed to add job opening",
          variant: "destructive"
        });
      } else {
        toast({ title: "Success", description: "Job opening added" });
        fetchJobs();
        setIsAdding(false);
      }
    }
  };

  const handleDelete = async (id: string) => {
    const { error } = await supabase
      .from('job_openings')
      .delete()
      .eq('id', id);

    if (error) {
      toast({
        title: "Error",
        description: "Failed to delete job opening",
        variant: "destructive"
      });
    } else {
      toast({ title: "Success", description: "Job opening deleted" });
      fetchJobs();
    }
  };

  const JobForm = ({ job, onSave, onCancel }: {
    job?: JobOpening;
    onSave: (job: Partial<JobOpening>) => void;
    onCancel: () => void;
  }) => {
    const [formData, setFormData] = useState({
      title: job?.title || '',
      department: job?.department || '',
      location: job?.location || '',
      employment_type: job?.employment_type || '',
      description: job?.description || '',
      requirements: job?.requirements?.join('\n') || '',
      benefits: job?.benefits?.join('\n') || '',
      salary_range: job?.salary_range || '',
      active: job?.active ?? true,
      display_order: job?.display_order || 0
    });

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      onSave({
        ...job,
        ...formData,
        requirements: formData.requirements.split('\n').map(s => s.trim()).filter(s => s !== ''),
        benefits: formData.benefits.split('\n').map(s => s.trim()).filter(s => s !== '')
      });
    };

    return (
      <Card>
        <CardHeader>
          <CardTitle>{job ? 'Edit Job Opening' : 'Add Job Opening'}</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="title">Job Title *</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  required
                />
              </div>
              <div>
                <Label htmlFor="department">Department *</Label>
                <Input
                  id="department"
                  value={formData.department}
                  onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="location">Location *</Label>
                <Input
                  id="location"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  required
                />
              </div>
              <div>
                <Label htmlFor="employment_type">Employment Type *</Label>
                <select
                  id="employment_type"
                  value={formData.employment_type}
                  onChange={(e) => setFormData({ ...formData, employment_type: e.target.value })}
                  required
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <option value="">Select employment type</option>
                  <option value="full-time">Full-time</option>
                  <option value="part-time">Part-time</option>
                  <option value="contract">Contract</option>
                  <option value="freelance">Freelance</option>
                  <option value="internship">Internship</option>
                </select>
              </div>
            </div>

            <div>
              <Label htmlFor="salary_range">Salary Range</Label>
              <Input
                id="salary_range"
                value={formData.salary_range}
                onChange={(e) => setFormData({ ...formData, salary_range: e.target.value })}
                placeholder="$60,000 - $80,000"
              />
            </div>

            <div>
              <Label htmlFor="description">Job Description *</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                required
                rows={5}
              />
            </div>

            <div>
              <Label htmlFor="requirements">Requirements (one per line)</Label>
              <Textarea
                id="requirements"
                value={formData.requirements}
                onChange={(e) => setFormData({ ...formData, requirements: e.target.value })}
                rows={4}
                placeholder="Bachelor's degree in Computer Science
3+ years of React experience
Strong communication skills"
              />
            </div>

            <div>
              <Label htmlFor="benefits">Benefits (one per line)</Label>
              <Textarea
                id="benefits"
                value={formData.benefits}
                onChange={(e) => setFormData({ ...formData, benefits: e.target.value })}
                rows={4}
                placeholder="Health insurance
401k matching
Remote work options"
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
    return <div>Loading job openings...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Job Openings Management</h2>
          <p className="text-muted-foreground">Manage career opportunities</p>
        </div>
        <Button onClick={() => setIsAdding(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Post Job
        </Button>
      </div>

      {isAdding && (
        <JobForm
          onSave={handleSave}
          onCancel={() => setIsAdding(false)}
        />
      )}

      {editingJob && (
        <JobForm
          job={editingJob}
          onSave={handleSave}
          onCancel={() => setEditingJob(null)}
        />
      )}

      <div className="grid gap-4">
        {jobs.map((job) => (
          <Card key={job.id}>
            <CardContent className="p-4">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <h3 className="font-semibold">{job.title}</h3>
                  <p className="text-sm text-muted-foreground">
                    {job.department} • {job.location} • {job.employment_type}
                  </p>
                  {job.salary_range && (
                    <p className="text-sm mt-1">
                      <span className="font-medium">Salary:</span> {job.salary_range}
                    </p>
                  )}
                  <p className="text-sm mt-1 line-clamp-2">{job.description}</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Order: {job.display_order} | Status: {job.active ? 'Active' : 'Inactive'}
                  </p>
                </div>
                <div className="flex space-x-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => setEditingJob(job)}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={() => handleDelete(job.id)}
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

export default JobManagement;