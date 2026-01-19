import { cn } from "@/lib/cn";
import type { ReactNode } from "react";

type Props = {
  position: "top" | "bottom";
  padding?: "lg" | "md" | "sm";
  children?: ReactNode;
  src: string;
  className?: string;
  onClick?: () => void;
};

export function ImageCard({
  position = "top",
  padding = "lg",
  children,
  src,
  className,
  onClick,
}: Props) {
  return (
    <div
      onClick={onClick}
      className={cn(
        "flex justify-start rounded-[40px] overflow-hidden bg-center bg-no-repeat transition-[background-size] duration-500 ease-out relative group",
        position === "top" && "items-start",
        position === "bottom" && "items-end",
        padding === "lg" && "lg:p-15 p-6",
        padding === "md" && "lg:p-7.5 p-6",
        className
      )}
    >
      <div
        className="absolute inset-0 w-full h-full bg-cover -z-1 group-hover:transform-[scale(1.05)] duration-500 transition-all"
        style={{ backgroundImage: `url(${src})` }}
      />
      {children}
    </div>
  );
}
