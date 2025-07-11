"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";
import { usePreviewStore, navItems } from "@/stores/usePreviewStore";
import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

export default function Navbar() {
    const { setHoverItem, currentPage, setCurrentPage } = usePreviewStore();
    const navRefs = useRef<Array<HTMLAnchorElement | null>>([]);
    const path = usePathname();

    useEffect(() => {
    const current = navItems.find(item => {
      if (item.href === '/') return path === '/';
      return path.startsWith(item.href + '/') || 
             path === item.href;
    });
    
    if (current) setCurrentPage(current);
    }, [path, setCurrentPage]);

    return (
        <nav className="w-full max-w-4xl">
            <div className="flex gap-4 justify-start">
                {navItems.map((item, index) => (
                    <Link 
                        ref={el => {
                            navRefs.current[index] = el;
                        }}
                        href={item.href} 
                        key={item.name}
                        className={cn(
                            "relative py-4 px-2 -mb-0.5 text-sm font-medium transition-colors",
                            "after:absolute after:left-0 after:bottom-0 after:h-0.5 after:bg-transparent after:w-0 after:transition-all after:duration-300",
                            "hover:after:w-full hover:after:bg-primary",
                            currentPage.href === item.href && "text-primary"
                        )}
                        onMouseEnter={() => setHoverItem(item)}
                        onMouseLeave={() => setHoverItem(null)}
                        onClick={() => setCurrentPage(item)}
                    >
                        {item.name}
                    </Link>
                ))}
            </div>
        </nav>
    );
}
