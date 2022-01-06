import { AppProvider } from './providers/app';
import { AppRoutes } from './routes';
import './App.css';

/**
 * The main app which handles the initialization and routing
 * of the app.
 */
export default function App() {
  return (
    <AppProvider>
      <AppRoutes />
    </AppProvider>
  );
}
