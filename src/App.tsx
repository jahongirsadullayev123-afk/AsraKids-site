/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell,
  PieChart, Pie, Legend
} from 'recharts';
import {
  Shield,
  Users,
  BookOpen,
  Heart,
  Globe,
  ArrowRight,
  Instagram,
  Youtube,
  Send,
  CheckCircle2,
  AlertCircle,
  Home,
  Briefcase,
  Stethoscope,
  Quote,
  Menu,
  Award,
  X
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '@/src/lib/utils';
import articlesContent from './content/articles.json';
import newsContent from './content/news.json';
import eventsContent from './content/events.json';
import i18nData from './content/i18n.json';
import { track } from './lib/analytics';
import { tr, trArray, trLocalized, type Lang } from './lib/i18n';

function pickLocalized<T>(lang: Lang, value: { en: T; ru: T; uz: T }) {
  return trLocalized(lang, value);
}

const COLORS = ['#2563EB', '#EF4444', '#0EA5E9', '#38BDF8', '#1E40AF'];

const barData = [
  { name: 'In poverty', value: 26, color: '#2563EB' },
  { name: 'No preschool', value: 70, color: '#EF4444' },
  { name: 'In care', value: 5.5, color: '#0EA5E9' },
  { name: 'Labour risk', value: 4, color: '#EF4444' },
  { name: 'No HIV therapy', value: 69, color: '#7C5CBF' },
  { name: 'Zero-dose infants', value: 2.5, color: '#94A3B8' },
];

const pieData = [
  { name: 'Street selling', value: 30 },
  { name: 'Agriculture', value: 28 },
  { name: 'Manual trades', value: 18 },
  { name: 'Domestic work', value: 14 },
  { name: 'Other', value: 10 },
];

const Nav = ({
  lang,
  setLang,
}: {
  lang: Lang;
  setLang: (lang: Lang) => void;
}) => {
  const [isOpen, setIsOpen] = React.useState(false);

  const navItems = [
    { href: '#home', label: tr(lang, 'nav.home') },
    { href: '#impact', label: tr(lang, 'nav.impact') },
    { href: '#events', label: tr(lang, 'nav.events') },
    { href: '#articles', label: tr(lang, 'nav.articles') },
    { href: '#contact', label: tr(lang, 'nav.contact') },
  ];

  const closeMenu = () => setIsOpen(false);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const targetId = href.startsWith('#') ? href.slice(1) : '';

    // Close menu immediately for better feedback
    closeMenu();

    setTimeout(() => {
      if (targetId === '' || href === '#') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        const element = document.getElementById(targetId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }
    }, 10);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50">
      {/* Header Background (pinned to h-16) */}
      <div className="absolute top-0 left-0 right-0 h-16 bg-black/40 backdrop-blur-xl border-b border-white/10 z-0" />

      <div className="relative h-16 flex items-center justify-between px-8 z-10">
        {/* Logo */}
        <motion.a
          href="#"
          className="flex items-center gap-3 cursor-pointer"
          whileHover={{ scale: 1.05 }}
          onClick={(e) => handleNavClick(e, '#')}
        >
          <div className="w-10 h-10 rounded-full overflow-hidden shadow-lg border border-white/20">
            <img src="/logo.jpg" alt="AsraKids Logo" className="w-full h-full object-cover" />
          </div>
          <div className="flex items-baseline gap-1">
            <span className="text-white font-serif text-3xl font-extrabold">Asra</span>
            <span className="text-cyan-400 font-serif text-3xl italic font-light">Kids</span>
          </div>
        </motion.a>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8 absolute left-1/2 transform -translate-x-1/2">
          {navItems.map((item) => (
            <motion.a
              key={item.href}
              href={item.href}
              className="text-white/80 hover:text-white text-sm font-medium transition-colors duration-200 relative group"
              whileHover={{ color: '#ffffff' }}
              onClick={(e) => handleNavClick(e, item.href)}
            >
              {item.label}
              <motion.span
                className="absolute bottom-[-4px] left-0 w-0 h-0.5 bg-gradient-to-r from-cyan-400 to-blue-500 group-hover:w-full transition-all duration-300"
              />
            </motion.a>
          ))}
        </div>

        {/* Support Button + Mobile Menu Toggle */}
        <div className="flex items-center gap-4">
          <div className="hidden md:flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1.5">
            <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-white/50">
              {tr(lang, 'nav.lang')}
            </span>
            <div className="flex items-center gap-1">
              {(['ru', 'uz', 'en'] as const).map((code) => (
                <button
                  key={code}
                  type="button"
                  onClick={() => setLang(code)}
                  className={cn(
                    'px-2 py-1 rounded-full text-[10px] font-bold tracking-widest uppercase transition-colors',
                    code === lang ? 'bg-white text-[#0F172A]' : 'text-white/60 hover:text-white'
                  )}
                >
                  {code}
                </button>
              ))}
            </div>
          </div>

          <motion.a
            href="#partner"
            className="hidden md:flex items-center px-6 py-2.5 rounded-full bg-white text-gray-900 font-semibold text-sm shadow-lg hover:shadow-xl hover:bg-gray-50 transition-all duration-200"
            whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(255, 255, 255, 0.3)" }}
            whileTap={{ scale: 0.95 }}
            onClick={(e) => {
              handleNavClick(e, '#partner');
              track('cta_click', { id: 'nav_partner', href: '#partner', lang });
            }}
          >
            {tr(lang, 'nav.partner')}
          </motion.a>

          {/* Mobile Menu Button */}
          <motion.button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-white/10 transition-colors relative z-50"
            whileTap={{ scale: 0.95 }}
          >
            {isOpen ? <X className="w-6 h-6 text-white" /> : <Menu className="w-6 h-6 text-white" />}
          </motion.button>
        </div>
      </div>

      {/* Floating Mobile Menu Container */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop for closing */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeMenu}
              className="md:hidden fixed inset-0 bg-black/20 backdrop-blur-sm z-30"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: -20, x: 20, transformOrigin: "top right" }}
              animate={{ opacity: 1, scale: 1, y: 0, x: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: -20, x: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="md:hidden fixed top-20 right-6 w-[280px] bg-black/40 backdrop-blur-3xl border border-white/10 rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.5)] overflow-hidden z-40 p-2"
            >
              <div className="flex flex-col p-4 space-y-1">
                {navItems.map((item, i) => (
                  <motion.a
                    key={item.href}
                    href={item.href}
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className="block w-full text-white/80 text-[13px] tracking-[0.2em] uppercase font-bold hover:text-cyan-400 hover:bg-white/5 transition-all py-4 px-6 rounded-3xl active:scale-95"
                    onClick={(e) => handleNavClick(e, item.href)}
                  >
                    {item.label}
                  </motion.a>
                ))}

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="flex items-center justify-between px-6 pt-6 pb-2 border-t border-white/5 mt-2"
                >
                  <span className="text-[9px] font-black tracking-[0.3em] uppercase text-white/30">
                    {tr(lang, 'nav.lang')}
                  </span>
                  <div className="flex items-center gap-1">
                    {(['ru', 'uz', 'en'] as const).map((code) => (
                      <button
                        key={code}
                        type="button"
                        onClick={() => setLang(code)}
                        className={cn(
                          'px-3 py-1.5 rounded-full text-[10px] font-black tracking-widest uppercase transition-all duration-300',
                          code === lang ? 'bg-white text-black' : 'text-white/40 hover:text-white'
                        )}
                      >
                        {code}
                      </button>
                    ))}
                  </div>
                </motion.div>

                <motion.a
                  href="#partner"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="block w-full text-center px-6 py-5 rounded-[2rem] bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold text-[11px] uppercase tracking-[0.2em] mt-6 shadow-[0_10px_30px_rgba(6,182,212,0.3)] hover:brightness-110 active:scale-95 transition-all"
                  onClick={(e) => {
                    handleNavClick(e, '#partner');
                    track('cta_click', { id: 'nav_partner_mobile', href: '#partner', lang });
                  }}
                >
                  {tr(lang, 'nav.partner')}
                </motion.a>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Hero = ({ lang }: { lang: Lang }) => {
  const [mousePos, setMousePos] = React.useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    const x = (clientX / innerWidth - 0.5) * 20;
    const y = (clientY / innerHeight - 0.5) * 20;
    setMousePos({ x, y });
  };

  return (
    <section
      id="home"
      onMouseMove={handleMouseMove}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#0F172A]"
    >
      {/* Cinematic Background */}
      <motion.div
        initial={{ scale: 1.1, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 3, ease: "easeOut" }}
        className="absolute inset-0 z-0"
      >
        <video
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover"
          poster="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=2400&auto=format&fit=crop"
        >
          <source
            src="https://videos.pexels.com/video-files/7600530/7600530-hd_1920_1080_25fps.mp4"
            type="video/mp4"
          />
        </video>
        <div className="absolute inset-0 bg-black/20" />
      </motion.div>

      {/* Radial Glow for Visibility */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(37,99,235,0.15)_0%,transparent_60%)] pointer-events-none z-10" />

      {/* Floating 3D Elements */}
      <div className="absolute inset-0 pointer-events-none z-10">
        <motion.div
          animate={{
            x: mousePos.x * 1.5,
            y: mousePos.y * 1.5,
            rotateX: -mousePos.y * 0.5,
            rotateY: mousePos.x * 0.5
          }}
          className="absolute top-[20%] right-[10%] w-64 h-80 bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl hidden lg:block overflow-hidden shadow-2xl"
          style={{ perspective: 1000 }}
        >
          <img
            src="https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?q=80&w=600&auto=format&fit=crop"
            className="w-full h-1/2 object-cover opacity-60"
            alt={tr(lang, 'hero.floatingAlt')}
            referrerPolicy="no-referrer"
          />
          <div className="p-6">
            <div className="w-10 h-1 bg-[#EF4444] mb-4" />
            <p className="text-white/80 text-sm font-light leading-relaxed">
              {tr(lang, 'hero.quote')}
            </p>
          </div>
        </motion.div>

        <motion.div
          animate={{
            x: -mousePos.x * 2,
            y: -mousePos.y * 2,
            rotateX: mousePos.y * 0.8,
            rotateY: -mousePos.x * 0.8
          }}
          className="absolute bottom-[15%] left-[5%] p-8 bg-gradient-to-br from-[#2563EB] to-[#1E40AF] rounded-2xl hidden md:block shadow-2xl"
          style={{ perspective: 1000 }}
        >
          <div className="text-4xl font-bold text-white mb-1">37.5%</div>
          <div className="text-[10px] font-bold tracking-widest uppercase text-white/60">
            {tr(lang, 'hero.youthLabel')}
          </div>
        </motion.div>
      </div>

      {/* Main Content */}
      <div className="relative z-20 max-w-7xl mx-auto px-[5vw] text-center pt-24">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <h1 className="text-serif text-7xl md:text-[12vw] lg:text-[10vw] leading-[0.8] tracking-tighter text-white mb-12 drop-shadow-[0_10px_30px_rgba(0,0,0,0.5)]">
            {trArray(lang, 'hero.titleLines')[0]}{' '}
            <span className="text-[#EF4444] italic">{trArray(lang, 'hero.titleLines')[1]}</span> <br />
            <span className="relative">
              {trArray(lang, 'hero.titleLines')[2]}
            </span>
          </h1>

          <p className="text-xl md:text-2xl text-white/60 max-w-3xl mx-auto mb-16 font-light leading-relaxed">
            {tr(lang, 'hero.subtitle')}
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-8">
            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href="#partner"
              className="px-12 py-6 bg-white text-[#0F172A] rounded-full font-bold text-lg shadow-[0_20px_40px_rgba(0,0,0,0.3)] hover:bg-[#2563EB] hover:text-white transition-all duration-500"
              onClick={() => track('cta_click', { id: 'hero_partner', href: '#partner' })}
            >
              {tr(lang, 'hero.ctaPartner')}
            </motion.a>
            <a
              href="#impact"
              className="group flex items-center gap-4 text-white/70 hover:text-white transition-colors"
              onClick={() => track('cta_click', { id: 'hero_explore', href: '#impact' })}
            >
              <div className="w-14 h-14 rounded-full border border-white/20 flex items-center justify-center group-hover:border-[#EF4444] transition-colors">
                <ArrowRight size={24} className="group-hover:translate-x-1 transition-transform" />
              </div>
              <span className="font-bold tracking-widest uppercase text-sm">
                {tr(lang, 'hero.ctaExplore')}
              </span>
            </a>
          </div>
        </motion.div>
      </div>

    </section>
  );
};

