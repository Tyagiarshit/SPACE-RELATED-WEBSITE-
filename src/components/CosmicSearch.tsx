import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Sparkles, Loader2, X } from 'lucide-react';
import { GoogleGenAI } from "@google/genai";

export function CosmicSearch() {
  const [query, setQuery] = useState('');
  const [result, setResult] = useState<string | null>(null);
  const [imageResult, setImageResult] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    setIsLoading(true);
    setIsOpen(true);
    setResult(null);
    setImageResult(null);
    
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
      
      // Generate Text Result
      const textPromise = ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: `You are a space expert. Answer this question about space concisely and interestingly: ${query}`,
      });

      // Generate Image Result
      const imagePromise = ai.models.generateContent({
        model: 'gemini-2.5-flash-image',
        contents: {
          parts: [
            {
              text: `A cinematic, high-quality space image of: ${query}. Stunning cosmic colors, nebulas, stars, and deep space atmosphere. Realistic and breathtaking.`,
            },
          ],
        },
      });

      const [textResponse, imageResponse] = await Promise.all([textPromise, imagePromise]);
      
      setResult(textResponse.text);

      // Extract Image
      for (const part of imageResponse.candidates[0].content.parts) {
        if (part.inlineData) {
          setImageResult(`data:image/png;base64,${part.inlineData.data}`);
          break;
        }
      }
    } catch (error) {
      console.error("Search error:", error);
      setResult("The cosmic signals are weak. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto px-6 mb-20">
      <form onSubmit={handleSearch} className="relative group">
        <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
        <div className="relative flex items-center bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden">
          <div className="pl-6 text-white/40">
            <Search className="w-5 h-5" />
          </div>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search the cosmos (e.g., 'What is a black hole?')"
            className="w-full py-5 px-4 bg-transparent text-white placeholder-white/20 focus:outline-none font-medium"
          />
          <button
            type="submit"
            disabled={isLoading}
            className="px-8 py-5 bg-white text-black font-bold hover:bg-white/90 transition-colors disabled:opacity-50 flex items-center gap-2"
          >
            {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
            EXPLORE
          </button>
        </div>
      </form>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="mt-6 p-8 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-2xl relative overflow-hidden"
          >
            <button 
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 p-2 text-white/40 hover:text-white transition-colors z-10"
            >
              <X className="w-4 h-4" />
            </button>
            
            {isLoading ? (
              <div className="flex flex-col items-center justify-center py-12 gap-4">
                <Loader2 className="w-8 h-8 text-cyan-400 animate-spin" />
                <p className="text-white/40 text-sm font-bold uppercase tracking-widest animate-pulse">
                  Consulting the Stars...
                </p>
              </div>
            ) : (
              <div className="flex flex-col gap-6">
                {imageResult && (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="w-full aspect-video rounded-2xl overflow-hidden border border-white/10 shadow-2xl"
                  >
                    <img 
                      src={imageResult} 
                      alt={query} 
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </motion.div>
                )}
                <div className="prose prose-invert max-w-none">
                  <p className="text-white/80 leading-relaxed text-lg font-medium">
                    {result}
                  </p>
                </div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
