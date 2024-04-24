import { Telegraf } from 'telegraf'
import { georgiy } from './src/georgy';
import { Bar, Start, Menu, Main_Course, Salads, Side_dishes, Desserts, database, goBusket, Light_Acoholo, Alc_Cocktails, Strong_Acoholo } from './src/keyboard';

let busket = []
const bot = new Telegraf(georgiy)
bot.start((ctx) => ctx.telegram.sendMessage(ctx.chat.id, "Welcome! I'm a restaurant bot. What you want to eat?", Start))

bot.hears('See busket', async (ctx) => {
    ctx.telegram.sendMessage(ctx.chat.id, "This is your busket:" )
    
})

bot.action('bar', async (ctx) => {
    ctx.telegram.sendMessage(ctx.chat.id, 'Here you can choose some drinks', Bar)
    bot.action('alc', async (ctx) => {
        ctx.telegram.sendMessage(ctx.chat.id, 'Our alcoholic drinks menu', Bar)
    })
    bot.action('n-alc', async (ctx) => {
        ctx.telegram.sendMessage(ctx.chat.id, 'Our non-alcoholic drinks menu', Bar)
    })
})

bot.action('menu', async (ctx) => {
    let message = await ctx.telegram.sendMessage(ctx.chat.id, 'Here you can add food from our main menu', Menu)
    ctx.telegram.deleteMessage(ctx.chat.id, message.message_id-1)


    bot.action('mc', async (ctx) => {
        ctx.telegram.sendMessage(ctx.chat.id, 'Our main course menu. Tap on something to add it to the busket. You can change a quantity of the choosed dishes later', Main_Course)
        bot.action(/m_(.+)/, (ctx) => {    
            const index = Number(ctx.match[1])
            const name = database[index-1]                                                                                                                                                                                                                          
            busket.push(name)
            ctx.reply(`${name} was added to the busket`);
            ctx.answerCbQuery();
        });
        ctx.answerCbQuery();
    })
    bot.action('salad', async (ctx) => {
        ctx.telegram.sendMessage(ctx.chat.id, 'There is our salads. Tap on something to add it to the busket. You can change a quantity of the choosed dishes later', Salads)
        bot.action(/sa_(.+)/, async (ctx) => {    
            const index = Number(ctx.match[1])
            const name = database[index-1]
            busket.push(name)
            ctx.reply(`${name} was added to the busket`);
            ctx.answerCbQuery();
        });
        ctx.answerCbQuery();
    })
    bot.action('sd', async (ctx) => {
        ctx.telegram.sendMessage(ctx.chat.id, 'There is our side dishes menu. Tap on something to add it to the busket. You can change a quantity of the choosed dishes later', Side_dishes)
        bot.action(/sd_(.+)/, async (ctx) => {    
            const index = Number(ctx.match[1])
            const name = database[index-1]
            busket.push(name)
            ctx.reply(`${name} was added to the busket`);
        });
        ctx.answerCbQuery();
    })
    bot.action('dessert', async (ctx) => {
        ctx.telegram.sendMessage(ctx.chat.id, 'There is our desserts menu. Tap on something to add it to the busket. You can change a quantity of the choosed dishes later', Desserts)
        bot.action(/d_(.+)/, async (ctx) => {    
            const index = Number(ctx.match[1])
            const name = database[index-1]
            busket.push(name)
            ctx.reply(`${name} was added to the busket`);
            ctx.answerCbQuery();
        });
        ctx.answerCbQuery();
    })
})


bot.launch()
// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'))
process.once('SIGTERM', () => bot.stop('SIGTERM'))