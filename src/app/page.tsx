import HexagonalBackground from '@/components/home/HexagonalBackground';
import Navbar from '@/components/layout/Navbar';

export default function Home() {
  return (
    <main className="min-h-screen relative">
      {/* Nav con Login | Register en top-right */}
      <Navbar />

      {/* Fondo colmenar */}
      <HexagonalBackground />

      {/* Contenido principal sobrepuesto */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 pt-16">
        <h1 className="text-4xl md:text-6xl font-bold text-black text-center mb-6">
          Bienvenido a nuestra plataforma
        </h1>
        <p className="text-lg md:text-xl text-gray-700 text-center max-w-2xl mb-12">
          Descubre un nuevo mundo de posibilidades con nuestra innovadora solución
        </p>
        <button className="px-8 py-3 text-lg font-medium text-white bg-black rounded-lg hover:bg-gray-800 transition-all duration-300">
          Comenzar
        </button>
      </div>
    </main>
  );
}
