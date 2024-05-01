import { Telegraf, Markup, Context } from 'telegraf'
import { georgiy } from './src/georgy';
import { Bar, Start, Menu, Main_Course, Salads, Side_dishes, Desserts, database, goBusket, Light_Acoholo, Alc_Cocktails, Strong_Acoholo, Not_Alc_Cocktails, Non_Alco, goMenu, BuskMenu }
from './src/keyboard';
import { Descriptions } from './src/descriptions';
import { Photos } from './src/photos';

let busket: string[] = []
const bot = new Telegraf(georgiy)

function countUniqueValues(arr: any[]): number {
    const uniqueValues = new Set(arr);
    return uniqueValues.size;
}

function countOccurrences(arr: string[], value: string): number { // counter how many times are "value" is in the array
    return arr.reduce((count, curr) => curr === value ? count + 1 : count, 0);
}

function addToBusket(ctx: Context) {
    const uniq = countUniqueValues(busket) // unique values in a busket
    let countBusket: number[] = []
    // countBusket.length = uniq // empty array with length of unique values
    let arr: string[] = []
    for (let i = 0; i < busket.length; i++) {
        let product = busket[i]
        let count = countOccurrences(busket, product)
        if (!arr.includes(product)) {
            arr.push(product)
            countBusket.push(count)
        }
        
    }
    for (let i = 0; i < arr.length; i++) {
        ctx.telegram.sendMessage(ctx.chat.id, `${arr[i]}: ${countBusket[i]}`)
    }

console.log(busket)
}
// bot.command('test', (ctx) => {ctx.reply('Hey', Markup.forceReply())})
bot.start( async (ctx) => {
    await ctx.telegram.sendMessage(ctx.chat.id, "Welcome! I'm a restaurant bot", goBusket)
    ctx.telegram.sendMessage(ctx.chat.id, "What you want to eat?", Start)
    busket = []
})

const Busket = () => {
    bot.hears('Busket', async (ctx) => {
    
    
    if (busket.length === 0) {
        ctx.telegram.sendMessage(ctx.chat.id, 'Oops! Your busket is empty. Try to add something')
    } else {
        await ctx.telegram.sendMessage(ctx.chat.id, "This is your busket:", goMenu)
        addToBusket(ctx)
    }
    bot.hears('Меню', async (ctx) => {
        ctx.telegram.sendMessage(ctx.chat.id, "What you want to eat?", Start)
    })
})}

bot.action('bar', async (ctx) => {
    let message = await ctx.telegram.sendMessage(ctx.chat.id, 'Here you can choose some drinks. You can choose their quantity later', Bar)
    ctx.telegram.deleteMessage(ctx.chat.id, message.message_id-1)
    bot.action('alc', async (ctx) => {
        let message = await ctx.telegram.sendMessage(ctx.chat.id, 'Our strong alcoholic drinks menu', Strong_Acoholo)
        ctx.telegram.deleteMessage(ctx.chat.id, message.message_id-1)
        bot.action(/sta_(.+)/, (ctx) => {
            const index = Number(ctx.match[1])
            const name = database[index-1]
            busket.push(name)
            ctx.reply(`${name} was added to the busket`, BuskMenu);
            ctx.answerCbQuery();
            Busket()
        })
        ctx.answerCbQuery();
    })
    bot.action('l_alc', async (ctx) => {
        let message = await ctx.telegram.sendMessage(ctx.chat.id, 'Our light alcoholic drinks menu', Light_Acoholo)
        ctx.telegram.deleteMessage(ctx.chat.id, message.message_id-1)
        bot.action(/la_(.+)/, async (ctx) => {
            const index = Number(ctx.match[1])
            const description = Descriptions[index-1]
            await ctx.replyWithPhoto('https://www.wfla.com/wp-content/uploads/sites/71/2023/05/GettyImages-1389862392.jpg?w=2560&h=1440&crop=1', {caption: description})
            const name = database[index-1]
            busket.push(name)
            ctx.reply(`${name} was added to the busket`, BuskMenu);
            ctx.answerCbQuery();
            Busket()
        })
        ctx.answerCbQuery();
    })
    bot.action('n-alc', async (ctx) => {
        let message = await ctx.telegram.sendMessage(ctx.chat.id, 'Our drinks & milkshakes menu', Non_Alco)
        ctx.telegram.deleteMessage(ctx.chat.id, message.message_id-1)
        bot.action(/na_(.+)/, (ctx) => {
            const index = Number(ctx.match[1])
            const name = database[index-1]
            busket.push(name)
            ctx.reply(`${name} was added to the busket`, BuskMenu);
            ctx.answerCbQuery();
            Busket()
        })
        ctx.answerCbQuery();
    })
    bot.action('alc_c', async (ctx) => {
        let message = await ctx.telegram.sendMessage(ctx.chat.id, 'Our alcoholic cocktails menu', Alc_Cocktails)
        ctx.telegram.deleteMessage(ctx.chat.id, message.message_id-1)
        bot.action(/ac_(.+)/, (ctx) => {
            const index = Number(ctx.match[1])
            const name = database[index-1]
            busket.push(name)
            ctx.reply(`${name} was added to the busket`, BuskMenu);
            ctx.answerCbQuery();
            Busket()
        })
        ctx.answerCbQuery();
    })
    bot.action('n-alc_c', async (ctx) => {
        let message = await ctx.telegram.sendMessage(ctx.chat.id, 'Our non-alcoholic cocktails menu', Not_Alc_Cocktails)
        ctx.telegram.deleteMessage(ctx.chat.id, message.message_id-1)
        bot.action(/nac_(.+)/, (ctx) => {
            const index = Number(ctx.match[1])
            const name = database[index-1]
            busket.push(name)
            ctx.reply(`${name} was added to the busket`, BuskMenu);
            ctx.answerCbQuery();
            Busket()
        })
        ctx.answerCbQuery();
    })
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