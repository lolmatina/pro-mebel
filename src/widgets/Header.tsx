import { cn } from "@/lib/cn";
import logo from "@/logo.svg";
import { Burger, Drawer, Menu, TextInput } from "@mantine/core";
import { useDisclosure, useMediaQuery } from "@mantine/hooks";
import { IconChevronDown, IconSearch } from "@tabler/icons-react";
import { forwardRef, type ComponentPropsWithoutRef } from "react";
import { Button } from "../components/Button";

export function Header() {
  const [opened, { toggle, close }] = useDisclosure();
  const isLg = useMediaQuery("(min-width: 1024px)");

  return (
    <div className="max-w-360 mx-auto px-4 py-6 lg:py-4.5 lg:px-15 flex gap-10 justify-between items-center sticky top-0 bg-white z-201">
      <div className="flex gap-13 justify-start items-center z-201">
        <div className="flex justify-start items-center gap-2">
          <img src={logo} alt="Pro Mebel" />
          <span
            className={cn(
              "font-semibold text-2xl text-main leading-7.5 uppercase whitespace-nowrap",
              ""
            )}
          >
            Pro Mebel
          </span>
        </div>
        <div className="hidden lg:block">
          <TextInput
            placeholder="Поиск"
            rightSection={<IconSearch size={18} />}
          />
        </div>
      </div>
      <div className="gap-10 hidden lg:flex">
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
      <div className="lg:hidden">
        <Burger opened={opened} onClick={toggle} />

        <Drawer
          opened={!isLg && opened}
          onClose={close}
          withCloseButton={false}
          size="100%"
          styles={{
            body: {
              height: "100%",
              padding: "128px 0 0 0",
            },
          }}
        >
          <div className="p-6 pt-0 w-full h-full flex flex-col justify-between">
            <div>
              <TextInput
                placeholder="Поиск"
                rightSection={<IconSearch size={18} />}
              />
              <ul className="flex flex-col gap-4 mt-10">
                <li className="border-b border-[#EEE6DB] py-2 text-center block text-main">
                  Главная
                </li>
                <li className="border-b border-[#EEE6DB] py-2 text-center block text-main">
                  Главная
                </li>
                <li className="border-b border-[#EEE6DB] py-2 text-center block text-main">
                  Главная
                </li>
                <li className="border-b border-[#EEE6DB] py-2 text-center block text-main">
                  Главная
                </li>
                <li className="border-b border-[#EEE6DB] py-2 text-center block text-main">
                  Главная
                </li>
              </ul>
            </div>
            <Button fullWidth>Отправить заявку</Button>
          </div>
        </Drawer>
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
      className={cn(
        "inline-flex items-center gap-2 cursor-pointer whitespace-nowrap",
        className
      )}
    >
      <span className="text-base font-medium leading-[120%] text-main">
        {children}
      </span>
      <IconChevronDown size={18} className="text-brown" />
    </div>
  );
});
