"use client";

import { ChartBar, LayoutDashboard, Link, Link2 } from "lucide-react";
import { authClient } from "@/lib/auth-client";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { NavMain } from "./nav-main";
import { NavUser } from "./nav-user";

const data = {
  navMain: [
    {
      title: "Filmes",
      url: "../filmes",
      icon: LayoutDashboard,
    },
    {
      title: "DashBoard",
      url: "../dashboard",
      icon: Link2,
    },
    {
      title: "Recomendações",
      url: "../src/app/(Private)/recomendacoes/page.js",
      icon: ChartBar,
    },
  ],
};

export function AppSidebar({ ...props }) {
  const { data: session, isPending } = authClient.useSession();
  
  const user = session?.user
    ? {
        name: session.user.name ?? "Usuário",
        email: session.user.email ?? "",
        image: session.user.image ?? `https://api.dicebear.com/10.x/adventurer-neutral/svg?seed=${session.user.name}`,
      }
    : null;

  const ConsoleName = user?.name ? user.name.trim().split(' ')[0] : "WishLy";

  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:p-1.5!"
            >
              <a href="#">
                <Link className="size-5!" />
                <span>
                  Olá, {ConsoleName}
                </span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      
      <SidebarFooter>
        {!isPending && user && <NavUser user={user} />}
      </SidebarFooter>
    </Sidebar>
  );
}