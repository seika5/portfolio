import { JarvisVisualization } from '@/components/jarvis/JarvisVisualization';
import PortfolioContent from '@/components/portfolio/PortfolioContent';

export default function Home() {
  return (
    <main className="relative min-h-screen w-full overflow-hidden">
      {/* J.A.R.V.I.S. Visualization as background - NO BLUR */}
      <div className="fixed inset-0 -z-10">
        <JarvisVisualization />
      </div>

      {/* Portfolio Content */}
      <div className="relative z-10">
        <PortfolioContent />
      </div>
    </main>
  );
}
