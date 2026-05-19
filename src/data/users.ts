export type UserRole = "owner" | "admin" | "editor" | "viewer";
export type UserStatus = "active" | "away" | "busy" | "offline";

export interface TeamMember {
  id: string;
  name: string;
  username: string;
  email: string;
  avatar: string;
  role: UserRole;
  status: UserStatus;
  department?: string;
  joinedAt: string;
  lastActive: string;
  permissions: {
    canManageTeam: boolean;
    canManageProjects: boolean;
    canManageBilling: boolean;
    canViewAnalytics: boolean;
    canEditContent: boolean;
    canInviteMembers: boolean;
  };
  recentActivity: {
    action: string;
    target: string;
    timestamp: string;
  }[];
}

export const teamMembers: TeamMember[] = [
  {
    id: "1",
    name: "Arham Khan",
    username: "Aarhamkhnz",
    email: "hello@arhamkhnz.com",
    avatar: "https://avatars.githubusercontent.com/u/43849669",
    role: "owner",
    status: "active",
    department: "Engineering",
    joinedAt: "2023-01-15",
    lastActive: "2 minutes ago",
    permissions: {
      canManageTeam: true,
      canManageProjects: true,
      canManageBilling: true,
      canViewAnalytics: true,
      canEditContent: true,
      canInviteMembers: true,
    },
    recentActivity: [
      { action: "Updated", target: "Dashboard settings", timestamp: "2 minutes ago" },
      { action: "Created", target: "New project workspace", timestamp: "1 hour ago" },
      { action: "Invited", target: "Sarah Chen to the team", timestamp: "3 hours ago" },
    ],
  },
  {
    id: "2",
    name: "Ammar Khan",
    username: "ammarkhnz",
    email: "hello@ammarkhnz.com",
    avatar: "",
    role: "admin",
    status: "active",
    department: "Design",
    joinedAt: "2023-02-20",
    lastActive: "15 minutes ago",
    permissions: {
      canManageTeam: true,
      canManageProjects: true,
      canManageBilling: false,
      canViewAnalytics: true,
      canEditContent: true,
      canInviteMembers: true,
    },
    recentActivity: [
      { action: "Edited", target: "Brand guidelines document", timestamp: "15 minutes ago" },
      { action: "Commented on", target: "Q4 Marketing Campaign", timestamp: "2 hours ago" },
      { action: "Uploaded", target: "New logo variations", timestamp: "Yesterday" },
    ],
  },
  {
    id: "3",
    name: "Sarah Chen",
    username: "sarahchen",
    email: "sarah.chen@company.com",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=face",
    role: "editor",
    status: "away",
    department: "Marketing",
    joinedAt: "2023-06-10",
    lastActive: "1 hour ago",
    permissions: {
      canManageTeam: false,
      canManageProjects: true,
      canManageBilling: false,
      canViewAnalytics: true,
      canEditContent: true,
      canInviteMembers: false,
    },
    recentActivity: [
      { action: "Published", target: "Blog post: Getting Started", timestamp: "1 hour ago" },
      { action: "Scheduled", target: "Social media posts for next week", timestamp: "4 hours ago" },
      { action: "Updated", target: "Email newsletter template", timestamp: "Yesterday" },
    ],
  },
  {
    id: "4",
    name: "Marcus Johnson",
    username: "marcusj",
    email: "marcus.j@company.com",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
    role: "viewer",
    status: "busy",
    department: "Sales",
    joinedAt: "2023-09-01",
    lastActive: "30 minutes ago",
    permissions: {
      canManageTeam: false,
      canManageProjects: false,
      canManageBilling: false,
      canViewAnalytics: true,
      canEditContent: false,
      canInviteMembers: false,
    },
    recentActivity: [
      { action: "Viewed", target: "Sales analytics dashboard", timestamp: "30 minutes ago" },
      { action: "Downloaded", target: "Q3 Performance Report", timestamp: "2 hours ago" },
      { action: "Viewed", target: "Team activity log", timestamp: "Yesterday" },
    ],
  },
  {
    id: "5",
    name: "Emily Rodriguez",
    username: "emilyr",
    email: "emily.r@company.com",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
    role: "editor",
    status: "active",
    department: "Product",
    joinedAt: "2023-04-22",
    lastActive: "5 minutes ago",
    permissions: {
      canManageTeam: false,
      canManageProjects: true,
      canManageBilling: false,
      canViewAnalytics: true,
      canEditContent: true,
      canInviteMembers: false,
    },
    recentActivity: [
      { action: "Updated", target: "Product roadmap Q1 2024", timestamp: "5 minutes ago" },
      { action: "Created", target: "Feature request: Dark mode", timestamp: "3 hours ago" },
      { action: "Commented on", target: "User feedback analysis", timestamp: "Yesterday" },
    ],
  },
  {
    id: "6",
    name: "David Kim",
    username: "davidk",
    email: "david.kim@company.com",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
    role: "admin",
    status: "offline",
    department: "Engineering",
    joinedAt: "2023-03-18",
    lastActive: "2 days ago",
    permissions: {
      canManageTeam: true,
      canManageProjects: true,
      canManageBilling: false,
      canViewAnalytics: true,
      canEditContent: true,
      canInviteMembers: true,
    },
    recentActivity: [
      { action: "Merged", target: "Pull request #234", timestamp: "2 days ago" },
      { action: "Reviewed", target: "Code review for auth module", timestamp: "2 days ago" },
      { action: "Created", target: "Bug report: Login issue", timestamp: "3 days ago" },
    ],
  },
];

// Legacy export for backward compatibility
export const users = teamMembers.map((member) => ({
  id: member.id,
  name: member.name,
  username: member.username,
  email: member.email,
  avatar: member.avatar,
  role: member.role,
}));

export const rootUser = teamMembers[0];

export const roleDescriptions: Record<UserRole, string> = {
  owner: "Full access to all workspace settings, billing, and team management",
  admin: "Can manage team members, projects, and most workspace settings",
  editor: "Can create and edit content, manage projects they have access to",
  viewer: "Can view content and analytics, but cannot make changes",
};

export const roleColors: Record<UserRole, string> = {
  owner:
    "border-amber-200 bg-amber-500/10 text-amber-700 dark:border-amber-900/40 dark:bg-amber-500/15 dark:text-amber-300",
  admin: "border-blue-200 bg-blue-500/10 text-blue-700 dark:border-blue-900/40 dark:bg-blue-500/15 dark:text-blue-300",
  editor:
    "border-green-200 bg-green-500/10 text-green-700 dark:border-green-900/40 dark:bg-green-500/15 dark:text-green-300",
  viewer: "border-gray-200 bg-gray-500/10 text-gray-700 dark:border-gray-700/40 dark:bg-gray-500/15 dark:text-gray-300",
};

export const statusColors: Record<UserStatus, string> = {
  active: "bg-green-500",
  away: "bg-amber-500",
  busy: "bg-red-500",
  offline: "bg-gray-400",
};
