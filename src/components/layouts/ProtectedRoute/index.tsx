import { RootState } from "@application/store/store";
import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@components/ui/sidebar";
import { Separator } from "@components/ui/separator";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@components/ui/breadcrumb";
import { Outlet } from "react-router-dom";
import { AppSidebar } from "../Layout/AppSidebar";

const ProtectedRoute = () => {
  const { user } = useSelector((state: RootState) => state.auth);
  const location = useLocation();

  return user ? (
    <>
      {location.pathname === "/" ? (
        <Navigate to="/calendar" replace />
      ) : (
        <SidebarProvider>
          <AppSidebar />
          <SidebarInset className="flex flex-col w-full p-screen">
            <header className="flex h-[64px] shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
              <div className="flex items-center gap-2 px-4">
                <SidebarTrigger className="-ml-1" />
                <Separator orientation="vertical" className="mr-2 h-4" />
                <Breadcrumb>
                  <BreadcrumbList>
                    <BreadcrumbItem className="hidden md:block">
                      <BreadcrumbLink>Clinica Arequipa</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator className="hidden md:block" />
                    <BreadcrumbItem>
                      <BreadcrumbLink>
                        {user.role?.[0]?.toUpperCase()}
                        {user.role?.substring(1, user.role.length)}
                      </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator className="hidden md:block" />
                    <BreadcrumbItem>
                      <BreadcrumbPage>
                        {location.pathname
                          ?.replace("/", "")?.[0]
                          ?.toUpperCase()}
                        {location.pathname
                          ?.replace("/", "")
                          ?.substring(1, location.pathname.length)}
                      </BreadcrumbPage>
                    </BreadcrumbItem>
                  </BreadcrumbList>
                </Breadcrumb>
              </div>
            </header>
            <div className="h-[calc(100%-64px)] overflow-hidden">
              <Outlet />
            </div>
          </SidebarInset>
        </SidebarProvider>
      )}
    </>
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};

export default ProtectedRoute;
