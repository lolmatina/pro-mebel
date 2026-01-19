import { api, type Product, type SubCategory } from '@/lib/api';
import {
  ActionIcon,
  Button,
  FileInput,
  Group,
  Image,
  Modal,
  MultiSelect,
  Pagination,
  Select,
  Table,
  Textarea,
  TextInput,
  Title,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconEdit, IconPlus, IconTrash, IconUpload } from '@tabler/icons-react';
import { useEffect, useState } from 'react';

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [subCategories, setSubCategories] = useState<SubCategory[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [opened, { open, close }] = useDisclosure(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [filterSubCategoryIds, setFilterSubCategoryIds] = useState<string[]>([]);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    subCategoryId: '',
  });
  const [imageFile, setImageFile] = useState<File | null>(null);

  const loadProducts = async () => {
    setLoading(true);
    try {
      const response = await api.getProducts(
        page,
        10,
        filterSubCategoryIds.length ? filterSubCategoryIds.map(Number) : undefined,
      );
      setProducts(response.data);
      setTotalPages(response.pagination.totalPages);
    } catch (error) {
      console.error('Не удалось загрузить продукты:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadSubCategories = async () => {
    try {
      const response = await api.getSubCategories(1, 100);
      setSubCategories(response.data);
    } catch (error) {
      console.error('Не удалось загрузить подкатегории:', error);
    }
  };

  useEffect(() => {
    loadProducts();
    loadSubCategories();
  }, [page, filterSubCategoryIds]);

  const handleFilterChange = (values: string[]) => {
    setPage(1);
    setFilterSubCategoryIds(values);
  };

  const handleCreate = () => {
    setEditingProduct(null);
    setFormData({
      name: '',
      description: '',
      subCategoryId: '',
    });
    setImageFile(null);
    open();
  };

  const handleEdit = (product: Product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      description: product.description,
      subCategoryId: product.subCategoryId.toString(),
    });
    setImageFile(null);
    open();
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Вы уверены, что хотите удалить этот продукт?')) return;

    try {
      await api.deleteProduct(id);
      loadProducts();
    } catch (error) {
      alert('Не удалось удалить продукт');
    }
  };

  const handleSubmit = async () => {
    if (!formData.name.trim() || !formData.description.trim() || !formData.subCategoryId) {
      alert('Пожалуйста, заполните все поля');
      return;
    }

    if (!editingProduct && !imageFile) {
      alert('Пожалуйста, выберите файл изображения');
      return;
    }

    try {
      const formDataToSend = new FormData();
      formDataToSend.append('name', formData.name);
      formDataToSend.append('description', formData.description);
      formDataToSend.append('subCategoryId', formData.subCategoryId);

      if (imageFile) {
        formDataToSend.append('image', imageFile);
      }

      if (editingProduct) {
        await api.updateProductWithFile(editingProduct.id, formDataToSend);
      } else {
        await api.createProductWithFile(formDataToSend);
      }
      close();
      loadProducts();
    } catch (error) {
      alert('Не удалось сохранить продукт: ' + (error instanceof Error ? error.message : 'Неизвестная ошибка'));
    }
  };

  const getSubCategoryName = (id: number) => {
    return subCategories.find((sc) => sc.id === id)?.name || 'Неизвестно';
  };

  return (
    <div>
      <Group justify="space-between" mb="xl">
        <Title order={2}>Продукты</Title>
        <Button leftSection={<IconPlus size={16} />} onClick={handleCreate}>
          Добавить продукт
        </Button>
      </Group>

      <Group mb="md">
        <MultiSelect
          label="Фильтр по подкатегориям"
          placeholder="Выберите подкатегорию"
          data={subCategories.map((sc) => ({ value: sc.id.toString(), label: sc.name }))}
          value={filterSubCategoryIds}
          onChange={handleFilterChange}
          clearable
          searchable
          nothingFoundMessage="Нет подкатегорий"
        />
      </Group>

      <Table striped highlightOnHover>
        <Table.Thead>
          <Table.Tr>
            <Table.Th>ID</Table.Th>
            <Table.Th>Изображение</Table.Th>
            <Table.Th>Название</Table.Th>
            <Table.Th>Описание</Table.Th>
            <Table.Th>Подкатегория</Table.Th>
            <Table.Th style={{ width: 120 }}>Действия</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {loading ? (
            <Table.Tr>
              <Table.Td colSpan={6} style={{ textAlign: 'center' }}>
                Загрузка...
              </Table.Td>
            </Table.Tr>
          ) : products.length === 0 ? (
            <Table.Tr>
              <Table.Td colSpan={6} style={{ textAlign: 'center' }}>
                Продукты не найдены
              </Table.Td>
            </Table.Tr>
          ) : (
            products.map((product) => (
              <Table.Tr key={product.id}>
                <Table.Td>{product.id}</Table.Td>
                <Table.Td>
                  <Image
                    src={`${process.env.API_BASE_URL}/${product.image}`}
                    alt={product.name}
                    w={50}
                    h={50}
                    fit="cover"
                    radius="sm"
                  />
                </Table.Td>
                <Table.Td>{product.name}</Table.Td>
                <Table.Td style={{ maxWidth: 300 }}>
                  {product.description.length > 100
                    ? product.description.substring(0, 100) + '...'
                    : product.description}
                </Table.Td>
                <Table.Td>{getSubCategoryName(product.subCategoryId)}</Table.Td>
                <Table.Td>
                  <Group gap="xs">
                    <ActionIcon
                      variant="light"
                      color="blue"
                      onClick={() => handleEdit(product)}
                    >
                      <IconEdit size={16} />
                    </ActionIcon>
                    <ActionIcon
                      variant="light"
                      color="red"
                      onClick={() => handleDelete(product.id)}
                    >
                      <IconTrash size={16} />
                    </ActionIcon>
                  </Group>
                </Table.Td>
              </Table.Tr>
            ))
          )}
        </Table.Tbody>
      </Table>

      {totalPages > 1 && (
        <Group justify="center" mt="xl">
          <Pagination value={page} onChange={setPage} total={totalPages} />
        </Group>
      )}

      <Modal
        opened={opened}
        onClose={close}
        title={editingProduct ? 'Редактировать продукт' : 'Создать продукт'}
        size="lg"
      >
        <TextInput
          label="Название"
          placeholder="Название продукта"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          mb="md"
          required
        />
        <Textarea
          label="Описание"
          placeholder="Описание продукта"
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          mb="md"
          minRows={3}
          required
        />
        <FileInput
          label="Изображение продукта"
          placeholder="Выбрать файл изображения"
          accept="image/*"
          value={imageFile}
          onChange={setImageFile}
          mb="md"
          required={!editingProduct}
          leftSection={<IconUpload size={16} />}
          description={editingProduct ? 'Оставить пустым, чтобы сохранить текущее изображение' : 'JPEG, PNG, GIF или WebP'}
        />
        {editingProduct && editingProduct.image && !imageFile && (
          <div style={{ marginBottom: '1rem' }}>
            <div style={{ fontSize: '0.875rem', marginBottom: '0.5rem', color: '#666' }}>Текущее изображение:</div>
            <Image
              src={`${process.env.API_BASE_URL}/${editingProduct.image}`}
              alt={editingProduct.name}
              w={200}
              h={200}
              fit="contain"
              radius="sm"
            />
          </div>
        )}
        <Select
          label="Подкатегория"
          placeholder="Выбрать подкатегорию"
          value={formData.subCategoryId}
          onChange={(value) => setFormData({ ...formData, subCategoryId: value || '' })}
          data={subCategories.map((sc) => ({
            value: sc.id.toString(),
            label: sc.name,
          }))}
          mb="md"
          required
        />
        <Group justify="flex-end">
          <Button variant="default" onClick={close}>
            Отмена
          </Button>
          <Button onClick={handleSubmit}>
            {editingProduct ? 'Обновить' : 'Создать'}
          </Button>
        </Group>
      </Modal>
    </div>
  );
}

