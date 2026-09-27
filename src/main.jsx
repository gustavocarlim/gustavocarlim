import { StrictMode, useEffect, useState } from 'react'
import { createRoot } from 'react-dom/client'
import { motion } from 'motion/react'
import './styles.css'
import './refinement.css'

// --- DADOS ---
const skills = [
  ['Desenvolvimento', 'Java, Spring Boot, PHP/Laravel, JavaScript, TypeScript, React, Vue.js, Node.js e C#'],
  ['Dados & infraestrutura', 'SQL, MySQL, Supabase, Docker, APIs REST e Git'],
  ['Hardware & suporte', 'Montagem, manutenção, otimização de setups (AM5/DDR5), placas-mãe e firewall'],
  ['Criação & Streaming', 'OBS Studio, edição de vídeo, Premiere, Photoshop e FL Studio'],
]

const studies = [
  ['2023 — 2024', 'Trybe · Desenvolvimento Full-Stack', '1.500 horas de formação prática em Fundamentos Web, Front-End, Back-End, Ciência da Computação e eletiva em C#.'],
  ['concluído em 08.04.2025', 'IBMR · Análise e Desenvolvimento de Sistemas', 'Graduação em ADS, Nova Iguaçu. Início informado em 31.12.'],
]

// --- HOOKS CUSTOMIZADOS ---
function useTheme() {
  const [theme, setTheme] = useState(() => 
    localStorage.getItem('portfolio-theme') === 'light' ? 'light' : 'dark'
  );

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    localStorage.setItem('portfolio-theme', theme);
  }, [theme]);

  const toggleTheme = () => setTheme(prev => prev === 'light' ? 'dark' : 'light');
  
  return { theme, isLight: theme === 'light', toggleTheme };
}

// --- ANIMAÇÕES GERAIS ---
const rise = {
  hidden: { opacity: 0, y: 22 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
}

// --- COMPONENTES MENORES ---
const Arrow = () => <span aria-hidden="true">↗</span>;

const BackgroundEffects = () => (
  <>
    <div className="grain" aria-hidden="true" />
    <div className="ambient ambient-one" aria-hidden="true" />
    <div className="ambient ambient-two" aria-hidden="true" />
  </>
);

const Header = ({ isLight, toggleTheme }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
  <header className="nav">
    <div className="nav-inner wrap">
      <a className="monogram" href="#inicio" aria-label="Ir para o início">GC<span>.</span></a>
      <nav id="menu-principal" className={`nav-links ${menuOpen ? 'is-open' : ''}`} aria-label="Navegação principal">
        <a href="#perfil" onClick={() => setMenuOpen(false)}>Perfil</a>
        <a href="#projetos" onClick={() => setMenuOpen(false)}>Projetos</a>
        <a href="#formacao" onClick={() => setMenuOpen(false)}>Formação</a>
        <a href="#contato" onClick={() => setMenuOpen(false)}>Contato</a>
      </nav>
      <button className="menu-toggle" type="button" onClick={() => setMenuOpen((open) => !open)} aria-expanded={menuOpen} aria-controls="menu-principal">
        <span aria-hidden="true" /> Menu
      </button>
      <button 
        className="theme-toggle" 
        type="button" 
        onClick={toggleTheme} 
        aria-pressed={isLight} 
        aria-label={isLight ? 'Ativar modo escuro' : 'Ativar modo claro'}
      >
        <span aria-hidden="true" className="theme-orb" />
        {isLight ? 'modo escuro' : 'modo claro'}
      </button>
    </div>
  </header>
  );
};

