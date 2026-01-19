import { useState } from 'react';
import { Slider } from '@/components/ui/slider';

interface TimeSliderProps {
  onChange?: (value: number) => void;
}

export function TimeSlider({ onChange }: TimeSliderProps) {
  const [value, setValue] = useState([50]);

  const handleChange = (newValue: number[]) => {
    setValue(newValue);
    onChange?.(newValue[0]);
  };

  const getTimeFromValue = (val: number) => {
    const startHour = 7;
    const endHour = 10;
    const totalMinutes = (endHour - startHour) * 60;
    const minutes = Math.round((val / 100) * totalMinutes);
    const hour = startHour + Math.floor(minutes / 60);
    const min = minutes % 60;
    return `${hour}:${min.toString().padStart(2, '0')} AM`;
  };

  return (
    <div className="w-full space-y-4">
      <div className="flex justify-between text-xs text-muted-foreground font-mono">
        <span>7:00 AM</span>
        <span className="text-primary font-semibold">{getTimeFromValue(value[0])}</span>
        <span>10:00 AM</span>
      </div>
      
      <div className="relative">
        {/* Gradient background */}
        <div className="absolute inset-0 h-2 rounded-full heatmap-gradient opacity-30 top-1/2 -translate-y-1/2" />
        
        <Slider
          value={value}
          onValueChange={handleChange}
          max={100}
          step={1}
          className="relative z-10"
        />
      </div>

      <div className="flex justify-between text-[10px] text-muted-foreground">
        <span>Peak Traffic Start</span>
        <span>Rush Hour Peak</span>
        <span>Traffic Decline</span>
      </div>
    </div>
  );
}
