import { JarvisVisualization } from '@/components/jarvis/JarvisVisualization';
import PortfolioContent from '@/components/portfolio/PortfolioContent';

export default function Home() {
  return (
    <main className="relative min-h-screen w-full overflow-hidden">
      <div className="fixed inset-x-0 top-0 h-[calc(100lvh-77px)] lg:h-auto lg:bottom-0 lg:left-24 -z-10">
        <JarvisVisualization />
      </div>

      <div className="relative z-10">
        <PortfolioContent />
      </div>
    </main>
  );
}
