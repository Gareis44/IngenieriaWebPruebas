import React from "react";
import { GraduationCap, BarChart2, Link2, FileText } from "lucide-react";
import "../components/Home.css";

export default function Home() {
  const buttons = [
    { 
      label: "CARRERA", 
      icon: <GraduationCap size={50} />, 
      link: "/carrera",
      subtitle: "Aprobaste 20/40 materias" 
    },
    { 
      label: "ESTADÍSTICAS", 
      icon: <BarChart2 size={50} />, 
      link: "/estadisticas",
      subtitle: "Promedio general: 7.5" 
    },
    { 
      label: "CORRELATIVAS", 
      icon: <Link2 size={50} />, 
      link: "/correlativas",
      subtitle: "2 materias bloqueadas" 
    },
    { 
      label: "PARCIALES", 
      icon: <FileText size={50} />, 
      link: "/parciales",
      subtitle: "Siguiente parcial: 28/08/2025" 
    },
  ];

  return (
    <div className="home-wrapper">
      {/* Título global */}
      <header className="home-header">
        <h1>INGENIERA EN INFORMÁTICA</h1>
      </header>

      {/* Contenedor de las tarjetas */}
      <main className="home-container">
        {buttons.map((btn, i) => (
          <button 
            key={i} 
            className="home-card" 
            onClick={() => window.location.href = btn.link}
          >
            {btn.icon}
            <span className="card-title">{btn.label}</span>
            <p className="card-subtitle">{btn.subtitle}</p>
          </button>
        ))}
      </main>
    </div>
  );
}
