import { Button } from "@/components/Button";
import { Carousel } from "@mantine/carousel";
import { useEffect, useState, useMemo, useCallback, memo, useRef } from "react";
import { useMediaQuery, useDisclosure } from "@mantine/hooks";
import { api, type SidebarCategory, type Product } from "@/lib/api";
import { useNavigate } from "react-router";
import { useApplicationForm } from "@/lib/ApplicationFormContext";
import { motion } from "framer-motion";
import { Modal } from "@mantine/core";
import { IconX } from "@tabler/icons-react";

interface CategoryWithProducts extends SidebarCategory {
  products?: Product[];
}

// Custom scrollable tabs component
const ScrollableTabs = memo(
  ({
    items,
    activeIndex,
    onTabClick,
    isLg,
  }: {
    items: Array<{ id: number; name: string }>;
    activeIndex: number | undefined;
    onTabClick: (index: number) => void;
    isLg: boolean;
  }) => {
    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

    const centerTab = useCallback((index: number) => {
      const container = scrollContainerRef.current;
      const tab = tabRefs.current[index];

      if (!container || !tab) return;

      const containerWidth = container.offsetWidth;
      const tabLeft = tab.offsetLeft;
      const tabWidth = tab.offsetWidth;

      // Calculate scroll position to center the tab
      const scrollPosition = tabLeft - containerWidth / 2 + tabWidth / 2;

      container.scrollTo({
        left: scrollPosition,
        behavior: "smooth",
      });
    }, []);

    useEffect(() => {
      if (typeof activeIndex !== "undefined") {
        centerTab(activeIndex);
      }
    }, [activeIndex, centerTab]);

    return (
      <div
        ref={scrollContainerRef}
        className="overflow-x-auto overflow-y-hidden scrollbar-hide"
        style={{
          scrollbarWidth: "none",
          msOverflowStyle: "none",
        }}
      >
        <div
          className="flex gap-2.5 min-w-min"
          style={{ paddingLeft: isLg ? "60px" : "16px", paddingRight: "16px" }}
        >
          {items.map((item, idx) => (
            <Button
              key={item.id}
              //@ts-ignore
              ref={(el) => {
                tabRefs.current[idx] = el;
              }}
              className="transition-all whitespace-nowrap"
              variant={idx === activeIndex ? "filled" : "outline"}
              onClick={() => onTabClick(idx)}
            >
              {item.name}
            </Button>
          ))}
        </div>
      </div>
    );
  }
);

ScrollableTabs.displayName = "ScrollableTabs";

