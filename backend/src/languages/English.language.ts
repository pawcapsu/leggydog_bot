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

    // Common
    // - buttons
    {
      key: 'common.buttons.openMainMenu',
      value: 'Go to main menu'
    },

    {
      key: 'common.buttons.cancel',
      value: 'Cancel',
    },

    // Errors
    {
      key: 'error.botIsDeactivated',
      value: `*Bot isn't activated*\n\nYou shouldn't even be here! You may have turned the bot off, and now you want to continue using it?\n\nOkay, just type \`/star\` command to activate this bot!`
    },
    
    // Create subscriber
    // - Create new subscriber menu
    {
      key: 'subscriber.create.createNew',
      value: `*Create new subscriber*\n\nBy creating a subscription, you subscribe to certain tags on E621.\n\nYou will be sent all new pictures, regardless of rating, comments or other tags.\n\nIn order to subscribe to any tags, simply enter the tags in the chat, separated by a space.\n\nList of all available tags: [Link](https://e621.net/tags)`,
    },

    // Created new subscriber menu
    {
      key: 'subscriber.create.subscribed',
      value: '*You subscribed to tags*\n\\\`${ variables.tags }\\\`\n\nNow I will send you all the newest pictures by these tags, hooray-hooray-hooray!\n\nIn the next few minutes your very first picture will come, which will describe what you can do with it next.\n\nNow we just have to wait!',
      acceptedVariables: [
        {
          name: 'tags',
          required: true,
        }
      ]
    },

    // Tags error while creating subscriber
    {
      key: 'subscriber.create.tagsError',
      value: 'Error!\n\n*These tags:* \n\n\\\`${ variables.tags }\\\` \n\n*does not exist.*\n\nPlease try again. Here, by the way, is the entire list of available tags: [Link](https://e621.net/tags)',
      acceptedVariables: [
        {
          name: 'tags',
          required: true,
        }
      ],
    },

    // buttons

    // Languages Menu
    {
      key: 'languages.chooseText',
      value: 'Please, choose your language.\n\nYeah Yeah'
    },
  ]
};