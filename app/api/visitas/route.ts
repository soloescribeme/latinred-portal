import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

function obtenerBandera(codigoPais: string): string {
  if (!codigoPais || codigoPais.length !== 2 || codigoPais === 'OT' || codigoPais === 'XX') {
    return '🌐';
  }
  try {
    const codePoints = codigoPais
      .toUpperCase()
      .split('')
      .map((char) => 127397 + char.charCodeAt(0));
    return String.fromCodePoint(...codePoints);
  } catch (e) {
    return '🌐';
  }
}

const NOMBRES_PAISES: Record<string, string> = {
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

// Base inicial exacta comenzando en 1000 visitas
const PAISES_INICIALES = [
  { codigo: 'EC', nombre: 'Ecuador', visitas: 580 },
  { codigo: 'CO', nombre: 'Colombia', visitas: 180 },
  { codigo: 'PE', nombre: 'Perú', visitas: 90 },
  { codigo: 'US', nombre: 'Estados Unidos', visitas: 60 },
  { codigo: 'ES', nombre: 'España', visitas: 40 },
  { codigo: 'MX', nombre: 'México', visitas: 30 },
  { codigo: 'AR', nombre: 'Argentina', visitas: 20 },
].map((p) => ({
  ...p,
  bandera: obtenerBandera(p.codigo),
}));

let memoriaVisitasTotal = 1000;
let memoriaPaises = [...PAISES_INICIALES];

async function ejecutarSql(query: string, params: any[] = []) {
  const databaseUrl =
    process.env.DATABASE_URL ||
    'postgresql://neondb_owner:npg_oAkpVQtM2dY7@ep-calm-morning-ac8e6m5u.sa-east-1.aws.neon.tech/neondb?sslmode=require';
  try {
    const res = await fetch('https://ep-calm-morning-ac8e6m5u.sa-east-1.aws.neon.tech/sql', {
      method: 'POST',
      headers: {
        'Neon-Connection-String': databaseUrl,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ query, params }),
      cache: 'no-store',
    });
    if (!res.ok) {
      return null;
    }
    const data = await res.json();
    return Array.isArray(data) ? data : (data.rows || []);
  } catch (err) {
    return null;
  }
}

async function inicializarTablas() {
  try {
    await ejecutarSql(`
      CREATE TABLE IF NOT EXISTS latinred_visitas (
        id INT PRIMARY KEY DEFAULT 1,
        total_visitas INT DEFAULT 1000
      );
    `);

    await ejecutarSql(`
      CREATE TABLE IF NOT EXISTS latinred_visitas_paises (
        codigo VARCHAR(10) PRIMARY KEY,
        nombre VARCHAR(100) NOT NULL,
        bandera VARCHAR(10) NOT NULL,
        visitas INT DEFAULT 1,
        actualizado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);
  } catch (e) {
    console.warn('Inicializacion visitas latinred:', e);
  }
}

let tablasInicializadas = false;

export async function GET(request: Request) {
  try {
    let countryParam = '';
    try {
      const url = new URL(request.url, 'https://latinred.app');
      countryParam = (url.searchParams.get('country') || '').toUpperCase().trim();
    } catch (e) {}

    const headerCountry = (
      request.headers.get('x-vercel-ip-country') ||
      request.headers.get('cf-ipcountry') ||
      request.headers.get('x-country-code') ||
      countryParam ||
      'EC'
    ).toUpperCase();

    const nombrePais = NOMBRES_PAISES[headerCountry] || (headerCountry === 'XX' || !headerCountry ? 'Internacional' : `País (${headerCountry})`);
    const banderaPais = obtenerBandera(headerCountry);
    const codigoPais = NOMBRES_PAISES[headerCountry] ? headerCountry : 'OT';

    if (!tablasInicializadas) {
      await inicializarTablas();
      tablasInicializadas = true;
    }

    let totalVisitas = memoriaVisitasTotal;
    let listaPaises = memoriaPaises;

    try {
      // Incrementar visita total en base de datos
      const resTotal = await ejecutarSql(`
        UPDATE latinred_visitas SET total_visitas = total_visitas + 1 WHERE id = 1 RETURNING total_visitas;
      `);
      if (resTotal && resTotal[0]?.total_visitas) {
        totalVisitas = parseInt(resTotal[0].total_visitas, 10);
      }

      await ejecutarSql(
        `
        INSERT INTO latinred_visitas_paises (codigo, nombre, bandera, visitas, actualizado_en)
        VALUES ($1, $2, $3, 1, CURRENT_TIMESTAMP)
        ON CONFLICT (codigo) DO UPDATE 
        SET visitas = latinred_visitas_paises.visitas + 1,
            actualizado_en = CURRENT_TIMESTAMP;
      `,
        [codigoPais, nombrePais, banderaPais]
      );

      const resPaises = await ejecutarSql(`
        SELECT codigo, nombre, bandera, visitas 
        FROM latinred_visitas_paises 
        ORDER BY visitas DESC 
        LIMIT 15;
      `);

      if (resPaises && resPaises.length > 0) {
        listaPaises = resPaises.map((r: any) => ({
          codigo: r.codigo,
          nombre: NOMBRES_PAISES[r.codigo] || r.nombre,
          bandera: obtenerBandera(r.codigo),
          visitas: parseInt(r.visitas, 10),
        }));
      }
    } catch (dbErr) {
      memoriaVisitasTotal += 1;
      totalVisitas = memoriaVisitasTotal;
      const index = memoriaPaises.findIndex((p) => p.codigo === codigoPais);
      if (index >= 0) {
        memoriaPaises[index].visitas += 1;
      } else {
        memoriaPaises.push({
          codigo: codigoPais,
          nombre: nombrePais,
          bandera: banderaPais,
          visitas: 1,
        });
      }
      memoriaPaises.sort((a, b) => b.visitas - a.visitas);
      listaPaises = memoriaPaises;
    }

    const paisesConPorcentaje = listaPaises.map((item) => {
      const pct = totalVisitas > 0 ? (item.visitas / totalVisitas) * 100 : 0;
      return {
        ...item,
        porcentaje: parseFloat(pct.toFixed(1)),
      };
    });

    return NextResponse.json(
      {
        success: true,
        total_visitas: totalVisitas,
        pais_actual: {
          codigo: codigoPais,
          nombre: nombrePais,
          bandera: banderaPais,
        },
        paises: paisesConPorcentaje,
      },
      {
        headers: {
          'Cache-Control': 'no-store, max-age=0',
        },
      }
    );
  } catch (error) {
    return NextResponse.json(
      {
        success: true,
        total_visitas: memoriaVisitasTotal,
        pais_actual: { codigo: 'EC', nombre: 'Ecuador', bandera: '🇪🇨' },
        paises: memoriaPaises.map((p) => ({ ...p, porcentaje: 10 })),
      },
      { status: 200 }
    );
  }
}
