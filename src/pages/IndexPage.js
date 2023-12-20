import React, { useState, useEffect } from 'react';
import '../css/HomePage.css';
import PublicarConvocatoriaList from './PublicarConvocatoriaList ';
import PublicarListaVotantes from './PublicarListaVotantes';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
const IndexPage = () => {
  const [contentToShow, setContentToShow] = useState('Inicio');
  const [isCarouselReady, setCarouselReady] = useState(false);
 useEffect(() => {
    // Simula una carga asíncrona (ajusta según tu lógica de carga de datos)
    setTimeout(() => {
      setCarouselReady(true);
    }, 1000);
  }, []);

  const handlePublicacionClick = () => {
    setContentToShow('publicacion');
  };

  const handleConvocatoriaClick = () => {
    setContentToShow('convocatoria');
  };
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <div className="bg-purple">
      <div className="stars">
        <div className="custom-navbar">
          <div className="brand-logo">
            
          </div>
          <div className="navbar-links">
            <ul className="Home">
              <li className="HomeLI">
                <a href="#" onClick={() => setContentToShow('Inicio')} style={{ textDecoration: 'none' }}>
                  Inicio
                </a>
              </li>
              <li className="HomeLI">
                <a href="#" onClick={handleConvocatoriaClick} style={{ textDecoration: 'none' }}>
                  Convocatorias
                </a>
              </li>
              <li className="HomeLI">
                <a href="#" onClick={handlePublicacionClick} style={{ textDecoration: 'none' }}>
                  Publicaciones
                </a>
              </li>
              <li className="HomeLI">
                <a href="/Login" className="btn-request" style={{ textDecoration: 'none' }}>
                  Ingresar
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div>
        
        {contentToShow === 'Inicio' && (
          <>
            <div className="ContainerCenter">
              <input type="radio" name="Carrusel" id="Slider1" checked/>
              <input type="radio" name="Carrusel" id="Slider2" checked/>
              <input type="radio" name="Carrusel" id="Slider3" />
              
              <div className="Carrusels">
                <div className="Carrusel" > 
                    
                      <img
                        src="https://www.teu.umss.edu.bo/wp-content/uploads/2023/10/LOGO-TE-UMSS.png"
                        alt="Team"
                        width="450px"
                        height="330px"
                      />
                      <div className='tituloDiv'><h1 className="TituloInicio">TRIBUNAL ELECTORAL UNIVERSITARIO</h1></div>
                       
                </div>
                <div className="Carrusel" >
                     <img
                        src="https://www.umss.edu.bo/wp-content/uploads/2023/08/foto-tribunal-electoral-2.jpg"
                        alt="Team"
                        width="450px"
                        height="350px"ç
                        
                      />
                      <div className="objects">
                        <h2 className="TituloHome">MISIÓN:</h2>
                        <div>
                          <p>Garantizar procesos electorales eficaces y transparentes en defensa de los principios democráticos y éticos, fundamentados en la regulación de la conducta, las relaciones entre todos los actores de la comunidad universitaria, en el marco del nuevo Estatuto Universitario y el reglamento electoral universitario; encaminados a la unificación de los calendarios electorales facultativos y una administración independiente en los procesos electorales universitarios, así como asegurar la libertad, honradez y eficacia del sufragio de la institución, con respeto al pluralismo político en los diferentes procesos electorales.</p>
                        </div>
                    </div>
                </div>
                <div className="Carrusel" >
                <img
                        src="https://www.umss.edu.bo/wp-content/uploads/2023/08/foto-tribunal-electoral-1.jpg"
                        alt="Team"
                        width="450px"
                        height="350px"ç
                        
                      />
                       <div className="objects">
                      <h2 className="TituloHome">VISIÓN:</h2>
                      <div>
                        <p>Ser reconocido nacional e internacionalmente como un organismo universitario con el más alto prestigio en los procesos electorales enfocados en la autonomía universitaria, para autogobernarse mediante la elección libre de sus autoridades y representantes estamentarios docentes-estudiantes en un modelo participativo transparente y democrático mediante la capacitación e innovación tecnológica permanente para el perfeccionamiento de la democracia.</p>
                      </div>
                     </div>
                </div>

              </div>
              
              <div className="Selectors">
                <label htmlFor="Slider1" className="Selector"></label>
                <label htmlFor="Slider2" className="Selector"></label>
                <label htmlFor="Slider3" className="Selector"></label>
              </div>
            </div>
          </>
        )}
        
          {contentToShow === 'publicacion' && (
            <>
              <h2 className="TituloHome">Contenido de Publicacion:</h2>
              <PublicarListaVotantes />
            </>
          )}
          {contentToShow === 'convocatoria' && (
            <>
              <h2 className="TituloHome">Lista de Convocatoria:</h2>
              <PublicarConvocatoriaList />
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default IndexPage;