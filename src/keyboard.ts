import { Markup } from "telegraf"

export const RemoveBusket = Markup.inlineKeyboard([
    
])


export const Confirmation = Markup.inlineKeyboard([
    [Markup.button.callback('Yes', 'yes'), Markup.button.callback('No', 'no')]
])

export const Start = Markup.inlineKeyboard([
    [Markup.button.callback('Main menu', 'menu'), 
    Markup.button.callback('Bar', 'bar')]
]);

export const Menu = Markup.inlineKeyboard([
    [Markup.button.callback('Main course', 'mc'), Markup.button.callback('Side dishes', 'sd')],
    [Markup.button.callback('Salads', 'sa'), Markup.button.callback('Desserts', 'd')]
]);

export const Bar = Markup.inlineKeyboard([
    [Markup.button.callback('Strong alcohol', 'alc')],
    [Markup.button.callback('Light alcohol', 'la')],
    [Markup.button.callback('Drinks & Milkshakes', 'ml')],
    [Markup.button.callback('Alcoholic cocktails', 'ac')],
    [Markup.button.callback('Non-alcoholic cocktails', 'nac')]
])

export const Main_Course = Markup.inlineKeyboard([
    [Markup.button.callback('Chicken fried steak with processed cheese', '1')], [Markup.button.callback('Chicken Fried Steak', '2')],
    
    [Markup.button.callback('Grilled Beef with Mushroom Sause', '3')], [Markup.button.callback('Pork Chops with Apple Sauce', '4')],
    
    [Markup.button.callback('Beef Tenderloin with Roasted Peppers and Onions', '5')], [Markup.button.callback('Filet Mignon with Bacon and Cheese', '6')],
    
    [Markup.button.callback('Baked Salmon with Lemon-Herb Butter', '7')], [Markup.button.callback('Grilled Salmon with Lemon-Herb Butter', '8')],
    
    [Markup.button.callback('Grilled Lemon Garlic Shrimp', '9')], [Markup.button.callback('Roasted Chicken with Lemon-Herb Butter', '10')],
    
    [Markup.button.callback('Roasted Filet Mignon with Lemon-Herb Butter', '11')], [Markup.button.callback('Roasted Salmon with Lemon-Herb Butter', '12')]
    
])

export const Side_dishes = Markup.inlineKeyboard([
    [Markup.button.callback('Garlic Mashed Potatoes', '13')],
    [Markup.button.callback('Grilled Asparagus with Lemon Butter', '14')],
    [Markup.button.callback('Sweet Corn with Herb Butter', '15')],
    [Markup.button.callback('Baked Macaroni and Cheese', '16')],
    [Markup.button.callback('Roasted Brussels Sprouts with Bacon', '17')],
    [Markup.button.callback('Honey Glazed Carrots', '18')],
    [Markup.button.callback('Parmesan Truffle Fries', '19')],
    [Markup.button.callback('Creamed Spinach', '20')],
    [Markup.button.callback('Sautéed Green Beans with Almonds', '21')],
    [Markup.button.callback('Stuffed Bell Peppers', '22')]
])

export const Salads = Markup.inlineKeyboard([
    [Markup.button.callback('Classic Caesar Salad', '23')],
    [Markup.button.callback('Greek Salad with Feta Cheese', '24')],
    [Markup.button.callback('Spinach and Strawberry Salad', '25')],
    [Markup.button.callback('Cobb Salad with Avocado', '26')],
    [Markup.button.callback('Quinoa Salad with Roasted Vegetables', '27')],
    [Markup.button.callback('Caprese Salad with Balsamic Glaze', '28')],
    [Markup.button.callback('Asian Chicken Salad with Sesame Dressing', '29')],
    [Markup.button.callback('Beetroot and Goat Cheese Salad', '30')],
    [Markup.button.callback('Southwest Salad with Cilantro Lime Dressing', '31')],
    [Markup.button.callback('Kale Salad with Lemon Vinaigrette', '32')]
])

export const Desserts = Markup.inlineKeyboard([
    [Markup.button.callback('Classic New York Cheesecake', '33')],
    [Markup.button.callback('Chocolate Lava Cake with Vanilla Ice Cream', '34')],
    [Markup.button.callback('Apple Pie with Cinnamon', '35')],
    [Markup.button.callback('Tiramisu with Mascarpone Cream', '36')],
    [Markup.button.callback('Lemon Tart with Raspberry Sauce', '37')],
    [Markup.button.callback('Crème Brûlée with Fresh Berries', '38')],
    [Markup.button.callback('Red Velvet Cake with Cream Cheese Frosting', '39')],
    [Markup.button.callback('Brownie Sundae with Hot Fudge', '40')],
    [Markup.button.callback('Panna Cotta with Mixed Berry Compote', '41')],
    [Markup.button.callback('Bread Pudding with Bourbon Sauce', '42')]
])

