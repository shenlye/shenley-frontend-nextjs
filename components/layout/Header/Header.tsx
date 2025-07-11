import Banner from "./Banner";
import ProfileCard from "./ProfileCard";
import Navbar from "./Navbar";
import { clsx } from "clsx";

type HeaderProps = {
  className?: string;
  maxWidth?: string;
}

export default function Header({ className = "", maxWidth = "md:max-w-4xl" }: HeaderProps) {
  return (
    <header className={`w-full flex flex-col border-b-2 border-border ${className}`}>
      <Banner />

      <div className={clsx("w-full px-2 flex flex-col items-center", maxWidth && "mx-auto")}>
        <ProfileCard className="max-w-4xl w-full"/>
        <Navbar />
      </div>
    </header>
  );
}
