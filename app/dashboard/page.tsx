'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { weddingData } from '@/data/wedding-data';
import { useExchangeRate } from '@/lib/useExchangeRate';
import { useBudget } from '@/lib/useBudget';
import { AdminProvider, useEditableList, genId } from '@/lib/AdminContext';
import { AdminToolbar } from '@/components/ui/AdminToolbar';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { OrnamentalDivider } from '@/components/ui/OrnamentalDivider';
import { MetricCard } from '@/components/ui/MetricCard';
import { TimelineBlock } from '@/components/ui/TimelineBlock';
import { BudgetTable } from '@/components/ui/BudgetTable';
import { VendorTable } from '@/components/ui/VendorTable';
import { RiskTable } from '@/components/ui/RiskTable';
import { DecisionLogTable } from '@/components/ui/DecisionLogTable';
import { NotesPanel } from '@/components/ui/NotesPanel';
import { ActionItemsPanel } from '@/components/planning/ActionItemsPanel';
import { SeatingPlan } from '@/components/planning/SeatingPlan';
import { TechnicalPlan } from '@/components/planning/TechnicalPlan';
import {
  Calendar,
  Users,
  DollarSign,
  CheckSquare,
  MessageSquare,
  BookOpen,
  AlertTriangle,
  Zap,
  Layout,
} from 'lucide-react';
import type { Vendor, BudgetCategory, ActionItem, MeetingNote, Decision, RiskItem, SeatingTable, TechnicalItem } from '@/lib/types';

const { couple, vendors, actionItems, meetingNotes, decisions, risks, seating, technical, timeline } =
  weddingData;

// These are static fallback values; live totals are computed inside DashboardContent from useBudget

function formatCurrency(n: number, rate: number = 1) {
  return new Intl.NumberFormat('es-PY', { style: 'currency', currency: 'PYG', maximumFractionDigits: 0 }).format(
    Math.round(n * rate),
  );
}

type TabId =
  | 'overview'
  | 'timeline'
  | 'vendors'
  | 'budget'
  | 'actions'
  | 'notes'
  | 'decisions'
  | 'risks'
  | 'seating'
  | 'technical';

const tabs: { id: TabId; label: string; icon: React.ReactNode }[] = [
  { id: 'overview', label: 'Resumen', icon: <Layout size={14} /> },
  { id: 'timeline', label: 'Programa', icon: <Calendar size={14} /> },
  { id: 'vendors', label: 'Proveedores', icon: <Users size={14} /> },
  { id: 'budget', label: 'Presupuesto', icon: <DollarSign size={14} /> },
  { id: 'actions', label: 'Acciones', icon: <CheckSquare size={14} /> },
  { id: 'notes', label: 'Actas', icon: <MessageSquare size={14} /> },
  { id: 'decisions', label: 'Decisiones', icon: <BookOpen size={14} /> },
  { id: 'risks', label: 'Riesgos', icon: <AlertTriangle size={14} /> },
  { id: 'seating', label: 'Ubicación', icon: <Users size={14} /> },
  { id: 'technical', label: 'Técnico', icon: <Zap size={14} /> },
];

export default function DashboardPage() {
  return (
    <AdminProvider>
      <DashboardContent />
    </AdminProvider>
  );
}

