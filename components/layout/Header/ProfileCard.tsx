"use client";
import Image from "next/image";
import SocialIcons from "@/components/layout/Header/SocialIcons";
import clsx from "clsx";
import { useRef, useEffect } from "react";
import gsap from "gsap";

type ProfileCardProps = {
    className?: string;
};

export default function ProfileCard({ className = "" }: ProfileCardProps) {
    const cardRef = useRef<HTMLDivElement>(null);
    const animatedBarRef = useRef<HTMLDivElement>(null);
    const accentBarRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!cardRef.current || !animatedBarRef.current || !accentBarRef.current || !contentRef.current) return;

        gsap.set(animatedBarRef.current, { 
            scaleY: 0,
            transformOrigin: "top center"
        });
        gsap.set(accentBarRef.current, {
            scaleY: 0,
            transformOrigin: "top center"
        });
        gsap.set(contentRef.current, { 
            clipPath: "polygon(0 0, 0 0, 0 100%, 0 100%)",
            opacity: 0,
            x: -20
        });

        const tl = gsap.timeline({ defaults: { ease: "power3.inOut" } });

        tl.to(animatedBarRef.current, {
            scaleY: 1,
            duration: 0.6,
            ease: "power2.out"
        })
        .to(accentBarRef.current, {
            scaleY: 1,
            duration: 0.4,
            ease: "power2.out"
        }, "-=0.2")
        .to(contentRef.current, {
            clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
            opacity: 1,
            x: 0,
            duration: 0.8,
            ease: "power3.out"
        }, "-=0.3");

        return () => {
            tl.kill();
        };
    }, []);

    return (
        <div 
            ref={cardRef}
            style={{
                clipPath: 'polygon(0 0, 100% 0, 100% calc(100% - 30px), calc(100% - 30px) 100%, 0 100%)'
            }}
            className={clsx(
                "bg-card shadow-sm backdrop-blur-sm overflow-hidden",
                "flex flex-row items-center relative",
                className
            )}
        >
            <div 
                ref={animatedBarRef}
                className="absolute top-0 left-0 w-full h-full bg-primary/10 z-0"
                style={{ transform: 'scaleY(0)' }}
            />
            
            <div 
                ref={accentBarRef}
                className="bg-primary w-1 h-32 md:h-40 z-10"
                style={{ transform: 'scaleY(0)' }}
            />
            
            <div 
                ref={contentRef}
                className="flex flex-row items-center p-2 z-10 bg-card/80 backdrop-blur-sm w-full"
            >
                <Image
                    src="/images/avatar.jpg"
                    alt="avatar"
                    width={200}
                    height={200}
                    className="object-cover w-24 h-24 md:w-32 md:h-32"
                    priority
                />
                <div className="pl-4 flex flex-col justify-center gap-1">
                    <h1 className="md:text-2xl text-xl font-bold text-foreground">Shenley</h1>
                    <p className="md:text-sm text-xs pt-2 text-muted-foreground">
                        WRITING CODE IS PASSION, KEEP CODING UNTIL THE WORLD IS FULL
                        OF LOVE
                    </p>
                    <SocialIcons className="pt-2" />
                </div>
            </div>
        </div>
    );
}