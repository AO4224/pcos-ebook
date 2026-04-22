import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import PCOSEbook from './PCOSFertilityEbook.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <PCOSEbook />
  </StrictMode>,
)
