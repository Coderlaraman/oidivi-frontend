"use client";

import { createContext, useContext, useState } from "react";

// Importar las traducciones desde los archivos separados
import { en } from "../translations/en";
import { es } from "../translations/es";
import { fr } from "../translations/fr";

// Definición de los idiomas soportados
export type SupportedLanguages = "en" | "es" | "fr";

// Tipo utilitario mejorado para generar claves de traducción con profundidad limitada
type DotPrefix<T extends string> = T extends "" ? "" : `.${T}`;

type Tail<T extends any[]> = T extends [any, ...infer R] ? R : T;

type DotNestedKeys<
  T,
  Depth extends number[] = [1, 1, 1, 1] // Limita la profundidad a 4 niveles
> = [Depth] extends [[]]
  ? never
  : T extends object
  ? {
      [K in keyof T]: K extends string | number
        ?
            | `${K}`
            | `${K}${DotPrefix<DotNestedKeys<T[K], Tail<Depth> & number[]>>}`
        : never;
    }[keyof T]
  : "";

// Definición centralizada de las traducciones
export const translations = {
  en,
  es,
  fr,
};

// Se define el tipo de claves de traducción utilizando el tipo utilitario recursivo
type TranslationKeys = DotNestedKeys<typeof en>;

const LanguageContext = createContext<{
  language: SupportedLanguages;
  setLanguage: (lang: SupportedLanguages) => void;
  t: (key: TranslationKeys) => string;
}>({
  language: "en",
  setLanguage: () => {},
  t: (key) => key,
});

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<SupportedLanguages>("en");

  const t = (key: TranslationKeys): string => {
    try {
      const keys = key.split(".");
      let value: any = translations[language];

      for (const k of keys) {
        if (value === undefined) return key; // Retorna la clave si la ruta no es válida
        value = value[k];
      }

      return value ?? key; // Retorna el valor si se encuentra, de lo contrario retorna la clave
    } catch (error) {
      console.warn(`Translation key not found: ${key}`);
      return key; // Retorna la clave como respaldo
    }
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};
