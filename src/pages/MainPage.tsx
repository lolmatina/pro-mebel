import { MainAbout } from "@/widgets/main/About";
import { MainFAQ } from "@/widgets/main/FAQ";
import { Hero } from "@/widgets/main/Hero";
import { MainPartnership } from "@/widgets/main/Partnership";
import { MainProducts } from "@/widgets/main/Products";
import { MainProjects } from "@/widgets/main/Projects";
import { MainReviews } from "@/widgets/main/Reviews";

export default function MainPage() {
  return (
    <div className="w-full">
      <Hero />
      <MainAbout />
      <MainProjects />
      <MainPartnership />
      <MainReviews />
      <MainProducts />
      <MainFAQ />
    </div>
  );
}
