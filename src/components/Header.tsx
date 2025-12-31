import { cn } from "@/lib/cn";
import logo from "@/logo.svg";
import { Menu, TextInput } from "@mantine/core";
import { IconChevronDown, IconSearch } from "@tabler/icons-react";
import { forwardRef, type ComponentPropsWithoutRef } from "react";

export function Header() {
  return (
    <div className="py-4.5 px-15 flex justify-between items-center sticky top-0 bg-white z-1">
      <div className="flex gap-13 justify-start items-center">
        <div className="flex justify-start items-center gap-2">
          <img src={logo} alt="Pro Mebel" />
          <span
            className={cn(
              "font-semibold text-2xl text-main leading-7.5 uppercase",
              ""
            )}
          >
            Pro Mebel
          </span>
        </div>
        <div>
          <TextInput
            placeholder="Поиск"
            rightSection={<IconSearch size={18} />}
          />
        </div>
      </div>
      <div className="flex gap-10">
        <Menu trigger="hover" width={200} position="bottom-start">
          <Menu.Target>
            <MenuItemWithDropdown>Полный каталог</MenuItemWithDropdown>
          </Menu.Target>
          <Menu.Dropdown>
            <Menu.Item>Что то</Menu.Item>
          </Menu.Dropdown>
        </Menu>
        <Menu trigger="hover" width={200} position="bottom-start">
          <Menu.Target>
            <MenuItemWithDropdown>Наши прошлые проекты</MenuItemWithDropdown>
          </Menu.Target>
          <Menu.Dropdown>
            <Menu.Item>Что то</Menu.Item>
          </Menu.Dropdown>
        </Menu>
        <Menu trigger="hover" width={200} position="bottom-start">
          <Menu.Target>
            <MenuItemWithDropdown>Жилые помещения</MenuItemWithDropdown>
          </Menu.Target>
          <Menu.Dropdown>
            <Menu.Item>Что то</Menu.Item>
          </Menu.Dropdown>
        </Menu>
      </div>
    </div>
  );
}

type MenuItemWithDropdownProps = ComponentPropsWithoutRef<"div">;

export const MenuItemWithDropdown = forwardRef<
  HTMLDivElement,
  MenuItemWithDropdownProps
>(function MenuItemWithDropdown({ children, className, ...props }, ref) {
  return (
    <div
      ref={ref}
      {...props}
      className={cn("inline-flex items-center gap-2 cursor-pointer", className)}
    >
      <span className="text-base font-medium leading-[120%] text-main">
        {children}
      </span>
      <IconChevronDown size={18} className="text-brown" />
    </div>
  );
});
