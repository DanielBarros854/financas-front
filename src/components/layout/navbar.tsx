import { AppBar, Toolbar, Typography, IconButton } from '@mui/material';
import { Logout } from '@mui/icons-material';
import { useRouter } from 'next/router';
import { clearToken } from '../../lib/auth';
import { routes } from '@/utils/routes';

export default function Navbar() {
  const router = useRouter();

  const handleLogout = () => {
    clearToken();
    router.push('/login');
  };

  return (
    <AppBar position="fixed">
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        <Typography
          variant="h6"
          component="div"
          sx={{
            cursor: 'pointer',
            '&:hover': {
              opacity: 0.8
            },
            maxWidth: '200px',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis'
          }}
          onClick={() => router.push(routes.dashboard)}
        >
          Sistema Financeiro
        </Typography>

        <IconButton
          size="large"
          aria-label="logout"
          onClick={handleLogout}
          color="inherit"
        >
          <Logout />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
}
