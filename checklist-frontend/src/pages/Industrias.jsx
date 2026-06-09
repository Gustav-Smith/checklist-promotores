import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

export default function Industrias() {
  const [industrias, setIndustrias] = useState([]);
  const [nome, setNome] = useState('');
  const [descricao, setDescricao] = useState('');
  const [erro, setErro] = useState('');
  const [sucesso, setSucesso] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    carregarIndustrias();
  }, []);

  async function carregarIndustrias() {
    const { data } = await api.get('/industrias');
    setIndustrias(data);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setErro('');
    setSucesso('');
    try {
      await api.post('/industrias', { nome, descricao });
      setNome('');
      setDescricao('');
      setSucesso('Indústria cadastrada com sucesso!');
      carregarIndustrias();
    } catch {
      setErro('Erro ao cadastrar. Verifique os dados.');
    }
  }

  async function deletar(id) {
    if (!confirm('Deseja excluir esta indústria?')) return;
    await api.delete(`/industrias/${id}`);
    carregarIndustrias();
  }

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <button onClick={() => navigate('/dashboard')} style={styles.voltar}>← Voltar</button>
        <h1 style={styles.titulo}>🏭 Indústrias</h1>
      </header>

      <main style={styles.main}>
        {/* Formulário */}
        <div style={styles.card}>
          <h2 style={styles.cardTitulo}>Nova Indústria</h2>
          <form onSubmit={handleSubmit} style={styles.form}>
            <div style={styles.linha}>
              <div style={styles.campo}>
                <label style={styles.label}>Nome *</label>
                <input style={styles.input} value={nome}
                  onChange={(e) => setNome(e.target.value)}
                  placeholder="Ex: Unilever" required />
              </div>
              <div style={styles.campo}>
                <label style={styles.label}>Descrição</label>
                <input style={styles.input} value={descricao}
                  onChange={(e) => setDescricao(e.target.value)}
                  placeholder="Ex: Produtos de higiene" />
              </div>
            </div>
            {erro && <p style={styles.erro}>{erro}</p>}
            {sucesso && <p style={styles.sucesso}>{sucesso}</p>}
            <button type="submit" style={styles.btnSalvar}>+ Cadastrar</button>
          </form>
        </div>

        {/* Lista */}
        <div style={styles.card}>
          <h2 style={styles.cardTitulo}>Indústrias Cadastradas ({industrias.length})</h2>
          {industrias.length === 0 ? (
            <p style={styles.vazio}>Nenhuma indústria cadastrada.</p>
          ) : (
            industrias.map((i) => (
              <div key={i.id} style={styles.item}>
                <div>
                  <p style={styles.itemNome}>{i.nome}</p>
                  {i.descricao && <p style={styles.itemDesc}>{i.descricao}</p>}
                </div>
                <div style={styles.itemAcoes}>
                  <span style={{ ...styles.badge, backgroundColor: i.ativa ? '#10b981' : '#ef4444' }}>
                    {i.ativa ? 'Ativa' : 'Inativa'}
                  </span>
                  <button style={styles.btnDeletar} onClick={() => deletar(i.id)}>🗑</button>
                </div>
              </div>
            ))
          )}
        </div>
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
  titulo: { margin: 0, fontSize: '20px' },
  main: { padding: '28px', maxWidth: '900px', margin: '0 auto' },
  card: {
    backgroundColor: '#fff', borderRadius: '10px', padding: '24px',
    marginBottom: '20px', boxShadow: '0 2px 8px rgba(0,0,0,0.07)',
  },
  cardTitulo: { margin: '0 0 20px', color: '#1a1a2e', fontSize: '16px' },
  form: { display: 'flex', flexDirection: 'column', gap: '12px' },
  linha: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' },
  campo: { display: 'flex', flexDirection: 'column', gap: '6px' },
  label: { fontSize: '13px', fontWeight: '600', color: '#555' },
  input: {
    padding: '10px 14px', borderRadius: '8px',
    border: '1px solid #ddd', fontSize: '14px',
  },
  erro: { color: '#ef4444', fontSize: '13px' },
  sucesso: { color: '#10b981', fontSize: '13px' },
  btnSalvar: {
    backgroundColor: '#4f46e5', color: '#fff', border: 'none',
    padding: '10px 24px', borderRadius: '8px', cursor: 'pointer',
    fontWeight: '600', alignSelf: 'flex-start',
  },
  vazio: { color: '#888', textAlign: 'center', padding: '20px' },
  item: {
    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
    padding: '14px 0', borderBottom: '1px solid #f0f0f0',
  },
  itemNome: { margin: '0 0 2px', fontWeight: '600', color: '#1a1a2e' },
  itemDesc: { margin: 0, fontSize: '13px', color: '#888' },
  itemAcoes: { display: 'flex', alignItems: 'center', gap: '10px' },
  badge: {
    color: '#fff', padding: '3px 10px', borderRadius: '20px', fontSize: '12px',
  },
  btnDeletar: {
    backgroundColor: '#fee2e2', border: 'none',
    padding: '6px 10px', borderRadius: '6px', cursor: 'pointer',
  },
};