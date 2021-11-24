import { LanguageProperty } from "src/types";

// Exporting English language file
export const EnglishLanguage: { name: string, properties: LanguageProperty[] } =
{
  name: 'English',
  properties: [
    // Languages Menu
    {
      key: 'languages.chooseText',
      value: 'Please, choose your language.\n\nYeah Yeah'
    },

    {
      key: 'test',
      value: 'Test value ${ variables.testVariable }',
      acceptedVariables: [
        {
          name: 'testVariable',
          required: true
        }
      ]
    }
  ]
};