const HeroSection = () => (
  <section className="hero wrap" id="inicio">
    <motion.div initial="hidden" animate="visible" variants={rise} className="hero-copy">
      <p className="eyebrow"><i /> desenvolvimento · hardware · cybersecurity</p>
      <h1>Projetar sistema.<br /><em>Construir presença.</em></h1>
      <p className="lede">Sou Gustavo Carlim, desenvolvedor full-stack com uma base prática em tecnologia — da interface à infraestrutura que a sustenta.</p>
      <div className="hero-actions">
        <a className="button" href="#projetos">Conhecer projetos <Arrow /></a>
        <a className="quiet-link" href="#contato">Vamos conversar</a>
      </div>
    </motion.div>
    <motion.div initial={{ opacity: 0, scale: .96 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: .18, duration: .75 }} className="portrait-card">
      <div className="portrait-placeholder">
        <img className="portrait-image" src="/assets/foto.jpeg" alt="Gustavo Carlim" />
        <span className="scanner-line" />
        <div className="system-readout"><b>GC / 01</b><small>PORTFOLIO.SYSTEM</small><small>STATUS: AVAILABLE</small></div>
        <div className="terminal-lines"><i /><i /><i /><i /></div>
        <span className="photo-label">perfil<br />desenvolvimento</span>
      </div>
      <p>perfil / disponível para projetos</p>
    </motion.div>
  </section>
);

const ProfileSection = () => (
  <section className="statement wrap" id="perfil">
    <p className="section-number">01 / PERFIL</p>
    <h2>Visão ampla para entregar<br />produtos <em>consistentes.</em></h2>
    <p>Transito entre desenvolvimento web de alta performance, sistemas robustos em Java/Spring e manutenção técnica de hardware. Essa perspectiva me ajuda a transformar requisitos complexos em experiências úteis, com atenção à arquitetura, qualidade e operação real.</p>
  </section>
);

const SkillsSection = () => (
  <section className="skills wrap">
    {skills.map(([title, detail], i) => (
      <motion.article 
        key={title} 
        className="skill" 
        initial="hidden" 
        whileInView="visible" 
        viewport={{ once: true, amount: .25 }} 
        variants={{ ...rise, visible: { ...rise.visible, transition: { delay: i * .07, duration: .45 } } }}
      >
        <span>0{i + 1}</span>
        <h3>{title}</h3>
        <p>{detail}</p>
      </motion.article>
    ))}
  </section>
);

const ProjectsSection = () => (
  <section className="projects" id="projetos">
    <div className="wrap section-intro">
      <p className="section-number">02 / PROJETOS SELECIONADOS</p>
      <h2>Trabalho aplicado,<br /><em>em evolução contínua.</em></h2>
    </div>
    <div className="wrap project-grid">
      <motion.a whileHover={{ y: -6 }} viewport={{ once: true, amount: .25 }} initial="hidden" whileInView="visible" variants={rise} className="project staytop" href="https://www.staytop.com.br/" target="_blank" rel="noreferrer">
        <div className="project-visual">
          <div className="project-preview" aria-hidden="true">
            <video autoPlay muted loop playsInline preload="metadata">
              <source src="/assets/projects/Staytop.mp4" type="video/mp4" />
            </video>
          </div>
          <span className="project-index">01 / VISUALIZAR SITE</span>
        </div>
        <div className="project-copy">
          <div>
            <p className="eyebrow">PHP / Laravel · Node.js · APIs</p>
            <h3>StayTop</h3>
            <p>Plataforma de SMM (Social Media Marketing) com jornadas completas, integração de gateways de pagamento e automação de serviços via bots.</p>
          </div>
          <Arrow />
        </div>
      </motion.a>
      
      <motion.a whileHover={{ y: -6 }} viewport={{ once: true, amount: .25 }} initial="hidden" whileInView="visible" variants={rise} className="project illumination" href="https://www.jciluminacao.com/" target="_blank" rel="noreferrer">
        <div className="project-visual">
          <div className="project-preview" aria-hidden="true">
            <video autoPlay muted loop playsInline preload="metadata">
              <source src="/assets/projects/JcIluminacao.mp4" type="video/mp4" />
            </video>
          </div>
          <span className="project-index">02 / VISUALIZAR SITE</span>
        </div>
        <div className="project-copy">
          <div>
            <p className="eyebrow">E-commerce · Supabase / SQL</p>
            <h3>JC Iluminação</h3>
            <p>E-commerce de materiais elétricos com modelagem de catálogo de produtos e estrutura planejada para futuras integrações em marketplaces.</p>
          </div>
          <Arrow />
        </div>
      </motion.a>
    </div>
  </section>
);

