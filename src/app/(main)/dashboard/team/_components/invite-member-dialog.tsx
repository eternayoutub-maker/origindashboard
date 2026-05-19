"use client";

import { useState } from "react";

import { Mail, Send, UserPlus, Users } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { roleDescriptions, type UserRole } from "@/data/users";

interface InviteMemberDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function InviteMemberDialog({ open, onOpenChange }: InviteMemberDialogProps) {
  const [email, setEmail] = useState("");
  const [role, setRole] = useState<UserRole>("viewer");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async () => {
    setIsLoading(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsLoading(false);
    onOpenChange(false);
    // Reset form
    setEmail("");
    setRole("viewer");
    setMessage("");
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <div className="flex items-center gap-3">
            <div className="flex size-10 items-center justify-center rounded-full bg-primary/10">
              <UserPlus className="size-5 text-primary" />
            </div>
            <div>
              <DialogTitle>Invite Team Member</DialogTitle>
              <DialogDescription>Send an invitation to join your workspace</DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email Address</Label>
            <div className="relative">
              <Mail className="absolute left-2.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                id="email"
                type="email"
                placeholder="colleague@company.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="pl-9"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="role">Role & Permissions</Label>
            <Select value={role} onValueChange={(value: UserRole) => setRole(value)}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select a role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="admin">
                  <div className="flex items-center gap-2">
                    <Users className="size-4" />
                    <span>Admin</span>
                  </div>
                </SelectItem>
                <SelectItem value="editor">
                  <div className="flex items-center gap-2">
                    <Users className="size-4" />
                    <span>Editor</span>
                  </div>
                </SelectItem>
                <SelectItem value="viewer">
                  <div className="flex items-center gap-2">
                    <Users className="size-4" />
                    <span>Viewer</span>
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
            <p className="text-xs text-muted-foreground">{roleDescriptions[role]}</p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="message">Personal Message (Optional)</Label>
            <Textarea
              id="message"
              placeholder="Add a personal message to the invitation..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={3}
              className="resize-none"
            />
          </div>

          <div className="rounded-lg border bg-muted/50 p-3">
            <h4 className="mb-2 text-sm font-medium">Invitation Preview</h4>
            <div className="space-y-1 text-xs text-muted-foreground">
              <p>
                <span className="font-medium text-foreground">To:</span> {email || "colleague@company.com"}
              </p>
              <p>
                <span className="font-medium text-foreground">Role:</span> <span className="capitalize">{role}</span>
              </p>
              {message && (
                <p>
                  <span className="font-medium text-foreground">Message:</span> {message}
                </p>
              )}
            </div>
          </div>
        </div>

        <DialogFooter showCloseButton>
          <Button onClick={handleSubmit} disabled={!email || isLoading}>
            {isLoading ? (
              "Sending..."
            ) : (
              <>
                <Send className="size-4" />
                Send Invitation
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
