import { Logo } from "@/components/Logo";
import { Link } from "react-router";

export function Footer() {
  return (
    <div className="bg-main text-white">
      <div className="max-w-360 mx-auto px-4 lg:px-15 pt-15 pb-22.5">
        <div className="shrink-0">
          <Link to="/">
            <Logo color="white" />
          </Link>
          <div className="lg:text-sm opacity-50 leading-5.5 flex flex-col mt-2.5">
            <span>Что-то о нас и прочее</span>
            <span>Немного информации итд</span>
          </div>
          <div className="lg:mt-6.25 flex gap-2.5">
            <label htmlFor="message" className="hidden"></label>
            <input
              type="text"
              id="message"
              name="message"
              placeholder="Напишите нам"
              className="bg-transparent px-6 py-3 text-[13px] leading-5.25 placeholder:opacity-50 lg:w-62.5 outline-0 text-white border border-[rgba(255,255,255,0.5)] rounded-full"
            />
            <button className="bg-white px-6 py-3 text-[13px] leading-5.25 rounded-full font-semibold! text-main outline-0 transition-all active:scale-95 border-none">
              Отправить
            </button>
          </div>
        </div>
        <div className="shrink-0"></div>
      </div>
    </div>
  );
}
