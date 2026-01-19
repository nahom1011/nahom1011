import Terminal from './components/Terminal';

function App() {
  return (
    <div className="relative min-h-screen bg-black overflow-hidden">
      {/* Visual Effects Overlays */}
      <div className="crt-overlay" />
      <div className="scanline" />

      {/* Main Terminal UI */}
      <main className="relative z-10 h-screen">
        <Terminal />
      </main>

      {/* Subtle Background Vibe */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--terminal-green)_0%,_transparent_70%)] blur-3xl" />
      </div>
    </div>
  );
}

export default App;