const EducationSection = () => (
  <section className="education wrap" id="formacao">
    <div>
      <p className="section-number">03 / FORMAÇÃO</p>
      <h2>Aprendizado<br /><em>com profundidade.</em></h2>
    </div>
    <div className="timeline">
      {studies.map(([date, title, detail]) => (
        <article key={title}>
          <p className="date">{date}</p>
          <h3>{title}</h3>
          <p>{detail}</p>
        </article>
      ))}
    </div>
  </section>
);

const FooterContact = () => {
  // Controle de estado do envio (usando o useState importado lá em cima)
  const [status, setStatus] = useState('idle');

  const handleSubmit = async (event) => {
    event.preventDefault();
    setStatus('sending');

    const form = event.target;
    const data = new FormData(form);

    try {
      // SUBSTITUA O 'SEU_CODIGO_AQUI' PELO ENDPOINT DO FORMSPREE
      const response = await fetch('https://formspree.io/f/mbglzbpy', {
        method: 'POST',
        body: data,
        headers: {
          'Accept': 'application/json'
        }
      });

      if (response.ok) {
        setStatus('success');
        form.reset(); // Limpa os campos
        setTimeout(() => setStatus('idle'), 3000); // Volta ao normal após 3s
      } else {
        setStatus('error');
      }
    } catch (error) {
      setStatus('error');
    }
  };

  return (
    <footer id="contato">
      <div className="wrap footer-content">
        <div>
          <p className="section-number">04 / CONTATO</p>
          <h2>Vamos criar algo<br /><em>bem resolvido.</em></h2>
          <p className="footer-note">Aberto a oportunidades como Desenvolvedor (Java/Vue.js/PHP) e infraestrutura tecnológica.</p>
          <nav className="contact-links" aria-label="Canais de contato">
            <a href="mailto:gustavocarlimsaensdev@gmail.com">
              <span>E-mail</span>
              <b>Enviar mensagem ↗</b>
            </a>
            <a href="https://www.linkedin.com/in/gustavocarlim/" target="_blank" rel="noreferrer">
              <span>LinkedIn</span>
              <b>Conectar ↗</b>
            </a>
            <a href="https://github.com/gustavocarlim" target="_blank" rel="noreferrer">
              <span>GitHub</span>
              <b>Ver projetos ↗</b>
            </a>
          </nav>
        </div>
        <form className="contact-form" onSubmit={handleSubmit}>
          <p className="form-label">CANAL DE MENSAGEM</p>
          <label>
            Nome
            <input name="name" type="text" placeholder="Seu nome" required />
          </label>
          <label>
            E-mail
            <input name="email" type="email" placeholder="voce@empresa.com" required />
          </label>
          <label>
            Mensagem
            <textarea name="message" rows="4" placeholder="Como posso ajudar?" required />
          </label>
          <button 
            className={`contact-submit is-${status}`}
            type="submit" 
            disabled={status === 'sending'}
            style={{ 
              cursor: status === 'sending' ? 'wait' : 'pointer',
              backgroundColor: status === 'success' ? '#2d4a3e' : '',
              color: status === 'success' ? '#fff' : '',
              transition: 'all 0.3s ease'
            }}
          >
            {status === 'idle' && 'Enviar Mensagem'}
            {status === 'sending' && 'A enviar...'}
            {status === 'success' && 'Mensagem Enviada!'}
            {status === 'error' && 'Erro ao enviar. Tente novamente.'}
          </button>
        </form>
        <p className="copyright">© {new Date().getFullYear()} Gustavo Carlim</p>
      </div>
    </footer>
  );
};

// --- COMPONENTE PRINCIPAL ---
function App() {
  const { isLight, toggleTheme } = useTheme();

  return (
    <main>
      <BackgroundEffects />
      <Header isLight={isLight} toggleTheme={toggleTheme} />
      <HeroSection />
      <ProfileSection />
      <SkillsSection />
      <ProjectsSection />
      <EducationSection />
      <FooterContact />
    </main>
  );
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>
);
