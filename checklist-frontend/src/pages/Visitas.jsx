import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import api from '../services/api';

export default function Visitas() {
  const [searchParams] = useSearchParams();
  const filtroInicial = searchParams.get('filtro') || 'TODAS';
  const [filtro, setFiltro] = useState(filtroInicial);
  const [visitas, setVisitas] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const navigate = useNavigate();
  const hoje = new Date().toLocaleDateString('en-CA');

  useEffect(() => { carregarVisitas(); }, []);

  async function carregarVisitas() {
    try {
      const { data } = await api.get('/visitas');
      setVisitas(data);
    } finally {
      setCarregando(false);
    }
  }

  async function iniciarVisita(id) {
    await api.patch(`/visitas/${id}/iniciar`);
    carregarVisitas();
  }

  async function finalizarVisita(id) {
    await api.patch(`/visitas/${id}/finalizar`);
    carregarVisitas();
  }

  async function deletarVisita(id) {
    if (!confirm('Deseja excluir esta visita?')) return;
    await api.delete(`/visitas/${id}`);
    carregarVisitas();
  }

  const visitasFiltradas = visitas.filter(v => {
    if (filtro === 'HOJE') return v.dataVisita === hoje;
    if (filtro === 'PENDENTE') return v.status === 'PENDENTE';
    if (filtro === 'EM_ANDAMENTO') return v.status === 'EM_ANDAMENTO';
    if (filtro === 'CONCLUIDA') return v.status === 'CONCLUIDA';
    return true; // TODAS
  });

  const corStatus = {
    PENDENTE: '#f59e0b',
    EM_ANDAMENTO: '#4f46e5',
    CONCLUIDA: '#10b981',
    CANCELADA: '#ef4444',
  };

  const contadores = {
    TODAS: visitas.length,
    HOJE: visitas.filter(v => v.dataVisita === hoje).length,
    PENDENTE: visitas.filter(v => v.status === 'PENDENTE').length,
    EM_ANDAMENTO: visitas.filter(v => v.status === 'EM_ANDAMENTO').length,
    CONCLUIDA: visitas.filter(v => v.status === 'CONCLUIDA').length,
  };

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <button onClick={() => navigate('/dashboard')} style={styles.voltar}>← Voltar</button>
        <h1 style={styles.titulo}>📋 Visitas</h1>
        <button style={styles.btnNova} onClick={() => navigate('/visitas/nova')}>
          + Nova Visita
        </button>
      </header>

      {/* Filtros */}
      <div style={styles.filtros}>
        {[
          { key: 'TODAS', label: '📋 Todas' },
          { key: 'HOJE', label: '📅 Hoje' },
          { key: 'PENDENTE', label: '⏳ Pendentes' },
          { key: 'EM_ANDAMENTO', label: '▶ Em Andamento' },
          { key: 'CONCLUIDA', label: '✅ Concluídas' },
        ].map(f => (
          <button
            key={f.key}
            style={{
              ...styles.filtroBotao,
              backgroundColor: filtro === f.key ? '#4f46e5' : '#fff',
              color: filtro === f.key ? '#fff' : '#333',
            }}
            onClick={() => setFiltro(f.key)}
          >
            {f.label} ({contadores[f.key]})
          </button>
        ))}
      </div>

      <main style={styles.main}>
        {carregando ? (
          <p style={styles.msg}>Carregando...</p>
        ) : visitasFiltradas.length === 0 ? (
          <p style={styles.msg}>Nenhuma visita encontrada.</p>
        ) : (
          visitasFiltradas.map((v) => (
            <div key={v.id} style={styles.card}>
              <div style={styles.cardHeader}>
                <div>
                  <p style={styles.supermercado}>{v.supermercado?.nome}</p>
                  <p style={styles.info}>
                    👤 {v.promotor?.nome} &nbsp;|&nbsp;
                    🏭 {v.industria?.nome} &nbsp;|&nbsp;
                    📅 {new Date(v.dataVisita + 'T12:00:00').toLocaleDateString('pt-BR')}
                    {v.dataVisita === hoje && (
                      <span style={styles.badgeHoje}> HOJE</span>
                    )}
                  </p>
                </div>
                <span style={{ ...styles.status, backgroundColor: corStatus[v.status] }}>
                  {v.status.replace('_', ' ')}
                </span>
              </div>

              {v.observacaoGeral && (
                <p style={styles.obs}>💬 {v.observacaoGeral}</p>
              )}

              <div style={styles.acoes}>
                {v.status === 'PENDENTE' && (
                  <button style={styles.btnIniciar} onClick={() => iniciarVisita(v.id)}>
                    ▶ Iniciar
                  </button>
                )}
                {v.status === 'EM_ANDAMENTO' && (
                  <>
                    <button style={styles.btnChecklist}
                      onClick={() => navigate(`/visitas/${v.id}/checklist`)}>
                      📝 Checklist
                    </button>
                    <button style={styles.btnFinalizar} onClick={() => finalizarVisita(v.id)}>
                      ✅ Finalizar
                    </button>
                  </>
                )}
                {v.status === 'CONCLUIDA' && (
                  <button style={styles.btnChecklist}
                    onClick={() => navigate(`/visitas/${v.id}/checklist`)}>
                    👁 Ver Checklist
                  </button>
                )}
                <button style={styles.btnDeletar} onClick={() => deletarVisita(v.id)}>
                  🗑 Excluir
                </button>
              </div>
            </div>
          ))
        )}
      </main>
    </div>
  );
}

