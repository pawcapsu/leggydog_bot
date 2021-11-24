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

// Exporting Language class
export class Language {
  // Properties
  public name: string;
  public properties: LanguageProperty[];
  
  // Constructor
  constructor(name: string, properties: LanguageProperty[]) {
    this.name = name;
    this.properties = properties;
  };

  // get
  // - Get formatted LanguageProperty variable
  public get(key: string, variables = {}, defaultValue?: string): string | null {
    const property = this.properties.find((x) => x.key == key)
    if (property) {
      // Do we need to format this message
      // with variables?
      if (property.acceptedVariables) {
        // Checking if we have all required acceptedVariables in
        // { variables } argument
        property.acceptedVariables.forEach((variable) => {
          if (variable.required && !variables[variable.name]) throw new Error(`Error in ${this.name} language: ${ property.key } requires ${ variable.name } variable, which is not present. Presented variable names: ${ Object.keys(variables) }`);
        });

        return eval(`\`${property.value}\``) ?? defaultValue;;
      } else {
        return property.value ?? defaultValue;
      };
    } else {
      return null ?? defaultValue;
    };
  };
};