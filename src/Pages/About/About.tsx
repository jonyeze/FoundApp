import React from "react";
import "./About.css";

const About: React.FC = () => {
  return (
    <div className="about-container">
      <div>
        <h2 className="about-section-title">Nuestra Misión</h2>
        <p className="about-common-text">
          Enfrentarse a la pérdida de objetos personales puede ser una
          experiencia desafiante y estresante. En <span className="about-color-text">[Nombre de tu Sitio]</span>,
          entendemos la importancia de esos objetos en tu vida diaria. Nuestra
          misión es ofrecer apoyo a aquellos que han perdido sus pertenencias en
          la calle, ya sea un teléfono celular, una billetera u otros objetos
          personales.
        </p>
      </div>

      <h2 className="about-section-title">¿Cómo Funcionamos?</h2>
      <div className="about-functionality-section about-common-text">
        <div className="about-functionality-item about-bordertx1">
          <span className="about-bold about-text-orange">Reporta tu Pérdida:</span>{" "}
          Proporcionamos una plataforma sencilla y rápida para que informes
          sobre la pérdida de tus objetos. Cuéntanos los detalles para que
          podamos ayudarte mejor.
        </div>
        <div className="about-functionality-item about-bordertx2">
          <span className="about-bold about-text-purple">Colaboración Comunitaria:</span>{" "}
          Creamos un espacio donde la comunidad se une para ayudar a recuperar
          objetos perdidos. Compartimos información sobre pérdidas y hallazgos
          para facilitar la conexión entre propietarios y personas que han
          encontrado objetos perdidos.
        </div>
      </div>

      <div>
        <h2 className="about-section-title">Únete a Nosotros</h2>
        <p className="about-common-text">
          En <span className="about-color-text">[Nombre de tu Sitio]</span>, creemos en la fuerza de la comunidad para
          hacer una diferencia. Únete a nosotros y forma parte de esta red
          solidaria. Juntos, podemos hacer que la experiencia de perder un
          objeto sea un poco menos abrumadora.
        </p>
        <p className="about-text-white about-common-text">
          ¡Gracias por confiar en nosotros para ayudarte a recuperar lo que es
          tuyo!
        </p>
      </div>
    </div>
  );
};

export default About;
