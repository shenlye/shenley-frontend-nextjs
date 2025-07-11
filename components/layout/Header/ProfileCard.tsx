import Image from "next/image";
import SocialIcons from "@/components/common/SocialIcons";
import clsx from "clsx";

type ProfileCardProps = {
    className?: string;
};

export default function ProfileCard({ className = "" }: ProfileCardProps) {
    return (
        <div className={clsx("bg-card shadow-sm backdrop-blur-sm", "flex flex-row items-center", className)}>
            <div className="bg-primary w-2 h-36 md:h-44"></div>
            <div className="flex flex-row items-center p-2">
            <Image
                src="/images/avatar.jpg"
                alt="avatar"
                width={200}
                height={200}
                className="object-cover w-28 h-28 md:w-40 md:h-40"
                priority
            />
            <div className="pl-4">
                <h1 className="text-2xl font-bold">Shenley</h1>
                <p className="text-sm pt-2">
                    WRITING CODE IS PASSION, KEEP CODING UNTIL THE WORLD IS FULL
                    OF LOVE
                </p>
                <SocialIcons className="pt-2" />
            </div>
            </div>
        </div>
    );
}