import React, { useState } from 'react';

interface IssueFormProps {
  products: string[];
}

const IssueForm: React.FC<IssueFormProps> = ({ products }) => {
  const issueOptions = ["Model not responding", "Bias", "Wrong output", "Unsafe", "Overconfidence", "Hallucination"];
  const purposeOptions = [
    "Research",
    "Writing",
    "Vibe Coding",
    "Studying",
    "Brainstorming",
    "Summarizing",
    "Translation",
    "Productivity",
    "Entertainment",
  ];

  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState({ issue: '', product: '', purpose: '' });
  const [otherValues, setOtherValues] = useState({ issue: '', product: '', purpose: '' });

  const steps = [
    {
      key: 'issue' as const,
      title: 'What issue are you having?',
      options: issueOptions,
    },
    {
      key: 'product' as const,
      title: 'What product did you have the issue on?',
      options: products,
    },
    {
      key: 'purpose' as const,
      title: 'What was your usecase?',
      options: purposeOptions,
    },
  ];

  const handleSelect = (key: keyof typeof formData, value: string) => {
    setFormData(prev => ({ ...prev, [key]: value }));
    setStep(prev => prev + 1);
  };

  const handleOtherKeyPress = (key: keyof typeof formData) => (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && otherValues[key].trim()) {
      handleSelect(key, otherValues[key]);
    }
  };

  if (step >= steps.length) {
    return (
        <div className="mt-8 bg-[#f7f7f8] border border-[#e9e9e9] py-20 rounded-xl flex items-center justify-center">
          <div className="text-center">
            <span className="text-xl">Thank you for your report!</span>
          </div>
        </div>
    );
  }

  const currentStep = steps[step];

  return (
      <div className="mt-8 bg-[#f7f7f8] border border-[#e9e9e9] py-20 px-8 rounded-xl">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-xl mb-6 text-center">{currentStep.title}</h2>
          <div className="flex flex-wrap gap-3 justify-center">
            {currentStep.options.map(option => (
                <button
                    key={option}
                    onClick={() => handleSelect(currentStep.key, option)}
                    className="px-5 py-2 border border-[#7a7a7a] bg-[#e6e6e690] hover:bg-[#e3e4e8] rounded-3xl text-gray-700"
                >
                  {option}
                </button>
            ))}
          </div>
          <div className="mt-6 flex justify-center">
            <input
                type="text"
                placeholder="Other"
                value={otherValues[currentStep.key]}
                onChange={(e) => setOtherValues(prev => ({ ...prev, [currentStep.key]: e.target.value }))}
                onKeyDown={handleOtherKeyPress(currentStep.key)}
                className="px-4 py-2 border border-[#7a7a7a] rounded-lg w-64 outline-none focus:border-gray-500"
            />
          </div>
        </div>
      </div>
  );
};

export default IssueForm;
