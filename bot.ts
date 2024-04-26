import { Telegraf, Markup, Context } from 'telegraf'
import { georgiy } from './src/georgy';
import { Bar, Start, Menu, Main_Course, Salads, Side_dishes, Desserts, database, goBusket, Light_Acoholo, Alc_Cocktails, Strong_Acoholo, Not_Alc_Cocktails, Non_Alco } from './src/keyboard';

let busket = []
const bot = new Telegraf(georgiy)

function addToBusket(ctx: Context) {
    for (let i = 0; i < busket.length; i++) {
        const element = busket[i];
        let filter = busket.filter(num => num === element).length
        ctx.telegram.sendMessage(ctx.chat.id, `${element} X ${filter}`)
        let filteredArray = busket.filter((value, index, self) => {
            return value !== element || self.indexOf(value) === index;
        });
        console.log(filteredArray)
    }
}
function Remover(array: string[], numToRemove: string) {
    array = array.filter(num => num !== numToRemove);
}
// bot.command('test', (ctx) => {ctx.reply('Hey', Markup.forceReply())})
bot.start( async (ctx) => {
    await ctx.telegram.sendMessage(ctx.chat.id, "Welcome! I'm a restaurant bot", goBusket)
    ctx.telegram.sendMessage(ctx.chat.id, "What you want to eat?", Start)
    busket = []
})

const Busket = () => {bot.hears('Busket', async (ctx) => {
    await ctx.telegram.sendMessage(ctx.chat.id, "This is your busket:")
    addToBusket(ctx)
    
})}

bot.action('bar', async (ctx) => {
    let message = await ctx.telegram.sendMessage(ctx.chat.id, 'Here you can choose some drinks. You can choose their quantity later', Bar)
    ctx.telegram.deleteMessage(ctx.chat.id, message.message_id-1)
    bot.action('alc', async (ctx) => {
        let message = await ctx.telegram.sendMessage(ctx.chat.id, 'Our strong alcoholic drinks menu', Strong_Acoholo)
        
        bot.action(/sta_(.+)/, (ctx) => {
            const index = Number(ctx.match[1])
            const name = database[index-1]
            busket.push(name)
            ctx.reply(`${name} was added to the busket`);
            ctx.answerCbQuery();
            Busket()
        })
        ctx.answerCbQuery();
    })
    bot.action('l_alc', async (ctx) => {
        let message = await ctx.telegram.sendMessage(ctx.chat.id, 'Our light alcoholic drinks menu', Light_Acoholo)
        ctx.telegram.deleteMessage(ctx.chat.id, message.message_id-1)
        bot.action(/la_(.+)/, (ctx) => {
            const index = Number(ctx.match[1])
            const name = database[index-1]
            busket.push(name)
            ctx.reply(`${name} was added to the busket`);
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
            ctx.reply(`${name} was added to the busket`);
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
            ctx.reply(`${name} was added to the busket`);
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
            ctx.reply(`${name} was added to the busket`);
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
        bot.action(/m_(.+)/, (ctx) => {    
            const index = Number(ctx.match[1])
            const name = database[index-1]                                                                                                                                                                                                                          
            busket.push(name)
            ctx.reply(`${name} was added to the busket`);
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
            ctx.reply(`${name} was added to the busket`);
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
            ctx.reply(`${name} was added to the busket`);
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
            ctx.reply(`${name} was added to the busket`);
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