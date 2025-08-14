import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import { Link as RouterLink, useLocation } from 'react-router-dom'
import Link from '@mui/material/Link'
import Stack from '@mui/material/Stack'

export default function AppHeader() {
  const { pathname } = useLocation()
  return (
    <AppBar position="static" color="inherit" elevation={1}>
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          DeviceManager
        </Typography>
        <Stack direction="row" gap={2}>
          <Link component={RouterLink} underline="none" color={pathname === '/dashboard' ? 'primary.main' : 'text.primary'} to="/dashboard">
            Dashboard
          </Link>
          <Link component={RouterLink} underline="none" color={pathname === '/sensors' ? 'primary.main' : 'text.primary'} to="/sensors">
            Sensores
          </Link>
        </Stack>
      </Toolbar>
    </AppBar>
  )
}
