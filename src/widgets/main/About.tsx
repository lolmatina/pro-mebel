import image from "@/assets/main/about/image.jpg";
import image1 from "@/assets/main/about/image1.jpg";
import image2 from "@/assets/main/about/image2.jpg";
import image3 from "@/assets/main/about/image3.jpg";
import { motion } from "framer-motion";

export function MainAbout() {
  return (
    <div className="max-w-360 mx-auto px-4 lg:px-15 py-15" id="about">
      <motion.div
        className="flex flex-col lg:flex-row lg:justify-between items-start"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        <span className="text-[#002522] border border-[rgba(34,34,34,0.1)] text-xl py-2 px-6 rounded-full">
          Немного о PRO Mebel
        </span>
        <span className="text-[40px] font-medium text-main">
          О PRO MEBEL в цифрах
        </span>
      </motion.div>
      <motion.div
        className="hidden lg:grid grid-cols-3 bg-[rgba(0,0,0,0.1)] gap-px auto-rows-[224px] mt-10"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={{
          visible: {
            transition: {
              staggerChildren: 0.1,
            },
          },
        }}
      >
        <motion.div
          className="bg-white"
          variants={{
            hidden: { opacity: 0, scale: 0.9 },
            visible: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
          }}
        >
          <div
            className="w-70 h-full rounded-[31px] bg-cover"
            style={{
              backgroundImage: `url(${image})`,
            }}
          />
        </motion.div>
        <motion.div
          className="bg-white pt-10 pb-6 flex flex-col justify-between pl-8"
          variants={{
            hidden: { opacity: 0, y: 30 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
          }}
        >
          <span className="text-[rgba(2,2,2,0.7)] text-lg font-medium">
            Общее число клиентов
          </span>
          <span className="text-main text-[56px]">1000+</span>
        </motion.div>
        <motion.div
          className="bg-white pt-12 text-right"
          variants={{
            hidden: { opacity: 0, y: 30 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
          }}
        >
          <span className="max-w-80 inline-block text-lg text-main">
            Создаём мебель, фасады и интерьерные панели для частных и
            коммерческих пространств.
          </span>
        </motion.div>
        <motion.div
          className="bg-white"
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1, transition: { duration: 0.5 } },
          }}
        />
        <motion.div
          className="bg-white"
          variants={{
            hidden: { opacity: 0, scale: 0.9 },
            visible: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
          }}
        >
          <div
            className="w-full h-full rounded-[31px] bg-cover bg-no-repeat bg-center"
            style={{
              backgroundImage: `url(${image})`,
            }}
          />
        </motion.div>
        <motion.div
          className="bg-white pt-10 pb-6 flex flex-col justify-between text-right pl-8"
          variants={{
            hidden: { opacity: 0, y: 30 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
          }}
        >
          <span className="text-[rgba(2,2,2,0.7)] text-lg font-medium">
            На рынке
          </span>
          <span className="text-main text-[56px]">20+ лет</span>
        </motion.div>
        <motion.div
          className="bg-white pt-10 pb-6 flex flex-col justify-between"
          variants={{
            hidden: { opacity: 0, y: 30 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
          }}
        >
          <span className="text-[rgba(2,2,2,0.7)] text-lg font-medium">
            Собственное производство
          </span>
          <span className="text-main text-[22px] font-medium">
            Полный цикл — от идеи до готового изделия
          </span>
        </motion.div>
        <motion.div
          className="bg-white flex items-center justify-center px-15"
          variants={{
            hidden: { opacity: 0, y: 30 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
          }}
        >
          <span className="text-[rgba(2,2,2,0.7)] text-lg text-center">
            Продумываем пропорции и форму, чтобы мебель выглядела современно и
            уместно в интерьере.
          </span>
        </motion.div>
        <motion.div
          className="bg-white"
          variants={{
            hidden: { opacity: 0, scale: 0.9 },
            visible: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
          }}
        >
          <div
            className="w-70 h-full ml-auto rounded-[31px] bg-cover"
            style={{
              backgroundImage: `url(${image})`,
            }}
          />
        </motion.div>
      </motion.div>
      <motion.div
        className="mt-4 lg:hidden"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={{
          visible: {
            transition: {
              staggerChildren: 0.15,
            },
          },
        }}
      >
        <motion.p
          className="text-lg text-main font-medium opacity-80"
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 0.8, y: 0, transition: { duration: 0.5 } },
          }}
        >
          Мы занимаемся многопрофильной сборкой и все прочее
        </motion.p>
        <motion.div
          className="mt-4 aspect-343/277 bg-cover bg-no-repeat bg-center rounded-[38px] w-full"
          style={{ backgroundImage: `url(${image1})` }}
          variants={{
            hidden: { opacity: 0, scale: 0.95 },
            visible: { opacity: 1, scale: 1, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
          }}
        />
        <motion.p
          className="text-[22px] text-main opacity-70 font-medium"
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 0.7, y: 0, transition: { duration: 0.5 } },
          }}
        >
          Полный цикл — от идеи до готового изделия
        </motion.p>
        <motion.div
          className="mt-10 aspect-343/390 bg-cover bg-no-repeat bg-center rounded-[38px] w-full"
          style={{ backgroundImage: `url(${image2})` }}
          variants={{
            hidden: { opacity: 0, scale: 0.95 },
            visible: { opacity: 1, scale: 1, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
          }}
        />
        <motion.div
          className="text-center flex flex-col gap-3 mt-3"
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
          }}
        >
          <h3 className="text-[22px] text-[rgba(34,34,34,0.7)] font-normal leading-[120%]">
            Сколько мебеи сделали?
          </h3>
          <div className="text-[56px] font-medium leading-[120%]">1000+</div>
          <p className="text-[22px] text-[rgba(11,20,36,0.7)] leading-[120%] tracking-normal font-normal">
            Продумываем пропорции и форму, чтобы мебель выглядела современно и
            уместно в интерьере.
          </p>
        </motion.div>
        <motion.div
          className="flex flex-col gap-3 mt-10 text-right"
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
          }}
        >
          <div
            className="mt-10 aspect-343/277 bg-cover bg-no-repeat bg-center rounded-[38px] w-full"
            style={{ backgroundImage: `url(${image3})` }}
          />
          <h3 className="text-[22px] text-[rgba(34,34,34,0.7)] font-normal leading-[120%]">
            На рынке
          </h3>
          <div className="text-[56px] font-medium leading-[120%]">20+ лет</div>
          <p className="text-[22px] text-[rgba(11,20,36,0.7)] leading-[120%] tracking-normal font-normal">
            Создаём мебель, фасады и интерьерные панели для частных и
            коммерческих пространств.
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
}
