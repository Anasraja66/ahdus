import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { supabase } from '@/integrations/supabase/client';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from 'recharts';
import { MessageSquare, Calendar, FileText, Users, Star, Briefcase, PenTool, Newspaper } from 'lucide-react';

interface AnalyticsData {
  contactSubmissions: number;
  pendingAppointments: number;
  totalAppointments: number;
  publishedBlogs: number;
  publishedNews: number;
  caseStudies: number;
  testimonials: number;
  jobOpenings: number;
  teamMembers: number;
}

const AdminOverview = () => {
  const [analyticsData, setAnalyticsData] = useState<AnalyticsData>({
    contactSubmissions: 0,
    pendingAppointments: 0,
    totalAppointments: 0,
    publishedBlogs: 0,
    publishedNews: 0,
    caseStudies: 0,
    testimonials: 0,
    jobOpenings: 0,
    teamMembers: 0,
  });
  const [monthlyData, setMonthlyData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAnalyticsData();
  }, []);

  const fetchAnalyticsData = async () => {
    try {
      const [
        contactSubmissionsResult,
        appointmentsResult,
        pendingAppointmentsResult,
        blogPostsResult,
        newsPostsResult,
        caseStudiesResult,
        testimonialsResult,
        jobOpeningsResult,
        teamMembersResult,
      ] = await Promise.all([
        supabase.from('contact_submissions').select('*', { count: 'exact', head: true }),
        supabase.from('appointments').select('*', { count: 'exact', head: true }),
        supabase.from('appointments').select('*', { count: 'exact', head: true }).eq('status', 'pending'),
        supabase.from('blog_posts').select('*', { count: 'exact', head: true }).eq('status', 'published'),
        supabase.from('news_posts').select('*', { count: 'exact', head: true }).eq('status', 'published'),
        supabase.from('case_studies').select('*', { count: 'exact', head: true }),
        supabase.from('testimonials').select('*', { count: 'exact', head: true }).eq('active', true),
        supabase.from('job_openings').select('*', { count: 'exact', head: true }).eq('active', true),
        supabase.from('team_members').select('*', { count: 'exact', head: true }).eq('active', true),
      ]);

      // Fetch monthly data for charts
      const sixMonthsAgo = new Date();
      sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);

      const [monthlyContacts, monthlyAppointments] = await Promise.all([
        supabase
          .from('contact_submissions')
          .select('created_at')
          .gte('created_at', sixMonthsAgo.toISOString()),
        supabase
          .from('appointments')
          .select('created_at')
          .gte('created_at', sixMonthsAgo.toISOString()),
      ]);

      // Process monthly data
      const monthlyStats = processMonthlyData(monthlyContacts.data || [], monthlyAppointments.data || []);

      setAnalyticsData({
        contactSubmissions: contactSubmissionsResult.count || 0,
        totalAppointments: appointmentsResult.count || 0,
        pendingAppointments: pendingAppointmentsResult.count || 0,
        publishedBlogs: blogPostsResult.count || 0,
        publishedNews: newsPostsResult.count || 0,
        caseStudies: caseStudiesResult.count || 0,
        testimonials: testimonialsResult.count || 0,
        jobOpenings: jobOpeningsResult.count || 0,
        teamMembers: teamMembersResult.count || 0,
      });

      setMonthlyData(monthlyStats);
    } catch (error) {
      console.error('Error fetching analytics data:', error);
    } finally {
      setLoading(false);
    }
  };

  const processMonthlyData = (contacts: any[], appointments: any[]) => {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const data = [];

    for (let i = 5; i >= 0; i--) {
      const date = new Date();
      date.setMonth(date.getMonth() - i);
      const monthName = months[date.getMonth()];
      const year = date.getFullYear();

      const contactCount = contacts.filter(item => {
        const itemDate = new Date(item.created_at);
        return itemDate.getMonth() === date.getMonth() && itemDate.getFullYear() === year;
      }).length;

      const appointmentCount = appointments.filter(item => {
        const itemDate = new Date(item.created_at);
        return itemDate.getMonth() === date.getMonth() && itemDate.getFullYear() === year;
      }).length;

      data.push({
        month: monthName,
        contacts: contactCount,
        appointments: appointmentCount,
      });
    }

    return data;
  };

  const pieData = [
    { name: 'Published Blogs', value: analyticsData.publishedBlogs, color: '#8884d8' },
    { name: 'Published News', value: analyticsData.publishedNews, color: '#82ca9d' },
    { name: 'Case Studies', value: analyticsData.caseStudies, color: '#ffc658' },
    { name: 'Testimonials', value: analyticsData.testimonials, color: '#ff7300' },
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Contact Submissions</CardTitle>
            <MessageSquare className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analyticsData.contactSubmissions}</div>
            <p className="text-xs text-muted-foreground">Total submissions</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Appointments</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analyticsData.pendingAppointments}</div>
            <p className="text-xs text-muted-foreground">
              Pending / {analyticsData.totalAppointments} total
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Published Content</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {analyticsData.publishedBlogs + analyticsData.publishedNews}
            </div>
            <p className="text-xs text-muted-foreground">
              {analyticsData.publishedBlogs} blogs, {analyticsData.publishedNews} news
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Team Members</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analyticsData.teamMembers}</div>
            <p className="text-xs text-muted-foreground">Active members</p>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Monthly Trends */}
        <Card>
          <CardHeader>
            <CardTitle>Monthly Trends</CardTitle>
            <CardDescription>Contacts and appointments over the last 6 months</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="contacts" stroke="#8884d8" strokeWidth={2} />
                <Line type="monotone" dataKey="appointments" stroke="#82ca9d" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Content Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Content Distribution</CardTitle>
            <CardDescription>Breakdown of published content types</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, value }) => `${name}: ${value}`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Additional Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Case Studies</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analyticsData.caseStudies}</div>
            <p className="text-xs text-muted-foreground">Total case studies</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Testimonials</CardTitle>
            <Star className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analyticsData.testimonials}</div>
            <p className="text-xs text-muted-foreground">Active testimonials</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Job Openings</CardTitle>
            <Briefcase className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analyticsData.jobOpenings}</div>
            <p className="text-xs text-muted-foreground">Active positions</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminOverview;