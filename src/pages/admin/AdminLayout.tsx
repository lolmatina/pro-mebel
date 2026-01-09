import { AppShell, Burger, Button, NavLink } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconBox, IconCategory, IconLayoutDashboard, IconLogout, IconStar, IconTags } from '@tabler/icons-react';
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
            <div style={{ fontWeight: 600, fontSize: '1.25rem' }}>Admin Panel</div>
          </div>
          <Button
            variant="subtle"
            color="red"
            leftSection={<IconLogout size={16} />}
            onClick={handleLogout}
          >
            Logout
          </Button>
        </div>
      </AppShell.Header>

      <AppShell.Navbar p="md">
        <NavLink
          href="#"
          label="Dashboard"
          leftSection={<IconLayoutDashboard size={20} />}
          onClick={(e) => {
            e.preventDefault();
            navigate('/admin');
          }}
          active={location.pathname === '/admin'}
        />
        <NavLink
          href="#"
          label="Categories"
          leftSection={<IconCategory size={20} />}
          onClick={(e) => {
            e.preventDefault();
            navigate('/admin/categories');
          }}
          active={location.pathname.startsWith('/admin/categories')}
        />
        <NavLink
          href="#"
          label="SubCategories"
          leftSection={<IconTags size={20} />}
          onClick={(e) => {
            e.preventDefault();
            navigate('/admin/subcategories');
          }}
          active={location.pathname.startsWith('/admin/subcategories')}
        />
        <NavLink
          href="#"
          label="Products"
          leftSection={<IconBox size={20} />}
          onClick={(e) => {
            e.preventDefault();
            navigate('/admin/products');
          }}
          active={location.pathname.startsWith('/admin/products')}
        />
        <NavLink
          href="#"
          label="Reviews"
          leftSection={<IconStar size={20} />}
          onClick={(e) => {
            e.preventDefault();
            navigate('/admin/reviews');
          }}
          active={location.pathname.startsWith('/admin/reviews')}
        />
      </AppShell.Navbar>

      <AppShell.Main>
        <Outlet />
      </AppShell.Main>
    </AppShell>
  );
}


