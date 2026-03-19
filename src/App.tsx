import { useEffect, useRef, useState } from 'react';

declare global {
  interface Window {
    YT: any;
    onYouTubeIframeAPIReady?: () => void;
  }
}

const TRACKS = [
  { title: 'Bohemian Rhapsody', artist: 'Queen', duration: '5:55', youtubeId: 'fJ9rUzIMcZQ' },
  { title: 'Comfortably Numb', artist: 'Pink Floyd', duration: '6:23', youtubeId: 'vfrJShLzLG8' },
  { title: 'Hotel California', artist: 'Eagles', duration: '6:30', youtubeId: 'BciS5krYL80' },
  { title: 'Wish You Were Here', artist: 'Pink Floyd', duration: '5:34', youtubeId: 'IXdNnw99-Ic' },
  { title: 'Stairway to Heaven', artist: 'Led Zeppelin', duration: '8:02', youtubeId: 'QkF3oxziUI4' },
];

const NAV_ITEMS = [
  { id: 'about', label: 'About' },
  { id: 'projects', label: 'Projects' },
  { id: 'music', label: 'Music' },
  { id: 'blog', label: 'Blog' },
  { id: 'contact', label: 'Contact' },
];

const PROJECT_SLOTS = [
  {
    number: '01',
    label: 'AI/ML',
    title: 'Project slot ready',
    description: 'A clean placeholder for your first public machine learning project.',
    tags: ['Add title', 'Add stack'],
  },
  {
    number: '02',
    label: 'RESEARCH',
    title: 'Research work ready',
    description: 'Use this card later for a paper, experiment, or model you want to share.',
    tags: ['Add summary', 'Add tools'],
  },
  {
    number: '03',
    label: 'WEB',
    title: 'Frontend build ready',
    description: 'A simple placeholder for a website, interface, or product concept.',
    tags: ['Add link', 'Add notes'],
  },
];

const BLOG_SLOTS = [
  {
    date: 'Coming soon',
    title: 'Your first blog post goes here',
    summary: 'A space for essays, study notes, build logs, or reflections you want to publish later.',
  },
  {
    date: 'Coming soon',
    title: 'Write about your learning process',
    summary: 'Use this card for machine learning notes, experiments, or things you are figuring out.',
  },
  {
    date: 'Coming soon',
    title: 'Keep a personal writing archive',
    summary: 'This can hold short thoughts, music notes, or technical ideas as your portfolio grows.',
  },
];

function SectionLabel({ children, dark = false }: { children: string; dark?: boolean }) {
  return (
    <span
      className={`font-mono text-[11px] uppercase tracking-[0.32em] ${
        dark ? 'text-accent/80' : 'text-accent'
      }`}
    >
      {children}
    </span>
  );
}

function Waveform({ active, light = false }: { active: boolean; light?: boolean }) {
  return (
    <div className="waveform-container" aria-hidden="true">
      {Array.from({ length: 6 }).map((_, index) => (
        <div
          key={index}
          className={`waveform-bar ${active ? 'active' : ''}`}
          style={{
            animationDelay: `${index * 0.08}s`,
            backgroundColor: light ? '#ffffff' : '#b51e2f',
            height: active ? undefined : '5px',
            opacity: light ? 0.95 : 1,
          }}
        />
      ))}
    </div>
  );
}

function VinylRecord({
  isPlaying,
  onToggle,
  size = 'large',
}: {
  isPlaying: boolean;
  onToggle: () => void;
  size?: 'hero' | 'large';
}) {
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-label={isPlaying ? 'Pause music' : 'Play music'}
      className="group relative block"
    >
      <div className={`vinyl-record ${size === 'hero' ? 'vinyl-hero' : 'vinyl-large'} ${isPlaying ? 'vinyl-spin' : 'vinyl-spin-paused'}`}>
        <div className="vinyl-grooves" />
        <div className="vinyl-shine" />
        <div className="vinyl-center">
          <span className="vinyl-center-text">{isPlaying ? 'now playing' : 'tap to play'}</span>
        </div>
        <div className="vinyl-pin" />
      </div>
    </button>
  );
}

function Tonearm({ isPlaying, variant = 'large' }: { isPlaying: boolean; variant?: 'hero' | 'large' }) {
  return (
    <div className={`tonearm ${variant === 'hero' ? 'tonearm-hero' : 'tonearm-large'} ${isPlaying ? 'tonearm-play' : 'tonearm-pause'}`}>
      <div className="tonearm-base" />
      <div className="tonearm-bar">
        <div className="tonearm-head" />
      </div>
    </div>
  );
}

