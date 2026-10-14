'use client';

import { useState, useEffect } from 'react';
import { 
  ArrowRight, 
  Trophy, 
  Ticket, 
  Landmark, 
  ShoppingBag, 
  Truck, 
  Compass, 
  Store, 
  X, 
  Clock 
} from 'lucide-react';

interface PaisStat {
  codigo: string;
  nombre: string;
  bandera: string;
  visitas: number;
  porcentaje: number;
}

function flagFromCode(code: string): string {
  if (!code || code.length !== 2) return '🌐';
  try {
    const codePoints = code.toUpperCase().split('').map((c) => 127397 + c.charCodeAt(0));
    return String.fromCodePoint(...codePoints);
  } catch (e) {
    return '🌐';
  }
}

const NOMBRES_PAISES_MAP: Record<string, string> = {
  EC: 'Ecuador',
  CO: 'Colombia',
  PE: 'Perú',
  US: 'Estados Unidos',
  ES: 'España',
  MX: 'México',
  AR: 'Argentina',
  CL: 'Chile',
  BO: 'Bolivia',
  VE: 'Venezuela',
  BR: 'Brasil',
  PA: 'Panamá',
  UY: 'Uruguay',
  PY: 'Paraguay',
  CR: 'Costa Rica',
  DO: 'Rep. Dominicana',
  GT: 'Guatemala',
  IT: 'Italia',
  CA: 'Canadá',
  DE: 'Alemania',
  FR: 'Francia',
};

