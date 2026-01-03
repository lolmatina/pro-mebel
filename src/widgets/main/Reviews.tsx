import { Carousel } from "@mantine/carousel";
import { Rating } from "@mantine/core";
import image from "@/assets/main/reviews/image.jpg";
import { Button } from "@/components/Button";

export function MainReviews() {
  return (
    <div className="max-w-360 mx-auto px-15 py-15">
      <div className="text-center">
        <span className="text-[#002522] text-xl uppercase py-2 px-6 border rounded-full border-[rgba(34,34,34,0.1)]">
          отзывы
        </span>
        <h2 className="text-[40px] text-main font-medium mt-6 leading-[120%]">
          Наши довольные клиенты
        </h2>
        <p className="text-lg text-main mt-6 leading-[120%]">
          Немного отзывов от наших заказчиков
        </p>
      </div>
      <div className="px-18 mt-18">
        <Carousel
          slideSize={400}
          slideGap={24}
          withControls={false}
          emblaOptions={{
            dragFree: false,
            loop: false,
          }}
        >
          <Carousel.Slide>
            <div className="w-full h-87 p-6 text-center text-main border border-[rgba(0,0,0,0.1)] rounded-3xl">
              <div className="w-14 h-14 mx-auto rounded-full bg-gray-600" />
              <h4 className="text-[28px] font-medium leading-[120%] mt-4">
                Имя Фамилия
              </h4>
              <p className="text-lg text-main leading-[120%] mt-8">
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text ever
              </p>
              <div className="flex justify-center mt-8">
                <Rating value={5} readOnly />
              </div>
            </div>
          </Carousel.Slide>
          <Carousel.Slide>
            <div className="w-full h-87 p-6 text-center text-main border border-[rgba(0,0,0,0.1)] rounded-3xl">
              <div className="w-14 h-14 mx-auto rounded-full bg-gray-600" />
              <h4 className="text-[28px] font-medium leading-[120%] mt-4">
                Имя Фамилия
              </h4>
              <p className="text-lg text-main leading-[120%] mt-8">
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text ever
              </p>
              <div className="flex justify-center mt-8">
                <Rating value={5} readOnly />
              </div>
            </div>
          </Carousel.Slide>
          <Carousel.Slide>
            <div className="w-full h-87 p-6 text-center text-main border border-[rgba(0,0,0,0.1)] rounded-3xl">
              <div className="w-14 h-14 mx-auto rounded-full bg-gray-600" />
              <h4 className="text-[28px] font-medium leading-[120%] mt-4">
                Имя Фамилия
              </h4>
              <p className="text-lg text-main leading-[120%] mt-8">
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text ever
              </p>
              <div className="flex justify-center mt-8">
                <Rating value={5} readOnly />
              </div>
            </div>
          </Carousel.Slide>
          <Carousel.Slide>
            <div className="w-full h-87 p-6 text-center text-main border border-[rgba(0,0,0,0.1)] rounded-3xl">
              <div className="w-14 h-14 mx-auto rounded-full bg-gray-600" />
              <h4 className="text-[28px] font-medium leading-[120%] mt-4">
                Имя Фамилия
              </h4>
              <p className="text-lg text-main leading-[120%] mt-8">
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text ever
              </p>
              <div className="flex justify-center mt-8">
                <Rating value={5} readOnly />
              </div>
            </div>
          </Carousel.Slide>
        </Carousel>
      </div>
      <h4 className="text-[22px] font-medium text-main mt-15">
        Что о нас говорят наши клиенты
      </h4>
      <div className="flex justify-between gap-15 mt-7.5 pb-15">
        <div
          className="min-w-164 h-91.75 bg-cover bg-center rounded-[40px]"
          style={{
            backgroundImage: `url(${image})`,
          }}
        />
        <div className="py-4">
          <h2 className="text-[60px] -tracking-[3px] leading-16.25 text-main font-normal">
            Немного информации о нас и прочее
          </h2>
          <p className="text-lg leading-[120%] text-main mt-5">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book.
          </p>
          <Button variant="outline" className="mt-6">
            Узнать больше
          </Button>
        </div>
      </div>
    </div>
  );
}
