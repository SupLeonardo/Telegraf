import { Telegraf, Markup, Context } from 'telegraf'
import { georgiy } from './src/georgy';
import { RemoveBusket, Bar, Milkshakes, Start, Menu, Main_Course, Salads, Side_dishes, Desserts, goBusket, Light_Acoholo, Alc_Cocktails, Strong_Acoholo, Not_Alc_Cocktails, goMenu, BuskMenu }
from './src/keyboard';
import { Descriptions } from './src/descriptions';
import { Photos } from './src/photos';
import { Triggers } from 'telegraf/typings/composer';
import { InlineKeyboardMarkup, ReplyKeyboardMarkup } from 'telegraf/typings/core/types/typegram';
import { keyboard } from 'telegraf/typings/markup';
import { PrismaClient } from '@prisma/client';
import { Message } from 'telegraf/typings/core/types/typegram';
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



function addToBusket(name: string) {
    if (!busketName.includes(name)) {
        busketName.push(name)
        busketNumber.push(1)
    } else {
        let index = busketName.indexOf(name)
        busketNumber[index] += 1
    }
}

const Busket = () => {
    bot.hears('Busket', async (ctx) => {
        if (busketName.length === 0) {
            ctx.telegram.sendMessage(ctx.chat.id, 'Oops! Your busket is empty. Try to add something', Markup.keyboard(['Menu']).resize())
        } else {
            for (let i = 0; i < busketName.length; i++) {
                ctx.reply(`${busketName[i]}: ${busketNumber[i]}`, Markup.keyboard(['Menu']).resize().oneTime())
            }
        }
    })
    
    bot.hears('Menu', (ctx) => {
        ctx.telegram.sendMessage(ctx.chat.id, "What you want to eat?", Start)
    })
}

