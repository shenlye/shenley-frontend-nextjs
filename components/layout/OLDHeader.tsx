import React, { useEffect, useRef, useState } from "react";
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuLink,
} from "@/components/ui/navigation/navigation-menu";
import { usePathname } from "next/navigation";
import { ModeToggle } from "@/components/theme/theme-toggle";
import gsap from "gsap";
export const navItems = [
  {
    label: "首页",
    href: "/",
  },
  {
    label: "文章",
    href: "/blog",
  },
  {
    label: "动画",
    href: "/bangumi/anime",
  },
  {
    label: "游戏",
    href: "/bangumi/game",
  },
];

export default function Header() {
  const menuRef = useRef<HTMLDivElement>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMenuMounted, setIsMenuMounted] = useState(false);

  useEffect(() => {
    if (isMenuOpen) {
      setIsMenuMounted(true);
      gsap.fromTo(
        menuRef.current,
        {
          opacity: 0,
          y: -100,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.3,
          ease: "power2.inOut",
        }
      );
    } else if (menuRef.current && isMenuMounted) {
      gsap.to(menuRef.current, {
        opacity: 0,
        y: -100,
        duration: 0.3,
        ease: "power2.inOut",
        onComplete: () => setIsMenuMounted(false),
      });
    }
  }, [isMenuOpen, isMenuMounted]);

  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 bg-background w-full px-6 border-b border-border">
      <div className="flex justify-between items-center py-2.5">
        <div className="flex-1 flex items-center gap-4">
          <div className="md:hidden z-50 relative">
            <button
              className="w-6 h-6 relative flex items-center justify-center focus:outline-none"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label={isMenuOpen ? "关闭菜单" : "打开菜单"}
            >
              <span
                className={`absolute block h-0.5 w-5 bg-current transform transition duration-300 ease-in-out ${
                  isMenuOpen ? "rotate-45" : "-translate-y-1.5"
                }`}
              ></span>
              <span
                className={`absolute block h-0.5 w-5 bg-current transform transition duration-300 ease-in-out ${
                  isMenuOpen ? "opacity-0" : "opacity-100"
                }`}
              ></span>
              <span
                className={`absolute block h-0.5 w-5 bg-current transform transition duration-300 ease-in-out ${
                  isMenuOpen ? "-rotate-45" : "translate-y-1.5"
                }`}
              ></span>
            </button>
          </div>
          <h1 className="">Shenley的主页</h1>
        </div>
        <div className="flex-1 justify-center hidden md:flex">
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
      {isMenuMounted && (
        <div
          className="fixed top-0 left-0 w-full h-full bg-background z-40 flex flex-col items-center pt-16"
          ref={menuRef}
        >
          <nav className="w-full px-8">
            <ul className="flex flex-col items-center space-y-6 py-8">
              {navItems.map((item) => (
                <li key={item.href} className="w-full">
                  <a
                    href={item.href}
                    className={`block w-full text-center py-3 rounded-md text-lg ${
                      pathname === item.href
                        ? "bg-accent"
                        : "hover:bg-accent/50"
                    }`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      )}
    </header>
  );
}
