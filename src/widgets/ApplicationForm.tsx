import { Checkbox, Drawer, Loader } from "@mantine/core";
import { useFormik } from "formik";
import image from "@/assets/Img.jpg";
import { useApplicationForm } from "@/lib/ApplicationFormContext";
import { useState } from "react";
import { useNavigate } from "react-router";
import { IconX } from "@tabler/icons-react";

export function ApplicationForm() {
  const { opened, productId, closeForm, description } = useApplicationForm();
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const navigate = useNavigate();

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      email: "",
      fullName: "",
      city: "",
      description: description,
      readyToOrder: false,
      productId: productId,
    },
    onSubmit: () => {
      setLoading(true);
      fetch(`${process.env.API_BASE_URL}/applications`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formik.values),
      })
        .then((res) => {
          if (res.ok) {
            setSent(true);
            setLoading(false);
          } else {
            // Log error for debugging
            res.json().then((data) => console.error("Error:", data));
            setLoading(false);
          }
        })
        .catch((err) => {
          console.error("Fetch error:", err);
          setSent(false);
          setLoading(false);
        });
    },
  });

  return (
    <Drawer
      size="100%"
      opened={opened}
      onClose={closeForm}
      withCloseButton={false}
      styles={{
        body: {
          height: "100%",
          padding: "0",
        },
      }}
      classNames={{
        root: "z-99999999 absolute",
        inner: "z-99999999",
      }}
    >
      <div className="w-screen lg:h-screen flex justify-evenly flex-col-reverse lg:flex-row relative">
        <span className="absolute right-0 top-0 p-3" onClick={closeForm}>
          <IconX size={40} />
        </span>
        {!sent ? (
          <div className="w-full h-full flex justify-center items-center">
            <div className="flex flex-col w-full py-10 px-8 lg:py-0 lg:px-0 lg:w-97.75 gap-8">
              <h2 className="text-[30px] lg:text-[40px] font-medium leading-[120%] text-main">
                Оставьте заявку
              </h2>
              <input
                type="text"
                {...formik.getFieldProps("email")}
                className="p-0 pb-5.25 border-b border-[#EEE6DB] focus:border-main transition-all outline-none border-0 text-main placeholder:text-main text-base placeholder:text-base"
                placeholder="Email"
              />
              <input
                type="text"
                {...formik.getFieldProps("fullName")}
                className="p-0 pb-5.25 border-b border-[#EEE6DB] focus:border-main transition-all outline-none border-0 text-main placeholder:text-main text-base placeholder:text-base"
                placeholder="Имя Фамилия"
              />
              <input
                type="text"
                {...formik.getFieldProps("city")}
                className="p-0 pb-5.25 border-b border-[#EEE6DB] focus:border-main transition-all outline-none border-0 text-main placeholder:text-main text-base placeholder:text-base"
                placeholder="Город"
              />
              <input
                type="text"
                {...formik.getFieldProps("description")}
                className="p-0 pb-5.25 border-b border-[#EEE6DB] focus:border-main transition-all outline-none border-0 text-main placeholder:text-main text-base placeholder:text-base"
                placeholder="Описание и пожелания"
              />
              <Checkbox
                color="#222222"
                styles={{ input: { borderColor: "#222", borderWidth: 1.5 } }}
                label="Готов оформить заказ"
                name="readyToOrder"
                id="readyToOrder"
                checked={formik.values.readyToOrder}
                onChange={(e) =>
                  formik.setFieldValue("readyToOrder", e.target.checked)
                }
              />
              <button
                disabled={loading}
                onClick={() => formik.handleSubmit()}
                className="bg-main px-6 py-3 text-[13px] leading-5.25 rounded-full font-semibold! text-white outline-0 transition-all active:scale-95 border-none"
              >
                {loading ? <Loader size="sm" color="#FFFFFF" /> : "Отправить"}
              </button>
            </div>
          </div>
        ) : (
          <div className="w-full h-full flex justify-center items-center">
            <div className="flex flex-col w-97.75 gap-8">
              <h2 className="text-[40px] font-medium leading-[120%] text-main">
                Заявка была отправлена!
              </h2>
              <p>Менеджер свяжется с вами в ближайшее время!</p>
              <button
                onClick={() => {
                  setSent(false);
                  closeForm();
                  navigate("/");
                }}
                className="bg-main px-6 py-3 text-[13px] leading-5.25 rounded-full font-semibold! text-white outline-0 transition-all active:scale-95 border-none"
              >
                На главную
              </button>
            </div>
          </div>
        )}
        <div
          className="w-full aspect-375/305 lg:aspect-auto bg-cover bg-center"
          style={{
            backgroundImage: `url(${image})`,
          }}
        />
      </div>
    </Drawer>
  );
}
