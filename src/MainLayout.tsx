import { Outlet } from "react-router";
import { Header } from "./widgets/Header";
import { FeatureFlagProvider } from "./lib/FeatureFlagContext";

export default function MainLayout() {
  return (
    <FeatureFlagProvider>
      <div className="flex flex-col h-dvh w-full">
        {/* Header stays visible */}
        <Header />

        {/* Scrollable content */}
        <main className="flex-1 overflow-y-auto w-full font-poppins">
          <Outlet />
        </main>
      </div>
    </FeatureFlagProvider>
  );
}
