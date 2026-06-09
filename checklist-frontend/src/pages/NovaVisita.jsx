import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

export default function NovaVisita() {
  const [promotores, setPromotores] = useState([]);
  const [supermercados, setSupermercados] = useState([]);
  const [industrias, setIndustrias] = useState([]);
  const [form, setForm] = useState({
    promotorId: '', supermercadoId: '', industriaId: '',
    dataVisita: '', observacaoGeral: ''
  });
  const [erro, setErro] = useState('');
  const [sucesso, setSucesso] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    async function carregarDados() {
      const [resP, resS, resI] = await Promise.all([
        api.get('/usuarios/perfil/PROMOTOR'),
        api.get('/supermercados'),
        api.get('/industrias'),
      ]);
      setPromotores(resP.data);
      setSupermercados(resS.data);
      setIndustrias(resI.data);
    }
    carregarDados();
  }, []);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setErro(''); setSucesso('');
    try {
      await api.post('/visitas', {
        promotorId: Number(form.promotorId),
        supermercadoId: Number(form.supermercadoId),
        industriaId: Number(form.industriaId),
        dataVisita: form.dataVisita,
        observacaoGeral: form.observacaoGeral,
      });
      setSucesso('Visita agendada com sucesso!');
      setForm({ promotorId: '', supermercadoId: '', industriaId: '', dataVisita: '', observacaoGeral: '' });
    } catch {
      setErro('Erro ao agendar visita. Verifique os dados.');
    }
  }

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <button onClick={() => navigate('/visitas')} style={styles.voltar}>← Voltar</button>
        <h1 style={styles.titulo}>📋 Nova Visita</h1>
      </header>

      <main style={styles.main}>
        <div style={styles.card}>
          <h2 style={styles.cardTitulo}>Agendar Visita</h2>
          <form onSubmit={handleSubmit} style={styles.form}>

            <div style={styles.linha}>
              <div style={styles.campo}>
                <label style={styles.label}>Promotor *</label>
                <select style={styles.input} name="promotorId"
                  value={form.promotorId} onChange={handleChange} required>
                  <option value="">Selecione o promotor...</option>
                  {promotores.map(p => (
                    <option key={p.id} value={p.id}>{p.nome}</option>
                  ))}
                </select>
              </div>
              <div style={styles.campo}>
                <label style={styles.label}>Data da Visita *</label>
                <input style={styles.input} type="date" name="dataVisita"
                  value={form.dataVisita} onChange={handleChange} required />
              </div>
            </div>

            <div style={styles.linha}>
              <div style={styles.campo}>
                <label style={styles.label}>Supermercado *</label>
                <select style={styles.input} name="supermercadoId"
                  value={form.supermercadoId} onChange={handleChange} required>
                  <option value="">Selecione o supermercado...</option>
                  {supermercados.map(s => (
                    <option key={s.id} value={s.id}>{s.nome} — {s.cidade}/{s.estado}</option>
                  ))}
                </select>
              </div>
              <div style={styles.campo}>
                <label style={styles.label}>Indústria *</label>
                <select style={styles.input} name="industriaId"
                  value={form.industriaId} onChange={handleChange} required>
                  <option value="">Selecione a indústria...</option>
                  {industrias.map(i => (
                    <option key={i.id} value={i.id}>{i.nome}</option>
                  ))}
                </select>
              </div>
            </div>

            <div style={styles.campo}>
              <label style={styles.label}>Observação (opcional)</label>
              <textarea style={{ ...styles.input, height: '80px', resize: 'vertical' }}
                name="observacaoGeral" value={form.observacaoGeral}
                onChange={handleChange}
                placeholder="Ex: Foco na gôndola de higiene pessoal" />
            </div>

            {erro && <p style={styles.erro}>{erro}</p>}
            {sucesso && (
              <div style={styles.sucessoBox}>
                <p style={styles.sucesso}>✅ {sucesso}</p>
                <button type="button" style={styles.btnVerVisitas}
                  onClick={() => navigate('/visitas')}>
                  Ver todas as visitas →
                </button>
              </div>
            )}

            <button type="submit" style={styles.btnSalvar}>📋 Agendar Visita</button>
          </form>
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
  main: { padding: '28px', maxWidth: '700px', margin: '0 auto' },
  card: {
    backgroundColor: '#fff', borderRadius: '10px', padding: '28px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.07)',
  },
  cardTitulo: { margin: '0 0 24px', color: '#1a1a2e', fontSize: '16px' },
  form: { display: 'flex', flexDirection: 'column', gap: '16px' },
  linha: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' },
  campo: { display: 'flex', flexDirection: 'column', gap: '6px' },
  label: { fontSize: '13px', fontWeight: '600', color: '#555' },
  input: {
    padding: '10px 14px', borderRadius: '8px',
    border: '1px solid #ddd', fontSize: '14px',
  },
  erro: { color: '#ef4444', fontSize: '13px' },
  sucessoBox: { display: 'flex', alignItems: 'center', gap: '16px' },
  sucesso: { color: '#10b981', fontSize: '13px', margin: 0 },
  btnVerVisitas: {
    backgroundColor: '#e0e7ff', color: '#4f46e5', border: 'none',
    padding: '6px 14px', borderRadius: '6px', cursor: 'pointer', fontWeight: '600',
  },
  btnSalvar: {
    backgroundColor: '#4f46e5', color: '#fff', border: 'none',
    padding: '12px 24px', borderRadius: '8px', cursor: 'pointer',
    fontWeight: '600', fontSize: '15px',
  },
};