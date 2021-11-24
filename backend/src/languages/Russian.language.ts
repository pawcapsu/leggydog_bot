import { LanguageProperty } from "src/types";

// Exporting Russian language file
export const RussianLanguage: { name: string, properties: LanguageProperty[] } =
{
  name: 'Russian',
  properties: [
    // Languages Menu
    {
      key: 'languages.chooseText',
      value: 'Русская швайна йа-йа-йа'
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