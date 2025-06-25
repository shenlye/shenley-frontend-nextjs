import React from "react";
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuLink,
} from "@/components/ui/navigation-menu";
import { usePathname } from "next/navigation";
import { ModeToggle } from "@/components/theme-toggle";
export const navItems = [
  {
    label: "首页",
    href: "/",
  },
  {
    label: "文章",
    href: "/blog",
  },
];

export function Header() {
  const pathname = usePathname();
  return (
    <header className="sticky top-0 z-50 bg-background w-full px-6 border-b border-border">
      <div className="flex justify-between items-center py-2.5">
        <div className="flex-1">
          <h1 className="">Shenley的主页</h1>
        </div>
        <div className="flex-1 flex justify-center">
          <NavigationMenu>
            <NavigationMenuList className="gap-4">
              {navItems.map((item) => (
                <NavigationMenuItem key={item.href}>
                  <NavigationMenuLink
                    href={item.href}
                    className={pathname === item.href ? "bg-accent" : ""}
                  >
                    {item.label}
                  </NavigationMenuLink>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>
        </div>
        <div className="flex-1 flex justify-end">
          <ModeToggle />
        </div>
      </div>
    </header>
  );
}
