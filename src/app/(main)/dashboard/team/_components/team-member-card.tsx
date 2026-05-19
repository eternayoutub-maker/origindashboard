"use client";

import { useState } from "react";

import {
  Activity,
  ChevronRight,
  Crown,
  Eye,
  MoreHorizontal,
  Shield,
  ShieldCheck,
  Sparkles,
  UserPlus,
} from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { roleColors, statusColors, type TeamMember, type UserRole } from "@/data/users";

import { ChangePermissionsDialog } from "./change-permissions-dialog";
import { MemberProfileSheet } from "./member-profile-sheet";

interface TeamMemberCardProps {
  member: TeamMember;
  onAskAI: (member: TeamMember) => void;
}

const roleIcons: Record<UserRole, React.ReactNode> = {
  owner: <Crown className="size-3" />,
  admin: <ShieldCheck className="size-3" />,
  editor: <Shield className="size-3" />,
  viewer: <Eye className="size-3" />,
};

export function TeamMemberCard({ member, onAskAI }: TeamMemberCardProps) {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isPermissionsOpen, setIsPermissionsOpen] = useState(false);

  const initials = member.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();

  return (
    <>
      <Card className="group relative overflow-hidden transition-all duration-200 hover:ring-2 hover:ring-primary/20">
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div className="relative">
                <Avatar size="lg">
                  <AvatarImage src={member.avatar} alt={member.name} />
                  <AvatarFallback>{initials}</AvatarFallback>
                </Avatar>
                <span
                  className={`absolute bottom-0 right-0 size-3 rounded-full ring-2 ring-card ${statusColors[member.status]}`}
                  title={member.status}
                />
              </div>
              <div className="space-y-1">
                <CardTitle className="text-base">{member.name}</CardTitle>
                <CardDescription className="text-xs">@{member.username}</CardDescription>
              </div>
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon-sm" className="opacity-0 transition-opacity group-hover:opacity-100">
                  <MoreHorizontal className="size-4" />
                  <span className="sr-only">Actions</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => setIsProfileOpen(true)}>
                  <Eye className="mr-2 size-4" />
                  View Profile
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => onAskAI(member)}>
                  <Sparkles className="mr-2 size-4" />
                  Ask AI About Activity
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => setIsPermissionsOpen(true)}>
                  <Shield className="mr-2 size-4" />
                  Change Permissions
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant="outline" className={roleColors[member.role]}>
              {roleIcons[member.role]}
              <span className="capitalize">{member.role}</span>
            </Badge>
            {member.department && (
              <Badge variant="secondary" className="text-xs">
                {member.department}
              </Badge>
            )}
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <Activity className="size-3" />
              <span>Recent Activity</span>
            </div>
            <div className="space-y-1.5">
              {member.recentActivity.slice(0, 2).map((activity, index) => (
                <div key={index} className="flex items-center gap-2 text-xs text-muted-foreground">
                  <ChevronRight className="size-3 shrink-0" />
                  <span className="truncate">
                    <span className="font-medium text-foreground">{activity.action}</span> {activity.target}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-between border-t pt-3 text-xs text-muted-foreground">
            <span>Last active: {member.lastActive}</span>
            <Button variant="ghost" size="sm" className="h-7 gap-1 text-xs" onClick={() => setIsProfileOpen(true)}>
              View Details
              <ChevronRight className="size-3" />
            </Button>
          </div>
        </CardContent>
      </Card>

      <MemberProfileSheet member={member} open={isProfileOpen} onOpenChange={setIsProfileOpen} onAskAI={onAskAI} />

      <ChangePermissionsDialog member={member} open={isPermissionsOpen} onOpenChange={setIsPermissionsOpen} />
    </>
  );
}

interface TeamMemberListItemProps {
  member: TeamMember;
  onAskAI: (member: TeamMember) => void;
}

export function TeamMemberListItem({ member, onAskAI }: TeamMemberListItemProps) {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isPermissionsOpen, setIsPermissionsOpen] = useState(false);

  const initials = member.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();

  return (
    <>
      <div className="group flex items-center justify-between rounded-lg border bg-card p-4 transition-all duration-200 hover:ring-2 hover:ring-primary/20">
        <div className="flex items-center gap-4">
          <div className="relative">
            <Avatar>
              <AvatarImage src={member.avatar} alt={member.name} />
              <AvatarFallback>{initials}</AvatarFallback>
            </Avatar>
            <span
              className={`absolute bottom-0 right-0 size-2.5 rounded-full ring-2 ring-card ${statusColors[member.status]}`}
            />
          </div>

          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="font-medium">{member.name}</span>
              <Badge variant="outline" className={`text-xs ${roleColors[member.role]}`}>
                {roleIcons[member.role]}
                <span className="capitalize">{member.role}</span>
              </Badge>
            </div>
            <div className="flex items-center gap-3 text-xs text-muted-foreground">
              <span>{member.email}</span>
              <span className="hidden sm:inline">|</span>
              <span className="hidden sm:inline">{member.department}</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="hidden text-xs text-muted-foreground md:inline">{member.lastActive}</span>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon-sm" className="opacity-0 transition-opacity group-hover:opacity-100">
                <MoreHorizontal className="size-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setIsProfileOpen(true)}>
                <Eye className="mr-2 size-4" />
                View Profile
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onAskAI(member)}>
                <Sparkles className="mr-2 size-4" />
                Ask AI About Activity
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => setIsPermissionsOpen(true)}>
                <Shield className="mr-2 size-4" />
                Change Permissions
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <MemberProfileSheet member={member} open={isProfileOpen} onOpenChange={setIsProfileOpen} onAskAI={onAskAI} />

      <ChangePermissionsDialog member={member} open={isPermissionsOpen} onOpenChange={setIsPermissionsOpen} />
    </>
  );
}

export function AddMemberButton({ onClick }: { onClick: () => void }) {
  return (
    <Card
      className="group flex h-full min-h-[200px] cursor-pointer items-center justify-center border-dashed transition-all duration-200 hover:border-primary hover:bg-muted/50"
      onClick={onClick}
    >
      <div className="flex flex-col items-center gap-3 text-muted-foreground transition-colors group-hover:text-foreground">
        <div className="flex size-12 items-center justify-center rounded-full bg-muted transition-colors group-hover:bg-primary/10">
          <UserPlus className="size-6 transition-colors group-hover:text-primary" />
        </div>
        <div className="text-center">
          <p className="font-medium">Add Team Member</p>
          <p className="text-xs">Invite someone to join</p>
        </div>
      </div>
    </Card>
  );
}
