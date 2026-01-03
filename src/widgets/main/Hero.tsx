import { ImageCard } from "@/components/ImageCard";
import image1 from "@/assets/main/hero/image1.jpg";
import image2 from "@/assets/main/hero/image2.jpg";
import image3 from "@/assets/main/hero/image3.jpg";
import { Button } from "@/components/Button";
import { useMediaQuery } from "@mantine/hooks";
import { Carousel } from "@mantine/carousel";

export function Hero() {
  const isSm = useMediaQuery("(max-width: 767px)");
  return (
    <div className="max-w-360 mx-auto px-4 lg:px-15">
      <div className="w-full lg:flex gap-2.5">
        <div className="lg:w-239.5 pb-4 lg:pb-0">
          <ImageCard
            position="top"
            src={image1}
            className="w-full h-[calc(100dvh-108px)] lg:h-auto lg:aspect-958/770 text-white"
          >
            <div className="flex flex-col justify-between md:justify-center lg:justify-start items-start md:items-center lg:items-start gap-8.75 h-full w-full md:text-center lg:text-left">
              <div className="flex flex-col gap-5">
                <h1 className="text-[56px] lg:text-[90px] leading-18.75 -tracking-[5px] font-normal">
                  Мебель на заказ
                </h1>
                <p className="text-lg leading-[120%] font-medium">
                  Индивидуальная мебель, фасады и панели — продуманные под ваш
                  интерьер.
                </p>
              </div>
              <div className="text-center md:text-left">
                <Button className="w-full! max-w-75!">
                  Собрать свой проект
                </Button>
              </div>
            </div>
          </ImageCard>
        </div>
        <div className="hidden lg:flex flex-col w-88 gap-2.5">
          <ImageCard
            position="top"
            padding="md"
            src={image2}
            className="w-full aspect-352/380 "
          >
            <span className="text-[40px] leading-10 -tracking-[3px] text-white font-normal">
              Диваны
            </span>
          </ImageCard>
          <ImageCard
            position="top"
            padding="md"
            src={image3}
            className="w-full aspect-352/380 "
          >
            <span className="text-[40px] leading-10 -tracking-[3px] text-white font-normal">
              Для спальных комнат
            </span>
          </ImageCard>
        </div>
      </div>
      <div className="flex flex-col lg:flex-row mt-2.5 w-full max-w-full">
        <div className="lg:hidden">
          <Carousel
            slideSize={211}
            slideGap={8}
            withControls={false}
            emblaOptions={{
              dragFree: true,
              loop: true,
            }}
          >
            <Carousel.Slide>
              <div
                className="w-full h-47.25 rounded-3xl p-6 bg-cover bg-center"
                style={{ backgroundImage: `url(${image1})` }}
              >
                <span className="text-[28px] text-white">Диваны</span>
              </div>
            </Carousel.Slide>
            <Carousel.Slide>
              <div
                className="w-full h-47.25 rounded-3xl p-6 bg-contain bg-center"
                style={{ backgroundImage: `url(${image2})` }}
              >
                <span className="text-[28px] text-white">Диваны</span>
              </div>
            </Carousel.Slide>
            <Carousel.Slide>
              <div
                className="w-full h-47.25 rounded-3xl p-6 bg-cover bg-center"
                style={{ backgroundImage: `url(${image3})` }}
              >
                <span className="text-[28px] text-white">Диваны</span>
              </div>
            </Carousel.Slide>
          </Carousel>
        </div>
        <div className="w-full lg:max-w-78 text-main lg:mr-10 mt-8.5">
          <h2 className="text-[56px] lg:text-[65px] leading-[100%] -tracking-[4px] font-normal">
            Все что <br /> вам нужно
          </h2>
          <p className="text-lg text-main leading-[120%] font-medium mt-6 mb-10.5">
            Мы занимаемся многопрофильной сборкой и все прочее
          </p>
          <Button variant="outline">Перейти в конструктор</Button>
        </div>
        <div className="hidden xl:flex gap-2.5 w-full justify-evenly">
          <ImageCard
            position="bottom"
            padding="md"
            src={image1}
            className="w-full aspect-479/380"
          >
            <span className="text-[40px] leading-10 -tracking-[3px] text-white font-normal">
              Мебель <br /> для кухни
            </span>
          </ImageCard>
          <ImageCard
            position="bottom"
            padding="md"
            src={image1}
            className="w-full aspect-479/380"
          >
            <span className="text-[40px] leading-10 -tracking-[3px] text-white font-normal">
              Мебель <br /> для кухни
            </span>
          </ImageCard>
        </div>
      </div>
    </div>
  );
}
