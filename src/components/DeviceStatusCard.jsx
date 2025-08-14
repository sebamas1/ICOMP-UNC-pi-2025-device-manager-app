import Paper from '@mui/material/Paper'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import Chip from '@mui/material/Chip'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import Grid from '@mui/material/Unstable_Grid2';
import HealthAndSafetyIcon from '@mui/icons-material/HealthAndSafety'
import { formatDate } from '../utils/format.js'

export default function DeviceStatusCard({ status, onHealthcheck, loading }) {
  const online = status?.online
  return (
    <Paper elevation={0} sx={{ p: 2 }}>
      <Stack direction="row" alignItems="center" justifyContent="space-between">
        <Typography variant="h6">Estado del microcontrolador</Typography>
        <Button variant="contained" startIcon={<HealthAndSafetyIcon />} onClick={onHealthcheck} disabled={loading}>
          Healthcheck
        </Button>
      </Stack>
      <Divider sx={{ my: 2 }} />
      <Grid container spacing={2}>
        <Grid xs={12} sm={6} md={3}>
          <Typography variant="body2" color="text.secondary">Estado</Typography>
          <Chip size="small" color={online ? 'success' : 'default'} label={online ? 'Online' : 'Offline'} />
        </Grid>
        <Grid xs={12} sm={6} md={3}>
          <Typography variant="body2" color="text.secondary">IP</Typography>
          <Typography>{status?.ip ?? '-'}</Typography>
        </Grid>
        <Grid xs={12} sm={6} md={3}>
          <Typography variant="body2" color="text.secondary">Uptime</Typography>
          <Typography>{status?.uptime ?? '-'}</Typography>
        </Grid>
        <Grid xs={12} sm={6} md={3}>
          <Typography variant="body2" color="text.secondary">Último contacto</Typography>
          <Typography>{status?.lastSeen ? formatDate(status.lastSeen) : '-'}</Typography>
        </Grid>
      </Grid>
    </Paper>
  )
}
