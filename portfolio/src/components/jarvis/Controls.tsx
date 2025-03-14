"use client";

import { useState } from 'react';
import { cn } from '@/lib/utils';

interface ControlsProps {
  onSpeedChange: (speed: number) => void;
  onDensityChange: (density: number) => void;
  onColorChange: (color: string) => void;
}

export function Controls({ onSpeedChange, onDensityChange, onColorChange }: ControlsProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [speed, setSpeed] = useState(1);
  const [density, setDensity] = useState(1);
  const [colorScheme, setColorScheme] = useState('yellow');

  const handleSpeedChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);
    setSpeed(value);
    onSpeedChange(value);
  };

  const handleDensityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);
    setDensity(value);
    onDensityChange(value);
  };

  const handleColorChange = (color: string) => {
    setColorScheme(color);

    const colorMap: Record<string, string> = {
      yellow: '#ffcc00',
      blue: '#00ccff',
      green: '#00ff99',
      red: '#ff3300',
      purple: '#cc33ff'
    };

    onColorChange(colorMap[color]);
  };

  return (
    <div className="absolute top-4 right-4 text-yellow-400 z-10">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-black/30 backdrop-blur-sm border border-yellow-900 p-2 rounded-md hover:bg-black/50 transition-all"
      >
        <span className="sr-only">Toggle controls</span>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.5 6h9.75M10.5 6a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-9.75 0h9.75" />
        </svg>
      </button>

      <div className={cn(
        "mt-2 bg-black/30 backdrop-blur-sm border border-yellow-900 p-4 rounded-md transition-all duration-300",
        isOpen ? "opacity-100 scale-100" : "opacity-0 scale-95 pointer-events-none"
      )}>
        <h3 className="text-sm font-mono mb-4 text-yellow-300">J.A.R.V.I.S. CONTROLS</h3>

        <div className="space-y-4">
          <div className="space-y-2">
            <label className="text-xs font-mono">Animation Speed</label>
            <input
              type="range"
              min="0.1"
              max="2"
              step="0.1"
              value={speed}
              onChange={handleSpeedChange}
              className="w-full accent-yellow-400"
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-mono">Particle Density</label>
            <input
              type="range"
              min="0.5"
              max="2"
              step="0.1"
              value={density}
              onChange={handleDensityChange}
              className="w-full accent-yellow-400"
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-mono">Color Scheme</label>
            <div className="flex gap-2">
              {['yellow', 'blue', 'green', 'red', 'purple'].map((color) => (
                <button
                  key={color}
                  onClick={() => handleColorChange(color)}
                  className={cn(
                    "w-6 h-6 rounded-full",
                    {
                      'yellow': 'bg-yellow-400',
                      'blue': 'bg-blue-400',
                      'green': 'bg-green-400',
                      'red': 'bg-red-400',
                      'purple': 'bg-purple-400'
                    }[color],
                    colorScheme === color ? "ring-2 ring-white ring-offset-2 ring-offset-black" : ""
                  )}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
