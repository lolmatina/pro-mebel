import { cn } from "@/lib/cn";
import { Burger, Drawer, Menu } from "@mantine/core";
import { useDisclosure, useMediaQuery } from "@mantine/hooks";
import { IconChevronDown } from "@tabler/icons-react";
import {
  forwardRef,
  type ComponentPropsWithoutRef,
  useEffect,
  useState,
} from "react";
import { api, type SidebarCategory } from "@/lib/api";
import { useNavigate } from "react-router";
import { Logo } from "@/components/Logo";
import { useApplicationForm } from "@/lib/ApplicationFormContext";
import { useFeatureFlag } from "@/lib/FeatureFlagContext";
import insta from "@/assets/insta.svg"
import whatsapp from "@/assets/whatsapp.svg"

export function Header() {
  const [opened, { toggle, close }] = useDisclosure();
  const isLg = useMediaQuery("(min-width: 1024px)");
  const [categories, setCategories] = useState<SidebarCategory[]>([]);
  const navigate = useNavigate();
  const { openForm } = useApplicationForm();
  const { constructorEnabled } = useFeatureFlag();
  const canUseConstructor = Boolean(constructorEnabled) && isLg;

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
    const allSubCategories: Array<{
      id: number;
      name: string;
      productCount: number;
    }> = [];
    categories.forEach((category) => {
      category.subCategories.forEach((subCategory) => {
        allSubCategories.push(subCategory);
      });
    });
    return allSubCategories;
  };

  return (
    <div className="w-full bg-white z-201">
      <div className="max-w-360 mx-auto px-15 pt-6 pb-2.5 lg:flex gap-10 justify-between items-center hidden">
        <ul className="flex justify-between text-sm leading-4 font-medium list-none w-full text-main">
          <li className="transition-all hover:underline hover:opacity-50">
            <a
              className="no-underline text-inherit"
              onClick={close}
              href="/#main"
            >
              Главная
            </a>
          </li>
          <li className="transition-all hover:underline hover:opacity-50">
            <a
              className="no-underline text-main"
              onClick={close}
              href="/#should-know"
            >
              Все что вам нужно
            </a>
          </li>
          <li className="transition-all hover:underline hover:opacity-50">
            <a
              className="no-underline text-main"
              onClick={close}
              href="/#about"
            >
              О PRO MEBEL в цифрах
            </a>
          </li>
          <li className="transition-all hover:underline hover:opacity-50">
            <a
              className="no-underline text-main"
              onClick={close}
              href="/#about-us"
            >
              Немного информации о нас и прочее
            </a>
          </li>
          <li className="transition-all hover:underline hover:opacity-50">
            <a
              className="no-underline text-main"
              onClick={close}
              href="/#faq"
            >
              се что вам требуется знать
            </a>
          </li>
          <li className="transition-all hover:underline hover:opacity-50">
            <a
              className="no-underline text-main"
              onClick={close}
              href="/#footer"
            >
              Контакты
            </a>
          </li>
          <li className="inline-flex gap-5">
            <a
              className="no-underline text-main"
              onClick={close}
              href="https://wa.me/77778598259"
            >
              <img src={whatsapp} alt="whatsapp" />
            </a>
            <a
              className="no-underline text-main"
              onClick={close}
              href="https://www.instagram.com/promebel_salon_uralsk?igsh=cThyZ2VneHE3NDlv&utm_source=qr"
            >
              <img src={insta} alt="instagram" />
            </a>
          </li>
        </ul>
      </div>
      <div className="max-w-360 mx-auto px-4 py-6 lg:py-4.5 lg:px-15 flex gap-10 justify-between items-center">
        <div className="flex gap-13 justify-start items-center z-201">
          <div className="flex justify-start items-center gap-2">
            <Logo />
          </div>
        </div>
        <div className="gap-10 hidden lg:flex">
          <Menu trigger="hover" width={200} position="bottom-start">
            <Menu.Target>
              <MenuItemWithDropdown>Полный каталог</MenuItemWithDropdown>
            </Menu.Target>
            <Menu.Dropdown>
              {getAllSubCategories()
                .slice(0, 10)
                .map((subCategory) => (
                  <Menu.Item
                    key={subCategory.id}
                    onClick={() => handleSubCategoryClick(subCategory.id)}
                  >
                    {subCategory.name} ({subCategory.productCount})
                  </Menu.Item>
                ))}
              {getAllSubCategories().length > 10 && (
                <Menu.Item onClick={() => navigate("/catalog")}>
                  Показать все
                </Menu.Item>
              )}
            </Menu.Dropdown>
          </Menu>
          {categories.map((category) => (
            <Menu
              key={category.id}
              trigger="hover"
              width={200}
              position="bottom-start"
            >
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
                padding: "92px 0 0 0",
              },
            }}
          >
            <div className="p-6 pb-10 pt-0 w-full min-h-full flex flex-col justify-between">
              <div>
                <ul className="flex flex-col gap-4 mt-10">
                  <li className="border-b border-[#EEE6DB] py-2 text-center block text-main">
                    <a
                      className="no-underline text-main"
                      onClick={close}
                      href="/#main"
                    >
                      Главная
                    </a>
                  </li>
                  <li className="border-b border-[#EEE6DB] py-2 text-center block text-main">
                    <a
                      className="no-underline text-main"
                      onClick={close}
                      href="/#should-know"
                    >
                      Все что вам нужно
                    </a>
                  </li>
                  <li className="border-b border-[#EEE6DB] py-2 text-center block text-main">
                    <a
                      className="no-underline text-main"
                      onClick={close}
                      href="/#about"
                    >
                      О PRO MEBEL в цифрах
                    </a>
                  </li>
                  <li className="border-b border-[#EEE6DB] py-2 text-center block text-main">
                    {canUseConstructor && (
                      <a
                        className="no-underline text-main"
                        onClick={close}
                        href="/#constructor"
                      >
                        Конструктор
                      </a>
                    )}
                  </li>
                  <li className="border-b border-[#EEE6DB] py-2 text-center block text-main">
                    <a
                      className="no-underline text-main"
                      onClick={close}
                      href="/#projects"
                    >
                      Несколько наших работ
                    </a>
                  </li>
                  <li className="border-b border-[#EEE6DB] py-2 text-center block text-main">
                    <a
                      className="no-underline text-main"
                      onClick={close}
                      href="/#work-pipeline"
                    >
                      Как мы работаем
                    </a>
                  </li>
                  <li className="border-b border-[#EEE6DB] py-2 text-center block text-main">
                    <a
                      className="no-underline text-main"
                      onClick={close}
                      href="/#reviews"
                    >
                      Наши довольные клиенты
                    </a>
                  </li>
                  <li className="border-b border-[#EEE6DB] py-2 text-center block text-main">
                    <a
                      className="no-underline text-main"
                      onClick={close}
                      href="/#about-us"
                    >
                      Немного информации о нас и прочее
                    </a>
                  </li>
                  <li className="border-b border-[#EEE6DB] py-2 text-center block text-main">
                    <a
                      className="no-underline text-main"
                      onClick={close}
                      href="/#choose"
                    >
                      Подберите медель
                      <br /> под интерьер вашей мечты
                    </a>
                  </li>
                  <li className="border-b border-[#EEE6DB] py-2 text-center block text-main">
                    <a
                      className="no-underline text-main"
                      onClick={close}
                      href="/#faq"
                    >
                      Все что вам требуется знать
                    </a>
                  </li>
                  <li className="border-b border-[#EEE6DB] py-2 text-center block text-main">
                    <a
                      className="no-underline text-main"
                      onClick={close}
                      href="/#footer"
                    >
                      Контакты
                    </a>
                  </li>
                </ul>
              </div>
              <button
                onClick={() => openForm({})}
                className="bg-main mt-17 px-6 py-3 text-[13px] leading-5.25 rounded-full font-semibold! text-white outline-0 transition-all active:scale-95 border-none"
              >
                Оставить заявку
              </button>
            </div>
          </Drawer>
        </div>
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
