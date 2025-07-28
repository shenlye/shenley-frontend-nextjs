import Banner from "./Banner";
import Navbar from "./Navbar";
import ProfileCard from "./ProfileCard";
import { clsx } from "clsx";

type HeaderProps = {
  className?: string;
  maxWidth?: string;
}

export default function Header({ className = "", maxWidth = "md:max-w-4xl" }: HeaderProps) {
  return (
    <header className={`flex flex-col max-w-7xl mx-auto ${className} relative md:px-0 px-2`}>
      <Banner className="py-2"/>
      <div className={clsx("w-full flex flex-col items-center", maxWidth && "mx-auto")}>
        <ProfileCard className="max-w-7xl w-full"/>
      </div>
      <Navbar />
      <div className="w-full h-0.5 bg-foreground" />
    </header>
  );
}
