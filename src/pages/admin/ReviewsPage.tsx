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
      console.error('Failed to load reviews:', error);
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
    if (!confirm('Are you sure you want to delete this review?')) return;

    try {
      await api.deleteReview(id);
      loadReviews();
    } catch (error) {
      alert('Failed to delete review');
    }
  };

  const handleSubmit = async () => {
    if (!formData.name.trim() || !formData.review.trim()) {
      alert('Please fill in all fields');
      return;
    }

    if (formData.rating < 1 || formData.rating > 5) {
      alert('Rating must be between 1 and 5');
      return;
    }

    if (!editingReview && !imageFile) {
      alert('Please select an image file');
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
      alert('Failed to save review: ' + (error instanceof Error ? error.message : 'Unknown error'));
    }
  };

  return (
    <div>
      <Group justify="space-between" mb="xl">
        <Title order={2}>Reviews</Title>
        <Button leftSection={<IconPlus size={16} />} onClick={handleCreate}>
          Add Review
        </Button>
      </Group>

      <Table striped highlightOnHover>
        <Table.Thead>
          <Table.Tr>
            <Table.Th>ID</Table.Th>
            <Table.Th>Image</Table.Th>
            <Table.Th>Name</Table.Th>
            <Table.Th>Review</Table.Th>
            <Table.Th>Rating</Table.Th>
            <Table.Th style={{ width: 120 }}>Actions</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {loading ? (
            <Table.Tr>
              <Table.Td colSpan={6} style={{ textAlign: 'center' }}>
                Loading...
              </Table.Td>
            </Table.Tr>
          ) : reviews.length === 0 ? (
            <Table.Tr>
              <Table.Td colSpan={6} style={{ textAlign: 'center' }}>
                No reviews found
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
        title={editingReview ? 'Edit Review' : 'Create Review'}
        size="lg"
      >
        <TextInput
          label="Name"
          placeholder="Reviewer name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          mb="md"
          required
        />
        <Textarea
          label="Review"
          placeholder="Review text"
          value={formData.review}
          onChange={(e) => setFormData({ ...formData, review: e.target.value })}
          mb="md"
          minRows={4}
          required
        />
        <div style={{ marginBottom: '1rem' }}>
          <label style={{ fontSize: '0.875rem', fontWeight: 500, marginBottom: '0.5rem', display: 'block' }}>
            Rating <span style={{ color: 'red' }}>*</span>
          </label>
          <Rating
            value={formData.rating}
            onChange={(value) => setFormData({ ...formData, rating: value })}
            size="lg"
          />
        </div>
        <FileInput
          label="Review Image"
          placeholder="Select image file"
          accept="image/*"
          value={imageFile}
          onChange={setImageFile}
          mb="md"
          required={!editingReview}
          leftSection={<IconUpload size={16} />}
          description={editingReview ? 'Leave empty to keep current image' : 'JPEG, PNG, GIF, or WebP'}
        />
        {editingReview && editingReview.image && !imageFile && (
          <div style={{ marginBottom: '1rem' }}>
            <div style={{ fontSize: '0.875rem', marginBottom: '0.5rem', color: '#666' }}>Current Image:</div>
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
            Cancel
          </Button>
          <Button onClick={handleSubmit}>
            {editingReview ? 'Update' : 'Create'}
          </Button>
        </Group>
      </Modal>
    </div>
  );
}

