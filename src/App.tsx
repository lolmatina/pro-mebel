import { MantineProvider } from "@mantine/core";
import "./index.css";
import { BrowserRouter, Route, Routes } from "react-router";
import MainPage from "./pages/MainPage";
import MainLayout from "./MainLayout";
export function App() {
  return (
    <MantineProvider>
      <BrowserRouter>
        <Routes>
          <Route path="admin"></Route>
          <Route element={<MainLayout />}>
            <Route index element={<MainPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </MantineProvider>
  );
}

export default App;
