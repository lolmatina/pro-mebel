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
      console.error('Failed to load applications:', error);
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
    if (!confirm('Are you sure you want to delete this application?')) return;

    try {
      await api.deleteApplication(id);
      loadApplications();
    } catch (error) {
      alert('Failed to delete application');
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
        <Title order={2}>Applications</Title>
      </Group>

      <Table striped highlightOnHover>
        <Table.Thead>
          <Table.Tr>
            <Table.Th>ID</Table.Th>
            <Table.Th>Email</Table.Th>
            <Table.Th>Full Name</Table.Th>
            <Table.Th>City</Table.Th>
            <Table.Th>Ready to Order</Table.Th>
            <Table.Th>Product ID</Table.Th>
            <Table.Th>Created At</Table.Th>
            <Table.Th style={{ width: 120 }}>Actions</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {loading ? (
            <Table.Tr>
              <Table.Td colSpan={8} style={{ textAlign: 'center' }}>
                Loading...
              </Table.Td>
            </Table.Tr>
          ) : applications.length === 0 ? (
            <Table.Tr>
              <Table.Td colSpan={8} style={{ textAlign: 'center' }}>
                No applications found
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
                    {application.readyToOrder ? 'Yes' : 'No'}
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
        title="Application Details"
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
              <Text fw={600}>Full Name:</Text>
              <Text>{selectedApplication.fullName}</Text>
            </Group>
            <Group mb="md">
              <Text fw={600}>City:</Text>
              <Text>{selectedApplication.city}</Text>
            </Group>
            <div style={{ marginBottom: '1rem' }}>
              <Text fw={600} mb="xs">Description:</Text>
              <Text style={{ whiteSpace: 'pre-wrap' }}>{selectedApplication.description}</Text>
            </div>
            <Group mb="md">
              <Text fw={600}>Ready to Order:</Text>
              <Badge color={selectedApplication.readyToOrder ? 'green' : 'gray'}>
                {selectedApplication.readyToOrder ? 'Yes' : 'No'}
              </Badge>
            </Group>
            {selectedApplication.productId && (
              <Group mb="md">
                <Text fw={600}>Product ID:</Text>
                <Badge color="blue">{selectedApplication.productId}</Badge>
              </Group>
            )}
            <Group mb="md">
              <Text fw={600}>Created At:</Text>
              <Text>{formatDate(selectedApplication.createdAt)}</Text>
            </Group>
            <Group justify="flex-end" mt="xl">
              <Button variant="default" onClick={close}>
                Close
              </Button>
            </Group>
          </div>
        )}
      </Modal>
    </div>
  );
}
