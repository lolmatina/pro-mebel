import { Outlet } from "react-router";
import { Header } from "./widgets/Header";

export default function MainLayout() {
  return (
    <div className="w-full">
      <Header />
      <main className="w-full font-poppins">
        <Outlet />
      </main>
    </div>
  );
}
