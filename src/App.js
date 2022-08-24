import { Suspense } from 'react';
import './App.css';
import Router from './routes';
import { BrowserRouter } from "react-router-dom"
import { LoadingProvider } from './contexts/loading.context';

function App() {

  return (
    <BrowserRouter>
      <Suspense fallback={<></>}>
        <LoadingProvider>
          <Router />
        </LoadingProvider>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
