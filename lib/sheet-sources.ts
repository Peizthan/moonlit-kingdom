import 'server-only';
import type { SheetSource } from './sheet';

// Explicit, approved sources. No editor-page scraping or arbitrary remote URLs.
export const sheetSources = {
  budget: {
    id: '19oh3G4ShAIgGQdotny-xmqVFFDqWB4RfuIc-qOM0gaE',
    tabs: [
      { gid: '0', title: 'Presupuesto General', headers: ['RUBRO', 'DESCRIPCIÓN', 'PROVEEDOR', 'CANT', 'COSTO UNITARIO', 'COSTO TOTAL', 'PAGADO', 'SALDO'], numericColumns: [3, 4, 5, 6, 7] },
      { gid: '1977807231', title: 'Cálculos Adicionales', headers: ['Ítem', 'precio x unidad (persona/botella)', 'Cantidad (persona/botella)', 'Costo Parcial'], numericColumns: [1, 2, 3] },
    ],
  },
  guests: {
    id: '1q-qY5tuCD2DYBV3QNZEwOcKOAHfVImdV1D2hKk0sa0o',
    tabs: [
      { gid: '1098821553', title: 'Invitados', headers: ['Lista', 'Grupo', 'Invitado(s)', 'Invitación enviada', 'Confirmado', 'Incluye Pareja', 'alimentación alternativa', 'WhatsApp', 'Fecha de envío', 'Mesa asignada', 'Adulto/menor', 'Pareja o familia'], numericColumns: [] },
      { gid: '733132389', title: 'Resumen', headers: ['Indicador', 'Cantidad'], numericColumns: [1] },
    ],
  },
} satisfies Record<SheetSource, { id: string; tabs: { gid: string; title: string; headers: string[]; numericColumns: number[] }[] }>;
