"use client"

import { usePathname } from "next/navigation"
import {
  FileText,
  Search,
  Home,
  Database,
  Sparkles,
  AlertTriangle,
  LogOut,
} from "lucide-react"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { NavMain } from "./nav-main"
import { NavUser } from "./nav-user"
import Link from "next/link"
import { clearAuthToken } from "@/lib/api-client"
import { useRouter } from "next/navigation"

export function AppSidebar() {
  const pathname = usePathname()
  const router = useRouter()

  const handleLogout = () => {
    clearAuthToken()
    router.push('/login')
  }

  const mainItems = [
    {
      name: "Content Generation",
      href: "/",
      icon: Sparkles,
      isActive: pathname === "/",
    },
    {
      name: "RAG Management",
      href: "/rag-management",
      icon: Database,
      isActive: pathname.startsWith("/rag-management"),
    },
    {
      name: "Knowledge Gaps",
      href: "/knowledge-gaps",
      icon: AlertTriangle,
      isActive: pathname.startsWith("/knowledge-gaps"),
    },
  ]

  return (
    <>
      <Sidebar variant="inset" collapsible="icon" >
        <SidebarHeader>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton size="lg" asChild>
                <Link href="/">
                  <div className="text-md">💎</div>
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-medium text-lg">STOMATON</span>
                    <span className="truncate text-xs text-muted-foreground">Stone Intelligence</span>
                  </div>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarHeader>
        <SidebarContent>
          <NavMain title="Main Navigation" items={mainItems} />
        </SidebarContent>
        <SidebarFooter>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton onClick={handleLogout} className="w-full">
                <LogOut className="h-4 w-4" />
                <span>Logout</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
          <NavUser />
        </SidebarFooter>
      </Sidebar>
    </>
  )
}