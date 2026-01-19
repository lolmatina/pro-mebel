import { api } from '@/lib/api';
import {
  ActionIcon,
  Button,
  FileInput,
  Group,
  Image,
  Modal,
  NumberInput,
  Pagination,
  Rating,
  Table,
  Textarea,
  TextInput,
  Title,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconEdit, IconPlus, IconTrash, IconUpload } from '@tabler/icons-react';
import { useEffect, useState } from 'react';

interface Review {
  id: number;
  name: string;
  review: string;
  rating: number;
  image: string;
}

export default function ReviewsPage() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [opened, { open, close }] = useDisclosure(false);
  const [editingReview, setEditingReview] = useState<Review | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    review: '',
    rating: 5,
  });
  const [imageFile, setImageFile] = useState<File | null>(null);

  const loadReviews = async () => {
    setLoading(true);
    try {
      const response = await api.getReviews(page, 10);
      setReviews(response.data);
      setTotalPages(response.pagination.totalPages);
    } catch (error) {
      console.error('Не удалось загрузить отзывы:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadReviews();
  }, [page]);

  const handleCreate = () => {
    setEditingReview(null);
    setFormData({
      name: '',
      review: '',
      rating: 5,
    });
    setImageFile(null);
    open();
  };

  const handleEdit = (review: Review) => {
    setEditingReview(review);
    setFormData({
      name: review.name,
      review: review.review,
      rating: review.rating,
    });
    setImageFile(null);
    open();
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Вы уверены, что хотите удалить этот отзыв?')) return;

    try {
      await api.deleteReview(id);
      loadReviews();
    } catch (error) {
      alert('Не удалось удалить отзыв');
    }
  };

  const handleSubmit = async () => {
    if (!formData.name.trim() || !formData.review.trim()) {
      alert('Пожалуйста, заполните все поля');
      return;
    }

    if (formData.rating < 1 || formData.rating > 5) {
      alert('Рейтинг должен быть от 1 до 5');
      return;
    }

    if (!editingReview && !imageFile) {
      alert('Пожалуйста, выберите файл изображения');
      return;
    }

    try {
      const formDataToSend = new FormData();
      formDataToSend.append('name', formData.name);
      formDataToSend.append('review', formData.review);
      formDataToSend.append('rating', formData.rating.toString());

      if (imageFile) {
        formDataToSend.append('image', imageFile);
      }

      if (editingReview) {
        await api.updateReviewWithFile(editingReview.id, formDataToSend);
      } else {
        await api.createReviewWithFile(formDataToSend);
      }
      close();
      loadReviews();
    } catch (error) {
      alert('Не удалось сохранить отзыв: ' + (error instanceof Error ? error.message : 'Неизвестная ошибка'));
    }
  };

  return (
    <div>
      <Group justify="space-between" mb="xl">
        <Title order={2}>Отзывы</Title>
        <Button leftSection={<IconPlus size={16} />} onClick={handleCreate}>
          Добавить отзыв
        </Button>
      </Group>

      <Table striped highlightOnHover>
        <Table.Thead>
          <Table.Tr>
            <Table.Th>ID</Table.Th>
            <Table.Th>Изображение</Table.Th>
            <Table.Th>Имя</Table.Th>
            <Table.Th>Отзыв</Table.Th>
            <Table.Th>Рейтинг</Table.Th>
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
          ) : reviews.length === 0 ? (
            <Table.Tr>
              <Table.Td colSpan={6} style={{ textAlign: 'center' }}>
                Отзывы не найдены
              </Table.Td>
            </Table.Tr>
          ) : (
            reviews.map((review) => (
              <Table.Tr key={review.id}>
                <Table.Td>{review.id}</Table.Td>
                <Table.Td>
                  <Image
                    src={`${process.env.API_BASE_URL}/${review.image}`}
                    alt={review.name}
                    w={50}
                    h={50}
                    fit="cover"
                    radius="sm"
                  />
                </Table.Td>
                <Table.Td>{review.name}</Table.Td>
                <Table.Td style={{ maxWidth: 300 }}>
                  {review.review.length > 100
                    ? review.review.substring(0, 100) + '...'
                    : review.review}
                </Table.Td>
                <Table.Td>
                  <Rating value={review.rating} readOnly />
                </Table.Td>
                <Table.Td>
                  <Group gap="xs">
                    <ActionIcon
                      variant="light"
                      color="blue"
                      onClick={() => handleEdit(review)}
                    >
                      <IconEdit size={16} />
                    </ActionIcon>
                    <ActionIcon
                      variant="light"
                      color="red"
                      onClick={() => handleDelete(review.id)}
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
        title={editingReview ? 'Редактировать отзыв' : 'Создать отзыв'}
        size="lg"
      >
        <TextInput
          label="Имя"
          placeholder="Имя рецензента"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          mb="md"
          required
        />
        <Textarea
          label="Отзыв"
          placeholder="Текст отзыва"
          value={formData.review}
          onChange={(e) => setFormData({ ...formData, review: e.target.value })}
          mb="md"
          minRows={4}
          required
        />
        <div style={{ marginBottom: '1rem' }}>
          <label style={{ fontSize: '0.875rem', fontWeight: 500, marginBottom: '0.5rem', display: 'block' }}>
            Рейтинг <span style={{ color: 'red' }}>*</span>
          </label>
          <Rating
            value={formData.rating}
            onChange={(value) => setFormData({ ...formData, rating: value })}
            size="lg"
          />
        </div>
        <FileInput
          label="Изображение отзыва"
          placeholder="Выбрать файл изображения"
          accept="image/*"
          value={imageFile}
          onChange={setImageFile}
          mb="md"
          required={!editingReview}
          leftSection={<IconUpload size={16} />}
          description={editingReview ? 'Оставить пустым, чтобы сохранить текущее изображение' : 'JPEG, PNG, GIF или WebP'}
        />
        {editingReview && editingReview.image && !imageFile && (
          <div style={{ marginBottom: '1rem' }}>
            <div style={{ fontSize: '0.875rem', marginBottom: '0.5rem', color: '#666' }}>Текущее изображение:</div>
            <Image
              src={`${process.env.API_BASE_URL}/${editingReview.image}`}
              alt={editingReview.name}
              w={200}
              h={200}
              fit="contain"
              radius="sm"
            />
          </div>
        )}
        <Group justify="flex-end">
          <Button variant="default" onClick={close}>
            Отмена
          </Button>
          <Button onClick={handleSubmit}>
            {editingReview ? 'Обновить' : 'Создать'}
          </Button>
        </Group>
      </Modal>
    </div>
  );
}

