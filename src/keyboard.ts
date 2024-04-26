import { Markup, Telegraf } from "telegraf"

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
'Sautéed Green Beans with Almonds', 'Stuffed Bell Peppers', //22


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
'Panna Cotta with Mixed Berry Compote', 'Bread Pudding with Bourbon Sauce',

// strong alcohol
'Vodka', 'Whiskey', 'Rum',
'Tequila', 'Mezcal',  'Mezquit',
'Shochu',  'Gin',  'Tequila Sunrise',
'Cognac',  'Martini',

// light alochol
'Red wine (dry)', 'Red wine (semi-dry)', 'Rosé wine (dry)', 'Rosé wine (semi-dry)', 'White wine (dry)', 'White wine (semi-dry)',
            'Champagne', 'Prosecco', 'Cider', 'Beer (light)', 'Beer (dark)', 'Sake', 'Soju',

//alcoholic cocktals
'Margarita', 'Mojito', 'Old Fashioned', 'Manhattan',
            'Cosmopolita', 'Daiquiri', 'Tom Collins',  'Moscow Mule',
            'Whiskey Sour', 'Gimlet',

//non alocoholic cocktails
'Saffron Cordial', 'Non-Alcoholic Negroni', 'Sharab Rose Raspberry Shrub Cocktail',
'Frozen Shirley Temple', 'Nonalcoholic Champagne Spritz', 'Strawberry-Chile Balsamic Shrub',
'Pineapple and Tamarind Cooler', 'Watermelon Limeade', 'Green Refresher',
'Coffee Cooler', 'Ghia Sour', 'Cherry Red', 'Jardin Verde', 'Shift Drink', 'Psychedelic Backyard',

// DRINKS & MILSHAKES

'Coca Cola', 'Sprite', 'Fanta', 'Strawberry Milkshake', 'Banana Milkshake', 'Chockolate Milkshake', 'Vanilla Milkshake'

]

export const Start = Markup.inlineKeyboard([
    [Markup.button.callback('Main menu', 'menu'), 
    Markup.button.callback('Bar', 'bar')]
]);

export const Menu = Markup.inlineKeyboard([
    [Markup.button.callback('Main course', 'mc'), Markup.button.callback('Side dishes', 'sd')],
    [Markup.button.callback('Salads', 'salad'), Markup.button.callback('Desserts', 'dessert')]
]);

export const Bar = Markup.inlineKeyboard([
    [Markup.button.callback('Strong alcohol', 'alc')],
    [Markup.button.callback('Light alcohol', 'l_alc')],
    [Markup.button.callback('Drinks & Milkshakes', 'n-alc')],
    [Markup.button.callback('Alcoholic cocktails', 'alc_c')],
    [Markup.button.callback('Non-alcoholic cocktails', 'n-alc_c')]
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

export const Non_Alco = Markup.inlineKeyboard([
    [Markup.button.callback('Coca Cola', 'na_92')],
    [Markup.button.callback('Sprite', 'na_93')],
    [Markup.button.callback('Fanta', 'na_94')],
    [Markup.button.callback('Strawberry Milkshake', 'na_95')],
    [Markup.button.callback('Banana Milkshake', 'na_96')],
    [Markup.button.callback('Chockolate Milkshake', 'na_97')],
    [Markup.button.callback('Vanilla Milkshake', 'na_98')]
])

export const Strong_Acoholo = Markup.inlineKeyboard([
    [Markup.button.callback('Vodka', 'sta_43')],
    [Markup.button.callback('Whiskey', 'sta_44')],
    [Markup.button.callback('Rum', 'sta_45')],
    [Markup.button.callback('tequila', 'sta_46')],
    [Markup.button.callback('Mezcal', 'sta_47')],
    [Markup.button.callback('Mezquit', 'sta_48')],
    [Markup.button.callback('Shochu', 'sta_49')],
    [Markup.button.callback('Gin', 'sta_50')],
    [Markup.button.callback('Tequila Sunrise', 'sta_51')],
    [Markup.button.callback('Cognac', 'sta_52')],
    [Markup.button.callback('Martini', 'sta_53')]
])

export const Light_Acoholo = Markup.inlineKeyboard([
    [Markup.button.callback('Red wine (dry)', 'la_54'), Markup.button.callback('Red wine (semi-dry)', 'la_55') ],
    [Markup.button.callback('Rose wine (dry)', 'la_56'), Markup.button.callback('Red wine (semi-dry)', 'la_57') ],
    [Markup.button.callback('White wine (dry)', 'la_58'), Markup.button.callback('White wine (semi-dry)', 'la_59') ],
    [Markup.button.callback('Champagne', 'la_60')],
    [Markup.button.callback('Prosecco', 'la_61')],
    [Markup.button.callback('Cider', 'la_62')],
    [Markup.button.callback('Beer (light)', 'la_63'), Markup.button.callback('Beer (dark)', 'la_64') ],
    [Markup.button.callback('Sake', 'la_65')],
    [Markup.button.callback('Soju', 'la_66')]
])

export const Alc_Cocktails = Markup.inlineKeyboard([
    [Markup.button.callback('Margarita', 'ac_67')],
    [Markup.button.callback('Mojito', 'ac_68')],
    [Markup.button.callback('Old Fashioned', 'ac_69')],
    [Markup.button.callback('Manhattan', 'ac_70')],
    [Markup.button.callback('Cosmopolita', 'ac_71')],
    [Markup.button.callback('Daiquiri', 'ac_72')],
    [Markup.button.callback('Tom Collins', 'ac_73')],
    [Markup.button.callback('Moscow Mule', 'ac_74')],
    [Markup.button.callback('Whiskey Sour', 'ac_75')],
    [Markup.button.callback('Gimlet', 'ac_76')]
])

export const Not_Alc_Cocktails = Markup.inlineKeyboard([
    [Markup.button.callback('Saffron Cordial', 'nac_77')],
    [Markup.button.callback('Non-Alcoholic Negroni', 'nac_78')],
    [Markup.button.callback('Sharab Rose Raspberry Shrub Cocktail', 'nac_79')],
    [Markup.button.callback('Frozen Shirley Temple', 'nac_80')],
    [Markup.button.callback('Nonalcoholic Champagne Spritz', 'nac_81')],
    [Markup.button.callback('Strawberry-Chile Balsamic Shrub', 'nac_82')],
    [Markup.button.callback('Pineapple and Tamarind Cooler', 'nac_83')],
    [Markup.button.callback('Watermelon Limeade', 'nac_84')],
    [Markup.button.callback('Green Refresher', 'nac_85')],
    [Markup.button.callback('Coffee Cooler', 'nac_86')],
    [Markup.button.callback('Ghia Sour', 'nac_87')],
    [Markup.button.callback('Cherry Red', 'nac_88')],
    [Markup.button.callback('Jardin Verde', 'nac_89')],
    [Markup.button.callback('Shift Drink', 'nac_90')],
    [Markup.button.callback('Psychedelic Backyard', 'nac_91')]
])


// REPLY KEYBOARDS

export const goBusket = Markup.keyboard([
    'Busket'
])
.resize()
.oneTime()