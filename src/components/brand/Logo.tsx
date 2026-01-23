import logoImage from "@/assets/logo.png";
import { cn } from "@/lib/utils";

type LogoProps = {
  className?: string;
  alt?: string;
};

export default function Logo({ className, alt = "JHIC logo" }: LogoProps) {
  return (
    <img
      src={logoImage}
      alt={alt}
      className={cn("block h-full w-full object-contain", className)}
      loading="eager"
      decoding="async"
    />
  );
}
