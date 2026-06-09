import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

export default function Supermercados() {
  const [supermercados, setSupermercados] = useState([]);
  const [form, setForm] = useState({ nome: '', endereco: '', cidade: '', estado: '' });
  const [erro, setErro] = useState('');
  const [sucesso, setSucesso] = useState('');
  const navigate = useNavigate();

  useEffect(() => { carregarSupermercados(); }, []);

  async function carregarSupermercados() {
    const { data } = await api.get('/supermercados');
    setSupermercados(data);
  }

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setErro(''); setSucesso('');
    try {
      await api.post('/supermercados', form);
      setForm({ nome: '', endereco: '', cidade: '', estado: '' });
      setSucesso('Supermercado cadastrado com sucesso!');
      carregarSupermercados();
    } catch {
      setErro('Erro ao cadastrar. Verifique os dados.');
    }
  }

  async function deletar(id) {
    if (!confirm('Deseja excluir este supermercado?')) return;
    await api.delete(`/supermercados/${id}`);
    carregarSupermercados();
  }

  const estados = ['AC','AL','AP','AM','BA','CE','DF','ES','GO','MA','MT','MS',
    'MG','PA','PB','PR','PE','PI','RJ','RN','RS','RO','RR','SC','SP','SE','TO'];

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <button onClick={() => navigate('/dashboard')} style={styles.voltar}>← Voltar</button>
        <h1 style={styles.titulo}>🏪 Supermercados</h1>
      </header>

      <main style={styles.main}>
        <div style={styles.card}>
          <h2 style={styles.cardTitulo}>Novo Supermercado</h2>
          <form onSubmit={handleSubmit} style={styles.form}>
            <div style={styles.linha}>
              <div style={styles.campo}>
                <label style={styles.label}>Nome *</label>
                <input style={styles.input} name="nome" value={form.nome}
                  onChange={handleChange} placeholder="Ex: Carrefour Vila Mariana" required />
              </div>
              <div style={styles.campo}>
                <label style={styles.label}>Endereço *</label>
                <input style={styles.input} name="endereco" value={form.endereco}
                  onChange={handleChange} placeholder="Ex: Av. Paulista, 1000" required />
              </div>
            </div>
            <div style={styles.linha}>
              <div style={styles.campo}>
                <label style={styles.label}>Cidade *</label>
                <input style={styles.input} name="cidade" value={form.cidade}
                  onChange={handleChange} placeholder="Ex: São Paulo" required />
              </div>
              <div style={styles.campo}>
                <label style={styles.label}>Estado *</label>
                <select style={styles.input} name="estado" value={form.estado}
                  onChange={handleChange} required>
                  <option value="">Selecione...</option>
                  {estados.map(uf => (
                    <option key={uf} value={uf}>{uf}</option>
                  ))}
                </select>
              </div>
            </div>
            {erro && <p style={styles.erro}>{erro}</p>}
            {sucesso && <p style={styles.sucesso}>{sucesso}</p>}
            <button type="submit" style={styles.btnSalvar}>+ Cadastrar</button>
          </form>
        </div>

        <div style={styles.card}>
          <h2 style={styles.cardTitulo}>Supermercados Cadastrados ({supermercados.length})</h2>
          {supermercados.length === 0 ? (
            <p style={styles.vazio}>Nenhum supermercado cadastrado.</p>
          ) : (
            supermercados.map((s) => (
              <div key={s.id} style={styles.item}>
                <div>
                  <p style={styles.itemNome}>{s.nome}</p>
                  <p style={styles.itemDesc}>📍 {s.endereco} — {s.cidade}/{s.estado}</p>
                </div>
                <div style={styles.itemAcoes}>
                  <span style={{ ...styles.badge, backgroundColor: s.ativo ? '#10b981' : '#ef4444' }}>
                    {s.ativo ? 'Ativo' : 'Inativo'}
                  </span>
                  <button style={styles.btnDeletar} onClick={() => deletar(s.id)}>🗑</button>
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
  badge: { color: '#fff', padding: '3px 10px', borderRadius: '20px', fontSize: '12px' },
  btnDeletar: {
    backgroundColor: '#fee2e2', border: 'none',
    padding: '6px 10px', borderRadius: '6px', cursor: 'pointer',
  },
};