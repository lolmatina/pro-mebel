import image from "@/assets/main/partnership/image.jpg";
import { Button } from "@/components/Button";
import { motion } from "framer-motion";
import { useFeatureFlag } from "@/lib/FeatureFlagContext";
import { useApplicationForm } from "@/lib/ApplicationFormContext";

export function MainPartnership() {
  const { constructorEnabled } = useFeatureFlag();
  const { openForm } = useApplicationForm();

  return (
    <motion.div
      className="max-w-360 mx-auto px-4 lg:px-15 py-10 text-white"
      id="work-pipeline"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
    >
      <div
        className="p rounded-[40px] bg-cover bg-bottom lg:pt-18 px-8 pt-8 pb-8 lg:px-20 lg:pb-8.5"
        style={{ backgroundImage: `url(${image})` }}
      >
        <motion.h3
          className="lg:text-[28px] lg:font-normal text-lg font-medium opacity-50 lg:opacity-100 leading-[120%]"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          О Сотрудничестве
        </motion.h3>
        <motion.h2
          className="text-[40px] font-medium lg:text-[56px] lg:font-bold mt-2.5 mb-7.5 leading-[120%]"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          КАК МЫ РАБОТАЕМ
        </motion.h2>
        <motion.div
          className="flex flex-col gap-2.5 lg:gap-3.75"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={{
            visible: {
              transition: {
                staggerChildren: 0.15,
              },
            },
          }}
        >
          <motion.div
            className="lg:w-142.5 border-b pb-2.5 lg:pb-5 border-[rgba(255,255,255,0.1)] flex gap-5 justify-start items-start"
            variants={{
              hidden: { opacity: 0, x: -30 },
              visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
            }}
          >
            <span className="min-w-8 h-8 lg:min-w-16 lg:h-16 bg-[#ECB276] rounded-full text-base lg:text-[32px] font-medium flex justify-center items-center leading-0">
              01
            </span>
            <div className="w-full">
              <h3 className="text-[22px] lg:text-[28px] font-medium leading-[120%]">
                Вы выбираете мебель
              </h3>
              <p className="text-sm lg:text-lg pt-1 lg:pt-2.5 leading-[120%] text-[rgba(255,255,255,0.5)]">
                В конструкторе или с менеджером вы выбираете тип мебели, фасон,
                материалы и цветовую гамму.
              </p>
            </div>
          </motion.div>
          <motion.div
            className="lg:w-142.5 border-b pb-2.5 lg:pb-5 border-[rgba(255,255,255,0.1)] flex gap-5 justify-start items-start"
            variants={{
              hidden: { opacity: 0, x: -30 },
              visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
            }}
          >
            <span className="min-w-8 h-8 lg:min-w-16 lg:h-16 rounded-full text-base lg:text-[32px] font-medium flex justify-center items-center leading-0">
              02
            </span>
            <div className="w-full">
              <h3 className="text-[22px] lg:text-[28px] font-medium leading-[120%]">
                Мы связываемся с вами
              </h3>
              <p className="text-sm lg:text-lg pt-1 lg:pt-2.5 leading-[120%] text-[rgba(255,255,255,0.5)]">
                Уточняем детали, отвечаем на вопросы, предлагаем оптимальные
                решения под ваш бюджет.
              </p>
            </div>
          </motion.div>
          <motion.div
            className="lg:w-142.5 border-b pb-2.5 lg:pb-5 border-[rgba(255,255,255,0.1)] flex gap-5 justify-start items-start"
            variants={{
              hidden: { opacity: 0, x: -30 },
              visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
            }}
          >
            <span className="min-w-8 h-8 lg:min-w-16 lg:h-16 rounded-full text-base lg:text-[32px] font-medium flex justify-center items-center leading-0">
              03
            </span>
            <div className="w-full">
              <h3 className="text-[22px] lg:text-[28px] font-medium leading-[120%]">
                Мы изготавливаем и устанавливаем
              </h3>
              <p className="text-sm lg:text-lg pt-1 lg:pt-2.5 leading-[120%] text-[rgba(255,255,255,0.5)]">
                Производим мебель на собственном производстве, доставляем и
                аккуратно устанавливаем.
              </p>
            </div>
          </motion.div>
        </motion.div>
        <motion.div
          className="lg:w-142.5 mt-7.5"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          {constructorEnabled ? (
            <a href="/#constructor">
              <Button
                variant="white"
                fullWidth 
              >
                <span className="text-main">Перейти в конструктор</span>
              </Button>
            </a>
          ) : (
            <Button
              variant="white"
              fullWidth
              onClick={() => openForm({})}
            >
              <span className="text-main">Оставить заявку</span>
            </Button>
          )}
        </motion.div>
      </div>
    </motion.div>
  );
}
