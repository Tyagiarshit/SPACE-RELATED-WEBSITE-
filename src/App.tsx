import { useState, useCallback, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { Rocket, BrainCircuit, Globe2, ChevronLeft, Sparkles, Zap, Shield, Target } from 'lucide-react';
import { SolarSystem } from './components/SolarSystem';
import { InfoPanel } from './components/InfoPanel';
import { Quiz } from './components/Quiz';
import { LandingPage } from './components/LandingPage';
import { CosmicSearch } from './components/CosmicSearch';
import { PLANETS } from './constants/planets';

export default function App() {
  const [selectedPlanetId, setSelectedPlanetId] = useState<string | null>(null);
  const [isDeepDive, setIsDeepDive] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll();
  const solarOpacity = useTransform(scrollYProgress, [0.1, 0.3], [0, 1]);
  const solarScale = useTransform(scrollYProgress, [0.1, 0.3], [0.8, 1]);

  const selectedPlanet = PLANETS.find(p => p.id === selectedPlanetId) || null;

  const handleSelectPlanet = useCallback((id: string) => {
    setSelectedPlanetId(id);
    setIsDeepDive(false);
  }, []);

  const handleClosePanel = useCallback(() => {
    setSelectedPlanetId(null);
    setIsDeepDive(false);
  }, []);

  return (
    <div ref={scrollContainerRef} className="relative w-full bg-[#050505] text-white selection:bg-cyan-500/30">
      {/* Navigation */}
      <nav className="absolute top-0 left-0 w-full p-8 flex justify-between items-center z-50 bg-gradient-to-b from-[#050505] via-[#050505]/80 to-transparent backdrop-blur-sm border-b border-white/5 overflow-hidden">
        {/* Subtle Starfield Background for Header */}
        <motion.div 
          animate={{ opacity: [0.05, 0.15, 0.05] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          className="absolute inset-0 pointer-events-none" 
          style={{ backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)', backgroundSize: '30px 30px' }} 
        />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(6,182,212,0.15),transparent_80%)]" />
        
        <motion.div 
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          className="flex items-center gap-3 cursor-pointer group"
          onClick={() => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
            handleClosePanel();
          }}
        >
          <div className="w-10 h-10 bg-white/10 backdrop-blur-md rounded-xl flex items-center justify-center border border-white/20 group-hover:border-cyan-500/50 transition-colors">
            <Globe2 className="w-6 h-6 text-white group-hover:text-cyan-400 transition-colors" />
          </div>
          <div className="flex flex-col">
            <span className="text-xl font-bold tracking-tighter">COSMIC GLOW</span>
            <span className="text-[10px] font-black tracking-[0.3em] text-cyan-500/50 uppercase">Explorer v1.0</span>
          </div>
        </motion.div>

        <div className="hidden md:flex items-center gap-8">
          <div className="flex items-center gap-2 text-white/40 text-[10px] font-bold uppercase tracking-widest">
            <Sparkles className="w-3 h-3 text-cyan-400" /> 
            <span>Deep Space Network Active</span>
          </div>
          <div className="w-px h-4 bg-white/10" />
          <div className="flex items-center gap-2 text-white/40 text-[10px] font-bold uppercase tracking-widest">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span>Signal Strength: 100%</span>
          </div>
        </div>
      </nav>

      {/* Section 1: Hero / Landing */}
      <section className="h-screen w-full relative z-10">
        <LandingPage onStart={() => {
          const solarSection = document.getElementById('solar-section');
          solarSection?.scrollIntoView({ behavior: 'smooth' });
        }} />
      </section>

      {/* Section 2: Search & 3D Explorer */}
      <section id="solar-section" className="relative min-h-screen w-full z-20 pt-32 pb-20">
        <div className="max-w-7xl mx-auto px-6 mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-5xl font-bold mb-4 tracking-tighter">COSMIC SEARCH</h2>
            <p className="text-white/40 font-medium">Ask the universe anything about space</p>
          </motion.div>
          <CosmicSearch />
        </div>

        <motion.div 
          style={{ opacity: solarOpacity, scale: solarScale }}
          className="w-full h-[70vh] relative mb-20"
        >
          <SolarSystem 
            selectedId={selectedPlanetId} 
            onSelectPlanet={handleSelectPlanet} 
          />
          <InfoPanel 
            planet={selectedPlanet} 
            onClose={handleClosePanel}
            onDeepDive={() => setIsDeepDive(true)}
          />
        </motion.div>

        {/* Section 3: Key Points */}
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-4 gap-6 mb-32">
          <KeyPointCard 
            icon={<Zap className="w-6 h-6 text-yellow-400" />}
            title="Supersonic Winds"
            description="Experience atmospheric speeds exceeding 2,100 km/h on Neptune."
          />
          <KeyPointCard 
            icon={<Target className="w-6 h-6 text-red-400" />}
            title="Iron Oxide"
            description="The distinct red hue of Mars comes from rusted iron on its surface."
          />
          <KeyPointCard 
            icon={<Shield className="w-6 h-6 text-cyan-400" />}
            title="Magnetic Shield"
            description="Earth's core creates a vital shield against solar radiation."
          />
          <KeyPointCard 
            icon={<Sparkles className="w-6 h-6 text-purple-400" />}
            title="Diamond Rain"
            description="Extreme pressure on gas giants may cause diamonds to rain down."
          />
        </div>

        {/* Section 4: Quiz */}
        <div className="max-w-7xl mx-auto px-6 pb-32">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-5xl font-bold mb-4 tracking-tighter">COSMIC CHALLENGE</h2>
            <p className="text-white/40 font-medium">Test your knowledge of the solar system</p>
          </motion.div>
          <Quiz />
        </div>
      </section>

      {/* Deep Dive Overlay */}
      <AnimatePresence>
        {isDeepDive && selectedPlanet && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-3xl p-8 md:p-20 overflow-y-auto"
          >
            <div className="max-w-4xl mx-auto">
              <button 
                onClick={() => setIsDeepDive(false)}
                className="flex items-center gap-2 text-white/40 hover:text-white transition-colors mb-12 group"
              >
                <ChevronLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                Back to Explorer
              </button>

              <div className="grid md:grid-cols-2 gap-12 items-start">
                <div>
                  <h1 className="text-7xl font-bold mb-4 tracking-tighter">{selectedPlanet.name}</h1>
                  <p className="text-xl text-white/60 leading-relaxed mb-8">
                    {selectedPlanet.description}
                  </p>
                  
                  <div className="space-y-8">
                    <section>
                      <h3 className="text-white/30 text-xs uppercase font-bold tracking-widest mb-4">The Moons</h3>
                      <div className="flex flex-wrap gap-3">
                        {selectedPlanet.moons.length > 0 ? (
                          selectedPlanet.moons.map(moon => (
                            <span key={moon} className="px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm">
                              {moon}
                            </span>
                          ))
                        ) : (
                          <span className="text-white/40 italic text-sm">No major moons discovered.</span>
                        )}
                      </div>
                    </section>
                  </div>
                </div>
                <div className="sticky top-20">
                  <div className="aspect-square rounded-3xl bg-gradient-to-br from-white/10 to-transparent border border-white/10 flex items-center justify-center relative overflow-hidden">
                    <div className="w-48 h-48 rounded-full" style={{ backgroundColor: selectedPlanet.color, boxShadow: `0 0 100px ${selectedPlanet.glowColor}44` }} />
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Background Accents */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(100,100,255,0.05),transparent_70%)]" />
      </div>
    </div>
  );
}

function KeyPointCard({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) {
  return (
    <motion.div
      whileHover={{ scale: 0.95 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className="p-8 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-xl group cursor-pointer"
    >
      <div className="mb-6 p-4 w-fit rounded-2xl bg-white/5 border border-white/10 group-hover:scale-110 transition-transform">
        {icon}
      </div>
      <h3 className="text-xl font-bold mb-3 text-white">{title}</h3>
      <p className="text-white/40 text-sm leading-relaxed">{description}</p>
    </motion.div>
  );
}

function NavButton({ active, onClick, icon, label }: { active: boolean, onClick: () => void, icon: React.ReactNode, label: string }) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-2 px-6 py-3 rounded-2xl transition-all font-bold text-sm ${
        active 
          ? 'bg-white text-black shadow-[0_0_20px_rgba(255,255,255,0.3)]' 
          : 'bg-white/5 text-white/50 hover:bg-white/10 hover:text-white border border-white/10'
      }`}
    >
      {icon}
      {label}
    </button>
  );
}
