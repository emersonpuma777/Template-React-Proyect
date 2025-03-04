import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@components/ui/sidebar";
import { useSelector } from "react-redux";
import { RootState } from "@application/store/store";
import { Command } from "lucide-react";

export function TeamSwitcher() {
  const { user } = useSelector((state: RootState) => state.auth);

  return (
    <SidebarMenu className="text-white">
      <SidebarMenuItem>
        <SidebarMenuButton
          size="lg"
          className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground hover:bg-sidebar"
        >
          <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
            <Command color="#fff" className="size-4" />
          </div>
          <div className="grid flex-1 text-left text-sm leading-tight">
            <span className="truncate font-semibold">Clinica Arequipa</span>
            <span className="truncate text-xs">
              {user?.role?.toUpperCase()}
            </span>
          </div>
        </SidebarMenuButton>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
