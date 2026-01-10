import { Button } from "@/components/Button";
import { Accordion } from "@mantine/core";
import { IconPlus } from "@tabler/icons-react";

export function MainFAQ() {
  return (
    <div className="max-w-360 mx-auto px-4 lg:px-15 py-15" id="faq">
      <div className="pt-15 flex flex-col lg:flex-row gap-15 lg:gap-26 text-main">
        <div className="w-full lg:w-137.5">
          <h2 className="text-[40px] leading-[120%] font-medium">
            Все что вам требуется знать
          </h2>
          <p className="mt-6 text-lg leading-6.4 hidden lg:block">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book.{" "}
          </p>
        </div>
        <div className="w-full lg:w-166.5">
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
                  Вопрос первый
                </span>
              </Accordion.Control>
              <Accordion.Panel
                styles={{ content: { padding: 0, paddingTop: 24 } }}
              >
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text ever since the 1500s, when an unknown printer took a galley
                of type and scrambled it to make a type specimen book.
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
                  Вопрос первый
                </span>
              </Accordion.Control>
              <Accordion.Panel
                styles={{ content: { padding: 0, paddingTop: 24 } }}
              >
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text ever since the 1500s, when an unknown printer took a galley
                of type and scrambled it to make a type specimen book.
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
                  Вопрос первый
                </span>
              </Accordion.Control>
              <Accordion.Panel styles={{ content: { padding: 24 } }}>
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text ever since the 1500s, when an unknown printer took a galley
                of type and scrambled it to make a type specimen book.
              </Accordion.Panel>
            </Accordion.Item>
          </Accordion>
        </div>
      </div>
      <div className="lg:hidden">
        <Button variant="outline" fullWidth>
          Узнать больше
        </Button>
      </div>
    </div>
  );
}
