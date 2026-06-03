import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
  const { usuario, logout } = useAuth();
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate('/login');
  }

  return (
    <div style={styles.container}>
      {/* Header */}
      <header style={styles.header}>
        <div style={styles.headerLeft}>
          <span style={styles.logo}>🛒 Checklist Promotores</span>
        </div>
        <div style={styles.headerRight}>
          <span style={styles.nomeUsuario}>👤 {usuario?.nome}</span>
          <span style={styles.badge}>{usuario?.perfil}</span>
          <button onClick={handleLogout} style={styles.botaoLogout}>Sair</button>
        </div>
      </header>

      {/* Cards de resumo */}
      <main style={styles.main}>
        <h2 style={styles.boasVindas}>Olá, {usuario?.nome?.split(' ')[0]}! 👋</h2>
        <p style={styles.data}>
          {new Date().toLocaleDateString('pt-BR', {
            weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
          })}
        </p>

        <div style={styles.grid}>
          <Card titulo="Visitas Hoje" valor="—" icon="📋" cor="#4f46e5"
                onClick={() => navigate('/visitas')} />
          <Card titulo="Pendentes" valor="—" icon="⏳" cor="#f59e0b"
                onClick={() => navigate('/visitas')} />
          <Card titulo="Concluídas" valor="—" icon="✅" cor="#10b981"
                onClick={() => navigate('/visitas')} />
          <Card titulo="Promotores" valor="—" icon="👥" cor="#6366f1"
                onClick={() => navigate('/usuarios')} />
        </div>

        {/* Menu de navegação */}
        <div style={styles.menu}>
          <MenuItem icon="📋" label="Visitas" onClick={() => navigate('/visitas')} />
          <MenuItem icon="🏭" label="Indústrias" onClick={() => navigate('/industrias')} />
          <MenuItem icon="🏪" label="Supermercados" onClick={() => navigate('/supermercados')} />
          <MenuItem icon="👥" label="Usuários" onClick={() => navigate('/usuarios')} />
        </div>
      </main>
    </div>
  );
}

function Card({ titulo, valor, icon, cor, onClick }) {
  return (
    <div style={{ ...styles.card, borderTop: `4px solid ${cor}` }} onClick={onClick}>
      <span style={styles.cardIcon}>{icon}</span>
      <div>
        <p style={styles.cardTitulo}>{titulo}</p>
        <p style={{ ...styles.cardValor, color: cor }}>{valor}</p>
      </div>
    </div>
  );
}

function MenuItem({ icon, label, onClick }) {
  return (
    <button style={styles.menuItem} onClick={onClick}>
      <span style={styles.menuIcon}>{icon}</span>
      <span style={styles.menuLabel}>{label}</span>
    </button>
  );
}

const styles = {
  container: { minHeight: '100vh', backgroundColor: '#f0f2f5' },
  header: {
    backgroundColor: '#1a1a2e', color: '#fff', padding: '14px 28px',
    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
  },
  headerLeft: {},
  logo: { fontSize: '18px', fontWeight: '700' },
  headerRight: { display: 'flex', alignItems: 'center', gap: '12px' },
  nomeUsuario: { fontSize: '14px' },
  badge: {
    backgroundColor: '#4f46e5', color: '#fff', padding: '3px 10px',
    borderRadius: '20px', fontSize: '12px', fontWeight: '600',
  },
  botaoLogout: {
    backgroundColor: 'transparent', border: '1px solid #fff',
    color: '#fff', padding: '6px 14px', borderRadius: '6px',
    cursor: 'pointer', fontSize: '13px',
  },
  main: { padding: '28px', maxWidth: '1100px', margin: '0 auto' },
  boasVindas: { fontSize: '24px', color: '#1a1a2e', marginBottom: '4px' },
  data: { color: '#888', marginBottom: '28px', textTransform: 'capitalize' },
  grid: { display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', marginBottom: '28px' },
  card: {
    backgroundColor: '#fff', borderRadius: '10px', padding: '20px',
    display: 'flex', alignItems: 'center', gap: '16px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.07)', cursor: 'pointer',
  },
  cardIcon: { fontSize: '32px' },
  cardTitulo: { color: '#666', fontSize: '13px', margin: 0 },
  cardValor: { fontSize: '28px', fontWeight: '700', margin: 0 },
  menu: { display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px' },
  menuItem: {
    backgroundColor: '#fff', border: 'none', borderRadius: '10px',
    padding: '24px 16px', display: 'flex', flexDirection: 'column',
    alignItems: 'center', gap: '10px', cursor: 'pointer',
    boxShadow: '0 2px 8px rgba(0,0,0,0.07)',
  },
  menuIcon: { fontSize: '36px' },
  menuLabel: { fontSize: '14px', fontWeight: '600', color: '#333' },
};