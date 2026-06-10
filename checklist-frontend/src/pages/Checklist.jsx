import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../services/api';

export default function Checklist() {
  const { visitaId } = useParams();
  const navigate = useNavigate();
  const [visita, setVisita] = useState(null);
  const [itens, setItens] = useState([]);
  const [novaTarefa, setNovaTarefa] = useState('');
  const [carregando, setCarregando] = useState(true);
  const [fotoSelecionada, setFotoSelecionada] = useState({});

  useEffect(() => {
    carregarDados();
  }, []);

  async function carregarDados() {
    try {
      const [resVisita, resItens] = await Promise.all([
        api.get(`/visitas/${visitaId}`),
        api.get(`/itens-checklist/visita/${visitaId}`),
      ]);
      setVisita(resVisita.data);
      setItens(resItens.data);
    } finally {
      setCarregando(false);
    }
  }

  async function adicionarItem() {
    if (!novaTarefa.trim()) return;
    await api.post('/itens-checklist', {
      visitaId: Number(visitaId),
      tarefa: novaTarefa,
      ordem: itens.length + 1,
    });
    setNovaTarefa('');
    carregarDados();
  }

  async function concluirItem(id) {
    let urlFoto = null;

    if (fotoSelecionada[id]) {
      const formData = new FormData();
      formData.append('file', fotoSelecionada[id]);
      const { data } = await api.post('/uploads', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      urlFoto = data.url;
    }

    await api.patch(`/itens-checklist/${id}/concluir${urlFoto ? `?observacao=foto` : ''}`);

    if (urlFoto) {
      await api.put(`/itens-checklist/${id}`, {
        visitaId: Number(visitaId),
        tarefa: itens.find(i => i.id === id).tarefa,
        urlFoto: urlFoto,
      });
    }
    setFotoSelecionada(prev => ({ ...prev, [id]: null }));
    carregarDados();
  }

  async function deletarItem(id) {
    await api.delete(`/itens-checklist/${id}`);
    carregarDados();
  }

  const concluidos = itens.filter((i) => i.concluido).length;
  const total = itens.length;
  const progresso = total > 0 ? Math.round((concluidos / total) * 100) : 0;

  const corStatus = {
    PENDENTE: '#f59e0b',
    EM_ANDAMENTO: '#4f46e5',
    CONCLUIDA: '#10b981',
    CANCELADA: '#ef4444',
  };

  if (carregando) return <p style={{ padding: 40 }}>Carregando...</p>;

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <button onClick={() => navigate('/visitas')} style={styles.voltar}>← Voltar</button>
        <div>
          <h1 style={styles.titulo}>📝 {visita?.supermercado?.nome}</h1>
          <p style={styles.subtitulo}>
            👤 {visita?.promotor?.nome} &nbsp;|&nbsp;
            🏭 {visita?.industria?.nome} &nbsp;|&nbsp;
            📅 {new Date(visita?.dataVisita + 'T12:00:00').toLocaleDateString('pt-BR')}
          </p>
        </div>
        <span style={{ ...styles.status, backgroundColor: corStatus[visita?.status] }}>
          {visita?.status?.replace('_', ' ')}
        </span>
      </header>

      <main style={styles.main}>
        {/* Barra de progresso */}
        <div style={styles.progressoBox}>
          <div style={styles.progressoTopo}>
            <span style={styles.progressoLabel}>Progresso do checklist</span>
            <span style={styles.progressoNum}>{concluidos}/{total} itens — {progresso}%</span>
          </div>
          <div style={styles.progressoBarra}>
            <div style={{ ...styles.progressoFill, width: `${progresso}%` }} />
          </div>
        </div>

        {/* Adicionar item — só se não estiver concluída */}
        {visita?.status !== 'CONCLUIDA' && (
          <div style={styles.adicionarBox}>
            <input
              style={styles.input}
              placeholder="Nova tarefa... ex: Verificar validade dos produtos"
              value={novaTarefa}
              onChange={(e) => setNovaTarefa(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && adicionarItem()}
            />
            <button style={styles.btnAdicionar} onClick={adicionarItem}>
              + Adicionar
            </button>
          </div>
        )}

        {/* Lista de itens */}
        {itens.length === 0 ? (
          <p style={styles.vazio}>Nenhum item no checklist ainda.</p>
        ) : (
          itens.map((item) => (
            <div key={item.id} style={{
              ...styles.item,
              opacity: item.concluido ? 0.7 : 1,
              borderLeft: `4px solid ${item.concluido ? '#10b981' : '#e5e7eb'}`,
            }}>
              <div style={styles.itemEsquerda}>
                <span style={styles.itemIcon}>{item.concluido ? '✅' : '⬜'}</span>
                <div>
                  <p style={{
                    ...styles.itemTarefa,
                    textDecoration: item.concluido ? 'line-through' : 'none',
                    color: item.concluido ? '#888' : '#1a1a2e',
                  }}>
                    {item.tarefa}
                  </p>
                  {item.observacao && (
                    <p style={styles.itemObs}>💬 {item.observacao}</p>
                  )}
                </div>
              </div>

              <div style={styles.itemAcoes}>
                {!item.concluido && visita?.status !== 'CONCLUIDA' && (
                  <>
                    <label style={styles.btnFoto}>
                      📷
                      <input
                        type="file"
                        accept="image/*"
                        style={{ display: 'none' }}
                        onChange={(e) => setFotoSelecionada(prev => ({
                          ...prev,
                          [item.id]: e.target.files[0]
                        }))}
                      />
                    </label>
                    {fotoSelecionada[item.id] && (
                      <span style={styles.fotoNome}>
                        ✅ {fotoSelecionada[item.id].name.substring(0, 15)}...
                      </span>
                    )}
                    <button style={styles.btnConcluir} onClick={() => concluirItem(item.id)}>
                      Concluir
                    </button>
                  </>
                )}
                {item.urlFoto && (
                  <a href={`http://localhost:8080${item.urlFoto}`} target="_blank" rel="noreferrer"
                    style={styles.btnVerFoto}>
                    🖼 Ver foto
                  </a>
                )}
                {visita?.status !== 'CONCLUIDA' && (
                  <button style={styles.btnDeletar} onClick={() => deletarItem(item.id)}>🗑</button>
                )}
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
    display: 'flex', alignItems: 'center', gap: '20px',
  },
  voltar: {
    background: 'transparent', border: '1px solid #fff', color: '#fff',
    padding: '6px 12px', borderRadius: '6px', cursor: 'pointer', whiteSpace: 'nowrap',
  },
  titulo: { margin: '0 0 2px', fontSize: '18px' },
  subtitulo: { margin: 0, fontSize: '12px', color: '#aaa' },
  status: {
    color: '#fff', padding: '4px 14px', borderRadius: '20px',
    fontSize: '12px', fontWeight: '700', whiteSpace: 'nowrap', marginLeft: 'auto',
  },
  main: { padding: '28px', maxWidth: '800px', margin: '0 auto' },
  progressoBox: {
    backgroundColor: '#fff', borderRadius: '10px', padding: '20px',
    marginBottom: '20px', boxShadow: '0 2px 8px rgba(0,0,0,0.07)',
  },
  progressoTopo: { display: 'flex', justifyContent: 'space-between', marginBottom: '10px' },
  progressoLabel: { fontWeight: '600', color: '#333' },
  progressoNum: { color: '#666', fontSize: '14px' },
  progressoBarra: { backgroundColor: '#e5e7eb', borderRadius: '99px', height: '10px' },
  progressoFill: { backgroundColor: '#10b981', height: '10px', borderRadius: '99px', transition: 'width 0.3s' },
  adicionarBox: { display: 'flex', gap: '10px', marginBottom: '20px' },
  input: {
    flex: 1, padding: '10px 14px', borderRadius: '8px',
    border: '1px solid #ddd', fontSize: '15px',
  },
  btnAdicionar: {
    backgroundColor: '#4f46e5', color: '#fff', border: 'none',
    padding: '10px 20px', borderRadius: '8px', cursor: 'pointer', fontWeight: '600',
  },
  vazio: { textAlign: 'center', color: '#888', marginTop: '40px' },
  item: {
    backgroundColor: '#fff', borderRadius: '8px', padding: '16px 20px',
    marginBottom: '10px', display: 'flex', justifyContent: 'space-between',
    alignItems: 'center', boxShadow: '0 1px 4px rgba(0,0,0,0.06)',
  },
  itemEsquerda: { display: 'flex', alignItems: 'center', gap: '12px' },
  itemIcon: { fontSize: '22px' },
  itemTarefa: { margin: '0 0 2px', fontSize: '15px', fontWeight: '500' },
  itemObs: { margin: 0, fontSize: '13px', color: '#888', fontStyle: 'italic' },
  itemAcoes: { display: 'flex', gap: '8px' },
  btnConcluir: {
    backgroundColor: '#10b981', color: '#fff', border: 'none',
    padding: '6px 14px', borderRadius: '6px', cursor: 'pointer', fontWeight: '600',
  },
  btnDeletar: {
    backgroundColor: '#fee2e2', border: 'none',
    padding: '6px 10px', borderRadius: '6px', cursor: 'pointer',
  },
  btnFoto: {
    backgroundColor: '#e0e7ff', border: 'none',
    padding: '6px 10px', borderRadius: '6px', cursor: 'pointer', fontSize: '16px',
  },
  fotoNome: { fontSize: '12px', color: '#666', maxWidth: '100px', overflow: 'hidden' },
  btnVerFoto: {
    backgroundColor: '#f0fdf4', color: '#10b981', border: '1px solid #10b981',
    padding: '6px 12px', borderRadius: '6px', cursor: 'pointer',
    fontWeight: '600', fontSize: '13px', textDecoration: 'none',
  },
};