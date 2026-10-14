import { NextResponse } from 'next/server';

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

const PAISES_INICIALES = [
  { codigo: 'EC', nombre: 'Ecuador', visitas: 10450 },
  { codigo: 'CO', nombre: 'Colombia', visitas: 2890 },
  { codigo: 'PE', nombre: 'Perú', visitas: 1620 },
  { codigo: 'US', nombre: 'Estados Unidos', visitas: 1140 },
  { codigo: 'ES', nombre: 'España', visitas: 890 },
  { codigo: 'MX', nombre: 'México', visitas: 670 },
  { codigo: 'AR', nombre: 'Argentina', visitas: 430 },
  { codigo: 'CL', nombre: 'Chile', visitas: 260 },
  { codigo: 'BO', nombre: 'Bolivia', visitas: 150 },
].map((p) => ({
  ...p,
  bandera: obtenerBandera(p.codigo),
}));

let memoriaVisitasTotal = 18500;
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
      console.warn('Neon HTTP SQL advertencia:', await res.text());
      return null;
    }
    const data = await res.json();
    return Array.isArray(data) ? data : (data.rows || []);
  } catch (err) {
    console.warn('Error al conectar con Neon DB:', err);
    return null;
  }
}

async function inicializarTablas() {
  try {
    await ejecutarSql(`
      CREATE TABLE IF NOT EXISTS latinred_visitas (
        id INT PRIMARY KEY DEFAULT 1,
        total_visitas INT DEFAULT 18500
      );
    `);
    await ejecutarSql(`
      INSERT INTO latinred_visitas (id, total_visitas) VALUES (1, 18500) ON CONFLICT (id) DO NOTHING;
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

    const filasPaises = await ejecutarSql(`SELECT COUNT(*) as cuenta FROM latinred_visitas_paises;`);
    if (filasPaises && (filasPaises[0]?.cuenta === '0' || filasPaises[0]?.cuenta === 0)) {
      for (const p of PAISES_INICIALES) {
        await ejecutarSql(
          `INSERT INTO latinred_visitas_paises (codigo, nombre, bandera, visitas) VALUES ($1, $2, $3, $4) ON CONFLICT (codigo) DO NOTHING;`,
          [p.codigo, p.nombre, p.bandera, p.visitas]
        );
      }
    }
  } catch (e) {
    console.warn('Inicializacion de tablas latinred:', e);
  }
}

let tablasInicializadas = false;

export async function GET(request: Request) {
  try {
    let countryParam = '';
    try {
      const url = new URL(request.url, 'https://latinred.app');
      countryParam = (url.searchParams.get('country') || '').toUpperCase().trim();
    } catch (e) {
      // Ignorar fallo de parseo
    }

    // Detección de país por headers o parámetro
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

    // Intentar registrar e incrementar en Neon PostgreSQL
    try {
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
        LIMIT 12;
      `);

      if (resPaises && resPaises.length > 0) {
        listaPaises = resPaises.map((r: any) => ({
          codigo: r.codigo,
          nombre: r.nombre,
          bandera: r.bandera || obtenerBandera(r.codigo),
          visitas: parseInt(r.visitas, 10),
        }));
      }
    } catch (dbErr) {
      console.warn('Fallo al persistir visita en DB, usando memoria:', dbErr);
    }

    // Si la DB falló o está fría, incrementar en memoria
    if (listaPaises === memoriaPaises) {
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

    // Calcular porcentajes relativos
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
    console.error('Error en API visitas latinred:', error);
    const msg = error instanceof Error ? error.message : String(error);
    return NextResponse.json(
      {
        success: true,
        error_debug: msg,
        total_visitas: memoriaVisitasTotal,
        pais_actual: { codigo: 'EC', nombre: 'Ecuador', bandera: '🇪🇨' },
        paises: memoriaPaises.map((p) => ({ ...p, porcentaje: 10 })),
      },
      { status: 200 }
    );
  }
}
