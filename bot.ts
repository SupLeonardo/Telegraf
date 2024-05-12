import { Telegraf, Markup, Context } from 'telegraf'
import { georgiy } from './src/georgy';
import { RemoveBusket, Bar, Milkshakes, Start, Menu, Main_Course, Salads, Side_dishes, Desserts, goBusket, Light_Acoholo, Alc_Cocktails, Strong_Acoholo, Not_Alc_Cocktails, goMenu, BuskMenu }
from './src/keyboard';
import { Descriptions } from './src/descriptions';
import { Photos } from './src/photos';
import { InlineKeyboardMarkup, Message, ReplyKeyboardMarkup } from 'telegraf/typings/core/types/typegram';
import { PrismaClient } from '@prisma/client';
// import { Message } from 'telegraf/typings/core/types/typegram';
import { callbackQuery } from "telegraf/filters";



const bot = new Telegraf(process.env.georgiy)
const prisma = new PrismaClient()

const getInvoice = (id: number) => {
    const invoice = {
      chat_id: id, // Уникальный идентификатор целевого чата или имя пользователя целевого канала
      provider_token: '381764678:TEST:84521', // токен выданный через бот @SberbankPaymentBot 
      start_parameter: 'get_access', //Уникальный параметр глубинных ссылок. Если оставить поле пустым, переадресованные копии отправленного сообщения будут иметь кнопку «Оплатить», позволяющую нескольким пользователям производить оплату непосредственно из пересылаемого сообщения, используя один и тот же счет. Если не пусто, перенаправленные копии отправленного сообщения будут иметь кнопку URL с глубокой ссылкой на бота (вместо кнопки оплаты) со значением, используемым в качестве начального параметра.
      title: 'Payment for restaurant', // Название продукта, 1-32 символа
      description: 'You are paying 100 rubles', // Описание продукта, 1-255 знаков
      currency: 'RUB', // Трехбуквенный код валюты ISO 4217
      prices: [{ label: 'Invoice Title', amount: 100 * 100 }], // Разбивка цен, сериализованный список компонентов в формате JSON 100 копеек * 100 = 100 рублей
      payload: JSON.stringify({ // Преобразование объекта в строку
        unique_id: 'hello',
        provider_token: '381764678:TEST:84521'
      })
    }
  
    return invoice
}


let busketNumber: number[] = []
let busketName: string[] = []
let busket: string[][] = [[]]

// bot.on('message', (ctx) => {
//     ctx.reply((ctx.message as Message.TextMessage).text)
// })

bot.hears('pay', (ctx) => { // это обработчик конкретного текста, данном случае это - "pay"
    return ctx.replyWithInvoice(getInvoice(ctx.from.id)) //  метод replyWithInvoice для выставления счета  
})

bot.on('pre_checkout_query', (ctx) => ctx.answerPreCheckoutQuery(true)) // ответ на предварительный запрос по оплате

bot.on('successful_payment', async (ctx, next) => { // ответ в случае положительной оплаты
  await ctx.reply('SuccessfulPayment')
})

function countUniqueValues(arr: any[]): number {
    let uniqueValues = new Set(arr);
    return uniqueValues.size;
}

function countOccurrences(arr: string[], value: string): number { // counter how many times are "value" is in the array
    return arr.reduce((count, curr) => curr === value ? count + 1 : count, 0);
}



async function addToBusket(name: string, ctx: Context) {
    if (!busketName.includes(name)) {
        busketName.push(name)
        busketNumber.push(1)
    } else {
        let index = busketName.indexOf(name)
        busketNumber[index] += 1
    }
    let message = await ctx.telegram.sendMessage(ctx.chat.id, `${name} was added to the busket`, Markup.keyboard(['Busket', 'Menu']).resize().oneTime())
                Busket()
                ctx.answerCbQuery()
}

