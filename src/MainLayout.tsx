import { Outlet } from "react-router";
import { Header } from "./components/Header";

export default function MainLayout() {
  return (
    <div className="w-full">
      <Header />
      <main className="w-full h-[200vh]">
        <Outlet />
      </main>
    </div>
  );
}
