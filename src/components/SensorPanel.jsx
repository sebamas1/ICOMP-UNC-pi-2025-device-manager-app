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

export default function SensorPanel({
  title,
  unit,
  sensorType,
  readings,
  onFetchCurrent,
  onRefreshHistory,
  loading
}) {
  return (
    <Paper
      elevation={1}
      sx={{
        p: 2,
        borderRadius: 2,
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        height: '100%',
      }}
    >
      {/* Header */}
      <Stack direction="row" alignItems="center" justifyContent="space-between">
        <Stack>
          <Typography variant="h6" fontWeight="bold">
            {title}
          </Typography>
          <Typography variant="subtitle2" color="text.secondary">
            {sensorType}
          </Typography>
        </Stack>
        <Stack direction="row" gap={1}>
          <Button
            size="small"
            variant="outlined"
            startIcon={<RefreshIcon />}
            onClick={onRefreshHistory}
            disabled={loading}
          >
            Historial
          </Button>
          <Button
            size="small"
            variant="contained"
            startIcon={<BoltIcon />}
            onClick={onFetchCurrent}
            disabled={loading}
          >
            Leer ahora
          </Button>
        </Stack>
      </Stack>

      <Divider />

      {/* Lecturas */}
      <List dense sx={{ flex: 1, overflowY: 'auto' }}>
        {readings.length === 0 && (
          <ListItem>
            <ListItemText primary="Sin datos aún." />
          </ListItem>
        )}
        {readings.map((r, idx) => (
          <ListItem
            key={idx}
            sx={{ display: 'flex', alignItems: 'center', gap: 2 }}
          >
            <ListItemText
              primary={formatDate(r.timestamp)}
              secondary={r.source || sensorType}
            />
            <Chip
              size="medium"
              color="primary"
              variant="outlined"
              label={`${r.value} ${unit}`}
              sx={{ fontWeight: 'bold', minWidth: 80, textAlign: 'center' }}
            />
          </ListItem>
        ))}
      </List>
    </Paper>
  )
}
