import { cn } from "@/lib/utils";
import Banner from "./Banner";
import Navbar from "./Navbar";
import ProfileCard from "./ProfileCard";

type HeaderProps = {
  className?: string;
}

export default function Header({ className = "" }: HeaderProps) {
  return (
    <header
      className={cn(
        "flex flex-col justify-between mx-auto md:px-0 px-2 bg-[url('/images/background.jpg')] bg-cover bg-center h-screen items-center",
        className
      )}
    >
      <div className="flex flex-col items-center justify-center flex-1 max-w-2xl">
        <Banner className="py-2" />
        <ProfileCard className="w-full" />
      </div>
      <Navbar className="max-w-2xl w-full"/>
    </header>
  );
}
