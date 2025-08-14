import Paper from '@mui/material/Paper'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'
import Chip from '@mui/material/Chip'
import RefreshIcon from '@mui/icons-material/Refresh'
import BoltIcon from '@mui/icons-material/Bolt'
import { formatDate } from '../utils/format.js'

export default function SensorPanel({ title, unit, sensorType, readings, onFetchCurrent, onRefreshHistory, loading }) {
  return (
    <Paper elevation={0} sx={{ p: 2 }}>
      <Stack direction="row" alignItems="center" justifyContent="space-between">
        <Typography variant="h6">{title}</Typography>
        <Stack direction="row" gap={1}>
          <Button size="small" variant="outlined" startIcon={<RefreshIcon />} onClick={onRefreshHistory} disabled={loading}>
            Historial
          </Button>
          <Button size="small" variant="contained" startIcon={<BoltIcon />} onClick={onFetchCurrent} disabled={loading}>
            Leer ahora
          </Button>
        </Stack>
      </Stack>

      <Divider sx={{ my: 2 }} />

      <List dense>
        {readings.length === 0 && (
          <ListItem><ListItemText primary="Sin datos aún." /></ListItem>
        )}
        {readings.map((r, idx) => (
          <ListItem key={idx} secondaryAction={<Chip size="small" label={`${r.value} ${unit}`} />}>
            <ListItemText primary={formatDate(r.timestamp)} secondary={r.source || sensorType} />
          </ListItem>
        ))}
      </List>
    </Paper>
  )
}
