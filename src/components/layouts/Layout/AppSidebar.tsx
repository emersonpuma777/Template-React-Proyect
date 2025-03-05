import {
  Calendar,
  Frame,
  PanelsTopLeft,
  PersonStanding,
  Sofa,
} from "lucide-react";

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
import { useSelector } from "react-redux";
import { RootState } from "@application/store/store";

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
    {
      title: "Specialties",
      url: "/specialty",
      icon: Sofa,
      items: [],
    },
  ],
};

const dataPatient = {
  navMain: [
    {
      title: "Calendar",
      url: "/calendar",
      icon: Calendar,
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

const dataDoctor = {
  navMain: [
    {
      title: "Calendar",
      url: "/calendar",
      icon: Calendar,
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
  const { user } = useSelector((state: RootState) => state.auth);
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher />
      </SidebarHeader>
      <SidebarContent>
        <NavMain
          items={
            user?.role === "admin"
              ? data.navMain
              : user?.role === "doctor"
              ? dataDoctor.navMain
              : dataPatient.navMain
          }
        />
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