const StatsBand = ({ lang }: { lang: Lang }) => (
  <motion.section
    id="impact"
    initial={{ opacity: 0 }}
    whileInView={{ opacity: 1 }}
    viewport={{ once: true }}
    className="bg-[#0F172A] text-[#F8FAFC] py-20 px-[5vw]"
  >
    <div id="crisis" className="contents" />
    <h2 className="text-serif text-3xl md:text-4xl mb-12">{tr(lang, 'impact.title')}</h2>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {i18nData.impact.stats.map((stat, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.1, duration: 0.5 }}
          whileHover={{ y: -5, transition: { duration: 0.2 } }}
          className="bg-white/5 border border-white/10 p-8 rounded-sm relative overflow-hidden group hover:bg-white/10 transition-colors"
        >
          <div className={cn("absolute top-0 left-0 right-0 h-1", stat.color)} />
          <div className="text-serif text-5xl mb-4 text-white">{stat.num}</div>
          <p className="text-sm text-white/60 leading-relaxed">{trLocalized(lang, stat.desc)}</p>
        </motion.div>
      ))}
    </div>
  </motion.section>
);

const Issues = ({ lang }: { lang: Lang }) => (
  <motion.section
    id="issues"
    initial={{ opacity: 0 }}
    whileInView={{ opacity: 1 }}
    viewport={{ once: true }}
    className="bg-[#F8FAFC] py-24 px-[5vw] relative overflow-hidden"
  >
    <div className="absolute top-0 right-0 w-64 h-64 bg-[#2563EB]/5 rounded-full blur-3xl -mr-32 -mt-32" />

    <div className="text-[11px] font-bold tracking-widest uppercase text-[#EF4444] mb-4 flex items-center gap-2">
      <span className="w-8 h-[1px] bg-[#EF4444]" /> {tr(lang, 'issues.kicker')}
    </div>
    <h2 className="text-serif text-4xl md:text-5xl mb-6 max-w-2xl">{tr(lang, 'issues.title')}</h2>
    <p className="text-lg text-[#334155] mb-14 max-w-xl">{tr(lang, 'issues.desc')}</p>

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {i18nData.issues.items.map((issue, i) => (
        <motion.div
          key={issue.key}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.1, duration: 0.5 }}
          whileHover={{ y: -8, transition: { duration: 0.3 } }}
          className="bg-[#F8FAFC] border border-black/10 p-8 rounded-xl hover:shadow-xl transition-all"
        >
          <div className={cn("w-12 h-12 rounded-lg flex items-center justify-center mb-5", issue.color)}>
            {React.cloneElement(
              (
                issue.icon === 'Briefcase'
                  ? (<Briefcase />)
                  : issue.icon === 'AlertCircle'
                    ? (<AlertCircle />)
                    : issue.icon === 'Home'
                      ? (<Home />)
                      : issue.icon === 'BookOpen'
                        ? (<BookOpen />)
                        : issue.icon === 'Stethoscope'
                          ? (<Stethoscope />)
                          : (<Globe />)
              ) as React.ReactElement,
              { size: 22 }
            )}
          </div>
          <h3 className="text-serif text-xl mb-3">{trLocalized(lang, issue.title)}</h3>
          <p className="text-sm text-[#334155] leading-relaxed mb-4">{trLocalized(lang, issue.desc)}</p>
          <span className="inline-block bg-[#F1F5F9] text-[#EF4444] text-xs font-bold px-3 py-1 rounded-full">
            {trLocalized(lang, issue.label)}
          </span>
        </motion.div>
      ))}
    </div>
  </motion.section>
);

