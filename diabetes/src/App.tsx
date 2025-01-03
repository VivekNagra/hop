import './App.css';
import Provider from '@shangrila-cargo/provider';
import { AppRoutes } from './routes/AppRoutes';

function App() {
  return (
    <Provider>
      <AppRoutes />
    </Provider>
  );
}

export default App;
