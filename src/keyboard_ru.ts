import { Markup } from "telegraf"

export const database = ['Куриный стейк с плавленым сыром', 
'Куриный жареный стейк', 'Говядина гриль с грибным соусом', 
'Свиные отбивные с яблочным соусом', 'Говяжья вырезка с жареным перцем и луком', 
'Филе-миньон с беконом и сыром', 'Запеченный лосось с лимонным маслом', 
'Жареный лосось с лимонным маслом', 'Жареные лимонно-чесночные креветки', 
'Жареная курица с лимонным маслом', 'Жареное филе-миньон с лимонным маслом', 
'Жареный лосось с лимонным маслом', 


// side dishes
'Картофельное пюре с чесноком', 'Жареная спаржа с лимонным маслом',
'Сладкая кукуруза с травяным маслом', 'Запеченная паста с сыром',
'Жареная брюссельская капуста с беконом', 'Морковь в медовой глазури', 'Картошка фри с пармезаном и трюфелями', 'Кремовый шпинат',
'Обжаренная зеленая фасоль с миндалем', 'Фаршированный болгарский перец', //22


//salads
'Салат Цезарь',
'Греческий салат с сыром Фета', 'Салат из шпината и клубники',
'Салат «Кобб с авокадо', 'Салат из киноа с жареными овощами',
'Салат Капрезе с бальзамической глазурью', 'Азиатский салат с курицей и кунжутной заправкой',
'Салат из свеклы и козьего сыра', 'Юго-западный салат с заправкой из кинзы и лайма',
'Салат из капусты с лимонным винегретом',


// desserts
'Классический чизкейк Нью-Йорк', 'Шоколадный торт лава с ванильным мороженым',
'Яблочный пирог с корицей', 'Тирамису с кремом маскарпоне', 'Лимонный пирог с малиновым соусом',
'Крем-брюле со свежими ягодами', 'Торт «Красный бархат» с глазурью из сливочного сыра', 'Брауни-мороженое с горячей помадкой',
'Панна Котта с ягодным компотом', 'Хлебный пудинг с соусом из бурбона',

// strong alcohol
'Водка', 'Виски', 'Ром',
'Текила', 'Мескаль', 'Мескит',
'Сёту', 'Джин', 'Текила Санрайз',
'Коньяк', 'Мартини',

// light alochol
'Вино красное (сухое)', 'Вино красное (полусухое)', 'Вино розовое (сухое)', 'Вино розовое (полусухое)', 'Вино белое (сухое)', 'Вино белое (полусухое)',
            'Шампанское', 'Просекко', 'Сидр', 'Пиво (светлое)', 'Пиво (темное)', 'Саке', 'Соджу',

//alcoholic cocktals
'Маргарита', 'Мохито', 'Старомодный', 'Манхэттен',
            'Космополита', 'Дайкири', 'Том Коллинз', 'Московский мул',
            'Виски сауэр', 'Гимлет',

//non alocoholic cocktails
'Шафрановый кордиал', 'Безалкогольный негрони', 'Коктейль из шарабской розы и малины',
'Frozen Shirley Temple', 'Безалкогольное шампанское Spritz', 'Клубнично-чилийский бальзамический кустарник',
'Охладитель с ананасом и тамариндом', 'Арбузный лайм', 'Зеленый освежитель',
'Кофейный холодильник', 'Гия кислый', 'Вишневый красный', 'Жардин Верде', 'Сменный напиток', 'Психоделический двор',

// DRINKS & MILSHAKES

'Coca Cola', 'Sprite', 'Fanta', 'Клубничный милкшейк', 'Банановый милкшейк', 'Шоколадный милкшейк', 'Ванильный милкшейк'

]

export const Start = Markup.inlineKeyboard([
    [Markup.button.callback('Главное меню', 'menu'), 
    Markup.button.callback('Бар', 'bar')]
]);

export const Menu = Markup.inlineKeyboard([
    [Markup.button.callback('Жаркое', 'mc'), Markup.button.callback('Гарниры', 'sd')],
    [Markup.button.callback('Салаты', 'salad'), Markup.button.callback('Десерты', 'dessert')]
]);

export const Bar = Markup.inlineKeyboard([
    [Markup.button.callback('Крепкий алкоголь', 'alc')],
    [Markup.button.callback('Легкий алкоголь', 'l_alc')],
    [Markup.button.callback('Освежающие напитки и милкщейки', 'n-alc')],
    [Markup.button.callback('Алкогольные коктейли', 'alc_c')],
    [Markup.button.callback('Безалкогольные коктейли', 'n-alc_c')]
])

