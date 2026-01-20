import { Button, Container, Paper, PasswordInput, TextInput, Title } from '@mantine/core';
import { useState } from 'react';
import { useNavigate } from 'react-router';
import { useAuthStore } from '@/lib/store';
import { Seo } from '@/components/Seo';

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const login = useAuthStore((state) => state.login);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await login(username, password);
      navigate('/admin/categories');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Ошибка входа');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container size={420} my={40}>
      <Seo title="PRO MEBEL — Admin Login" noindex />
      <Title ta="center" mb="xl">
        Вход администратора
      </Title>

      <Paper withBorder shadow="md" p={30} radius="md">
        <form onSubmit={handleSubmit}>
          <TextInput
            label="Имя пользователя"
            placeholder="admin"
            required
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            mb="md"
          />
          <PasswordInput
            label="Пароль"
            placeholder="Ваш пароль"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            mb="md"
          />
          {error && (
            <div style={{ color: 'red', marginBottom: '1rem', fontSize: '0.875rem' }}>
              {error}
            </div>
          )}
          <Button fullWidth type="submit" loading={loading}>
            Войти
          </Button>
        </form>
      </Paper>
    </Container>
  );
}


