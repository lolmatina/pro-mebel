import { api, Category } from '@/lib/api';
import {
  ActionIcon,
  Button,
  Group,
  Modal,
  Pagination,
  Table,
  TextInput,
  Title,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconEdit, IconPlus, IconTrash } from '@tabler/icons-react';
import { useEffect, useState } from 'react';

export default function CategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [opened, { open, close }] = useDisclosure(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [name, setName] = useState('');

  const loadCategories = async () => {
    setLoading(true);
    try {
      const response = await api.getCategories(page, 10);
      setCategories(response.data);
      setTotalPages(response.pagination.totalPages);
    } catch (error) {
      console.error('Не удалось загрузить категории:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCategories();
  }, [page]);

  const handleCreate = () => {
    setEditingCategory(null);
    setName('');
    open();
  };

  const handleEdit = (category: Category) => {
    setEditingCategory(category);
    setName(category.name);
    open();
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Вы уверены, что хотите удалить эту категорию?')) return;

    try {
      await api.deleteCategory(id);
      loadCategories();
    } catch (error) {
      alert('Не удалось удалить категорию');
    }
  };

  const handleSubmit = async () => {
    try {
      if (editingCategory) {
        await api.updateCategory(editingCategory.id, name);
      } else {
        await api.createCategory(name);
      }
      close();
      loadCategories();
    } catch (error) {
      alert('Не удалось сохранить категорию');
    }
  };

  return (
    <div>
      <Group justify="space-between" mb="xl">
        <Title order={2}>Категории</Title>
        <Button leftSection={<IconPlus size={16} />} onClick={handleCreate}>
          Добавить категорию
        </Button>
      </Group>

      <Table striped highlightOnHover>
        <Table.Thead>
          <Table.Tr>
            <Table.Th>ID</Table.Th>
            <Table.Th>Название</Table.Th>
            <Table.Th style={{ width: 120 }}>Действия</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {loading ? (
            <Table.Tr>
              <Table.Td colSpan={3} style={{ textAlign: 'center' }}>
                Загрузка...
              </Table.Td>
            </Table.Tr>
          ) : categories.length === 0 ? (
            <Table.Tr>
              <Table.Td colSpan={3} style={{ textAlign: 'center' }}>
                Категории не найдены
              </Table.Td>
            </Table.Tr>
          ) : (
            categories.map((category) => (
              <Table.Tr key={category.id}>
                <Table.Td>{category.id}</Table.Td>
                <Table.Td>{category.name}</Table.Td>
                <Table.Td>
                  <Group gap="xs">
                    <ActionIcon
                      variant="light"
                      color="blue"
                      onClick={() => handleEdit(category)}
                    >
                      <IconEdit size={16} />
                    </ActionIcon>
                    <ActionIcon
                      variant="light"
                      color="red"
                      onClick={() => handleDelete(category.id)}
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
        title={editingCategory ? 'Редактировать категорию' : 'Создать категорию'}
      >
        <TextInput
          label="Название"
          placeholder="Название категории"
          value={name}
          onChange={(e) => setName(e.target.value)}
          mb="md"
        />
        <Group justify="flex-end">
          <Button variant="default" onClick={close}>
            Отмена
          </Button>
          <Button onClick={handleSubmit} disabled={!name.trim()}>
            {editingCategory ? 'Обновить' : 'Создать'}
          </Button>
        </Group>
      </Modal>
    </div>
  );
}


