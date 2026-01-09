import { cn } from "@/lib/cn";
import logo from "@/logo.svg";
import { Burger, Drawer, Menu, TextInput } from "@mantine/core";
import { useDisclosure, useMediaQuery } from "@mantine/hooks";
import { IconChevronDown, IconSearch } from "@tabler/icons-react";
import { forwardRef, type ComponentPropsWithoutRef, useEffect, useState } from "react";
import { Button } from "../components/Button";
import { api, type SidebarCategory } from "@/lib/api";
import { useNavigate } from "react-router";

export function Header() {
  const [opened, { toggle, close }] = useDisclosure();
  const isLg = useMediaQuery("(min-width: 1024px)");
  const [categories, setCategories] = useState<SidebarCategory[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const data = await api.getSidebar();
      setCategories(data);
    } catch (err) {
      console.error("Failed to load categories:", err);
    }
  };

  const handleSubCategoryClick = (subCategoryId: number) => {
    navigate(`/catalog?subCategoryIds=${subCategoryId}`);
  };

  const getAllSubCategories = () => {
    const allSubCategories: Array<{ id: number; name: string; productCount: number }> = [];
    categories.forEach((category) => {
      category.subCategories.forEach((subCategory) => {
        allSubCategories.push(subCategory);
      });
    });
    return allSubCategories;
  };

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
            {getAllSubCategories().slice(0, 10).map((subCategory) => (
              <Menu.Item
                key={subCategory.id}
                onClick={() => handleSubCategoryClick(subCategory.id)}
              >
                {subCategory.name} ({subCategory.productCount})
              </Menu.Item>
            ))}
            {getAllSubCategories().length > 10 && (
              <Menu.Item onClick={() => navigate('/catalog')}>
                Показать все
              </Menu.Item>
            )}
          </Menu.Dropdown>
        </Menu>
        {categories.map((category) => (
          <Menu key={category.id} trigger="hover" width={200} position="bottom-start">
            <Menu.Target>
              <MenuItemWithDropdown>{category.name}</MenuItemWithDropdown>
            </Menu.Target>
            <Menu.Dropdown>
              {category.subCategories.length > 0 ? (
                category.subCategories.map((subCategory) => (
                  <Menu.Item
                    key={subCategory.id}
                    onClick={() => handleSubCategoryClick(subCategory.id)}
                  >
                    {subCategory.name} ({subCategory.productCount})
                  </Menu.Item>
                ))
              ) : (
                <Menu.Item disabled>Нет подкатегорий</Menu.Item>
              )}
            </Menu.Dropdown>
          </Menu>
        ))}
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
