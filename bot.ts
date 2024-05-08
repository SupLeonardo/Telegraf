import { Telegraf, Markup, Context } from 'telegraf'
import { georgiy } from './src/georgy';
import { RemoveBusket, Bar, Milkshakes, Confirmation, Start, Menu, Main_Course, Salads, Side_dishes, Desserts, database, goBusket, Light_Acoholo, Alc_Cocktails, Strong_Acoholo, Not_Alc_Cocktails, goMenu, BuskMenu }
from './src/keyboard';
import { Descriptions } from './src/descriptions';
import { Photos } from './src/photos';
import { Triggers } from 'telegraf/typings/composer';
import { InlineKeyboardMarkup, ReplyKeyboardMarkup } from 'telegraf/typings/core/types/typegram';
import { keyboard } from 'telegraf/typings/markup';
import { PrismaClient } from '@prisma/client';

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



let busket: string[] = []
let countBusket: string[] = []
let countArr: number[] = []
const bot = new Telegraf(process.env.georgiy)

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

function addToBusket(ctx: Context, name: string) {
    if (!countBusket.includes(name)) {
        countBusket.push(name)
    }   
    //console.log(busket)
    //console.log(countBusket)
    Busket()
}
let product: string
function Yes(name: string) {
    product = name
}

function Action(ctx: Context, index: number, menu_text: string, keyboard: Markup.Markup<InlineKeyboardMarkup>) {
    ctx.telegram.sendMessage(ctx.chat.id, 'Do you want to add this product to your busket? You will be able to change a quantity later', Confirmation)
    let name = database[index]
    Yes(name)
    bot.action('yes', async (ctx) => {
        busket.push(product)
        let message = await ctx.reply(`${product} was added to the busket`, BuskMenu);
        ctx.telegram.deleteMessage(ctx.chat.id, message.message_id-1)
        ctx.telegram.deleteMessage(ctx.chat.id, message.message_id-2)
        ctx.answerCbQuery()
        addToBusket(ctx, product)
        Busket()
    })
    bot.action('no', async (ctx) => {
        await ctx.telegram.sendMessage(ctx.chat.id, menu_text, keyboard)
        ctx.answerCbQuery()
        Busket()
    })
}

function Product(callback: string, menu: string, trigger: RegExp, ctx: Context, keyboard: Markup.Markup<InlineKeyboardMarkup>) {
    ctx.answerCbQuery()
    let menu_text: string
    switch(callback) {
        case 'mc' : menu_text = 'Our main course menu'; break
        case 'sd' : menu_text = 'Our side dishes menu'; break
        case 'sa': menu_text = 'Our salads menu'; break
        case 'd': menu_text = 'Our desserts menu'; break
        case 'alc': menu_text = 'Our strong alcoholic drinks menu'; break
        case 'la': menu_text = 'Our light alcoholic drinks menu'; break
        case 'mi': menu_text = 'Our non-alcoholic drinks menu'; break
        case 'ac': menu_text = 'Our alcoholic cocktail menu'; break
        case 'nac': menu_text = 'Our non-alcoholic cocktail menu'; break
        case 'mi': menu_text = 'Our milkshakes menu'; break
    }
    bot.action(callback, (ctx) => {
        ctx.telegram.sendMessage(ctx.chat.id, menu_text, keyboard)
        ctx.answerCbQuery()
        bot.action(trigger, async (ctx) => {
            let index = Number(ctx.match[1])
            let description = Descriptions[index-1]
            let photo = Photos[index-2]
            await ctx.replyWithPhoto(photo, {caption: description})
            Action(ctx, index-1, menu_text, keyboard)
            ctx.answerCbQuery()
        })
    })
}
bot.start( async (ctx) => {
    await ctx.telegram.sendMessage(ctx.chat.id, "Welcome! I'm a restaurant bot", goBusket)
    ctx.telegram.sendMessage(ctx.chat.id, "What you want to eat?", Start)
    busket = []
    Busket()
})

