"use client";

import { useState } from "react";

import { Check, Crown, Eye, Shield, ShieldCheck } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { roleColors, roleDescriptions, type TeamMember, type UserRole } from "@/data/users";

interface ChangePermissionsDialogProps {
  member: TeamMember;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const roleIcons: Record<UserRole, React.ReactNode> = {
  owner: <Crown className="size-4" />,
  admin: <ShieldCheck className="size-4" />,
  editor: <Shield className="size-4" />,
  viewer: <Eye className="size-4" />,
};

export function ChangePermissionsDialog({ member, open, onOpenChange }: ChangePermissionsDialogProps) {
  const [role, setRole] = useState<UserRole>(member.role);
  const [permissions, setPermissions] = useState(member.permissions);
  const [isLoading, setIsLoading] = useState(false);

  const handlePermissionChange = (key: keyof typeof permissions, value: boolean) => {
    setPermissions((prev) => ({ ...prev, [key]: value }));
  };

  const handleRoleChange = (newRole: UserRole) => {
    setRole(newRole);
    // Auto-adjust permissions based on role
    switch (newRole) {
      case "owner":
        setPermissions({
          canManageTeam: true,
          canManageProjects: true,
          canManageBilling: true,
          canViewAnalytics: true,
          canEditContent: true,
          canInviteMembers: true,
        });
        break;
      case "admin":
        setPermissions({
          canManageTeam: true,
          canManageProjects: true,
          canManageBilling: false,
          canViewAnalytics: true,
          canEditContent: true,
          canInviteMembers: true,
        });
        break;
      case "editor":
        setPermissions({
          canManageTeam: false,
          canManageProjects: true,
          canManageBilling: false,
          canViewAnalytics: true,
          canEditContent: true,
          canInviteMembers: false,
        });
        break;
      case "viewer":
        setPermissions({
          canManageTeam: false,
          canManageProjects: false,
          canManageBilling: false,
          canViewAnalytics: true,
          canEditContent: false,
          canInviteMembers: false,
        });
        break;
    }
  };

  const handleSave = async () => {
    setIsLoading(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsLoading(false);
    onOpenChange(false);
  };

  const initials = member.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();

  const permissionLabels = {
    canManageTeam: "Manage Team Members",
    canManageProjects: "Manage Projects",
    canManageBilling: "Manage Billing",
    canViewAnalytics: "View Analytics",
    canEditContent: "Edit Content",
    canInviteMembers: "Invite New Members",
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <div className="flex items-center gap-3">
            <div className="flex size-10 items-center justify-center rounded-full bg-primary/10">
              <Shield className="size-5 text-primary" />
            </div>
            <div>
              <DialogTitle>Change Permissions</DialogTitle>
              <DialogDescription>Manage role and access permissions</DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <div className="space-y-4 py-4">
          {/* Member Info */}
          <div className="flex items-center gap-3 rounded-lg border bg-muted/50 p-3">
            <Avatar>
              <AvatarImage src={member.avatar} alt={member.name} />
              <AvatarFallback>{initials}</AvatarFallback>
            </Avatar>
            <div>
              <p className="font-medium">{member.name}</p>
              <p className="text-xs text-muted-foreground">{member.email}</p>
            </div>
          </div>

          {/* Role Selection */}
          <div className="space-y-2">
            <Label>Role</Label>
            <Select
              value={role}
              onValueChange={(value: UserRole) => handleRoleChange(value)}
              disabled={member.role === "owner"}
            >
              <SelectTrigger className="w-full">
                <SelectValue>
                  <div className="flex items-center gap-2">
                    {roleIcons[role]}
                    <span className="capitalize">{role}</span>
                  </div>
                </SelectValue>
              </SelectTrigger>
              <SelectContent>
                {member.role === "owner" && (
                  <SelectItem value="owner">
                    <div className="flex items-center gap-2">
                      <Crown className="size-4" />
                      <span>Owner</span>
                    </div>
                  </SelectItem>
                )}
                <SelectItem value="admin">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="size-4" />
                    <span>Admin</span>
                  </div>
                </SelectItem>
                <SelectItem value="editor">
                  <div className="flex items-center gap-2">
                    <Shield className="size-4" />
                    <span>Editor</span>
                  </div>
                </SelectItem>
                <SelectItem value="viewer">
                  <div className="flex items-center gap-2">
                    <Eye className="size-4" />
                    <span>Viewer</span>
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
            <p className="text-xs text-muted-foreground">{roleDescriptions[role]}</p>
          </div>

          <Separator />

          {/* Granular Permissions */}
          <div className="space-y-3">
            <Label>Permissions</Label>
            <div className="space-y-3">
              {Object.entries(permissionLabels).map(([key, label]) => (
                <div key={key} className="flex items-center justify-between">
                  <Label htmlFor={key} className="flex-1 cursor-pointer text-sm font-normal">
                    {label}
                  </Label>
                  <Checkbox
                    id={key}
                    checked={permissions[key as keyof typeof permissions]}
                    onCheckedChange={(checked) =>
                      handlePermissionChange(key as keyof typeof permissions, checked === true)
                    }
                    disabled={role === "owner"}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Changes Summary */}
          {(role !== member.role || JSON.stringify(permissions) !== JSON.stringify(member.permissions)) && (
            <div className="rounded-lg border border-amber-200 bg-amber-500/10 p-3 dark:border-amber-900/40 dark:bg-amber-500/15">
              <p className="text-xs font-medium text-amber-700 dark:text-amber-300">
                Changes will be applied immediately
              </p>
              {role !== member.role && (
                <p className="text-xs text-amber-600 dark:text-amber-400">
                  Role:{" "}
                  <Badge variant="outline" className={`text-xs ${roleColors[member.role]}`}>
                    {member.role}
                  </Badge>{" "}
                  →{" "}
                  <Badge variant="outline" className={`text-xs ${roleColors[role]}`}>
                    {role}
                  </Badge>
                </p>
              )}
            </div>
          )}
        </div>

        <DialogFooter showCloseButton>
          <Button onClick={handleSave} disabled={isLoading}>
            {isLoading ? (
              "Saving..."
            ) : (
              <>
                <Check className="size-4" />
                Save Changes
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
