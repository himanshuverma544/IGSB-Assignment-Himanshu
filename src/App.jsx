import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";
import './App.css';

import { HashRouter, Routes, Route } from 'react-router-dom';

import Layout from './pages/Layout';
import Task from "./pages/Task";
import Page404 from './pages/Page404';

import { TASK, PAGE404 } from './utils/constants';


function App() {
 
  return (
    <HashRouter basename=''>
      <Routes>
        <Route path={TASK.pathname} element={<Layout/>}>
          <Route index element={<Task/>}/>
          <Route path={PAGE404.pathname} element={<Page404/>}/>
        </Route>
      </Routes>
    </HashRouter>
  );
}

export default App;
