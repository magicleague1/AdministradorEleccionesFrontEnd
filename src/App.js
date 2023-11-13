
import './App.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginPage from './pages/LoginPage';
import IndexPage from './pages/IndexPage';
import MenuIzquierdo from './pages/MenuIzquierdo';
import ActualizarEleccion from './pages/ActualizarEleccionModal';
import PdfConvocatoria from './pages/pdfConvocatoria';
import VerConvocatoria from './pages/VerConvocatoria';
import GenerarPdfPreview from './pages/GenerarPdfPreview';
import GenerarPdfPreviewPublic from './pages/GenerarPdfPreviewPublic';



function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<IndexPage/>}></Route>
        <Route path="/login" element={<LoginPage/>}></Route>
        <Route path="/home" element={<MenuIzquierdo/>}></Route>  
        <Route path="/actualizarEleccion/:id" element={<ActualizarEleccion />} />
        <Route path='/PdfConvocatoria/:id' element={<PdfConvocatoria/>}/>

        <Route path="/VerConvocatoria" element={<VerConvocatoria/>}></Route>  
        <Route path="/pdf/:id" element={<GenerarPdfPreview/>} />
        <Route path="/pdfPublicado/:id" element={<GenerarPdfPreviewPublic/>} />



      </Routes>
    </BrowserRouter>
  );
}

export default App;