export default function Home() {
  const [appModal, setAppModal] = useState<{ nombre: string; explicacion: string } | null>(null);

  // Estados del Contador
  const [visitasTotal, setVisitasTotal] = useState<number | null>(null);
  const [paisesVisitas, setPaisesVisitas] = useState<PaisStat[]>([]);
  const [cargandoVisitas, setCargandoVisitas] = useState<boolean>(true);

  useEffect(() => {
    let montado = true;
    async function cargarEstadisticas() {
      try {
        let tzCountry = '';
        try {
          const tz = Intl.DateTimeFormat().resolvedOptions().timeZone || '';
          if (tz.includes('Guayaquil') || tz.includes('Galapagos')) tzCountry = 'EC';
          else if (tz.includes('Bogota')) tzCountry = 'CO';
          else if (tz.includes('Lima')) tzCountry = 'PE';
          else if (tz.includes('Madrid')) tzCountry = 'ES';
          else if (tz.includes('Mexico')) tzCountry = 'MX';
          else if (tz.includes('Buenos_Aires')) tzCountry = 'AR';
          else if (tz.includes('Santiago')) tzCountry = 'CL';
        } catch (e) {}

        const query = tzCountry ? `?country=${tzCountry}` : '';
        const url = `/api/visitas${query}`;
        const res = await fetch(url, { cache: 'no-store' });
        if (res.ok) {
          const data = await res.json();
          if (montado && (data.total_visitas !== undefined || data.success)) {
            setVisitasTotal(data.total_visitas);
            setPaisesVisitas(data.paises || []);
          }
        }
      } catch (err) {
        console.warn('Error al consultar visitas:', err);
      } finally {
        if (montado) setCargandoVisitas(false);
      }
    }

    cargarEstadisticas();
    return () => {
      montado = false;
    };
  }, []);

  const apps = [
    {
      id: 'qvendes',
      nombre: 'Qvendes',
      explicacion: 'Sitio de compra y venta',
      url: 'https://qvendes.latinred.app',
      imagen: '/qvendes-logo.jpg',
      enDesarrollo: false,
      btnColor: 'from-purple-500 via-indigo-500 to-blue-600',
      icono: ShoppingBag
    },
    {
      id: 'qrifas',
      nombre: 'Qrifas',
      explicacion: 'App para organizar rifas',
      url: 'https://qrifas.latinred.app',
      imagen: '/qrifas-logo.png',
      enDesarrollo: false,
      btnColor: 'from-amber-500 via-rose-500 to-pink-600',
      icono: Ticket
    },
    {
      id: 'qfutbol',
      nombre: 'Qfutbol',
      explicacion: 'Gestión total de campeonatos',
      url: 'https://qfutbol.latinred.app',
      imagen: '/qfutbol-logo.jpg',
      enDesarrollo: false,
      btnColor: 'from-emerald-500 via-teal-500 to-cyan-600',
      icono: Trophy
    },
    {
      id: 'qcajas',
      nombre: 'Qcajas',
      explicacion: 'Cajas de ahorro y crédito',
      url: 'https://qcajas.latinred.app',
      imagen: null,
      enDesarrollo: true,
      btnColor: 'from-amber-500 via-yellow-500 to-orange-600',
      icono: Landmark
    },
    {
      id: 'kmiones',
      nombre: 'Kmiones',
      explicacion: 'Transporte de carga pesada',
      url: 'https://kmiones.latinred.app',
      imagen: null,
      enDesarrollo: true,
      btnColor: 'from-orange-500 via-amber-600 to-red-600',
      icono: Truck
    },
    {
      id: 'qaventura',
      nombre: 'Qaventura',
      explicacion: 'Destinos y hospedajes turísticos',
      url: 'https://qaventura.latinred.app',
      imagen: null,
      enDesarrollo: true,
      btnColor: 'from-emerald-500 via-teal-600 to-blue-600',
      icono: Compass
    },
    {
      id: 'qtiendas',
      nombre: 'Qtiendas',
      explicacion: 'Directorio de tiendas recomendadas',
      url: 'https://qtiendas.latinred.app',
      imagen: null,
      enDesarrollo: true,
      btnColor: 'from-rose-500 via-pink-600 to-purple-600',
      icono: Store
    }
  ];

  const totalApps = apps.length;
  const radiusDesktop = 340;

  // Lista de países para la marquesina
  const listaPaisesMarquesina = paisesVisitas.length > 0 ? paisesVisitas : [
    { codigo: 'EC', nombre: 'Ecuador', visitas: 580 },
    { codigo: 'CO', nombre: 'Colombia', visitas: 180 },
    { codigo: 'PE', nombre: 'Perú', visitas: 90 },
    { codigo: 'US', nombre: 'Estados Unidos', visitas: 60 },
    { codigo: 'ES', nombre: 'España', visitas: 40 },
    { codigo: 'MX', nombre: 'México', visitas: 30 },
    { codigo: 'AR', nombre: 'Argentina', visitas: 20 },
  ];

  const itemsMarquesina = listaPaisesMarquesina.map((p) => {
    const flag = flagFromCode(p.codigo);
    const name = NOMBRES_PAISES_MAP[p.codigo] || p.nombre;
    return `${flag} ${name}: ${p.visitas.toLocaleString()}`;
  });

  const bloqueTexto = itemsMarquesina.join('     •     ');
  const textoMarquesina = `${bloqueTexto}     •     ${bloqueTexto}`;

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-between items-center relative overflow-hidden font-sans selection:bg-rose-500 selection:text-white p-4 sm:p-6 lg:p-8">
      
      {/* MODAL PARA APPS EN DESARROLLO */}
      {appModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-sm w-full p-6 text-center shadow-2xl relative">
            <button
              onClick={() => setAppModal(null)}
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-full transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="w-16 h-16 bg-rose-500/10 border border-rose-500/20 text-rose-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Clock className="w-8 h-8 animate-pulse" />
            </div>
            <h3 className="text-xl font-black text-white uppercase tracking-wider mb-2">
              {appModal.nombre}
            </h3>
            <p className="text-sm font-semibold text-rose-400 mb-3">
              {appModal.explicacion}
            </p>
            <div className="bg-slate-950/60 border border-slate-800/80 rounded-xl p-3 text-xs text-slate-300">
              Estamos trabajando intensamente en el lanzamiento de esta aplicación. ¡Muy pronto estará disponible en el ecosistema LatinRed!
            </div>
            <button
              onClick={() => setAppModal(null)}
              className="mt-5 w-full py-2.5 rounded-xl font-bold text-xs uppercase bg-slate-800 hover:bg-slate-700 text-white transition-all shadow-md"
            >
              Entendido
            </button>
          </div>
        </div>
      )}

      {/* EFECTOS DE FONDO */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-rose-600/10 blur-[150px] rounded-full pointer-events-none -z-10" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-indigo-600/10 blur-[130px] rounded-full pointer-events-none -z-10" />

      {/* VERSIÓN ESCRITORIO (ÓRBITA 360) */}
      <div className="hidden lg:flex relative w-[760px] h-[760px] my-auto items-center justify-center">
        {/* LÍNEAS DE ÓRBITA */}
        <div className="absolute w-[680px] h-[680px] rounded-full border border-dashed border-slate-800/80 pointer-events-none" />
        <div className="absolute w-[685px] h-[685px] rounded-full border border-slate-800/60 pointer-events-none" />

        {/* LOGO DE LATINRED CENTRADO */}
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

        {/* TARJETAS DE APPS EN ÓRBITA 360 */}
        {apps.map((app, index) => {
          const IconComponent = app.icono;
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
        <div className="flex flex-col items-center justify-center text-center p-6 bg-slate-950/90 border border-slate-800 rounded-full w-48 h-48 shadow-[0_0_50px_rgba(225,29,72,0.25)] ring-1 ring-rose-500/30">
          <img 
            src="/logo latinred.png" 
            alt="LatinRed Logo" 
            className="h-20 w-auto object-contain"
          />
        </div>

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

      {/* FOOTER SENCILLO E INFORMATIVO */}
      <footer className="w-full max-w-6xl mx-auto pt-6 pb-4 px-4 z-10 text-xs">
        
        {/* Fila: Derechos a la izquierda • Visitas totales en texto plano a la derecha */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-2 border-t border-slate-800/80 pt-3">
          <p className="text-slate-500 text-[11px] font-medium text-center sm:text-left">
            © {new Date().getFullYear()} LatinRed Apps Ecosystem. Todos los derechos reservados.
          </p>

          {/* Esquina derecha: Visitas totales en texto plano */}
          <div className="text-slate-300 text-xs flex items-center gap-1.5 self-center sm:self-auto font-medium">
            <span className="text-slate-400">Visitas totales:</span>
            <span className="text-white font-mono font-bold tracking-tight">
              {cargandoVisitas && visitasTotal === null ? '1,000' : (visitasTotal || 1000).toLocaleString()}
            </span>
          </div>
        </div>

        {/* Debajo en una sola línea: Marquesina que corra un texto con los países que nos han visitado */}
        <div className="w-full mt-2.5 bg-slate-900/60 border border-slate-800/80 rounded-xl px-3 py-1.5 overflow-hidden flex items-center gap-2">
          <span className="text-[10px] uppercase font-bold text-rose-400 whitespace-nowrap hidden sm:inline-block">
            Países visitantes:
          </span>
          {/* @ts-ignore */}
          <marquee className="text-xs text-slate-300 font-medium tracking-wide" scrollamount="4">
            {textoMarquesina}
          </marquee>
        </div>

      </footer>

    </main>
  );
}
