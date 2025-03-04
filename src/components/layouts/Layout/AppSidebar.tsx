import { Calendar, Frame, PanelsTopLeft, PersonStanding } from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@components/ui/sidebar";
import { TeamSwitcher } from "./TeamSwitcher";
import { NavUser } from "./NavUser";
import { ComponentProps } from "react";
import { NavMain } from "./NavMain";

const data = {
  navMain: [
    {
      title: "Calendar",
      url: "/calendar",
      icon: Calendar,
      items: [],
    },
    {
      title: "Patients",
      url: "/patients",
      icon: PersonStanding,
      items: [],
    },
    {
      title: "Doctors",
      url: "/doctors",
      icon: PanelsTopLeft,
      items: [],
    },
    {
      title: "Appointment",
      url: "/appointment",
      icon: Frame,
      items: [],
    },
  ],
};

export function AppSidebar({ ...props }: ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
