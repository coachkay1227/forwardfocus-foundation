import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { AnalyticsProvider } from './components/layout/AnalyticsProvider'

createRoot(document.getElementById("root")!).render(
  <AnalyticsProvider>
    <App />
  </AnalyticsProvider>
);
