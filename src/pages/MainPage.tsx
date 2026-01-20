import { Footer } from "@/widgets/Footer";
import { MainAbout } from "@/widgets/main/About";
import { Constructor } from "@/widgets/main/Constructor";
import { MainFAQ } from "@/widgets/main/FAQ";
import { Hero } from "@/widgets/main/Hero";
import { MainPartnership } from "@/widgets/main/Partnership";
import { MainProducts } from "@/widgets/main/Products";
import { MainProjects } from "@/widgets/main/Projects";
import { MainReviews } from "@/widgets/main/Reviews";
import { useFeatureFlag } from "@/lib/FeatureFlagContext";
import { useMediaQuery } from "@mantine/hooks";
import { Seo } from "@/components/Seo";

export default function MainPage() {
  const { constructorEnabled } = useFeatureFlag();
  const isDesktop = useMediaQuery("(min-width: 1024px)");

  return (
    <div className="w-full overflow-x-hidden">
      <Seo
        title="PRO MEBEL — мебель на заказ в Уральске"
        description="Подбор, проектирование, производство и установка мебели. Рассчитаем стоимость и поможем выбрать решение под интерьер."
        canonicalPath="/"
      />
      <Hero />
      {constructorEnabled && isDesktop && <Constructor />}
      <MainAbout />
      <MainProjects />
      <MainPartnership />
      <MainReviews />
      <MainProducts />
      <MainFAQ />
      <Footer />
    </div>
  );
}
