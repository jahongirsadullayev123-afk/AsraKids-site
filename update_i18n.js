const fs = require('fs');
const path = require('path');
const p = path.join(__dirname, 'src/content/i18n.json');
const data = JSON.parse(fs.readFileSync(p, 'utf8'));

// 1. Naturalize existing translations
data.nav.partner.ru = `Стать партнёром`;
data.nav.partner.uz = `Hamkor bo'lish`;

data.hero.quote.ru = `«Каждый ребёнок заслуживает детства без бремени тяжёлого труда».`;
data.hero.quote.uz = `«Har bir bola og'ir mehnatdan xoli, chinakam baxtli bolalikka haqli».`;

data.hero.titleLines.ru = [`Дети`, `Заслуживают`, `Детства`];
data.hero.titleLines.uz = [`Bolalar`, `Baxtli`, `Bolalikka haqli`];

data.hero.subtitle.ru = `Мы — голос тех, кого не слышат. Мы боремся за безопасность, образование и достойное будущее каждого ребёнка в Узбекистане.`;
data.hero.subtitle.uz = `Biz e'tibordan chetda qolganlarning ovozimiz. O'zbekistondagi har bir bolaning xavfsizlik, ta’lim va qadr-qimmati himoyasi uchun kurashamiz.`;

data.hero.ctaPartner.ru = `Стать партнёром`;
data.hero.ctaExplore.ru = `Узнать больше`;
data.hero.ctaExplore.uz = `Batafsil ma'lumot`;


data.impact.title.ru = `Масштаб проблемы в цифрах`;
data.impact.title.uz = `Muammo ko'lami raqamlarda`;
data.impact.stats[0].desc.ru = `Из 36,7 млн жителей Узбекистана 37,5% — это дети и подростки до 19 лет. Более 6,5 млн из них учатся в школах.`;
data.impact.stats[0].desc.uz = `O'zbekistonning 36,7 millionlik aholisining 37,5 foizini 19 yoshgacha bo'lgan yoshlar tashkil etadi. Ularning 6,5 milliondan ortig'i o'rta maktab o'quvchilaridir.`;
data.impact.stats[1].desc.ru = `Более четверти населения живёт за чертой бедности. В некоторых городских районах она затрагивает каждого второго.`;
data.impact.stats[1].desc.uz = `Aholining to'rtdan bir qismidan ko'prog'i qashshoqlik chegarasidan past darajada yashaydi. Ayrim hududlarda qashshoqlik har ikkinchi insonga ta'sir qiladi.`;
data.impact.stats[2].desc.ru = `Дети от 0 до 17 лет в Центральной Азии всё ещё живут в интернатах, вдали от своих семей.`;
data.impact.stats[2].desc.uz = `Markaziy Osiyo bo'ylab 60 000 nafar 0–17 yoshdagi bolalar o'z oilasidan uzilgan holda internat muassasalarida yashamoqda.`;
data.impact.stats[3].desc.ru = `«Нулевая доза»: в Узбекистане всё ещё остаются младенцы, не получившие ни одной прививки.`;
data.impact.stats[3].desc.uz = `«Nol doza»: O'zbekistonda hanuzgacha biror marta ham emlanmagan chaqaloqlar mavjud.`;

data.issues.kicker.ru = `Ключевые проблемы`;
data.issues.kicker.uz = `Asosiy muammolar`;
data.issues.title.ru = `С чем сталкиваются дети`;
data.issues.title.uz = `Bolalar qanday muammolarga duch kelmoqda?`;
data.issues.desc.ru = `За каждой цифрой стоит ребёнок. Вот главные угрозы благополучию детей в Узбекистане.`;
data.issues.desc.uz = `Har bir raqam ortida bola taqdiri yotibdi. Quyida O'zbekistonda bolalar farovonligiga rahna solayotgan eng katta xavflar keltirilgan.`;

