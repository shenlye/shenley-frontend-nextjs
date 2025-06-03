import { ModeToggle } from "@/components/theme-toggle";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import {
  HomeIcon,
  SettingsIcon,
  BookOpenIcon,
  ExternalLinkIcon,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ThemeSelector } from "@/components/theme-selector";

export default function Home() {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen min-w-screen">
        <Sidebar>
          <SidebarHeader className="flex items-start border-b justify-center h-14">
            <span className="text-lg font-bold pl-4">Shenlyy的主页</span>
          </SidebarHeader>
          <SidebarContent className="p-4">
            <SidebarMenu className="gap-2">
              <SidebarMenuItem>
                <SidebarMenuButton isActive tooltip="主页">
                  <HomeIcon className="h-5 w-5" />
                  <span>主页</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <a
                  href="https://blog.ykrazy.top"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex"
                >
                  <SidebarMenuButton tooltip="博客" className="justify-between">
                    <div className="flex items-center gap-2">
                      <BookOpenIcon className="h-4 w-4" />
                      <span>博客</span>
                    </div>
                    <ExternalLinkIcon className="h-3 w-3" />
                  </SidebarMenuButton>
                </a>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <a
                  href="https://ech0.ykrazy.top"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex"
                >
                  <SidebarMenuButton tooltip="说说" className="justify-between">
                    <div className="flex items-center gap-2">
                      <BookOpenIcon className="h-4 w-4" />
                      <span>说说</span>
                    </div>
                    <ExternalLinkIcon className="h-3 w-3" />
                  </SidebarMenuButton>
                </a>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarContent>
          <SidebarFooter className="border-t p-4">
            <Dialog>
              <DialogTrigger asChild>
                <SidebarMenuButton tooltip="设置">
                  <SettingsIcon className="h-5 w-5" />
                  <span>设置</span>
                </SidebarMenuButton>
              </DialogTrigger>
              <DialogContent className="">
                <DialogHeader>
                  <DialogTitle>主题设置</DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <ThemeSelector />
                </div>
              </DialogContent>
            </Dialog>
          </SidebarFooter>
        </Sidebar>
        <div className="flex flex-1 flex-col">
          <header className="flex h-14 items-center justify-between border-b px-6">
            <SidebarTrigger />
            <ModeToggle />
          </header>
          <main className="flex-1 p-6">
            <h1 className="text-3xl font-bold mb-6">欢迎来到我的主页</h1>
            <p className="text-lg text-muted-foreground">
              这是一个使用shadcn/ui组件的主页
            </p>
            <h2 className="text-2xl font-bold mt-4">待办事项</h2>
            <ul className="list-disc pl-6 mt-4">
              <li>追番和游戏页面搬过来</li>
              <li>写一个自己的说说系统</li>
              <li>实现登入和后台管理</li>
              <li>使用Nestjs实现说说和文章的后端API</li>
              <li>在这里显示最近的几篇文章</li>
              <li>弄一个精美的个人首页</li>
            </ul>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
