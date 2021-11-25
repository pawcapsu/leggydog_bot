import { LanguageProperty } from "src/types";

// Exporting English language file
export const EnglishLanguage: { name: string, properties: LanguageProperty[] } =
{
  name: 'English',
  properties: [
    // Start Menu
    // {
    //   key: ''
    // }

    // Errors
    {
      key: 'error.botIsDeactivated',
      value: `*Bot isn't activated*\n\nYou shouldn't even be here! You may have turned the bot off, and now you want to continue using it?\n\nOkay, just type \`/star\` command to activate this bot!`
    },
    
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