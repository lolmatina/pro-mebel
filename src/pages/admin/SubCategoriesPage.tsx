import { api } from '@/lib/api';
import type { SubCategory, Category } from '@/lib/api';
import {
  ActionIcon,
  Button,
  Group,
  Modal,
  Pagination,
  Select,
  Table,
  TextInput,
  Title,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconEdit, IconPlus, IconTrash } from '@tabler/icons-react';
import { useEffect, useState } from 'react';

export default function SubCategoriesPage() {
  const [subCategories, setSubCategories] = useState<SubCategory[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [opened, { open, close }] = useDisclosure(false);
  const [editingSubCategory, setEditingSubCategory] = useState<SubCategory | null>(null);
  const [name, setName] = useState('');
  const [categoryId, setCategoryId] = useState<string>('');

  const loadSubCategories = async () => {
    setLoading(true);
    try {
      const response = await api.getSubCategories(page, 10);
      setSubCategories(response.data);
      setTotalPages(response.pagination.totalPages);
    } catch (error) {
      console.error('Не удалось загрузить подкатегории:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadCategories = async () => {
    try {
      const response = await api.getCategories(1, 100);
      setCategories(response.data);
    } catch (error) {
      console.error('Не удалось загрузить категории:', error);
    }
  };

  useEffect(() => {
    loadSubCategories();
    loadCategories();
  }, [page]);

  const handleCreate = () => {
    setEditingSubCategory(null);
    setName('');
    setCategoryId('');
    open();
  };

  const handleEdit = (subCategory: SubCategory) => {
    setEditingSubCategory(subCategory);
    setName(subCategory.name);
    setCategoryId(subCategory.categoryId?.toString() || '');
    open();
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Вы уверены, что хотите удалить эту подкатегорию?')) return;

    try {
      await api.deleteSubCategory(id);
      loadSubCategories();
    } catch (error) {
      alert('Не удалось удалить подкатегорию');
    }
  };

  const handleSubmit = async () => {
    try {
      const categoryIdValue = categoryId ? parseInt(categoryId) : null;
      if (editingSubCategory) {
        await api.updateSubCategory(editingSubCategory.id, name, categoryIdValue);
      } else {
        await api.createSubCategory(name, categoryIdValue);
      }
      close();
      loadSubCategories();
    } catch (error) {
      alert('Не удалось сохранить подкатегорию');
    }
  };

  return (
    <div>
      <Group justify="space-between" mb="xl">
        <Title order={2}>Подкатегории</Title>
        <Button leftSection={<IconPlus size={16} />} onClick={handleCreate}>
          Добавить подкатегорию
        </Button>
      </Group>

      <Table striped highlightOnHover>
        <Table.Thead>
          <Table.Tr>
            <Table.Th>ID</Table.Th>
            <Table.Th>Название</Table.Th>
            <Table.Th>Категория</Table.Th>
            <Table.Th style={{ width: 120 }}>Действия</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {loading ? (
            <Table.Tr>
              <Table.Td colSpan={4} style={{ textAlign: 'center' }}>
                Загрузка...
              </Table.Td>
            </Table.Tr>
          ) : subCategories.length === 0 ? (
            <Table.Tr>
              <Table.Td colSpan={4} style={{ textAlign: 'center' }}>
                Подкатегории не найдены
              </Table.Td>
            </Table.Tr>
          ) : (
            subCategories.map((subCategory) => {
              const categoryName = subCategory.categoryId
                ? categories.find((c) => c.id === subCategory.categoryId)?.name || 'Неизвестно'
                : '-';
              return (
                <Table.Tr key={subCategory.id}>
                  <Table.Td>{subCategory.id}</Table.Td>
                  <Table.Td>{subCategory.name}</Table.Td>
                  <Table.Td>{categoryName}</Table.Td>
                  <Table.Td>
                  <Group gap="xs">
                    <ActionIcon
                      variant="light"
                      color="blue"
                      onClick={() => handleEdit(subCategory)}
                    >
                      <IconEdit size={16} />
                    </ActionIcon>
                    <ActionIcon
                      variant="light"
                      color="red"
                      onClick={() => handleDelete(subCategory.id)}
                    >
                      <IconTrash size={16} />
                    </ActionIcon>
                  </Group>
                </Table.Td>
              </Table.Tr>
              );
            })
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
        title={editingSubCategory ? 'Редактировать подкатегорию' : 'Создать подкатегорию'}
      >
        <TextInput
          label="Название"
          placeholder="Название подкатегории"
          value={name}
          onChange={(e) => setName(e.target.value)}
          mb="md"
          required
        />
        <Select
          label="Категория"
          placeholder="Выбрать категорию"
          value={categoryId}
          onChange={(value) => setCategoryId(value || '')}
          data={categories.map((category) => ({
            value: category.id.toString(),
            label: category.name,
          }))}
          mb="md"
          clearable
        />
        <Group justify="flex-end">
          <Button variant="default" onClick={close}>
            Отмена
          </Button>
          <Button onClick={handleSubmit} disabled={!name.trim()}>
            {editingSubCategory ? 'Обновить' : 'Создать'}
          </Button>
        </Group>
      </Modal>
    </div>
  );
}


