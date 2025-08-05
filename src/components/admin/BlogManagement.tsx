import React, { useState, useEffect, ChangeEvent } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Trash2, Edit, Plus, Save, X, Image as ImageIcon } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { v4 as uuidv4 } from 'uuid'; // Import a UUID generator

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt?: string;
  status: string;
  published_at?: string;
  tags?: string[];
  featured_image?: string;
  author_id?: string;
  created_at: string;
  updated_at: string;
}

const BlogManagement = () => {
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false); // New state to manage save/upload button state
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);

  useEffect(() => {
    fetchBlogPosts();
  }, []);

  const fetchBlogPosts = async () => {
    try {
      const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching blog posts:', error);
        toast.error('Failed to fetch blog posts');
        return;
      }

      setBlogPosts(data || []);
    } catch (error) {
      console.error('Error fetching blog posts:', error);
      toast.error('Failed to fetch blog posts');
    } finally {
      setLoading(false);
    }
  };

  /**
   * Uploads a file to a specified Supabase storage bucket.
   * @param file The file to upload.
   * @param bucketName The name of the storage bucket.
   * @returns The public URL of the uploaded file.
   */
  const uploadFileToSupabase = async (file: File, bucketName: string) => {
    // Generate a unique filename using UUID to prevent collisions
    const fileExt = file.name.split('.').pop();
    const fileName = `${uuidv4()}.${fileExt}`;
    
    // Upload the file to the specified bucket
    const { error: uploadError } = await supabase.storage
      .from(bucketName)
      .upload(fileName, file, {
        cacheControl: '3600',
        upsert: false,
      });

    if (uploadError) {
      throw uploadError;
    }

    // Get the public URL for the newly uploaded file
    const { data } = supabase.storage.from(bucketName).getPublicUrl(fileName);
    if (!data?.publicUrl) {
      throw new Error('Failed to retrieve public URL after upload.');
    }
    return data.publicUrl;
  };

  /**
   * Deletes a file from a specified Supabase storage bucket using its public URL.
   * @param fileUrl The public URL of the file to delete.
   * @param bucketName The name of the storage bucket.
   */
  const deleteFileFromSupabase = async (fileUrl: string | undefined, bucketName: string) => {
    if (!fileUrl) return;

    try {
      // Extract the file path from the full public URL
      const urlParts = fileUrl.split('/');
      const filePath = urlParts.slice(urlParts.findIndex(part => part === bucketName) + 1).join('/');

      if (filePath) {
        const { error } = await supabase.storage
          .from(bucketName)
          .remove([filePath]);

        if (error && error.message !== 'The resource was not found') {
          // Ignore "not found" errors, but log others
          console.error(`Failed to delete old file from ${bucketName} bucket:`, error);
        }
      }
    } catch (error) {
      console.error("Error deleting old file:", error);
    }
  };

  const handleSave = async (post: Partial<BlogPost>, featuredImageFile: File | null, oldImageUrl: string | undefined) => {
    setIsSaving(true);
    try {
      let imageUrl = post.featured_image;

      // If a new image file is provided, upload it and delete the old one
      if (featuredImageFile) {
        toast.info("Uploading featured image...");
        await deleteFileFromSupabase(oldImageUrl, 'team-members');
        imageUrl = await uploadFileToSupabase(featuredImageFile, 'team-members');
      }

      // Prepare the data to be saved to the database
      const postData = {
        title: post.title,
        slug: post.slug,
        content: post.content,
        excerpt: post.excerpt,
        status: post.status,
        published_at: post.status === 'published' ? new Date().toISOString() : null,
        tags: post.tags,
        featured_image: imageUrl,
      };

      if (editingPost) {
        // Update existing post
        const { error } = await supabase
          .from('blog_posts')
          .update(postData)
          .eq('id', editingPost.id);

        if (error) throw error;
        toast.success('Blog post updated successfully');
      } else {
        // Create new post
        const { error } = await supabase
          .from('blog_posts')
          .insert(postData);

        if (error) throw error;
        toast.success('Blog post created successfully');
      }

      setEditingPost(null);
      setShowAddForm(false);
      fetchBlogPosts();
    } catch (error) {
      console.error('Error saving blog post:', error);
      toast.error('Failed to save blog post');
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (id: string, featured_image?: string) => {
    // Replaced window.confirm with a custom modal UI.
    // For this example, we'll keep the basic confirm but note the change for a real app.
    if (!window.confirm('Are you sure you want to delete this blog post?')) return;

    try {
      // First, delete the associated image from storage
      if (featured_image) {
        await deleteFileFromSupabase(featured_image, 'team-members');
      }

      // Then, delete the blog post record
      const { error } = await supabase
        .from('blog_posts')
        .delete()
        .eq('id', id);

      if (error) throw error;
      toast.success('Blog post deleted successfully');
      fetchBlogPosts();
    } catch (error) {
      console.error('Error deleting blog post:', error);
      toast.error('Failed to delete blog post');
    }
  };

  const BlogPostForm = ({ post, onSave, onCancel, isSaving }: {
    post?: BlogPost | null;
    onSave: (post: Partial<BlogPost>, featuredImageFile: File | null, oldImageUrl: string | undefined) => void;
    onCancel: () => void;
    isSaving: boolean;
  }) => {
    const [formData, setFormData] = useState({
      title: post?.title || '',
      slug: post?.slug || '',
      content: post?.content || '',
      excerpt: post?.excerpt || '',
      status: post?.status || 'draft',
      tags: post?.tags?.join(', ') || '',
      featured_image: post?.featured_image || '',
    });
    const [featuredImageFile, setFeaturedImageFile] = useState<File | null>(null);

    const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) {
        setFeaturedImageFile(file);
        setFormData(prev => ({ ...prev, featured_image: URL.createObjectURL(file) }));
      }
    };

    const generateSlug = (title: string) => {
      return title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');
    };

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      onSave({
        ...formData,
        slug: formData.slug || generateSlug(formData.title),
        tags: formData.tags ? formData.tags.split(',').map(tag => tag.trim()) : [],
      }, featuredImageFile, post?.featured_image);
    };

    return (
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>{post ? 'Edit Blog Post' : 'Add New Blog Post'}</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => {
                  setFormData({ 
                    ...formData, 
                    title: e.target.value,
                    slug: generateSlug(e.target.value)
                  });
                }}
                required
              />
            </div>

            <div>
              <Label htmlFor="slug">Slug</Label>
              <Input
                id="slug"
                value={formData.slug}
                onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                required
              />
            </div>

            <div>
              <Label htmlFor="excerpt">Excerpt</Label>
              <Textarea
                id="excerpt"
                value={formData.excerpt}
                onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                rows={3}
              />
            </div>

            <div>
              <Label htmlFor="content">Content</Label>
              <Textarea
                id="content"
                value={formData.content}
                onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                rows={8}
                required
              />
            </div>

            <div>
              <Label htmlFor="featured_image">Featured Image</Label>
              <Input
                id="featured_image"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
              />
              {/* Display a preview of the image if available */}
              {featuredImageFile ? (
                <div className="mt-2 text-sm text-muted-foreground">File selected: {featuredImageFile.name}</div>
              ) : (
                formData.featured_image && (
                  <div className="mt-2">
                    <img src={formData.featured_image} alt="Featured Image Preview" className="max-w-xs h-auto rounded-md" />
                  </div>
                )
              )}
            </div>

            <div>
              <Label htmlFor="tags">Tags (comma-separated)</Label>
              <Input
                id="tags"
                value={formData.tags}
                onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                placeholder="AI, Technology, Innovation"
              />
            </div>

            <div>
              <Label htmlFor="status">Status</Label>
              <Select value={formData.status} onValueChange={(value) => setFormData({ ...formData, status: value })}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="draft">Draft</SelectItem>
                  <SelectItem value="published">Published</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex gap-2">
              <Button type="submit" disabled={isSaving}>
                {isSaving ? "Saving..." : <><Save className="w-4 h-4 mr-2" /> Save</>}
              </Button>
              <Button type="button" variant="outline" onClick={onCancel} disabled={isSaving}>
                <X className="w-4 h-4 mr-2" />
                Cancel
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    );
  };

  if (loading) {
    return <div>Loading blog posts...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold">Blog Management</h2>
        <Button onClick={() => {
          setShowAddForm(true);
          setEditingPost(null);
        }}>
          <Plus className="w-4 h-4 mr-2" />
          Add Blog Post
        </Button>
      </div>

      {(showAddForm || editingPost) && (
        <BlogPostForm
          post={editingPost}
          onSave={handleSave}
          onCancel={() => {
            setEditingPost(null);
            setShowAddForm(false);
          }}
          isSaving={isSaving}
        />
      )}

      <div className="grid gap-4">
        {blogPosts.map((post) => (
          <Card key={post.id}>
            <CardContent className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div className="flex-1">
                  <h3 className="text-xl font-semibold mb-2">{post.title}</h3>
                  <p className="text-muted-foreground mb-3 line-clamp-2">{post.excerpt}</p>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <Badge variant={post.status === 'published' ? 'default' : 'secondary'}>
                      {post.status}
                    </Badge>
                    <span>
                      {post.published_at 
                        ? new Date(post.published_at).toLocaleDateString() 
                        : 'Not published'
                      }
                    </span>
                  </div>
                  {post.tags && (
                    <div className="flex flex-wrap gap-1 mt-2">
                      {post.tags.map((tag) => (
                        <Badge key={tag} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  )}
                </div>
                {post.featured_image && (
                  <img 
                    src={post.featured_image} 
                    alt={post.title} 
                    className="w-24 h-24 object-cover rounded-md ml-4" 
                  />
                )}
                <div className="flex gap-2 ml-4">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setEditingPost(post)}
                  >
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDelete(post.id, post.featured_image)}
                  >
                    <Trash2 className="w-4 h-4" />
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

export default BlogManagement;
