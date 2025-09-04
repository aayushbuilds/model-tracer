import React from "react";
import {useNavigate} from "react-router-dom";

interface HeaderProps {
    title?: string;
    subtitle?: string;
}

export const Header: React.FC<HeaderProps> = ({
                                                  title = "WEIGHTS ISSUE",
                                                  subtitle = "OR SKILL ISSUE",
                                              }) => {
    const navigate = useNavigate();

    const scrollToModels = () => {
        const element = document.getElementById('models-section');
        if (element) {
            element.scrollIntoView({behavior: 'smooth'});
        } else {
            navigate('/#models-section');
        }
    };


    return (
        <div className="flex flex-row items-center justify-between top-0 z-50 bg-[#FDFDFD] px-9 -mx-9">
            <div className="py-6 flex flex-col items-start cursor-pointer" onClick={() => navigate('/')}>
                <h1 className="text-3xl text-black font-bold"
                    style={{fontFamily: 'var(--font-alpha-lyrae)'}}>{title}</h1>
                <h1 className="text-md text-gray-400 font-bold"
                    style={{fontFamily: 'var(--font-alpha-lyrae)'}}>{subtitle}</h1>
            </div>
            <div className="flex items-center gap-8">
                <button
                    onClick={scrollToModels}
                    className="text-gray-700 hover:text-black transition-colors duration-200 cursor-pointer font-medium"
                    style={{fontFamily: 'var(--font-alpha-lyrae)'}}
                >
                    Models We Monitor
                </button>
            </div>
        </div>
    );
};

export default Header;