function DashboardContent() {
  const [activeTab, setActiveTab] = useState<TabId>('overview');
  const { rate, updatedAt, loading: rateLoading, fallback: rateFallback } = useExchangeRate();
  const { budget: budgetSource, loading: budgetLoading, error: budgetError, fromSheet } = useBudget();

  const vendorsList = useEditableList<Vendor>('vendors', vendors);
  const budgetList = useEditableList<BudgetCategory>('budget', budgetSource);
  const actionsList = useEditableList<ActionItem>('actions', actionItems);
  const notesList = useEditableList<MeetingNote>('notes', meetingNotes);
  const decisionsList = useEditableList<Decision>('decisions', decisions);
  const risksList = useEditableList<RiskItem>('risks', risks);
  const seatingList = useEditableList<SeatingTable>('seating', seating);
  const technicalList = useEditableList<TechnicalItem>('technical', technical);

  function addVendor() {
    vendorsList.addItem({
      id: genId('vendor'),
      role: 'Nuevo rol',
      company: 'Nueva empresa',
      contact: '',
      email: '',
      phone: '',
      status: 'enquiry',
      contractSigned: false,
      depositPaid: false,
    });
  }

  function addBudgetItem() {
    budgetList.addItem({
      id: genId('budget'),
      category: 'Nueva categoría',
      subcategory: 'Nuevo ítem',
      estimated: 0,
      status: 'pending',
    });
  }

  function addAction() {
    actionsList.addItem({
      id: genId('action'),
      title: 'Nueva acción',
      owner: '',
      dueDate: '',
      priority: 'medium',
      status: 'not-started',
      category: 'General',
    });
  }

  function addNote() {
    notesList.addItem({
      id: genId('note'),
      date: new Date().toLocaleDateString('es-PY'),
      title: 'Nueva acta',
      attendees: [],
      summary: '',
      decisions: [],
      actionItems: [],
    });
  }

  function addDecision() {
    decisionsList.addItem({
      id: genId('decision'),
      date: new Date().toLocaleDateString('es-PY'),
      category: 'General',
      decision: 'Nueva decisión',
      decidedBy: '',
      status: 'provisional',
    });
  }

  function addRisk() {
    risksList.addItem({
      id: genId('risk'),
      risk: 'Nuevo riesgo',
      category: 'General',
      likelihood: 'medium',
      impact: 'medium',
      mitigation: '',
      owner: '',
      status: 'open',
    });
  }

  function addTable() {
    const nextNumber = seatingList.items.reduce((max, t) => Math.max(max, t.tableNumber), 0) + 1;
    seatingList.addItem({
      id: genId('seating'),
      tableName: 'Nueva mesa',
      tableNumber: nextNumber,
      capacity: 8,
      guests: [],
    });
  }

  function addTechnicalItem() {
    technicalList.addItem({
      id: genId('tech'),
      category: 'General',
      item: 'Nuevo ítem',
      quantity: 1,
      status: 'tbc',
    });
  }

  const totalBudget = budgetList.items.reduce((s, b) => s + b.estimated, 0);
  const confirmedVendors = vendorsList.items.filter((v) => v.status === 'confirmed').length;
  const openActions = actionsList.items.filter((a) => a.status !== 'complete').length;
  const completedActions = actionsList.items.filter((a) => a.status === 'complete').length;

  return (
    <div
      className="min-h-screen"
      style={{ background: 'linear-gradient(160deg, #10261D 0%, #121C2E 100%)' }}
    >
      {/* Header */}
      <div
        className="pt-24 pb-10 px-6 border-b"
        style={{ borderColor: 'rgba(176,141,87,0.15)' }}
      >
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <p className="text-xs uppercase tracking-[0.35em] mb-3" style={{ color: 'rgba(176,141,87,0.6)' }}>
              Panel de Planificación
            </p>
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <h1
                  className="text-3xl md:text-4xl font-light mb-1"
                  style={{ fontFamily: "'Georgia', serif", color: '#D8C3A5' }}
                >
                  Moonlit Kingdom
                </h1>
                <p className="text-sm" style={{ color: '#8E8A86' }}>
                  {couple.partner1} & {couple.partner2} · {couple.weddingDate} · {couple.location}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs" style={{ color: '#8E8A86' }}>Actualizado {couple.lastUpdated}</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Tab navigation */}
      <div
        className="sticky top-16 z-30 border-b overflow-x-auto no-print"
        style={{
          background: 'rgba(16,38,29,0.95)',
          borderColor: 'rgba(176,141,87,0.12)',
          backdropFilter: 'blur(12px)',
        }}
      >
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex gap-0 min-w-max">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className="flex items-center gap-2 px-4 py-4 text-xs uppercase tracking-[0.15em] border-b-2 transition-all duration-300 whitespace-nowrap"
                style={{
                  color: activeTab === tab.id ? '#B08D57' : '#8E8A86',
                  borderBottomColor: activeTab === tab.id ? '#B08D57' : 'transparent',
                }}
              >
                {tab.icon}
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* OVERVIEW */}
        {activeTab === 'overview' && (
          <motion.div
            key="overview"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <SectionHeader
              eyebrow="De un Vistazo"
              title="Resumen del Proyecto"
              subtitle="Métricas clave y estado general de la producción de la boda Moonlit Kingdom."
              align="left"
            />

            {/* Metric cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
              <MetricCard
                label="Presupuesto Total"
                value={rateLoading ? '…' : formatCurrency(totalBudget, rate)}
                subValue="Estimado en guaranías"
                delay={0}
              />
              <MetricCard
                label="Proveedores Confirmados"
                value={`${confirmedVendors}/${vendors.length}`}
                subValue="Firmados y confirmados"
                delay={0.08}
              />
              <MetricCard
                label="Acciones Abiertas"
                value={openActions}
                subValue={`${completedActions} completadas`}
                delay={0.16}
                accentColor="#8C6A3C"
              />
              <MetricCard
                label="Días para la Boda"
                value={getDaysUntil('2027-08-21')}
                subValue="21 de agosto de 2027"
                delay={0.24}
              />
            </div>

            <OrnamentalDivider variant="star" />

            {/* Quick action items */}
            <div className="mt-10">
              <h3
                className="text-lg font-light mb-6 uppercase tracking-[0.15em]"
                style={{ color: '#B08D57' }}
              >
                Acciones de Alta Prioridad
              </h3>
              <ActionItemsPanel
                items={actionsList.items.filter((a) => a.priority === 'high' && a.status !== 'complete')}
                onDelete={actionsList.removeItem}
              />
            </div>

            <OrnamentalDivider variant="moon" className="mt-12" />

            {/* Open risks */}
            <div className="mt-10">
              <h3
                className="text-lg font-light mb-6 uppercase tracking-[0.15em]"
                style={{ color: '#B08D57' }}
              >
                Riesgos Abiertos
              </h3>
              <RiskTable risks={risksList.items.filter((r) => r.status === 'open')} onDelete={risksList.removeItem} />
            </div>
          </motion.div>
        )}

        {/* TIMELINE */}
        {activeTab === 'timeline' && (
          <motion.div
            key="timeline"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <SectionHeader
              eyebrow="Programa del Día"
              title="Cronograma de la Boda"
              subtitle="Programa completo para el 21 de agosto de 2027 en Salón Veteranos, Club Centenario."
              align="left"
            />
            <div
              className="rounded-sm border p-6 md:p-10"
              style={{
                borderColor: 'rgba(176,141,87,0.15)',
                background: 'rgba(18,28,46,0.3)',
              }}
            >
              <TimelineBlock events={timeline} />
            </div>
          </motion.div>
        )}

        {/* VENDORS */}
        {activeTab === 'vendors' && (
          <motion.div
            key="vendors"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <SectionHeader
              eyebrow="Directorio de Proveedores"
              title="Contactos"
              subtitle={`${confirmedVendors} proveedores confirmados. ✓ = Contrato firmado / Seña pagada.`}
              align="left"
            />
            <div
              className="rounded-sm border overflow-hidden"
              style={{
                borderColor: 'rgba(176,141,87,0.15)',
                background: 'rgba(18,28,46,0.3)',
              }}
            >
              <VendorTable vendors={vendorsList.items} onAdd={addVendor} onDelete={vendorsList.removeItem} />
            </div>
          </motion.div>
        )}

        {/* BUDGET */}
        {activeTab === 'budget' && (
          <motion.div
            key="budget"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex flex-wrap items-end justify-between gap-4 mb-10">
              <div>
                <p className="text-xs uppercase tracking-[0.3em] mb-2" style={{ color: 'rgba(176,141,87,0.6)' }}>
                  Resumen Financiero
                </p>
                <h2
                  className="text-3xl font-light"
                  style={{ fontFamily: "'Georgia', serif", color: '#D8C3A5' }}
                >
                  Desglose del Presupuesto
                </h2>
              </div>
              <div
                className="text-right px-6 py-3 rounded-sm border"
                style={{ borderColor: 'rgba(176,141,87,0.25)', background: 'rgba(176,141,87,0.06)' }}
              >
                <p className="text-xs uppercase tracking-widest mb-1" style={{ color: 'rgba(176,141,87,0.5)' }}>
                  Total Estimado
                </p>
                <p
                  className="text-2xl font-light"
                  style={{ fontFamily: "'Georgia', serif", color: '#B08D57' }}
                >
                  {rateLoading || budgetLoading ? '…' : formatCurrency(totalBudget, rate)}
                </p>
                {!rateLoading && (
                  <p className="text-xs mt-1" style={{ color: 'rgba(142,138,134,0.5)' }}>
                    ₳{rate.toLocaleString('es-PY')} / USD
                    {rateFallback ? ' (estimado)' : updatedAt ? ' · actualizado' : ''}
                  </p>
                )}
                <p className="text-xs mt-1" style={{ color: fromSheet ? 'rgba(176,141,87,0.5)' : 'rgba(142,138,134,0.4)' }}>
                  {budgetLoading ? 'Cargando planilla…' : fromSheet ? '✓ Desde Google Sheets' : budgetError ? '⚠ Usando datos locales' : ''}
                </p>
              </div>
            </div>
            <div
              className="rounded-sm border overflow-hidden"
              style={{
                borderColor: 'rgba(176,141,87,0.15)',
                background: 'rgba(18,28,46,0.3)',
              }}
            >
              <BudgetTable items={budgetList.items} rate={rate} onAdd={addBudgetItem} onDelete={budgetList.removeItem} />
            </div>
          </motion.div>
        )}

        {/* ACTIONS */}
        {activeTab === 'actions' && (
          <motion.div
            key="actions"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <SectionHeader
              eyebrow="Gestión de Tareas"
              title="Acciones a Realizar"
              subtitle={`${openActions} acciones abiertas · ${completedActions} completadas`}
              align="left"
            />
            <ActionItemsPanel items={actionsList.items} onAdd={addAction} onDelete={actionsList.removeItem} />
          </motion.div>
        )}

        {/* NOTES */}
        {activeTab === 'notes' && (
          <motion.div
            key="notes"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <SectionHeader
              eyebrow="Documentación"
              title="Actas de Reunión"
              subtitle={`${notesList.items.length} reuniones registradas`}
              align="left"
            />
            <NotesPanel notes={notesList.items} onAdd={addNote} onDelete={notesList.removeItem} />
          </motion.div>
        )}

        {/* DECISIONS */}
        {activeTab === 'decisions' && (
          <motion.div
            key="decisions"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <SectionHeader
              eyebrow="Registro de Decisiones"
              title="Decisiones Confirmadas"
              subtitle="Todas las decisiones clave registradas con fundamento y estado."
              align="left"
            />
            <DecisionLogTable decisions={decisionsList.items} onAdd={addDecision} onDelete={decisionsList.removeItem} />
          </motion.div>
        )}

        {/* RISKS */}
        {activeTab === 'risks' && (
          <motion.div
            key="risks"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <SectionHeader
              eyebrow="Registro de Riesgos"
              title="Gestión de Riesgos"
              subtitle={`${risksList.items.filter((r) => r.status === 'open').length} riesgos abiertos · ${risksList.items.filter((r) => r.status === 'mitigated').length} mitigados`}
              align="left"
            />
            <RiskTable risks={risksList.items} onAdd={addRisk} onDelete={risksList.removeItem} />
          </motion.div>
        )}

        {/* SEATING */}
        {activeTab === 'seating' && (
          <motion.div
            key="seating"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <SectionHeader
              eyebrow="Gestión de Invitados"
              title="Plan de Ubicación"
              subtitle={`${seatingList.items.length} mesas · ${seatingList.items.reduce((s, t) => s + t.guests.length, 0)} invitados ubicados`}
              align="left"
            />
            <SeatingPlan tables={seatingList.items} onAdd={addTable} onDelete={seatingList.removeItem} />
          </motion.div>
        )}

        {/* TECHNICAL */}
        {activeTab === 'technical' && (
          <motion.div
            key="technical"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <SectionHeader
              eyebrow="Producción"
              title="Producción Técnica"
              subtitle="Cronograma completo de AV, electricidad y equipamiento del equipo."
              align="left"
            />
            <div
              className="rounded-sm border overflow-hidden"
              style={{
                borderColor: 'rgba(176,141,87,0.15)',
                background: 'rgba(18,28,46,0.3)',
              }}
            >
              <TechnicalPlan items={technicalList.items} onAdd={addTechnicalItem} onDelete={technicalList.removeItem} />
            </div>
          </motion.div>
        )}

        {/* Bottom padding so content clears the fixed AdminToolbar */}
        <div className="h-16" />
      </div>
      <AdminToolbar />
    </div>
  );
}

function getDaysUntil(dateStr: string): number {
  const target = new Date(dateStr);
  const today = new Date();
  const diff = target.getTime() - today.getTime();
  return Math.max(0, Math.ceil(diff / (1000 * 60 * 60 * 24)));
}
