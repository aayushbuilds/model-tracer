import React from 'react';

interface TimeFilterProps {
  selectedRange: string;
  onRangeChange: (range: string) => void;
}

const TimeFilter: React.FC<TimeFilterProps> = ({ selectedRange, onRangeChange }) => {
  const ranges = ['24H', '3D', '7D', '30D'];

  return (
    <div className="flex items-center gap-1 p-1 bg-[#f0f0f0] rounded-lg">
      {ranges.map((range) => (
        <button
          key={range}
          onClick={() => onRangeChange(range)}
          className={`px-4 py-1.5 text-sm font-medium rounded-md transition-all ${
            selectedRange === range
              ? 'bg-white text-black shadow-sm'
              : 'text-[#737373] hover:text-[#525252]'
          }`}
        >
          {range}
        </button>
      ))}
    </div>
  );
};

export default TimeFilter;
