import { Logo } from "@/components/Logo";
import { useApplicationForm } from "@/lib/ApplicationFormContext";
import { useState } from "react";
import { Link } from "react-router";

export function Footer() {
  const { openForm } = useApplicationForm();
  const [description, setDescription] = useState("");

  return (
    <div className="bg-main text-white" id="footer">
      <div className="max-w-360 mx-auto px-4 pt-10 lg:px-15 lg:pt-15 gap-10 lg-gap-0 pb-22.5 flex justify-between flex-col lg:flex-row">
        <div className="shrink-0">
          <Link to="/">
            <Logo color="white" />
          </Link>
          <div className="lg:text-sm opacity-50 leading-5.5 flex flex-col mt-2.5">
            <span>Что-то о нас и прочее</span>
            <span>Немного информации итд</span>
          </div>
          <div className="mt-10 lg:mt-6.25 flex gap-2.5 flex-col lg:flex-row">
            <label htmlFor="message" className="hidden"></label>
            <input
              type="text"
              id="message"
              name="message"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Напишите нам"
              className="bg-transparent px-6 py-3 text-[13px] leading-5.25 placeholder:opacity-50 lg:w-62.5 outline-0 text-white border border-[rgba(255,255,255,0.5)] rounded-full"
            />
            <button
              onClick={() => openForm({ description })}
              className="bg-white px-6 py-3 text-[13px] leading-5.25 rounded-full font-semibold! text-main outline-0 transition-all active:scale-95 border-none"
            >
              Отправить
            </button>
          </div>
        </div>
        <div className="shrink-0">
          <div className="grid grid-cols-2 lg:flex justify-between gap-5 lg:gap-25 text-white">
            <div className="text-sm leading-[120%]">
              <span>Для Клиентов</span>
              <ul className="opacity-50 block space-y-2.5 mt-3.75">
                <li className="block">
                  <Link to="" className="no-underline text-white">
                    Lorem Ipsum 
                  </Link>
                </li>
                <li className="block">
                  <Link to="" className="no-underline text-white">
                    Lorem Ipsum 
                  </Link>
                </li>
                <li className="block">
                  <Link to="" className="no-underline text-white">
                    Lorem Ipsum 
                  </Link>
                </li>
                <li className="block">
                  <Link to="" className="no-underline text-white">
                    Lorem Ipsum 
                  </Link>
                </li>
              </ul>
            </div>
            <div className="text-sm leading-[120%]">
              <span>Для Клиентов</span>
              <ul className="opacity-50 block space-y-2.5 mt-3.75">
                <li className="block">
                  <Link to="" className="no-underline text-white">
                    Lorem Ipsum 
                  </Link>
                </li>
                <li className="block">
                  <Link to="" className="no-underline text-white">
                    Lorem Ipsum 
                  </Link>
                </li>
                <li className="block">
                  <Link to="" className="no-underline text-white">
                    Lorem Ipsum 
                  </Link>
                </li>
                <li className="block">
                  <Link to="" className="no-underline text-white">
                    Lorem Ipsum 
                  </Link>
                </li>
              </ul>
            </div>
            <div className="text-sm leading-[120%]">
              <span>Для Клиентов</span>
              <ul className="opacity-50 block space-y-2.5 mt-3.75">
                <li className="block">
                  <Link to="" className="no-underline text-white">
                    Lorem Ipsum 
                  </Link>
                </li>
                <li className="block">
                  <Link to="" className="no-underline text-white">
                    Lorem Ipsum 
                  </Link>
                </li>
                <li className="block">
                  <Link to="" className="no-underline text-white">
                    Lorem Ipsum 
                  </Link>
                </li>
                <li className="block">
                  <Link to="" className="no-underline text-white">
                    Lorem Ipsum 
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
