import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

export default function Usuarios() {
  const [usuarios, setUsuarios] = useState([]);
  const [form, setForm] = useState({ nome: '', email: '', senha: '', perfil: '' });
  const [erro, setErro] = useState('');
  const [sucesso, setSucesso] = useState('');
  const navigate = useNavigate();

  useEffect(() => { carregarUsuarios(); }, []);

  async function carregarUsuarios() {
    const { data } = await api.get('/usuarios');
    setUsuarios(data);
  }

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setErro(''); setSucesso('');
    try {
      await api.post('/usuarios', form);
      setForm({ nome: '', email: '', senha: '', perfil: '' });
      setSucesso('Usuário cadastrado com sucesso!');
      carregarUsuarios();
    } catch {
      setErro('Erro ao cadastrar. E-mail já pode estar em uso.');
    }
  }

  async function deletar(id) {
    if (!confirm('Deseja excluir este usuário?')) return;
    await api.delete(`/usuarios/${id}`);
    carregarUsuarios();
  }

  const corPerfil = {
    ADMIN: '#7c3aed',
    COORDENADOR: '#4f46e5',
    PROMOTOR: '#0891b2',
  };

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <button onClick={() => navigate('/dashboard')} style={styles.voltar}>← Voltar</button>
        <h1 style={styles.titulo}>👥 Usuários</h1>
      </header>

      <main style={styles.main}>
        <div style={styles.card}>
          <h2 style={styles.cardTitulo}>Novo Usuário</h2>
          <form onSubmit={handleSubmit} style={styles.form}>
            <div style={styles.linha}>
              <div style={styles.campo}>
                <label style={styles.label}>Nome *</label>
                <input style={styles.input} name="nome" value={form.nome}
                  onChange={handleChange} placeholder="Ex: Maria Santos" required />
              </div>
              <div style={styles.campo}>
                <label style={styles.label}>E-mail *</label>
                <input style={styles.input} name="email" type="email" value={form.email}
                  onChange={handleChange} placeholder="Ex: maria@empresa.com" required />
              </div>
            </div>
            <div style={styles.linha}>
              <div style={styles.campo}>
                <label style={styles.label}>Senha *</label>
                <input style={styles.input} name="senha" type="password" value={form.senha}
                  onChange={handleChange} placeholder="Mínimo 6 caracteres" required />
              </div>
              <div style={styles.campo}>
                <label style={styles.label}>Perfil *</label>
                <select style={styles.input} name="perfil" value={form.perfil}
                  onChange={handleChange} required>
                  <option value="">Selecione...</option>
                  <option value="ADMIN">Admin</option>
                  <option value="COORDENADOR">Coordenador</option>
                  <option value="PROMOTOR">Promotor</option>
                </select>
              </div>
            </div>
            {erro && <p style={styles.erro}>{erro}</p>}
            {sucesso && <p style={styles.sucesso}>{sucesso}</p>}
            <button type="submit" style={styles.btnSalvar}>+ Cadastrar</button>
          </form>
        </div>

        <div style={styles.card}>
          <h2 style={styles.cardTitulo}>Usuários Cadastrados ({usuarios.length})</h2>
          {usuarios.length === 0 ? (
            <p style={styles.vazio}>Nenhum usuário cadastrado.</p>
          ) : (
            usuarios.map((u) => (
              <div key={u.id} style={styles.item}>
                <div style={styles.itemEsquerda}>
                  <div style={{
                    ...styles.avatar,
                    backgroundColor: corPerfil[u.perfil] || '#888'
                  }}>
                    {u.nome.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <p style={styles.itemNome}>{u.nome}</p>
                    <p style={styles.itemDesc}>{u.email}</p>
                  </div>
                </div>
                <div style={styles.itemAcoes}>
                  <span style={{
                    ...styles.badge,
                    backgroundColor: corPerfil[u.perfil] || '#888'
                  }}>
                    {u.perfil}
                  </span>
                  <span style={{
                    ...styles.badge,
                    backgroundColor: u.ativo ? '#10b981' : '#ef4444'
                  }}>
                    {u.ativo ? 'Ativo' : 'Inativo'}
                  </span>
                  <button style={styles.btnDeletar} onClick={() => deletar(u.id)}>🗑</button>
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
  itemEsquerda: { display: 'flex', alignItems: 'center', gap: '12px' },
  avatar: {
    width: '40px', height: '40px', borderRadius: '50%',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    color: '#fff', fontWeight: '700', fontSize: '16px',
  },
  itemNome: { margin: '0 0 2px', fontWeight: '600', color: '#1a1a2e' },
  itemDesc: { margin: 0, fontSize: '13px', color: '#888' },
  itemAcoes: { display: 'flex', alignItems: 'center', gap: '8px' },
  badge: { color: '#fff', padding: '3px 10px', borderRadius: '20px', fontSize: '12px' },
  btnDeletar: {
    backgroundColor: '#fee2e2', border: 'none',
    padding: '6px 10px', borderRadius: '6px', cursor: 'pointer',
  },
};