const styles = {
  container: { minHeight: '100vh', backgroundColor: '#f0f2f5' },
  header: {
    backgroundColor: '#1a1a2e', color: '#fff', padding: '14px 28px',
    display: 'flex', alignItems: 'center', gap: '16px',
  },
  voltar: {
    background: 'transparent', border: '1px solid #fff', color: '#fff',
    padding: '6px 12px', borderRadius: '6px', cursor: 'pointer',
  },
  titulo: { margin: 0, fontSize: '20px', flex: 1 },
  btnNova: {
    backgroundColor: '#4f46e5', color: '#fff', border: 'none',
    padding: '8px 18px', borderRadius: '8px', cursor: 'pointer', fontWeight: '600',
  },
  filtros: {
    display: 'flex', gap: '10px', padding: '16px 28px',
    backgroundColor: '#fff', borderBottom: '1px solid #eee',
    flexWrap: 'wrap',
  },
  filtroBotao: {
    border: '1px solid #ddd', padding: '8px 16px', borderRadius: '20px',
    cursor: 'pointer', fontWeight: '500', fontSize: '13px',
  },
  main: { padding: '28px', maxWidth: '900px', margin: '0 auto' },
  msg: { textAlign: 'center', color: '#888', marginTop: '40px' },
  card: {
    backgroundColor: '#fff', borderRadius: '10px', padding: '20px',
    marginBottom: '16px', boxShadow: '0 2px 8px rgba(0,0,0,0.07)',
  },
  cardHeader: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' },
  supermercado: { fontSize: '18px', fontWeight: '700', color: '#1a1a2e', margin: '0 0 4px' },
  info: { color: '#666', fontSize: '13px', margin: 0 },
  badgeHoje: {
    backgroundColor: '#4f46e5', color: '#fff', padding: '2px 8px',
    borderRadius: '10px', fontSize: '11px', fontWeight: '700',
  },
  status: {
    color: '#fff', padding: '4px 12px', borderRadius: '20px',
    fontSize: '12px', fontWeight: '600', whiteSpace: 'nowrap',
  },
  obs: { color: '#555', fontSize: '14px', margin: '12px 0 0', fontStyle: 'italic' },
  acoes: { display: 'flex', gap: '10px', marginTop: '16px', flexWrap: 'wrap' },
  btnIniciar: {
    backgroundColor: '#4f46e5', color: '#fff', border: 'none',
    padding: '8px 16px', borderRadius: '6px', cursor: 'pointer', fontWeight: '600',
  },
  btnChecklist: {
    backgroundColor: '#e0e7ff', color: '#4f46e5', border: 'none',
    padding: '8px 16px', borderRadius: '6px', cursor: 'pointer', fontWeight: '600',
  },
  btnFinalizar: {
    backgroundColor: '#10b981', color: '#fff', border: 'none',
    padding: '8px 16px', borderRadius: '6px', cursor: 'pointer', fontWeight: '600',
  },
  btnDeletar: {
    backgroundColor: '#fee2e2', color: '#ef4444', border: 'none',
    padding: '8px 16px', borderRadius: '6px', cursor: 'pointer', fontWeight: '600',
    marginLeft: 'auto',
  },
};