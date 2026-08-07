import Image from 'next/image';
import { Sparkles, Trophy, Ticket, Landmark, ArrowRight, ShieldCheck, Zap, Globe, Layers } from 'lucide-react';

export default function Home() {
  const apps = [
    {
      id: 'qrifas',
      nombre: 'Qrifas',
      subdominio: 'qrifas.latinred.app',
      url: 'https://qrifas.latinred.app',
      descripcion: 'App para organizar y gestionar rifas y sorteos certificados con tómbola digital en vivo.',
      imagen: '/qrifas-logo.png',
      badge: '🔴 Tómbola En Vivo',
      badgeColor: 'bg-rose-500/10 text-rose-400 border-rose-500/30',
      btnColor: 'from-amber-500 via-rose-500 to-pink-600 hover:from-amber-400 hover:to-rose-500',
      icono: Ticket,
      caracteristicas: [
        'Tómbola digital interactiva 3D',
        'Transmisión en vivo y acta oficial PDF',
        'Reserva automática y manual de boletos',
        'Recargas y cobros por transferencia'
      ]
    },
    {
      id: 'qfutbol',
      nombre: 'Qfutbol',
      subdominio: 'qfutbol.latinred.app',
      url: 'https://qfutbol.latinred.app',
      descripcion: 'App para organizar y gestionar campeonatos de indor fútbol, vocales, tablas y goleadores.',
      imagen: '/qfutbol-logo.jpg',
      badge: '⚽ Campeonatos Indor & Fútbol',
      badgeColor: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30',
      btnColor: 'from-emerald-500 via-teal-500 to-cyan-600 hover:from-emerald-400 hover:to-teal-500',
      icono: Trophy,
      caracteristicas: [
        'Fixture automatizado de partidos',
        'Ficha digital de jugadores y vocales',
        'Tabla de posiciones en tiempo real',
        'Estadísticas de goleadores y tarjetas'
      ]
    },
    {
      id: 'qcajas',
      nombre: 'Qcajas',
      subdominio: 'qcajas.latinred.app',
      url: 'https://qcajas.latinred.app',
      descripcion: 'App para gestionar cajas de ahorro y crédito, préstamos, aportes y finanzas comunitarias.',
      imagen: null, // Generado vectorialmente
      badge: '🏦 Cajas de Ahorro & Crédito',
      badgeColor: 'bg-amber-500/10 text-amber-400 border-amber-500/30',
      btnColor: 'from-amber-500 via-yellow-500 to-orange-600 hover:from-amber-400 hover:to-yellow-500',
      icono: Landmark,
      caracteristicas: [
        'Control de depósitos y ahorros',
        'Gestión de créditos y préstamos',
        'Generación de estados de cuenta',
        'Auditoría y reportes para socios'
      ]
    }
  ];

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 selection:bg-rose-500 selection:text-white flex flex-col justify-between relative overflow-hidden">
      
      {/* GLOW DE FONDO */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gradient-to-tr from-rose-600/15 via-amber-500/10 to-indigo-600/15 blur-[120px] rounded-full pointer-events-none -z-10" />

      {/* ENCABEZADO / NAVBAR */}
      <header className="border-b border-slate-800/80 bg-slate-950/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 bg-gradient-to-tr from-rose-600 to-amber-500 rounded-2xl flex items-center justify-center shadow-lg shadow-rose-950/50 ring-1 ring-rose-400/30">
              <span className="font-black text-xl text-white tracking-tighter">LR</span>
            </div>
            <div>
              <span className="font-black text-xl tracking-tight text-white block leading-none">
                LatinRed <span className="text-rose-500 font-extrabold">.app</span>
              </span>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Ecosistema Tecnológico</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="bg-slate-900 border border-slate-800 px-3 py-1.5 rounded-full text-xs font-bold text-slate-300 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
              Servidores Activos 100%
            </span>
          </div>
        </div>
      </header>

      {/* SECCIÓN HERO */}
      <section className="pt-14 pb-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center space-y-6">
        <div className="inline-flex items-center gap-2 bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs font-black uppercase tracking-widest px-4 py-1.5 rounded-full shadow-inner">
          <Sparkles className="w-4 h-4" /> Plataforma Integrada de Aplicaciones Web
        </div>

        <h1 className="text-4xl sm:text-6xl font-black tracking-tight uppercase leading-tight max-w-4xl mx-auto">
          Tus Aplicaciones de <span className="bg-gradient-to-r from-rose-400 via-amber-400 to-emerald-400 bg-clip-text text-transparent">Negocios y Deportes</span> en Un Solo Lugar
        </h1>

        <p className="text-slate-400 text-sm sm:text-base max-w-2xl mx-auto font-medium">
          Bienvenido al hub de soluciones digitales de <strong className="text-slate-200">LatinRed</strong>. Selecciona la aplicación a la que deseas acceder para gestionar tus rifas, campeonatos de fútbol o cajas de ahorro.
        </p>
      </section>

      {/* CATÁLOGO PRINCIPAL DE APLICACIONES */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto pb-20 w-full">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {apps.map((app) => {
            const IconComponent = app.icono;

            return (
              <div 
                key={app.id} 
                className="bg-slate-900/60 border border-slate-850 rounded-3xl p-6 sm:p-8 flex flex-col justify-between shadow-2xl hover:border-slate-700 transition-all group hover:-translate-y-1 relative overflow-hidden backdrop-blur-sm"
              >
                {/* DECORACIÓN SUPERIOR DE TARJETA */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-rose-500/40 to-transparent opacity-0 group-hover:opacity-100 transition-all" />

                <div className="space-y-6">
                  {/* CABECERA CON LOGO E INDICADOR */}
                  <div className="flex items-start justify-between gap-4">
                    <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl bg-slate-950 border border-slate-800 p-2 flex items-center justify-center overflow-hidden shrink-0 shadow-lg group-hover:scale-105 transition-all">
                      {app.imagen ? (
                        <img 
                          src={app.imagen} 
                          alt={`Logo ${app.nombre}`} 
                          className="w-full h-full object-contain rounded-xl"
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-amber-500/20 to-orange-500/20 rounded-xl flex flex-col items-center justify-center text-amber-400 p-2 text-center">
                          <Landmark className="w-10 h-10 mb-1" />
                          <span className="text-[10px] font-black uppercase tracking-tighter">QCajas</span>
                        </div>
                      )}
                    </div>

                    <span className={`text-[10px] font-black uppercase tracking-wider px-3 py-1 rounded-full border ${app.badgeColor}`}>
                      {app.badge}
                    </span>
                  </div>

                  {/* TÍTULO Y DESCRIPCIÓN */}
                  <div className="space-y-2">
                    <h2 className="text-2xl font-black text-white uppercase tracking-tight flex items-center gap-2">
                      <IconComponent className="w-6 h-6 text-rose-400" />
                      {app.nombre}
                    </h2>
                    <p className="text-xs text-slate-300 font-medium leading-relaxed">
                      {app.descripcion}
                    </p>
                  </div>

                  {/* CARACTERÍSTICAS DESTACADAS */}
                  <div className="space-y-2 pt-2 border-t border-slate-850">
                    <span className="text-[10px] font-black uppercase text-slate-400 tracking-wider block">
                      Funcionalidades Clave:
                    </span>
                    <ul className="space-y-1.5 text-[11px] text-slate-300">
                      {app.caracteristicas.map((item, idx) => (
                        <li key={idx} className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-rose-500" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* BOTÓN Y ENLACE AL SUBDOMINIO */}
                <div className="pt-6 mt-6 border-t border-slate-850 space-y-3">
                  <span className="text-[10px] font-mono text-slate-400 font-bold block text-center uppercase tracking-wider">
                    🌐 {app.subdominio}
                  </span>

                  <a
                    href={app.url}
                    className={`w-full bg-gradient-to-r ${app.btnColor} text-white font-black text-xs uppercase tracking-wider py-4 rounded-2xl flex items-center justify-center gap-2 shadow-lg transition-all transform active:scale-95`}
                  >
                    <span>Ingresar a {app.nombre}</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-all" />
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* SECCIÓN DE GARANTÍAS DEL ECOSISTEMA */}
      <section className="border-t border-slate-850 bg-slate-950/60 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-6 text-center sm:text-left">
          <div className="flex items-center gap-4 p-4 rounded-2xl bg-slate-900/40 border border-slate-850">
            <ShieldCheck className="w-10 h-10 text-emerald-400 shrink-0" />
            <div>
              <h4 className="font-black text-sm uppercase text-white">Alta Seguridad</h4>
              <p className="text-xs text-slate-400">Bases de datos independientes y cifrado SSL en todos los subdominios.</p>
            </div>
          </div>

          <div className="flex items-center gap-4 p-4 rounded-2xl bg-slate-900/40 border border-slate-850">
            <Zap className="w-10 h-10 text-amber-400 shrink-0" />
            <div>
              <h4 className="font-black text-sm uppercase text-white">Velocidad Extrema</h4>
              <p className="text-xs text-slate-400">Infraestructura Vercel Serverless con respuesta en milisegundos.</p>
            </div>
          </div>

          <div className="flex items-center gap-4 p-4 rounded-2xl bg-slate-900/40 border border-slate-850">
            <Globe className="w-10 h-10 text-rose-400 shrink-0" />
            <div>
              <h4 className="font-black text-sm uppercase text-white">Disponibilidad 24/7</h4>
              <p className="text-xs text-slate-400">Accede a tus aplicaciones desde cualquier dispositivo móvil o PC.</p>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-slate-850 py-8 px-4 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>© {new Date().getFullYear()} LatinRed Apps Ecosystem. Todos los derechos reservados.</p>
          <div className="flex items-center gap-4 text-slate-400 font-bold">
            <span>qrifas.latinred.app</span>
            <span>•</span>
            <span>qfutbol.latinred.app</span>
            <span>•</span>
            <span>qcajas.latinred.app</span>
          </div>
        </div>
      </footer>

    </main>
  );
}