const DataSection = ({ lang }: { lang: Lang }) => (
  <motion.section
    id="data"
    initial={{ opacity: 0 }}
    whileInView={{ opacity: 1 }}
    viewport={{ once: true }}
    className="bg-[#F8FAFC] py-24 px-[5vw]"
  >
    <h2 className="text-serif text-4xl md:text-5xl mb-12">{tr(lang, 'data.title')}</h2>

    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
      <div className="bg-white p-8 rounded-xl border border-black/10">
        <h3 className="text-serif text-2xl mb-2">{tr(lang, 'data.leftTitle')}</h3>
        <p className="text-xs text-[#334155]/60 mb-8 uppercase tracking-widest">{tr(lang, 'data.leftMeta')}</p>
        <div className="h-[350px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={barData} layout="vertical" margin={{ left: 40, right: 20 }}>
              <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="rgba(0,0,0,0.05)" />
              <XAxis type="number" hide />
              <YAxis
                dataKey="name"
                type="category"
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12, fill: '#334155' }}
              />
              <Tooltip cursor={{ fill: 'rgba(0,0,0,0.02)' }} />
              <Bar dataKey="value" radius={[0, 4, 4, 0]} barSize={20}>
                {barData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="bg-white p-8 rounded-xl border border-black/10">
        <h3 className="text-serif text-2xl mb-2">{tr(lang, 'data.rightTitle')}</h3>
        <p className="text-xs text-[#334155]/60 mb-8 uppercase tracking-widest">{tr(lang, 'data.rightMeta')}</p>
        <div className="space-y-6">
          {i18nData.data.progress.map((item, i) => (
            <div key={i}>
              <div className="flex justify-between text-sm mb-2">
                <span className="font-medium text-[#334155]">{trLocalized(lang, item.label)}</span>
                <span className="font-bold">{item.val}%</span>
              </div>
              <div className="h-2 bg-[#F1F5F9] rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: `${item.val}%` }}
                  transition={{ duration: 1.5, ease: "easeOut" }}
                  className={cn("h-full rounded-full", item.color)}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </motion.section>
);

const Laws = ({ lang }: { lang: Lang }) => (
  <motion.section
    id="laws"
    initial={{ opacity: 0 }}
    whileInView={{ opacity: 1 }}
    viewport={{ once: true }}
    className="bg-[#F0F9FF] py-24 px-[5vw] relative overflow-hidden"
  >
    <div className="absolute top-1/2 left-0 w-64 h-64 bg-[#2563EB]/5 rounded-full blur-3xl -ml-32" />

    <div className="text-[11px] font-bold tracking-widest uppercase text-[#EF4444] mb-4">{tr(lang, 'laws.kicker')}</div>
    <h2 className="text-serif text-4xl md:text-5xl mb-12 max-w-2xl">{tr(lang, 'laws.title')}</h2>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {i18nData.laws.items.map((law) => (
        <div key={law.id} className="bg-[#F8FAFC] border border-black/10 p-6 rounded-xl flex gap-5 items-start">
          <div className={cn("min-w-[48px] h-12 rounded-lg flex items-center justify-center font-bold text-sm", law.color)}>
            {law.id}
          </div>
          <div>
            <h4 className="text-serif text-lg mb-1">{trLocalized(lang, law.title)}</h4>
            <p className="text-sm text-[#334155] leading-relaxed">{trLocalized(lang, law.desc)}</p>
          </div>
        </div>
      ))}
    </div>
  </motion.section>
);

const LabourSection = ({ lang }: { lang: Lang }) => (
  <motion.section
    id="labour"
    initial={{ opacity: 0 }}
    whileInView={{ opacity: 1 }}
    viewport={{ once: true }}
    className="bg-[#F8FAFC] py-24 px-[5vw] border-t border-black/5"
  >
    <h2 className="text-serif text-4xl md:text-5xl mb-12">{tr(lang, 'labour.title')}</h2>

    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-20">
      <div className="h-[400px] w-full bg-white p-6 rounded-xl shadow-sm border border-black/10">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={pieData}
              cx="50%"
              cy="50%"
              innerRadius={80}
              outerRadius={120}
              paddingAngle={5}
              dataKey="value"
            >
              {pieData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
      <div>
        <h3 className="text-serif text-2xl mb-4">{tr(lang, 'labour.chartTitle')}</h3>
        <p className="text-lg text-[#334155] leading-relaxed mb-8">{tr(lang, 'labour.chartDesc')}</p>
        <div className="bg-white p-8 rounded-xl border-l-4 border-[#EF4444] shadow-sm italic text-[#334155]">
          {tr(lang, 'labour.quote')}
          <div className="not-italic text-xs text-[#334155]/60 mt-3 font-medium">{tr(lang, 'labour.quoteBy')}</div>
        </div>
      </div>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {i18nData.labour.cards.map((card, i) => (
        <div key={i} className={cn("bg-white p-8 rounded-sm border-t-4 shadow-sm", card.color)}>
          <div className="text-serif text-3xl mb-2">{trLocalized(lang, card.num)}</div>
          <h4 className="font-bold text-xs mb-2 uppercase tracking-widest text-[#334155]/40">{trLocalized(lang, card.title)}</h4>
          <p className="text-sm text-[#334155] leading-relaxed">{trLocalized(lang, card.desc)}</p>
        </div>
      ))}
    </div>
  </motion.section>
);

const Articles = ({ lang }: { lang: Lang }) => (
  <motion.section
    id="articles"
    initial={{ opacity: 0 }}
    whileInView={{ opacity: 1 }}
    viewport={{ once: true }}
    className="bg-[#F8FAFC] py-24 px-[5vw] border-t border-black/5"
  >
    <h2 className="text-serif text-4xl md:text-5xl mb-12">
      {tr(lang, 'articles.title')}
    </h2>

    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {articlesContent.map((article, i) => (
        <motion.div
          key={article.id ?? i}
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.1 }}
          className="bg-white border border-black/10 rounded-xl overflow-hidden flex flex-col h-full hover:shadow-lg transition-all"
        >
          <div className={cn("h-48 relative overflow-hidden group", article.color)}>
            <motion.img
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.6 }}
              src={article.image}
              alt={pickLocalized(lang, article.title)}
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
          <div className="p-8 flex flex-col flex-grow">
            <h3 className="text-serif text-xl mb-3">{pickLocalized(lang, article.title)}</h3>
            <p className="text-sm text-[#334155] leading-relaxed mb-6 flex-grow">{pickLocalized(lang, article.desc)}</p>
            <a
              href={article.link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-[#2563EB] font-bold text-sm hover:gap-3 transition-all"
              onClick={() => track('cta_click', { id: `article_${article.id}`, href: article.link })}
            >
              {tr(lang, 'common.learnMore')} <ArrowRight size={16} />
            </a>
          </div>
        </motion.div>
      ))}
    </div>
  </motion.section>
);

const News = ({ lang }: { lang: Lang }) => (
  <motion.section
    id="news"
    initial={{ opacity: 0 }}
    whileInView={{ opacity: 1 }}
    viewport={{ once: true }}
    className="bg-[#F8FAFC] py-24 px-[5vw] border-t border-black/5 relative overflow-hidden"
  >
    <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#2563EB]/5 rounded-full blur-[100px] -ml-48 -mb-48" />

    <div className="text-[11px] font-bold tracking-widest uppercase text-[#2563EB] mb-4 flex items-center gap-2">
      <span className="w-8 h-[1px] bg-[#2563EB]" /> {pickLocalized(lang, newsContent.kicker)}
    </div>
    <h2 className="text-serif text-4xl md:text-5xl mb-12">{pickLocalized(lang, newsContent.title)}</h2>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <div className="bg-white p-8 rounded-2xl border-l-4 border-[#EF4444] shadow-sm hover:shadow-md transition-all relative z-10">
        <div className="flex items-center gap-3 text-[#EF4444] font-bold text-xs uppercase mb-4">
          <span className="w-2 h-2 rounded-full bg-[#EF4444] animate-pulse" />
          {pickLocalized(lang, newsContent.leftCard.badge)}
        </div>
        <h3 className="text-serif text-2xl mb-4">{pickLocalized(lang, newsContent.leftCard.title)}</h3>
        <p className="text-[#334155] leading-relaxed mb-6">
          {pickLocalized(lang, newsContent.leftCard.desc)}
        </p>
        <div className="flex items-center gap-2 text-sm font-medium text-[#334155]/60">
          <Globe size={16} /> {pickLocalized(lang, newsContent.leftCard.meta)}
        </div>
      </div>

      <div className="bg-[#0F172A] p-8 rounded-2xl text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 p-4 opacity-10">
          <Globe size={120} />
        </div>
        <h3 className="text-serif text-2xl mb-4 relative z-10">{pickLocalized(lang, newsContent.rightCard.title)}</h3>
        <p className="text-white/70 leading-relaxed mb-8 relative z-10">
          {pickLocalized(lang, newsContent.rightCard.desc)}
        </p>
        <div className="flex flex-wrap gap-3 relative z-10">
          {newsContent.rightCard.links.map((link) => {
            const Icon = link.id === 'telegram' ? Send : link.id === 'instagram' ? Instagram : Youtube;
            const bg =
              link.id === 'telegram'
                ? 'bg-[#2563EB]'
                : link.id === 'instagram'
                  ? 'bg-[#E1306C]'
                  : 'bg-[#FF0000]';
            return (
              <a
                key={link.id}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  'inline-flex items-center gap-2 text-white px-5 py-2.5 rounded-full font-bold text-xs hover:bg-white hover:text-[#0F172A] transition-all',
                  bg
                )}
                onClick={() => track('cta_click', { id: `news_social_${link.id}`, href: link.href })}
              >
                {link.label} <Icon size={14} />
              </a>
            );
          })}
        </div>
      </div>
    </div>
  </motion.section>
);