const Busket = async () => {
    bot.hears('Busket', async (ctx) => {
        if (busketName.length === 0) {
            ctx.telegram.sendMessage(ctx.chat.id, 'Oops! Your busket is empty. Try to add something', Markup.keyboard(['Menu']).resize())
        } else {
            await ctx.reply('This is your busket:')
            for (let i = 0; i < busketName.length; i++) {
                ctx.reply(`${busketName[i]}: ${busketNumber[i]}`, Markup.keyboard(['Menu', 'Change quantity']).resize().oneTime())
            }
        }
    })

    let message: Message.TextMessage

    bot.hears('Change quantity', async ctx => {
        message = await ctx.telegram.sendMessage(ctx.chat.id, 'This is your busket. Press the buttons to change it', goMenu)
                for (let i = 0; i < busketName.length; i++) {
                    await ctx.telegram.sendMessage(ctx.chat.id, `${busketName[i]}: ${busketNumber[i]}`, 
                    Markup.inlineKeyboard([
                        Markup.button.callback('-', `-_${i}`), Markup.button.callback('+', `plus_${i}`), Markup.button.callback('Done', `done_${i}`),
                    ]))
                    
                } 
    })
    let done = 0
    bot.action(/-_(.+)/, async (ctx) => {
        ctx.answerCbQuery()
        let index = Number(ctx.match[1])
        busketNumber[index]--
        if (busketNumber[index] === 0) {
            await ctx.telegram.editMessageText(String(ctx.chat.id), message.message_id+index+1, '0', `${busketName[index]}: ${busketNumber[index]}`, 
            Markup.inlineKeyboard([
                Markup.button.callback('+', `plus_${index}`), Markup.button.callback('Done', `done_${index}`)
            ]))
        } else {
            await ctx.telegram.editMessageText(String(ctx.chat.id), message.message_id+index+1, '0', `${busketName[index]}: ${busketNumber[index]}`,
            Markup.inlineKeyboard([
                         Markup.button.callback('-', `-_${index}`), Markup.button.callback('+', `plus_${index}`), Markup.button.callback('Done', `done_${index}`),
                    ]))
        }
    })

    bot.action(/plus_(.+)/, async (ctx) => {
        let index = Number(ctx.match[1])
        busketNumber[index]++
        ctx.answerCbQuery()
        await ctx.telegram.editMessageText(String(ctx.chat.id), message.message_id+index+1, '0', `${busketName[index]}: ${busketNumber[index]}`,
            Markup.inlineKeyboard([
                         Markup.button.callback('-', `-_${index}`), Markup.button.callback('+', `plus_${index}`), Markup.button.callback('Done', `done_${index}`),
            ]))
    })

    bot.action(/done_(.+)/, async (ctx) => {
        let index = Number(ctx.match[1])
        ctx.answerCbQuery()
        done++
        if (done === busketNumber.length && done!=0) {
            ctx.telegram.sendMessage(ctx.chat.id, "That's all. Now, payment")
        } else if (done === 0) {
            ctx.reply('Your busket is empty. Check our menu and add something')
        }
        return ctx.editMessageReplyMarkup({ inline_keyboard: [] })
    })
    
    bot.hears('Menu', (ctx) => {
        ctx.telegram.sendMessage(ctx.chat.id, "What you want to eat?", Start)
    })
}

async function getByIdFromPrisma(ctx: Context, prisma: PrismaClient, id: number ) {
    const product = await prisma.dish.findUnique({
        where: {
          id: id,
        },
        select: {
            name: true,
            photo: true,
            description: true
        },
      });
      await ctx.replyWithPhoto(product.photo, {caption: product.description})
      prosduct = product.name
}

let prosduct: string

let confirm = Markup.inlineKeyboard([
    [Markup.button.callback('Yes', 'yes'), Markup.button.callback('No', 'no')]
])

let id: number

