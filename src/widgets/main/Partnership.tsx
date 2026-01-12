import image from "@/assets/main/partnership/image.jpg";
import { Button } from "@/components/Button";

export function MainPartnership() {
  return (
    <div
      className="max-w-360 mx-auto px-4 lg:px-15 py-10 text-white"
      id="work-pipeline"
    >
      <div
        className="p rounded-[40px] bg-cover bg-bottom lg:pt-18 px-8 pt-8 pb-8 lg:px-20 lg:pb-8.5"
        style={{ backgroundImage: `url(${image})` }}
      >
        <h3 className="lg:text-[28px] lg:font-normal text-lg font-medium opacity-50 lg:opacity-100 leading-[120%]">
          О Сотрудничестве
        </h3>
        <h2 className="text-[40px] font-medium lg:text-[56px] lg:font-bold mt-2.5 mb-7.5 leading-[120%]">
          КАК МЫ РАБОТАЕМ
        </h2>
        <div className="flex flex-col gap-2.5 lg:gap-3.75">
          <div className="lg:w-142.5 border-b pb-2.5 lg:pb-5 border-[rgba(255,255,255,0.1)] flex gap-5 justify-start items-start">
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
          </div>
          <div className="lg:w-142.5 border-b pb-2.5 lg:pb-5 border-[rgba(255,255,255,0.1)] flex gap-5 justify-start items-start">
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
          </div>
          <div className="lg:w-142.5 border-b pb-2.5 lg:pb-5 border-[rgba(255,255,255,0.1)] flex gap-5 justify-start items-start">
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
          </div>
        </div>
        <div className="lg:w-142.5 mt-7.5">
          <Button variant="white" fullWidth>
            <span className="text-main">Перейти в конструктор</span>
          </Button>
        </div>
      </div>
    </div>
  );
}
