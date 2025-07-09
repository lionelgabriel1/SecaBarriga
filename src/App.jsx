import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';

const VideoPlayer = () => {
  useEffect(() => {
    const scriptId = 'vturb-player-script';
    if (document.getElementById(scriptId)) {
      return;
    }

    const script = document.createElement('script');
    script.id = scriptId;
    script.src = 'https://scripts.converteai.net/ca3bc483-2fa3-48b1-9b04-42ef102c60f6/players/686e6ba200fb8e117e55c3b2/v4/player.js';
    script.async = true;
    document.head.appendChild(script);

    return () => {
      const existingScript = document.getElementById(scriptId);
      if (existingScript) {
        // Em alguns casos, pode ser útil remover o script ao desmontar
        // document.head.removeChild(existingScript);
      }
    };
  }, []);

  return (
    <vturb-smartplayer
      id="vid-686e6ba200fb8e117e55c3b2"
      style={{ display: 'block', margin: '0 auto', width: '100%' }}
    ></vturb-smartplayer>
  );
};

function App() {
  const [currentDate, setCurrentDate] = useState('');
  const [viewerCount, setViewerCount] = useState(561);

  useEffect(() => {
    // Função para calcular a data de amanhã
    const getTomorrowDate = () => {
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      
      const day = tomorrow.getDate().toString().padStart(2, '0');
      const month = (tomorrow.getMonth() + 1).toString().padStart(2, '0');
      const year = tomorrow.getFullYear();
      
      return `${day}/${month}/${year}`;
    };

    setCurrentDate(getTomorrowDate());

    const viewerInterval = setInterval(() => {
      // Flutua o número por uma pequena quantidade aleatória (-3 a +3)
      const fluctuation = Math.floor(Math.random() * 7) - 3;
      setViewerCount(prevCount => {
        const newCount = prevCount + fluctuation;
        // Garante que a contagem permaneça em um intervalo razoável (por exemplo, 540-580)
        if (newCount < 540) return 545;
        if (newCount > 580) return 575;
        return newCount;
      });
    }, 2500); // Atualiza a cada 2.5 segundos

    return () => {
      clearInterval(viewerInterval);
    };
  }, []);

  return (
    <>
      <Helmet>
        <title>EXPOSED: Celebridades Queimando Gordura Naturalmente</title>
        <meta name="description" content="Descubra o segredo das celebridades para queimar de 5 até 10 kg de gordura sem usar Ozempic, fazendo isso dentro da sua própria casa." />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-b from-red-600 via-red-500 to-red-700 text-white overflow-hidden">
        {/* Header com contador de pessoas */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="bg-red-600 text-center py-4 px-4 shadow-lg"
        >
          <div className="max-w-4xl mx-auto">
            <motion.p 
              className="text-lg md:text-xl font-bold"
              animate={{ scale: [1, 1.02, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <span className="text-yellow-300">{viewerCount} pessoas</span> estão assistindo a esta apresentação. 
              Devido ao alto número de acessos, ela estará disponível apenas até:
            </motion.p>
            <motion.p 
              className="text-2xl md:text-3xl font-black mt-2 text-yellow-300"
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              {currentDate}
            </motion.p>
          </div>
        </motion.div>

        {/* Conteúdo principal */}
        <div className="max-w-6xl mx-auto px-4 py-8 md:py-16">
          {/* Título principal */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="text-center mb-8 md:mb-12"
          >
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-black leading-tight mb-6">
              <span className="text-green-400">EXPOSED:</span> Celebridades que você conhece pelo nome estão{' '}
              <span className="text-green-400">"trapaceando"</span> o{' '}
              <span className="text-green-400">seu metabolismo</span> para queimar de{' '}
              <span className="text-yellow-300">5 até 10 kg de gordura</span>, sem usar Ozempic e{' '}
              <span className="text-green-400">fazendo isso dentro da sua própria casa.</span>
            </h1>
          </motion.div>

          {/* Container do vídeo */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="relative max-w-4xl mx-auto mb-8 md:mb-12"
          >
            <div className="relative bg-black rounded-lg overflow-hidden shadow-2xl border-4 border-green-400">
              {/* Embed do vídeo */}
              <div className="w-full aspect-video">
                <VideoPlayer />
              </div>
            </div>
          </motion.div>
        </div>

        {/* Footer */}
        <motion.footer 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.5 }}
          className="bg-black/80 text-center py-6 mt-16"
        >
          <div className="max-w-4xl mx-auto px-4">
            <p className="text-gray-300 text-sm md:text-base">
              Copyright © 2025 PLX – Todos os direitos reservados.
            </p>
          </div>
        </motion.footer>
      </div>
    </>
  );
}

export default App;