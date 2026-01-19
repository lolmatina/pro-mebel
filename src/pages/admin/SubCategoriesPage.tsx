import { api, SubCategory } from '@/lib/api';
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

export default function SubCategoriesPage() {
  const [subCategories, setSubCategories] = useState<SubCategory[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [opened, { open, close }] = useDisclosure(false);
  const [editingSubCategory, setEditingSubCategory] = useState<SubCategory | null>(null);
  const [name, setName] = useState('');

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

  useEffect(() => {
    loadSubCategories();
  }, [page]);

  const handleCreate = () => {
    setEditingSubCategory(null);
    setName('');
    open();
  };

  const handleEdit = (subCategory: SubCategory) => {
    setEditingSubCategory(subCategory);
    setName(subCategory.name);
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
      if (editingSubCategory) {
        await api.updateSubCategory(editingSubCategory.id, name);
      } else {
        await api.createSubCategory(name);
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
          ) : subCategories.length === 0 ? (
            <Table.Tr>
              <Table.Td colSpan={3} style={{ textAlign: 'center' }}>
                Подкатегории не найдены
              </Table.Td>
            </Table.Tr>
          ) : (
            subCategories.map((subCategory) => (
              <Table.Tr key={subCategory.id}>
                <Table.Td>{subCategory.id}</Table.Td>
                <Table.Td>{subCategory.name}</Table.Td>
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
        title={editingSubCategory ? 'Редактировать подкатегорию' : 'Создать подкатегорию'}
      >
        <TextInput
          label="Название"
          placeholder="Название подкатегории"
          value={name}
          onChange={(e) => setName(e.target.value)}
          mb="md"
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


