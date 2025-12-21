
const BIBLE_VERSES = {
    "fortaleza": [
        { text: "Todo lo puedo en Cristo que me fortalece.", ref: "Filipenses 4:13" },
        { text: "Mira que te mando que te esfuerces y seas valiente; no temas ni desmayes.", ref: "Josué 1:9" },
        { text: "Jehová es mi luz y mi salvación; ¿de quién temeré?", ref: "Salmos 27:1" },
        { text: "Más los que esperan a Jehová tendrán nuevas fuerzas.", ref: "Isaías 40:31" },
        { text: "Esforzaos y cobrad ánimo; no temáis, ni tengáis miedo.", ref: "Deuteronomio 31:6" },
        { text: "El Señor es mi fuerza y mi escudo; en él confió mi corazón.", ref: "Salmos 28:7" },
        { text: "No temas, porque yo estoy contigo; no desmayes, porque yo soy tu Dios.", ref: "Isaías 41:10" }
    ],
    "fe": [
        { text: "Es, pues, la fe la certeza de lo que se espera, la convicción de lo que no se ve.", ref: "Hebreos 11:1" },
        { text: "Porque por fe andamos, no por vista.", ref: "2 Corintios 5:7" },
        { text: "Y todo lo que pidiereis en oración, creyendo, lo recibiréis.", ref: "Mateo 21:22" },
        { text: "Si tuvieres fe como un grano de mostaza... nada os será imposible.", ref: "Mateo 17:20" },
        { text: "Para el que cree, todo es posible.", ref: "Marcos 9:23" }
    ],
    "paz": [
        { text: "La paz os dejo, mi paz os doy; yo no os la doy como el mundo la da.", ref: "Juan 14:27" },
        { text: "Y la paz de Dios, que sobrepasa todo entendimiento, guardará vuestros corazones.", ref: "Filipenses 4:7" },
        { text: "En paz me acostaré, y asimismo dormiré; porque solo tú, Jehová, me haces vivir confiado.", ref: "Salmos 4:8" },
        { text: "Jehová dará poder a su pueblo; Jehová bendecirá a su pueblo con paz.", ref: "Salmos 29:11" },
        { text: "Bienaventurados los pacificadores, porque ellos serán llamados hijos de Dios.", ref: "Mateo 5:9" }
    ],
    "amor": [
        { text: "Porque de tal manera amó Dios al mundo, que ha dado a su Hijo unigénito.", ref: "Juan 3:16" },
        { text: "El amor es sufrido, es benigno; el amor no tiene envidia.", ref: "1 Corintios 13:4" },
        { text: "Amad a vuestros enemigos, bendecid a los que os maldicen.", ref: "Mateo 5:44" },
        { text: "Y ahora permanecen la fe, la esperanza y el amor, estos tres; pero el mayor de ellos es el amor.", ref: "1 Corintios 13:13" },
        { text: "Nosotros le amamos a él, porque él nos amó primero.", ref: "1 Juan 4:19" }
    ],
    "sabiduría": [
        { text: "El principio de la sabiduría es el temor de Jehová.", ref: "Proverbios 1:7" },
        { text: "Si alguno de vosotros tiene falta de sabiduría, pídala a Dios.", ref: "Santiago 1:5" },
        { text: "Lámpara es a mis pies tu palabra, y lumbrera a mi camino.", ref: "Salmos 119:105" },
        { text: "Fíate de Jehová de todo tu corazón, y no te apoyes en tu propia prudencia.", ref: "Proverbios 3:5" }
    ],
    "gracia": [
        { text: "Venid a mí todos los que estáis trabajados y cargados, y yo os haré descansar.", ref: "Mateo 11:28" },
        { text: "Bástate mi gracia; porque mi poder se perfecciona en la debilidad.", ref: "2 Corintios 12:9" },
        { text: "Jehová peleará por vosotros, y vosotros estaréis tranquilos.", ref: "Éxodo 14:14" }
    ]
};

// Helper to get random verse from ANY category
function getRandomVerse(category = null) {
    let pool = [];
    if (category && BIBLE_VERSES[category]) {
        pool = BIBLE_VERSES[category];
    } else {
        // Merge all categories
        Object.values(BIBLE_VERSES).forEach(cat => pool.push(...cat));
    }
    return pool[Math.floor(Math.random() * pool.length)];
}

// Make globally accessible
window.getRandomVerse = getRandomVerse;
