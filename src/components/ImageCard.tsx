import { cn } from "@/lib/cn";
import type { ReactNode } from "react";

type Props = {
  position: "top" | "bottom";
  padding?: "lg" | "md" | "sm";
  children?: ReactNode;
  src: string;
  className?: string;
};

export function ImageCard({
  position = "top",
  padding = "lg",
  children,
  src,
  className,
}: Props) {
  return (
    <div
      className={cn(
        "flex justify-start rounded-[40px]",
        position === "top" && "items-start",
        position === "bottom" && "items-end",
        padding === "lg" && "lg:p-15",
        padding === "md" && "lg:p-7.5",
        className
      )}
      style={{
        backgroundImage: `url(${src})`,
        backgroundSize: "cover",
        backgroundPosition: "0 0",
      }}
    >
      {children}
    </div>
  );
}
