import { ModeToggle } from "@/components/theme-toggle";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col justify-center">
      <header className="border-b">
        <div className="container mx-auto flex items-center justify-end py-4 px-2">
          <div className="flex items-center mr-8">
            <NavigationMenu>
              <NavigationMenuList className="space-x-5">
                <NavigationMenuItem>
                  <NavigationMenuLink href="#">主页</NavigationMenuLink>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuLink href="#about">关于我</NavigationMenuLink>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </div>
          <ModeToggle />
        </div>
      </header>
      <main className="flex-1 mx-auto container p-2">
        <h2>关于我</h2>
      </main>
    </div>
  );
}
