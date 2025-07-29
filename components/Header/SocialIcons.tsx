'use client';

import { Icon } from "@iconify/react";
import { cn } from "@/lib/utils";

interface SocialIconProps {
  href: string;
  icon: string;
  className?: string;
}

const SocialIcon = ({ href, icon, className = '' }: SocialIconProps) => {
  return (
    <div className={cn("icon", className)}>
      <a href={href} target="_blank" rel="noopener noreferrer">
        <Icon icon={icon} className="w-5 h-5 hover:text-primary transition-colors" />
      </a>
    </div>
  );
};

interface SocialIconsProps {
  className?: string;
  iconClassName?: string;
  icons?: Array<{
    href: string;
    icon: string;
  }>;
}

export default function SocialIcons({ 
  className = '',
  iconClassName = '',
  icons = [
    { href: 'https://github.com/shenlye', icon: 'mdi:github' },
    { href: 'https://qm.qq.com/q/sFNUw0akQE', icon: 'mingcute:qq-fill' },
    { href: 'mailto:582783985@qq.com', icon: 'mdi:email' },
    { href: 'https://t.me/shenlyye', icon: 'mdi:telegram' },
  ]
}: SocialIconsProps) {
  return (
    <div className={cn("flex items-center gap-2", className)}>
      {icons.map((item, index) => (
        <SocialIcon 
          key={index} 
          href={item.href} 
          icon={item.icon} 
          className={iconClassName}
        />
      ))}
    </div>
  );
}
