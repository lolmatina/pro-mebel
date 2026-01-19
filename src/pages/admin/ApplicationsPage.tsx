import { api, Application } from '@/lib/api';
import {
  ActionIcon,
  Badge,
  Button,
  Group,
  Modal,
  Pagination,
  Table,
  Text,
  Title,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconEye, IconTrash } from '@tabler/icons-react';
import { useEffect, useState } from 'react';

export default function ApplicationsPage() {
  const [applications, setApplications] = useState<Application[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [opened, { open, close }] = useDisclosure(false);
  const [selectedApplication, setSelectedApplication] = useState<Application | null>(null);

  const loadApplications = async () => {
    setLoading(true);
    try {
      const response = await api.getApplications(page, 10);
      setApplications(response.data);
      setTotalPages(response.pagination.totalPages);
    } catch (error) {
      console.error('Не удалось загрузить заявки:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadApplications();
  }, [page]);

  const handleView = (application: Application) => {
    setSelectedApplication(application);
    open();
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Вы уверены, что хотите удалить эту заявку?')) return;

    try {
      await api.deleteApplication(id);
      loadApplications();
    } catch (error) {
      alert('Не удалось удалить заявку');
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('ru-RU', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div>
      <Group justify="space-between" mb="xl">
        <Title order={2}>Заявки</Title>
      </Group>

      <Table striped highlightOnHover>
        <Table.Thead>
          <Table.Tr>
            <Table.Th>ID</Table.Th>
            <Table.Th>Email</Table.Th>
            <Table.Th>Полное имя</Table.Th>
            <Table.Th>Город</Table.Th>
            <Table.Th>Готов к заказу</Table.Th>
            <Table.Th>ID продукта</Table.Th>
            <Table.Th>Создано</Table.Th>
            <Table.Th style={{ width: 120 }}>Действия</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {loading ? (
            <Table.Tr>
              <Table.Td colSpan={8} style={{ textAlign: 'center' }}>
                Загрузка...
              </Table.Td>
            </Table.Tr>
          ) : applications.length === 0 ? (
            <Table.Tr>
              <Table.Td colSpan={8} style={{ textAlign: 'center' }}>
                Заявки не найдены
              </Table.Td>
            </Table.Tr>
          ) : (
            applications.map((application) => (
              <Table.Tr key={application.id}>
                <Table.Td>{application.id}</Table.Td>
                <Table.Td>{application.email}</Table.Td>
                <Table.Td>{application.fullName}</Table.Td>
                <Table.Td>{application.city}</Table.Td>
                <Table.Td>
                  <Badge color={application.readyToOrder ? 'green' : 'gray'}>
                    {application.readyToOrder ? 'Да' : 'Нет'}
                  </Badge>
                </Table.Td>
                <Table.Td>
                  {application.productId ? (
                    <Badge color="blue">{application.productId}</Badge>
                  ) : (
                    <Text c="dimmed">-</Text>
                  )}
                </Table.Td>
                <Table.Td>{formatDate(application.createdAt)}</Table.Td>
                <Table.Td>
                  <Group gap="xs">
                    <ActionIcon
                      variant="light"
                      color="blue"
                      onClick={() => handleView(application)}
                    >
                      <IconEye size={16} />
                    </ActionIcon>
                    <ActionIcon
                      variant="light"
                      color="red"
                      onClick={() => handleDelete(application.id)}
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
        title="Детали заявки"
        size="lg"
      >
        {selectedApplication && (
          <div>
            <Group mb="md">
              <Text fw={600}>ID:</Text>
              <Text>{selectedApplication.id}</Text>
            </Group>
            <Group mb="md">
              <Text fw={600}>Email:</Text>
              <Text>{selectedApplication.email}</Text>
            </Group>
            <Group mb="md">
              <Text fw={600}>Полное имя:</Text>
              <Text>{selectedApplication.fullName}</Text>
            </Group>
            <Group mb="md">
              <Text fw={600}>Город:</Text>
              <Text>{selectedApplication.city}</Text>
            </Group>
            <div style={{ marginBottom: '1rem' }}>
              <Text fw={600} mb="xs">Описание:</Text>
              <Text style={{ whiteSpace: 'pre-wrap' }}>{selectedApplication.description}</Text>
            </div>
            <Group mb="md">
              <Text fw={600}>Готов к заказу:</Text>
              <Badge color={selectedApplication.readyToOrder ? 'green' : 'gray'}>
                {selectedApplication.readyToOrder ? 'Да' : 'Нет'}
              </Badge>
            </Group>
            {selectedApplication.productId && (
              <Group mb="md">
                <Text fw={600}>Product ID:</Text>
                <Badge color="blue">{selectedApplication.productId}</Badge>
              </Group>
            )}
            <Group mb="md">
              <Text fw={600}>Создано:</Text>
              <Text>{formatDate(selectedApplication.createdAt)}</Text>
            </Group>
            <Group justify="flex-end" mt="xl">
              <Button variant="default" onClick={close}>
                Закрыть
              </Button>
            </Group>
          </div>
        )}
      </Modal>
    </div>
  );
}
