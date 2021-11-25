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
      key: 'common.buttons.openMainMenu',
      value: 'Вернуться в главное меню'
    },

    // Create subscriber
    // - Create new subscriber menu
    {
      key: 'subscriber.create.createNew',
      value: `*Создать новую подписку*\n\nСоздавая подписку, вы подписываетесь на определённые теги на сайте *E621*.\n\nВам будут присылаться все новые картинки, вне зависимости от рейтинга, комментариев либо других тегов.\n\nДля того, что бы подписаться на какие-либо теги, *просто впишите в чат теги через пробел*.\n\nСписок всех доступных тегов: [Ссылка](https://e621.net/tags)`,
    },

    // Created new subscriber menu
    {
      key: 'subscriber.create.subscribed',
      value: '*Вы подписали на теги*\n\`${ variables.tags.join(", ") }\`\n\nТеперь я буду отправлять вам все самые новые картинки по этим тегам, ура-ура-ура!\n\nВ ближайшие несколько минут придёт ваша самая первая картинка, в которой будет описанно что с ней можно делать дальше.\n\nОсталось просто подождать!',
      acceptedVariables: [
        {
          name: 'tags',
          required: true,
        }
      ]
    },

    {
      key: 'common.buttons.cancel',
      value: 'Отмена',
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