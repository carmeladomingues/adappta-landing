import { useEffect, useRef, useState } from 'react';

const ENABLE_MOTION = true;
const NAV_GLASS = true;

function useReveal() {
  const ref = useRef(null);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setRevealed(true);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -60px 0px' }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const style = {
    opacity: revealed ? 1 : 0,
    transform: revealed ? 'translateY(0)' : 'translateY(28px)',
    transition: 'opacity 0.8s cubic-bezier(.22,1,.36,1), transform 0.8s cubic-bezier(.22,1,.36,1)'
  };

  return [ref, style];
}

const problemCards = [
  { num: '01', title: 'Unreliable accessibility information', desc: 'Listings go stale the moment a ramp is removed or an elevator breaks down, leaving travelers with information they can no longer trust.' },
  { num: '02', title: 'Unexpected barriers', desc: 'Stairs, blocked curb cuts and closed elevators appear with no warning, turning a planned route into a dead end.' },
  { num: '03', title: 'Loss of confidence when travelling', desc: 'Every unreliable detail chips away at the confidence to explore a new place independently.' }
];

const solutionCards = [
  { id: 'plan', title: 'Plan', shot: '/assets/solution-plan.png', desc: 'Search any destination and see accessibility details before you leave — step-free routes, entrances and verified reviews.' },
  { id: 'navigate', title: 'Navigate', shot: '/assets/solution-navigate.png', desc: 'Turn-by-turn guidance that favors accessible paths, ramps and elevators, adjusted to your needs in real time.' },
  { id: 'report', title: 'Report', shot: '/assets/solution-report.png', desc: 'Flag a barrier or confirm a route in seconds, feeding trusted, up-to-date information back into the platform.' },
  { id: 'improve', title: 'Improve', shot: '/assets/solution-improve.png', desc: 'Every report strengthens the map, helping cities and venues understand where accessibility needs the most attention.' }
];

const statCards = [
  { value: 'Research-based', label: 'Grounded in evidence, not assumptions' },
  { value: '52', label: 'Survey participants' },
  { value: '6', label: 'In-depth interviews' },
  { value: 'Co-designed', label: 'With people with disabilities' },
  { value: 'User-tested', label: 'Validated with a working prototype' }
];

const journeySteps = [
  { n: '01', title: 'Plan', desc: 'Check accessibility before you leave.', showLine: false },
  { n: '02', title: 'Navigate', desc: 'Follow guidance built around your needs.', showLine: true },
  { n: '03', title: 'Report', desc: 'Flag or confirm what you find along the way.', showLine: true },
  { n: '04', title: 'Improve accessibility', desc: 'Help make the next journey easier for everyone.', showLine: true }
];

function PlaceholderSlot({ label, style }) {
  return (
    <div style={{ width: '100%', height: '100%', borderRadius: 10, background: 'repeating-linear-gradient(45deg, #EFEDE8, #EFEDE8 10px, #E5E2DB 10px, #E5E2DB 20px)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'monospace', fontSize: 11, color: 'rgba(26,26,26,0.4)', textAlign: 'center', padding: 8, ...style }}>
      {label}
    </div>
  );
}

const navLinks = [
  { href: '#solution', label: 'Solution' },
  { href: '#research', label: 'Research' },
  { href: '#recognition', label: 'Impact' },
  { href: '#future', label: 'About' }
];

function Navigation() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className={`site-nav${NAV_GLASS ? ' site-nav--glass' : ''}`}>
      <div className="site-nav__inner">
        <a className="site-nav__brand" href="#" aria-label="Adappta home">
          <img src="/logo.svg" alt="Adappta" />
        </a>
        <nav className="site-nav__links" aria-label="Primary navigation">
          {navLinks.map((link) => (
            <a className="nav-link" href={link.href} key={link.href}>{link.label}</a>
          ))}
        </nav>
        <div className="site-nav__actions">
          <a className="btn-cta-nav" href="#final-cta">Partner with us</a>
          <button
            className="site-nav__toggle"
            type="button"
            aria-expanded={menuOpen}
            aria-controls="mobile-navigation"
            aria-label={menuOpen ? 'Close navigation' : 'Open navigation'}
            onClick={() => setMenuOpen((open) => !open)}
          >
            <span />
            <span />
          </button>
        </div>
      </div>
      <nav
        className={`site-nav__mobile${menuOpen ? ' is-open' : ''}`}
        id="mobile-navigation"
        aria-label="Mobile navigation"
      >
        {navLinks.map((link) => (
          <a className="nav-link" href={link.href} key={link.href} onClick={() => setMenuOpen(false)}>{link.label}</a>
        ))}
      </nav>
    </header>
  );
}

