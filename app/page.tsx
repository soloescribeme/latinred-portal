import { ArrowRight, Trophy, Ticket, Landmark } from 'lucide-react';

export default function Home() {
  const apps = [
    {
      id: 'qrifas',
      nombre: 'Qrifas',
      subdominio: 'qrifas.latinred.app',
      url: 'https://qrifas.com',
      imagen: '/qrifas-logo.png',
      badge: '🔴 Tómbola En Vivo',
      badgeColor: 'bg-rose-500/10 text-rose-400 border-rose-500/30',
      btnColor: 'from-amber-500 via-rose-500 to-pink-600 hover:from-amber-400 hover:to-rose-500 shadow-rose-950/50',
      icono: Ticket
    },
    {
      id: 'qfutbol',
      nombre: 'Qfutbol',
      subdominio: 'qfutbol.latinred.app',
      url: 'https://qfutbol.latinred.app',
      imagen: '/qfutbol-logo.jpg',
      badge: '⚽ Campeonatos de Fútbol',
      badgeColor: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30',
      btnColor: 'from-emerald-500 via-teal-500 to-cyan-600 hover:from-emerald-400 hover:to-teal-500 shadow-emerald-950/50',
      icono: Trophy
    },
    {
      id: 'qcajas',
      nombre: 'Qcajas',
      subdominio: 'qcajas.latinred.app',
      url: 'https://qcajas.latinred.app',
      imagen: null, // Logotipo vectorial estilizado
      badge: '🏦 Cajas de Ahorro & Crédito',
      badgeColor: 'bg-amber-500/10 text-amber-400 border-amber-500/30',
      btnColor: 'from-amber-500 via-yellow-500 to-orange-600 hover:from-amber-400 hover:to-yellow-500 shadow-amber-950/50',
      icono: Landmark
    }
  ];

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 selection:bg-rose-500 selection:text-white flex flex-col justify-between items-center relative overflow-hidden py-8 px-4 sm:px-8">
      
      {/* LUGES Y GLOW DE FONDO */}
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

      {/* GRID PRINCIPAL DE APLICACIONES DIRECTAS (LOGOS GIGANTES Y CENTRADOS) */}
      <section className="w-full max-w-6xl my-auto py-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-10 items-stretch">
          {apps.map((app) => {
            return (
              <a
                key={app.id}
                href={app.url}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-slate-900/60 border border-slate-800 hover:border-slate-600 rounded-3xl p-8 flex flex-col items-center justify-between shadow-2xl hover:shadow-[0_0_40px_rgba(225,29,72,0.15)] transition-all duration-300 group hover:-translate-y-2 relative overflow-hidden backdrop-blur-md text-center"
              >
                {/* DECORACIÓN GLOW AL PASAR EL MOUSE */}
                <div className="absolute inset-0 bg-gradient-to-b from-white/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

                {/* LOGO GIGANTE Y CENTRADO */}
                <div className="w-48 h-48 sm:w-56 sm:h-56 rounded-3xl bg-slate-950/80 border border-slate-800 p-4 flex items-center justify-center overflow-hidden shadow-2xl group-hover:scale-105 group-hover:border-slate-700 transition-all duration-300 my-auto">
                  {app.imagen ? (
                    <img 
                      src={app.imagen} 
                      alt={`Logo ${app.nombre}`} 
                      className="w-full h-full object-contain filter drop-shadow-md"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-amber-500/20 via-orange-500/10 to-transparent rounded-2xl flex flex-col items-center justify-center text-amber-400 p-4">
                      <Landmark className="w-20 h-20 mb-2 drop-shadow-lg" />
                      <span className="text-xl font-black uppercase tracking-tighter text-amber-300">QCajas</span>
                    </div>
                  )}
                </div>

                {/* NOMBRE DE LA APP Y BOTÓN DE ACCESO DIRECTO */}
                <div className="w-full space-y-4 pt-6 mt-4 border-t border-slate-850/80">
                  <div>
                    <h2 className="text-3xl font-black text-white uppercase tracking-tight">
                      {app.nombre}
                    </h2>
                    <span className="text-xs font-mono text-slate-400 font-bold block mt-1">
                      {app.subdominio}
                    </span>
                  </div>

                  <div className={`w-full bg-gradient-to-r ${app.btnColor} text-white font-black text-sm uppercase tracking-wider py-4 rounded-2xl flex items-center justify-center gap-2 shadow-xl transition-all group-hover:shadow-2xl`}>
                    <span>Ingresar a {app.nombre}</span>
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
