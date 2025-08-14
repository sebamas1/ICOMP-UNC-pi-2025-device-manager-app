import Grid from '@mui/material/Unstable_Grid2';
import Stack from '@mui/material/Stack'
import SensorPanel from '../components/SensorPanel.jsx'
import DeviceStatusCard from '../components/DeviceStatusCard.jsx'
import { useSensorData } from '../hooks/useSensorData.js'
import { useDeviceStatus } from '../hooks/useDeviceStatus.js'

export default function Dashboard() {
  const temp = useSensorData('temperature')
  const hum = useSensorData('humidity')
  const device = useDeviceStatus()

  return (
    <Stack spacing={3}>
      <DeviceStatusCard status={device.status} onHealthcheck={device.healthcheck} loading={device.loading} />
      <Grid container spacing={3}>
        <Grid xs={12} md={6}>
          <SensorPanel
            title="Temperatura"
            unit="°C"
            sensorType="temperature"
            readings={temp.readings}
            onFetchCurrent={temp.fetchCurrent}
            onRefreshHistory={temp.fetchHistory}
            loading={temp.loading}
          />
        </Grid>
        <Grid xs={12} md={6}>
          <SensorPanel
            title="Humedad"
            unit="%"
            sensorType="humidity"
            readings={hum.readings}
            onFetchCurrent={hum.fetchCurrent}
            onRefreshHistory={hum.fetchHistory}
            loading={hum.loading}
          />
        </Grid>
      </Grid>     
    </Stack>
  )
}
