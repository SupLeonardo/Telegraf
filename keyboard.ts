import { Markup } from "telegraf";

export const Start = Markup.inlineKeyboard([
    [Markup.button.callback('Main menu', 'menu')],
    [Markup.button.callback('Bar', 'bar')]
]);

export const Course = Markup.inlineKeyboard([
    [Markup.button.callback('Main menu', 'menu')],
    [Markup.button.callback('Bar', 'bar')]
]);