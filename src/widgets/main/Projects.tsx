import { Button } from "@/components/Button";
import { Carousel } from "@mantine/carousel";
import { useEffect, useState } from "react";
import image from "@/assets/main/hero/image1.jpg";

const categories = [
  {
    id: 1,
    name: "Наши проекты",
    children: [
      {
        id: 1,
        name: "Спальня",
        items: [
          {
            id: 1,
            title: "Спальня",
            description:
              "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s",
          },
          {
            id: 2,
            title: "Спальня",
            description:
              "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s",
          },
          {
            id: 3,
            title: "Спальня",
            description:
              "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s",
          },
          {
            id: 4,
            title: "Спальня",
            description:
              "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s",
          },
          {
            id: 5,
            title: "Спальня",
            description:
              "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s",
          },
        ],
      },
    ],
  },
  {
    id: 2,
    name: "Жилые помещения",
    children: [
      {
        id: 2,
        name: "Спальня",
        items: [
          {
            id: 6,
            title: "Спальня",
            description:
              "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s",
          },
          {
            id: 7,
            title: "Спальня",
            description:
              "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s",
          },
        ],
      },
    ],
  },
];

export function MainProjects() {
  const [active, setActive] = useState<number>();
  const [activeSub, setActiveSub] = useState<number>();

  useEffect(() => {
    const getCategories = () => {
      // There must be fetching
      const values = categories;

      if (values.length > 0) {
        setActive(values[0]?.id);
        setActiveSub(values[0]?.children?.[0]?.id);
      }
    };

    getCategories();
  }, []);

  const handleChangeCategory = (id: number) => {
    const category = categories.find((c) => c.id === id);
    if (category) setActive(id);
    if (category?.children && category.children.length > 0)
      setActiveSub(category.children[0]?.id);
  };
  return (
    <div className="max-w-360 mx-auto px-15 py-10">
      <div className="flex gap-2.5">
        {categories.map((category) => (
          <Button
            key={category.id}
            className="transition-all"
            variant={category.id === active ? "filled" : "outline"}
            onClick={() => handleChangeCategory(category.id)}
          >
            {category.name}
          </Button>
        ))}
      </div>
      <div className="mt-7.5 flex gap-2.5">
        {!!active &&
          categories
            .find((c) => c.id === active)
            ?.children.map((subcategory) => (
              <Button
                key={subcategory.id}
                className="transition-all"
                variant={subcategory.id === activeSub ? "filled" : "outline"}
                onClick={() => setActive(subcategory.id)}
              >
                {subcategory.name}
              </Button>
            ))}
      </div>
      <div className="mt-7.5 flex gap-14 h-112">
        <div className="min-w-76 max-w-76 h-full flex flex-col justify-between">
          <div>
            <h2 className="text-[40px] text-main font-medium leading-[120%]">
              Несколько наших работ
            </h2>
            <p className="text-lg font-medium text-main leading-[120%] mt-6">
              Мы занимаемся многопрофильной сборкой и все прочее
            </p>
          </div>
          <div>
            <Button>перейти в полный раздел</Button>
          </div>
        </div>
        <div className="h-full overflow-hidden">
          <Carousel
            slideSize={320}
            slideGap={24}
            withControls={true}
            emblaOptions={{
              dragFree: false,
              loop: false,
            }}
          >
            {active &&
              activeSub &&
              categories
                .find((c) => c.id === active)
                ?.children.find((sc) => sc.id === activeSub)
                ?.items.map((item) => (
                  <Carousel.Slide key={item.id}>
                    <div className="h-112 w-full relative overflow-hidden group rounded-[30px]">
                      <div
                        className="absolute inset-0 bg-cover bg-center transition-all group-hover:scale-110 duration-500"
                        style={{ backgroundImage: `url(${image})` }}
                      />
                      <div
                        className="absolute scale-110 inset-0 transition-all blur-xl"
                        style={{
                          maskImage: `linear-gradient(
                                to top,
                                white 0%,
                                white 35%,
                                transparent 50%
                              )`,
                          WebkitMaskImage: `linear-gradient(
                                to top,
                                black 0%,
                                black 25%,
                                transparent 50%
                            )`,
                          backgroundImage: `url(${image})`,
                        }}
                      />
                      <div className="absolute bottom-0 p-3.75 text-white flex flex-col gap-2">
                        <span className="text-[28px] font-medium">
                          {item.title}
                        </span>
                        <span className="text-sm leading-[120%]">
                          {item.description}
                        </span>
                        <Button variant="white" fullWidth className="mt-3">
                          <span className="text-main">
                            Перейти в конструктор
                          </span>
                        </Button>
                      </div>
                    </div>
                  </Carousel.Slide>
                ))}
          </Carousel>
        </div>
      </div>
    </div>
  );
}
