"use client";

import { useState } from "react";

import { useRouter } from "next/navigation";

import { Grid3X3, List, Search, UserPlus } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { type TeamMember, teamMembers, type UserRole, type UserStatus } from "@/data/users";

import { InviteMemberDialog } from "./invite-member-dialog";
import { AddMemberButton, TeamMemberCard, TeamMemberListItem } from "./team-member-card";
import { RoleDistribution, TeamOverviewCards } from "./team-overview-cards";

export function TeamPageContent() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [roleFilter, setRoleFilter] = useState<UserRole | "all">("all");
  const [statusFilter, setStatusFilter] = useState<UserStatus | "all">("all");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [isInviteOpen, setIsInviteOpen] = useState(false);

  const filteredMembers = teamMembers.filter((member) => {
    const matchesSearch =
      member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.username.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesRole = roleFilter === "all" || member.role === roleFilter;
    const matchesStatus = statusFilter === "all" || member.status === statusFilter;

    return matchesSearch && matchesRole && matchesStatus;
  });

  const handleAskAI = (member: TeamMember) => {
    // Navigate to Ask page with context about the member
    router.push(
      `/dashboard/ask?context=team-member&memberId=${member.id}&memberName=${encodeURIComponent(member.name)}`,
    );
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <section className="space-y-1">
        <h1 className="text-3xl tracking-tight">Team Management</h1>
        <p className="text-sm text-muted-foreground">Manage your team members, roles, and permissions in one place</p>
      </section>

      {/* Overview Cards */}
      <TeamOverviewCards members={teamMembers} />

      {/* Role Distribution */}
      <RoleDistribution members={teamMembers} />

      {/* Team Members Section */}
      <section className="space-y-4">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <h2 className="text-xl font-medium">Team Members</h2>
          <Button onClick={() => setIsInviteOpen(true)}>
            <UserPlus className="size-4" />
            Invite Member
          </Button>
        </div>

        {/* Filters */}
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-1 items-center gap-3">
            <div className="relative flex-1 sm:max-w-xs">
              <Search className="absolute left-2.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search members..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>
            <Select value={roleFilter} onValueChange={(value: UserRole | "all") => setRoleFilter(value)}>
              <SelectTrigger className="w-32">
                <SelectValue placeholder="Role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Roles</SelectItem>
                <SelectItem value="owner">Owner</SelectItem>
                <SelectItem value="admin">Admin</SelectItem>
                <SelectItem value="editor">Editor</SelectItem>
                <SelectItem value="viewer">Viewer</SelectItem>
              </SelectContent>
            </Select>
            <Select value={statusFilter} onValueChange={(value: UserStatus | "all") => setStatusFilter(value)}>
              <SelectTrigger className="w-32">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="away">Away</SelectItem>
                <SelectItem value="busy">Busy</SelectItem>
                <SelectItem value="offline">Offline</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center gap-1 rounded-lg border bg-muted/50 p-1">
            <Button
              variant={viewMode === "grid" ? "secondary" : "ghost"}
              size="icon-sm"
              onClick={() => setViewMode("grid")}
            >
              <Grid3X3 className="size-4" />
            </Button>
            <Button
              variant={viewMode === "list" ? "secondary" : "ghost"}
              size="icon-sm"
              onClick={() => setViewMode("list")}
            >
              <List className="size-4" />
            </Button>
          </div>
        </div>

        {/* Members Display */}
        <Tabs value={viewMode} className="w-full">
          <TabsList className="sr-only">
            <TabsTrigger value="grid">Grid</TabsTrigger>
            <TabsTrigger value="list">List</TabsTrigger>
          </TabsList>

          <TabsContent value="grid" className="mt-0">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
              {filteredMembers.map((member) => (
                <TeamMemberCard key={member.id} member={member} onAskAI={handleAskAI} />
              ))}
              <AddMemberButton onClick={() => setIsInviteOpen(true)} />
            </div>
          </TabsContent>

          <TabsContent value="list" className="mt-0">
            <div className="flex flex-col gap-2">
              {filteredMembers.map((member) => (
                <TeamMemberListItem key={member.id} member={member} onAskAI={handleAskAI} />
              ))}
            </div>
          </TabsContent>
        </Tabs>

        {filteredMembers.length === 0 && (
          <div className="flex flex-col items-center justify-center rounded-lg border border-dashed py-12">
            <p className="text-muted-foreground">No team members found</p>
            <p className="text-sm text-muted-foreground">Try adjusting your search or filters</p>
          </div>
        )}
      </section>

      <InviteMemberDialog open={isInviteOpen} onOpenChange={setIsInviteOpen} />
    </div>
  );
}
