import { api, type HeroBlock } from '@/lib/api';
import {
  ActionIcon,
  Button,
  FileInput,
  Group,
  Image,
  Modal,
  Table,
  TextInput,
  Title,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconEdit, IconUpload } from '@tabler/icons-react';
import { useEffect, useState } from 'react';

export default function HeroBlocksPage() {
  const [heroBlocks, setHeroBlocks] = useState<HeroBlock[]>([]);
  const [loading, setLoading] = useState(false);
  const [opened, { open, close }] = useDisclosure(false);
  const [editingHeroBlock, setEditingHeroBlock] = useState<HeroBlock | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    link: '',
  });
  const [imageFile, setImageFile] = useState<File | null>(null);

  const loadHeroBlocks = async () => {
    setLoading(true);
    try {
      const data = await api.getHeroBlocks();
      setHeroBlocks(data);
    } catch (error) {
      console.error('Не удалось загрузить блоки героя:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadHeroBlocks();
  }, []);

  const handleEdit = (heroBlock: HeroBlock) => {
    setEditingHeroBlock(heroBlock);
    setFormData({
      title: heroBlock.title,
      link: heroBlock.link,
    });
    setImageFile(null);
    open();
  };

  const handleSubmit = async () => {
    if (!formData.title.trim() || !formData.link.trim()) {
      alert('Пожалуйста, заполните все поля');
      return;
    }

    if (!editingHeroBlock) {
      return;
    }

    try {
      const formDataToSend = new FormData();
      formDataToSend.append('title', formData.title);
      formDataToSend.append('link', formData.link);

      if (imageFile) {
        formDataToSend.append('image', imageFile);
      }

      await api.updateHeroBlockWithFile(editingHeroBlock.id, formDataToSend);
      close();
      loadHeroBlocks();
    } catch (error) {
      alert('Не удалось обновить блок героя: ' + (error instanceof Error ? error.message : 'Неизвестная ошибка'));
    }
  };

  return (
    <div>
      <Group justify="space-between" mb="xl">
        <Title order={2}>Блоки на главной странице</Title>
      </Group>

      <Table striped highlightOnHover>
        <Table.Thead>
          <Table.Tr>
            <Table.Th>ID</Table.Th>
            <Table.Th>Изображение</Table.Th>
            <Table.Th>Заголовок</Table.Th>
            <Table.Th>Ссылка</Table.Th>
            <Table.Th style={{ width: 120 }}>Действия</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {loading ? (
            <Table.Tr>
              <Table.Td colSpan={5} style={{ textAlign: 'center' }}>
                Загрузка...
              </Table.Td>
            </Table.Tr>
          ) : heroBlocks.length === 0 ? (
            <Table.Tr>
              <Table.Td colSpan={5} style={{ textAlign: 'center' }}>
                Блоки героя не найдены
              </Table.Td>
            </Table.Tr>
          ) : (
            heroBlocks.map((heroBlock) => (
              <Table.Tr key={heroBlock.id}>
                <Table.Td>{heroBlock.id}</Table.Td>
                <Table.Td>
                  <Image
                    src={`${process.env.API_BASE_URL}/${heroBlock.image}`}
                    alt={heroBlock.title}
                    w={50}
                    h={50}
                    fit="cover"
                    radius="sm"
                  />
                </Table.Td>
                <Table.Td>{heroBlock.title}</Table.Td>
                <Table.Td style={{ maxWidth: 300 }}>
                  {heroBlock.link.length > 100
                    ? heroBlock.link.substring(0, 100) + '...'
                    : heroBlock.link}
                </Table.Td>
                <Table.Td>
                  <Group gap="xs">
                    <ActionIcon
                      variant="light"
                      color="blue"
                      onClick={() => handleEdit(heroBlock)}
                    >
                      <IconEdit size={16} />
                    </ActionIcon>
                  </Group>
                </Table.Td>
              </Table.Tr>
            ))
          )}
        </Table.Tbody>
      </Table>

      <Modal
        opened={opened}
        onClose={close}
        title="Редактировать блок героя"
        size="lg"
      >
        <TextInput
          label="Заголовок"
          placeholder="Заголовок блока"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          mb="md"
          required
        />
        <TextInput
          label="Ссылка"
          placeholder="URL ссылки"
          value={formData.link}
          onChange={(e) => setFormData({ ...formData, link: e.target.value })}
          mb="md"
          required
        />
        <FileInput
          label="Изображение блока"
          placeholder="Выбрать файл изображения"
          accept="image/*"
          value={imageFile}
          onChange={setImageFile}
          mb="md"
          leftSection={<IconUpload size={16} />}
          description="Оставить пустым, чтобы сохранить текущее изображение (JPEG, PNG, GIF или WebP)"
        />
        {editingHeroBlock && editingHeroBlock.image && !imageFile && (
          <div style={{ marginBottom: '1rem' }}>
            <div style={{ fontSize: '0.875rem', marginBottom: '0.5rem', color: '#666' }}>Текущее изображение:</div>
            <Image
              src={`${process.env.API_BASE_URL}/${editingHeroBlock.image}`}
              alt={editingHeroBlock.title}
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
            Обновить
          </Button>
        </Group>
      </Modal>
    </div>
  );
}


