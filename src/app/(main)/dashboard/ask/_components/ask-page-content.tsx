"use client";

import { useState } from "react";

import { useRouter } from "next/navigation";

import { UserPlus } from "lucide-react";

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

import { ChatHeader } from "./chat-history-sidebar";
import { ChatHistorySidebar } from "./chat-history-sidebar";
import { ChatInterface } from "./chat-interface";

export function AskPageContent() {
  const router = useRouter();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [selectedChatId, setSelectedChatId] = useState<string | null>(null);
  const [isInviteDialogOpen, setIsInviteDialogOpen] = useState(false);
  const [inviteEmail, setInviteEmail] = useState("");

  const handleNewChat = () => {
    setSelectedChatId(null);
  };

  const handleSelectChat = (id: string) => {
    setSelectedChatId(id);
  };

  const handleOpenInNewPage = () => {
    router.push("/chatwithai");
  };

  const handleInviteCollaborators = () => {
    setIsInviteDialogOpen(true);
  };

  const handleSendInvite = () => {
    // In a real app, this would send an invite
    console.log("Sending invite to:", inviteEmail);
    setInviteEmail("");
    setIsInviteDialogOpen(false);
  };

  return (
    <>
      <div className="flex h-full overflow-hidden rounded-lg border bg-background">
        {/* History Sidebar */}
        <ChatHistorySidebar
          isOpen={isSidebarOpen}
          onToggle={() => setIsSidebarOpen(!isSidebarOpen)}
          onNewChat={handleNewChat}
          onSelectChat={handleSelectChat}
          selectedChatId={selectedChatId}
        />

        {/* Main Chat Area */}
        <div className="relative flex flex-1 flex-col">
          <ChatHeader
            onOpenInNewPage={handleOpenInNewPage}
            onInviteCollaborators={handleInviteCollaborators}
          />
          <ChatInterface className="flex-1" />
        </div>
      </div>

      {/* Invite Collaborators Dialog */}
      <Dialog open={isInviteDialogOpen} onOpenChange={setIsInviteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Invite Collaborators</DialogTitle>
            <DialogDescription>
              Invite team members to collaborate on this chat. They will be able
              to view and contribute to the conversation.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email address</Label>
              <Input
                id="email"
                type="email"
                placeholder="colleague@company.com"
                value={inviteEmail}
                onChange={(e) => setInviteEmail(e.target.value)}
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsInviteDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button onClick={handleSendInvite} disabled={!inviteEmail.trim()}>
              <UserPlus className="mr-2 size-4" />
              Send Invite
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
