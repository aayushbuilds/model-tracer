import React, {useState, useRef, useEffect} from 'react';
import {cn} from '@/lib/utils';

export interface TabOption {
    value: string;
    label: string;
}

interface TabsSliderProps {
    options: TabOption[];
    value?: string;
    onChange?: (value: string) => void;
    multiple?: boolean;
    className?: string;
}

const TabsSlider: React.FC<TabsSliderProps> = ({
                                                   options,
                                                   value,
                                                   onChange,
                                                   className,
                                               }) => {
    const [selectedValue, setSelectedValue] = useState(value);
    const [sliderStyle, setSliderStyle] = useState<React.CSSProperties>({});
    const tabsRef = useRef<HTMLDivElement>(null);
    const tabRefs = useRef<Map<string, HTMLButtonElement>>(new Map());
    const [mounted, setMounted] = useState(false);

    const activeTab = value || selectedValue

    useEffect(() => {
        setMounted(true);
    }, []);

    useEffect(() => {
        if (!mounted) return;

        const activeButton = tabRefs.current.get(activeTab || "");
        const container = tabsRef.current;

        if (activeButton && container) {
            const containerRect = container.getBoundingClientRect();
            const buttonRect = activeButton.getBoundingClientRect();

            setSliderStyle({
                position: 'absolute',
                top: `${buttonRect.top - containerRect.top + container.scrollTop}px`,
                left: `${buttonRect.left - containerRect.left + container.scrollLeft}px`,
                width: `${buttonRect.width}px`,
                height: `${buttonRect.height}px`,
                transition: mounted ? 'all 200ms cubic-bezier(0.4, 0, 0.2, 1)' : 'none',
            });
        }
    }, [activeTab, mounted, options]);

    const handleTabClick = (tabValue: string) => {
        setSelectedValue(tabValue);
        onChange?.(tabValue);
    };

    return (
        <div
            ref={tabsRef}
            role="tablist"
            aria-orientation="horizontal"
            className={cn(
                'relative inline-flex items-center text-[#737373]  w-fit rounded-lg',
                'h-[39px] p-[3px] gap-1',
                'bg-[#f5f5f5]  border border-gray-200 ',
                className
            )}
        >
      <span
          className={cn(
              'bg-gradient-to-b from-white from-[42.45%] to-[#f0f0f0] to-[98.12%]',
              'shadow-[0px_1.283px_5.134px_0px_rgba(0,0,0,0.15)]',
              'rounded-lg',
          )}
          style={sliderStyle}
      />

            {options.map((option) => {
                const isActive = option.value === activeTab;

                return (
                    <button
                        key={option.value}
                        ref={(el) => {
                            if (el) tabRefs.current.set(option.value, el);
                        }}
                        type="button"
                        role="tab"
                        aria-selected={isActive}
                        data-state={isActive ? 'active' : 'inactive'}
                        className={cn(
                            'inline-flex items-center uppercase whitespace-nowrap ',
                            'relative z-10 h-full cursor-pointer',
                            'hover:brightness-[30%] transition-all duration-200 ease-in-out',
                            'flex-1 gap-1 rounded-lg',
                            'px-4 py-1 text-[13px]',
                            'text-[#737373]  ',
                            'data-[state=active]:text-[#1d202a]',
                            'data-[state=inactive]:hover:bg-gray-600/5',
                        )}
                        onClick={() => handleTabClick(option.value)}
                    >
                        {option.label}
                    </button>
                );
            })}
        </div>
    );
};

export default TabsSlider;
