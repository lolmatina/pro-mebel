import { ImageCard } from "@/components/ImageCard";
import image1 from "@/assets/main/hero/image1.jpg";
import image2 from "@/assets/main/hero/image2.jpg";
import image3 from "@/assets/main/hero/image3.jpg";
import { Button } from "@/components/Button";
import { Carousel } from "@mantine/carousel";
import { useMediaQuery } from "@mantine/hooks";
import { motion } from "framer-motion";
import { useFeatureFlag } from "@/lib/FeatureFlagContext";
import { useApplicationForm } from "@/lib/ApplicationFormContext";
import { useNavigate } from "react-router";

export function Hero() {
  const { constructorEnabled, heroBlocks } = useFeatureFlag();
  const { openForm } = useApplicationForm();
  const navigate = useNavigate();
  const isDesktop = useMediaQuery("(min-width: 1024px)");
  const canUseConstructor = Boolean(constructorEnabled) && isDesktop;

  return (
    <div className="max-w-360 mx-auto px-4 lg:px-15" id="main">
      <div className="w-full lg:flex gap-2.5">
        <motion.div
          className="lg:w-239.5 pb-4 lg:pb-0"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <ImageCard
            position="top"
            src={image1}
            className="w-full h-[calc(100dvh-108px)] lg:h-auto lg:aspect-958/770 text-white"
          >
            <div className="flex flex-col justify-between md:justify-center lg:justify-start items-start md:items-center lg:items-start gap-8.75 h-full w-full md:text-center lg:text-left">
              <motion.div
                className="flex flex-col gap-5"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
              >
                <h1 className="text-[56px] lg:text-[90px] leading-18.75 -tracking-[5px] font-normal">
                  Мебель на заказ
                </h1>
                <p className="text-lg leading-[120%] font-medium">
                  Индивидуальная мебель, фасады и панели — продуманные под ваш
                  интерьер.
                </p>
              </motion.div>
              <motion.div
                className="text-center md:text-left"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
              >
                {canUseConstructor ? (
                  <a href="/#constructor">
                    <Button className="w-full! max-w-75!">
                      Собрать свой проект
                    </Button>
                  </a>
                ) : (
                  <Button
                    className="w-full! max-w-75!"
                    onClick={() => openForm({})}
                  >
                    Оставить заявку
                  </Button>
                )}
              </motion.div>
            </div>
          </ImageCard>
        </motion.div>
        <div className="hidden lg:flex flex-col w-88 gap-2.5">
          <motion.div
            initial={{ opacity: 0, x: 30, width: "100%" }}
            animate={{ opacity: 1, x: 0, width: "100%" }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          >
            <ImageCard
              position="top"
              padding="md"
              src={heroBlocks[0]?.image ? `${process.env.API_BASE_URL}/${heroBlocks[0]?.image}` : image2}
              className="w-full aspect-352/380 "
              onClick={() => navigate(heroBlocks[0]?.link ?? "/")}
            >
              <span className="text-[40px] leading-10 -tracking-[3px] text-white font-normal">
                {heroBlocks[0]?.title ?? "Диваны"}
              </span>
            </ImageCard>
          </motion.div>
          <motion.div
            className="w-full shrink-0"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
          >
            <ImageCard
              position="top"
              padding="md"
              src={heroBlocks[1]?.image ? `${process.env.API_BASE_URL}/${heroBlocks[1]?.image}` : image3}
              className="w-full aspect-352/380 "
              onClick={() => navigate(heroBlocks[1]?.link ?? "/")}
            >
              <span className="text-[40px] leading-10 -tracking-[3px] text-white font-normal">
                {heroBlocks[1]?.title ?? "Для спальных комнат"}
              </span>
            </ImageCard>
          </motion.div>
        </div>
      </div>
      <motion.div
        className="flex flex-col lg:flex-row mt-2.5 w-full max-w-full"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
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
                onClick={() => navigate(heroBlocks[0]?.link ?? "/")}
                className="w-full h-47.25 rounded-3xl p-6 bg-cover bg-center"
                style={{ backgroundImage: `url(${heroBlocks[0]?.image ? `${process.env.API_BASE_URL}/${heroBlocks[0]?.image}` : image1})` }}
              >
                <span className="text-[28px] text-white">{heroBlocks[0]?.title ?? "Диваны"}</span>
              </div>
            </Carousel.Slide>
            <Carousel.Slide>
              <div
                onClick={() => navigate(heroBlocks[1]?.link ?? "/")}
                className="w-full h-47.25 rounded-3xl p-6 bg-contain bg-center"
                style={{ backgroundImage: `url(${heroBlocks[1]?.image ? `${process.env.API_BASE_URL}/${heroBlocks[1]?.image}` : image2})` }}
              >
                <span className="text-[28px] text-white">{heroBlocks[1]?.title ?? "Диваны"}</span>
              </div>
            </Carousel.Slide>
            <Carousel.Slide>
              <div
                onClick={() => navigate(heroBlocks[2]?.link ?? "/")}
                className="w-full h-47.25 rounded-3xl p-6 bg-cover bg-center"
                style={{ backgroundImage: `url(${heroBlocks[2]?.image ? `${process.env.API_BASE_URL}/${heroBlocks[2]?.image}` : image3})` }}
              >
                <span className="text-[28px] text-white">{heroBlocks[2]?.title ?? "Диваны"}</span>
              </div>
            </Carousel.Slide>
          </Carousel>
        </div>
        <motion.div
          className="w-full lg:max-w-78 text-main lg:mr-10 mt-8.5"
          id="should-know"
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <h2 className="text-[56px] lg:text-[65px] leading-[100%] -tracking-[4px] font-normal">
            Все что <br /> вам нужно
          </h2>
          <p className="text-lg text-main leading-[120%] font-medium mt-6 mb-10.5">
            От идеи до реализации — мебель, фасады и интерьерные элементы в вашем стиле.
          </p>
          {canUseConstructor ? (
            <a href="/#constructor">
              <Button variant="outline">
                Перейти в конструктор
              </Button>
            </a>
          ) : (
            <Button
              variant="outline"
              onClick={() => openForm({})}
            >
              Оставить заявку
            </Button>
          )}
        </motion.div>
        <div className="hidden xl:flex gap-2.5 w-full justify-evenly">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="w-full"
          >
            <ImageCard
              position="bottom"
              padding="md"
              src={heroBlocks[2]?.image ? `${process.env.API_BASE_URL}/${heroBlocks[2]?.image}` : image3}
              className="w-full aspect-479/380"
              onClick={() => navigate(heroBlocks[2]?.link ?? "/")}
            >
              <span className="text-[40px] leading-10 -tracking-[3px] text-white font-normal">
                {heroBlocks[2]?.title ?? "Мебель для кухни"}
              </span>
            </ImageCard>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="w-full"
          >
            <ImageCard
              position="bottom"
              padding="md"
              src={heroBlocks[3]?.image ? `${process.env.API_BASE_URL}/${heroBlocks[3]?.image}` : image1}
              className="w-full aspect-479/380"
              onClick={() => navigate(heroBlocks[3]?.link ?? "/")}
            >
              <span className="text-[40px] leading-10 -tracking-[3px] text-white font-normal">
                {heroBlocks[3]?.title ?? "Мебель для кухни"}
              </span>
            </ImageCard>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
