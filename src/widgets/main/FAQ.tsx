import { Button } from "@/components/Button";
import { useApplicationForm } from "@/lib/ApplicationFormContext";
import { Accordion } from "@mantine/core";
import { IconPlus } from "@tabler/icons-react";
import { motion } from "framer-motion";

export function MainFAQ() {
  const { openForm } = useApplicationForm();
  return (
    <div className="max-w-360 mx-auto px-4 lg:px-15 py-15" id="faq">
      <div className="pt-15 flex flex-col lg:flex-row gap-15 lg:gap-26 text-main">
        <motion.div
          className="w-full lg:w-137.5"
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <h2 className="text-[40px] leading-[120%] font-medium">
            Все что вам требуется знать
          </h2>
          <p className="mt-6 text-lg leading-6.4 hidden lg:block">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book.{" "}
          </p>
        </motion.div>
        <motion.div
          className="w-full lg:w-166.5"
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
        >
          <Accordion chevron={<IconPlus size={24} className="text-main" />}>
            <Accordion.Item
              value="q1"
              styles={{
                item: {
                  border: "1px solid #E7E2DE",
                  padding: 24,
                  marginBottom: 20,
                },
              }}
            >
              <Accordion.Control
                styles={{ control: { padding: 0 }, label: { padding: 0 } }}
              >
                <span className="text-2xl leading-8 text-main">
                  С какими марками ЛДСП вы работаете?
                </span>
              </Accordion.Control>
              <Accordion.Panel
                styles={{ content: { padding: 0, paddingTop: 24 } }}
              >
                Мы работаем с ЛДСП следующих производителей: Ламарти и
                Kronospan. Подбор конкретных декоров осуществляется под задачи
                проекта и согласовывается с заказчиком.
              </Accordion.Panel>
            </Accordion.Item>
            <Accordion.Item
              value="q2"
              styles={{
                item: {
                  border: "1px solid #E7E2DE",
                  padding: 24,
                  marginBottom: 20,
                },
              }}
            >
              <Accordion.Control
                styles={{ control: { padding: 0 }, label: { padding: 0 } }}
              >
                <span className="text-2xl leading-8 text-main">
                  Можно ли заказать только распил без изготовления мебели?
                </span>
              </Accordion.Control>
              <Accordion.Panel
                styles={{ content: { padding: 0, paddingTop: 24 } }}
              >
                Да. Мы выполняем услуги распила ЛДСП по вашим размерам с
                последующей кромкой — в рамках услуги.
              </Accordion.Panel>
            </Accordion.Item>
            <Accordion.Item
              value="q3"
              styles={{
                item: {
                  border: "1px solid #E7E2DE",
                  padding: 0,
                  marginBottom: 20,
                },
              }}
            >
              <Accordion.Control
                styles={{ control: { padding: 24 }, label: { padding: 0 } }}
              >
                <span className="text-2xl leading-8 text-main">
                  Какие сроки распила ЛДСП?
                </span>
              </Accordion.Control>
              <Accordion.Panel styles={{ content: { padding: 24 } }}>
                Средний срок распила составляет от 3 до 5 рабочих дней. Сроки
                могут меняться в зависимости от объёма заказа и текущей
                загруженности производства.
              </Accordion.Panel>
            </Accordion.Item>
            <Accordion.Item
              value="q4"
              styles={{
                item: {
                  border: "1px solid #E7E2DE",
                  padding: 0,
                  marginBottom: 20,
                },
              }}
            >
              <Accordion.Control
                styles={{ control: { padding: 24 }, label: { padding: 0 } }}
              >
                <span className="text-2xl leading-8 text-main">
                  Продаёте ли вы кромку отдельно?
                </span>
              </Accordion.Control>
              <Accordion.Panel styles={{ content: { padding: 24 } }}>
                Нет. Кромка используется только в составе наших услуг по распилу
                и изготовлению изделий. Отдельно кромка не продаётся.
              </Accordion.Panel>
            </Accordion.Item>
            <Accordion.Item
              value="q5"
              styles={{
                item: {
                  border: "1px solid #E7E2DE",
                  padding: 0,
                  marginBottom: 20,
                },
              }}
            >
              <Accordion.Control
                styles={{ control: { padding: 24 }, label: { padding: 0 } }}
              >
                <span className="text-2xl leading-8 text-main">
                  Какие фасады вы изготавливаете?
                </span>
              </Accordion.Control>
              <Accordion.Panel styles={{ content: { padding: 24 } }}>
                Мы изготавливаем фасады:
                <br />
                в покраске
                <br />
                в ПВХ-плёнке
                <br />в шпоне
                <br />
                Помогаем подобрать оптимальный вариант под стиль интерьера,
                задачи и бюджет проекта.
              </Accordion.Panel>
            </Accordion.Item>
            <Accordion.Item
              value="q6"
              styles={{
                item: {
                  border: "1px solid #E7E2DE",
                  padding: 0,
                  marginBottom: 20,
                },
              }}
            >
              <Accordion.Control
                styles={{ control: { padding: 24 }, label: { padding: 0 } }}
              >
                <span className="text-2xl leading-8 text-main">
                  С какой фурнитурой вы работаете?
                </span>
              </Accordion.Control>
              <Accordion.Panel styles={{ content: { padding: 24 } }}>
                В своих проектах мы используем фурнитуру Aristo и Hettich —
                проверенные системы, подходящие для корпусной мебели и
                раздвижных решений.
              </Accordion.Panel>
            </Accordion.Item>
            <Accordion.Item
              value="q7"
              styles={{
                item: {
                  border: "1px solid #E7E2DE",
                  padding: 0,
                  marginBottom: 20,
                },
              }}
            >
              <Accordion.Control
                styles={{ control: { padding: 24 }, label: { padding: 0 } }}
              >
                <span className="text-2xl leading-8 text-main">
                  Можно ли купить фурнитуру отдельно?
                </span>
              </Accordion.Control>
              <Accordion.Panel styles={{ content: { padding: 24 } }}>
                Нет. Мы не продаём фурнитуру отдельно. Фурнитура подбирается и
                используется только в рамках изготовления мебели или фасадов,
                чтобы обеспечить корректную установку и качество результата.
              </Accordion.Panel>
            </Accordion.Item>
            <Accordion.Item
              value="q8"
              styles={{
                item: {
                  border: "1px solid #E7E2DE",
                  padding: 0,
                  marginBottom: 20,
                },
              }}
            >
              <Accordion.Control
                styles={{ control: { padding: 24 }, label: { padding: 0 } }}
              >
                <span className="text-2xl leading-8 text-main">
                  Что ещё вы производите помимо мебели?
                </span>
              </Accordion.Control>
              <Accordion.Panel styles={{ content: { padding: 24 } }}>
                Помимо мебели на заказ, мы изготавливаем:
                <br />
                фасады
                <br />
                стеновые панели
                <br />
                декоративные панели и панно
                <br />
                элементы для жилых и коммерческих интерьеров
              </Accordion.Panel>
            </Accordion.Item>
          </Accordion>
        </motion.div>
      </div>
      <motion.div
        className="lg:hidden"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      >
        <Button variant="outline" fullWidth onClick={() => openForm({})}>
          Узнать больше
        </Button>
      </motion.div>
    </div>
  );
}
