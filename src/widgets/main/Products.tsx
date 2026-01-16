import { Button } from "@/components/Button";
import image1 from "@/assets/main/products/Image1.jpg";
import image2 from "@/assets/main/products/Image2.jpg";
import image3 from "@/assets/main/products/Image3.jpg";
import { useApplicationForm } from "@/lib/ApplicationFormContext";
import { motion } from "framer-motion";

export function MainProducts() {
  const { openForm } = useApplicationForm();
  return (
    <div className="max-w-360 mx-auto px-4 lg:px-15 lg:py-15" id="choose">
      <motion.div
        className="block lg:hidden w-full aspect-343/232 bg-cover bg-center rounded-lg mt-9"
        style={{ backgroundImage: `url(${image1})` }}
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      />
      <motion.div
        className="flex justify-evenly lg:hidden gap-2.5 mt-2.5"
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
          className="w-full aspect-343/232 bg-cover bg-center rounded-lg"
          style={{ backgroundImage: `url(${image2})` }}
          variants={{
            hidden: { opacity: 0, scale: 0.9 },
            visible: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
          }}
        />
        <motion.div
          className="w-full aspect-343/232 bg-cover bg-center rounded-lg"
          style={{ backgroundImage: `url(${image3})` }}
          variants={{
            hidden: { opacity: 0, scale: 0.9 },
            visible: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
          }}
        />
      </motion.div>
      <div className="flex gap-6">
        <motion.div
          className="w-full min-w-0 lg:w-135 pt-9 justify-center-safe shrink-0"
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <h2 className="text-[40px] text-main leading-[120%] font-medium">
            Подберите медель под интерьер вашей мечты
          </h2>
          <p className="text-lg leading-[120%] text-main mt-6">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s
          </p>
          <Button className="mt-6" fullWidth onClick={() => openForm({})}>
            Оставить заявку
          </Button>
          <motion.div
            className="hidden lg:block w-full h-186.25 bg-cover bg-center rounded-lg mt-9"
            style={{ backgroundImage: `url(${image1})` }}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          />
        </motion.div>
        <motion.div
          className="w-full lg:flex flex-col gap-13.75 hidden"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={{
            visible: {
              transition: {
                staggerChildren: 0.2,
              },
            },
          }}
        >
          <motion.div
            className="w-full aspect-744/734 bg-cover bg-center rounded-lg"
            style={{ backgroundImage: `url(${image2})` }}
            variants={{
              hidden: { opacity: 0, y: 30 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
            }}
          />
          <motion.div
            className="w-full aspect-744/322 bg-cover bg-center rounded-lg"
            style={{ backgroundImage: `url(${image3})` }}
            variants={{
              hidden: { opacity: 0, y: 30 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
            }}
          />
        </motion.div>
      </div>
    </div>
  );
}
