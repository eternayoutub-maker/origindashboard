"use client";

import { useState } from "react";

import { Check, ChevronDown, Hexagon, Plus } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";

interface Workspace {
  id: string;
  name: string;
  color: string;
}

const workspaces: Workspace[] = [
  { id: "1", name: "Balfin Workspace", color: "bg-emerald-500" },
  { id: "2", name: "Marketing Team", color: "bg-blue-500" },
  { id: "3", name: "Development Hub", color: "bg-orange-500" },
];

export function WorkspaceSwitcher() {
  const [activeWorkspace, setActiveWorkspace] = useState(workspaces[0]);

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <div
                className={cn(
                  "flex size-8 items-center justify-center rounded-lg",
                  activeWorkspace.color
                )}
              >
                <Hexagon className="size-4 text-white" />
              </div>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-semibold">{activeWorkspace.name}</span>
              </div>
              <ChevronDown className="ml-auto size-4 opacity-50" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
            side="bottom"
            align="start"
            sideOffset={4}
          >
            {workspaces.map((workspace) => (
              <DropdownMenuItem
                key={workspace.id}
                onClick={() => setActiveWorkspace(workspace)}
                className={cn(
                  "gap-3 p-2",
                  workspace.id === activeWorkspace.id && "bg-accent/50"
                )}
              >
                <div
                  className={cn(
                    "flex size-8 items-center justify-center rounded-lg",
                    workspace.color
                  )}
                >
                  <Hexagon className="size-4 text-white" />
                </div>
                <span className="flex-1 truncate font-medium">{workspace.name}</span>
                {workspace.id === activeWorkspace.id && (
                  <Check className="size-4 text-primary" />
                )}
              </DropdownMenuItem>
            ))}
            <DropdownMenuSeparator />
            <DropdownMenuItem className="gap-3 p-2">
              <div className="flex size-8 items-center justify-center rounded-lg border border-dashed border-muted-foreground/50">
                <Plus className="size-4 text-muted-foreground" />
              </div>
              <span className="font-medium text-muted-foreground">Join Workspace</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