async function Action(ctx: Context, menu_text: string, confirm: string, id: number, keyboard: Markup.Markup<InlineKeyboardMarkup>) {
        switch(confirm) {
            case 'yes':
                const name = await prisma.dish.findUnique({
                    where: {
                        id: id,
                    },
                    select: {
                        name: true
                    }
                })
                addToBusket(name.name)
                let message = await ctx.telegram.sendMessage(ctx.chat.id, `${name.name} was added to the busket`, Markup.keyboard(['Busket', 'Menu']).resize())
                ctx.telegram.deleteMessage(ctx.chat.id, message.message_id-1)
                ctx.telegram.deleteMessage(ctx.chat.id, message.message_id-2)
                Busket()
            }
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

function Product(ctx: Context, callback: string) {
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
    bot.action(callback, async ctx => {
        ctx.answerCbQuery()
        let message = await ctx.telegram.sendMessage(ctx.chat.id, menu_text, keyboard)
        ctx.telegram.deleteMessage(ctx.chat.id, message.message_id-1)
        bot.on(callbackQuery("data"), async ctx => {
            ctx.answerCbQuery()
            if (!isNaN(+ctx.callbackQuery.data)) {
                id = Number(ctx.callbackQuery.data)
                await getByIdFromPrisma(ctx, prisma, id)
                await ctx.telegram.sendMessage(ctx.chat.id, 'Do you want to add this product to the busket? You will be able to change a quantity later', confirm)
                
            } else if (ctx.callbackQuery.data === 'yes') {
                Action(ctx, menu_text, 'yes', id, keyboard)
            } else if (ctx.callbackQuery.data === 'no') {
                ctx.reply('This product wasn`t added to the busket', Markup.keyboard(['Menu', 'Busket']).resize())
                
            }
        })
        bot.hears('Menu', ctx => {
            ctx.telegram.sendMessage(ctx.chat.id, "What you want to eat?", Start)
        })

            // Action(ctx, menu_text, Number(ctx.callbackQuery.data), keyboard)
            ctx.answerCbQuery()
    })
    ctx.answerCbQuery()
}

bot.start( async (ctx) => {
    await ctx.telegram.sendMessage(ctx.chat.id, "Welcome! I'm a restaurant bot", goBusket)
    ctx.telegram.sendMessage(ctx.chat.id, "What you want to eat?", Start)
    busketName = []
    busketNumber = []
    // Busket()
})

// const Busket = () => {
//     let done: string[] = []
//     bot.hears('Busket', async (ctx) => {
//         if (busket.length === 0) {
//             ctx.telegram.sendMessage(ctx.chat.id, 'Oops! Your busket is empty. Try to add something', Markup.keyboard(['Menu']).resize())
//         } else {
//             await ctx.telegram.sendMessage(ctx.chat.id, "This is your busket:", Markup.keyboard(['Menu', 'Change quantity']).oneTime())
//             for (let i = 0; i < countBusket.length; i++) {
//                 if (!countBusket.includes(busket[i])) {
//                     countBusket.push(busket[i])
//                 }
//                 let count = countOccurrences(busket, countBusket[i])
//                 await ctx.telegram.sendMessage(ctx.chat.id, `${i+1}. ${countBusket[i]}, ${count}`)
//             }
//             bot.hears('Change quantity', async (ctx) => {
//                 let message = await ctx.telegram.sendMessage(ctx.chat.id, 'This is your busket. Press the buttons to change it', goMenu)
//                 for (let i = 0; i < countBusket.length; i++) {
//                     let count = countOccurrences(busket, countBusket[i])
//                     countArr.push(count)
//                     await ctx.telegram.sendMessage(ctx.chat.id, `${countBusket[i]}: ${count}`, 
//                     Markup.inlineKeyboard([
//                         Markup.button.callback('-', `-_${i}`), Markup.button.callback('+', `plus_${i}`), Markup.button.callback('Done', `done_${i}`),
//                     ]))
                    
//                 }
//                 bot.action(/-_(.+)/, async (ctx) => {
//                     ctx.answerCbQuery()
//                     let index = Number(ctx.match[1])
//                     countArr[index]--
//                     if (countArr[index] === 0) {
//                         await ctx.telegram.editMessageText(String(ctx.chat.id), message.message_id+index+1, '0', `${countBusket[index]}: ${countArr[index]}`, 
//                         Markup.inlineKeyboard([
//                             Markup.button.callback('+', `plus_${index}`), Markup.button.callback('Done', `done_${index}`)
//                         ]))
//                     } else {
//                         await ctx.telegram.editMessageText(String(ctx.chat.id), message.message_id+index+1, '0', `${countBusket[index]}: ${countArr[index]}`,
//                         Markup.inlineKeyboard([
//                                      Markup.button.callback('-', `-_${index}`), Markup.button.callback('+', `plus_${index}`), Markup.button.callback('Done', `done_${index}`),
//                                 ]))
//                         // console.log(countBusket[index]), console.log(countArr[index])
//                     }
                    
//                     // console.log(countBusket[index]); console.log(countArr[index])
//                 })
//                 bot.action(/plus_(.+)/, async (ctx) => {
//                     let index = Number(ctx.match[1])
//                     countArr[ctx.match[1]]++
//                     ctx.answerCbQuery()
//                     // console.log(countBusket[index]), console.log(countArr[index])
//                     await ctx.telegram.editMessageText(String(ctx.chat.id), message.message_id+index+1, '0', `${countBusket[index]}: ${countArr[index]}`,
//                         Markup.inlineKeyboard([
//                                      Markup.button.callback('-', `-_${index}`), Markup.button.callback('+', `plus_${index}`), Markup.button.callback('Done', `done_${index}`),
//                                 ]))
//                 })
//                 bot.action(/done_(.+)/, async (ctx) => {
//                     let index = Number(ctx.match[1])
//                     // console.log(countBusket[ctx.match[1]])
//                     ctx.answerCbQuery()
//                     done.push(countBusket[index])
//                     if (done.length === countBusket.length) {
//                         ctx.telegram.sendMessage(ctx.chat.id, "That's it. Now, payment")
//                     }
//                     return ctx.editMessageReplyMarkup({ inline_keyboard: [] })
//                 })
//             })
//         }
//     })
    
//     bot.hears('Menu', (ctx) => {
//         ctx.telegram.sendMessage(ctx.chat.id, "What you want to eat?", Start)
//     })
// }

// Busket()

bot.action('bar', async (ctx) => {
    let message = await ctx.telegram.sendMessage(ctx.chat.id, 'Here you can choose some drinks. You can choose their quantity later', Bar)
    bot.action('alc', ctx => {
        console.log('hi')
        Product(ctx, 'alc')
    })
    
    Product(ctx, 'la')
    Product(ctx, 'ml')
    Product(ctx, 'ac')
    Product(ctx, 'nac')
    ctx.answerCbQuery();
})


bot.action('menu', async (ctx) => {
    await ctx.telegram.sendMessage(ctx.chat.id, 'Here you can add food from our main menu', Menu)
    
    Product(ctx, 'mc')
    Product(ctx, 'sd')
    Product(ctx, 'sa')
    Product(ctx, 'd')
    ctx.answerCbQuery();
})


bot.launch()
// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'))
process.once('SIGTERM', () => bot.stop('SIGTERM'))