const Journal = ({ lang }: { lang: Lang }) => {
  const stories = i18nData.journal.items;
  const [selectedImage, setSelectedImage] = React.useState<string | null>(null);

  return (
    <motion.section
      id="events"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      className="bg-[#F8FAFC] py-32 px-[5vw] relative overflow-hidden"
    >
      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
            className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-4 md:p-10 cursor-zoom-out"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative max-w-5xl w-full max-h-full flex items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={selectedImage}
                alt="Enlarged view"
                className="max-w-full max-h-[85vh] object-contain rounded-xl shadow-2xl shadow-blue-500/10"
              />
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute -top-12 right-0 text-white/50 hover:text-white transition-colors"
                type="button"
              >
                <X size={32} />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Background Decorative elements */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-50/50 rounded-full blur-[120px] -mr-64 -mt-64" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-red-50/30 rounded-full blur-[120px] -ml-64 -mb-64" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
          <div className="max-w-2xl">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 text-[#2563EB] font-bold text-xs uppercase tracking-[0.2em] mb-6"
            >
              <span className="w-8 h-[1px] bg-[#2563EB]" />
              {tr(lang, 'journal.title')}
            </motion.div>
            <h2 className="text-serif text-5xl md:text-7xl leading-tight text-[#0F172A] mb-8">
              {tr(lang, 'journal.title')}
            </h2>
            <p className="text-xl text-[#334155]/70 font-light leading-relaxed">
              {tr(lang, 'journal.subtitle')}
            </p>
          </div>
        </div>

        <div className="space-y-32">
          {stories.map((story, idx) => (
            <motion.div
              key={story.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className={cn(
                "grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 items-center",
                idx % 2 !== 0 ? "lg:flex-row-reverse" : ""
              )}
            >
              {/* Image Collage Side */}
              <div className={cn(
                "lg:col-span-7 grid grid-cols-2 gap-4",
                idx % 2 !== 0 ? "lg:order-2" : ""
              )}>
                <div className="space-y-4">
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    onClick={() => setSelectedImage(`/stories/${story.folder}/${story.id}-1.jpg`)}
                    className="h-[300px] rounded-3xl overflow-hidden shadow-2xl relative group cursor-zoom-in"
                  >
                    <img
                      src={`/stories/${story.folder}/${story.id}-1.jpg`}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      alt="Story focus"
                      onError={(e) => { e.currentTarget.src = "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=1200"; }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  </motion.div>
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    onClick={() => setSelectedImage(`/stories/${story.folder}/${story.id}-2.jpg`)}
                    className="h-[200px] rounded-3xl overflow-hidden shadow-xl relative group cursor-zoom-in"
                  >
                    <img
                      src={`/stories/${story.folder}/${story.id}-2.jpg`}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      alt="Story context"
                      onError={(e) => { e.currentTarget.src = "https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=800"; }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  </motion.div>
                </div>
                <div className="pt-12">
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    onClick={() => setSelectedImage(`/stories/${story.folder}/${story.id}-3.jpg`)}
                    className="h-[400px] rounded-3xl overflow-hidden shadow-2xl relative group cursor-zoom-in"
                  >
                    <img
                      src={`/stories/${story.folder}/${story.id}-3.jpg`}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      alt="Story moment"
                      onError={(e) => { e.currentTarget.src = "https://images.unsplash.com/photo-1542810634-71277d95dcbb?q=80&w=800"; }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  </motion.div>
                </div>
              </div>

              {/* Content Side */}
              <div className={cn(
                "lg:col-span-5",
                idx % 2 !== 0 ? "lg:order-1" : ""
              )}>
                <div className="space-y-8">
                  <div className="flex items-center gap-4">
                    <span className="px-4 py-1 rounded-full bg-[#2563EB]/10 text-[#2563EB] text-xs font-bold uppercase tracking-widest">
                      {trLocalized(lang, story.tag)}
                    </span>
                    <span className="text-sm font-medium text-[#334155]/50">
                      {trLocalized(lang, story.date)}
                    </span>
                  </div>

                  <h3 className="text-serif text-3xl md:text-4xl text-[#0F172A] leading-tight">
                    {trLocalized(lang, story.headline)}
                  </h3>

                  <div className="flex items-start gap-3 p-4 bg-white border border-black/5 rounded-2xl shadow-sm">
                    <Globe className="text-[#0EA5E9] shrink-0 mt-1" size={18} />
                    <span className="text-sm font-semibold text-[#0F172A]">
                      {trLocalized(lang, story.location)}
                    </span>
                  </div>

                  <p className="text-lg text-[#334155] leading-relaxed font-light">
                    {trLocalized(lang, story.content)}
                  </p>

                  <ul className="space-y-4 pt-4">
                    {[
                      { en: "Empathy & Care", ru: "Забота и принятие", uz: "Mehr va e'tibor" },
                      { en: "Social Contribution", ru: "Социальный вклад", uz: "Ijtimoiy burch" },
                      { en: "Genuine Friendship", ru: "Искренняя дружба", uz: "Samimiy do'stlik" }
                    ].map((item, i) => (
                      <li key={i} className="flex items-center gap-3 text-sm text-[#334155]">
                        <div className="w-1.5 h-1.5 rounded-full bg-[#EF4444]" />
                        {trLocalized(lang, item)}
                      </li>
                    ))}
                  </ul>

                  <div className="pt-8 flex flex-wrap gap-4">
                    <a
                      href="https://t.me/asra_kidsuz"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group inline-flex items-center gap-3 text-[#0F172A] font-bold text-sm tracking-widest uppercase hover:text-[#2563EB] transition-colors"
                    >
                      {tr(lang, 'journal.viewMore')}
                      <ArrowRight size={18} className="group-hover:translate-x-2 transition-transform" />
                    </a>

                    {story.hasCertificate && (
                      <button
                        onClick={() => setSelectedImage(`/stories/${story.folder}/certificate.jpg`)}
                        className="group inline-flex items-center gap-3 text-[#0EA5E9] font-bold text-sm tracking-widest uppercase hover:text-[#2563EB] transition-colors"
                      >
                        <Award size={18} className="group-hover:rotate-12 transition-transform" />
                        {lang === 'ru' ? 'Посмотреть грамоту' : lang === 'uz' ? 'Yorliqni ko\'rish' : 'View Certificate'}
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
};

const Team = ({ lang }: { lang: Lang }) => (
  <motion.section
    id="team"
    initial={{ opacity: 0 }}
    whileInView={{ opacity: 1 }}
    viewport={{ once: true }}
    className="bg-[#0F172A] text-[#F8FAFC] py-24 px-[5vw]"
  >
    <h2 className="text-serif text-4xl md:text-5xl mb-16">{tr(lang, 'team.title')}</h2>

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {[
        { name: 'Kurbonova Fozila', role: { en: 'Founder & Program Director', ru: 'Соучредитель и директор программ', uz: 'Asoschilaridan biri va dastur direktori' }, desc: { en: 'Fozila leads on-the-ground programs, connecting vulnerable children with resources and legal support.', ru: 'Фозила руководит программами на местах, связывая уязвимых детей с ресурсами и правовой поддержкой.', uz: 'Fozila ehtiyojmand bolalarga resurslar va huquqiy yordam ko\'rsatish dasturlarini boshqaradi.' }, color: 'bg-blue-600' },
        { name: 'Muhamedova Rukhshona', role: { en: 'Co-Founder & Advocacy Director', ru: 'Соучредитель и директор по защите прав', uz: 'Asoschilaridan biri va huquq himoyasi direktori' }, desc: { en: 'Rukhshona drives engagement with government bodies and international organizations for systemic change.', ru: 'Рухшона занимается взаимодействием с государственными органами и международными организациями для системных изменений.', uz: 'Ruxshona tizimli o\'zgarishlar uchun hukumat organlari va xalqaro tashkilotlar bilan hamkorlikni olib boradi.' }, color: 'bg-red-600' },
        { name: 'Sadullayev Jahongir', role: { en: 'Web Builder & Digital Presence', ru: 'Веб-разработчик и цифровое присутствие', uz: 'Veb-dasturchi va raqamli faoliyat' }, desc: { en: 'Jahongir maintains the digital platform, ensuring that stories of children are told with care and accuracy.', ru: 'Жахангир поддерживает цифровую платформу, заботясь о том, чтобы истории детей рассказывались точно и бережно.', uz: 'Jahongir raqamli platformani yuritib, bolalar hikoyalarining aniq va ehtiyotkorlik bilan yetkazilishini ta\'minlaydi.' }, color: 'bg-blue-500' },
        { name: 'Behruz Uktamov', role: { en: 'Operator', ru: 'Оператор', uz: 'Operator' }, desc: { en: 'Behruz captures the visual stories of our mission, bringing the reality of our work to the public eye.', ru: 'Бехруз документирует визуальные истории нашей миссии, показывая реалии нашей работы широкой публике.', uz: 'Behruz bizning missiyamizdagi jarayonlarni tasvirga tushirib, ishimiz realligini omma e\'tiboriga havola etadi.' }, color: 'bg-blue-400' },
        { name: 'Jasmina Muslimova', role: { en: 'Volunteer Coordinator', ru: 'Координатор волонтеров', uz: 'Ko\'ngillilar koordinatori' }, desc: { en: 'Jasmina manages our growing network of volunteers, ensuring every helping hand finds its place.', ru: 'Жасмина управляет нашей растущей сетью волонтеров, заботясь о том, чтобы каждая пара рук нашла свое применение.', uz: 'Jasmina kengayib borayotgan ko\'ngillilar tarmog\'ini boshqarib, har bir yordam qo\'li o\'z o\'rnini topishini ta\'minlaydi.' }, color: 'bg-blue-300' },
        { name: 'Asilbek Botirov', role: { en: 'Content Creator', ru: 'Создатель контента', uz: 'Kontent yaratuvchi' }, desc: { en: 'Asilbek crafts compelling narratives and educational content to raise awareness about child rights.', ru: 'Асилбек создает убедительные тексты и образовательный контент для повышения осведомленности о правах детей.', uz: 'Asilbek bolalar huquqlari haqida xabardorlikni oshirish uchun ta\'sirchan matnlar va ta\'limiy kontentlar yaratadi.' }, color: 'bg-blue-200' },
        { name: 'Behzod Sharifjonov', role: { en: 'Content Creator', ru: 'Создатель контента', uz: 'Kontent yaratuvchi' }, desc: { en: 'Behzod develops engaging digital content to reach and educate a wider audience across platforms.', ru: 'Бехзод разрабатывает вовлекающий цифровой контент для охвата и обучения более широкой аудитории на разных платформах.', uz: 'Behzod turli platformalardagi kengroq auditoriyani qamrab olish va o\'rgatish uchun qiziqarli raqamli kontent tayyorlaydi.' }, color: 'bg-blue-700' },
        { name: 'Hojiakbar Inagamov', role: { en: 'Graphic Editor', ru: 'Графический редактор', uz: 'Grafik muharrir' }, desc: { en: 'Hojiakbar designs visual assets that communicate our mission with clarity and impact.', ru: 'Хожиакбар создает визуальные материалы, которые ясно и эффективно передают нашу миссию.', uz: 'Hojiakbar missiyamizni aniq va ta\'sirchan yetkazuvchi vizual materiallar dizaynini yaratadi.' }, color: 'bg-red-700' },
      ].map((member, i) => (
        <div key={i} className="bg-white/5 border border-white/10 rounded-sm overflow-hidden hover:bg-white/10 transition-colors">
          <div className="p-6">
            <h3 className="text-serif text-xl mb-1">{member.name}</h3>
            <div className="text-xs text-[#0EA5E9] font-bold uppercase tracking-widest mb-4">{pickLocalized(lang, member.role)}</div>
            <p className="text-sm text-white/50 leading-relaxed">{pickLocalized(lang, member.desc)}</p>
          </div>
        </div>
      ))}
    </div>
  </motion.section>
);

const Mission = ({ lang }: { lang: Lang }) => (
  <motion.section
    id="mission"
    initial={{ opacity: 0 }}
    whileInView={{ opacity: 1 }}
    viewport={{ once: true }}
    className="bg-[#F8FAFC] py-24 px-[5vw] relative overflow-hidden"
  >
    <div className="absolute bottom-0 right-0 w-80 h-80 bg-[#2563EB]/5 rounded-full blur-[120px] -mr-40 -mb-40" />

    <div className="text-[11px] font-bold tracking-widest uppercase text-[#EF4444] mb-4">{tr(lang, 'mission.kicker')}</div>
    <h2 className="text-serif text-4xl md:text-5xl mb-14">{tr(lang, 'mission.title')}</h2>

    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
      <div className="space-y-8">
        <div className="bg-[#0F172A] p-12 rounded-3xl relative overflow-hidden">
          <div className="absolute -top-16 -right-16 w-44 h-44 rounded-full bg-[#2563EB]/15" />
          <Quote className="text-[#2563EB] mb-6" size={40} />
          <div className="text-serif text-3xl italic text-[#F8FAFC] leading-snug mb-6 relative z-10">
            {tr(lang, 'mission.quote')}
          </div>
          <div className="text-sm text-[#EF4444] font-bold">{tr(lang, 'mission.quoteBy')}</div>
        </div>
      </div>

      <ul className="space-y-6">
        {trArray(lang, 'mission.bullets').map((item, i) => (
          <li key={i} className="flex gap-4 items-start pb-6 border-b border-black/10 last:border-0">
            <CheckCircle2 className="text-[#0EA5E9] shrink-0 mt-1" size={20} />
            <span className="text-[#334155] leading-relaxed">{item}</span>
          </li>
        ))}
      </ul>
    </div>
  </motion.section>
);

const Footer = ({ lang }: { lang: Lang }) => (
  <footer id="contact" className="bg-[#0F172A] text-[#F8FAFC]/60 py-20 px-[5vw]">
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
      <div className="col-span-1 lg:col-span-1">
        <a href="#" className="text-serif text-2xl text-white flex items-center gap-2 mb-6">
          <span className="w-2.5 h-2.5 rounded-full bg-[#2563EB]" />
          AsraKids
        </a>
        <p className="text-sm leading-relaxed max-w-xs text-white/50">
          {tr(lang, 'footer.tagline')}
        </p>
        <div className="flex gap-6 mt-10">
          <a href="https://t.me/asra_kidsuz" target="_blank" rel="noopener noreferrer" className="text-white/40 hover:text-white transition-colors">
            <Send size={20} />
          </a>
          <a href="https://youtube.com/@asrakids?si=GuAOeax5ikN_7Uy3" target="_blank" rel="noopener noreferrer" className="text-white/40 hover:text-white transition-colors">
            <Youtube size={20} />
          </a>
          <a href="https://www.instagram.com/asrakidsuz?igsh=d3o3NXJianQ0YnR0" target="_blank" rel="noopener noreferrer" className="text-white/40 hover:text-white transition-colors">
            <Instagram size={20} />
          </a>
        </div>
      </div>

      <div>
        <h5 className="text-white font-bold text-xs mb-6 uppercase tracking-widest">{tr(lang, 'footer.about')}</h5>
        <ul className="text-sm space-y-3">
          <li><a href="#team" className="hover:text-white transition-colors">{tr(lang, 'footer.ourTeam')}</a></li>
          <li><a href="#mission" className="hover:text-white transition-colors">{tr(lang, 'footer.ourMission')}</a></li>
          <li><a href="#events" className="hover:text-white transition-colors">{tr(lang, 'footer.events')}</a></li>
          <li><a href="#articles" className="hover:text-white transition-colors">{tr(lang, 'footer.articles')}</a></li>
        </ul>
      </div>

      <div>
        <h5 className="text-white font-bold text-xs mb-6 uppercase tracking-widest">{tr(lang, 'footer.programs')}</h5>
        <ul className="text-sm space-y-3">
          <li><a href="#labour" className="hover:text-white transition-colors">{tr(lang, 'footer.childLabour')}</a></li>
          <li><a href="#" className="hover:text-white transition-colors">{tr(lang, 'footer.familySupport')}</a></li>
          <li><a href="#" className="hover:text-white transition-colors">{tr(lang, 'footer.education')}</a></li>
        </ul>
      </div>

      <div>
        <h5 className="text-white font-bold text-xs mb-6 uppercase tracking-widest">{tr(lang, 'footer.connect')}</h5>
        <ul className="text-sm space-y-3">
          <li><a href="https://t.me/asra_kidsuz" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">{tr(lang, 'footer.telegram')}</a></li>
          <li><a href="https://youtube.com/@asrakids" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">{tr(lang, 'footer.youtube')}</a></li>
          <li><a href="https://www.instagram.com/asrakidsuz?igsh=d3o3NXJianQ0YnR0" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">{tr(lang, 'footer.instagram')}</a></li>
          <li><a href="https://t.me/kuuuure" target="_blank" rel="noopener noreferrer" className="hover:text-[#0EA5E9] transition-colors font-bold text-white">{tr(lang, 'footer.partner')}</a></li>
        </ul>
      </div>
    </div>
  </footer>
);

export default function App() {
  const [lang, setLang] = React.useState<Lang>('en');

  return (
    <div className="min-h-screen selection:bg-[#2563EB] selection:text-white bg-[#F8FAFC]">
      <Nav lang={lang} setLang={setLang} />
      <Hero lang={lang} />
      <StatsBand lang={lang} />
      <Issues lang={lang} />
      <News lang={lang} />
      <Journal lang={lang} />
      <DataSection lang={lang} />
      <Laws lang={lang} />
      <LabourSection lang={lang} />
      <Articles lang={lang} />
      <Team lang={lang} />
      <Mission lang={lang} />

      <section id="partner" className="bg-[#0F172A] text-[#F8FAFC] py-32 px-[5vw] relative overflow-hidden">
        {/* Dynamic Background Elements */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_20%_30%,rgba(37,99,235,0.15)_0%,transparent_50%)]" />
          <div className="absolute bottom-0 right-0 w-full h-full bg-[radial-gradient(circle_at_80%_70%,rgba(239,68,68,0.08)_0%,transparent_50%)]" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150%] h-[150%] bg-[radial-gradient(circle_at_center,rgba(56,189,248,0.05)_0%,transparent_70%)] animate-pulse" />

          {/* Floating Grid Lines */}
          <div className="absolute inset-0 opacity-[0.03]"
            style={{ backgroundImage: 'linear-gradient(#F8FAFC 1px, transparent 1px), linear-gradient(90deg, #F8FAFC 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">

            {/* Left Content: Editorial Style */}
            <div className="lg:col-span-7 text-left">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="inline-flex items-center gap-3 bg-[#2563EB]/10 border border-[#2563EB]/30 px-5 py-2 rounded-full mb-10"
              >
                <div className="w-2 h-2 rounded-full bg-[#EF4444] animate-ping" />
                <span className="text-[11px] font-bold tracking-[0.2em] uppercase text-[#38BDF8]">{tr(lang, 'partnerSection.openForCollab')}</span>
              </motion.div>

              <motion.h2
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-serif text-6xl md:text-8xl mb-10 tracking-tight leading-[0.95] text-white"
              >
                {trArray(lang, 'partnerSection.title')[0]} <span className="text-[#38BDF8] italic">{trArray(lang, 'partnerSection.title')[1]}</span> {trArray(lang, 'partnerSection.title')[2]} <span className="relative inline-block">
                  {trArray(lang, 'partnerSection.title')[3]}
                  <div className="absolute -bottom-2 left-0 w-full h-1 bg-[#EF4444]/40 rounded-full" />
                </span> {trArray(lang, 'partnerSection.title')[4]}
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="text-xl md:text-2xl text-white/50 mb-12 leading-relaxed max-w-2xl font-light"
              >
                {tr(lang, 'partnerSection.desc')}
              </motion.p>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
                {[
                  { label: { en: "Corporate", ru: "Корпорациям", uz: "Korporatsiyalar" }, color: "bg-[#2563EB]" },
                  { label: { en: "Volunteers", ru: "Волонтерам", uz: "Ko'ngillilar" }, color: "bg-[#EF4444]" },
                  { label: { en: "Donors", ru: "Спонсорам", uz: "Homiylar" }, color: "bg-[#38BDF8]" }
                ].map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 + (i * 0.1) }}
                    className="flex items-center gap-4 group cursor-default"
                  >
                    <div className={`w-10 h-[1px] ${item.color} group-hover:w-14 transition-all duration-500`} />
                    <span className="text-xs font-bold tracking-widest uppercase text-white/70 group-hover:text-white transition-colors">{pickLocalized(lang, item.label)}</span>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Right Content: Interactive Card */}
            <div className="lg:col-span-5">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="relative group"
              >
                {/* Outer Glow */}
                <div className="absolute -inset-4 bg-gradient-to-tr from-[#2563EB]/20 via-transparent to-[#EF4444]/10 rounded-[3rem] blur-2xl opacity-50 group-hover:opacity-100 transition-opacity duration-700" />

                <div className="relative bg-[#1E293B]/40 backdrop-blur-3xl border border-white/10 p-10 md:p-12 rounded-[2.5rem] shadow-[0_32px_64px_-16px_rgba(0,0,0,0.5)] overflow-hidden">
                  {/* Internal Accents */}
                  <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-bl from-[#38BDF8]/10 to-transparent" />
                  <div className="absolute bottom-0 left-0 w-40 h-40 bg-gradient-to-tr from-[#EF4444]/5 to-transparent" />

                  <div className="relative z-10">
                    <h3 className="text-serif text-4xl mb-6 text-white tracking-tight">{tr(lang, 'partnerSection.cardTitle')}</h3>
                    <p className="text-white/60 mb-10 leading-relaxed">
                      {tr(lang, 'partnerSection.cardDesc')}
                    </p>

                    <div className="space-y-6 mb-12">
                      {[
                        { icon: <Shield size={20} />, title: { en: "Secure & Transparent", ru: "Надежность и прозрачность", uz: "Ishonch va shaffoflik" }, desc: { en: "Full accountability for every resource.", ru: "Полная отчетность за каждый ресурс.", uz: "Har bir resurs uchun to'liq hisobdorlik." }, color: "text-[#38BDF8]", bg: "bg-[#2563EB]/10" },
                        { icon: <Users size={20} />, title: { en: "Global Network", ru: "Глобальная сеть", uz: "Global tarmoq" }, desc: { en: "Connect with experts and advocates.", ru: "Связи с экспертами и правозащитниками.", uz: "Ekspertlar va huquq himoyachilari bilan aloqa." }, color: "text-[#EF4444]", bg: "bg-[#EF4444]/10" }
                      ].map((feature, i) => (
                        <div key={i} className="flex items-start gap-5 p-4 rounded-2xl hover:bg-white/5 transition-colors group/item">
                          <div className={`w-12 h-12 rounded-xl ${feature.bg} flex items-center justify-center ${feature.color} shrink-0 group-hover/item:scale-110 transition-transform`}>
                            {feature.icon}
                          </div>
                          <div>
                            <div className="font-bold text-white mb-1">{pickLocalized(lang, feature.title)}</div>
                            <div className="text-sm text-white/40">{pickLocalized(lang, feature.desc)}</div>
                          </div>
                        </div>
                      ))}
                    </div>

                    <a
                      href="https://t.me/kuuuure"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-4 bg-white text-[#0F172A] w-full py-6 rounded-2xl font-bold text-lg hover:bg-[#2563EB] hover:text-white transition-all duration-500 shadow-xl group/btn"
                    >
                      <span>{tr(lang, 'partnerSection.startConversation')}</span>
                      <Send size={20} className="group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform" />
                    </a>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      <Footer lang={lang} />
    </div>
  );
}
