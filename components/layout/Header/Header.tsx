import Banner from "./Banner";
import ProfileCard from "./ProfileCard";
import { clsx } from "clsx";

type HeaderProps = {
  className?: string;
  maxWidth?: string;
}

export default function Header({ className = "", maxWidth = "md:max-w-4xl" }: HeaderProps) {
  return (
    <header className={`flex flex-col max-w-7xl mx-auto ${className}`}>
      <Banner />
      <div className={clsx("w-full md:px-0 px-2 flex flex-col items-center", maxWidth && "mx-auto")}>
        <ProfileCard className="max-w-7xl w-full"/>
      </div>
    </header>
  );
}