export const Main_Course = Markup.inlineKeyboard([
    [Markup.button.callback('Стейк из курицы с плавленым сыром', 'm_1')], [Markup.button.callback('Стейк из курицы, жареный', 'm_2')],
    
    [Markup.button.callback('Говядина-гриль с грибным соусом', 'm_3')], [Markup.button.callback('Свиные отбивные с яблочным соусом', 'm_4')],
    
    [Markup.button.callback('Говяжья вырезка с жареным перцем и луком', 'm_5')], [Markup.button.callback('Филе-миньон с беконом и сыром', 'm_6')],
    
    [Markup.button.callback('Запеченный лосось с маслом с лимоном и травами', 'm_7')], [Markup.button.callback('Лосось на гриле с маслом с лимоном и травами', 'm_8')],
    
    [Markup.button.callback('Креветки с лимоном и чесноком на гриле', 'm_9')], [Markup.button.callback('Жареная курица с маслом с лимоном и травами', 'm_10')],
    
    [Markup.button.callback('Жареное филе-миньон с маслом с лимоном и травами', 'm_11')], [Markup.button.callback('Жареный лосось с маслом с лимоном и травами', 'm_12')]
    
])

export const Side_dishes = Markup.inlineKeyboard([
    [Markup.button.callback('Картофельное пюре с чесноком', 's_13')],
    [Markup.button.callback('Спаржа на гриле с лимонным маслом', 's_14')],
    [Markup.button.callback('Сладкая кукуруза с травяным маслом', 's_15')],
    [Markup.button.callback('Запеченные макароны с сыром', 's_16')],
    [Markup.button.callback('Жареная брюссельская капуста с беконом', 's_17')],
    [Markup.button.callback('Морковь в медовой глазури', 's_18')],
    [Markup.button.callback('Картошка фри с пармезаном и трюфелями', 's_19')],
    [Markup.button.callback('Сливочный шпинат', 's_20')],
    [Markup.button.callback('Обжаренная зеленая фасоль с миндалем', 's_21')],
    [Markup.button.callback('Фаршированный болгарский перец', 's_22')]
])

export const Salads = Markup.inlineKeyboard([
    [Markup.button.callback('Классический салат Цезарь', 'sa_23')],
    [Markup.button.callback('Греческий салат с сыром фета', 'sa_24')],
    [Markup.button.callback('Салат из шпината и клубники', 'sa_25')],
    [Markup.button.callback('Салат Кобб с авокадо', 'sa_26')],
    [Markup.button.callback('Салат из киноа с жареными овощами', 'sa_27')],
    [Markup.button.callback('Салат Капрезе с бальзамической глазурью', 'sa_28')],
    [Markup.button.callback('Азиатский салат из курицы с кунжутной заправкой', 'sa_29')],
    [Markup.button.callback('Салат из свеклы и козьего сыра', 'sa_30')],
    [Markup.button.callback('Юго-западный салат с заправкой из кинзы и лайма', 'sa_31')],
    [Markup.button.callback('Салат из капусты с лимонным винегретом', 'sa_32')]
])

export const Desserts = Markup.inlineKeyboard([
    [Markup.button.callback('Чизкейк "Нью-Йорк"', 'd_33')],
    [Markup.button.callback('Шоколадный торт лава с ванильным мороженым', 'd_34')],
    [Markup.button.callback('Яблочный пирог с корицей', 'd_35')],
    [Markup.button.callback('Тирамису с кремом маскарпоне', 'd_36')],
    [Markup.button.callback('Лимонный пирог с малиновым соусом', 'd_37')],
    [Markup.button.callback('Крем-брюле со свежими ягодами', 'd_38')],
    [Markup.button.callback('Торт «Красный бархат» с глазурью из сливочного сыра', 'd_39')],
    [Markup.button.callback('Брауни с мороженым с горячей помадкой', 'd_40')],
    [Markup.button.callback('Панна котта с ягодным компотом', 'd_41')],
    [Markup.button.callback('Хлебный пудинг с соусом из бурбона', 'd_42')]
])

