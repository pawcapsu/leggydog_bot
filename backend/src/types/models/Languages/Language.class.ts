// Exporting LanguageProperty
export interface LanguageProperty {
  key: string,
  value: string,

  // +todo
  // something else? Probably.
  acceptedVariables?: LanguagePropertyVariable[]
};

// Exporting LanguagePropertyVariable
export interface LanguagePropertyVariable {
  name: string,
  required?: boolean,
};