import React from 'react';

const ShamelessRaindropPlug: React.FC = () => {
    const handleClick = () => {
        window.open("https://www.raindrop.ai", "_blank");
    };

    return (
        <div
            className="flex flex-row items-center gap-5 px-5 py-3 bg-[#e6e6e6] rounded-3xl mb-5 cursor-pointer"
            onClick={handleClick}
        >
            <img
                src="https://www.raindrop.ai/assets/raindrop-logo-web.png"
                height={90}
                width={120}
                alt="Raindrop Logo"
                className="opacity-90"
            />
            <span
                className="text-lg text-[#7a7a7a]"
                style={{ fontFamily: 'var(--font-alpha-lyrae)' }}
            >
                get
                <span className="relative ml-1 mr-3 pulse-red-text text-lg">
                    slack notifications
                    <span
                        className="absolute opacity-70 -top-[3px] right-[-10px] flex items-center justify-center font-mono font-bold text-[12px] text-white rounded-full bg-[#ff3b3b] shadow-lg min-w-[16px] h-[16px] px-1 scale-[40%]"
                    ></span>
                </span>
                when your AI fails, so you hear it before we do
            </span>
        </div>
    );
};

export default ShamelessRaindropPlug;
