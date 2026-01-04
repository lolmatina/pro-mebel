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
