import { Button } from "@/components/Button";
import { Carousel } from "@mantine/carousel";
import { useEffect, useState } from "react";
import image from "@/assets/main/hero/image1.jpg";
import type { EmblaCarouselType } from "embla-carousel";
import { useMediaQuery } from "@mantine/hooks";

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
  {
    id: 3,
    name: "Жилые помещения",
    children: [
      {
        id: 3,
        name: "Спальня 2",
        items: [
          {
            id: 8,
            title: "Спальня",
            description:
              "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s",
          },
          {
            id: 9,
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
  const [embla, setEmbla] = useState<EmblaCarouselType | null>(null);
  const [emblaSub, setEmblaSub] = useState<EmblaCarouselType | null>(null);
  const isLg = useMediaQuery("(min-width: 1024px)");

  useEffect(() => {
    const getCategories = () => {
      // There must be fetching
      const values = categories;

      if (values.length > 0) {
        setActive(0);
        setActiveSub(0);
      }
    };

    getCategories();
  }, []);

  const handleChangeCategory = (idx: number) => {
    if (idx < 0 || idx >= categories.length) return;
    setActive(idx);
    const category = categories[idx];

    if (category && category.children.length > 0) setActiveSub(0);

    if (embla) embla.scrollTo(idx);
  };

  return (
    <div className="max-w-360 mx-auto py-10">
      <h2 className="text-[40px] leading-[120%] px-4 font-medium text-main text-center lg:hidden">
        Несколько наших работ
      </h2>
      <div className="mt-4 lg:mt-0">
        <Carousel
          slideSize="auto"
          slideGap={10}
          withControls={false}
          getEmblaApi={setEmbla}
        >
          {categories.map((category, idx) => (
            <Carousel.Slide ml={isLg && idx === 0 ? 60 : idx === 0 ? 16 : 0}>
              <Button
                key={category.id}
                className="transition-all"
                variant={idx === active ? "filled" : "outline"}
                onClick={() => handleChangeCategory(idx)}
              >
                {category.name}
              </Button>
            </Carousel.Slide>
          ))}
        </Carousel>
      </div>
      <div className="lg:hidden px-4 text-lg opacity-80 text-main font-medium text-center mt-4">
        Мы занимаемся многопрофильной сборкой и все прочее
      </div>
      <div className="mt-7.5 flex gap-2.5">
        <Carousel
          slideSize="auto"
          slideGap={10}
          withControls={false}
          getEmblaApi={setEmblaSub}
        >
          {typeof active !== "undefined" &&
            active >= 0 &&
            active < categories.length &&
            categories[active]?.children.map((subcategory, idx) => (
              <Carousel.Slide ml={isLg && idx === 0 ? 60 : idx === 0 ? 16 : 0}>
                <Button
                  key={subcategory.id}
                  className="transition-all"
                  variant={idx === activeSub ? "filled" : "outline"}
                  onClick={() => {
                    setActiveSub(idx);
                    if (emblaSub) emblaSub.scrollTo(idx);
                  }}
                >
                  {subcategory.name}
                </Button>
              </Carousel.Slide>
            ))}
        </Carousel>
      </div>
      <div className="mt-7.5 h-auto flex gap-14 lg:h-112 px-4 lg:px-15 w-full">
        <div className="min-w-76 max-w-76 h-full hidden lg:flex flex-col justify-between">
          <div>
            <h2 className="text-[40px] text-main font-medium leading-[120%]">
              Несколько наших работ
            </h2>
            <p className="text-lg font-medium text-main leading-[120%] mt-6">
              Мы занимаемся многопрофильной сборкой и все прочее
            </p>
          </div>
          <div>
            <Button>Перейти в полный раздел</Button>
          </div>
        </div>
        <div className="h-full w-full lg:overflow-hidden">
          <Carousel
            styles={{
              indicators: {
                bottom: -20,
              },
            }}
            slideSize={343}
            slideGap={24}
            withControls={isLg}
            withIndicators={!isLg}
            emblaOptions={{
              dragFree: false,
              loop: false,
            }}
          >
            {typeof active !== "undefined" &&
              typeof activeSub !== "undefined" &&
              categories[active]?.children[activeSub]?.items.map((item) => (
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
                    <div className="absolute bottom-0 lg:-bottom-16 transition-all lg:group-hover:bottom-0 p-3.75 text-white flex flex-col gap-2">
                      <span className="text-[28px] font-medium">
                        {item.title}
                      </span>
                      <span className="text-sm leading-[120%]">
                        {item.description}
                      </span>
                      <Button variant="white" fullWidth className="mt-3">
                        <span className="text-main">Перейти в конструктор</span>
                      </Button>
                    </div>
                  </div>
                </Carousel.Slide>
              ))}
          </Carousel>
        </div>
      </div>

      <div className="text-center mt-11 flex flex-col px-4 lg:hidden items-center gap-4">
        <p className="text-lg opacity-80 font-medium ">Свайпните в сторону</p>
        <Button>Перейти в полный раздел</Button>
      </div>
    </div>
  );
}
