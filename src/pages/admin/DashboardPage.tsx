import { api } from '@/lib/api';
import { Button, Card, Grid, Group, Text, Title } from '@mantine/core';
import { IconAlertTriangle, IconBox, IconCategory, IconTags } from '@tabler/icons-react';
import { useEffect, useState } from 'react';

export default function DashboardPage() {
  const [stats, setStats] = useState({
    categories: 0,
    subCategories: 0,
    products: 0,
  });
  const [stoppingBot, setStoppingBot] = useState(false);

  useEffect(() => {
    const loadStats = async () => {
      try {
        const [categories, subCategories, products] = await Promise.all([
          api.getCategories(1, 1),
          api.getSubCategories(1, 1),
          api.getProducts(1, 1),
        ]);

        setStats({
          categories: categories.pagination.total,
          subCategories: subCategories.pagination.total,
          products: products.pagination.total,
        });
      } catch (error) {
        console.error('Failed to load stats:', error);
      }
    };

    loadStats();
  }, []);

  const handleStopBot = async () => {
    if (!confirm('Stop Telegram bot and clear webhook? This will stop all notifications.')) return;
    
    setStoppingBot(true);
    try {
      const result = await api.stopTelegramBot();
      alert(`Bot stopped! Cleared ${result.updates_cleared} pending updates.`);
    } catch (error) {
      alert('Failed to stop bot: ' + (error instanceof Error ? error.message : 'Unknown error'));
    } finally {
      setStoppingBot(false);
    }
  };

  return (
    <div>
      <Group justify="space-between" mb="xl">
        <Title order={2}>Dashboard</Title>
        <Button
          color="red"
          leftSection={<IconAlertTriangle size={16} />}
          onClick={handleStopBot}
          loading={stoppingBot}
        >
          Emergency: Stop Telegram Bot
        </Button>
      </Group>

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
                  Categories
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
                  SubCategories
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
                  Products
                </Text>
              </div>
            </Group>
          </Card>
        </Grid.Col>
      </Grid>
    </div>
  );
}


