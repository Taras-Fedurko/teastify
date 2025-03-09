"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { ChevronsUpDown, Plus } from "lucide-react"
import { Project } from "@prisma/client"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar"
import { useProjects } from "@/lib/api/hooks"
import { getProjectRoute, routes } from "@/routes"
import { Skeleton } from "@/components/ui/skeleton"

export function TeamSwitcher() {
  const [activeProject, setActiveProject] = React.useState<null | Project>(null);

  const { isMobile } = useSidebar();

  const router = useRouter();

  const { data } = useProjects();

  React.useEffect(() => {
    // TODO add active logic
    if (data) {
      setActiveProject(data[0])
    }
  }, [data])

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-semibold">
                  {activeProject?.name ? activeProject.name : <Skeleton className="w-full h-[17px]" />}
                </span>
              </div>
              <ChevronsUpDown className="ml-auto" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
            align="start"
            side={isMobile ? "bottom" : "right"}
            sideOffset={4}
          >
            <DropdownMenuLabel className="text-xs text-muted-foreground" aria-disabled={!data}>
              Projects
            </DropdownMenuLabel>
            {data?.map((project, index) => (
              <DropdownMenuItem
                key={project.name}
                onClick={() => {
                  setActiveProject(project);

                  router.push(getProjectRoute(project.id));
                }}
                className="gap-2 p-2 cursor-pointer"
              >
                {project.name}
                <DropdownMenuShortcut>⌘{index + 1}</DropdownMenuShortcut>
              </DropdownMenuItem>
            ))}
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className="gap-2 p-2 cursor-pointer"
              onClick={() => router.push(routes.project.new)}
            >
              <div className="flex size-6 items-center justify-center rounded-md border bg-background">
                <Plus className="size-4" />
              </div>
              <div className="font-medium text-muted-foreground">Add project</div>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}
