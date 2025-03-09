"use client"

import * as React from "react"
import { Settings2 } from "lucide-react"

import { NavigationMain } from "./NavigationMain"
import { NavigationUser } from "./NavigationUser"
import { TeamSwitcher } from "./TeamSwitcher"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button"
import { useParams, useRouter } from "next/navigation"
import { getProjectPostsNewRoute, getProjectPostsRoute, getProjectRoute, getProjectSettingRoute, getProjectTeamRoute, routes } from "@/routes"
import { useProjects } from "@/lib/api/hooks"

const navMain = [
  {
    title: "Dashboard",
    url: routes.dashboard,
  },
]

export function NavigationSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const router = useRouter();
  const { projectId } = useParams<{ projectId?: string }>();

  const navProject = React.useMemo(() => projectId ? [
    {
      title: "Project",
      url: getProjectRoute(projectId),
    },
    {
      title: "Posts",
      url: getProjectPostsRoute(projectId),
    },
    {
      title: "Settings",
      url: "#",
      icon: Settings2,
      items: [
        {
          title: "General",
          url: getProjectSettingRoute(projectId),
        },
        {
          title: "Team",
          url: getProjectTeamRoute(projectId),
        }
      ],
    },
  ] : [], [projectId]);

  const { data } = useProjects();

  React.useEffect(() => {
    if (Array.isArray(data) && data.length === 0) {
      router.replace(routes.project.new)
    }
  }, [data, router]);

  const projects = data?.map((project) => ({
    title: project.name,
    url: getProjectRoute(project.id),
  })) ?? [];

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher />
      </SidebarHeader>
      <SidebarContent>
        {projectId && (
          <Button
            className="mx-4"
            variant="default"
            size="sm"
            onClick={() => {
              router.push(getProjectPostsNewRoute(projectId))
            }}>
            Create new post
          </Button> 
        )}
        
        <NavigationMain items={navMain} />
        {!!projectId && <NavigationMain items={navProject} label="Project" />}
        {!!projects.length && <NavigationMain items={projects} label="Projects" />}
      </SidebarContent>
      <SidebarFooter>
        <NavigationUser />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
