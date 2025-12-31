import { cn } from "@/lib/cn";
import { Button as MantineButton, type ButtonProps } from "@mantine/core";
import type { ComponentPropsWithoutRef } from "react";

type Props = ButtonProps & ComponentPropsWithoutRef<"button">;

export function Button(props: Props) {
  return (
    <MantineButton
      className={cn(
        props.className,
        "py-3.75! px-7.5! h-auto! text-base leading-[120%] rounded-full!"
      )}
      color="#121212"
      {...props}
    />
  );
}
