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
        console.error('Failed to load stats:', error);
      }
    };

    loadStats();
  }, []);

  const handleStopBot = async () => {
    if (!confirm('Stop Telegram bot and clear webhook? This will stop all notifications and drop pending updates.')) return;
    
    setStoppingBot(true);
    try {
      const result = await api.stopTelegramBot();
      alert('Bot stopped successfully! Webhook deleted and all pending updates dropped.');
    } catch (error) {
      alert('Failed to stop bot: ' + (error instanceof Error ? error.message : 'Unknown error'));
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
      alert('Failed to toggle constructor: ' + (error instanceof Error ? error.message : 'Unknown error'));
    } finally {
      setTogglingConstructor(false);
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

        <Grid.Col span={{ base: 12, md: 12 }}>
          <Card shadow="sm" padding="lg" radius="md" withBorder>
            <Group justify="space-between">
              <Group>
                <IconTool size={40} color={constructorEnabled ? 'green' : 'gray'} />
                <div>
                  <Text size="lg" fw={600}>
                    Constructor
                  </Text>
                  <Text size="sm" c="dimmed">
                    {constructorEnabled ? 'Enabled' : 'Disabled'}
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


