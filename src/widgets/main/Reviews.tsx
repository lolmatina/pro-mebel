import { Carousel } from "@mantine/carousel";
import { Rating } from "@mantine/core";
import image from "@/assets/main/reviews/image.jpg";
import { Button } from "@/components/Button";
import { useEffect, useState } from "react";
import type { EmblaCarouselType } from "embla-carousel";
import { IconChevronLeft, IconChevronRight } from "@tabler/icons-react";
import { api, type Review } from "@/lib/api";
import { useApplicationForm } from "@/lib/ApplicationFormContext";

export function MainReviews() {
  const [embla, setEmbla] = useState<EmblaCarouselType | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const { openForm } = useApplicationForm();

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    try {
      setLoading(true);
      const response = await api.getReviews(1, 100); // Get all reviews
      setReviews(response.data);
    } catch (err) {
      console.error("Failed to load reviews:", err);
    } finally {
      setLoading(false);
    }
  };

  const getImageUrl = (imagePath: string) => {
    return imagePath.startsWith("http")
      ? imagePath
      : `${process.env.API_BASE_URL}/${imagePath}`;
  };

  return (
    <div
      className="max-w-360 mx-auto px-4 py-10 lg:px-15 lg:py-15"
      id="reviews"
    >
      <div className="text-center">
        <span className="text-[#002522] text-xl uppercase py-2 px-6 border rounded-full border-[rgba(34,34,34,0.1)]">
          отзывы
        </span>
        <h2 className="text-[40px] text-main font-medium mt-6 leading-[120%]">
          Наши довольные клиенты
        </h2>
        <p className="hidden lg:block text-lg text-main mt-6 leading-[120%]">
          Немного отзывов от наших заказчиков
        </p>
      </div>
      <div className="lg:px-18 lg:mt-18 mt-12.5">
        {loading ? (
          <div className="text-center py-10"></div>
        ) : reviews.length === 0 ? (
          <div className="text-center py-10">Список отзывов пуст</div>
        ) : (
          <Carousel
            slideSize={{ lg: 400, md: "50%", sm: "100%" }}
            slideGap={24}
            withControls={false}
            getEmblaApi={setEmbla}
            emblaOptions={{
              dragFree: true,
              loop: true,
            }}
          >
            {reviews.map((review) => (
              <Carousel.Slide key={review.id}>
                <div className="w-full h-87 p-6 text-center text-main border border-[rgba(0,0,0,0.1)] rounded-3xl">
                  <div
                    className="w-14 h-14 mx-auto rounded-full bg-gray-600 bg-cover bg-center"
                    style={{
                      backgroundImage: `url(${getImageUrl(review.image)})`,
                    }}
                  />
                  <h4 className="text-[28px] font-medium leading-[120%] mt-4">
                    {review.name}
                  </h4>
                  <p className="text-lg text-main leading-[120%] mt-8 line-clamp-4">
                    {review.review}
                  </p>
                  <div className="flex justify-center mt-8">
                    <Rating value={review.rating} readOnly />
                  </div>
                </div>
              </Carousel.Slide>
            ))}
          </Carousel>
        )}
        <div className="flex lg:hidden justify-between items-center mt-12.5">
          <div
            className="flex justify-center items-center w-12.5 h-12.5 bg-main text-white rounded-full"
            onClick={() => {
              if (embla) embla.scrollPrev();
            }}
          >
            <IconChevronLeft size={25} />
          </div>
          <div className="flex gap-2 items-center justify-center"></div>
          <div
            className="flex justify-center items-center w-12.5 h-12.5 bg-main text-white rounded-full"
            onClick={() => {
              if (embla) embla.scrollNext();
            }}
          >
            <IconChevronRight size={25} />
          </div>
        </div>
      </div>
      <h4
        className="text-[22px] font-medium text-main mt-10 lg:mt-15"
        id="about-us"
      >
        Что о нас говорят наши клиенты
      </h4>
      <div className="flex flex-col lg:flex-row justify-between lg:gap-15 mt-7.5 pb-15">
        <div
          className="lg:min-w-164 lg:h-91.75 w-full aspect-164/92 bg-cover bg-center rounded-[40px]"
          style={{
            backgroundImage: `url(${image})`,
          }}
        />
        <div className="py-4">
          <h2 className="text-[40px] lg:text-[60px] -tracking-[3px] leading-[120%] lg:leading-16.25 text-main font-normal">
            Немного информации о нас и прочее
          </h2>
          <p className="text-lg leading-[120%] text-main mt-5 opacity-80 lg:opacity-100">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book.
          </p>
          <Button
            variant="outline"
            className="mt-6"
            fullWidth
            onClick={() => openForm({})}
          >
            Узнать больше
          </Button>
        </div>
      </div>
    </div>
  );
}
