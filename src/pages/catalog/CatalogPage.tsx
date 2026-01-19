import { Sidebar } from "@/components/Sidebar";
import { useState, useEffect, useCallback } from "react";
import { api, type Product, type SidebarCategory } from "@/lib/api";
import { Loader, Drawer, Pagination } from "@mantine/core";
import { useDisclosure, useMediaQuery } from "@mantine/hooks";
import { IconChevronDown } from "@tabler/icons-react";
import { useSearchParams } from "react-router";
import { Footer } from "@/widgets/Footer";
import { useApplicationForm } from "@/lib/ApplicationFormContext";
import { Button } from "@/components/Button";

export default function CatalogPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedSubCategories, setSelectedSubCategories] = useState<number[]>(
    []
  );
  const [sidebarData, setSidebarData] = useState<SidebarCategory[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [limit, setLimit] = useState(9);
  const isLg = useMediaQuery("(min-width: 1024px)");
  const [drawerOpened, { open: openDrawer, close: closeDrawer }] =
    useDisclosure(false);
  const [searchParams] = useSearchParams();
  const { openForm } = useApplicationForm();

  const handleOpenForm = useCallback(
    (productId: number) => {
      openForm({ productId });
    },
    [openForm]
  );

  useEffect(() => {
    fetchSidebarData();

    // Read subCategoryIds from URL
    const subCategoryIdsParam = searchParams.get("subCategoryIds");
    if (subCategoryIdsParam) {
      const ids = subCategoryIdsParam
        .split(",")
        .map((id) => parseInt(id, 10))
        .filter((id) => !isNaN(id));
      setSelectedSubCategories(ids);
    }
  }, [searchParams]);

  useEffect(() => {
    fetchProducts();
  }, [selectedSubCategories, page, limit]);

  const fetchSidebarData = async () => {
    try {
      const data = await api.getSidebar();
      setSidebarData(data);
    } catch (err) {
      console.error("Failed to load sidebar data:", err);
    }
  };

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await api.getProducts(
        page,
        limit,
        selectedSubCategories.length > 0 ? selectedSubCategories : undefined
      );
      setProducts(response.data);
      setTotalPages(response.pagination.totalPages);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load products");
    } finally {
      setLoading(false);
    }
  };

  const handleSubCategoryChange = (subCategoryIds: number[]) => {
    setSelectedSubCategories(subCategoryIds);
    setPage(1); // Reset to first page when filters change
  };

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const getSelectedSubCategoryNames = () => {
    const names: string[] = [];
    sidebarData.forEach((category) => {
      category.subCategories.forEach((subCategory) => {
        if (selectedSubCategories.includes(subCategory.id)) {
          names.push(subCategory.name);
        }
      });
    });
    return names;
  };

  const getHeaderTitle = () => {
    const selectedNames = getSelectedSubCategoryNames();

    if (selectedNames.length === 0) {
      return "Каталог";
    } else if (selectedNames.length === 1) {
      return selectedNames[0]?.toUpperCase() ?? "Каталог";
    } else {
      return `${selectedNames[0]?.toUpperCase() ?? "Каталог"} и др.`;
    }
  };

  return (
    <div className="w-full">
      <div className="max-w-360 mx-auto px-4 lg:px-15">
        {/* Mobile Header */}
        <div className="lg:hidden mb-6">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-2xl font-bold">{getHeaderTitle()}</h1>
          </div>
          <div className="flex gap-2 justify-center items-center">
            <Button color="#222222" variant="outline" onClick={openDrawer} className="flex-1 rounded-full" fullWidth={false}>
              Вариация фильтров
            </Button>

            {selectedSubCategories.length > 0 && (
              <div>
                <button
                  onClick={() => handleSubCategoryChange([])}
                  className="text-[#B89671] text-sm underline"
                >
                  Очистить фильтры
                </button>
              </div>
            )}
          </div>
        </div>

        <div className="flex gap-8">
          {/* Desktop Sidebar */}
          <div className="hidden lg:block w-74.25 shrink-0">
            <Sidebar
              selectedSubCategories={selectedSubCategories}
              onSubCategoryChange={handleSubCategoryChange}
            />
          </div>

          {/* Products Grid */}
          <div className="flex-1 pb-10">
            {/* Desktop Header Section */}
            <div className="hidden lg:flex items-center justify-between mb-8">
              <h1 className="text-4xl font-bold">{getHeaderTitle()}</h1>
              <div className="flex gap-4 hidden">
                <Button
                  color="#222222"
                  variant="outline"
                  className="rounded-full border-2 border-black"
                >
                  Смотреть все товары
                </Button>
                <Button
                  color="#222222"
                  variant="outline"
                  className="rounded-full border-2 border-black py-2.5 px-7.5"
                  rightSection={<IconChevronDown size={18} />}
                >
                  Вариация фильтров
                </Button>
              </div>
            </div>
            {loading && page === 1 ? (
              <div className="flex justify-center items-center py-20">
                <Loader size="lg" />
              </div>
            ) : error ? (
              <div className="text-red-500 text-center py-20">{error}</div>
            ) : products.length === 0 ? (
              <div className="text-center py-20 text-gray-500">
                Товары не найдены
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
                  {products.map((product) => {
                    // Handle both relative paths (uploads/xxx) and absolute URLs (https://...)
                    const imageUrl = product.image.startsWith("http")
                      ? product.image
                      : `${process.env.API_BASE_URL}/${product.image}`;

                    return (
                      <div className="h-112 w-full relative overflow-hidden group rounded-[30px]">
                        {/* Use img tag instead of background-image for better performance */}
                        <img
                          src={imageUrl}
                          alt={product.name}
                          loading="lazy"
                          className="absolute inset-0 w-full h-full object-cover transition-transform group-hover:scale-110 duration-500"
                        />
                        {/* Simplified blur effect for mobile, full effect for desktop */}
                        {isLg && (
                          <div
                            className="absolute scale-110 inset-0 transition-opacity blur-xl opacity-80"
                            style={{
                              maskImage: `linear-gradient(to top, white 0%, white 35%, transparent 50%)`,
                              WebkitMaskImage: `linear-gradient(to top, black 0%, black 25%, transparent 50%)`,
                              backgroundImage: `url(${product.image})`,
                              backgroundSize: "cover",
                              backgroundPosition: "center",
                            }}
                          />
                        )}
                        <div
                          className={`absolute ${isLg
                            ? "-bottom-16 transition-all group-hover:bottom-0"
                            : "bottom-0"
                            } p-3.75 text-white flex flex-col gap-2 bg-linear-to-t from-black/70 to-transparent`}
                        >
                          <span className="text-[28px] font-medium">{product.name}</span>
                          <span className="text-sm leading-[120%]">
                            {product.description}
                          </span>
                          <Button
                            variant="white"
                            fullWidth
                            className="mt-3"
                            onClick={() => handleOpenForm(product.id)}
                          >
                            <span className="text-main">Отправить заявку</span>
                          </Button>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="flex justify-center mt-12">
                    <Pagination
                      value={page}
                      onChange={handlePageChange}
                      total={totalPages}
                      size="md"
                      color="#222222"
                      withEdges
                    />
                  </div>
                )}
              </>
            )}
          </div>
        </div>

        {/* Mobile Filter Drawer */}
        <Drawer
          opened={drawerOpened}
          onClose={closeDrawer}
          position="bottom"
          size="100%"
          title="Вариация фильтров"
          classNames={{
            title: "text-xl font-bold",
            header: "border-b pb-4",
            body: "pt-4",
            root: "z-99999999 absolute",
            inner: "z-99999999",
          }}
        >
          <div className="pt-4">
            <Sidebar
              selectedSubCategories={selectedSubCategories}
              onSubCategoryChange={(ids) => {
                handleSubCategoryChange(ids);
                closeDrawer();
              }}
            />
          </div>
        </Drawer>
      </div>
      <Footer />
    </div>
  );
}
