import React, { useEffect, useRef } from 'react';
import { ArrowUpRight, ArrowRight, CheckSquare, Target, Zap, BarChart3, Linkedin, Mail, MessageCircle, Search, Lightbulb, Users } from 'lucide-react';
import { motion, useScroll, useSpring } from 'motion/react';

/* ── Icons ── */
const CustomTargetIco = ({ size = 28 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" /><circle cx="12" cy="12" r="6" /><circle cx="12" cy="12" r="2" />
  </svg>
);

const CustomZapIco = ({ size = 28 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
  </svg>
);

const CustomBarIco = ({ size = 28 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="20" x2="18" y2="10" /><line x1="12" y1="20" x2="12" y2="4" /><line x1="6" y1="20" x2="6" y2="14" />
  </svg>
);

const FunnelCard = ({ step, index, total }: any) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className={`funnel-card sticky border-4 border-black rounded-[4px] p-6 md:p-8 shadow-[8px_8px_0px_#000] relative overflow-hidden w-full mb-[-20px] md:mb-[-40px]`}
      style={{
        background: step.bg,
        color: step.text,
        top: `${120 + index * 40}px`,
        zIndex: index + 1,
        scale: 1 - index * 0.03,
        maxWidth: `${100 - index * 8}%`
      }}
    >
      <div className="ghost-num" style={{ color: step.text }}>{String(index + 1).padStart(2, '0')}</div>
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 relative z-10">
        <div className="md:w-1/3">
          <div className="font-bold text-xs uppercase tracking-widest mb-1 opacity-60">Stage {index + 1}</div>
          <div className="text-4xl md:text-5xl font-black uppercase leading-none mb-1">{step.stage}</div>
          <div className="font-bold text-sm uppercase tracking-widest border-b-2 pb-2 inline-block"
            style={{ borderColor: step.text === '#fff' ? 'rgba(255,255,255,.2)' : 'rgba(0,0,0,.15)' }}>
            {step.label}
          </div>
        </div>
        <div className="md:w-2/3">
          <p className="font-medium text-base leading-relaxed mb-4 opacity-90">
            {step.desc}
          </p>
          <div className="font-black text-xs uppercase tracking-widest px-2 py-1.5 inline-block rounded-[3px]"
            style={{ background: step.text === '#fff' ? 'rgba(255,255,255,.15)' : 'rgba(0,0,0,.1)' }}>
            KPIs: {step.kpi}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const RotatingHub = ({ centerText, items, color, icon: Icon }: any) => {
  return (
    <div className="relative w-full aspect-square max-w-[450px] mx-auto flex items-center justify-center">
      {/* Connection Ring */}
      <div className="absolute inset-0 border-[3px] border-black/10 border-dashed rounded-full scale-[0.85]" />
      
      {/* Central Node */}
      <motion.div 
        whileHover={{ scale: 1.05 }}
        className="z-20 w-32 h-32 md:w-40 md:h-40 rounded-full border-4 border-black flex flex-col items-center justify-center text-center p-4 shadow-[8px_8px_0px_#000] cursor-default" 
        style={{ background: color }}
      >
        {Icon && <Icon size={24} className="mb-2" />}
        <span className="font-black text-xl md:text-2xl uppercase tracking-tighter leading-none">{centerText}</span>
      </motion.div>

      {/* Orbiting Nodes */}
      <div className="absolute inset-0 animate-[spin_30s_linear_infinite] hover:[animation-play-state:paused]">
        {items.map((item: string, i: number) => {
          const angle = (i / items.length) * 2 * Math.PI;
          const radius = 42.5; // percentage
          const x = Math.cos(angle) * radius;
          const y = Math.sin(angle) * radius;
          return (
            <div
              key={item}
              className="absolute w-20 h-20 md:w-24 md:h-24 flex items-center justify-center"
              style={{
                left: `${50 + x}%`,
                top: `${50 + y}%`,
                transform: 'translate(-50%, -50%)'
              }}
            >
              {/* Counter-rotate to keep text upright */}
              <div className="animate-[spin_30s_linear_infinite_reverse] [animation-play-state:inherit] w-full h-full flex items-center justify-center">
                <motion.div 
                  whileHover={{ scale: 1.1, backgroundColor: '#FACC15' }}
                  className="bg-white border-[3px] border-black rounded-full w-full h-full flex items-center justify-center text-center p-2 shadow-[4px_4px_0px_#000] transition-colors cursor-default"
                >
                  <span className="font-black text-[9px] md:text-[11px] uppercase tracking-tight leading-tight">{item}</span>
                </motion.div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

/* ── DATA ── */
const services = [
  {
    icon: <CustomTargetIco />, iconBg: '#FACC15', iconText: '#000', num: '01',
    title: 'Paid Growth Systems',
    items: ['Meta & Google Ads Architecture', 'Audience & Intent Mapping', 'Rapid Creative Testing Framework']
  },
  {
    icon: <CustomZapIco />, iconBg: '#EF4444', iconText: '#fff', num: '02',
    title: 'Funnel & CRO',
    items: ['Landing Page Optimization', 'Frictionless Checkout Flows', 'A/B Testing & Heatmapping']
  },
  {
    icon: <CustomBarIco />, iconBg: '#1D4ED8', iconText: '#fff', num: '03',
    title: 'Analytics & Scale',
    items: ['Attribution Modeling', 'LTV : CAC Optimization', 'Custom Dashboards & Reporting']
  },
  {
    icon: <Lightbulb size={28} />, iconBg: '#10B981', iconText: '#fff', num: '04',
    title: 'Creative Strategy',
    items: ['UGC Scripting & Hooks', 'High-Converting Ad Copy', 'Brand Storytelling']
  },
  {
    icon: <Users size={28} />, iconBg: '#111', iconText: '#fff', num: '05',
    title: 'B2B Lead Gen',
    items: ['Pipeline Building', 'LinkedIn Ad Strategies', 'Manufacturer Acquisition']
  },
  {
    icon: <Search size={28} />, iconBg: '#FACC15', iconText: '#000', num: '06',
    title: 'E-commerce Management',
    items: ['Ecommerce Listing', 'A+ Listing / EBC', 'Omnichannel Campaign Management']
  },
];

const funnelSteps = [
  {
    stage: 'TOF', label: 'Awareness', bg: '#1D4ED8', text: '#fff', width: 'w-full',
    desc: 'Cold audience discovery. Broad creative testing. Video, UGC, and scroll-stop hooks designed to earn attention at scale.',
    kpi: 'CPM · CTR · Thumb-Stop Rate'
  },
  {
    stage: 'MOF', label: 'Consideration', bg: '#FACC15', text: '#000', width: 'w-[85%]',
    desc: 'Retargeting engaged visitors. VSL landing pages. Offer clarity and trust-building to move warm audiences toward intent.',
    kpi: 'CPC · Landing Page CVR · Add-to-Cart'
  },
  {
    stage: 'BOF', label: 'Conversion', bg: '#EF4444', text: '#fff', width: 'w-[70%]',
    desc: 'Dynamic product ads, cart abandonment flows, and purchase-intent audiences. Every rupee here must convert.',
    kpi: 'ROAS · CPA · Revenue · MER'
  },
  {
    stage: 'RET', label: 'Retention', bg: '#10B981', text: '#fff', width: 'w-[55%]',
    desc: 'Email marketing, SMS flows, and loyalty programs to increase LTV and turn customers into brand advocates.',
    kpi: 'LTV · Repeat Purchase Rate'
  },
  {
    stage: 'LOY', label: 'Loyalty', bg: '#111', text: '#fff', width: 'w-[40%]',
    desc: 'Community building and exclusive offers to ensure long-term brand affinity and organic word-of-mouth growth.',
    kpi: 'NPS · Referral Rate'
  },
];

const insights = [
  { tag: 'Meta', tagColor: '#1D4ED8', title: 'Why broad audiences beat interest stacking in 2024', stat: '+34% lower CPA', url: 'articles/broad-audiences-vs-interest-stacking.html' },
  { tag: 'Google', tagColor: '#EF4444', title: 'PMax vs Search: when each wins and when to kill losers fast', stat: 2.1, url: 'articles/pmax-vs-search.html' },
  { tag: 'CRO', tagColor: '#EF4444', title: 'The one-page audit that found ₹40L in leaking revenue', stat: '-28% drop-off', url: 'articles/one-page-revenue-audit.html' },
  { tag: 'Creative', tagColor: '#10B981', title: 'UGC scripts that outperform polished brand videos every time', stat: '3× CTR uplift', url: 'articles/ugc-scripts-vs-polished-videos.html' },
  { tag: 'Meta', tagColor: '#1D4ED8', title: 'The 5-creative testing framework that cut CPA in half', stat: '-50% CPA', url: 'articles/meta-creative-testing-framework.html' },
  { tag: 'D2C', tagColor: '#FACC15', title: 'How I hit 4–6× ROAS for D2C brands without increasing budget', stat: '4–6× ROAS', url: 'articles/d2c-roas-scaling-playbook.html' },
];

const certs = [
  { name: 'Digital Strategies', color: '#EF4444', url: 'https://www.coursera.org/account/accomplishments/verify/LFAN65SYSLYA?utm_source=link&utm_medium=certificate&utm_content=cert_image&utm_campaign=sharing_cta&utm_product=course' },
  { name: 'PG Diploma — Marketing', color: '#10B981', url: 'https://www.credential.net/f434fd6e-ee76-46d9-ad79-2d0edf63a570#acc.GH3enOhN' },
  { name: 'Full Stack Digital Mktg', color: '#FACC15', url: 'https://certificate.givemycertificate.com/c/d66b3424-387c-4ad6-87fe-428dc4-' },
  { name: 'Meta Analytics', color: '#1D4ED8', url: 'https://www.coursera.org/account/accomplishments/verify/LTWAQH6C4BAW' },
  { name: 'Google Course', color: '#10B981', url: 'https://coursera.org/share/e2ba867dd2da73cf43de7a10fc5f084b' },
  { name: 'Customer Understanding', color: '#EF4444', url: 'https://coursera-certificate-images.s3.amazonaws.com/S0G965RB742B' },
];

const marqueeItems = ['Meta Ads', 'Google Ads', 'ROAS Scaling', 'CRO', 'LinkedIn Ads', 'D2C Growth', 'B2B Lead Gen', 'GA4 Analytics', 'Creative Strategy', 'Performance Marketing'];

export default function App() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (cursorRef.current) {
        cursorRef.current.style.left = e.clientX + 'px';
        cursorRef.current.style.top = e.clientY + 'px';
      }
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest('a, button, .hover-lift, .cert-badge, .insight-row, .funnel-card, .exp-card')) {
        cursorRef.current?.classList.add('big');
      }
    };

    const handleMouseOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest('a, button, .hover-lift, .cert-badge, .insight-row, .funnel-card, .exp-card')) {
        cursorRef.current?.classList.remove('big');
      }
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseover', handleMouseOver);
    document.addEventListener('mouseout', handleMouseOut);

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          const fills = entry.target.querySelectorAll('.stat-fill');
          fills.forEach((fill: any) => {
            fill.style.width = fill.dataset.w + '%';
          });
        }
      });
    }, { threshold: 0.12 });

    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseout', handleMouseOut);
      observer.disconnect();
    };
  }, []);

  return (
    <div className="min-h-screen bg-[#F5F3EE] text-[#111111] font-sans selection:bg-[#FACC15] selection:text-black">
      <div id="cursor" ref={cursorRef}></div>
      <motion.div id="scroll-bar" style={{ scaleX, transformOrigin: "0%" }} />

      {/* Grid BG */}
      <div className="fixed inset-0 pointer-events-none z-0 opacity-[0.35]"
        style={{ backgroundImage: 'linear-gradient(to right,#00000012 1px,transparent 1px),linear-gradient(to bottom,#00000012 1px,transparent 1px)', backgroundSize: '4rem 4rem' }} />

      {/* HEADER */}
      <header className="sticky top-0 z-50">
        <div className="bg-[#111] border-b-[3px] border-black">
          <div className="max-w-7xl mx-auto px-6 flex items-center justify-between h-9">
            <div className="hidden md:flex items-center">
              {[
                { label: 'Hero', href: '#hero', color: '#FACC15' },
                { label: 'Services', href: '#services', color: '#1D4ED8' },
                { label: 'Process', href: '#process', color: '#10B981' },
                { label: 'Proof', href: '#proof', color: '#EF4444' },
                { label: 'Insights', href: '#insights', color: '#FACC15' },
                { label: 'Articles', href: 'articles/index.html', color: '#10B981' },
                { label: 'Contact', href: '#contact', color: '#EF4444' },
              ].map((s, i, arr) => (
                <a key={s.label} href={s.href}
                  className="font-bold uppercase text-white transition-all text-[10px] tracking-[.18em] px-3.5 h-9 flex items-center border-r-2 border-[#333] last:border-r-0 hover:bg-[var(--hover-bg)] hover:text-black"
                  style={{ '--hover-bg': s.color } as any}>
                  {s.label}
                </a>
              ))}
            </div>
            <div className="md:hidden flex items-center gap-3 overflow-x-auto no-scrollbar">
              {['Services', 'Process', 'Proof', 'Insights', 'Articles', 'Contact'].map(s => (
                <a key={s} href={s === 'Articles' ? 'articles/index.html' : `#${s.toLowerCase()}`} className="font-bold text-white uppercase flex-shrink-0 text-[9px] tracking-[.16em]">
                  {s}
                </a>
              ))}
            </div>
            <div className="flex items-center border-l-2 border-[#333]">
              <a href="https://www.linkedin.com/in/helstondsouza/" target="_blank" className="w-9 h-9 flex items-center justify-center border-r-2 border-[#333] hover:bg-[#1D4ED8] transition-all">
                <Linkedin size={14} color="white" />
              </a>
              <a href="https://api.whatsapp.com/send?phone=919594729658" target="_blank" className="w-9 h-9 flex items-center justify-center border-r-2 border-[#333] hover:bg-[#10B981] transition-all">
                <MessageCircle size={14} color="white" />
              </a>
              <a href="mailto:helstandsouza@gmail.com" className="w-9 h-9 flex items-center justify-center hover:bg-[#FACC15] transition-all">
                <Mail size={14} color="white" />
              </a>
            </div>
          </div>
        </div>

        <nav className="bg-[#F5F3EE] border-b-4 border-black transition-all duration-300">
          <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
            <div className="font-black text-2xl uppercase tracking-tighter relative group cursor-pointer">
              Helston D'Souza
              <span className="absolute -bottom-0.5 left-0 h-[3px] w-0 group-hover:w-full transition-all duration-300 bg-[#FACC15]"></span>
            </div>
            <div className="hidden md:flex items-center gap-5 font-bold text-xs uppercase tracking-widest">
              <a href="#process" className="hover:text-[#1D4ED8] transition-colors">Process</a>
              <a href="#proof" className="hover:text-[#1D4ED8] transition-colors">Proof</a>
              <a href="articles/index.html" className="hover:text-[#1D4ED8] transition-colors">Articles</a>
              <a href="#contact" className="hover:text-[#1D4ED8] transition-colors">Contact</a>
              <div className="w-[2px] h-5 bg-black/15" />
              <a href="https://calendly.com/helstandsouza/30min" target="_blank" className="bg-[#FACC15] text-black border-[3px] border-black px-5 py-2 rounded shadow-[4px_4px_0px_#000] hover:-translate-y-1 hover:-translate-x-1 hover:shadow-[8px_8px_0px_#000] active:translate-x-1 active:translate-y-1 active:shadow-none transition-all whitespace-nowrap">
                Book a Call
              </a>
            </div>
            <div className="md:hidden flex items-center gap-2">
              <a href="https://calendly.com/helstandsouza/30min" target="_blank" className="bg-[#FACC15] text-black border-[3px] border-black px-3 py-1.5 rounded shadow-[3px_3px_0px_#000] font-bold uppercase text-xs transition-all hover:-translate-y-0.5 hover:-translate-x-0.5 hover:shadow-[5px_5px_0px_#000] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none">
                Talk
              </a>
            </div>
          </div>
        </nav>
      </header>

      <main className="relative z-10">
        {/* HERO */}
        <section id="hero" className="max-w-7xl mx-auto px-6 py-20 md:py-32 grid md:grid-cols-[1.2fr_0.8fr] gap-20 items-center relative">
          <div className="absolute top-14 right-[47%] w-[18px] h-[18px] border-[3px] border-black rotate-45 opacity-20 animate-bounce" />
          <div className="pr-0 md:pr-12">
            <div className="reveal inline-flex items-center gap-2 mb-5 px-3 py-1.5 bg-white border-[3px] border-[#1D4ED8] font-bold text-xs uppercase tracking-widest text-[#1D4ED8] shadow-[3px_3px_0px_#1D4ED8] rounded-[3px]">
              <span className="w-2 h-2 rounded-full bg-[#10B981] inline-block animate-pulse"></span>
              Available for new clients
            </div>
            <h1 className="text-[54px] md:text-[84px] font-black leading-[0.9] tracking-tighter uppercase mb-8">
              <span className="hw d1">Scaling</span> <br />
              <span className="hw">Brands</span> <br />
              <span className="hw d2">With</span> <span className="hw d3">Performance</span> <br />
              <span className="hw d4">Marketing.</span>
            </h1>
            <p className="reveal mb-8 text-lg leading-relaxed text-[#444] max-w-[480px]">
              I help D2C & B2B brands scale profitably on Meta & Google — with <strong className="text-[#111]">data, not guesswork</strong>.
            </p>
            <div className="reveal d1 flex flex-wrap gap-4">
              <a href="https://api.whatsapp.com/send?phone=919594729658&text=Hi%2C%20I%E2%80%99m%20looking%20to%20scale%20my%20business%20with%20performance%20marketing.%20Saw%20your%20portfolio%20and%20would%20love%20to%20connect!" target="_blank" className="bg-[#FACC15] text-black px-6 md:px-8 py-4 font-black uppercase tracking-wider border-[3px] border-black rounded-md shadow-[6px_6px_0px_#000] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[8px_8px_0px_#000] active:translate-x-[6px] active:translate-y-[6px] active:shadow-none transition-all flex items-center gap-2">
                Start Scaling <ArrowUpRight size={22} strokeWidth={3} />
              </a>
              <a href="#proof" className="bg-white text-black px-6 md:px-8 py-4 font-bold uppercase tracking-wider border-[3px] border-black rounded-md shadow-[6px_6px_0px_#000] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[8px_8px_0px_#000] active:translate-x-[6px] active:translate-y-[6px] active:shadow-none transition-all flex items-center gap-2">
                View Proof <ArrowRight size={18} />
              </a>
            </div>
            <div className="reveal d2 flex flex-wrap gap-3 items-center mt-8 pt-5 border-t-2 border-black/10">
              <span className="font-bold text-xs uppercase tracking-widest text-gray-500">Trusted in</span>
              {['D2C', 'SaaS', 'EdTech', 'Fintech'].map(b => (
                <span key={b} className="font-bold text-xs uppercase px-2 py-1 bg-white border-2 border-black rounded-[3px]">{b}</span>
              ))}
            </div>
          </div>

          <div className="reveal from-right bg-[#10B981] border-4 border-black p-8 md:p-12 shadow-[12px_12px_0px_#000] rounded-md rotate-1 hover:rotate-0 transition-transform duration-300">
            <h3 className="text-3xl font-black uppercase mb-8 border-b-[3px] border-black pb-4">By The Numbers</h3>
            <ul className="space-y-5">
              {[
                { icon: <Target size={32} />, iconColor: 'text-[#EF4444]', val: '2–5x', lbl: 'ROAS Delivered', w: 88 },
                { icon: <BarChart3 size={32} />, iconColor: 'text-[#1D4ED8]', val: '30 Crores', lbl: 'Ad Spend Managed', w: 100 },
                { icon: <Zap size={32} />, iconColor: 'text-[#FACC15]', val: '10+', lbl: 'Industries Scaled', w: 72 },
                { icon: <Search size={32} />, iconColor: 'text-[#111]', val: '42%', lbl: 'Avg. CPA Reduction', w: 80 },
              ].map(s => (
                <li key={s.lbl} className="flex items-center gap-4">
                  <div className={`bg-white border-[3px] border-black p-2 shadow-[4px_4px_0px_#000] ${s.iconColor} flex-shrink-0`}>
                    {s.icon}
                  </div>
                  <div className="flex-1">
                    <div className="text-4xl font-black">{s.val}</div>
                    <div className="font-bold text-lg uppercase tracking-tight">{s.lbl}</div>
                    <div className="stat-track"><div className="stat-fill" data-w={s.w}></div></div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* MARQUEE */}
        <div className="mq-outer py-3.5 bg-[#111111] border-y-4 border-black">
          <div className="mq-track">
            {[...marqueeItems, ...marqueeItems].map((item, i) => (
              <div key={i} className="mq-item text-white">
                <span className="mq-dot"></span>{item}
              </div>
            ))}
          </div>
        </div>

        {/* STATEMENT */}
        <section className="reveal w-full bg-[#1D4ED8] py-16 md:py-24 px-6 text-center relative overflow-hidden border-y-4 border-black">
          <div className="absolute inset-0 pointer-events-none opacity-5" style={{ backgroundImage: 'repeating-linear-gradient(0deg,transparent,transparent 58px,white 58px,white 59px),repeating-linear-gradient(90deg,transparent,transparent 58px,white 58px,white 59px)' }} />
          <div className="absolute -top-6 left-2 text-[170px] font-black text-white/5 leading-none pointer-events-none select-none">"</div>
          <h2 className="text-white text-3xl md:text-5xl font-black text-center uppercase tracking-tighter leading-tight max-w-4xl mx-auto drop-shadow-[4px_4px_0px_#000] relative z-10">
            "I build revenue systems, not just ad campaigns."
          </h2>
        </section>

        {/* SERVICES (WHAT I DO) */}
        <section id="services" className="max-w-7xl mx-auto px-6 py-24 border-t-4 border-black">
          <div className="grid md:grid-cols-2 gap-16 items-center mb-20">
            <div className="reveal">
              <h2 className="text-5xl md:text-7xl font-black tracking-tighter uppercase mb-6 inline-block border-b-4 border-black pb-2">
                What I Do
              </h2>
              <p className="text-lg text-gray-500 font-medium mb-8 max-w-lg">
                I don't just run ads; I build full-funnel growth ecosystems. My approach combines technical precision with creative strategy to drive actual business outcomes.
              </p>
              <div className="space-y-4">
                {['Meta & Google Ads Scaling', 'Funnel Optimization & CRO', 'Revenue-Focused Analytics'].map((item, i) => (
                  <div key={item} className="flex items-center gap-3 font-black uppercase text-sm">
                    <div className="w-6 h-6 bg-black text-white flex items-center justify-center rounded-full text-[10px]">{i + 1}</div>
                    {item}
                  </div>
                ))}
              </div>
            </div>
            <div className="reveal from-right">
              <RotatingHub 
                centerText="Growth" 
                color="#FACC15" 
                icon={Target}
                items={['Meta Ads', 'Google Ads', 'CRO', 'GA4', 'Creative', 'Lead Gen']} 
              />
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {services.map((s, i) => (
              <div key={s.num} className={`reveal d${i + 1} hover-lift bg-white border-[3px] border-black rounded-md p-8 shadow-[8px_8px_0px_#000] relative overflow-hidden`}>
                <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#000_2px,transparent_2px)] bg-[size:16px_16px]" />
                <div className="ghost-num">{s.num}</div>
                <div className="relative z-10">
                  <div className="w-14 h-14 border-[3px] border-black mb-5 flex items-center justify-center shadow-[4px_4px_0px_#000]"
                    style={{ background: s.iconBg, color: s.iconText }}>
                    {s.icon}
                  </div>
                  <div className="font-bold text-xs uppercase tracking-widest mb-2 text-gray-400">{s.num} /</div>
                  <h3 className="text-2xl font-black uppercase tracking-tight mb-6">{s.title}</h3>
                  <ul className="space-y-3 font-bold">
                    {s.items.map(item => (
                      <li key={item} className="flex gap-2 items-start">
                        <CheckSquare size={17} className="mt-1 flex-shrink-0" /> {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* FUNNEL FRAMEWORK */}
        <section id="process" className="bg-white border-y-4 border-black">
          <div className="max-w-7xl mx-auto px-6 py-24">
            <h2 className="text-5xl md:text-7xl font-black tracking-tighter uppercase mb-4 inline-block border-b-4 border-black pb-2 reveal">
              The Funnel Framework
            </h2>
            <p className="reveal text-lg text-gray-500 font-medium mb-12 mt-3 max-w-lg">
              Every campaign maps to a full-funnel architecture. Here's how I think from first impression to final conversion and beyond.
            </p>
            <div className="flex flex-col items-center gap-0 relative">
              {funnelSteps.map((step, i) => (
                <FunnelCard key={step.stage} step={step} index={i} total={funnelSteps.length} />
              ))}
            </div>
          </div>
        </section>

        {/* PROOF */}
        <section id="proof" className="bg-white border-b-4 border-black">
          <div className="max-w-7xl mx-auto px-6 py-24">
            <h2 className="text-5xl md:text-7xl font-black tracking-tighter uppercase mb-4 inline-block border-b-4 border-black pb-2 reveal">
              Proof, Not Promises.
            </h2>

            <div className="reveal grid grid-cols-2 md:grid-cols-4 gap-0 border-4 border-black mb-16 mt-8 shadow-[6px_6px_0px_#000] md:shadow-[8px_8px_0px_#000] rounded-2xl overflow-hidden">
              {[
                { val: '₹30 Cr+', lbl: 'Budget Managed', bg: '#FACC15', text: '#000', hoverBg: '#000', hoverText: '#FACC15' },
                { val: '₹50 Cr+', lbl: 'Revenue Generated', bg: '#111', text: '#fff', hoverBg: '#fff', hoverText: '#111' },
                { val: '4–6×', lbl: 'Peak ROAS (D2C)', bg: '#1D4ED8', text: '#fff', hoverBg: '#fff', hoverText: '#1D4ED8' },
                { val: '3+ Yrs', lbl: 'Performance Track', bg: '#EF4444', text: '#fff', hoverBg: '#fff', hoverText: '#EF4444' },
              ].map((s, i) => (
                <div key={s.lbl} className="p-4 md:p-6 relative group overflow-hidden border-r-2 md:border-r-4 border-black last:border-r-0 transition-colors duration-300"
                  style={{ background: s.bg, color: s.text } as any}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = s.hoverBg;
                    e.currentTarget.style.color = s.hoverText;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = s.bg;
                    e.currentTarget.style.color = s.text;
                  }}>
                  <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="font-black text-3xl md:text-4xl leading-none mb-1 group-hover:scale-105 transition-transform">{s.val}</div>
                  <div className="font-bold text-xs uppercase tracking-widest opacity-75">{s.lbl}</div>
                </div>
              ))}
            </div>

            <div className="relative overflow-hidden py-4">
              <div className="flex gap-6 animate-marquee-fast hover:pause-marquee">
                {[...Array(2)].map((_, idx) => (
                  <React.Fragment key={idx}>
                    {/* Empower India */}
                    <div className="exp-card flex-shrink-0 w-[320px] md:w-[400px] border-4 border-black bg-[#FACC15] shadow-[8px_8px_0px_#000] rounded-2xl p-8 relative overflow-hidden transition-all hover:-translate-y-1.5 hover:shadow-[12px_12px_0px_#000]">
                      <div className="absolute -top-4 -right-4 text-[140px] font-black opacity-[0.03] leading-none pointer-events-none rotate-12">
                        <Target size={140} />
                      </div>
                      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full opacity-[0.02] pointer-events-none" 
                        style={{ backgroundImage: 'radial-gradient(circle, #000 1px, transparent 1px)', backgroundSize: '12px 12px' }} />
                      <div className="absolute bottom-4 left-4 opacity-[0.05] pointer-events-none">
                        <Zap size={60} />
                      </div>
                      <div className="relative z-10">
                        <div className="flex justify-between items-start gap-3 mb-4">
                          <div>
                            <div className="font-black text-xs uppercase tracking-widest opacity-50 mb-1">Solar Outsourcing</div>
                            <h3 className="font-black uppercase text-2xl leading-tight tracking-tighter">Empower India</h3>
                            <div className="font-bold text-sm uppercase tracking-wide mt-1 opacity-70">B2B & Home Solar</div>
                          </div>
                          <div className="bg-black text-white px-3 py-1.5 border-[3px] border-black shadow-[3px_3px_0 rgba(0,0,0,.3)] text-[11px] font-black uppercase tracking-widest rounded-lg">1.6+ CTR</div>
                        </div>
                        <ul className="flex flex-col gap-2.5 border-t-[3px] border-black/20 pt-4">
                          {[
                            'Lead gen for manufacturers & b2b sales.',
                            'Generated 20-400 leads for home/business solar.',
                            'Achieved 1.6+ CTR on YouTube and Meta ads.',
                          ].map(b => (
                            <li key={b} className="flex gap-2 text-sm font-semibold leading-relaxed">
                              <span className="flex-shrink-0 mt-0.5">➔</span>{b}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    {/* Sports Athlete Supplements */}
                    <div className="exp-card flex-shrink-0 w-[320px] md:w-[400px] border-4 border-black bg-[#1D4ED8] text-white shadow-[8px_8px_0px_#000] rounded-2xl p-8 relative overflow-hidden transition-all hover:-translate-y-1.5 hover:shadow-[12px_12px_0px_#000]">
                      <div className="absolute -top-4 -right-4 text-[140px] font-black opacity-[0.07] leading-none pointer-events-none -rotate-12">
                        <BarChart3 size={140} />
                      </div>
                      <div className="absolute top-0 left-0 w-full h-full opacity-[0.03] pointer-events-none" 
                        style={{ backgroundImage: 'linear-gradient(45deg, #fff 25%, transparent 25%, transparent 50%, #fff 50%, #fff 75%, transparent 75%, transparent)', backgroundSize: '20px 20px' }} />
                      <div className="absolute bottom-4 left-4 opacity-[0.08] pointer-events-none">
                        <Zap size={60} />
                      </div>
                      <div className="relative z-10">
                        <div className="flex justify-between items-start gap-3 mb-4">
                          <div>
                            <div className="font-black text-xs uppercase tracking-widest opacity-50 mb-1">D2C Scaling</div>
                            <h3 className="font-black uppercase text-2xl leading-tight tracking-tighter">Athlete Supplements</h3>
                            <div className="font-bold text-sm uppercase tracking-wide mt-1 opacity-70">PMax & Meta Catalog</div>
                          </div>
                          <div className="bg-[#FACC15] text-black px-3 py-1.5 border-[3px] border-white/40 shadow-[3px_3px_0 rgba(0,0,0,.3)] text-[11px] font-black uppercase tracking-widest rounded-lg">3+ ROAS</div>
                        </div>
                        <ul className="flex flex-col gap-2.5 border-t-2 border-white/20 pt-4">
                          {[
                            'Scaled Meta catalog ads for high-intent buyers.',
                            'Implemented PMax campaigns for broad reach.',
                            'Maintained consistent 3+ ROAS during scaling.',
                          ].map(b => (
                            <li key={b} className="flex gap-2 text-sm font-semibold leading-relaxed">
                              <span className="flex-shrink-0 mt-0.5">➔</span>{b}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    {/* Celebrity Dentist */}
                    <div className="exp-card flex-shrink-0 w-[320px] md:w-[400px] border-4 border-black bg-[#EF4444] text-white shadow-[8px_8px_0px_#000] rounded-2xl p-8 relative overflow-hidden transition-all hover:-translate-y-1.5 hover:shadow-[12px_12px_0px_#000]">
                      <div className="absolute -top-4 -right-4 text-[140px] font-black opacity-[0.07] leading-none pointer-events-none rotate-45">
                        <MessageCircle size={140} />
                      </div>
                      <div className="absolute inset-0 opacity-[0.04] pointer-events-none" 
                        style={{ backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 10px, #fff 10px, #fff 11px)' }} />
                      <div className="absolute bottom-4 left-4 opacity-[0.08] pointer-events-none">
                        <Target size={60} />
                      </div>
                      <div className="relative z-10">
                        <div className="flex justify-between items-start gap-3 mb-4">
                          <div>
                            <div className="font-black text-xs uppercase tracking-widest opacity-50 mb-1">Lead Generation</div>
                            <h3 className="font-black uppercase text-2xl leading-tight tracking-tighter">Celebrity Dentist</h3>
                            <div className="font-bold text-sm uppercase tracking-wide mt-1 opacity-70">Click-to-WhatsApp</div>
                          </div>
                          <div className="bg-black text-white px-3 py-1.5 border-[3px] border-white/25 shadow-[3px_3px_0 rgba(0,0,0,.4)] text-[11px] font-black uppercase tracking-widest rounded-lg">High Intent</div>
                        </div>
                        <ul className="flex flex-col gap-2.5 border-t-2 border-white/20 pt-4">
                          {[
                            'Workshop & clinic lead gen via WhatsApp ads.',
                            'High-conversion funnel for premium dental services.',
                            'Optimized ad copy for local intent and trust.',
                          ].map(b => (
                            <li key={b} className="flex gap-2 text-sm font-semibold leading-relaxed">
                              <span className="flex-shrink-0 mt-0.5">➔</span>{b}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    {/* Trekking & Tours */}
                    <div className="exp-card flex-shrink-0 w-[320px] md:w-[400px] border-4 border-black bg-[#10B981] text-white shadow-[8px_8px_0px_#000] rounded-2xl p-8 relative overflow-hidden transition-all hover:-translate-y-1.5 hover:shadow-[12px_12px_0px_#000]">
                      <div className="absolute -top-4 -right-4 text-[140px] font-black opacity-[0.07] leading-none pointer-events-none -rotate-12">
                        <Target size={140} />
                      </div>
                      <div className="absolute inset-0 opacity-[0.02] pointer-events-none" 
                        style={{ backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)', backgroundSize: '24px 24px' }} />
                      <div className="absolute bottom-4 left-4 opacity-[0.05] pointer-events-none">
                        <Zap size={60} />
                      </div>
                      <div className="relative z-10">
                        <div className="flex justify-between items-start gap-3 mb-4">
                          <div>
                            <div className="font-black text-xs uppercase tracking-widest opacity-50 mb-1">Batch Scaling</div>
                            <h3 className="font-black uppercase text-2xl leading-tight tracking-tighter">Trekking & Tours</h3>
                            <div className="font-bold text-sm uppercase tracking-wide mt-1 opacity-70">₹50 CPA</div>
                          </div>
                          <div className="bg-black text-white px-3 py-1.5 border-[3px] border-white/25 shadow-[3px_3px_0 rgba(0,0,0,.4)] text-[11px] font-black uppercase tracking-widest rounded-lg">₹12-35 Leads</div>
                        </div>
                        <ul className="flex flex-col gap-2.5 border-t-2 border-white/20 pt-4">
                          {[
                            'Achieved ₹50 CPA for tour batch bookings.',
                            'Lead costs optimized between ₹12–35.',
                            'Scaled campaigns for seasonal travel demand.',
                          ].map(b => (
                            <li key={b} className="flex gap-2 text-sm font-semibold leading-relaxed">
                              <span className="flex-shrink-0 mt-0.5">➔</span>{b}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </React.Fragment>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* INSIGHTS */}
        <section id="insights" className="max-w-7xl mx-auto px-6 py-24">
          <div className="flex flex-wrap justify-between items-end gap-4 mb-12">
            <div>
              <h2 className="text-5xl md:text-7xl font-black tracking-tighter uppercase inline-block border-b-4 border-black pb-2 reveal">
                Insights
              </h2>
            </div>
            <a href="articles/index.html" className="reveal font-black text-sm uppercase tracking-widest px-5 py-3 border-[3px] border-black bg-[#FACC15] shadow-[4px_4px_0px_#000] hover:-translate-y-0.5 hover:shadow-[6px_6px_0px_#000] transition-all rounded flex-shrink-0">
              All Articles →
            </a>
          </div>
          <div className="flex flex-col rounded border-4 border-black shadow-[8px_8px_0px_#000] overflow-hidden">
            {insights.map((ins, i) => (
              <a key={ins.title} href={ins.url} className={`insight-row reveal d${Math.min(i % 4 + 1, 4)} flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 p-5 md:p-6 border-b-[3px] border-black last:border-b-0 hover:bg-white transition-colors`}
                style={{ background: i % 2 === 0 ? '#F5F3EE' : '#fff' }}>
                <div className="flex items-center gap-3 flex-1 min-w-0">
                  <span className="flex-shrink-0 font-extrabold text-[10px] uppercase tracking-widest px-2 py-1 border-2 border-black rounded-[3px]"
                    style={{ background: ins.tagColor, color: ins.tagColor === '#FACC15' ? '#000' : '#fff' }}>
                    {ins.tag}
                  </span>
                  <span className="font-black text-base md:text-lg leading-tight truncate">
                    {ins.title}
                  </span>
                </div>
                <div className="flex items-center gap-3 flex-shrink-0">
                  <span className="font-black text-xs uppercase tracking-widest px-3 py-1.5 bg-black text-white rounded-[3px] whitespace-nowrap">
                    {ins.stat}
                  </span>
                  <ArrowRight size={16} strokeWidth={3} />
                </div>
              </a>
            ))}
          </div>
        </section>

        {/* CERTS */}
        <section id="certs" className="max-w-7xl mx-auto px-6 py-20">
          <div className="reveal w-full h-[3px] bg-black mb-10"></div>
          <h2 className="text-3xl font-black tracking-tighter uppercase mb-8 reveal">Certifications & Stack</h2>
          <div className="reveal flex flex-wrap gap-4">
            {certs.map((c, i) => (
              <a key={c.name} href={c.url} target="_blank" className="cert-badge bg-white px-6 py-3 border-[3px] border-black rounded-md font-bold uppercase tracking-tight shadow-[4px_4px_0px_#000] flex items-center gap-3 transition-all">
                <span className="w-2.5 h-2.5 rounded-full flex-shrink-0 animate-pulse" style={{ background: c.color }} />
                {c.name}
                <ArrowUpRight size={14} className="opacity-50" />
              </a>
            ))}
          </div>
        </section>

        {/* WHY ME (Parallax) */}
        <section id="whyme" className="relative pb-0">
          <div className="parallax-panel bg-[#FACC15] border-4 border-black flex items-center p-[clamp(30px,6vw,80px)_clamp(20px,5vw,60px)] md:p-[clamp(40px,8vw,100px)_clamp(24px,6vw,80px)] overflow-hidden z-[11] sticky md:sticky mb-8 md:mb-0"
            style={{ top: 'clamp(60px, 10vh, 80px)' }}>
            <div className="absolute -right-5 -bottom-10 text-[180px] md:text-[260px] font-black opacity-5 leading-none pointer-events-none">01</div>
            <div className="absolute top-0 left-[clamp(20px,5vw,60px)] md:left-[clamp(24px,6vw,80px)] w-[2px] md:w-[3px] h-full bg-black/10" />
            <div className="max-w-[640px] relative z-10">
              <div className="font-black text-[10px] md:text-xs uppercase tracking-widest mb-3 md:mb-4 opacity-40">01 / Differentiator</div>
              <h2 className="font-black uppercase tracking-tighter leading-[0.9] mb-4 md:mb-6 text-[clamp(36px,7vw,84px)] md:text-[clamp(48px,8vw,96px)] text-[#111] drop-shadow-[2px_2px_0px_rgba(255,255,255,0.5)]">
                Founder-Level<br />Thinking.
              </h2>
              <p className="font-bold leading-relaxed mb-6 md:mb-8 text-[clamp(14px,1.8vw,18px)] md:text-[clamp(16px,2vw,20px)] text-[#111] max-w-[500px] bg-white/40 backdrop-blur-md p-5 md:p-6 rounded-xl border border-white/20">
                I don't just look at platform metrics. I look at your margins, supply chain logic, and bottom-line profit. If spending more doesn't make business sense, we don't scale it.
              </p>
              <div className="flex flex-wrap gap-2">
                {['P&L Awareness', 'Margin-First Scaling', 'Profit > Vanity'].map(t => (
                  <span key={t} className="bg-[#111] text-white border-2 md:border-[3px] border-black px-3 py-1 md:px-3.5 md:py-1.5 text-[9px] md:text-xs font-bold uppercase tracking-widest rounded shadow-[2px_2px_0_rgba(0,0,0,.2)]">
                    {t}
                  </span>
                ))}
              </div>
            </div>
            <div className="panel-shimmer absolute inset-0 bg-[radial-gradient(circle_at_var(--mx,50%)_var(--my,50%),rgba(255,255,255,.18)_0%,transparent_60%)] opacity-0 transition-opacity duration-300 pointer-events-none z-20" />
          </div>

          <div className="parallax-panel bg-[#1D4ED8] text-white border-4 border-black flex items-center p-[clamp(30px,6vw,80px)_clamp(20px,5vw,60px)] md:p-[clamp(40px,8vw,100px)_clamp(24px,6vw,80px)] overflow-hidden z-[12] sticky md:sticky mb-8 md:mb-0"
            style={{ top: 'clamp(100px, 15vh, 120px)' }}>
            <div className="absolute -right-5 -bottom-10 text-[180px] md:text-[260px] font-black opacity-10 leading-none pointer-events-none">02</div>
            <div className="absolute top-0 left-[clamp(20px,5vw,60px)] md:left-[clamp(24px,6vw,80px)] w-[2px] md:w-[3px] h-full bg-white/10" />
            <div className="max-w-[640px] relative z-10">
              <div className="font-black text-[10px] md:text-xs uppercase tracking-widest mb-3 md:mb-4 opacity-40">02 / Differentiator</div>
              <h2 className="font-black uppercase tracking-tighter leading-[0.9] mb-4 md:mb-6 text-[clamp(36px,7vw,84px)] md:text-[clamp(48px,8vw,96px)] drop-shadow-[4px_4px_0_rgba(0,0,0,0.4)]">
                Testing<br />At Scale.
              </h2>
              <p className="font-bold leading-relaxed mb-6 md:mb-8 text-[clamp(14px,1.8vw,18px)] md:text-[clamp(16px,2vw,20px)] text-white max-w-[500px] bg-black/40 backdrop-blur-md p-5 md:p-6 rounded-xl border border-white/10">
                Opinion is irrelevant; data dictates direction. I run high-velocity creative and audience tests to find winners fast — and kill losers even faster before they drain budget.
              </p>
              <div className="flex flex-wrap gap-2">
                {['Velocity Testing', 'Creative Iterations', 'Kill Switches'].map(t => (
                  <span key={t} className="bg-white/15 text-white border border-white/30 px-3 py-1 md:px-3.5 md:py-1.5 text-[9px] md:text-xs font-bold uppercase tracking-widest rounded">
                    {t}
                  </span>
                ))}
              </div>
            </div>
            <div className="panel-shimmer absolute inset-0 bg-[radial-gradient(circle_at_var(--mx,50%)_var(--my,50%),rgba(255,255,255,.12)_0%,transparent_60%)] opacity-0 transition-opacity duration-300 pointer-events-none z-20" />
          </div>

          <div className="parallax-panel bg-[#EF4444] text-white border-4 border-black flex items-center p-[clamp(30px,6vw,80px)_clamp(20px,5vw,60px)] md:p-[clamp(40px,8vw,100px)_clamp(24px,6vw,80px)] overflow-hidden z-[13] sticky md:sticky mb-8 md:mb-0"
            style={{ top: 'clamp(140px, 20vh, 160px)' }}>
            <div className="absolute -right-5 -bottom-10 text-[180px] md:text-[260px] font-black opacity-10 leading-none pointer-events-none">03</div>
            <div className="absolute top-0 left-[clamp(20px,5vw,60px)] md:left-[clamp(24px,6vw,80px)] w-[2px] md:w-[3px] h-full bg-white/10" />
            <div className="max-w-[640px] relative z-10">
              <div className="font-black text-[10px] md:text-xs uppercase tracking-widest mb-3 md:mb-4 opacity-40">03 / Differentiator</div>
              <h2 className="font-black uppercase tracking-tighter leading-[0.9] mb-4 md:mb-6 text-[clamp(36px,7vw,84px)] md:text-[clamp(48px,8vw,96px)] drop-shadow-[4px_4px_0_rgba(0,0,0,0.4)]">
                Revenue<br />Obsessed.
              </h2>
              <p className="font-bold leading-relaxed mb-6 md:mb-8 text-[clamp(14px,1.8vw,18px)] md:text-[clamp(16px,2vw,20px)] text-white max-w-[500px] bg-black/40 backdrop-blur-md p-5 md:p-6 rounded-xl border border-white/10">
                Clicks and impressions are vanity. Revenue is sanity. Every report I produce is built around qualified pipeline, purchases, and maximizing LTV — not CTR.
              </p>
              <div className="flex flex-wrap gap-2">
                {['Purchases First', 'LTV Maximization', 'No Vanity Metrics'].map(t => (
                  <span key={t} className="bg-white/15 text-white border border-white/30 px-3 py-1 md:px-3.5 md:py-1.5 text-[9px] md:text-xs font-bold uppercase tracking-widest rounded">
                    {t}
                  </span>
                ))}
              </div>
            </div>
            <div className="panel-shimmer absolute inset-0 bg-[radial-gradient(circle_at_var(--mx,50%)_var(--my,50%),rgba(255,255,255,.12)_0%,transparent_60%)] opacity-0 transition-opacity duration-300 pointer-events-none z-20" />
          </div>

          {/* READY TO SCALE (Final Parallax Panel) */}
          <section id="contact" className="parallax-panel min-h-screen bg-[#FACC15] border-4 border-black flex flex-col items-center justify-center p-6 md:p-24 text-center overflow-hidden z-[14] sticky md:sticky"
            style={{ top: 'clamp(180px, 25vh, 200px)' }}>
              <div className="absolute inset-0 pointer-events-none opacity-10" style={{ background: 'radial-gradient(circle at center, #0F0F0F 1px, transparent 1px)', backgroundSize: '22px 22px' }} />
              <div className="absolute top-6 right-8 w-20 h-20 border-4 border-black rounded-full opacity-10 animate-[spin_20s_linear_infinite]" />
              <div className="absolute bottom-6 left-8 w-12 h-2.5 bg-black opacity-10 rotate-[40deg]" />

              <div className="reveal relative z-10 max-w-4xl w-full mx-auto flex flex-col items-center flex-grow justify-center">
                <h2 className="text-5xl md:text-[96px] font-black uppercase tracking-tighter leading-[0.8] mb-6 drop-shadow-[4px_4px_0px_#fff]">
                  Ready To Scale?
                </h2>
                <p className="text-xl md:text-3xl font-bold uppercase tracking-wide mb-10 border-b-[3px] border-black pb-2 inline-block">
                  Let's build your growth engine.
                </p>

                <div className="flex flex-wrap justify-center gap-3 md:gap-4 mb-8">
                  <div className="flex items-center gap-2 bg-white border-[2px] md:border-[3px] border-black px-3 py-1.5 md:px-4 md:py-2 rounded shadow-[2px_2px_0px_#000] md:shadow-[3px_3px_0px_#000]">
                    <span className="text-base md:text-lg">🔍</span>
                    <div className="text-left">
                      <div className="font-black text-[10px] md:text-xs uppercase tracking-widest text-black">Free Account Audit</div>
                      <div className="font-medium text-[8px] md:text-[10px] text-gray-500">We'll find what's leaking revenue</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 bg-white border-[2px] md:border-[3px] border-black px-3 py-1.5 md:px-4 md:py-2 rounded shadow-[2px_2px_0px_#000] md:shadow-[3px_3px_0px_#000]">
                    <span className="text-base md:text-lg">⚡</span>
                    <div className="text-left">
                      <div className="font-black text-[10px] md:text-xs uppercase tracking-widest text-black">7-Day Trial Sprint</div>
                      <div className="font-medium text-[8px] md:text-[10px] text-gray-500">Results before you commit</div>
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap justify-center gap-4 mb-6">
                  <a href="https://calendly.com/helstandsouza/30min" target="_blank" className="btn-pulse bg-black text-white px-6 md:px-12 py-4 md:py-6 text-lg md:text-2xl font-black uppercase tracking-widest border-4 border-black rounded-md shadow-[6px_6px_0px_rgba(0,0,0,.25)] md:shadow-[8px_8px_0px_rgba(0,0,0,.25)] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[10px_10px_0px_rgba(0,0,0,.25)] active:translate-x-2 active:translate-y-2 active:shadow-none transition-all inline-flex items-center gap-3">
                    Book A Strategy Call <ArrowUpRight size={22} strokeWidth={3} className="w-5 h-5 md:w-6 md:h-6" />
                  </a>
                  <a href="https://api.whatsapp.com/send?phone=919594729658&text=Hi%2C%20I%E2%80%99m%20looking%20to%20scale%20my%20business%20with%20performance%20marketing.%20Saw%20your%20portfolio%20and%20would%20love%20to%20connect!" target="_blank" className="bg-[#10B981] text-white px-6 md:px-10 py-4 md:py-6 text-lg md:text-2xl font-black uppercase tracking-widest border-4 border-black rounded-md shadow-[6px_6px_0px_rgba(0,0,0,.2)] md:shadow-[8px_8px_0px_rgba(0,0,0,.2)] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[10px_10px_0px_rgba(0,0,0,.2)] active:translate-x-2 active:translate-y-2 active:shadow-none transition-all inline-flex items-center gap-3">
                    <MessageCircle size={24} fill="white" className="w-5 h-5 md:w-6 md:h-6" />
                    Start Scaling
                  </a>
                </div>
                <p className="font-bold text-[10px] md:text-xs uppercase tracking-widest opacity-40">
                  Free audit · 7-day trial · No commitment needed
                </p>
              </div>

              {/* MINIMAL FOOTER BAR */}
              <div className="w-full max-w-7xl mx-auto pt-12 mt-auto border-t-2 border-black/10 flex flex-col md:flex-row justify-between items-center gap-4 relative z-10">
                <p className="font-black text-xs uppercase tracking-widest text-black/60">
                  © {new Date().getFullYear()} Helston D'Souza &nbsp;·&nbsp; Numbers {'>'} Noise
                </p>
                <div className="flex gap-6">
                  <a href="https://www.linkedin.com/in/helstondsouza/" target="_blank" className="font-black text-[10px] uppercase tracking-widest hover:text-[#1D4ED8] transition-colors">LinkedIn</a>
                  <a href="https://api.whatsapp.com/send?phone=919594729658" target="_blank" className="font-black text-[10px] uppercase tracking-widest hover:text-[#10B981] transition-colors">WhatsApp</a>
                  <a href="mailto:helstandsouza@gmail.com" className="font-black text-[10px] uppercase tracking-widest hover:text-white transition-colors">Email</a>
                </div>
              </div>
          </section>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="bg-[#F5F3EE] border-t-4 border-black relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none opacity-5 z-0" style={{ backgroundImage: 'linear-gradient(to right,black 1px,transparent 1px),linear-gradient(to bottom,black 1px,transparent 1px)', backgroundSize: '48px 48px' }} />

        {/* Floating Decorations */}
        <div className="absolute -top-12 -right-14 w-[220px] h-[220px] border-[6px] border-black rounded-full opacity-5 animate-[spin_28s_linear_infinite]" />
        <div className="absolute top-20 left-[2%] w-[72px] h-[72px] border-4 border-[#1D4ED8] rounded-full opacity-20 animate-[spin_16s_linear_infinite_reverse]" />
        <div className="absolute top-11 left-[18%] w-[18px] h-[18px] bg-[#FACC15] border-[3px] border-black rounded-full animate-bounce" />

        <div className="max-w-7xl mx-auto px-6 py-16 md:py-20 relative z-10">
          <div className="grid md:grid-cols-2 gap-12 md:gap-20 items-start">
            <div className="flex flex-col gap-6">
              <div className="relative w-full max-w-[280px]">
                {/* Profile Card */}
                <div className="bg-[#FACC15] border-4 border-black rounded-[120px_120px_8px_8px] shadow-[8px_8px_0px_#000] overflow-hidden">
                  <div className="w-full h-80 relative overflow-hidden bg-gray-300">
                    <img
                      src="https://raw.githubusercontent.com/helstan/Helstan.dsouza.26/45932612d15ae9a5c75458118016b0a7ba032146/ChatGPT%20Image%20Feb%2024%2C%202026%2C%2004_50_28%20PM%20(2).png"
                      alt="Helston D'Souza"
                      className="w-full h-full object-cover object-top grayscale-0 contrast-[1.05]"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div className="bg-[#1D4ED8] p-3.5 border-t-4 border-black text-center">
                    <div className="font-black text-xl text-white uppercase tracking-wider">Helston D'Souza</div>
                    <div className="font-bold text-[11px] text-white/65 uppercase tracking-[.14em] mt-1">Performance Marketer</div>
                  </div>
                </div>
                {/* Floating Badges */}
                <div className="absolute top-11 -right-10 bg-[#FACC15] border-[3px] border-black rounded px-2.5 py-1.5 shadow-[3px_3px_0_#000] -rotate-3 animate-bounce">
                  <span className="font-black text-[11px] uppercase tracking-widest">2–5x ROAS</span>
                </div>
                <div className="absolute bottom-14 -right-10 bg-[#10B981] border-[3px] border-black rounded px-2.5 py-1.5 shadow-[3px_3px_0_#000] rotate-2 animate-pulse">
                  <span className="font-black text-[11px] text-white uppercase tracking-widest">30Cr Managed</span>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-6 pt-2">
              <h2 className="font-black uppercase tracking-tighter text-[clamp(36px,5.5vw,66px)] leading-[0.92] text-[#111]">
                Making Bold<br />Ideas Happen.
              </h2>
              <p className="font-medium text-base leading-relaxed text-gray-600 max-w-[380px]">
                Performance marketer partnering with D2C & B2B brands to craft campaigns that actually drive revenue — not just impressions.
              </p>
              <div className="flex flex-wrap gap-2.5">
                {[
                  { label: 'LinkedIn', bg: '#1D4ED8', text: '#fff', href: 'https://www.linkedin.com/in/helstondsouza/' },
                  { label: 'WhatsApp', bg: '#10B981', text: '#fff', href: 'https://api.whatsapp.com/send?phone=919594729658' },
                  { label: 'Email Me', bg: '#FACC15', text: '#000', href: 'mailto:helstandsouza@gmail.com' },
                ].map(s => (
                  <a key={s.label} href={s.href} target="_blank"
                    className="font-black text-xs uppercase tracking-widest px-5 py-3 border-[3px] border-black rounded shadow-[4px_4px_0px_#000] hover:-translate-y-1 hover:shadow-[6px_6px_0px_#000] active:translate-y-1 active:shadow-none transition-all"
                    style={{ background: s.bg, color: s.text }}>
                    {s.label}
                  </a>
                ))}
              </div>
              <p className="font-bold text-xs uppercase tracking-widest text-gray-400">
                Numbers &gt; Noise &nbsp;·&nbsp; Mumbai, IN
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Marquee */}
        <div className="mq-outer border-t-4 border-black py-3 bg-[#111]">
          <div className="mq-track duration-[18s]">
            {[...Array(2)].flatMap((_, si) =>
              ['Available for New Projects', 'Performance Marketing', 'Meta & Google Ads', 'D2C & B2B Growth', 'Revenue First'].map((item, i) => (
                <div key={`${si}-${i}`} className="mq-item text-white">
                  <Zap size={14} className="text-[#EF4444] fill-current" />
                  {item}
                </div>
              ))
            )}
          </div>
        </div>

        {/* Copyright */}
        <div className="bg-black text-white px-6 py-5 flex flex-col md:flex-row justify-between items-center gap-3 border-t-[3px] border-[#222]">
          <p className="font-bold uppercase tracking-widest text-xs">
            © {new Date().getFullYear()} Helston D'Souza &nbsp;·&nbsp; Numbers {'>'} Noise
          </p>
          <p className="text-xs text-gray-600 uppercase tracking-wider font-bold">
            Performance Marketing · Mumbai, India
          </p>
        </div>
      </footer>
    </div>
  );
}
