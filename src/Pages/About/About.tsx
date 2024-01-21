import React from "react";
import "./About.css";

const About: React.FC = () => {
  return (
    <div className="container">
      <div>
        <h2 className="section-title">Nuestra Misión</h2>
        <p className="common-text">
          Enfrentarse a la pérdida de objetos personales puede ser una
          experiencia desafiante y estresante. En <span className="color-text">[Nombre de tu Sitio]</span>,
          entendemos la importancia de esos objetos en tu vida diaria. Nuestra
          misión es ofrecer apoyo a aquellos que han perdido sus pertenencias en
          la calle, ya sea un teléfono celular, una billetera u otros objetos
          personales.
        </p>
      </div>

      <h2 className="section-title">¿Cómo Funcionamos?</h2>
      <div className="functionality-section common-text">
        <div className="functionality-item bordertx1">
          <span className="bold text-orange">Reporta tu Pérdida:</span>{" "}
          Proporcionamos una plataforma sencilla y rápida para que informes
          sobre la pérdida de tus objetos. Cuéntanos los detalles para que
          podamos ayudarte mejor.
        </div>
        <div className="functionality-item bordertx2">
          <span className="bold text-purple">Colaboración Comunitaria:</span>{" "}
          Creamos un espacio donde la comunidad se une para ayudar a recuperar
          objetos perdidos. Compartimos información sobre pérdidas y hallazgos
          para facilitar la conexión entre propietarios y personas que han
          encontrado objetos perdidos.
        </div>
      </div>

      <div>
        <h2 className="section-title">Únete a Nosotros</h2>
        <p className="common-text">
          En <span className="color-text">[Nombre de tu Sitio]</span>, creemos en la fuerza de la comunidad para
          hacer una diferencia. Únete a nosotros y forma parte de esta red
          solidaria. Juntos, podemos hacer que la experiencia de perder un
          objeto sea un poco menos abrumadora.
        </p>
        <p className="text-white common-text">
          ¡Gracias por confiar en nosotros para ayudarte a recuperar lo que es
          tuyo!
        </p>
      </div>
    </div>
  );
};

export default About;