data.issues.items[0].desc.ru = `Детский труд сохраняется в шиномонтажах, уличной торговле и домашнем хозяйстве в основном из-за бедности.`;
data.issues.items[0].desc.uz = `Bolalar mehnati ehtiyojmandlik oqibatida hamon ustaxonalarda, ko'cha savdosida va uy yumushlarida qo'llanilmoqda.`;
data.issues.items[1].desc.ru = `Семьи с минимальной зарплатой получают детское пособие в размере всего $10–$33 на ребёнка.`;
data.issues.items[1].desc.uz = `Minimal ish haqi oladigan oilalarga har bir bola uchun atigi 10–33 dollar miqdorida nafaqa to'lanadi.`;
data.issues.items[2].desc.ru = `Тысячи детей попадают в детские дома просто потому, что у семей нет средств на их содержание.`;
data.issues.items[2].desc.uz = `Minglab bolalar oilalarning moddiy imkoniyati yo'qligi sababli davlat qaramog'iga topshirilmoqda.`;
data.issues.items[3].desc.ru = `В классах обучается по 35–38 детей. Дети из сельской местности сталкиваются с дополнительными преградами.`;
data.issues.items[3].desc.uz = `Sinflarda o'quvchilar soni 35–38 nafargacha yetmoqda. Qishloq hududlarida yashovchi bolalar ta'lim olishda qo'shimcha to'siqlarga duch kelishadi.`;
data.issues.items[4].desc.ru = `Необходима поддержка дородового и послеродового ухода. Невакцинированные дети — признак системных проблем.`;
data.issues.items[4].desc.uz = `Tug'ruqdan oldingi va keyingi tibbiy yordam darajasi yetarli emas. Emlanmagan bolalarning mavjudligi tizimli muammolardan darak beradi.`;
data.issues.items[5].desc.ru = `Семьи прибывают в крайней нужде, часто без базовых вещей и знания языка.`;
data.issues.items[5].desc.uz = `Qochoq oilalar mamlakatga o'ta og'ir ahvolda, ko'pincha uskunalar va til bilmasdan kelishadi.`;

data.laws.items[0].desc.ru = `Ратифицирована Узбекистаном. Устанавливает право на выживание, защиту и развитие.`;
data.laws.items[0].desc.uz = `O'zbekiston tomonidan ratifikatsiya qilingan. Har bir bolaning yashash, himoyalanish va rivojlanish huquqini ta'minlaydi.`;
data.laws.items[1].desc.ru = `Гарантирует бесплатное и обязательное общее среднее образование (11 классов).`;
data.laws.items[1].desc.uz = `11 yillik bepul va majburiy umumiy o'rta ta’limni kafolatlaydi.`;
data.laws.items[2].desc.ru = `Запрещает привлекать лиц до 18 лет к опасным работам, а также работе в ночных клубах.`;
data.laws.items[2].desc.uz = `18 yoshga to'lmaganlarni zararli ishlarda ishlashini qat'iyan man etadi.`;
data.laws.items[3].desc.ru = `Устанавливает минимальный возраст трудоустройства (в Узбекистане — 16 лет).`;
data.laws.items[3].desc.uz = `Ishga qabul qilishning minimal yoshini (o'zbekistonda 16 yosh) belgilaydi.`;

data.labour.chartTitle.ru = `Где используется детский труд`;
data.labour.chartTitle.uz = `Bolalar mehnati qayerda tarqalgan?`;
data.labour.chartDesc.ru = `Неформальные сектора процветают в основном из-за острой нужды семей и отсутствия социальной поддержки.`;
data.labour.chartDesc.uz = `Norasmiy tarmoqlarda bolalar mehnatidan amaliyot asosan oilalarning moliyaviy nochorligi sababli hamon uchrab turibdi.`;
data.labour.quote.ru = `«Часто подросток вынужден искать работу из-за тяжелой семейной ситуации».`;
data.labour.quote.uz = `«Ko'pincha o'smirlar oiladagi qiyin moliyaviy ahvol sababli ish izlashga majbur bo'lishadi».`;
data.labour.quoteBy.ru = `— Мадина Очилова, юрист и правозащитник`;
data.labour.quoteBy.uz = `— Madina Ochilova, yurist va huquqshunos`;

data.labour.cards[0].num = { en: "~$90", ru: "~$90", uz: "~$90" };
data.labour.cards[0].title.ru = `Мин. зарплата`;
data.labour.cards[0].title.uz = `Eng kam oylik`;
data.labour.cards[0].desc.ru = `Детское пособие в размере $10–$33 ставит семьи в безвыходное положение.`;
data.labour.cards[0].desc.uz = `10–33 dollarlik nafaqa oilalarni iqtisodiy jihatdan juda og'ir ahvolga solmoqda.`;

data.labour.cards[1].num = { en: "1 in 2", ru: "1 из 2", uz: "2 dan 1 ta" };
data.labour.cards[1].title.ru = `Городская бедность`;
data.labour.cards[1].title.uz = `Shaharlardagi qashshoqlik`;
data.labour.cards[1].desc.ru = `В некоторых городских районах бедность затрагивает почти каждого второго жителя.`;
data.labour.cards[1].desc.uz = `Ayrim shaharlik hududlarda deyarli har ikkinchi fuqaro qashshoqlikda yashaydi.`;

data.labour.cards[2].num = { en: "21 days", ru: "21 день", uz: "21 kun" };
data.labour.cards[2].title.ru = `Сбор хлопка`;
data.labour.cards[2].title.uz = `Paxta terimi`;
data.labour.cards[2].desc.ru = `Из-за экономических трудностей дети исторически привлекались к полевым работам.`;
data.labour.cards[2].desc.uz = `Iqtisodiy muammolar tarixdan bolalarni paxta dalalariga majburan olib chiqqan.`;

