import image from "@/assets/main/partnership/image.jpg";
import { Button } from "@/components/Button";

export function MainPartnership() {
  return (
    <div className="max-w-360 mx-auto px-15 py-10 text-white">
      <div
        className="p rounded-[40px] pt-18 px-20 pb-8.5"
        style={{ backgroundImage: `url(${image})` }}
      >
        <h3 className="text-[28px] font-normal leading-[120%]">
          О Сотрудничестве
        </h3>
        <h2 className="text-[56px] font-bold mt-2.5 mb-7.5 leading-[120%]">
          КАК МЫ РАБОТАЕМ
        </h2>
        <div className="flex flex-col gap-3.75">
          <div className="w-142.5 border-b pb-5 border-[rgba(255,255,255,0.1)] flex gap-5 justify-start items-start">
            <span className="min-w-16 h-16 bg-[#ECB276] rounded-full text-[32px] font-medium flex justify-center items-center leading-0">
              01
            </span>
            <div className="w-full">
              <h3 className="text-[28px] font-medium leading-[120%]">
                Вы выбираете мебель
              </h3>
              <p className="text-lg pt-2.5 leading-[120%] text-[rgba(255,255,255,0.5)]">
                В конструкторе или с менеджером вы выбираете тип мебели, фасон,
                материалы и цветовую гамму.
              </p>
            </div>
          </div>
          <div className="w-142.5 border-b pb-5 border-[rgba(255,255,255,0.1)] flex gap-5 justify-start items-start">
            <span className="min-w-16 h-16 rounded-full text-[32px] font-medium flex justify-center items-center leading-0">
              02
            </span>
            <div className="w-full">
              <h3 className="text-[28px] font-medium leading-[120%]">
                Мы связываемся с вами
              </h3>
              <p className="text-lg pt-2.5 leading-[120%] text-[rgba(255,255,255,0.5)]">
                Уточняем детали, отвечаем на вопросы, предлагаем оптимальные
                решения под ваш бюджет.
              </p>
            </div>
          </div>
          <div className="w-142.5 border-b pb-5 border-[rgba(255,255,255,0.1)] flex gap-5 justify-start items-start">
            <span className="min-w-16 h-16 rounded-full text-[32px] font-medium flex justify-center items-center leading-0">
              03
            </span>
            <div className="w-full">
              <h3 className="text-[28px] font-medium leading-[120%]">
                Мы изготавливаем и устанавливаем
              </h3>
              <p className="text-lg pt-2.5 leading-[120%] text-[rgba(255,255,255,0.5)]">
                Производим мебель на собственном производстве, доставляем и
                аккуратно устанавливаем.
              </p>
            </div>
          </div>
        </div>
        <div className="w-142.5 mt-7.5">
          <Button variant="white" fullWidth>
            <span className="text-main">Перейти в конструктор</span>
          </Button>
        </div>
      </div>
    </div>
  );
}
