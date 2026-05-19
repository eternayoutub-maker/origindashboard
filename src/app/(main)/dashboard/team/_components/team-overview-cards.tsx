"use client";

import { Crown, Eye, Shield, ShieldCheck, UserCheck, UserMinus, Users } from "lucide-react";

import { Card, CardContent, CardDescription, CardHeader } from "@/components/ui/card";
import type { TeamMember } from "@/data/users";

interface TeamOverviewCardsProps {
  members: TeamMember[];
}

export function TeamOverviewCards({ members }: TeamOverviewCardsProps) {
  const totalMembers = members.length;
  const activeMembers = members.filter((m) => m.status === "active").length;
  const admins = members.filter((m) => m.role === "admin" || m.role === "owner").length;
  const pendingInvites = 2; // Demo value

  const stats = [
    {
      label: "Total Members",
      value: totalMembers,
      icon: Users,
      description: "Active team members",
    },
    {
      label: "Online Now",
      value: activeMembers,
      icon: UserCheck,
      description: "Currently active",
      highlight: true,
    },
    {
      label: "Administrators",
      value: admins,
      icon: ShieldCheck,
      description: "With admin access",
    },
    {
      label: "Pending Invites",
      value: pendingInvites,
      icon: UserMinus,
      description: "Awaiting response",
    },
  ];

  return (
    <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
      {stats.map((stat) => (
        <Card key={stat.label} size="sm">
          <CardHeader className="pb-2">
            <CardDescription className="flex items-center gap-2">
              <stat.icon className="size-4" />
              {stat.label}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-semibold tracking-tight">{stat.value}</span>
              {stat.highlight && <span className="flex size-2 animate-pulse rounded-full bg-green-500" />}
            </div>
            <p className="text-xs text-muted-foreground">{stat.description}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

export function RoleDistribution({ members }: TeamOverviewCardsProps) {
  const roles = [
    {
      role: "owner",
      label: "Owner",
      icon: Crown,
      count: members.filter((m) => m.role === "owner").length,
      color: "text-amber-600 dark:text-amber-400",
      bg: "bg-amber-500/10",
    },
    {
      role: "admin",
      label: "Admins",
      icon: ShieldCheck,
      count: members.filter((m) => m.role === "admin").length,
      color: "text-blue-600 dark:text-blue-400",
      bg: "bg-blue-500/10",
    },
    {
      role: "editor",
      label: "Editors",
      icon: Shield,
      count: members.filter((m) => m.role === "editor").length,
      color: "text-green-600 dark:text-green-400",
      bg: "bg-green-500/10",
    },
    {
      role: "viewer",
      label: "Viewers",
      icon: Eye,
      count: members.filter((m) => m.role === "viewer").length,
      color: "text-gray-600 dark:text-gray-400",
      bg: "bg-gray-500/10",
    },
  ];

  return (
    <Card>
      <CardHeader>
        <CardDescription>Role Distribution</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between gap-4">
          {roles.map((role) => (
            <div key={role.role} className="flex flex-1 flex-col items-center gap-2">
              <div className={`flex size-10 items-center justify-center rounded-full ${role.bg}`}>
                <role.icon className={`size-5 ${role.color}`} />
              </div>
              <div className="text-center">
                <p className="text-xl font-semibold">{role.count}</p>
                <p className="text-xs text-muted-foreground">{role.label}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
