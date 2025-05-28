import { Drawer, List, ListItem, ListItemIcon, ListItemText, ListItemButton } from '@mui/material';
import { Dashboard, AccountBalance } from '@mui/icons-material';
import { useRouter } from 'next/router';
import { useState } from 'react';

const menuItems = [
  { text: 'Dashboard', icon: <Dashboard />, path: '/dashboard' },
  { text: 'Finanças', icon: <AccountBalance />, path: '/financas' },
];

export default function Sidebar() {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: isOpen ? 240 : 64,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: isOpen ? 240 : 64,
          boxSizing: 'border-box',
          mt: 8,
          borderRight: '1px solid rgba(0, 0, 0, 0.12)',
          transition: 'width 0.2s ease-in-out',
          overflowX: 'hidden',
          overflowY: 'hidden',
        },
      }}
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <List>
        {menuItems.map((item) => (
          <ListItem 
            key={item.text}
            disablePadding
            sx={{
              '& .Mui-selected': {
                backgroundColor: 'rgba(0, 0, 0, 0.08)',
                '&:hover': {
                  backgroundColor: 'rgba(0, 0, 0, 0.12)',
                },
              },
            }}
          >
            <ListItemButton
              onClick={() => router.push(item.path)}
              selected={router.pathname === item.path}
              sx={{
                minHeight: 48,
                justifyContent: isOpen ? 'initial' : 'center',
                px: 2.5,
              }}
            >
              <ListItemIcon sx={{ 
                color: router.pathname === item.path ? 'primary.main' : 'inherit',
                minWidth: 0,
                mr: isOpen ? 3 : 'auto',
                justifyContent: 'center',
              }}>
                {item.icon}
              </ListItemIcon>
              <ListItemText 
                primary={item.text}
                sx={{
                  color: router.pathname === item.path ? 'primary.main' : 'inherit',
                  opacity: isOpen ? 1 : 0,
                  transition: 'opacity 0.2s ease-in-out',
                }}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
} 