export const Non_Alco = Markup.inlineKeyboard([
    [Markup.button.callback('Coca Cola', 'na_92')],
    [Markup.button.callback('Sprite', 'na_93')],
    [Markup.button.callback('Fanta', 'na_94')],
    [Markup.button.callback('Клубничный милкшейк', 'na_95')],
    [Markup.button.callback('Банановый милкшейк', 'na_96')],
    [Markup.button.callback('Шоколадный милкшейк', 'na_97')],
    [Markup.button.callback('Ванильный милкшейк', 'na_98')]
])

export const Strong_Acoholo = Markup.inlineKeyboard([
    [Markup.button.callback('Водка', 'sta_43')],
    [Markup.button.callback('Виски', 'sta_44')],
    [Markup.button.callback('Ром', 'sta_45')],
    [Markup.button.callback('Текила', 'sta_46')],
    [Markup.button.callback('Мескаль', 'sta_47')],
    [Markup.button.callback('Мезкит', 'sta_48')],
    [Markup.button.callback('Сёту', 'sta_49')],
    [Markup.button.callback('джин', 'sta_50')],
    [Markup.button.callback('Текила Санрайз', 'sta_51')],
    [Markup.button.callback('Коньяк', 'sta_52')],
    [Markup.button.callback('Мартини', 'sta_53')]
])

export const Light_Acoholo = Markup.inlineKeyboard([
    [Markup.button.callback('Красное вино (сухое)', 'la_54'), Markup.button.callback('Красное вино (полусухое)', 'la_55') ],
    [Markup.button.callback('Розовое вино (сухое)', 'la_56'), Markup.button.callback('Розове вино (полусухое)', 'la_57') ],
    [Markup.button.callback('Белое вино (сухое)', 'la_58'), Markup.button.callback('Белое вино (полусухое)', 'la_59') ],
    [Markup.button.callback('Шампаннское', 'la_60')],
    [Markup.button.callback('Просекко', 'la_61')],
    [Markup.button.callback('Сидр', 'la_62')],
    [Markup.button.callback('Светлое пиво', 'la_63'), Markup.button.callback('Темное пиво', 'la_64') ],
    [Markup.button.callback('Сакэ', 'la_65')],
    [Markup.button.callback('Соджу', 'la_66')]
])

export const Alc_Cocktails = Markup.inlineKeyboard([
    [Markup.button.callback('Маргарита', 'ac_67')],
    [Markup.button.callback('Мохито', 'ac_68')],
    [Markup.button.callback('Старомодный', 'ac_69')],
    [Markup.button.callback('Манхэттен', 'ac_70')],
    [Markup.button.callback('Космополита', 'ac_71')],
    [Markup.button.callback('Дайкири', 'ac_72')],
    [Markup.button.callback('Том Коллинз', 'ac_73')],
    [Markup.button.callback('Московский мул', 'ac_74')],
    [Markup.button.callback('Виски сауэр', 'ac_75')],
    [Markup.button.callback('Гимлет', 'ac_76')]
])

export const Not_Alc_Cocktails = Markup.inlineKeyboard([
    [Markup.button.callback('Шафрановый кордиал', 'nac_77')],
    [Markup.button.callback('Безалкогольный негрони', 'nac_78')],
    [Markup.button.callback('Коктейль из шарабской розы и малинового кустарника', 'nac_79')],
    [Markup.button.callback('Frozen Shirley Temple', 'nac_80')],
    [Markup.button.callback('Безалкогольное шампанское Spritz', 'nac_81')],
    [Markup.button.callback('Клубнично-чилийский бальзамический кустарник', 'nac_82')],
    [Markup.button.callback('Охладитель с ананасом и тамариндом', 'nac_83')],
    [Markup.button.callback('Арбузный лайм', 'nac_84')],
    [Markup.button.callback('Зеленый освежитель', 'nac_85')],
    [Markup.button.callback('Кулер для кофе', 'nac_86')],
    [Markup.button.callback('Гиа Сауэр', 'nac_87')],
    [Markup.button.callback('Вишневый красный', 'nac_88')],
    [Markup.button.callback('Жарден-Верде', 'nac_89')],
    [Markup.button.callback('Shift Drink', 'nac_90')],
    [Markup.button.callback('Психоделический двор', 'nac_91')]
])


// REPLY KEYBOARDS

export const goBusket = Markup.keyboard([
    'Корзина'
])
.resize()

export const goMenu = Markup.keyboard([
    'Меню'
]).resize()

export const BuskMenu = Markup.keyboard([
    'Меню', 'Корзина'
]).resize()