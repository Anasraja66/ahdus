import { useState, useEffect, ChangeEvent } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Trash2, Edit, Plus, Save, X } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { v4 as uuidv4 } from "uuid"; // Import a UUID generator

interface NewsPost {
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

const NewsManagement = () => {
  const [newsPosts, setNewsPosts] = useState<NewsPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingPost, setEditingPost] = useState<NewsPost | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);

  useEffect(() => {
    fetchNewsPosts();
  }, []);

  const fetchNewsPosts = async () => {
    try {
      const { data, error } = await supabase
        .from('news_posts')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching news posts:', error);
        toast.error('Failed to fetch news posts');
        return;
      }

      setNewsPosts(data || []);
    } catch (error) {
      console.error('Error fetching news posts:', error);
      toast.error('Failed to fetch news posts');
    } finally {
      setLoading(false);
    }
  };

  const uploadImage = async (file: File) => {
    const fileExt = file.name.split('.').pop();
    const filePath = `${uuidv4()}.${fileExt}`;

    const { error: uploadError } = await supabase.storage
      .from('team-members') // Make sure this is your bucket name
      .upload(filePath, file);

    if (uploadError) {
      throw new Error(`Error uploading image: ${uploadError.message}`);
    }

    const { data } = supabase.storage
      .from('team-members') // Use the same bucket name
      .getPublicUrl(filePath);

    if (!data?.publicUrl) {
      throw new Error('Failed to get public URL for the uploaded image.');
    }

    return data.publicUrl;
  };

  const handleSave = async (post: Partial<NewsPost>, imageFile: File | null) => {
    try {
      let imageUrl = post.featured_image;

      // If a new image file is selected, upload it first
      if (imageFile) {
        toast.info('Uploading image...');
        imageUrl = await uploadImage(imageFile);
        toast.success('Image uploaded successfully');
      }

      if (editingPost) {
        // Update existing post
        const { error } = await supabase
          .from('news_posts')
          .update({
            title: post.title,
            slug: post.slug,
            content: post.content,
            excerpt: post.excerpt,
            status: post.status,
            published_at: post.status === 'published' ? new Date().toISOString() : null,
            tags: post.tags,
            featured_image: imageUrl, // Use the new or existing image URL
          })
          .eq('id', editingPost.id);

        if (error) throw error;
        toast.success('News post updated successfully');
      } else {
        // Create new post
        const { error } = await supabase
          .from('news_posts')
          .insert({
            title: post.title,
            slug: post.slug,
            content: post.content,
            excerpt: post.excerpt,
            status: post.status || 'draft',
            published_at: post.status === 'published' ? new Date().toISOString() : null,
            tags: post.tags,
            featured_image: imageUrl, // Use the new or existing image URL
          });

        if (error) throw error;
        toast.success('News post created successfully');
      }

      setEditingPost(null);
      setShowAddForm(false);
      fetchNewsPosts();
    } catch (error: any) {
      console.error('Error saving news post:', error);
      toast.error(`Failed to save news post: ${error.message}`);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this news post?')) return;

    try {
      const { error } = await supabase
        .from('news_posts')
        .delete()
        .eq('id', id);

      if (error) throw error;
      toast.success('News post deleted successfully');
      fetchNewsPosts();
    } catch (error) {
      console.error('Error deleting news post:', error);
      toast.error('Failed to delete news post');
    }
  };

  const NewsPostForm = ({ post, onSave, onCancel }: {
    post?: NewsPost | null;
    onSave: (post: Partial<NewsPost>, imageFile: File | null) => void;
    onCancel: () => void;
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
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [imagePreviewUrl, setImagePreviewUrl] = useState<string | null>(post?.featured_image || null);

    const generateSlug = (title: string) => {
      return title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');
    };

    const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) {
        setImageFile(file);
        setImagePreviewUrl(URL.createObjectURL(file));
      }
    };

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      onSave({
        ...formData,
        slug: formData.slug || generateSlug(formData.title),
        tags: formData.tags ? formData.tags.split(',').map(tag => tag.trim()) : [],
        featured_image: formData.featured_image, // Pass the existing URL
      }, imageFile); // Pass the new file
    };

    return (
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>{post ? 'Edit News Post' : 'Add New News Post'}</CardTitle>
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
              {imagePreviewUrl && (
                <div className="mt-4">
                  <img src={imagePreviewUrl} alt="Featured" className="max-w-xs h-auto rounded-md" />
                </div>
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
              <Button type="submit">
                <Save className="w-4 h-4 mr-2" />
                Save
              </Button>
              <Button type="button" variant="outline" onClick={onCancel}>
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
    return <div>Loading news posts...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold">News Management</h2>
        <Button onClick={() => setShowAddForm(true)}>
          <Plus className="w-4 h-4 mr-2" />
          Add News Post
        </Button>
      </div>

      {(showAddForm || editingPost) && (
        <NewsPostForm
          post={editingPost}
          onSave={handleSave}
          onCancel={() => {
            setEditingPost(null);
            setShowAddForm(false);
          }}
        />
      )}

      <div className="grid gap-4">
        {newsPosts.map((post) => (
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
                  <div className="ml-4 flex-shrink-0">
                    <img src={post.featured_image} alt={post.title} className="w-24 h-24 object-cover rounded-md" />
                  </div>
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
                    onClick={() => handleDelete(post.id)}
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

export default NewsManagement;