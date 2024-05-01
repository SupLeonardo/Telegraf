import { Telegraf, Markup, Context } from 'telegraf'
import { georgiy } from './src/georgy';
import { Bar, Milkshakes, Confirmation, Start, Menu, Main_Course, Salads, Side_dishes, Desserts, database, goBusket, Light_Acoholo, Alc_Cocktails, Strong_Acoholo, Not_Alc_Cocktails, goMenu, BuskMenu }
from './src/keyboard';
import { Descriptions } from './src/descriptions';
import { Photos } from './src/photos';
import { Triggers } from 'telegraf/typings/composer';
import { InlineKeyboardMarkup, ReplyKeyboardMarkup } from 'telegraf/typings/core/types/typegram';
import { keyboard } from 'telegraf/typings/markup';

let busket: string[] = []
const bot = new Telegraf(georgiy)

function countUniqueValues(arr: any[]): number {
    let uniqueValues = new Set(arr);
    return uniqueValues.size;
}

function countOccurrences(arr: string[], value: string): number { // counter how many times are "value" is in the array
    return arr.reduce((count, curr) => curr === value ? count + 1 : count, 0);
}

function addToBusket(ctx: Context, name: string) {
    const uniq = countUniqueValues(busket) // unique values in a busket
    let countBusket: number[] = []
    // countBusket.length = uniq // empty array with length of unique values
    let arr: string[] = []
    console.log(name)
    if (!(busket.includes(name))) {
        busket.push(name)
    }
    console.log(busket)
    Busket()
}
let nameing: string
function Yes(name: string) {
    nameing = name
}

function Action(ctx: Context, index: number, menu_text: string, keyboard: Markup.Markup<InlineKeyboardMarkup>) {
    ctx.telegram.sendMessage(ctx.chat.id, 'Do you want to add this product to your busket? You will be able to change a quantity later', Confirmation)
    let name = database[index]
    Yes(name)
    bot.action('yes', (ctx) => {
        busket.push(nameing)
        ctx.reply(`${nameing} was added to the busket`, BuskMenu);
        ctx.answerCbQuery()
        addToBusket(ctx, nameing)
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
        case 'salad': menu_text = 'Our salads menu'; break
        case 'dessert': menu_text = 'Our desserts menu'; break
        case 'alc': menu_text = 'Our strong alcoholic drinks menu'; break
        case 'la': menu_text = 'Our light alcoholic drinks menu'; break
        case 'mi': menu_text = 'Our non-alcoholic drinks menu'; break
        case 'ac': menu_text = 'Our alcoholic cocktail menu'; break
        case 'nac': menu_text = 'Our non-alcoholic cocktail menu'; break
        case 'mi': menu_text = 'Our milkshakes menu'; break
    }
    bot.action(callback, (ctx) => {
        ctx.telegram.sendMessage(ctx.chat.id, menu_text, keyboard)
        
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
    await ctx.telegram.sendMessage(ctx.chat.id, "Welcome! I'm a restaurant bot", BuskMenu)
    ctx.telegram.sendMessage(ctx.chat.id, "What you want to eat?", Start)
    busket = []
    Busket()
})

const Busket = () => {
    bot.hears('Busket', async (ctx) => {
        if (busket.length === 0) {
            ctx.telegram.sendMessage(ctx.chat.id, 'Oops! Your busket is empty. Try to add something')
        } else {
            await ctx.telegram.sendMessage(ctx.chat.id, "This is your busket:", goMenu)
            for (let i = 0; i < busket.length; i++) {
                let count = countOccurrences(busket, busket[i])
                await ctx.telegram.sendMessage(ctx.chat.id, `${i+1}. ${busket[i]}, ${count}`)
            }
        }
    })
    
    bot.hears('Menu', (ctx) => {
        console.log('hello')
        ctx.telegram.sendMessage(ctx.chat.id, "What you want to eat?", Start)
    })
}

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
    let message = await ctx.telegram.sendMessage(ctx.chat.id, 'Here you can add food from our main menu', Menu)
    ctx.telegram.deleteMessage(ctx.chat.id, message.message_id-1)


    bot.action('mc', async (ctx) => {
        let message = await ctx.telegram.sendMessage(ctx.chat.id, 'Our main course menu. Tap on something to add it to the busket. You can change a quantity of the choosed dishes later', Main_Course)
        ctx.telegram.deleteMessage(ctx.chat.id, message.message_id-1)
        bot.action(/m_(.+)/, async (ctx) => {
            const index = Number(ctx.match[1])
            const photo = Photos[index-1]
            const description = Descriptions[index-1]
            await ctx.replyWithPhoto(photo, {caption: description})    
            const name = database[index-1]                                                                                                                                                                                                                          
            busket.push(name)
            ctx.reply(`${name} was added to the busket`, BuskMenu);
            ctx.answerCbQuery();
            Busket()
        });
        ctx.answerCbQuery();
    })
    bot.action('salad', async (ctx) => {
        let message = await ctx.telegram.sendMessage(ctx.chat.id, 'There is our salads. Tap on something to add it to the busket. You can change a quantity of the choosed dishes later', Salads)
        ctx.telegram.deleteMessage(ctx.chat.id, message.message_id-1)
        bot.action(/sa_(.+)/, async (ctx) => {    
            const index = Number(ctx.match[1])
            const name = database[index-1]
            busket.push(name)
            ctx.reply(`${name} was added to the busket`, BuskMenu);
            ctx.answerCbQuery();
            Busket()
        });
        ctx.answerCbQuery();
    })
    bot.action('sd', async (ctx) => {
        let message = await ctx.telegram.sendMessage(ctx.chat.id, 'There is our side dishes menu. Tap on something to add it to the busket. You can change a quantity of the choosed dishes later', Side_dishes)
        ctx.telegram.deleteMessage(ctx.chat.id, message.message_id-1)
        bot.action(/s_(.+)/, async (ctx) => {    
            const index = Number(ctx.match[1])
            const name = database[index-1]
            busket.push(name)
            ctx.reply(`${name} was added to the busket`, BuskMenu);
            ctx.answerCbQuery();
            Busket()
        });
        ctx.answerCbQuery();
    })
    bot.action('dessert', async (ctx) => {
        let message = await ctx.telegram.sendMessage(ctx.chat.id, 'There is our desserts menu. Tap on something to add it to the busket. You can change a quantity of the choosed dishes later', Desserts)
        ctx.telegram.deleteMessage(ctx.chat.id, message.message_id-1)
        bot.action(/d_(.+)/, async (ctx) => {    
            const index = Number(ctx.match[1])
            const name = database[index-1]
            busket.push(name)
            ctx.reply(`${name} was added to the busket`, BuskMenu);
            ctx.answerCbQuery();
            Busket()
        });
        ctx.answerCbQuery();
    })
})


bot.launch()
// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'))
process.once('SIGTERM', () => bot.stop('SIGTERM'))