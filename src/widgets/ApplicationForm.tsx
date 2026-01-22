import { Checkbox, Loader } from "@mantine/core";
import { useFormik } from "formik";
import image from "@/assets/Img.jpg";
import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router";
import { IconArrowLeft } from "@tabler/icons-react";

export function ApplicationForm() {
  const [searchParams] = useSearchParams();
  const productIdParam = searchParams.get('productId');
  const descriptionParam = searchParams.get('description');
  const productId = productIdParam ? parseInt(productIdParam, 10) : undefined;
  const description = descriptionParam || "";

  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const navigate = useNavigate();

  const formatPhoneNumber = (value: string) => {
    // Remove all non-numeric characters except +
    const cleaned = value.replace(/[^\d+]/g, '');

    // If empty, return +7
    if (!cleaned || cleaned === '+') {
      return '+7';
    }

    // Always ensure it starts with +7
    let numbers = cleaned.replace(/\+/g, '');
    if (numbers.startsWith('7')) {
      numbers = numbers.substring(1);
    } else if (numbers.startsWith('8')) {
      numbers = numbers.substring(1);
    }

    // Limit to 10 digits after +7
    numbers = numbers.substring(0, 10);

    // Format: +7 (XXX) XXX-XX-XX
    let formatted = '+7';
    if (numbers.length > 0) {
      formatted += ' (' + numbers.substring(0, 3);
      if (numbers.length > 3) {
        formatted += ') ' + numbers.substring(3, 6);
        if (numbers.length > 6) {
          formatted += '-' + numbers.substring(6, 8);
          if (numbers.length > 8) {
            formatted += '-' + numbers.substring(8, 10);
          }
        }
      }
    }

    return formatted;
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatPhoneNumber(e.target.value);
    formik.setFieldValue('phone', formatted);
  };

  const handlePhoneFocus = () => {
    if (!formik.values.phone || formik.values.phone === '') {
      formik.setFieldValue('phone', '+7');
    }
  };

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      email: "",
      fullName: "",
      phone: "",
      city: "",
      description: description,
      readyToOrder: false,
      productId: productId,
    },
    validate: (values) => {
      const errors: any = {};

      // Phone validation - required and must have 10 digits after +7
      if (!values.phone || values.phone === '') {
        errors.phone = 'Телефон обязателен';
      } else {
        const phoneDigits = values.phone.replace(/\D/g, '');
        if (phoneDigits.length < 11) {
          errors.phone = 'Введите корректный номер телефона';
        }
      }

      return errors;
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
    <div className="w-screen lg:h-screen flex justify-evenly flex-col-reverse lg:flex-row overflow-hidden">
      {!sent ? (
        <div className="w-full h-full flex justify-center items-center">
          <div className="flex flex-col w-full py-10 px-8 lg:py-0 lg:px-0 lg:w-97.75 gap-8">
            <div className="flex items-center gap-4">
              <button
                onClick={() => navigate(-1)}
                className="flex items-center justify-center w-10 h-10 rounded-full hover:bg-gray-100 transition-colors"
                aria-label="Назад"
              >
                <IconArrowLeft size={24} className="text-main" />
              </button>
              <h2 className="text-[30px] lg:text-[40px] font-medium leading-[120%] text-main">
                Оставьте заявку
              </h2>
            </div>
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
            <div>
              <input
                type="tel"
                name="phone"
                value={formik.values.phone}
                onChange={handlePhoneChange}
                onFocus={handlePhoneFocus}
                onBlur={formik.handleBlur}
                className="p-0 pb-5.25 border-b border-[#EEE6DB] focus:border-main transition-all outline-none border-0 text-main placeholder:text-main text-base placeholder:text-base w-full"
                placeholder="Телефон"
              />
              {formik.touched.phone && formik.errors.phone && (
                <div className="text-red-500 text-sm mt-1">{formik.errors.phone}</div>
              )}
            </div>
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
  );
}
