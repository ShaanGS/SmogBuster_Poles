import { useState } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Panel } from '@/components/ui/Panel';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { ExposureGauge } from '@/components/visualizations/ExposureGauge';
import { TimeSlider } from '@/components/visualizations/TimeSlider';
import { HeatmapOverlay } from '@/components/visualizations/HeatmapOverlay';
import { Users, Clock, TrendingDown } from 'lucide-react';

export default function HumanExposure() {
  const [timeValue, setTimeValue] = useState(50);
  const [showAfter, setShowAfter] = useState(false);

  const exposureBefore = 78;
  const exposureAfter = 51;
  const currentExposure = showAfter ? exposureAfter : exposureBefore;

  return (
    <DashboardLayout>
      <div className="space-y-6 animate-fade-in-up">
        {/* Page Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Human Exposure Visualization</h1>
            <p className="text-sm text-muted-foreground mt-1">
              Pedestrian-level exposure analysis and temporal patterns
            </p>
          </div>
          <StatusBadge status="active" label="EXPOSURE MONITORING" />
        </div>

        {/* Exposure Formula */}
        <Panel className="bg-primary/5 border-primary/20">
          <div className="flex items-center justify-center gap-4 py-2">
            <span className="text-sm text-muted-foreground">Human Exposure Index Formula:</span>
            <div className="bg-background/50 px-4 py-2 rounded-lg border border-border">
              <span className="font-mono text-primary text-lg">
                Exposure ∝ Concentration × Time × Pedestrian Density
              </span>
            </div>
          </div>
        </Panel>

        {/* Main Content */}
        <div className="grid grid-cols-12 gap-6">
          {/* Exposure Comparison */}
          <div className="col-span-8">
            <Panel title="Exposure Before vs After System Operation">
              <div className="grid grid-cols-2 gap-8">
                {/* Before */}
                <div 
                  className={`relative p-6 rounded-lg border-2 cursor-pointer transition-all ${
                    !showAfter ? 'border-primary bg-primary/5' : 'border-border bg-background/50 opacity-60'
                  }`}
                  onClick={() => setShowAfter(false)}
                >
                  <div className="absolute top-3 right-3">
                    <span className={`text-xs font-mono px-2 py-1 rounded ${!showAfter ? 'bg-primary text-primary-foreground' : 'bg-secondary text-muted-foreground'}`}>
                      BEFORE
                    </span>
                  </div>
                  
                  <h4 className="text-sm font-semibold text-foreground mb-4">Without System</h4>
                  
                  <div className="aspect-square bg-background/50 rounded-lg overflow-hidden relative mb-4">
                    <HeatmapOverlay className="w-full h-full" animate={!showAfter} />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center">
                        <span className="text-4xl font-mono font-bold text-destructive glow-text-danger">78</span>
                        <p className="text-xs text-muted-foreground mt-1">Exposure Index</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Peak PM2.5</span>
                      <span className="font-mono text-destructive">95 µg/m³</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Avg Exposure Time</span>
                      <span className="font-mono text-foreground">8.5 min</span>
                    </div>
                  </div>
                </div>

                {/* After */}
                <div 
                  className={`relative p-6 rounded-lg border-2 cursor-pointer transition-all ${
                    showAfter ? 'border-success bg-success/5' : 'border-border bg-background/50 opacity-60'
                  }`}
                  onClick={() => setShowAfter(true)}
                >
                  <div className="absolute top-3 right-3">
                    <span className={`text-xs font-mono px-2 py-1 rounded ${showAfter ? 'bg-success text-success-foreground' : 'bg-secondary text-muted-foreground'}`}>
                      AFTER
                    </span>
                  </div>
                  
                  <h4 className="text-sm font-semibold text-foreground mb-4">With Cluster Active</h4>
                  
                  <div className="aspect-square bg-background/50 rounded-lg overflow-hidden relative mb-4">
                    {/* Reduced heatmap effect */}
                    <svg viewBox="0 0 400 300" className="w-full h-full">
                      <defs>
                        <radialGradient id="reducedPollution" cx="50%" cy="50%" r="50%">
                          <stop offset="0%" stopColor="hsl(80, 60%, 45%)" stopOpacity="0.5" />
                          <stop offset="100%" stopColor="hsl(142, 76%, 36%)" stopOpacity="0.1" />
                        </radialGradient>
                        <filter id="blurReduced" x="-50%" y="-50%" width="200%" height="200%">
                          <feGaussianBlur in="SourceGraphic" stdDeviation="20" />
                        </filter>
                      </defs>
                      <ellipse cx="200" cy="150" rx="100" ry="80" fill="url(#reducedPollution)" filter="url(#blurReduced)">
                        <animate attributeName="opacity" values="0.4;0.6;0.4" dur="3s" repeatCount="indefinite" />
                      </ellipse>
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center">
                        <span className="text-4xl font-mono font-bold text-success glow-text-success">51</span>
                        <p className="text-xs text-muted-foreground mt-1">Exposure Index</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Peak PM2.5</span>
                      <span className="font-mono text-success">62 µg/m³</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Avg Exposure Time</span>
                      <span className="font-mono text-foreground">8.5 min</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Reduction Banner */}
              <div className="mt-6 p-4 bg-success/10 border border-success/30 rounded-lg flex items-center justify-center gap-4">
                <TrendingDown className="w-6 h-6 text-success" />
                <span className="text-lg font-semibold text-success">
                  34.6% Reduction in Human Exposure Index
                </span>
              </div>
            </Panel>
          </div>

          {/* Right Side */}
          <div className="col-span-4 space-y-6">
            {/* Exposure Gauge */}
            <Panel title="Current Exposure Index">
              <ExposureGauge value={currentExposure} max={100} />
              <div className="mt-4 text-center">
                <span className={`text-sm font-mono ${currentExposure > 70 ? 'text-destructive' : currentExposure > 50 ? 'text-warning' : 'text-success'}`}>
                  {currentExposure > 70 ? 'HIGH EXPOSURE' : currentExposure > 50 ? 'MODERATE EXPOSURE' : 'LOW EXPOSURE'}
                </span>
              </div>
            </Panel>

            {/* Time Window */}
            <Panel title="Brief Exposure Window">
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-sm">
                  <Clock className="w-4 h-4 text-primary" />
                  <span className="text-muted-foreground">Analysis Period:</span>
                  <span className="font-mono text-foreground">7:00 - 10:00 AM</span>
                </div>
                
                <TimeSlider onChange={setTimeValue} />
                
                <div className="bg-secondary/30 rounded-lg p-3 mt-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">Brief Exposure Window</span>
                    <span className="font-mono text-warning text-sm">8:15 ~ 8:55</span>
                  </div>
                  <div className="flex items-center justify-between mt-1">
                    <span className="text-xs text-muted-foreground">Duration</span>
                    <span className="font-mono text-destructive font-bold">25 min</span>
                  </div>
                </div>
              </div>
            </Panel>

            {/* Pedestrian Density */}
            <Panel title="Pedestrian Presence">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                    <Users className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Estimated Density</p>
                    <p className="font-mono text-lg font-bold text-foreground">42 ped/min</p>
                  </div>
                </div>
                
                {/* Density visualization */}
                <div className="h-16 bg-secondary/30 rounded-lg overflow-hidden relative">
                  <div 
                    className="absolute bottom-0 left-0 right-0 bg-primary/30"
                    style={{ height: '70%' }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-t from-primary/50 to-transparent" />
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-xs font-mono text-foreground">PEAK DENSITY</span>
                  </div>
                </div>
                
                <p className="text-xs text-muted-foreground">
                  Higher pedestrian density increases aggregate exposure even at constant concentration levels.
                </p>
              </div>
            </Panel>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
