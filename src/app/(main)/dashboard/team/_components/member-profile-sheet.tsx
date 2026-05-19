"use client";

import { Activity, Calendar, ChevronRight, Crown, Eye, Mail, Shield, ShieldCheck, Sparkles } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { roleColors, roleDescriptions, statusColors, type TeamMember, type UserRole } from "@/data/users";

interface MemberProfileSheetProps {
  member: TeamMember;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAskAI: (member: TeamMember) => void;
}

const roleIcons: Record<UserRole, React.ReactNode> = {
  owner: <Crown className="size-3" />,
  admin: <ShieldCheck className="size-3" />,
  editor: <Shield className="size-3" />,
  viewer: <Eye className="size-3" />,
};

export function MemberProfileSheet({ member, open, onOpenChange, onAskAI }: MemberProfileSheetProps) {
  const initials = member.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();

  const handleAskAI = () => {
    onOpenChange(false);
    onAskAI(member);
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-full sm:max-w-md">
        <SheetHeader className="text-left">
          <div className="flex items-start gap-4">
            <div className="relative">
              <Avatar size="lg" className="size-16">
                <AvatarImage src={member.avatar} alt={member.name} />
                <AvatarFallback className="text-lg">{initials}</AvatarFallback>
              </Avatar>
              <span
                className={`absolute bottom-1 right-1 size-4 rounded-full ring-2 ring-background ${statusColors[member.status]}`}
              />
            </div>
            <div className="space-y-1">
              <SheetTitle>{member.name}</SheetTitle>
              <SheetDescription>@{member.username}</SheetDescription>
              <div className="flex items-center gap-2 pt-1">
                <Badge variant="outline" className={roleColors[member.role]}>
                  {roleIcons[member.role]}
                  <span className="capitalize">{member.role}</span>
                </Badge>
                {member.department && <Badge variant="secondary">{member.department}</Badge>}
              </div>
            </div>
          </div>
        </SheetHeader>

        <ScrollArea className="mt-6 h-[calc(100vh-200px)]">
          <div className="space-y-6 pr-4">
            {/* Contact Info */}
            <section className="space-y-3">
              <h4 className="text-sm font-medium text-muted-foreground">Contact</h4>
              <div className="space-y-2">
                <div className="flex items-center gap-3 text-sm">
                  <Mail className="size-4 text-muted-foreground" />
                  <span>{member.email}</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <Calendar className="size-4 text-muted-foreground" />
                  <span>Joined {new Date(member.joinedAt).toLocaleDateString()}</span>
                </div>
              </div>
            </section>

            <Separator />

            {/* Role Description */}
            <section className="space-y-3">
              <h4 className="text-sm font-medium text-muted-foreground">Role</h4>
              <p className="text-sm">{roleDescriptions[member.role]}</p>
            </section>

            <Separator />

            {/* Permissions */}
            <section className="space-y-3">
              <h4 className="text-sm font-medium text-muted-foreground">Permissions</h4>
              <div className="grid grid-cols-2 gap-2">
                {Object.entries(member.permissions).map(([key, value]) => (
                  <div
                    key={key}
                    className={`flex items-center gap-2 rounded-md border px-2 py-1.5 text-xs ${
                      value
                        ? "border-green-200 bg-green-500/10 text-green-700 dark:border-green-900/40 dark:bg-green-500/15 dark:text-green-300"
                        : "border-muted bg-muted/50 text-muted-foreground"
                    }`}
                  >
                    <span className={`size-1.5 rounded-full ${value ? "bg-green-500" : "bg-muted-foreground"}`} />
                    <span>
                      {key
                        .replace("can", "")
                        .replace(/([A-Z])/g, " $1")
                        .trim()}
                    </span>
                  </div>
                ))}
              </div>
            </section>

            <Separator />

            {/* Recent Activity */}
            <section className="space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-medium text-muted-foreground">Recent Activity</h4>
                <Button variant="ghost" size="sm" className="h-7 gap-1 text-xs" onClick={handleAskAI}>
                  <Sparkles className="size-3" />
                  Ask AI
                </Button>
              </div>
              <div className="space-y-3">
                {member.recentActivity.map((activity, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="mt-1 flex size-6 items-center justify-center rounded-full bg-muted">
                      <Activity className="size-3 text-muted-foreground" />
                    </div>
                    <div className="flex-1 space-y-0.5">
                      <p className="text-sm">
                        <span className="font-medium">{activity.action}</span> {activity.target}
                      </p>
                      <p className="text-xs text-muted-foreground">{activity.timestamp}</p>
                    </div>
                    <ChevronRight className="mt-1 size-4 text-muted-foreground" />
                  </div>
                ))}
              </div>
            </section>

            <Separator />

            {/* Quick Actions */}
            <section className="space-y-3">
              <h4 className="text-sm font-medium text-muted-foreground">Quick Actions</h4>
              <div className="flex flex-col gap-2">
                <Button variant="outline" className="justify-start" onClick={handleAskAI}>
                  <Sparkles className="size-4" />
                  Ask AI about recent activity
                </Button>
                <Button variant="outline" className="justify-start">
                  <Mail className="size-4" />
                  Send a message
                </Button>
              </div>
            </section>
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
}
