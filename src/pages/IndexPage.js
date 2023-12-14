import React, { useState } from 'react';
import "../css/HomePage.css";
import PublicarConvocatoriaList from './PublicarConvocatoriaList ';

const IndexPage = () => {
  // Paso 2: Define el estado
  const [contentToShow, setContentToShow] = useState("Inicio");

  // Paso 3: Actualiza el estado al hacer clic en "Publicacion"
  const handlePublicacionClick = () => {
    setContentToShow("publicacion");
  };

  // Paso 3: Actualiza el estado al hacer clic en "Convocatoria"
  const handleConvocatoriaClick = () => {
    setContentToShow("convocatoria");
  }; 

  // Paso 4: Condiciona la renderización del contenido en función del estado
  return (
    <div className="bg-purple">
      <div className="stars">
        <div className="custom-navbar">
          <div className="brand-logo">
            <img src="https://www.umss.edu.bo/wp-content/uploads/2019/04/marcaHorizontal-01.png" alt="UMSS Logo" width="170px" />
          </div>
          <div className="navbar-links">
            <ul className='Home'>
              {/* Paso 3: Evita que los enlaces recarguen la página */}
              <li className='HomeLI'><a href="#" onClick={() => setContentToShow("Inicio")}>Inicio</a></li>
              <li><a href="#" onClick={handleConvocatoriaClick}>Convocatorias</a></li>
              <li><a href="#" onClick={handlePublicacionClick}>Publicaciones</a></li>
              <li><a href="/Login" className="btn-request">Ingresar</a></li>
            </ul>
          </div>
        </div>

        <div>
          {/* Paso 4: Renderiza el contenido en función del estado */}
          {contentToShow === "Inicio" && (
            <>
              <div className="titulo">
                <h1 className='TituloHome'>Tribunal Electoral Universitario</h1>
              </div>
              <div className="central-body">
                <div className="objects">
                  <img src="https://www.tcmetrologia.com/content/uploads/2020/10/team-3373638_1920.jpg" alt="Team" width="450px" height="350px" />
                </div>
                <div className="glowing_stars">
                  <h2 className='TituloHome'>Mision:</h2>
                  <div>
                    <p>Garantizar la legitimidad y la transparencia de los procesos democráticos en la UMSS, promoviendo la participación de la poblacion universitaria y protegiendo los derechos electorales de los estudiantes</p>
                  </div>
                  <h2 className='TituloHome'>Vision:</h2>
                  <div>
                    <p> Aspiramos a ser reconocidos como referentes en la administración de procesos electorales. Nuestra visión abarca la creación de un entorno donde la justicia, la transparencia y la participación ciudadana son pilares fundamentales. Buscamos inspirar confianza y contribuir al fortalecimiento de la democracia, fomentando la inclusión de todas las voces en la toma de decisiones. </p>
                  </div>
                </div>
              </div>
            </>
          )}
          {contentToShow === "publicacion" && (
            <>
              <h2 className='TituloHome'>Contenido de Publicacion:</h2>
              <div>
                <p>Este es el contenido específico para Publicacion.</p>
              </div>
            </>
          )}
          {contentToShow === "convocatoria" && (
            <>
              <h2 className='TituloHome'>Lista de Convocatoria:</h2>
               <PublicarConvocatoriaList/>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default IndexPage ;