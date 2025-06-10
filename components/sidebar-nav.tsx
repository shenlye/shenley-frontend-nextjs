'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import {
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import {
  HomeIcon,
  BookOpenIcon,
  ExternalLinkIcon,
} from "lucide-react";

export function SidebarNav() {
  const pathname = usePathname();

  const navItems = [
    {
      href: '/',
      icon: <HomeIcon className="h-5 w-5" />,
      label: '主页',
      tooltip: '主页',
      isExternal: false
    },
    {
      href: '/blog',
      icon: <BookOpenIcon className="h-5 w-5" />,
      label: '文章',
      tooltip: '文章',
      isExternal: false
    },
  ];

  return (
    <>
      {navItems.map((item) => (
        <SidebarMenuItem key={item.href} className="list-none">
          {item.isExternal ? (
            <a
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex"
            >
              <SidebarMenuButton tooltip={item.tooltip} className="justify-between w-full">
                <div className="flex items-center gap-2">
                  {item.icon}
                  <span>{item.label}</span>
                </div>
                <ExternalLinkIcon className="h-3 w-3" />
              </SidebarMenuButton>
            </a>
          ) : (
            <Link href={item.href} className="w-full flex">
              <SidebarMenuButton 
                isActive={pathname === item.href} 
                tooltip={item.tooltip}
                className="w-full"
              >
                {item.icon}
                <span>{item.label}</span>
              </SidebarMenuButton>
            </Link>
          )}
        </SidebarMenuItem>
      ))}
    </>
  );
}
