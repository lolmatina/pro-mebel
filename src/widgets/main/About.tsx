import image1 from "@/assets/main/about/image.jpg";

export function MainAbout() {
  return (
    <div className="max-w-360 mx-auto px-15 py-15">
      <div className="flex justify-between items-start">
        <span className="text-[#002522] border border-[rgba(34,34,34,0.1)] text-xl py-2 px-6 rounded-full">
          Немного о PRO Mebel
        </span>
        <span className="text-[40px] font-medium text-main">
          О PRO MEBEL в цифрах
        </span>
      </div>
      <div className="grid grid-cols-3 bg-[rgba(0,0,0,0.1)] gap-px auto-rows-[224px] mt-10">
        <div className="bg-white">
          <div
            className="w-70 h-full rounded-[31px] bg-cover"
            style={{
              backgroundImage: `url(${image1})`,
            }}
          />
        </div>
        <div className="bg-white pt-10 pb-6 flex flex-col justify-between pl-8">
          <span className="text-[rgba(2,2,2,0.7)] text-lg font-medium">
            Общее число клиентов
          </span>
          <span className="text-main text-[56px]">1000+</span>
        </div>
        <div className="bg-white pt-12 text-right">
          <span className="max-w-80 inline-block text-lg text-main">
            Создаём мебель, фасады и интерьерные панели для частных и
            коммерческих пространств.
          </span>
        </div>
        <div className="bg-white" />
        <div className="bg-white">
          <div
            className="w-full h-full rounded-[31px] bg-cover bg-no-repeat bg-center"
            style={{
              backgroundImage: `url(${image1})`,
            }}
          />
        </div>
        <div className="bg-white pt-10 pb-6 flex flex-col justify-between text-right pl-8">
          <span className="text-[rgba(2,2,2,0.7)] text-lg font-medium">
            На рынке
          </span>
          <span className="text-main text-[56px]">20+ лет</span>
        </div>
        <div className="bg-white pt-10 pb-6 flex flex-col justify-between">
          <span className="text-[rgba(2,2,2,0.7)] text-lg font-medium">
            Собственное производство
          </span>
          <span className="text-main text-[22px] font-medium">
            Полный цикл — от идеи до готового изделия
          </span>
        </div>
        <div className="bg-white flex items-center justify-center px-15">
          <span className="text-[rgba(2,2,2,0.7)] text-lg text-center">
            Продумываем пропорции и форму, чтобы мебель выглядела современно и
            уместно в интерьере.
          </span>
        </div>
        <div className="bg-white">
          <div
            className="w-70 h-full ml-auto rounded-[31px] bg-cover"
            style={{
              backgroundImage: `url(${image1})`,
            }}
          />
        </div>
      </div>
    </div>
  );
}
