import { AppShell, Burger, Button, NavLink } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconBox, IconCategory, IconClipboardText, IconLayoutDashboard, IconLogout, IconStar, IconTags } from '@tabler/icons-react';
import { Outlet, useNavigate, useLocation } from 'react-router';
import { useAuthStore } from '@/lib/store';
import { useEffect } from 'react';

export default function AdminLayout() {
  const [opened, { toggle }] = useDisclosure();
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated, logout } = useAuthStore();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/admin/login');
    }
  }, [isAuthenticated, navigate]);

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  if (!isAuthenticated) {
    return null;
  }

  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{
        width: 250,
        breakpoint: 'sm',
        collapsed: { mobile: !opened },
      }}
      padding="md"
    >
      <AppShell.Header>
        <div style={{ display: 'flex', alignItems: 'center', height: '100%', padding: '0 1rem', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
            <div style={{ fontWeight: 600, fontSize: '1.25rem' }}>Панель администратора</div>
          </div>
          <Button
            variant="subtle"
            color="red"
            leftSection={<IconLogout size={16} />}
            onClick={handleLogout}
          >
            Выйти
          </Button>
        </div>
      </AppShell.Header>

      <AppShell.Navbar p="md">
        <NavLink
          href="#"
          label="Дэшборд"
          leftSection={<IconLayoutDashboard size={20} />}
          onClick={(e) => {
            e.preventDefault();
            navigate('/admin');
          }}
          active={location.pathname === '/admin'}
        />
        <NavLink
          href="#"
          label="Категории"
          leftSection={<IconCategory size={20} />}
          onClick={(e) => {
            e.preventDefault();
            navigate('/admin/categories');
          }}
          active={location.pathname.startsWith('/admin/categories')}
        />
        <NavLink
          href="#"
          label="Подкатегории"
          leftSection={<IconTags size={20} />}
          onClick={(e) => {
            e.preventDefault();
            navigate('/admin/subcategories');
          }}
          active={location.pathname.startsWith('/admin/subcategories')}
        />
        <NavLink
          href="#"
          label="Продукты"
          leftSection={<IconBox size={20} />}
          onClick={(e) => {
            e.preventDefault();
            navigate('/admin/products');
          }}
          active={location.pathname.startsWith('/admin/products')}
        />
        <NavLink
          href="#"
          label="Отзывы"
          leftSection={<IconStar size={20} />}
          onClick={(e) => {
            e.preventDefault();
            navigate('/admin/reviews');
          }}
          active={location.pathname.startsWith('/admin/reviews')}
        />
        <NavLink
          href="#"
          label="Заявки"
          leftSection={<IconClipboardText size={20} />}
          onClick={(e) => {
            e.preventDefault();
            navigate('/admin/applications');
          }}
          active={location.pathname.startsWith('/admin/applications')}
        />
      </AppShell.Navbar>

      <AppShell.Main>
        <Outlet />
      </AppShell.Main>
    </AppShell>
  );
}