function Hero() {
  return (
    <section className={`hero${ENABLE_MOTION ? '' : ' hero--static'}`}>
      <div className="hero__light hero__light--one" />
      <div className="hero__light hero__light--two" />
      <div className="hero__grid">
        <div className="hero__copy">
          <div className="hero__eyebrow">
            <span aria-hidden="true" />
            Accessibility-first navigation
          </div>
          <h1>Move through cities with confidence.</h1>
          <p>Adappta brings trusted accessibility information and community-powered updates into one navigation platform—so every journey starts with clarity.</p>
          <div className="hero__actions">
            <a className="btn-primary" href="#final-cta">Partner with Adappta</a>
            <a className="btn-secondary" href="https://www.youtube.com/watch?v=zvb9JSBsYEg&t=9s" target="_blank" rel="noopener noreferrer">
              <span className="play-icon" aria-hidden="true" />
              Watch the project film
            </a>
          </div>
          <div className="hero__trust">
            <span>Research-led</span>
            <span>Community-verified</span>
            <span>Designed for independence</span>
          </div>
        </div>

        <div className="hero__visual" aria-label="Adappta mobile navigation experience">
          <div className="hero__orbit hero__orbit--outer" />
          <div className="hero__orbit hero__orbit--inner" />
          <div className="hero__phone-wrap">
            <div className="hero__phone">
              <img src="/assets/hero-phone.png" alt="Adappta map and accessible route preview" />
            </div>
          </div>
          <div className="hero__float hero__float--warning">
            <img src="/assets/badge-liveupdate.png" alt="Live accessibility warning near Picoas" />
          </div>
          <div className="hero__float hero__float--verified">
            <img src="/assets/badge-verified.png" alt="Adappta verified accessibility update" />
          </div>
        </div>
      </div>
    </section>
  );
}

