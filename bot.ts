import { Markup, Telegraf } from 'telegraf'
import { georgiy } from './georgy';
import { Start, Course } from './keyboard';

const bot = new Telegraf(georgiy)
bot.start((ctx) => ctx.reply("Welcome! I'm a restaurant bot. What you want to eat?"))



bot.action('bar', async (ctx) => {
    ctx.telegram.sendMessage(ctx.chat.id, 'Side dish', Start)
})

bot.action('menu', async (ctx) => {
    ctx.telegram.sendMessage(ctx.chat.id, 'Side dish', Start)
})

bot.on('message', (ctx) => {
    ctx.telegram.sendMessage(ctx.chat.id, 'Choose', Start)
})

bot.launch()
// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'))
process.once('SIGTERM', () => bot.stop('SIGTERM'))