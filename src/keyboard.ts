import { Markup } from "telegraf";

export const Start = Markup.inlineKeyboard([
    [Markup.button.callback('Main menu', 'menu'), 
    Markup.button.callback('Bar', 'bar')]
]);

export const Menu = Markup.inlineKeyboard([
    [Markup.button.callback('Main course', 'mc'), Markup.button.callback('Side dishes', 'sd')],
    [Markup.button.callback('Salads', 'salad'), Markup.button.callback('Desserts', 'dessert')]
]);

export const Bar = Markup.inlineKeyboard([
    [Markup.button.callback('Alcoholic drinks', 'alc')],
    [Markup.button.callback('Non-alcoholic drinks', 'n-alc')]
])

export const Main_Course = Markup.inlineKeyboard([
    [Markup.button.callback('Chicken fried steak with processed cheese', '1')],
    [Markup.button.callback('Chicken Fried Steak', '2')],
    [Markup.button.callback('Grilled Beef with Mushroom Sause', '3')],
    [Markup.button.callback('Pork Chops with Apple Sauce', '4')],
    [Markup.button.callback('Beef Tenderloin with Roasted Peppers and Onions', '5')],
    [Markup.button.callback('Filet Mignon with Bacon and Cheese', '6')],
    [Markup.button.callback('Baked Salmon with Lemon-Herb Butter', '7')],
    [Markup.button.callback('Grilled Salmon with Lemon-Herb Butter', '8')],
    [Markup.button.callback('Grilled Lemon Garlic Shrimp', '9')],
    [Markup.button.callback('Roasted Chicken with Lemon-Herb Butter', '10')],
    [Markup.button.callback('Roasted Filet Mignon with Lemon-Herb Butter', '11')],
    [Markup.button.callback('Roasted Salmon with Lemon-Herb Butter', '12')]
])

export const Salads = Markup.inlineKeyboard([
    [Markup.button.callback('Garlic Mashed Potatoes', '13')],
    [Markup.button.callback('Grilled Asparagus with Lemon Butter', '14')],
    [Markup.button.callback('Sweet Corn with Herb Butter', '15')],
    [Markup.button.callback('Baked Macaroni and Cheese', '16')],
    [Markup.button.callback('Roasted Brussels Sprouts with Bacon', '17')],
    [Markup.button.callback('Honey Glazed Carrots', '18')],
    [Markup.button.callback('Parmesan Truffle Fries', '19')],
    [Markup.button.callback('Creamed Spinach', '20')],
    [Markup.button.callback('Sautéed Green Beans with Almonds', '21')],
    [Markup.button.callback('tuffed Bell Peppers', '22')],
])

export const Side_dishes = Markup.inlineKeyboard([
    
])

export const Desserts = Markup.inlineKeyboard([
    
])