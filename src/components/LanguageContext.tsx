import React, { createContext, useContext, useState, ReactNode } from 'react';
import context from "../data/questions.json"

type Language = 'EN' | 'AM';

interface Explanation {
  correct: string;
  wrong: string;
}

export interface Question {
  question: string;
  choice: string[];
  answer: number;
  explanation: Explanation;
  userAnswer?: number;
}

interface LanguageTranslation {
  title: string;
  btn1: string;
  btn2: string;
  btn3: string;
  btn4: string;
  questions: Question[];
}

interface Translation {
  EN: LanguageTranslation;
  AM: LanguageTranslation;
}

const defaultTranslations: Translation = context;

interface LanguageContextType {
  language: Language;
  toggleLanguage: () => void;
  translation: LanguageTranslation;
  handleAnswer: (idx: number, ans: number) => void
}


const defaultValue: LanguageContextType = {
  language: 'EN',
  toggleLanguage: () => { },
  translation: defaultTranslations['EN'],
  handleAnswer: () => { },
};

const LanguageContext = createContext<LanguageContextType>(defaultValue);

interface LanguageProviderChildren {
  children: ReactNode,
}

export const LanguageProvider: React.FC<LanguageProviderChildren> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('EN');

  const toggleLanguage = () => {
    setLanguage(language === 'EN' ? 'AM' : 'EN');

  };

  const handleAnswer = (idx: number, ans: number) => {
    defaultTranslations[language].questions[idx].userAnswer = ans;
    console.log(defaultTranslations[language].questions[idx].userAnswer);
  }

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, translation: defaultTranslations[language], handleAnswer }}>
      {children}
    </LanguageContext.Provider>
  );

}


export const useLanguage = () => useContext(LanguageContext);

