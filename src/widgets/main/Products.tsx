import { Button } from "@/components/Button";
import image1 from "@/assets/main/products/Image1.jpg";
import image2 from "@/assets/main/products/Image2.jpg";
import image3 from "@/assets/main/products/Image3.jpg";

export function MainProducts() {
  return (
    <div className="max-w-360 mx-auto px-15 py-15">
      <div className="flex gap-6">
        <div className="min-w-135 pt-9">
          <h2 className="text-[40px] text-main leading-[120%]">
            Подберите медель под интерьер вашей мечты
          </h2>
          <p className="text-lg leading-[120%] text-main mt-6">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s
          </p>
          <Button className="mt-6" fullWidth>
            Оставить заявку
          </Button>
          <div
            className="w-full h-186.25 bg-cover bg-center rounded-lg mt-9"
            style={{ backgroundImage: `url(${image1})` }}
          />
        </div>
        <div className="min-w-186 flex flex-col gap-13.75">
          <div
            className="w-full h-183.5 bg-cover bg-center rounded-lg"
            style={{ backgroundImage: `url(${image2})` }}
          />
          <div
            className="w-full h-80.5 bg-cover bg-center rounded-lg"
            style={{ backgroundImage: `url(${image3})` }}
          />
        </div>
      </div>
    </div>
  );
}
