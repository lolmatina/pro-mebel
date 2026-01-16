import { MantineProvider } from "@mantine/core";
import "./index.css";
import { BrowserRouter, Route, Routes } from "react-router";
import MainPage from "./pages/MainPage";
import MainLayout from "./MainLayout";
import LoginPage from "./pages/admin/LoginPage";
import AdminLayout from "./pages/admin/AdminLayout";
import DashboardPage from "./pages/admin/DashboardPage";
import CategoriesPage from "./pages/admin/CategoriesPage";
import SubCategoriesPage from "./pages/admin/SubCategoriesPage";
import ProductsPage from "./pages/admin/ProductsPage";
import ReviewsPage from "./pages/admin/ReviewsPage";
import ApplicationsPage from "./pages/admin/ApplicationsPage";
import CatalogPage from "./pages/catalog/CatalogPage";
import { ApplicationFormProvider } from "./lib/ApplicationFormContext";
import { ApplicationForm } from "./widgets/ApplicationForm";
import { TestPage } from "./pages/TestPage";

export function App() {
  return (
    <MantineProvider>
      <BrowserRouter basename={process.env.BASENAME}>
        <ApplicationFormProvider>
          <Routes>
            <Route path="admin/login" element={<LoginPage />} />
            <Route path="admin" element={<AdminLayout />}>
              <Route index element={<DashboardPage />} />
              <Route path="categories" element={<CategoriesPage />} />
              <Route path="subcategories" element={<SubCategoriesPage />} />
              <Route path="products" element={<ProductsPage />} />
              <Route path="reviews" element={<ReviewsPage />} />
              <Route path="applications" element={<ApplicationsPage />} />
            </Route>
            <Route element={<MainLayout />}>
              <Route index element={<MainPage />} />
              <Route path="catalog" element={<CatalogPage />} />
              <Route path="test" element={<TestPage />} />
            </Route>
          </Routes>
          <ApplicationForm />
        </ApplicationFormProvider>
      </BrowserRouter>
    </MantineProvider>
  );
}

export default App;
