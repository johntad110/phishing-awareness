import React, { createContext, useContext, useState, ReactNode } from 'react';
import qna from "../data/questions.json";

type Language = 'EN' | 'AM';

interface Translation {
  [key: string]: string;
}

interface LanguageContextType {
  language: Language;
  toggleLanguage: () => void;
  translation: Translation;
}


const defaultTranslations: { [key in Language]: Translation } = {
  EN: { title: "Phishing Attack Awareness" },
  AM: { title: "የማስገር ጥቃት ግንዛቤ ማስጨበጫ" }
}

const defaultValue: LanguageContextType = {
  language: 'EN',
  toggleLanguage: () => { },
  translation: defaultTranslations['EN'],
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
  
  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, translation: defaultTranslations[language] }}>
      {children}
    </LanguageContext.Provider>
  );

}


export const useLanguage = () => useContext(LanguageContext);

