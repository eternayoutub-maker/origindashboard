"use client";

import { useState } from "react";

import {
  ArrowUpRight,
  ChevronLeft,
  ChevronRight,
  MessageSquare,
  MoreHorizontal,
  PanelLeftClose,
  PanelLeftOpen,
  Plus,
  Search,
  Trash2,
  UserPlus,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";

interface ChatHistoryItem {
  id: string;
  title: string;
  timestamp: string;
  preview: string;
}

const mockHistory: ChatHistoryItem[] = [
  {
    id: "1",
    title: "Project Architecture Review",
    timestamp: "2 hours ago",
    preview: "Can you help me review the architecture...",
  },
  {
    id: "2",
    title: "Database Schema Design",
    timestamp: "Yesterday",
    preview: "I need help designing a database schema...",
  },
  {
    id: "3",
    title: "API Integration Help",
    timestamp: "Yesterday",
    preview: "How do I integrate the Stripe API...",
  },
  {
    id: "4",
    title: "React Performance Tips",
    timestamp: "3 days ago",
    preview: "What are the best practices for...",
  },
  {
    id: "5",
    title: "TypeScript Generics",
    timestamp: "Last week",
    preview: "Can you explain TypeScript generics...",
  },
];

interface ChatHistorySidebarProps {
  isOpen: boolean;
  onToggle: () => void;
  onNewChat: () => void;
  onSelectChat: (id: string) => void;
  selectedChatId: string | null;
}

export function ChatHistorySidebar({
  isOpen,
  onToggle,
  onNewChat,
  onSelectChat,
  selectedChatId,
}: ChatHistorySidebarProps) {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredHistory = mockHistory.filter(
    (item) =>
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.preview.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      {/* Toggle button when sidebar is closed */}
      {!isOpen && (
        <Button
          variant="ghost"
          size="icon"
          onClick={onToggle}
          className="absolute left-4 top-4 z-10"
          aria-label="Open chat history"
        >
          <PanelLeftOpen className="size-5" />
        </Button>
      )}

      {/* Sidebar */}
      <div
        className={cn(
          "flex h-full flex-col border-r bg-card transition-all duration-300 ease-in-out",
          isOpen ? "w-72" : "w-0 overflow-hidden"
        )}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b p-3">
          <h2 className="font-semibold">Chat History</h2>
          <div className="flex items-center gap-1">
            <Button
              variant="ghost"
              size="icon"
              onClick={onNewChat}
              className="size-8"
              aria-label="New chat"
            >
              <Plus className="size-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={onToggle}
              className="size-8"
              aria-label="Close sidebar"
            >
              <PanelLeftClose className="size-4" />
            </Button>
          </div>
        </div>

        {/* Search */}
        <div className="p-3">
          <div className="relative">
            <Search className="absolute left-2.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search chats..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="h-9 pl-8"
            />
          </div>
        </div>

        {/* Chat list */}
        <ScrollArea className="flex-1">
          <div className="space-y-1 p-2">
            {filteredHistory.length === 0 ? (
              <p className="px-3 py-6 text-center text-sm text-muted-foreground">
                No chats found
              </p>
            ) : (
              filteredHistory.map((chat) => (
                <div
                  key={chat.id}
                  className={cn(
                    "group flex cursor-pointer items-start gap-3 rounded-lg p-3 transition-colors hover:bg-accent",
                    selectedChatId === chat.id && "bg-accent"
                  )}
                  onClick={() => onSelectChat(chat.id)}
                  onKeyDown={(e) => e.key === "Enter" && onSelectChat(chat.id)}
                  tabIndex={0}
                  role="button"
                >
                  <MessageSquare className="mt-0.5 size-4 shrink-0 text-muted-foreground" />
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium">{chat.title}</p>
                    <p className="truncate text-xs text-muted-foreground">
                      {chat.timestamp}
                    </p>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="size-6 shrink-0 opacity-0 transition-opacity group-hover:opacity-100"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <MoreHorizontal className="size-3" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem className="text-destructive">
                        <Trash2 className="size-4" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              ))
            )}
          </div>
        </ScrollArea>
      </div>
    </>
  );
}

interface ChatHeaderProps {
  onOpenInNewPage: () => void;
  onInviteCollaborators: () => void;
}

export function ChatHeader({
  onOpenInNewPage,
  onInviteCollaborators,
}: ChatHeaderProps) {
  return (
    <div className="flex items-center justify-between border-b px-4 py-3">
      <div className="flex items-center gap-2">
        <MessageSquare className="size-5 text-muted-foreground" />
        <h1 className="font-semibold">AI Assistant</h1>
      </div>
      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={onInviteCollaborators}
          className="gap-2"
        >
          <UserPlus className="size-4" />
          <span className="hidden sm:inline">Invite</span>
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={onOpenInNewPage}
          className="gap-2"
        >
          <ArrowUpRight className="size-4" />
          <span className="hidden sm:inline">Open in new page</span>
        </Button>
      </div>
    </div>
  );
}
