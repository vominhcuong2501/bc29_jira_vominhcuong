import { Suspense } from 'react';
import './App.css';
import Router from './routes';
import { BrowserRouter } from "react-router-dom"
import { LoadingProvider } from './contexts/loading.context';
import ModalEditProject from './modules/modal-edit-project/modal-edit-project';

function App() {

  return (
    <BrowserRouter>
      <Suspense fallback={<></>}>
        <LoadingProvider>
          <ModalEditProject />
          <Router />
        </LoadingProvider>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
