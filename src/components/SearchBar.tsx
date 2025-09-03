import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import {Search} from "lucide-react";
import { fetchModels, Model } from '@/api/models';

interface SearchBarProps {
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
  onSearch?: (value: string) => void;
  className?: string;
}

const SearchBar: React.FC<SearchBarProps> = ({
  placeholder = "Claude Opus 4.1...",
  value: controlledValue,
  onChange,
  onSearch,
}) => {
  const navigate = useNavigate();
  const [internalValue, setInternalValue] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [modelsData, setModelsData] = useState<Model[]>([]);
  const [filteredModels, setFilteredModels] = useState<Model[]>([]);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const value = controlledValue !== undefined ? controlledValue : internalValue;

  useEffect(() => {
    fetchModels().then(data => {
      setModelsData(data);
    });
  }, []);

  useEffect(() => {
    if (value.trim() && modelsData.length > 0) {
      const filtered = modelsData.filter(model =>
        model.model.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredModels(filtered);
      setShowDropdown(filtered.length > 0);
    } else {
      setShowDropdown(false);
      setFilteredModels([]);
    }
    setSelectedIndex(-1);
  }, [value, modelsData]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node) &&
          inputRef.current && !inputRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    if (controlledValue === undefined) {
      setInternalValue(newValue);
    }
    onChange?.(newValue);
  };

  const handleSelectModel = (modelId: number) => {
    setShowDropdown(false);
    navigate(`/model/${modelId}`);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!showDropdown) {
      if (e.key === 'Enter' && onSearch) {
        onSearch(value);
      }
      return;
    }

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setSelectedIndex(prev =>
          prev < filteredModels.length - 1 ? prev + 1 : prev
        );
        break;
      case 'ArrowUp':
        e.preventDefault();
        setSelectedIndex(prev => prev > 0 ? prev - 1 : -1);
        break;
      case 'Enter':
        e.preventDefault();
        if (selectedIndex >= 0 && selectedIndex < filteredModels.length) {
          handleSelectModel(filteredModels[selectedIndex].id);
        } else if (onSearch) {
          onSearch(value);
          setShowDropdown(false);
        }
        break;
      case 'Escape':
        e.preventDefault();
        setShowDropdown(false);
        break;
    }
  };

  return (
    <div className="relative">
      <div className="flex items-center bg-white border-2 border-gray-200 rounded-lg focus-within:border-gray-300 focus-within:ring-2 focus-within:ring-transparent">
        <Search strokeWidth={2} size={16} className={"ml-4 mr-3"} color={"#7a7a7a"}/>
        <input
            ref={inputRef}
            type="text"
            placeholder={placeholder}
            className="font-sans text-[16px] text-gray-900 placeholder-gray-400 outline-none h-10 w-full bg-transparent"
            value={value}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
        />
      </div>

      {showDropdown && (
        <div
          ref={dropdownRef}
          className="absolute z-10 w-full bg-[#FAFAFA] border-2 border-gray-200 rounded-lg shadow-lg max-h-96 overflow-y-auto hidden-scroll"
        >
          {filteredModels.map((model, index) => (
            <div
              key={model.id}
              className={`px-4 py-3 cursor-pointer transition-colors ${
                index === selectedIndex 
                  ? 'bg-[#73737310]' 
                  : 'hover:bg-[#737373]'
              } ${index !== filteredModels.length - 1 ? 'border-b border-gray-100' : ''}`}
              onClick={() => handleSelectModel(model.id)}
              onMouseEnter={() => setSelectedIndex(index)}
            >
              <div className="font-medium text-gray-900">{model.model}</div>
              <div className="flex flex-wrap gap-1 mt-1">
                {model.products.slice(0, 3).map((product: string, idx: number) => (
                  <span
                    key={idx}
                    className="text-xs px-2 py-0.5 bg-gray-100 rounded text-gray-600"
                  >
                    {product}
                  </span>
                ))}
                {model.products.length > 3 && (
                  <span className="text-xs text-gray-500">
                    +{model.products.length - 3} more
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
