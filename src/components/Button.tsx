import { cn } from "@/lib/cn";
import { Button as MantineButton, type ButtonProps } from "@mantine/core";
import type { ComponentPropsWithoutRef } from "react";

type Props = ButtonProps & ComponentPropsWithoutRef<"button">;

export function Button({ className, ...props }: Props) {
  return (
    <MantineButton
      className={cn(
        "py-3.75! px-7.5! h-auto! text-base leading-[120%] rounded-full!",
        className
      )}
      color="#121212"
      {...props}
    />
  );
}
