import React from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { 
  LayoutDashboard, 
  MessageSquare, 
  Calendar, 
  FileText, 
  Users, 
  Star, 
  Briefcase, 
  PenTool, 
  Newspaper 
} from 'lucide-react';

interface AdminSidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  collapsed?: boolean;
}

const sidebarItems = [
  { id: 'overview', label: 'Overview', icon: LayoutDashboard },
  { id: 'contacts', label: 'Contacts', icon: MessageSquare },
  { id: 'appointments', label: 'Appointments', icon: Calendar },
  { id: 'case-studies', label: 'Case Studies', icon: FileText },
  { id: 'team', label: 'Team', icon: Users },
  { id: 'content', label: 'Testimonials', icon: Star },
  { id: 'careers', label: 'Careers', icon: Briefcase },
  { id: 'blog', label: 'Blog', icon: PenTool },
  { id: 'news', label: 'News', icon: Newspaper },
];

const AdminSidebar: React.FC<AdminSidebarProps> = ({ 
  activeTab, 
  onTabChange, 
  collapsed = false 
}) => {
  return (
    <div className={cn(
      "bg-card border-r border-border transition-all duration-300",
      collapsed ? "w-16" : "w-64"
    )}>
      <div className="p-4">
        <h2 className={cn(
          "font-semibold text-lg transition-all duration-300",
          collapsed ? "opacity-0 w-0 overflow-hidden" : "opacity-100"
        )}>
          Admin Panel
        </h2>
      </div>
      
      <nav className="space-y-1 p-2">
        {sidebarItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          
          return (
            <Button
              key={item.id}
              variant={isActive ? "secondary" : "ghost"}
              className={cn(
                "w-full justify-start h-10 transition-all duration-200",
                collapsed ? "px-3" : "px-4",
                isActive && "bg-primary/10 text-primary"
              )}
              onClick={() => onTabChange(item.id)}
            >
              <Icon className={cn("h-4 w-4", collapsed ? "mx-auto" : "mr-3")} />
              {!collapsed && (
                <span className="transition-all duration-300">{item.label}</span>
              )}
            </Button>
          );
        })}
      </nav>
    </div>
  );
};

export default AdminSidebar;