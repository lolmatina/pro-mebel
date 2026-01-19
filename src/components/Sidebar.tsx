import { TextInput, Checkbox, Accordion, Loader } from "@mantine/core";
import { IconSearch } from "@tabler/icons-react";
import { useEffect, useState } from "react";
import { api, type SidebarCategory } from "../lib/api";
import clsx from "clsx";

interface SidebarProps {
  selectedSubCategories?: number[];
  onSubCategoryChange?: (subCategoryIds: number[]) => void;
}

export function Sidebar({
  selectedSubCategories = [],
  onSubCategoryChange,
}: SidebarProps) {
  const [categories, setCategories] = useState<SidebarCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [opened, setOpened] = useState<string[]>([]);

  useEffect(() => {
    fetchSidebar();
  }, []);

  const fetchSidebar = async () => {
    try {
      setLoading(true);
      const data = await api.getSidebar();
      setCategories(data);
      setError(null);
      setOpened(data.map((val) => val.id.toString()));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load sidebar");
    } finally {
      setLoading(false);
    }
  };

  const handleSubCategoryToggle = (subCategoryId: number) => {
    if (!onSubCategoryChange) return;

    const newSelected = selectedSubCategories.includes(subCategoryId)
      ? selectedSubCategories.filter((id) => id !== subCategoryId)
      : [subCategoryId];

    onSubCategoryChange(newSelected);
  };

  const handleClearFilters = () => {
    if (onSubCategoryChange) {
      onSubCategoryChange([]);
    }
  };

  if (loading) {
    return (
      <div className="max-w-74.25 flex justify-center py-8">
        <Loader size="sm" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-74.25">
        <div className="text-red-500">{error}</div>
      </div>
    );
  }

  return (
    <div className="w-full lg:max-w-74.25">
      <div className="w-full">
        {selectedSubCategories.length > 0 && (
          <div
            className="text-[#B89671] text-lg font-medium mt-8.75 cursor-pointer hover:underline"
            onClick={handleClearFilters}
          >
            Очистить фильтры
          </div>
        )}

        <Accordion
          multiple
          className="mt-4"
          value={opened}
          onChange={(val) => setOpened(val)}
        >
          {categories.map((category) => (
            <Accordion.Item key={category.id} value={category.id.toString()}>
              <Accordion.Control>
                <span className="text-lg font-bold leading-[120%] text-main">
                  {category.name}
                </span>
              </Accordion.Control>
              <Accordion.Panel>
                {category.subCategories.map((subCategory) => (
                  <span
                    key={subCategory.id}
                    onClick={() => handleSubCategoryToggle(subCategory.id)}
                    className={clsx("mb-6 text-main text-base font-normal block cursor-pointer hover:underline px-3.75 py-1.5", selectedSubCategories.includes(subCategory.id) && "bg-[#E7E2DE] rounded-[15px]")}
                  >
                    {subCategory.name} ({subCategory.productCount})
                  </span>
                ))}
              </Accordion.Panel>
            </Accordion.Item>
          ))}
        </Accordion>
      </div>
    </div>
  );
}
