import { LanguageProperty } from "src/types";

// Exporting English language file
export const EnglishLanguage: { name: string, properties: LanguageProperty[] } =
{
  name: 'English',
  properties: [
    // Notification
    {
      key: 'notification.title',
      value: '*New Post*\n\n',
    },

    {
      key: 'notification.field.description',
      value: '${ variables.description }\n',
      acceptedVariables: [
        {
          name: 'description',
          required: true
        }
      ]
    },

    // Start Menu
    {
      key: 'start',
      value: '*Leggydog Bot*\n\n*Please, choose your prefered language.*',
    },

    // 
    // Settings menu
    {
      key: 'settings',
      value: '*Settings*\n\nMenu with settings that can help you customize this bot for all your needs! There will be a lot of cool and interesting settings to be added in the future, so stay tuned!'
    },

    // - buttons

    {
      key: 'settings.button.returnToSettings',
      value: 'Back to Settings Menu',
    },

    {
      key: 'settings.buttons.language',
      value: 'Change language',
    },

    // 
    // Dashboard Menu
    {
      key: 'dashboard.introduction',
      value: "*Leggydog*\n\nGreetings! I'm so glad you decided to take advantage of me, that sounds incredibly cool and weird! Okay, forget the bad joke. I'm a bot that will keep track of new posts on various sites, and send you the latest content! At the moment, I only support *E621*, but there will be many more sites added soon.\n\n\n\n I'll help you in any way I can. In order to start using, you need to go to the menu \\`🔭 Subscribers\\`. See you in that menu!",
    },

    {
      key: 'dashboard',
      value: '*Dashboard*\n\nGood day, man! I hope you have something cool in mind for today :>\n\n*Number of subscriptions:* ${ variables.subscribers.length }\n_Subscription stores the tags by which we look for new pictures for you._',
      acceptedVariables: [
        {
          name: 'subscribers',
          required: true
        }
      ]
    },

    // - buttons
    {
      key: 'dashboard.buttons.subscribers',
      value: '🔭 Subscribers',
    },

    {
      key: 'dashboard.buttons.settings',
      value: 'ℹ️ Settings',
    },

    {
      key: 'dashboard.buttons.learnMore',
      value: 'Learn more',
    },

    {
      key: 'dashboard.buttons.otherServices',
      value: 'Other services'
    },

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

    {
      key: 'common.buttons.close',
      value: '❌ Close',
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

    // Created new subscriber notification
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

    // Languages Menu
    {
      key: 'languages',
      value: 'Please, choose your language.\n\nYeah Yeah'
    },

    {
      key: 'languages.russian',
      value: 'Русский',
    },

    {
      key: 'languages.english',
      value: 'English',
    }
  ]
};