export default function App() {
  const [refProblem, problemStyle] = useReveal();
  const [refSolution, solutionStyle] = useReveal();
  const [refResearch, researchStyle] = useReveal();
  const [refRecognition, recognitionStyle] = useReveal();
  const [refJourney, journeyStyle] = useReveal();
  const [refFuture, futureStyle] = useReveal();
  const [refFinalcta, finalctaStyle] = useReveal();

  return (
    <div style={{ fontFamily: "'Inter',system-ui,sans-serif", color: '#1A1A1A', background: '#FAFAFA', overflowX: 'hidden', position: 'relative' }}>

      <Navigation />
      <Hero />

      {/* PROBLEM */}
      <div style={{ padding: '40px 32px 60px' }}>
        <div ref={refProblem} style={{ maxWidth: 1280, margin: '0 auto', ...problemStyle }}>
          <div style={{ maxWidth: 640, margin: '0 auto 64px', textAlign: 'center' }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: '#7C55A2', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 16 }}>The problem</div>
            <h2 style={{ fontSize: 'clamp(32px,4vw,52px)', lineHeight: 1.08, fontWeight: 800, letterSpacing: '-0.02em', margin: '0 0 20px' }}>Accessibility information you can't rely on.</h2>
            <p style={{ fontSize: 17, lineHeight: 1.6, color: 'rgba(26,26,26,0.6)', margin: 0 }}>Accessibility information is scattered across outdated maps, inconsistent reviews and word of mouth — leaving people with disabilities to guess whether a place is truly reachable.</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(280px,1fr))', gap: 24 }}>
            {problemCards.map((card) => (
              <div key={card.num} className="problem-card" style={{ background: '#fff', borderRadius: 24, padding: '40px 32px', boxShadow: '0 4px 24px -8px rgba(26,26,26,0.06)' }}>
                <div style={{ fontSize: 15, fontWeight: 800, color: 'rgba(115,95,255,0.35)', marginBottom: 24 }}>{card.num}</div>
                <h3 style={{ fontSize: 20, fontWeight: 700, letterSpacing: '-0.01em', margin: '0 0 12px' }}>{card.title}</h3>
                <p style={{ fontSize: 15, lineHeight: 1.6, color: 'rgba(26,26,26,0.6)', margin: 0 }}>{card.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* SOLUTION */}
      <div id="solution" style={{ padding: '60px 32px' }}>
        <div ref={refSolution} style={{ maxWidth: 1280, margin: '0 auto', ...solutionStyle }}>
          <div style={{ maxWidth: 640, margin: '0 auto 64px', textAlign: 'center' }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: '#7C55A2', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 16 }}>The solution</div>
            <h2 style={{ fontSize: 'clamp(32px,4vw,52px)', lineHeight: 1.08, fontWeight: 800, letterSpacing: '-0.02em', margin: 0 }}>One platform for confident, accessible journeys.</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(260px,1fr))', gap: 24 }}>
            {solutionCards.map((card) => (
              <div key={card.id} className="problem-card" style={{ background: '#fff', borderRadius: 24, padding: 32, boxShadow: '0 4px 24px -8px rgba(26,26,26,0.06)', display: 'flex', flexDirection: 'column' }}>
                <div style={{ width: '100%', aspectRatio: '3/4', marginBottom: 24, background: '#F5F3EF', borderRadius: 16, overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <img src={card.shot} alt={`${card.title} screen`} style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                </div>
                <h3 style={{ fontSize: 19, fontWeight: 700, letterSpacing: '-0.01em', margin: '0 0 10px' }}>{card.title}</h3>
                <p style={{ fontSize: 14.5, lineHeight: 1.6, color: 'rgba(26,26,26,0.6)', margin: 0 }}>{card.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* RESEARCH */}
      <div id="research" style={{ padding: '60px 32px' }}>
        <div ref={refResearch} style={{ maxWidth: 1280, margin: '0 auto', ...researchStyle }}>
          <div style={{ maxWidth: 640, margin: '0 auto 56px', textAlign: 'center' }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: '#7C55A2', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 16 }}>Research</div>
            <h2 style={{ fontSize: 'clamp(32px,4vw,52px)', lineHeight: 1.08, fontWeight: 800, letterSpacing: '-0.02em', margin: '0 0 20px' }}>Built on evidence, not assumptions.</h2>
            <p style={{ fontSize: 17, lineHeight: 1.6, color: 'rgba(26,26,26,0.6)', margin: 0 }}>Adappta was shaped directly by the people who rely on accessible navigation every day.</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(200px,1fr))', gap: 20 }}>
            {statCards.map((stat) => (
              <div key={stat.value} className="stat-card" style={{ background: '#fff', borderRadius: 20, padding: '32px 24px', textAlign: 'center', boxShadow: '0 4px 24px -8px rgba(26,26,26,0.06)' }}>
                <div style={{ fontSize: 26, fontWeight: 800, letterSpacing: '-0.02em', color: '#735FFF', marginBottom: 10 }}>{stat.value}</div>
                <div style={{ fontSize: 14, lineHeight: 1.5, color: 'rgba(26,26,26,0.6)', fontWeight: 500 }}>{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* RECOGNITION */}
      <div id="recognition" style={{ padding: '60px 32px' }}>
        <div ref={refRecognition} style={{ maxWidth: 1280, margin: '0 auto', ...recognitionStyle }}>
          <div style={{ background: 'linear-gradient(135deg,#1A1A1A 0%,#2b2440 100%)', borderRadius: 32, padding: '72px 48px', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', top: -80, left: -80, width: 280, height: 280, borderRadius: '50%', background: 'radial-gradient(circle, rgba(255,203,0,0.18), transparent 70%)' }} />
            <div style={{ position: 'relative', zIndex: 1 }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: '#FFCB00', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 20 }}>Nominated</div>
              <h2 style={{ fontSize: 'clamp(32px,4vw,52px)', lineHeight: 1.1, fontWeight: 800, letterSpacing: '-0.02em', color: '#fff', margin: '0 0 20px' }}>UX Design Awards 2026</h2>
              <p style={{ fontSize: 16, lineHeight: 1.6, color: 'rgba(255,255,255,0.6)', maxWidth: 480, margin: '0 auto 44px' }}>Recognized for using design to make cities more navigable for everyone.</p>
              <div style={{ display: 'flex', gap: 20, justifyContent: 'center', flexWrap: 'wrap' }}>
                <div style={{ width: 140, height: 56 }}><PlaceholderSlot label="Award logo" /></div>
                <div style={{ width: 140, height: 56 }}><PlaceholderSlot label="Award logo" /></div>
                <div style={{ width: 140, height: 56 }}><PlaceholderSlot label="Award logo" /></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* HOW IT WORKS */}
      <div style={{ padding: '60px 32px' }}>
        <div ref={refJourney} style={{ maxWidth: 1280, margin: '0 auto', ...journeyStyle }}>
          <div style={{ maxWidth: 640, margin: '0 auto 64px', textAlign: 'center' }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: '#7C55A2', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 16 }}>How it works</div>
            <h2 style={{ fontSize: 'clamp(32px,4vw,52px)', lineHeight: 1.08, fontWeight: 800, letterSpacing: '-0.02em', margin: 0 }}>From plan to progress.</h2>
          </div>
          <div style={{ display: 'flex', gap: 0, flexWrap: 'wrap', position: 'relative' }}>
            {journeySteps.map((step) => (
              <div key={step.n} style={{ flex: '1 1 220px', minWidth: 220, padding: '0 20px', position: 'relative' }}>
                {step.showLine && (
                  <div style={{ position: 'absolute', top: 23, left: '-50%', width: '100%', height: 1, background: 'rgba(26,26,26,0.12)' }} />
                )}
                <div style={{ width: 46, height: 46, borderRadius: '50%', background: '#fff', border: '1.5px solid rgba(26,26,26,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 15, fontWeight: 700, color: '#735FFF', marginBottom: 24, position: 'relative', zIndex: 1 }}>{step.n}</div>
                <h3 style={{ fontSize: 18, fontWeight: 700, letterSpacing: '-0.01em', margin: '0 0 10px' }}>{step.title}</h3>
                <p style={{ fontSize: 14.5, lineHeight: 1.6, color: 'rgba(26,26,26,0.6)', margin: 0 }}>{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* FUTURE VISION */}
      <div id="future" style={{ padding: '60px 32px' }}>
        <div ref={refFuture} style={{ maxWidth: 1280, margin: '0 auto', ...futureStyle }}>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 56, alignItems: 'center' }}>
            <div style={{ flex: '1 1 420px', minWidth: 300 }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: '#7C55A2', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 16 }}>Future vision</div>
              <h2 style={{ fontSize: 'clamp(32px,4vw,48px)', lineHeight: 1.1, fontWeight: 800, letterSpacing: '-0.02em', margin: '0 0 20px' }}>The trusted accessibility layer for cities.</h2>
              <p style={{ fontSize: 16.5, lineHeight: 1.65, color: 'rgba(26,26,26,0.6)', maxWidth: 480, margin: 0 }}>As more people, venues and city partners contribute, Adappta becomes the shared source of truth for accessible mobility — a living map that gets more reliable with every journey.</p>
            </div>
            <div style={{ flex: '1 1 420px', minWidth: 300 }}>
              <div style={{ width: '100%', aspectRatio: '4/3', borderRadius: 28, overflow: 'hidden', position: 'relative', background: 'linear-gradient(135deg,#BEDCF4 0%,#e4edf7 100%)' }}>
                <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(rgba(115,95,255,0.25) 1.5px, transparent 1.5px)', backgroundSize: '22px 22px' }} />
                <div style={{ position: 'absolute', inset: 0, padding: 16 }}>
                  <PlaceholderSlot label="City network visualization" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* FINAL CTA */}
      <div id="final-cta" style={{ padding: '60px 32px 100px' }}>
        <div ref={refFinalcta} style={{ maxWidth: 900, margin: '0 auto', textAlign: 'center', ...finalctaStyle }}>
          <h2 style={{ fontSize: 'clamp(32px,4.5vw,54px)', lineHeight: 1.1, fontWeight: 800, letterSpacing: '-0.02em', margin: '0 0 20px' }}>Interested in making cities more accessible?</h2>
          <p style={{ fontSize: 17, lineHeight: 1.6, color: 'rgba(26,26,26,0.6)', margin: '0 0 40px' }}>Let's build the future of urban accessibility together.</p>
          <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
            <a className="btn-primary" href="mailto:hello@adappta.com">Partner with us</a>
            <a className="btn-secondary" href="mailto:hello@adappta.com">Contact</a>
          </div>
        </div>
      </div>

      {/* FOOTER */}
      <div style={{ borderTop: '1px solid rgba(26,26,26,0.08)', padding: '48px 32px' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 20 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <img src="/logo.svg" alt="Adappta" style={{ width: 96, height: 'auto' }} />
          </div>
          <div style={{ display: 'flex', gap: 28, flexWrap: 'wrap', fontSize: 14 }}>
            <a className="footer-link" href="mailto:hello@adappta.com">hello@adappta.com</a>
            <a className="footer-link" href="https://www.linkedin.com/company/adappta" target="_blank" rel="noopener noreferrer">LinkedIn</a>
          </div>
          <div style={{ fontSize: 13, color: 'rgba(26,26,26,0.4)' }}>© 2026 Adappta. All rights reserved.</div>
        </div>
      </div>

    </div>
  );
}
