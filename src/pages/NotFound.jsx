import Typography from '@mui/material/Typography'
import Stack from '@mui/material/Stack'
import Button from '@mui/material/Button'
import { Link as RouterLink } from 'react-router-dom'

export default function NotFound() {
  return (
    <Stack alignItems="center" spacing={2} sx={{ py: 8 }}>
      <Typography variant="h4">404</Typography>
      <Typography>Página no encontrada.</Typography>
      <Button component={RouterLink} to="/dashboard" variant="contained">Ir al Dashboard</Button>
    </Stack>
  )
}
