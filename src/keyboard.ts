import { Markup, Telegraf } from "telegraf";

export const database = ['Chicken fried steak with processed cheese', 
'Chicken Fried Steak', 'Grilled Beef with Mushroom Sause', 
'Pork Chops with Apple Sauce', 'Beef Tenderloin with Roasted Peppers and Onions', 
'Filet Mignon with Bacon and Cheese', 'Baked Salmon with Lemon-Herb Butter', 
'Grilled Salmon with Lemon-Herb Butter', 'Grilled Lemon Garlic Shrimp', 
'Roasted Chicken with Lemon-Herb Butter', 'Roasted Filet Mignon with Lemon-Herb Butter', 
'Roasted Salmon with Lemon-Herb Butter', 


// side dishes
'Garlic Mashed Potatoes', 'Grilled Asparagus with Lemon Butter',
'Sweet Corn with Herb Butter', 'Baked Macaroni and Cheese',
'Roasted Brussels Sprouts with Bacon', 'Honey Glazed Carrots', 'Parmesan Truffle Fries', 'Creamed Spinach',
'Sautéed Green Beans with Almonds', 'Stuffed Bell Peppers',


//salads
'Classic Caesar Salad',
'Greek Salad with Feta Cheese', 'Spinach and Strawberry Salad',
'Cobb Salad with Avocado', 'Quinoa Salad with Roasted Vegetables',
'Caprese Salad with Balsamic Glaze', 'Asian Chicken Salad with Sesame Dressing',
'Beetroot and Goat Cheese Salad', 'Southwest Salad with Cilantro Lime Dressing',
'Kale Salad with Lemon Vinaigrette', 


// desserts
'Classic New York Cheesecake', 'Chocolate Lava Cake with Vanilla Ice Cream',
'Apple Pie with Cinnamon', 'Tiramisu with Mascarpone Cream', 'Lemon Tart with Raspberry Sauce',
'Crème Brûlée with Fresh Berries', 'Red Velvet Cake with Cream Cheese Frosting', 'Brownie Sundae with Hot Fudge',
'Panna Cotta with Mixed Berry Compote', 'Bread Pudding with Bourbon Sauce']

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
    [Markup.button.callback('Chicken fried steak with processed cheese', 'm_1')], [Markup.button.callback('Chicken Fried Steak', 'm_2')],
    
    [Markup.button.callback('Grilled Beef with Mushroom Sause', 'm_3')], [Markup.button.callback('Pork Chops with Apple Sauce', 'm_4')],
    
    [Markup.button.callback('Beef Tenderloin with Roasted Peppers and Onions', 'm_5')], [Markup.button.callback('Filet Mignon with Bacon and Cheese', 'm_6')],
    
    [Markup.button.callback('Baked Salmon with Lemon-Herb Butter', 'm_7')], [Markup.button.callback('Grilled Salmon with Lemon-Herb Butter', 'm_8')],
    
    [Markup.button.callback('Grilled Lemon Garlic Shrimp', 'm_9')], [Markup.button.callback('Roasted Chicken with Lemon-Herb Butter', 'm_10')],
    
    [Markup.button.callback('Roasted Filet Mignon with Lemon-Herb Butter', 'm_11')], [Markup.button.callback('Roasted Salmon with Lemon-Herb Butter', 'm_12')]
    
])

export const Side_dishes = Markup.inlineKeyboard([
    [Markup.button.callback('Garlic Mashed Potatoes', 's_13')],
    [Markup.button.callback('Grilled Asparagus with Lemon Butter', 's_14')],
    [Markup.button.callback('Sweet Corn with Herb Butter', 's_15')],
    [Markup.button.callback('Baked Macaroni and Cheese', 's_16')],
    [Markup.button.callback('Roasted Brussels Sprouts with Bacon', 's_17')],
    [Markup.button.callback('Honey Glazed Carrots', 's_18')],
    [Markup.button.callback('Parmesan Truffle Fries', 's_19')],
    [Markup.button.callback('Creamed Spinach', 's_20')],
    [Markup.button.callback('Sautéed Green Beans with Almonds', 's_21')],
    [Markup.button.callback('Stuffed Bell Peppers', 's_22')]
])

export const Salads = Markup.inlineKeyboard([
    [Markup.button.callback('Classic Caesar Salad', 'sa_23')],
    [Markup.button.callback('Greek Salad with Feta Cheese', 'sa_24')],
    [Markup.button.callback('Spinach and Strawberry Salad', 'sa_25')],
    [Markup.button.callback('Cobb Salad with Avocado', 'sa_26')],
    [Markup.button.callback('Quinoa Salad with Roasted Vegetables', 'sa_27')],
    [Markup.button.callback('Caprese Salad with Balsamic Glaze', 'sa_28')],
    [Markup.button.callback('Asian Chicken Salad with Sesame Dressing', 'sa_29')],
    [Markup.button.callback('Beetroot and Goat Cheese Salad', 'sa_30')],
    [Markup.button.callback('Southwest Salad with Cilantro Lime Dressing', 'sa_31')],
    [Markup.button.callback('Kale Salad with Lemon Vinaigrette', 'sa_32')]
])

export const Desserts = Markup.inlineKeyboard([
    [Markup.button.callback('Classic New York Cheesecake', 'd_33')],
    [Markup.button.callback('Chocolate Lava Cake with Vanilla Ice Cream', 'd_34')],
    [Markup.button.callback('Apple Pie with Cinnamon', 'd_35')],
    [Markup.button.callback('Tiramisu with Mascarpone Cream', 'd_36')],
    [Markup.button.callback('Lemon Tart with Raspberry Sauce', 'd_37')],
    [Markup.button.callback('Crème Brûlée with Fresh Berries', 'd_38')],
    [Markup.button.callback('Red Velvet Cake with Cream Cheese Frosting', 'd_39')],
    [Markup.button.callback('Brownie Sundae with Hot Fudge', 'd_40')],
    [Markup.button.callback('Panna Cotta with Mixed Berry Compote', 'd_41')],
    [Markup.button.callback('Bread Pudding with Bourbon Sauce', 'd_42')]
])


// REPLY KEYBOARDS

export const goBusket = Markup.keyboard([
    'Busket'
]).resize()