// export const Non_Alco = Markup.inlineKeyboard([
//     [Markup.button.callback('Coca Cola', 'na_92')],
//     [Markup.button.callback('Sprite', 'na_93')],
//     [Markup.button.callback('Fanta', 'na_94')],
//     [Markup.button.callback('Strawberry Milkshake', 'na_95')],
//     [Markup.button.callback('Banana Milkshake', 'na_96')],
//     [Markup.button.callback('Chockolate Milkshake', 'na_97')],
//     [Markup.button.callback('Vanilla Milkshake', 'na_98')]
// ])

export const Strong_Acoholo = Markup.inlineKeyboard([
    [Markup.button.callback('Vodka', '43')],
    [Markup.button.callback('Whiskey', '44')],
    [Markup.button.callback('Rum', '45')],
    [Markup.button.callback('tequila', '46')],
    [Markup.button.callback('Mezcal', '47')],
    [Markup.button.callback('Mezquit', '48')],
    [Markup.button.callback('Shochu', '49')],
    [Markup.button.callback('Gin', '50')],
    [Markup.button.callback('Tequila Sunrise', '51')],
    [Markup.button.callback('Cognac', '52')],
    [Markup.button.callback('Martini', '53')]
])

export const Light_Acoholo = Markup.inlineKeyboard([
    [Markup.button.callback('Red wine (dry)', '54'), Markup.button.callback('Red wine (semi-dry)', '55') ],
    [Markup.button.callback('Rose wine (dry)', '56'), Markup.button.callback('Red wine (semi-dry)', '57') ],
    [Markup.button.callback('White wine (dry)', '58'), Markup.button.callback('White wine (semi-dry)', '59') ],
    [Markup.button.callback('Champagne', '60')],
    [Markup.button.callback('Prosecco', '61')],
    [Markup.button.callback('Cider', '62')],
    [Markup.button.callback('Beer (light)', '63'), Markup.button.callback('Beer (dark)', '64') ],
    [Markup.button.callback('Sake', '65')],
    [Markup.button.callback('Soju', '66')]
])

export const Alc_Cocktails = Markup.inlineKeyboard([
    [Markup.button.callback('Margarita', '67')],
    [Markup.button.callback('Mojito', '68')],
    [Markup.button.callback('Old Fashioned', '69')],
    [Markup.button.callback('Manhattan', '70')],
    [Markup.button.callback('Cosmopolita', '71')],
    [Markup.button.callback('Daiquiri', '72')],
    [Markup.button.callback('Tom Collins', '73')],
    [Markup.button.callback('Moscow Mule', '74')],
    [Markup.button.callback('Whiskey Sour', '75')],
    [Markup.button.callback('Gimlet', '76')]
])

export const Not_Alc_Cocktails = Markup.inlineKeyboard([
    [Markup.button.callback('Saffron Cordial', '77')],
    [Markup.button.callback('Non-Alcoholic Negroni', '78')],
    [Markup.button.callback('Sharab Rose Raspberry Shrub Cocktail', '79')],
    [Markup.button.callback('Frozen Shirley Temple', '80')],
    [Markup.button.callback('Nonalcoholic Champagne Spritz', '81')],
    [Markup.button.callback('Strawberry-Chile Balsamic Shrub', '82')],
    [Markup.button.callback('Pineapple and Tamarind Cooler', '83')],
    [Markup.button.callback('Watermelon Limeade', '84')],
    [Markup.button.callback('Green Refresher', '85')],
    [Markup.button.callback('Coffee Cooler', '86')],
    [Markup.button.callback('Ghia Sour', '87')],
    [Markup.button.callback('Cherry Red', '88')],
    [Markup.button.callback('Jardin Verde', '89')],
    [Markup.button.callback('Shift Drink', '90')],
    [Markup.button.callback('Psychedelic Backyard', '91')]
])

export const Milkshakes = Markup.inlineKeyboard([
    [Markup.button.callback('Coca Cola', '92')],
    [Markup.button.callback('Sprite', '93')],
    [Markup.button.callback('Fanta', '94')],
    [Markup.button.callback('Strawberry Milkshake', '95')],
    [Markup.button.callback('Banana Milkshake', '96')],
    [Markup.button.callback('Chockolate Milkshake', '97')],
    [Markup.button.callback('Vanilla Milkshake', '98')]
])


// REPLY KEYBOARDS

export const goBusket = Markup.keyboard([
    'Busket'
])
.resize()

export const goMenu = Markup.keyboard([
    'Menu'
]).resize()

export const BuskMenu = Markup.keyboard([
    'Menu', 'Busket'
]).resize()