import Typography from '@mui/material/Typography'
import Alert from '@mui/material/Alert'
import Stack from '@mui/material/Stack'
import Divider from '@mui/material/Divider'

export default function Sensors() {
  return (
    <Stack spacing={2}>
      <Typography variant="h5">Sensores</Typography>
      <Divider />
      <Alert severity="info">
        Esta sección podrá incluir gráficos/ajustes por sensor. Por ahora, usá el Dashboard para ver datos y acciones rápidas.
      </Alert>
    </Stack>
  )
}
