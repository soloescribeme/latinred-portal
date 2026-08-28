'use client';

import { useState } from 'react';
import { ArrowRight, Trophy, Ticket, Landmark, ShoppingBag, Truck, Compass, Store, X, Clock } from 'lucide-react';

export default function Home() {
  const [appModal, setAppModal] = useState<{ nombre: string; explicacion: string } | null>(null);

  const apps = [
    {
      id: 'qrifas',
      nombre: 'Qrifas',
      explicacion: 'App para organizar rifas',
      url: 'https://qrifas.com',
      imagen: '/qrifas-logo.png',
      enDesarrollo: false,
      btnColor: 'from-amber-500 via-rose-500 to-pink-600',
      icono: Ticket
    },
    {
      id: 'qfutbol',
      nombre: 'Qfutbol',
      explicacion: 'Gestión total de campeonatos',
      url: 'https://qfutbol.vercel.app',
      imagen: '/qfutbol-logo.jpg',
      enDesarrollo: false,
      btnColor: 'from-emerald-500 via-teal-500 to-cyan-600',
      icono: Trophy
    },
    {
      id: 'qcajas',
      nombre: 'Qcajas',
      explicacion: 'Cajas de ahorro y crédito',
      url: '#',
      imagen: null,
      enDesarrollo: true,
      btnColor: 'from-amber-500 via-yellow-500 to-orange-600',
      icono: Landmark
    },
    {
      id: 'qvendes',
      nombre: 'Qvendes',
      explicacion: 'Sitio de compra y venta',
      url: '#',
      imagen: null,
      enDesarrollo: true,
      btnColor: 'from-purple-500 via-indigo-500 to-blue-600',
      icono: ShoppingBag
    },
    {
      id: 'kmiones',
      nombre: 'Kmiones',
      explicacion: 'Transporte de carga',
      url: '#',
      imagen: null,
      enDesarrollo: true,
      btnColor: 'from-orange-500 via-amber-600 to-red-600',
      icono: Truck
    },
    {
      id: 'qaventura',
      nombre: 'Qaventura',
      explicacion: 'Destinos y hospedajes',
      url: '#',
      imagen: null,
      enDesarrollo: true,
      btnColor: 'from-emerald-500 via-teal-600 to-blue-600',
      icono: Compass
    },
    {
      id: 'qtiendas',
      nombre: 'Qtiendas',
      explicacion: 'Tiendas recomendadas',
      url: '#',
      imagen: null,
      enDesarrollo: true,
      btnColor: 'from-rose-500 via-pink-600 to-purple-600',
      icono: Store
    }
  ];

  // CÁLCULO TRIGONOMÉTRICO PARA DISPOSICIÓN CIRCULAR EN ESCRITORIO
  const totalApps = apps.length;
  const radiusDesktop = 340; // Radio del círculo en px para pantallas grandes

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 selection:bg-rose-500 selection:text-white flex flex-col justify-between items-center relative overflow-hidden py-6 px-4">
      
      {/* LUCES Y GLOW DE FONDO AMBIENTAL */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] bg-gradient-to-tr from-rose-600/20 via-amber-500/15 to-indigo-600/20 blur-[150px] rounded-full pointer-events-none -z-10" />

      {/* MODAL DE AVISO "PRÓXIMAMENTE" */}
      {appModal && (
        <div className="fixed inset-0 bg-slate-950/85 backdrop-blur-md z-50 flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 p-8 rounded-3xl max-w-md w-full text-center space-y-6 shadow-2xl animate-in fade-in zoom-in duration-200 relative">
            <button 
              type="button" 
              onClick={() => setAppModal(null)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white p-2 rounded-xl bg-slate-800/50 border border-slate-700"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="w-20 h-20 bg-amber-500/10 border border-amber-500/30 rounded-3xl flex items-center justify-center text-amber-400 mx-auto shadow-lg">
              <Clock className="w-10 h-10 animate-pulse" />
            </div>

            <div className="space-y-2">
              <span className="bg-amber-500/20 text-amber-400 text-[10px] font-black uppercase px-3 py-1 rounded-full border border-amber-500/30">
                ⚡ Próximamente en Lanzamiento
              </span>
              <h3 className="text-3xl font-black text-white uppercase">{appModal.nombre}</h3>
              <p className="text-xs text-slate-300 font-semibold">{appModal.explicacion}</p>
            </div>

            <p className="text-xs text-slate-400 bg-slate-950 p-4 rounded-2xl border border-slate-850">
              Estamos preparando la versión oficial de <strong className="text-white">{appModal.nombre}</strong> para integrarla a nuestro ecosistema LatinRed. ¡Muy pronto estará disponible!
            </p>

            <button
              type="button"
              onClick={() => setAppModal(null)}
              className="w-full bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs uppercase py-3.5 rounded-xl border border-slate-700 transition-all"
            >
              Entendido
            </button>
          </div>
        </div>
      )}

      {/* CONTENEDOR CIRCULAR ORBITAL (DESKTOP) */}
      <div className="my-auto relative w-full max-w-6xl h-[820px] hidden lg:flex items-center justify-center">
        
        {/* LÍNEA DE ÓRBITA CIRCULAR DECORATIVA */}
        <div className="absolute w-[680px] h-[680px] rounded-full border border-dashed border-rose-500/20 animate-[spin_120s_linear_infinite] pointer-events-none" />
        <div className="absolute w-[685px] h-[685px] rounded-full border border-slate-800/60 pointer-events-none" />

        {/* LOGO DE LATINRED CENTRADO (NÚCLEO PRINCIPAL) */}
        <div className="z-20 flex flex-col items-center justify-center text-center p-6 bg-slate-950/90 border border-slate-800/80 rounded-full w-64 h-64 shadow-[0_0_60px_rgba(225,29,72,0.25)] ring-1 ring-rose-500/30 backdrop-blur-xl">
          <img 
            src="/logo latinred.png" 
            alt="LatinRed Logo" 
            className="h-28 w-auto object-contain drop-shadow-[0_0_20px_rgba(225,29,72,0.4)] transition-all hover:scale-105"
          />
          <span className="text-[10px] font-black uppercase text-slate-400 tracking-widest mt-2 block">
            Ecosistema Digital
          </span>
        </div>

        {/* TARJETAS DE APPS EN ÓRBITA 360 PERFECCIONADA */}
        {apps.map((app, index) => {
          const IconComponent = app.icono;

          // Ángulo comenzando desde arriba (-90 grados o -PI/2)
          const angle = (index * (2 * Math.PI)) / totalApps - Math.PI / 2;
          const x = Math.cos(angle) * radiusDesktop;
          const y = Math.sin(angle) * radiusDesktop;

          const handleClick = (e: React.MouseEvent) => {
            if (app.enDesarrollo) {
              e.preventDefault();
              setAppModal({ nombre: app.nombre, explicacion: app.explicacion });
            }
          };

          return (
            <div
              key={app.id}
              style={{
                transform: `translate(${x}px, ${y}px)`,
              }}
              className="absolute transition-all duration-500 hover:z-30"
            >
              <a
                href={app.url}
                onClick={handleClick}
                target={app.enDesarrollo ? '_self' : '_blank'}
                rel="noopener noreferrer"
                className="w-44 bg-slate-900/80 border border-slate-800 hover:border-rose-500/50 p-4 rounded-3xl flex flex-col items-center text-center shadow-2xl hover:shadow-[0_0_35px_rgba(225,29,72,0.25)] transition-all duration-300 group hover:scale-110 backdrop-blur-md relative"
              >
                {/* LOGO O ICONO COMPACTO DE LA APP */}
                <div className="w-24 h-24 rounded-2xl bg-slate-950 border border-slate-800 p-2 flex items-center justify-center overflow-hidden shadow-inner group-hover:border-slate-700 transition-all">
                  {app.imagen ? (
                    <img 
                      src={app.imagen} 
                      alt={`Logo ${app.nombre}`} 
                      className="w-full h-full object-contain filter drop-shadow-md"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-indigo-500/20 via-purple-500/10 to-transparent rounded-xl flex flex-col items-center justify-center text-indigo-400">
                      <IconComponent className="w-10 h-10 drop-shadow-md" />
                    </div>
                  )}
                </div>

                {/* DETALLES DE LA APP */}
                <div className="mt-3 space-y-1 w-full">
                  <div className="flex items-center justify-center gap-1">
                    <h2 className="text-base font-black text-white uppercase tracking-tight">
                      {app.nombre}
                    </h2>
                    {app.enDesarrollo && (
                      <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
                    )}
                  </div>
                  
                  <p className="text-[10px] font-medium text-slate-300 line-clamp-2 leading-snug">
                    {app.explicacion}
                  </p>
                </div>

                {/* BOTÓN MÍNIMO */}
                <div className={`w-full mt-3 bg-gradient-to-r ${app.btnColor} text-white font-black text-[10px] uppercase py-2 rounded-xl flex items-center justify-center gap-1 shadow-md transition-all`}>
                  <span>{app.enDesarrollo ? 'Próximamente' : 'Ingresar'}</span>
                  <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                </div>
              </a>
            </div>
          );
        })}
      </div>

      {/* VERSIÓN RESPONSIVE (TABLET Y MÓVIL) */}
      <div className="w-full max-w-5xl my-auto py-6 flex flex-col items-center gap-8 lg:hidden">
        {/* NÚCLEO LATINRED MÓVIL */}
        <div className="flex flex-col items-center justify-center text-center p-6 bg-slate-950/90 border border-slate-800 rounded-full w-48 h-48 shadow-[0_0_50px_rgba(225,29,72,0.25)] ring-1 ring-rose-500/30">
          <img 
            src="/logo latinred.png" 
            alt="LatinRed Logo" 
            className="h-20 w-auto object-contain"
          />
        </div>

        {/* GRID ADAPTADO MÓVIL */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 w-full">
          {apps.map((app) => {
            const IconComponent = app.icono;
            const handleClick = (e: React.MouseEvent) => {
              if (app.enDesarrollo) {
                e.preventDefault();
                setAppModal({ nombre: app.nombre, explicacion: app.explicacion });
              }
            };

            return (
              <a
                key={app.id}
                href={app.url}
                onClick={handleClick}
                target={app.enDesarrollo ? '_self' : '_blank'}
                rel="noopener noreferrer"
                className="bg-slate-900/80 border border-slate-800 p-4 rounded-3xl flex flex-col items-center text-center shadow-xl backdrop-blur-md active:scale-95 transition-all"
              >
                <div className="w-20 h-20 rounded-2xl bg-slate-950 border border-slate-800 p-2 flex items-center justify-center overflow-hidden">
                  {app.imagen ? (
                    <img src={app.imagen} alt={`Logo ${app.nombre}`} className="w-full h-full object-contain" />
                  ) : (
                    <IconComponent className="w-8 h-8 text-indigo-400" />
                  )}
                </div>

                <div className="mt-2 space-y-0.5">
                  <h2 className="text-sm font-black text-white uppercase">{app.nombre}</h2>
                  <p className="text-[9px] text-slate-300 font-medium leading-tight">{app.explicacion}</p>
                </div>

                <div className={`w-full mt-2 bg-gradient-to-r ${app.btnColor} text-white font-black text-[9px] uppercase py-1.5 rounded-lg flex items-center justify-center gap-1`}>
                  <span>{app.enDesarrollo ? 'Próximamente' : 'Ingresar'}</span>
                </div>
              </a>
            );
          })}
        </div>
      </div>

      {/* FOOTER ULTRA MINIMALISTA */}
      <footer className="w-full max-w-7xl pt-4 pb-2 text-center text-xs text-slate-500 font-medium z-10">
        <p>© {new Date().getFullYear()} LatinRed Apps Ecosystem. Todos los derechos reservados.</p>
      </footer>

    </main>
  );
}
