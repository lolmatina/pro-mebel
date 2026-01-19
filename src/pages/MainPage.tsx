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

export default function MainPage() {
  const { constructorEnabled } = useFeatureFlag();

  return (
    <div className="w-full">
      <Hero />
      {constructorEnabled && <Constructor />}
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
