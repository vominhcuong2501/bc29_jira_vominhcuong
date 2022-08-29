import { Suspense } from 'react';
import './App.css';
import Router from './routes';
import { BrowserRouter } from "react-router-dom"
import { LoadingProvider } from './contexts/loading.context';
import ModalProject from './modules/modal-project/modal-project';

function App() {

  return (
    <BrowserRouter>
      <Suspense fallback={<></>}>
        <LoadingProvider>
          <ModalProject />
          <Router />
        </LoadingProvider>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