function Navigation({
  activeSection,
  scrollToSection,
}: {
  activeSection: string;
  scrollToSection: (id: string) => void;
}) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="fixed inset-x-0 top-0 z-50 border-b border-black/10 bg-white/92 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 sm:px-8 lg:px-12">
        <button
          type="button"
          onClick={() => scrollToSection('hero')}
          className="font-heading text-2xl font-semibold tracking-wide text-accent"
        >
          NB
        </button>

        <div className="hidden items-center gap-8 md:flex">
          {NAV_ITEMS.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => scrollToSection(item.id)}
              className={`text-[15px] transition-colors ${
                activeSection === item.id ? 'text-accent' : 'text-black/65 hover:text-black'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>

        <button
          type="button"
          className="rounded-full border border-black/10 p-2 text-black md:hidden"
          onClick={() => setIsMenuOpen((prev) => !prev)}
          aria-label="Toggle menu"
        >
          <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {isMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M6 18 18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M4 7h16M4 12h16M4 17h16" />
            )}
          </svg>
        </button>
      </div>

      {isMenuOpen && (
        <div className="border-t border-black/10 bg-white md:hidden">
          <div className="mx-auto flex max-w-7xl flex-col gap-2 px-6 py-4 sm:px-8">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => {
                  scrollToSection(item.id);
                  setIsMenuOpen(false);
                }}
                className="rounded-xl px-3 py-3 text-left text-black/70 transition-colors hover:bg-black/5 hover:text-black"
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}

function HeroSection({
  scrollToSection,
  isPlaying,
  onTogglePlayback,
  currentTrack,
  playerReady,
}: {
  scrollToSection: (id: string) => void;
  isPlaying: boolean;
  onTogglePlayback: () => void;
  currentTrack: number;
  playerReady: boolean;
}) {
  return (
    <section
      id="hero"
      className="relative overflow-hidden pt-28 text-white"
      style={{ background: 'linear-gradient(135deg, #951b1e 0%, #811518 55%, #6f1218 100%)' }}
    >
      <div className="hero-grid-overlay" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_30%,rgba(255,255,255,0.08),transparent_26%)]" />

      <div className="relative mx-auto flex min-h-[calc(100vh-7rem)] max-w-7xl items-center px-6 py-14 sm:px-8 lg:px-12 lg:py-20">
        <div className="grid w-full items-center gap-16 lg:grid-cols-[minmax(0,1fr)_minmax(360px,460px)] xl:gap-24">
          <div className="max-w-2xl">
            <p className="font-mono text-[12px] uppercase tracking-[0.32em] text-white/65">
              Creative Technologist · Nepal
            </p>

            <h1 className="mt-6 font-heading text-[4.3rem] leading-[0.9] sm:text-[5.2rem] lg:text-[6.4rem] xl:text-[7rem]">
              <span className="block">Nitesh</span>
              <span className="mt-2 block italic text-[#f4d7da]">Bhandari</span>
            </h1>

            <p className="mt-8 text-xl font-semibold tracking-[0.08em] text-white/78 sm:text-2xl">
              AI/ML Student · Builder
            </p>

            <p className="mt-8 max-w-xl font-heading text-3xl italic leading-relaxed text-white/78 sm:text-[2rem]">
              I write code that thinks, build things carefully, and listen to records that stay with me.
            </p>

            <div className="mt-10 flex flex-wrap gap-4">
              <button
                type="button"
                onClick={() => scrollToSection('projects')}
                className="rounded-md bg-white px-8 py-4 text-[15px] font-medium text-accent transition-colors hover:bg-white/90"
              >
                View Projects
              </button>
              <button
                type="button"
                onClick={() => scrollToSection('contact')}
                className="rounded-md border border-white/28 px-8 py-4 text-[15px] font-medium text-white transition-colors hover:bg-white/10"
              >
                Get in Touch
              </button>
            </div>
          </div>

          <div className="flex justify-center lg:justify-end">
            <div className="w-full max-w-[460px] rounded-[2rem] border border-white/10 bg-black/10 p-8 shadow-[0_30px_80px_rgba(0,0,0,0.18)] backdrop-blur-sm sm:p-10">
              <div className="relative mx-auto w-fit">
                <VinylRecord isPlaying={isPlaying} onToggle={onTogglePlayback} size="hero" />
                <Tonearm isPlaying={isPlaying} variant="hero" />
              </div>

              <div className="mt-8 flex items-start justify-between gap-6">
                <div>
                  <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-white/55">
                    {playerReady ? 'Current soundtrack' : 'Player loading'}
                  </p>
                  <p className="mt-3 font-heading text-3xl leading-tight text-white">
                    {TRACKS[currentTrack].title}
                  </p>
                  <p className="mt-2 text-sm text-white/68">{TRACKS[currentTrack].artist}</p>
                </div>
                <Waveform active={isPlaying} light />
              </div>

              <p className="mt-6 text-sm leading-relaxed text-white/62">
                Tap the vinyl here or in the music section to play or pause the audio-only soundtrack.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-center">
        <p className="font-mono text-[11px] uppercase tracking-[0.32em] text-white/50">Scroll</p>
        <div className="mx-auto mt-4 h-9 w-px bg-gradient-to-b from-white/50 to-transparent" />
      </div>
    </section>
  );
}

function AboutSection() {
  return (
    <section id="about" className="bg-white py-24 lg:py-28">
      <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
        <div className="grid gap-14 lg:grid-cols-[minmax(0,1.1fr)_360px] lg:gap-20">
          <div>
            <SectionLabel>About</SectionLabel>
            <h2 className="mt-5 max-w-4xl font-heading text-5xl leading-[1.02] text-black sm:text-6xl lg:text-[4.4rem]">
              Building with code, systems, and <span className="italic text-accent">curiosity</span>
            </h2>

            <div className="mt-12 max-w-3xl space-y-7 text-lg leading-9 text-black/72">
              <p>
                I'm an <strong className="font-semibold text-black">AI/ML student</strong> from Kathmandu, Nepal,
                focused on learning how intelligent systems work and how to present them clearly on the web.
              </p>
              <p>
                Right now, I'm keeping this portfolio simple: a space to introduce myself, share what I'm listening
                to, and leave room for projects and writing as they become real work I want to publish.
              </p>
            </div>

            <div className="mt-12 max-w-3xl terminal">
              <div className="terminal-header">
                <div className="terminal-dot bg-[#ff5f57]" />
                <div className="terminal-dot bg-[#febc2e]" />
                <div className="terminal-dot bg-[#28c840]" />
                <span className="ml-2 font-mono text-xs text-white/45">nitesh.profile</span>
              </div>
              <div className="terminal-body">
                <p>
                  <span className="terminal-prompt">$</span> <span className="terminal-command">whoami</span>
                </p>
                <p className="terminal-output">Nitesh Bhandari</p>

                <p className="mt-4">
                  <span className="terminal-prompt">$</span> <span className="terminal-command">cat focus.txt</span>
                </p>
                <p className="terminal-output">Machine Learning · NLP · Computer Vision · Frontend</p>

                <p className="mt-4">
                  <span className="terminal-prompt">$</span> <span className="terminal-command">location</span>
                </p>
                <p className="terminal-output">Kathmandu, Nepal</p>
              </div>
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              {['Machine Learning', 'Computer Vision', 'NLP', 'React', 'TypeScript', 'Python'].map((skill) => (
                <span key={skill} className="skill-tag">
                  {skill}
                </span>
              ))}
            </div>
          </div>

          <div className="space-y-5 pt-2">
            {[
              { value: '0+', label: 'Public projects for now' },
              { value: '5', label: 'Tracks in the player' },
              { value: 'Open', label: 'Room to grow this portfolio' },
            ].map((item) => (
              <div key={item.label} className="rounded-[1.75rem] border border-black/8 bg-[#faf8f6] p-8">
                <div className="border-l-2 border-accent pl-6">
                  <p className="font-heading text-5xl text-accent">{item.value}</p>
                  <p className="mt-3 text-[15px] leading-7 text-black/65">{item.label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function ProjectsSection() {
  return (
    <section id="projects" className="bg-charcoal py-24 text-white lg:py-28">
      <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
        <div className="max-w-3xl">
          <SectionLabel dark>Projects</SectionLabel>
          <h2 className="mt-5 font-heading text-5xl leading-[1.02] sm:text-6xl lg:text-[4.2rem]">
            Things I'm <span className="italic text-accent">building</span>
          </h2>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-white/62">
            I haven't published projects yet, so this section stays honest for now. The layout is ready, and you can
            replace these placeholders with real work when you're ready.
          </p>
        </div>

        <div className="mt-14 grid gap-6 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)]">
          <div className="rounded-[2rem] border border-white/10 bg-white/[0.02] p-8 sm:p-10">
            <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-accent/85">For now</p>
            <h3 className="mt-5 font-heading text-4xl text-white sm:text-5xl">No public work yet</h3>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-white/60">
              Better to keep this clean and truthful than fill it with made-up case studies. Once you finish your first
              real builds, this section is already structured for them.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
            {PROJECT_SLOTS.map((project) => (
              <div key={project.number} className="rounded-[1.75rem] border border-white/10 bg-white/[0.02] p-7">
                <div className="flex items-center gap-4">
                  <span className="font-mono text-sm text-white/35">{project.number}</span>
                  <span className="font-mono text-[11px] uppercase tracking-[0.28em] text-accent">{project.label}</span>
                </div>
                <h3 className="mt-6 font-heading text-3xl leading-tight text-white">{project.title}</h3>
                <p className="mt-4 text-[15px] leading-7 text-white/58">{project.description}</p>
                <div className="mt-6 flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span key={tag} className="rounded-full border border-white/12 px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.18em] text-white/48">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function MusicSection({
  isPlaying,
  onTogglePlayback,
  currentTrack,
  onTrackSelect,
  onNextTrack,
  playerReady,
}: {
  isPlaying: boolean;
  onTogglePlayback: () => void;
  currentTrack: number;
  onTrackSelect: (index: number) => void;
  onNextTrack: () => void;
  playerReady: boolean;
}) {
  return (
    <section id="music" className="bg-white py-24 lg:py-28">
      <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
        <div className="max-w-3xl">
          <SectionLabel>Music</SectionLabel>
          <h2 className="mt-5 font-heading text-5xl leading-[1.02] text-black sm:text-6xl lg:text-[4rem]">
            What I <span className="italic text-accent">listen to</span>
          </h2>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-black/65">
            A simple player for the records and songs I keep returning to. The audio plays through a hidden YouTube
            player, so the page stays clean while the music keeps running.
          </p>
        </div>

        <div className="mt-14 grid items-start gap-12 lg:grid-cols-[430px_minmax(0,1fr)] xl:gap-20">
          <div className="rounded-[2rem] bg-charcoal p-8 text-white shadow-[0_24px_70px_rgba(0,0,0,0.16)] sm:p-10">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-white/45">
                  {isPlaying ? 'Now playing' : playerReady ? 'Ready to play' : 'Loading player'}
                </p>
                <h3 className="mt-3 font-heading text-3xl leading-tight">{TRACKS[currentTrack].title}</h3>
                <p className="mt-2 text-sm text-white/58">{TRACKS[currentTrack].artist}</p>
              </div>
              <Waveform active={isPlaying} light />
            </div>

            <div className="mt-10 flex justify-center">
              <div className="relative w-fit">
                <VinylRecord isPlaying={isPlaying} onToggle={onTogglePlayback} size="large" />
                <Tonearm isPlaying={isPlaying} variant="large" />
              </div>
            </div>

            <div className="mt-10 flex flex-wrap gap-3">
              <button
                type="button"
                onClick={onTogglePlayback}
                disabled={!playerReady}
                className="rounded-full bg-white px-5 py-3 text-sm font-medium text-black transition-colors hover:bg-white/90 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {isPlaying ? 'Pause' : 'Play'}
              </button>
              <button
                type="button"
                onClick={onNextTrack}
                disabled={!playerReady}
                className="rounded-full border border-white/18 px-5 py-3 text-sm font-medium text-white transition-colors hover:bg-white/8 disabled:cursor-not-allowed disabled:opacity-50"
              >
                Next Track
              </button>
            </div>

            <p className="mt-6 text-sm leading-7 text-white/50">
              Use either vinyl on the page to control the same player. No visible video panel is opened.
            </p>
          </div>

          <div className="space-y-4">
            {TRACKS.map((track, index) => {
              const isActive = currentTrack === index;

              return (
                <button
                  key={track.title}
                  type="button"
                  onClick={() => onTrackSelect(index)}
                  className={`w-full rounded-[1.5rem] border p-5 text-left transition-all sm:p-6 ${
                    isActive
                      ? 'border-accent bg-[#fff8f8] shadow-[0_12px_30px_rgba(181,30,47,0.08)]'
                      : 'border-black/8 bg-white hover:border-black/16 hover:bg-[#fcfbfa]'
                  }`}
                >
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex items-start gap-4 sm:gap-5">
                      <span className="mt-1 font-mono text-sm text-black/35">{String(index + 1).padStart(2, '0')}</span>
                      <div>
                        <p className={`font-heading text-3xl leading-tight ${isActive ? 'text-accent' : 'text-black'}`}>
                          {track.title}
                        </p>
                        <p className="mt-2 text-[15px] text-black/58">{track.artist}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-4 pl-9 sm:pl-0">
                      <span className="font-mono text-sm text-black/35">{track.duration}</span>
                      {isActive ? (
                        isPlaying ? (
                          <Waveform active={true} />
                        ) : (
                          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-accent/10 text-accent">
                            <svg className="ml-0.5 h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                              <polygon points="5,3 19,12 5,21" />
                            </svg>
                          </div>
                        )
                      ) : (
                        <div className="flex h-10 w-10 items-center justify-center rounded-full border border-black/10 text-black/55">
                          <svg className="ml-0.5 h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                            <polygon points="5,3 19,12 5,21" />
                          </svg>
                        </div>
                      )}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

function BlogSection() {
  return (
    <section id="blog" className="bg-[#f6f4f1] py-24 lg:py-28">
      <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
        <div className="max-w-3xl">
          <SectionLabel>Blog</SectionLabel>
          <h2 className="mt-5 font-heading text-5xl leading-[1.02] text-black sm:text-6xl lg:text-[4rem]">
            Notes I'll <span className="italic text-accent">publish here</span>
          </h2>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-black/65">
            This is the place for future writing: thoughts, learning notes, and short essays when you decide to start
            posting them.
          </p>
        </div>

        <div className="mt-14 grid gap-6 lg:grid-cols-3">
          {BLOG_SLOTS.map((post) => (
            <article key={post.title} className="rounded-[1.75rem] border border-black/8 bg-white p-7 shadow-[0_12px_35px_rgba(0,0,0,0.04)]">
              <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-accent">{post.date}</p>
              <h3 className="mt-5 font-heading text-3xl leading-tight text-black">{post.title}</h3>
              <p className="mt-4 text-[15px] leading-7 text-black/62">{post.summary}</p>
              <div className="mt-8 inline-flex items-center gap-2 text-sm font-medium text-accent">
                <span>Ready when you are</span>
                <span aria-hidden="true">→</span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function ContactSection() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 2500);
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <section
      id="contact"
      className="relative overflow-hidden py-24 text-white lg:py-28"
      style={{ background: 'linear-gradient(180deg, #1b1b1b 0%, #151515 100%)' }}
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(181,30,47,0.16),transparent_28%)]" />
      <div className="relative mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
        <div className="max-w-3xl">
          <SectionLabel dark>Contact</SectionLabel>
          <h2 className="mt-5 font-heading text-5xl leading-[1.02] sm:text-6xl lg:text-[4rem]">
            Let's <span className="italic text-accent">connect</span>
          </h2>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-white/62">
            I left clean placeholders here so you can add your real contact details later without changing the layout.
          </p>
        </div>

        <div className="mt-14 grid gap-10 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] xl:gap-16">
          <div className="space-y-5">
            {[
              {
                label: 'Email',
                value: 'your-email@example.com',
                href: 'mailto:your-email@example.com',
                icon: (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M3 7.5 12 13l9-5.5M5 19h14a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2Z" />
                ),
              },
              {
                label: 'GitHub',
                value: 'github.com/your-username',
                href: 'https://github.com/your-username',
                icon: (
                  <path d="M12 .5C5.65.5.5 5.65.5 12A11.5 11.5 0 0 0 8.36 22.93c.58.1.79-.25.79-.57v-2.02c-3.2.7-3.88-1.36-3.88-1.36-.52-1.33-1.28-1.69-1.28-1.69-1.04-.71.08-.7.08-.7 1.15.08 1.75 1.18 1.75 1.18 1.02 1.75 2.67 1.25 3.32.95.1-.74.4-1.25.72-1.54-2.56-.29-5.26-1.28-5.26-5.72 0-1.26.45-2.29 1.18-3.1-.12-.29-.51-1.46.11-3.04 0 0 .97-.31 3.17 1.18a11.03 11.03 0 0 1 5.77 0c2.2-1.5 3.16-1.18 3.16-1.18.63 1.58.24 2.75.12 3.04.74.81 1.18 1.84 1.18 3.1 0 4.45-2.7 5.42-5.28 5.71.41.36.78 1.06.78 2.13v3.15c0 .31.21.68.8.57A11.5 11.5 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5Z" />
                ),
              },
              {
                label: 'LinkedIn',
                value: 'linkedin.com/in/your-username',
                href: 'https://linkedin.com/in/your-username',
                icon: (
                  <path d="M4.98 3.5A1.48 1.48 0 1 1 5 6.46 1.48 1.48 0 0 1 4.98 3.5ZM3.75 8.25h2.5v12h-2.5v-12Zm6.25 0h2.4v1.64h.03c.33-.63 1.15-1.92 3.3-1.92 3.53 0 4.19 2.2 4.19 5.07v7.21h-2.5v-6.39c0-1.52-.03-3.48-2.13-3.48-2.14 0-2.47 1.67-2.47 3.37v6.5H10v-12Z" />
                ),
              },
            ].map((item) => (
              <a
                key={item.label}
                href={item.href}
                target={item.label === 'Email' ? undefined : '_blank'}
                rel={item.label === 'Email' ? undefined : 'noopener noreferrer'}
                className="flex items-center gap-5 rounded-[1.5rem] border border-white/10 bg-white/[0.03] p-6 transition-colors hover:border-white/18 hover:bg-white/[0.05]"
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-full border border-white/12 bg-white/[0.04] text-accent">
                  <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    {item.icon}
                  </svg>
                </div>
                <div>
                  <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-white/42">{item.label}</p>
                  <p className="mt-2 text-[15px] text-white/72">{item.value}</p>
                </div>
              </a>
            ))}
          </div>

          <form onSubmit={handleSubmit} className="rounded-[2rem] border border-white/10 bg-white/[0.03] p-7 sm:p-8">
            <div className="grid gap-5">
              <div>
                <label className="mb-2 block font-mono text-[11px] uppercase tracking-[0.28em] text-white/42">Name</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(event) => setFormData({ ...formData, name: event.target.value })}
                  placeholder="Your name"
                  className="w-full rounded-xl border border-white/12 bg-white/[0.04] px-4 py-3.5 text-white placeholder:text-white/28"
                />
              </div>
              <div>
                <label className="mb-2 block font-mono text-[11px] uppercase tracking-[0.28em] text-white/42">Email</label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(event) => setFormData({ ...formData, email: event.target.value })}
                  placeholder="your@email.com"
                  className="w-full rounded-xl border border-white/12 bg-white/[0.04] px-4 py-3.5 text-white placeholder:text-white/28"
                />
              </div>
              <div>
                <label className="mb-2 block font-mono text-[11px] uppercase tracking-[0.28em] text-white/42">Message</label>
                <textarea
                  required
                  rows={5}
                  value={formData.message}
                  onChange={(event) => setFormData({ ...formData, message: event.target.value })}
                  placeholder="Your message"
                  className="w-full resize-none rounded-xl border border-white/12 bg-white/[0.04] px-4 py-3.5 text-white placeholder:text-white/28"
                />
              </div>
              <button
                type="submit"
                className="mt-2 rounded-xl bg-accent px-5 py-4 text-sm font-medium text-white transition-colors hover:bg-accent-dark"
              >
                {submitted ? 'Message sent' : 'Send Message'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="bg-[#141414] py-8 text-white/45">
      <div className="mx-auto flex max-w-7xl flex-col gap-2 px-6 text-center text-sm sm:px-8 lg:px-12 md:flex-row md:items-center md:justify-between md:text-left">
        <p>© 2025 Nitesh Bhandari · Kathmandu, Nepal</p>
        <p>Built with curiosity</p>
      </div>
    </footer>
  );
}

function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 500);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <button
      type="button"
      aria-label="Back to top"
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      className={`fixed bottom-7 right-7 z-40 flex h-12 w-12 items-center justify-center rounded-full border border-black/10 bg-white text-accent shadow-[0_12px_30px_rgba(0,0,0,0.12)] transition-all hover:bg-accent hover:text-white ${
        visible ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-3 opacity-0'
      }`}
    >
      <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="m5 12 7-7 7 7M12 19V5" />
      </svg>
    </button>
  );
}

export default function App() {
  const [activeSection, setActiveSection] = useState('hero');
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrack, setCurrentTrack] = useState(0);
  const [playerReady, setPlayerReady] = useState(false);
  const playerRef = useRef<any>(null);
  const currentTrackRef = useRef(0);

  useEffect(() => {
    currentTrackRef.current = currentTrack;
  }, [currentTrack]);

  useEffect(() => {
    let cancelled = false;

    const createPlayer = () => {
      if (cancelled || !window.YT?.Player || playerRef.current) return;

      playerRef.current = new window.YT.Player('youtube-player', {
        height: '1',
        width: '1',
        videoId: TRACKS[0].youtubeId,
        playerVars: {
          autoplay: 0,
          controls: 0,
          disablekb: 1,
          fs: 0,
          modestbranding: 1,
          rel: 0,
          playsinline: 1,
          iv_load_policy: 3,
        },
        events: {
          onReady: (event: any) => {
            event.target.setVolume(100);
            setPlayerReady(true);
          },
          onStateChange: (event: any) => {
            if (event.data === 1) {
              setIsPlaying(true);
            }

            if (event.data === 2) {
              setIsPlaying(false);
            }

            if (event.data === 0) {
              const nextTrack = (currentTrackRef.current + 1) % TRACKS.length;
              currentTrackRef.current = nextTrack;
              setCurrentTrack(nextTrack);
              event.target.loadVideoById(TRACKS[nextTrack].youtubeId);
              event.target.playVideo();
            }
          },
        },
      });
    };

    if (window.YT?.Player) {
      createPlayer();
    } else {
      const existingScript = document.querySelector('script[src="https://www.youtube.com/iframe_api"]');
      if (!existingScript) {
        const script = document.createElement('script');
        script.src = 'https://www.youtube.com/iframe_api';
        document.body.appendChild(script);
      }

      const previousReady = window.onYouTubeIframeAPIReady;
      window.onYouTubeIframeAPIReady = () => {
        previousReady?.();
        createPlayer();
      };
    }

    return () => {
      cancelled = true;
      if (playerRef.current?.destroy) {
        playerRef.current.destroy();
        playerRef.current = null;
      }
    };
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const togglePlayback = () => {
    if (!playerReady || !playerRef.current) return;

    if (isPlaying) {
      playerRef.current.pauseVideo();
      return;
    }

    const state = playerRef.current.getPlayerState?.();
    if (state === -1 || state === 5) {
      playerRef.current.loadVideoById(TRACKS[currentTrack].youtubeId);
    }
    playerRef.current.playVideo();
  };

  const playTrack = (index: number) => {
    if (!playerReady || !playerRef.current) {
      setCurrentTrack(index);
      return;
    }

    if (index === currentTrack) {
      togglePlayback();
      return;
    }

    currentTrackRef.current = index;
    setCurrentTrack(index);
    playerRef.current.loadVideoById(TRACKS[index].youtubeId);
    playerRef.current.playVideo();
  };

  const playNextTrack = () => {
    const nextTrack = (currentTrack + 1) % TRACKS.length;

    if (!playerReady || !playerRef.current) {
      setCurrentTrack(nextTrack);
      return;
    }

    currentTrackRef.current = nextTrack;
    setCurrentTrack(nextTrack);
    playerRef.current.loadVideoById(TRACKS[nextTrack].youtubeId);
    playerRef.current.playVideo();
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.35 }
    );

    const sections = document.querySelectorAll<HTMLElement>('section[id]');
    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-white text-black">
      <Navigation activeSection={activeSection} scrollToSection={scrollToSection} />
      <HeroSection
        scrollToSection={scrollToSection}
        isPlaying={isPlaying}
        onTogglePlayback={togglePlayback}
        currentTrack={currentTrack}
        playerReady={playerReady}
      />
      <AboutSection />
      <ProjectsSection />
      <MusicSection
        isPlaying={isPlaying}
        onTogglePlayback={togglePlayback}
        currentTrack={currentTrack}
        onTrackSelect={playTrack}
        onNextTrack={playNextTrack}
        playerReady={playerReady}
      />
      <BlogSection />
      <ContactSection />
      <Footer />
      <BackToTop />

      <div className="audio-player-container" aria-hidden="true">
        <div id="youtube-player" />
      </div>
    </div>
  );
}
