import { Outlet } from "react-router";
import { Header } from "./widgets/Header";
import { Footer } from "./widgets/Footer";

export default function MainLayout() {
  return (
    <div className="w-full">
      <Header />
      <main className="w-full font-poppins">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