data.labour.cards[3].num = { en: "0 NGOs", ru: "0 НПО", uz: "0 NNT" };
data.labour.cards[3].title.ru = `Нет НПО`;
data.labour.cards[3].title.uz = `Litsenziyasiz NNTlar`;
data.labour.cards[3].desc.ru = `По данным активистов, НПО по правам детей в сфере труда часто не могут пройти регистрацию.`;
data.labour.cards[3].desc.uz = `Faollarga ko'ra, bolalar mehnatiga qarshi NNTlarni ro'yxatdan o'tkazishda hanuz cheklovlar bor.`;

data.mission.kicker.ru = `Наша миссия`;
data.mission.kicker.uz = `Bizning maqsadimiz`;
data.mission.title.ru = `Что мы создаём вместе`;
data.mission.title.uz = `Biz birgalikda nimalarni bino qilyapmiz`;
data.mission.quote.ru = `«Будущее ребёнка не зависит от того, где он родился — оно зависит от среды, которую мы создадим вокруг него».`;
data.mission.quote.uz = `«Bolaning kelajagi qayerda tug'ilganiga emas, biz uning atrofida qanday muhit yaratganimizga bog'liq».`;
data.mission.quoteBy.ru = `— Цель AsraKids`;
data.mission.quoteBy.uz = `— AsraKids g'oyasi`;

data.mission.bullets.ru = [
  `Правовая защита — помощь семьям с законами о защите прав детей.`,
  `Доступ к образованию — помощь детям из уязвимых семей в получении качественных знаний.`,
  `Поддержка семей — социальная помощь для предотвращения передачи детей в интернаты.`,
  `Борьба с детским трудом — создание экономических альтернатив для нуждающихся семей.`,
  `Открытость данных — сбор и публикация проверенной информации о положении детей.`
];
data.mission.bullets.uz = [
  `Huquqiy himoya — oilalarga bolalar himoyasi qonunlaridan foydalanishda yordam berish.`,
  `Ta’lim imkoniyatlari — moliyaviy muammoli oilalar farzandlarini o'qishda davom etishlari uchun ko'mak.`,
  `Oilani qo'llab quvvatlash — bolalarning internatlarga tushib qolishini oldini olish uchun yordam turlari.`,
  `Bolalar mehnatiga qarshi kurash — muhtoj oilalar uchun muqobil daromad manbalarini taklif etish.`,
  `Ma'lumotlar shaffofligi — bolalar holati bo'yicha ishonchli statistikalarni nashr etish.`
];

data.footer.about.ru = `О проекте`;
data.footer.about.uz = `Loyiha haqida`;
data.footer.copyright.ru = `© 2026 AsraKids. Сделано с заботой.`;
data.footer.copyright.uz = `© 2026 AsraKids. Mehr bilan yaratildi.`;

// Add partnerSection
data.partnerSection = {
  openForCollab: {
    en: `Open for Collaboration`,
    ru: `Открыты к сотрудничеству`,
    uz: `Hamkorlik uchun ochiqmiz`
  },
  title: {
    en: [`Let's`, `amplify`, `our`, `impact`, `together.`],
    ru: [`Творить`, `изменения`, `мы`, `можем`, `вместе.`],
    uz: [`Bizning`, `ta'sirimiz`, `kuchliroq`, `bo'ladi`, `birgalikda.`]
  },
  desc: {
    en: `We believe in the power of collective action. Whether you're a global organization or a local volunteer, your contribution is the catalyst for change.`,
    ru: `Мы верим в силу совместных действий. Кем бы вы ни были — глобальной организацией или местным волонтёром — ваш вклад становится двигателем перемен.`,
    uz: `Biz kuch birlikda ekaniga ishonamiz. Yirik tashkilot yoki mahalliy ko'ngilli bo'lishingizdan qat'i nazar sizning yordamingiz ijobiy o'zgarishlarga sababchi bo'ladi.`
  },
  cardTitle: {
    en: `Partner with Us`,
    ru: `Стать нашим партнёром`,
    uz: `Biz bilan hamkor bo'ling`
  },
  cardDesc: {
    en: `Join our network of change-makers. We provide the platform, the expertise, and the transparency—you provide the spark.`,
    ru: `Присоединяйтесь к нашей сети энтузиастов. Мы предоставляем платформу, экспертность и прозрачность, а вы приносите вдохновение.`,
    uz: `O'zgartirishlar tarmog'imizga qo'shiling. Biz platforma, bilim va shaffoflikni - siz esa bu jamoaga quvvat berasiz.`
  },
  startConversation: {
    en: `Start a Conversation`,
    ru: `Связаться с нами`,
    uz: `Biz bilan bog'lanish`
  }
};

fs.writeFileSync(p, JSON.stringify(data, null, 2));
console.log("Translations updated!");
