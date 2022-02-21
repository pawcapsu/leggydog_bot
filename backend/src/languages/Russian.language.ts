import { LanguageProperty } from "src/types";

// Exporting Russian language file
export const RussianLanguage: { name: string, properties: LanguageProperty[] } =
{
  name: 'Russian',
  properties: [

    // - menu
    {
      key: 'subscribers.button.createNew',
      value: '➕ Создать подписку',
    },

    {
      key: 'subscribers.menu',
      value: '*Подписки*\n\nПодписка хранит в себе информацию о тегах картинок, которые вы хотите видеть в своей "ленте". Так же в будующем подписик можно будет настраивать, но это уже другая история.\n\nТут вы можете либо посмотреть _список своих подписок_ либо же _создать новую подписку_.',
    },

    {
      key: 'subscribers.button.list',
      value: 'Список подписок',
    },

    // - list
    {
      key: 'subscribers.list.previous',
      value: 'Предыдущая',
    },

    {
      key: 'subscribers.list.next',
      value: 'Следующая',
    },

    {
      key: 'subscribers.list.information',
      value: '*Информация о подписке №${ variables.currentSubscriber } из ${ variables.subscribersLength } подписок*\n\n*ID Подписки*: \\`${ variables.currentSubscriberId }\\`\n_Ид подписки в системе_\n\n*Теги*: \\`${ variables.tags.join(", ") }\\`\n_Теги, по которым мы ищем новые картинки_\n\n\n',
      acceptedVariables: [
        {
          name: 'currentSubscriber',
          required: true,
        },
        {
          name: 'subscribersLength',
          required: true
        },
        {
          name: 'currentSubscriberId',
          required: true,
        },
        {
          name: 'tags',
          required: true
        }
      ],
    },

    {
      key: 'subscribers.list.emptySubscribers',
      value: '*0 Подписок*\n\nДанный канал не подписан ни на один тег! Время это исправить, не думаешь?\n\nДля того, что бы подписаться на теги, нажмите на кнопку \\`➕ Создать подписку\\`, я вам там всё расскажу и объясню!',
    },

    // Notification
    {
      key: 'notification.title',
      value: '*Новая картинка*\n\n',
    },

    {
      key: 'notification.dislikePost',
      value: "Мне это не нравится"
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

    {
      key: 'notification.field.post_url',
      value: '*Ссылка на пост:* [Тыкни сюда!](${ variables.post_url })\n',
      acceptedVariables: [
        {
          name: 'post_url',
          required: true,
        },
      ],
    },

    {
      key: 'notification.field.description.empty',
      value: 'Пустое описание',
    },

    {
      key: 'notification.field.description.more',
      value: '...'
    },

    // Start Menu
    {
      key: 'start',
      value: '*Добро пожаловать!*\n\nПеред началом использования этого бота, пожалуйста, выберите предпочитаемый язык.\n\n_Его, если что, потом можно будет изменить_',
    },

    // 
    // Settings menu
    {
      key: 'settings',
      value: '*Настройки*\n\nМеню с настройками, с помощью которых вы сможете настроить этого бота под все ваши нужды!\n\nВ будующем сюда будет добавляться огромное количество крутых и интересных настроек, так что следите за обновлениями!\n\n*Краткая информация:*\n\n*🇷🇺 Язык* - настройки предпочитаемого языка бота;\n*🥀 Вид сообщений* - настройки того, как выглядят оповещания о новых постах;'
    },

    // - buttons

    {
      key: 'settings.button.returnToSettings',
      value: 'Вернуться к Настройкам',
    },

    {
      key: 'settings.buttons.language',
      value: '🇷🇺 Язык',
    },

    // Dashboard Menu
    {
      key: 'dashboard.introduction',
      value: "*Leggydog*\n\nПриветствую! Я очень рад что ты решил мною попользоваться, это прям невероятно круто и странно звучит! Ладно, проехали эту плохую шутку. Я бот, который будет следить за новыми постами на разных сайтах, и отправлять тебе самый свежий контент! На данный момент я поддерживаю только *E621*, но скоро добавится намного больше сайтов.\n\n\nЯ буду тебе помогать во всём, чём только смогу. Для того, что бы начать пользование, вам нужно зайти в меню \\`🔭 Подписки\\`. Увидимся в этом меню!"
    },

    {
      key: 'dashboard',
      value: '*Главная*\n\n${ variables.quote }\n\n*Кол-во подписок:* ${ variables.subscribers.length } шт.\n_Подписка хранит в себе теги, по которым мы ищем новые картинки для вас._',
      acceptedVariables: [
        {
          name: 'subscribers',
          required: true,
        },
        {
          name: 'quote',
          required: true,
        }
      ],
    },

    // Buttons
    {
      key: 'dashboard.buttons.subscribers',
      value: '🔭 Подписки',
    },

    {
      key: 'dashboard.buttons.settings',
      value: 'ℹ️ Настройки',
    },

    {
      key: 'dashboard.buttons.learnMore',
      value: 'Узнать больше',
    },

    {
      key: 'dashboard.buttons.otherServices',
      value: 'Другие сервисы'
    },

    // Languages Menu
    {
      key: 'languages',
      value: '*Выбор языка*\n\nВ данном меню вы можете выбрать один из немногих языков, который поддерживается этим ботом.\n\nНе самый важный, но весьма приятный, функционал.'
    },

    // Common
    // - buttons
    {
      key: 'common.buttons.openMainMenu',
      value: 'В главное меню'
    },

    {
      key: 'common.buttons.cancel',
      value: 'Отмена',
    },

    {
      key: 'common.buttons.close',
      value: '❌ Закрыть',
    },

    {
      key: 'common.buttons.delete',
      value: '🗑️ Удалить',
    },

    {
      key: 'common.buttons.edit',
      value: '✏️ Редактировать',
    },

    {
      key: 'common.buttons.back',
      value: '🏠 Назад'
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
      value: '*Вы подписали на теги*\n\\`${ variables.tags.join(", ") }\\`\n\nТеперь я буду отправлять вам все самые новые картинки по этим тегам, ура-ура-ура!\n\nВ ближайшие несколько минут придёт ваша самая первая картинка, в которой будет описанно что с ней можно делать дальше.\n\nОсталось просто подождать!',
      acceptedVariables: [
        {
          name: 'tags',
          required: true,
        }
      ]
    },

    {
      key: 'languages.russian',
      value: 'Русский',
    },

    {
      key: 'languages.english',
      value: 'English',
    },

    // - main menu quotes
    {
      key: 'dashboard.quote.1',
      value: 'Щебечут птички, туман рассеялся по просторным ветвям каменных джунглей... Отличное время что бы добавить самый кинковый тег в подписки!',
    },

    {
      key: 'bot.deactivated',
      value: '*Leggydog*\n\nВот так значит, да? Столько времени вместе а ты вот так вот...\n\nНу а если серьезно - то окей. Это твоё решение. Я перестану присылать тебе твои грязненькие картиночки, раз ты этого хочешь.\n\n<3 Люблю тебя'
    }
  ]
};