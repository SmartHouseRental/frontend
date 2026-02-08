import { BrowserRouter, Route, Routes } from 'react-router';
import { Button } from './components/ui/button';
import { User } from 'lucide-react';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <Button>
              Welcoem <User />
            </Button>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
