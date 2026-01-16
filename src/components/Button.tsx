import { cn } from "@/lib/cn";
import { Button as MantineButton, type ButtonProps } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import type { ComponentPropsWithoutRef } from "react";

type Props = ButtonProps & ComponentPropsWithoutRef<"button">;

export function Button({ className, ...props }: Props) {
  const isLg = useMediaQuery("(min-width: 1024px)");
  return (
    <MantineButton
      className={cn(
        "leading-[120%]! rounded-full! h-auto!",
        isLg ? "py-3.75! px-7.5! text-base" : "py-[10.75px]! px-4! text-sm!",
        className
      )}
      color="#121212"
      {...props}
    />
  );
}

type NewButtonProps = {
  variant?: "filled" | "outline";
  fullWidth?: boolean;
} & ComponentPropsWithoutRef<"button">;

export function ButtonWithAnimation({
  className,
  variant = "filled",
  fullWidth = false,
  ...props
}: NewButtonProps) {
  return (
    <button
      className={cn(
        "animated-button px-5 py-[17.5px] text-sm font-medium leading-[110%] outline-none rounded-full text-center",
        variant === "filled" && "bg-main text-white border-none",
        variant === "outline" && "bg-transparent border-[#DDDDDD] border",
        fullWidth && "w-full",
        className
      )}
      style={
        {
          "--btn-bg-color": "#222222",
        } as React.CSSProperties
      }
      {...props}
    >
      <span>{props.children}</span>
      <span>{props.children}</span>
      <span>{props.children}</span>
      <span>{props.children}</span>
      <div className="opacity-0">{props.children}</div>
    </button>
  );
}
