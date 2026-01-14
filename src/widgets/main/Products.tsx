import { Button } from "@/components/Button";
import image1 from "@/assets/main/products/Image1.jpg";
import image2 from "@/assets/main/products/Image2.jpg";
import image3 from "@/assets/main/products/Image3.jpg";
import { useApplicationForm } from "@/lib/ApplicationFormContext";

export function MainProducts() {
  const { openForm } = useApplicationForm();
  return (
    <div className="max-w-360 mx-auto px-4 lg:px-15 lg:py-15" id="choose">
      <div
        className="block lg:hidden w-full aspect-343/232 bg-cover bg-center rounded-lg mt-9"
        style={{ backgroundImage: `url(${image1})` }}
      />
      <div className="flex justify-evenly lg:hidden gap-2.5 mt-2.5">
        <div
          className="w-full aspect-343/232 bg-cover bg-center rounded-lg"
          style={{ backgroundImage: `url(${image2})` }}
        />
        <div
          className="w-full aspect-343/232 bg-cover bg-center rounded-lg"
          style={{ backgroundImage: `url(${image3})` }}
        />
      </div>
      <div className="flex gap-6">
        <div className="w-full min-w-0 lg:w-135 pt-9 justify-center-safe shrink-0">
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
          <div
            className="hidden lg:block w-full h-186.25 bg-cover bg-center rounded-lg mt-9"
            style={{ backgroundImage: `url(${image1})` }}
          />
        </div>
        <div className="w-full lg:flex flex-col gap-13.75 hidden">
          <div
            className="w-full aspect-744/734 bg-cover bg-center rounded-lg"
            style={{ backgroundImage: `url(${image2})` }}
          />
          <div
            className="w-full aspect-744/322 bg-cover bg-center rounded-lg"
            style={{ backgroundImage: `url(${image3})` }}
          />
        </div>
      </div>
    </div>
  );
}
