import Link from "next/link";
import { FaGithub, FaViber } from "react-icons/fa";
import { HiOutlineLocationMarker } from "react-icons/hi";

interface SocialProps {
  containerStyles?: string;
  iconStyles?: string;
}

const socials = [
  { icon: <FaGithub />, path: "https://github.com/enusent-edu", label: "GitHub" },
  { icon: <FaViber />, path: "viber://chat?number=%2B639813661984", label: "Viber" },
];

export default function Social({ containerStyles, iconStyles }: SocialProps) {
  return (
    <div className={containerStyles}>
      {socials.map((item, index) => (
        <Link
          key={index}
          href={item.path}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={item.label}
          className={iconStyles}
        >
          {item.icon}
        </Link>
      ))}
    </div>
  );
}

export function ContactMeta() {
  return (
    <div className="flex items-center gap-2 text-white/60 text-sm">
      <HiOutlineLocationMarker className="text-accent" />
      <span>115 Agus-os, Indang, Cavite 4122</span>
    </div>
  );
}
