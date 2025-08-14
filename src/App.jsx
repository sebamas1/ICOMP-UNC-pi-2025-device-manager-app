import { Routes, Route, Navigate } from 'react-router-dom'
import Container from '@mui/material/Container'
import Box from '@mui/material/Box'
import AppHeader from './components/AppHeader.jsx'
import Dashboard from './pages/Dashboard.jsx'
import Sensors from './pages/Sensors.jsx'
import NotFound from './pages/NotFound.jsx'

export default function App() {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <AppHeader />
      <Container maxWidth="lg" sx={{ py: 3, flex: 1 }}>
        <Routes>
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/sensors" element={<Sensors />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Container>
    </Box>
  )
}