// Memoized product card component
const ProductCard = memo(
  ({
    product,
    isLg,
    onProductClick,
  }: {
    product: Product;
    isLg: boolean;
    onProductClick: (product: Product) => void;
  }) => {
    const productImage = useMemo(() => {
      return product.image.startsWith("http")
        ? product.image
        : `${process.env.API_BASE_URL}/${product.image}`;
    }, [product.image]);

    return (
      <Carousel.Slide key={product.id}>
        <div
          className="h-112 w-full relative overflow-hidden group rounded-[30px] cursor-pointer"
          onClick={() => onProductClick(product)}
        >
          {/* Use img tag instead of background-image for better performance */}
          <img
            src={productImage}
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
                backgroundImage: `url(${productImage})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            />
          )}
          <div
            className={`absolute ${isLg
              && "bottom-0 transition-all group-hover:bottom-0"
              } p-3.75 text-white flex flex-col gap-2 bg-linear-to-t from-black/70 to-transparent pointer-events-none`}
          >
            <span className="text-[28px] font-medium leading-7">{product.name}</span>
            <span className="text-sm leading-[120%]">
              {product.description}
            </span>
          </div>
        </div>
      </Carousel.Slide>
    );
  }
);

ProductCard.displayName = "ProductCard";

export function MainProjects() {
  const { openForm } = useApplicationForm();
  const [active, setActive] = useState<number>();
  const [activeSub, setActiveSub] = useState<number>();
  const isLg = useMediaQuery("(min-width: 1024px)");
  const [categories, setCategories] = useState<CategoryWithProducts[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [productsLoading, setProductsLoading] = useState(false);
  const navigate = useNavigate();
  const [modalOpened, { open: openModal, close: closeModal }] =
    useDisclosure(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      // Fetch categories with subcategories
      const categoriesData = await api.getSidebar();

      setCategories(categoriesData);

      if (categoriesData.length > 0) {
        setActive(0);
        setActiveSub(0);
      }
    } catch (err) {
      console.error("Failed to load data:", err);
    }
  };

  const handleChangeCategory = useCallback(
    (idx: number) => {
      if (idx < 0 || idx >= categories.length) return;
      setActive(idx);
      const category = categories[idx];

      if (category && category.subCategories.length > 0) setActiveSub(0);
    },
    [categories]
  );

  // Memoize filtered products to avoid recalculation on every render
  const currentSubCategoryId = useMemo(() => {
    if (typeof active === "undefined" || typeof activeSub === "undefined")
      return null;
    return categories[active]?.subCategories?.[activeSub]?.id;
  }, [active, activeSub, categories]);

  useEffect(() => {
    if (!currentSubCategoryId) {
      setProducts([]);
      return;
    }

    let cancelled = false;

    (async () => {
      try {
        setProductsLoading(true);
        const response = await api.getProducts(1, 12, [currentSubCategoryId]);
        if (!cancelled) setProducts(response.data);
      } catch (err) {
        if (!cancelled) {
          console.error("Failed to load products:", err);
          setProducts([]);
        }
      } finally {
        if (!cancelled) setProductsLoading(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [currentSubCategoryId]);

  const handleOpenForm = useCallback(
    (productId: number) => {
      openForm({ productId });
      closeModal();
    },
    [openForm, closeModal]
  );

  const handleProductClick = useCallback(
    (product: Product) => {
      setSelectedProduct(product);
      openModal();
    },
    [openModal]
  );

  const handleNavigateToCatalog = useCallback(() => {
    navigate("/catalog");
  }, [navigate]);

  const handleSubCategoryChange = useCallback((idx: number) => {
    setActiveSub(idx);
  }, []);

  const currentSubCategories = useMemo(() => {
    if (typeof active === "undefined") return [];
    return categories[active]?.subCategories || [];
  }, [active, categories]);

  return (
    <div className="max-w-360 mx-auto py-10" id="projects">
      <motion.h2
        className="text-[40px] leading-[120%] px-4 font-medium text-main text-center lg:hidden"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        Несколько наших работ
      </motion.h2>

      {/* Categories Tabs */}
      <motion.div
        className="mt-4 lg:mt-0"
        initial={{ opacity: 0, x: -30 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        <ScrollableTabs
          items={categories}
          activeIndex={active}
          onTabClick={handleChangeCategory}
          isLg={isLg}
        />
      </motion.div>

      <motion.div
        className="lg:hidden px-4 text-lg opacity-80 text-main font-medium text-center mt-4"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 0.8 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.5 }}
      >
        Фрагменты реализованных интерьеров и мебельных решений для кафе, офисов и жилых пространств.
      </motion.div>

      {/* Subcategories tabs */}
      {currentSubCategories.length > 0 && (
        <div className="mt-7.5">
          <ScrollableTabs
            items={currentSubCategories}
            activeIndex={activeSub}
            onTabClick={handleSubCategoryChange}
            isLg={isLg}
          />
        </div>
      )}
      <div className="mt-7.5 h-auto flex gap-14 lg:h-112 px-4 lg:px-15 w-full">
        <motion.div
          className="min-w-76 max-w-76 h-full hidden lg:flex flex-col justify-between"
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <div>
            <h2 className="text-[40px] text-main font-medium leading-[120%]">
              Несколько наших работ
            </h2>
            <p className="text-lg font-medium text-main leading-[120%] mt-6">
              Фрагменты реализованных интерьеров и мебельных решений для кафе, офисов и жилых пространств.
            </p>
          </div>
          <div>
            <Button onClick={handleNavigateToCatalog}>
              Перейти в полный раздел
            </Button>
          </div>
        </motion.div>
        <motion.div
          className="h-full w-full lg:overflow-hidden"
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <Carousel
            styles={{
              indicators: {
                bottom: -20,
              },
            }}
            slideSize={343}
            slideGap={24}
            withControls={isLg && products.length > 3}
            withIndicators={!isLg}
            emblaOptions={{
              dragFree: false,
              loop: false,
            }}
          >
            {products.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                isLg={isLg}
                onProductClick={handleProductClick}
              />
            ))}
          </Carousel>
        </motion.div>
      </div>

      <div className="text-center mt-11 flex flex-col px-4 lg:hidden items-center gap-4">
        <p className="text-lg opacity-80 font-medium ">Свайпните в сторону</p>
        <Button onClick={handleNavigateToCatalog}>
          Перейти в полный раздел
        </Button>
      </div>

      {/* Image Modal */}
      <Modal
        opened={modalOpened}
        onClose={closeModal}
        size="xl"
        centered
        padding={0}
        withCloseButton={false}
        classNames={{
          content: "!bg-transparent !shadow-none !max-w-[90vw]",
          body: "!p-0",
          inner: "!z-[9999]",
          overlay: "!z-[9998]",
        }}
      >
        {selectedProduct && (
          <div className="relative w-full">
            {/* Close Button */}
            <button
              onClick={closeModal}
              className="absolute -top-12 right-0 z-50 text-white hover:text-gray-300 transition-colors"
              aria-label="Close"
            >
              <IconX size={32} stroke={2} />
            </button>

            {/* Image Container */}
            <div className="relative rounded-[30px] overflow-hidden bg-black shadow-2xl w-full">
              <img
                src={
                  selectedProduct.image.startsWith("http")
                    ? selectedProduct.image
                    : `${process.env.API_BASE_URL}/${selectedProduct.image}`
                }
                alt={selectedProduct.name}
                className="w-full h-auto max-h-[85vh] object-cover"
              />

              {/* Product Info Overlay */}
              <div className="absolute bottom-0 left-0 right-0 p-4 lg:p-6 bg-gradient-to-t from-black/90 via-black/70 to-transparent">
                <h3 className="text-white text-xl lg:text-3xl font-medium mb-2">
                  {selectedProduct.name}
                </h3>
                <p className="text-white/90 text-xs lg:text-base mb-3 lg:mb-4 leading-[120%]">
                  {selectedProduct.description}
                </p>
                <Button
                  variant="white"
                  fullWidth
                  onClick={() => handleOpenForm(selectedProduct.id)}
                >
                  <span className="text-main">Отправить заявку</span>
                </Button>
              </div>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
