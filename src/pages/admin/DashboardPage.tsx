import { api } from '@/lib/api';
import { Button, Card, Grid, Group, Switch, Text, Title } from '@mantine/core';
import { IconAlertTriangle, IconBox, IconCategory, IconTags, IconTool } from '@tabler/icons-react';
import { useEffect, useState } from 'react';

export default function DashboardPage() {
  const [stats, setStats] = useState({
    categories: 0,
    subCategories: 0,
    products: 0,
  });
  const [stoppingBot, setStoppingBot] = useState(false);
  const [constructorEnabled, setConstructorEnabled] = useState(false);
  const [togglingConstructor, setTogglingConstructor] = useState(false);

  useEffect(() => {
    const loadStats = async () => {
      try {
        const [categories, subCategories, products, setting] = await Promise.all([
          api.getCategories(1, 1),
          api.getSubCategories(1, 1),
          api.getProducts(1, 1),
          api.getSetting('feature_flag'),
        ]);

        setStats({
          categories: categories.pagination.total,
          subCategories: subCategories.pagination.total,
          products: products.pagination.total,
        });
        setConstructorEnabled(setting.value);
      } catch (error) {
        console.error('Не удалось загрузить статистику:', error);
      }
    };

    loadStats();
  }, []);

  const handleStopBot = async () => {
    if (!confirm('Остановить Telegram бота и очистить webhook? Это остановит все уведомления и удалит ожидающие обновления.')) return;

    setStoppingBot(true);
    try {
      const result = await api.stopTelegramBot();
      alert('Бот успешно остановлен! Webhook удален и все ожидающие обновления удалены.');
    } catch (error) {
      alert('Не удалось остановить бота: ' + (error instanceof Error ? error.message : 'Неизвестная ошибка'));
    } finally {
      setStoppingBot(false);
    }
  };

  const handleToggleConstructor = async () => {
    setTogglingConstructor(true);
    try {
      const result = await api.toggleSetting('feature_flag');
      setConstructorEnabled(result.value);
    } catch (error) {
      alert('Не удалось переключить конструктор: ' + (error instanceof Error ? error.message : 'Неизвестная ошибка'));
    } finally {
      setTogglingConstructor(false);
    }
  };

  return (
    <div>
      {/* <Group justify="space-between" mb="xl">
        <Title order={2}>Дэшборд</Title>
        <Button
          color="red"
          leftSection={<IconAlertTriangle size={16} />}
          onClick={handleStopBot}
          loading={stoppingBot}
        >
          Экстренно: Остановить Telegram бота
        </Button>
      </Group> */}

      <Grid>
        <Grid.Col span={{ base: 12, sm: 6, md: 4 }}>
          <Card shadow="sm" padding="lg" radius="md" withBorder>
            <Group>
              <IconCategory size={40} color="blue" />
              <div>
                <Text size="xl" fw={700}>
                  {stats.categories}
                </Text>
                <Text size="sm" c="dimmed">
                  Категории
                </Text>
              </div>
            </Group>
          </Card>
        </Grid.Col>

        <Grid.Col span={{ base: 12, sm: 6, md: 4 }}>
          <Card shadow="sm" padding="lg" radius="md" withBorder>
            <Group>
              <IconTags size={40} color="green" />
              <div>
                <Text size="xl" fw={700}>
                  {stats.subCategories}
                </Text>
                <Text size="sm" c="dimmed">
                  Подкатегории
                </Text>
              </div>
            </Group>
          </Card>
        </Grid.Col>

        <Grid.Col span={{ base: 12, sm: 6, md: 4 }}>
          <Card shadow="sm" padding="lg" radius="md" withBorder>
            <Group>
              <IconBox size={40} color="orange" />
              <div>
                <Text size="xl" fw={700}>
                  {stats.products}
                </Text>
                <Text size="sm" c="dimmed">
                  Продукты
                </Text>
              </div>
            </Group>
          </Card>
        </Grid.Col>

        <Grid.Col span={{ base: 12, md: 12 }}>
          <Card shadow="sm" padding="lg" radius="md" withBorder>
            <Group justify="space-between">
              <Group>
                <IconTool size={40} color={constructorEnabled ? 'green' : 'gray'} />
                <div>
                  <Text size="lg" fw={600}>
                    Конструктор
                  </Text>
                  <Text size="sm" c="dimmed">
                    {constructorEnabled ? 'Включено' : 'Выключено'}
                  </Text>
                </div>
              </Group>
              <Switch
                size="lg"
                checked={constructorEnabled}
                onChange={handleToggleConstructor}
                disabled={togglingConstructor}
                color="green"
              />
            </Group>
          </Card>
        </Grid.Col>
      </Grid>
    </div>
  );
}