async function Product(ctx: Context, callback: string) {
    let menu_text: string
    let keyboard: Markup.Markup<InlineKeyboardMarkup>
    
    switch(callback) {
        case 'mc' : menu_text = 'Our main course menu'; keyboard = Main_Course; break
        case 'sd' : menu_text = 'Our side dishes menu'; keyboard = Side_dishes; break
        case 'sa': menu_text = 'Our salads menu'; keyboard = Salads; break
        case 'd': menu_text = 'Our desserts menu'; keyboard = Desserts; break
        case 'alc': menu_text = 'Our strong alcoholic drinks menu'; keyboard = Strong_Acoholo; break
        case 'la': menu_text = 'Our light alcoholic drinks menu'; keyboard = Light_Acoholo; break
        case 'ml': menu_text = 'Our non-alcoholic drinks menu'; keyboard = Milkshakes; break
        case 'ac': menu_text = 'Our alcoholic cocktail menu';  keyboard = Alc_Cocktails; break
        case 'nac': menu_text = 'Our non-alcoholic cocktail menu'; keyboard = Not_Alc_Cocktails; break
    }
    ctx.answerCbQuery()
    let message = await ctx.telegram.sendMessage(ctx.chat.id, menu_text, keyboard)
    bot.on(callbackQuery("data"), async ctx => {
        if (!isNaN(+ctx.callbackQuery.data)) {
            id = Number(ctx.callbackQuery.data)
            await getByIdFromPrisma(ctx, prisma, id)
            await ctx.telegram.sendMessage(ctx.chat.id, 'Do you want to add this product to the busket? You will be able to change a quantity later', confirm)
        }
        ctx.answerCbQuery()
    })

    bot.action(callback, async ctx => {
        ctx.answerCbQuery()
        let message = await ctx.telegram.sendMessage(ctx.chat.id, menu_text, keyboard)
        ctx.telegram.deleteMessage(ctx.chat.id, message.message_id-1)

        bot.hears('Menu', ctx => {
            ctx.telegram.sendMessage(ctx.chat.id, "What you want to eat?", Start)
        })
            ctx.answerCbQuery()
    })
    ctx.answerCbQuery()
}

bot.action('yes', ctx => {
    addToBusket(prosduct, ctx)
})

bot.action('no', async ctx => {
    let message = await ctx.reply(`${prosduct} wasn't added to the busket`)
    ctx.answerCbQuery()
})

Busket()

bot.start( async (ctx) => {
    await ctx.telegram.sendMessage(ctx.chat.id, "Welcome! I'm a restaurant bot", goBusket)
    ctx.telegram.sendMessage(ctx.chat.id, "What you want to eat?", Start)
    busketName = []
    busketNumber = []
})

Menue()

function Menue() {
    bot.action('bar', async (ctx) => {
        let message = await ctx.telegram.sendMessage(ctx.chat.id, 'Here you can choose some drinks. You can choose their quantity later', Bar)
        
        ctx.answerCbQuery();
    })
    
    
    bot.action('menu', async (ctx) => {
        await ctx.telegram.sendMessage(ctx.chat.id, 'Here you can add food from our main menu', Menu)
        
        ctx.answerCbQuery();
    })
}

bot.action('alc', ctx => {
    Product(ctx, 'alc')
})
bot.action('la', ctx => {
    Product(ctx, 'la')
})
bot.action('ml', ctx => {
    Product(ctx, 'ml')
})
bot.action('la', ctx => {
    Product(ctx, 'la')
})
bot.action('ac', ctx => {
    Product(ctx, 'ac')
})
bot.action('nac', ctx => {
    Product(ctx, 'nac')
})

bot.action('alc', ctx => {
    Product(ctx, 'alc')
})
bot.action('mc', ctx => {
    Product(ctx, 'mc')
})
bot.action('ml', ctx => {
    Product(ctx, 'ml')
})
bot.action('sd', ctx => {
    Product(ctx, 'sd')
})
bot.action('sa', ctx => {
    Product(ctx, 'sa')
})
bot.action('d', ctx => {
    Product(ctx, 'd')
})



bot.launch()
// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'))
process.once('SIGTERM', () => bot.stop('SIGTERM'))