const Busket = () => {
    let done: string[] = []
    bot.hears('Busket', async (ctx) => {
        if (busket.length === 0) {
            ctx.telegram.sendMessage(ctx.chat.id, 'Oops! Your busket is empty. Try to add something', Markup.keyboard(['Menu']).resize())
        } else {
            await ctx.telegram.sendMessage(ctx.chat.id, "This is your busket:", Markup.keyboard(['Menu', 'Change quantity']).oneTime())
            for (let i = 0; i < countBusket.length; i++) {
                if (!countBusket.includes(busket[i])) {
                    countBusket.push(busket[i])
                }
                let count = countOccurrences(busket, countBusket[i])
                await ctx.telegram.sendMessage(ctx.chat.id, `${i+1}. ${countBusket[i]}, ${count}`)
            }
            bot.hears('Change quantity', async (ctx) => {
                let message = await ctx.telegram.sendMessage(ctx.chat.id, 'This is your busket. Press the buttons to change it', goMenu)
                for (let i = 0; i < countBusket.length; i++) {
                    let count = countOccurrences(busket, countBusket[i])
                    countArr.push(count)
                    await ctx.telegram.sendMessage(ctx.chat.id, `${countBusket[i]}: ${count}`, 
                    Markup.inlineKeyboard([
                        Markup.button.callback('-', `-_${i}`), Markup.button.callback('+', `plus_${i}`), Markup.button.callback('Done', `done_${i}`),
                    ]))
                    
                }
                bot.action(/-_(.+)/, async (ctx) => {
                    ctx.answerCbQuery()
                    let index = Number(ctx.match[1])
                    countArr[index]--
                    if (countArr[index] === 0) {
                        await ctx.telegram.editMessageText(String(ctx.chat.id), message.message_id+index+1, '0', `${countBusket[index]}: ${countArr[index]}`, 
                        Markup.inlineKeyboard([
                            Markup.button.callback('+', `plus_${index}`), Markup.button.callback('Done', `done_${index}`)
                        ]))
                    } else {
                        await ctx.telegram.editMessageText(String(ctx.chat.id), message.message_id+index+1, '0', `${countBusket[index]}: ${countArr[index]}`,
                        Markup.inlineKeyboard([
                                     Markup.button.callback('-', `-_${index}`), Markup.button.callback('+', `plus_${index}`), Markup.button.callback('Done', `done_${index}`),
                                ]))
                        // console.log(countBusket[index]), console.log(countArr[index])
                    }
                    
                    // console.log(countBusket[index]); console.log(countArr[index])
                })
                bot.action(/plus_(.+)/, async (ctx) => {
                    let index = Number(ctx.match[1])
                    countArr[ctx.match[1]]++
                    ctx.answerCbQuery()
                    // console.log(countBusket[index]), console.log(countArr[index])
                    await ctx.telegram.editMessageText(String(ctx.chat.id), message.message_id+index+1, '0', `${countBusket[index]}: ${countArr[index]}`,
                        Markup.inlineKeyboard([
                                     Markup.button.callback('-', `-_${index}`), Markup.button.callback('+', `plus_${index}`), Markup.button.callback('Done', `done_${index}`),
                                ]))
                })
                bot.action(/done_(.+)/, async (ctx) => {
                    let index = Number(ctx.match[1])
                    // console.log(countBusket[ctx.match[1]])
                    ctx.answerCbQuery()
                    done.push(countBusket[index])
                    if (done.length === countBusket.length) {
                        ctx.telegram.sendMessage(ctx.chat.id, "That's it. Now, payment")
                    }
                    return ctx.editMessageReplyMarkup({ inline_keyboard: [] })
                })
            })
        }
    })
    
    bot.hears('Menu', (ctx) => {
        ctx.telegram.sendMessage(ctx.chat.id, "What you want to eat?", Start)
    })
}

Busket()

bot.action('bar', async (ctx) => {
    let message = await ctx.telegram.sendMessage(ctx.chat.id, 'Here you can choose some drinks. You can choose their quantity later', Bar)
    ctx.telegram.deleteMessage(ctx.chat.id, message.message_id-1)
    Product('alc', 'Our strong alcoholic drinks menu', /sta_(.+)/, ctx, Strong_Acoholo)
    Product('la', 'Our light alcoholic drinks menu', /la_(.+)/, ctx, Light_Acoholo)
    Product('mi', 'Our non-alcoholic drinks menu', /mi_(.+)/, ctx, Milkshakes)
    Product('ac', 'Our alcoholic cocktail menu', /ac_(.+)/, ctx, Alc_Cocktails)
    Product('nac', 'Our non-alcoholic cocktail menu', /nac_(.+)/, ctx, Not_Alc_Cocktails)
    ctx.answerCbQuery();
})


bot.action('menu', async (ctx) => {
    await ctx.telegram.sendMessage(ctx.chat.id, 'Here you can add food from our main menu', Menu)
    

    Product('mc', 'Our main course menu', /m_(.+)/, ctx, Main_Course)
    Product('sd', 'Our side dishes menu', /s_(.+)/, ctx, Side_dishes)
    Product('sa', 'Our salads menu', /sa_(.+)/, ctx, Salads)
    Product('d', 'Our desserts menu', /d_(.+)/, ctx, Desserts)
    ctx.answerCbQuery();
})


bot.launch()
// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'))
process.once('SIGTERM', () => bot.stop('SIGTERM'))