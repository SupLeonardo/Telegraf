import { Markup, Telegraf } from 'telegraf'
import { message } from 'telegraf/filters'

const bot = new Telegraf('6999026340:AAGMF_jcrLH3qULSPj41I7H16KVz1BM8pDA')
bot.start((ctx) => ctx.reply("Welcome! I'm a restaurant bot. What you want to eat?"))

const inlineKeyboard = Markup.inlineKeyboard([
    [Markup.button.callback('Button 1', 'callback1')],
    [Markup.button.callback('Button 2', 'callback2')]
]);

bot.action('callback1', (ctx) => {
    ctx.reply('Good day')
})

bot.action('callback2', async (ctx) => {
    let result = await ctx.reply("Bad day");
	bot.telegram.deleteMessage(ctx.chat.id, result.message_id-1)
})

bot.on('message', (ctx) => {
    ctx.telegram.sendMessage(ctx.chat.id, 'Choose', inlineKeyboard)
})


bot.launch()
// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'))
process.once('SIGTERM', () => bot.stop('SIGTERM'))