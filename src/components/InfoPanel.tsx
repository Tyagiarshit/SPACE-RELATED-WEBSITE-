import { motion, AnimatePresence } from 'framer-motion';
import { X, Info, Wind, Weight, Ruler, Moon } from 'lucide-react';
import { PlanetData } from '../constants/planets';

interface InfoPanelProps {
  planet: PlanetData | null;
  onClose: () => void;
  onDeepDive: () => void;
}

export function InfoPanel({ planet, onClose, onDeepDive }: InfoPanelProps) {
  return (
    <AnimatePresence>
      {planet && (
        <motion.div
          initial={{ x: '100%', opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: '100%', opacity: 0 }}
          transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          className="fixed right-0 top-0 h-full w-full md:w-[400px] z-50 p-6"
        >
          <div className="h-full w-full bg-black/40 backdrop-blur-xl border-l border-white/10 rounded-l-3xl p-8 flex flex-col shadow-2xl overflow-y-auto">
            <button
              onClick={onClose}
              className="absolute top-6 right-6 p-2 rounded-full hover:bg-white/10 transition-colors"
            >
              <X className="w-6 h-6 text-white/70" />
            </button>

            <div className="mt-8">
              <motion.h2 
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="text-5xl font-bold text-white mb-2 tracking-tighter"
              >
                {planet.name}
              </motion.h2>
              <motion.p 
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.1 }}
                className="text-sm uppercase tracking-widest text-white/50 font-semibold mb-8"
              >
                {planet.keyFeature}
              </motion.p>

              <div className="grid grid-cols-2 gap-4 mb-8">
                <StatCard icon={<Weight className="w-4 h-4" />} label="Gravity" value={planet.gravity} delay={0.2} />
                <StatCard icon={<Ruler className="w-4 h-4" />} label="Distance" value={planet.distanceFromSun} delay={0.3} />
                <StatCard icon={<Wind className="w-4 h-4" />} label="Atmosphere" value={planet.atmosphere} delay={0.4} />
                <StatCard icon={<Moon className="w-4 h-4" />} label="Moons" value={planet.moons.length.toString()} delay={0.5} />
              </div>

              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="space-y-6"
              >
                <div>
                  <h3 className="text-white/40 text-xs uppercase font-bold tracking-widest mb-2 flex items-center gap-2">
                    <Info className="w-3 h-3" /> Overview
                  </h3>
                  <p className="text-white/80 leading-relaxed text-sm">
                    {planet.description}
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
                  <h3 className="text-white/40 text-xs uppercase font-bold tracking-widest mb-2">Fun Fact</h3>
                  <p className="text-white italic text-sm">"{planet.funFact}"</p>
                </div>

                <button
                  onClick={onDeepDive}
                  className="w-full py-4 rounded-2xl bg-white text-black font-bold text-sm hover:bg-white/90 transition-all transform active:scale-95"
                >
                  Deep Dive Exploration
                </button>
              </motion.div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function StatCard({ icon, label, value, delay }: { icon: React.ReactNode, label: string, value: string, delay: number }) {
  return (
    <motion.div
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay }}
      className="p-4 rounded-2xl bg-white/5 border border-white/10"
    >
      <div className="text-white/30 mb-1">{icon}</div>
      <div className="text-[10px] uppercase tracking-widest text-white/40 font-bold">{label}</div>
      <div className="text-white font-bold text-sm">{value}</div>
    </motion.div>
  );
}
