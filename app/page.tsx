'use client';

import { useState } from 'react';
import { ArrowRight, Trophy, Ticket, Landmark, ShoppingBag, Sparkles, X, Clock } from 'lucide-react';

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
      btnColor: 'from-amber-500 via-rose-500 to-pink-600 hover:from-amber-400 hover:to-rose-500 shadow-rose-950/50',
      icono: Ticket
    },
    {
      id: 'qfutbol',
      nombre: 'Qfutbol',
      explicacion: 'App para gestión total de campeonatos',
      url: 'https://qfutbol.vercel.app',
      imagen: '/qfutbol-logo.jpg',
      enDesarrollo: false,
      btnColor: 'from-emerald-500 via-teal-500 to-cyan-600 hover:from-emerald-400 hover:to-teal-500 shadow-emerald-950/50',
      icono: Trophy
    },
    {
      id: 'qcajas',
      nombre: 'Qcajas',
      explicacion: 'App para gestión de cajas de ahorro y crédito',
      url: '#',
      imagen: null, // Logotipo vectorial estilizado
      enDesarrollo: true,
      btnColor: 'from-amber-500 via-yellow-500 to-orange-600 hover:from-amber-400 hover:to-yellow-500 shadow-amber-950/50',
      icono: Landmark
    },
    {
      id: 'qvendes',
      nombre: 'Qvendes',
      explicacion: 'Sitio de compra y venta',
      url: '#',
      imagen: null, // Logotipo vectorial estilizado
      enDesarrollo: true,
      btnColor: 'from-purple-500 via-indigo-500 to-blue-600 hover:from-purple-400 hover:to-indigo-500 shadow-purple-950/50',
      icono: ShoppingBag
    }
  ];

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 selection:bg-rose-500 selection:text-white flex flex-col justify-between items-center relative overflow-hidden py-8 px-4 sm:px-8">
      
      {/* LUCES Y GLOW DE FONDO */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[500px] bg-gradient-to-tr from-rose-600/20 via-amber-500/15 to-indigo-600/20 blur-[140px] rounded-full pointer-events-none -z-10" />

      {/* ENCABEZADO MINIMALISTA CON LOGO LATINRED CENTRADO */}
      <header className="w-full max-w-7xl flex items-center justify-center pt-2 pb-6">
        <div className="flex flex-col items-center gap-2">
          <img 
            src="/logo latinred.png" 
            alt="LatinRed Logo" 
            className="h-20 sm:h-24 w-auto object-contain drop-shadow-[0_0_25px_rgba(225,29,72,0.3)]"
          />
        </div>
      </header>

      {/* MODAL DE AVISO "PRÓXIMAMENTE" PARA APPS EN DESARROLLO */}
      {appModal && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-md z-50 flex items-center justify-center p-4">
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
              Estamos preparando la primera versión oficial de <strong className="text-white">{appModal.nombre}</strong> para integrarla a nuestro ecosistema LatinRed. ¡Muy pronto estará disponible!
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

      {/* GRID PRINCIPAL DE APLICACIONES DIRECTAS */}
      <section className="w-full max-w-7xl my-auto py-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 items-stretch">
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
                className="bg-slate-900/60 border border-slate-800 hover:border-slate-600 rounded-3xl p-6 sm:p-8 flex flex-col items-center justify-between shadow-2xl hover:shadow-[0_0_40px_rgba(225,29,72,0.15)] transition-all duration-300 group hover:-translate-y-2 relative overflow-hidden backdrop-blur-md text-center cursor-pointer"
              >
                {/* DECORACIÓN GLOW AL PASAR EL MOUSE */}
                <div className="absolute inset-0 bg-gradient-to-b from-white/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

                {/* BADGE SI ESTÁ EN DESARROLLO */}
                {app.enDesarrollo && (
                  <span className="absolute top-3 right-3 bg-amber-500/20 text-amber-400 border border-amber-500/30 text-[9px] font-black uppercase px-2.5 py-0.5 rounded-full z-10 shadow">
                    ⚡ Próximamente
                  </span>
                )}

                {/* LOGO GIGANTE Y CENTRADO */}
                <div className="w-44 h-44 sm:w-48 sm:h-48 rounded-3xl bg-slate-950/80 border border-slate-800 p-4 flex items-center justify-center overflow-hidden shadow-2xl group-hover:scale-105 group-hover:border-slate-700 transition-all duration-300 my-auto">
                  {app.imagen ? (
                    <img 
                      src={app.imagen} 
                      alt={`Logo ${app.nombre}`} 
                      className="w-full h-full object-contain filter drop-shadow-md"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-indigo-500/20 via-purple-500/10 to-transparent rounded-2xl flex flex-col items-center justify-center text-indigo-400 p-4">
                      <IconComponent className="w-16 h-16 mb-2 drop-shadow-lg" />
                      <span className="text-lg font-black uppercase tracking-tighter text-indigo-300">{app.nombre}</span>
                    </div>
                  )}
                </div>

                {/* NOMBRE DE LA APP, EXPLICACIÓN CORTA Y BOTÓN DE ACCESO DIRECTO */}
                <div className="w-full space-y-4 pt-6 mt-4 border-t border-slate-850/80">
                  <div>
                    <h2 className="text-3xl font-black text-white uppercase tracking-tight">
                      {app.nombre}
                    </h2>
                    <p className="text-xs font-semibold text-slate-300 mt-1">
                      {app.explicacion}
                    </p>
                  </div>

                  <div className={`w-full bg-gradient-to-r ${app.btnColor} text-white font-black text-sm uppercase tracking-wider py-4 rounded-2xl flex items-center justify-center gap-2 shadow-xl transition-all group-hover:shadow-2xl`}>
                    <span>{app.enDesarrollo ? 'Ver Estado' : `Ingresar a ${app.nombre}`}</span>
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1.5 transition-transform duration-300" />
                  </div>
                </div>
              </a>
            );
          })}
        </div>
      </section>

      {/* FOOTER ULTRA MINIMALISTA */}
      <footer className="w-full max-w-7xl pt-6 pb-2 text-center text-xs text-slate-500 font-medium">
        <p>© {new Date().getFullYear()} LatinRed Apps Ecosystem. Todos los derechos reservados.</p>
      </footer>

    </main>
  );
}
