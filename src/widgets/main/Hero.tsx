import { ImageCard } from "@/components/ImageCard";
import image1 from "@/assets/main/hero/image1.jpg";
import image2 from "@/assets/main/hero/image2.jpg";
import image3 from "@/assets/main/hero/image3.jpg";
import { Button } from "@/components/Button";

export function Hero() {
  return (
    <div className="max-w-330 mx-auto px-15">
      <div className="w-full flex gap-2.5">
        <div className="w-239.5">
          <ImageCard
            position="top"
            src={image1}
            className="w-full aspect-958/770 text-white"
          >
            <div className="flex flex-col gap-8.75">
              <div className="flex flex-col gap-5">
                <h1 className="text-[90px] leading-18.75 -tracking-[5px] font-normal">
                  Мебель на заказ
                </h1>
                <p className="text-lg leading-[120%] font-medium">
                  Индивидуальная мебель, фасады и панели — продуманные под ваш
                  интерьер.
                </p>
              </div>
              <div>
                <Button>Собрать свой проект</Button>
              </div>
            </div>
          </ImageCard>
        </div>
        <div className="flex flex-col w-88 gap-2.5">
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
      <div className="flex mt-2.5">
        <div className="min-w-78 text-main mr-10 mt-8.5">
          <h2 className="text-[65px] leading-[100%] -tracking-[4px] font-normal">
            Все что <br /> вам нужно
          </h2>
          <p className="text-lg leading-[120%] font-medium mt-6 mb-10.5">
            Мы занимаемся многопрофильной сборкой и все прочее
          </p>
          <Button variant="outline">Перейти в конструктор</Button>
        </div>
        <div className="flex gap-2.5 w-full justify-evenly">
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
