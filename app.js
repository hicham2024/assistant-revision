const courseText = document.getElementById("courseText");
const generateButton = document.getElementById("generate");
const clearButton = document.getElementById("clear");
const copyButton = document.getElementById("copyJson");
const jsonOutput = document.getElementById("jsonOutput");
const friendlyOutput = document.getElementById("friendlyOutput");
const levelBadge = document.getElementById("levelBadge");
const subjectBadge = document.getElementById("subjectBadge");
const textMode = document.getElementById("textMode");
const imageMode = document.getElementById("imageMode");
const imageTools = document.getElementById("imageTools");
const scanImage = document.getElementById("scanImage");
const imagePreview = document.getElementById("imagePreview");
const extractText = document.getElementById("extractText");
const ocrStatus = document.getElementById("ocrStatus");
const languageSelect = document.getElementById("languageSelect");
const appEyebrow = document.getElementById("appEyebrow");
const appTitle = document.getElementById("appTitle");
const languageLabel = document.getElementById("languageLabel");
const scanImageLabel = document.getElementById("scanImageLabel");
const courseTextLabel = document.getElementById("courseTextLabel");
const jsonSummary = document.getElementById("jsonSummary");
const courseLanguage = document.getElementById("courseLanguage");
const levelSelect = document.getElementById("levelSelect");
const revisionType = document.getElementById("revisionType");
const courseLanguageLabel = document.getElementById("courseLanguageLabel");
const levelSelectLabel = document.getElementById("levelSelectLabel");
const revisionTypeLabel = document.getElementById("revisionTypeLabel");
const saveCourse = document.getElementById("saveCourse");
const exportPdf = document.getElementById("exportPdf");
const speakSummary = document.getElementById("speakSummary");
const showFlashcards = document.getElementById("showFlashcards");
const startQuiz = document.getElementById("startQuiz");
const toolstrip = document.getElementById("toolstrip");
const studyTools = document.getElementById("studyTools");
const savedTitle = document.getElementById("savedTitle");
const savedCourses = document.getElementById("savedCourses");
const textStats = document.getElementById("textStats");

let currentJson = null;
let selectedImages = [];
let currentLanguage = "fr";
const storageKey = "assistantRevisionCourses";

const uiText = {
  fr: {
    htmlLang: "fr",
    dir: "ltr",
    appEyebrow: "Application éducative",
    appTitle: "Assistant de révision",
    languageLabel: "Langue",
    copy: "Copier",
    copied: "Copié",
    textMode: "Coller le texte",
    imageMode: "Photos du cours",
    scanImageLabel: "Images scannées avec le téléphone",
    noImage: "Aucune image sélectionnée",
    extractText: "Lire le texte des images",
    courseTextLabel: "Texte du cours",
    placeholder: "Colle ici le texte du cours, ou utilise une photo pour remplir ce champ automatiquement...",
    generate: "Générer le module",
    clear: "Effacer",
    courseLanguageLabel: "Langue du cours",
    levelSelectLabel: "Niveau - Wallonie",
    revisionTypeLabel: "Type de révision",
    save: "Sauvegarder",
    saved: "Sauvegardé",
    exportPdf: "PDF",
    audio: "Audio",
    flashcards: "Flashcards",
    quiz: "Quiz",
    savedTitle: "Cours sauvegardés",
    noSaved: "Aucun cours sauvegardé.",
    load: "Ouvrir",
    remove: "Supprimer",
    levelPending: "Niveau à détecter",
    subjectPending: "Matière",
    emptyOutput: "Colle un cours ou ajoute une photo, puis lance la génération.",
    jsonSummary: "Voir le JSON",
    jsonPending: "Le JSON apparaîtra ici.",
    emptyTitle: "Aucun cours fourni",
    emptyTakeaway: "Colle le texte extrait du cours pour générer un module de révision.",
    noLevel: "non déterminé",
    noSubject: "non déterminé",
    sections: {
      important: "Points importants",
      concepts: "Concepts clés",
      exercises: "Exercices",
      assignment: "Devoir",
      answer: "Réponse",
      guide: "Guide",
      flashcards: "Flashcards",
      quiz: "Quiz interactif",
      showAnswer: "Voir la réponse",
      hideAnswer: "Masquer",
      check: "Vérifier",
      score: "Score"
    },
    ocrNeedsNet: "La lecture d'image nécessite une connexion internet au premier chargement.",
    ocrReading: "Lecture du texte en cours...",
    ocrProgress: "Lecture du texte",
    ocrDone: "Textes lus. Tu peux vérifier rapidement puis générer le module.",
    ocrFail: "Impossible de lire ces images. Essaie des photos plus nettes ou colle le texte.",
    selectedImages: (count) => `${count} image${count > 1 ? "s" : ""} sélectionnée${count > 1 ? "s" : ""}`,
    pageLabel: (index) => `Page ${index}`
  },
  nl: {
    htmlLang: "nl",
    dir: "ltr",
    appEyebrow: "Educatieve applicatie",
    appTitle: "Studie-assistent",
    languageLabel: "Taal",
    copy: "Kopiëren",
    copied: "Gekopieerd",
    textMode: "Tekst plakken",
    imageMode: "Foto's van de les",
    scanImageLabel: "Gescande afbeeldingen met de telefoon",
    noImage: "Geen afbeelding geselecteerd",
    extractText: "Tekst uit de afbeeldingen lezen",
    courseTextLabel: "Lestekst",
    placeholder: "Plak hier de tekst van de les, of gebruik een foto om dit veld automatisch te vullen...",
    generate: "Module maken",
    clear: "Wissen",
    courseLanguageLabel: "Taal van de les",
    levelSelectLabel: "Niveau - Vlaanderen",
    revisionTypeLabel: "Type herhaling",
    save: "Opslaan",
    saved: "Opgeslagen",
    exportPdf: "PDF",
    audio: "Audio",
    flashcards: "Flashcards",
    quiz: "Quiz",
    savedTitle: "Opgeslagen lessen",
    noSaved: "Geen opgeslagen lessen.",
    load: "Openen",
    remove: "Verwijderen",
    levelPending: "Niveau detecteren",
    subjectPending: "Vak",
    emptyOutput: "Plak een les of voeg een foto toe en start daarna de generatie.",
    jsonSummary: "JSON bekijken",
    jsonPending: "De JSON verschijnt hier.",
    emptyTitle: "Geen les ingevoerd",
    emptyTakeaway: "Plak de tekst uit de les om een volledige herhalingsmodule te maken.",
    noLevel: "niet bepaald",
    noSubject: "niet bepaald",
    sections: {
      important: "Belangrijke punten",
      concepts: "Kernbegrippen",
      exercises: "Oefeningen",
      assignment: "Taak",
      answer: "Antwoord",
      guide: "Handleiding",
      flashcards: "Flashcards",
      quiz: "Interactieve quiz",
      showAnswer: "Antwoord tonen",
      hideAnswer: "Verbergen",
      check: "Controleren",
      score: "Score"
    },
    ocrNeedsNet: "Afbeeldingen lezen vereist internet bij de eerste keer laden.",
    ocrReading: "Tekst wordt gelezen...",
    ocrProgress: "Tekst lezen",
    ocrDone: "Teksten gelezen. Je kunt ze kort controleren en daarna de module maken.",
    ocrFail: "Deze afbeeldingen konden niet gelezen worden. Probeer scherpere foto's of plak de tekst.",
    selectedImages: (count) => `${count} afbeelding${count > 1 ? "en" : ""} geselecteerd`,
    pageLabel: (index) => `Pagina ${index}`
  },
  ar: {
    htmlLang: "ar",
    dir: "rtl",
    appEyebrow: "تطبيق تعليمي",
    appTitle: "مساعد المراجعة",
    languageLabel: "اللغة",
    copy: "نسخ",
    copied: "تم النسخ",
    textMode: "لصق النص",
    imageMode: "صور الدرس",
    scanImageLabel: "صور ممسوحة بالهاتف",
    noImage: "لم يتم اختيار أي صورة",
    extractText: "قراءة النص من الصور",
    courseTextLabel: "نص الدرس",
    placeholder: "ألصق نص الدرس هنا، أو استعمل الصور لملء هذا الحقل تلقائيا...",
    generate: "إنشاء وحدة المراجعة",
    clear: "مسح",
    courseLanguageLabel: "لغة الدرس",
    levelSelectLabel: "المستوى - المغرب",
    revisionTypeLabel: "نوع المراجعة",
    save: "حفظ",
    saved: "تم الحفظ",
    exportPdf: "PDF",
    audio: "صوت",
    flashcards: "بطاقات",
    quiz: "اختبار",
    savedTitle: "الدروس المحفوظة",
    noSaved: "لا توجد دروس محفوظة.",
    load: "فتح",
    remove: "حذف",
    levelPending: "تحديد المستوى",
    subjectPending: "المادة",
    emptyOutput: "ألصق درسا أو أضف صورا، ثم ابدأ إنشاء وحدة المراجعة.",
    jsonSummary: "عرض JSON",
    jsonPending: "سيظهر JSON هنا.",
    emptyTitle: "لم يتم إدخال أي درس",
    emptyTakeaway: "ألصق نص الدرس لإنشاء وحدة مراجعة كاملة.",
    noLevel: "غير محدد",
    noSubject: "غير محدد",
    sections: {
      important: "النقاط المهمة",
      concepts: "المفاهيم الأساسية",
      exercises: "تمارين",
      assignment: "واجب",
      answer: "الجواب",
      guide: "المنهجية",
      flashcards: "بطاقات المراجعة",
      quiz: "اختبار تفاعلي",
      showAnswer: "إظهار الجواب",
      hideAnswer: "إخفاء",
      check: "تحقق",
      score: "النقطة"
    },
    ocrNeedsNet: "قراءة الصور تحتاج إلى اتصال بالإنترنت عند التحميل الأول.",
    ocrReading: "تتم قراءة النص...",
    ocrProgress: "قراءة النص",
    ocrDone: "تمت قراءة النصوص. يمكنك مراجعتها بسرعة ثم إنشاء الوحدة.",
    ocrFail: "تعذرت قراءة هذه الصور. جرب صورا أوضح أو ألصق النص.",
    selectedImages: (count) => `${count} صورة مختارة`,
    pageLabel: (index) => `الصفحة ${index}`
  },
  es: {
    htmlLang: "es",
    dir: "ltr",
    appEyebrow: "Aplicación educativa",
    appTitle: "Asistente de repaso",
    languageLabel: "Idioma",
    copy: "Copiar",
    copied: "Copiado",
    textMode: "Pegar texto",
    imageMode: "Fotos de la clase",
    scanImageLabel: "Imágenes escaneadas con el teléfono",
    noImage: "No se ha seleccionado ninguna imagen",
    extractText: "Leer el texto de las imágenes",
    courseTextLabel: "Texto de la clase",
    placeholder: "Pega aquí el texto de la clase, o usa fotos para completar este campo automáticamente...",
    generate: "Crear módulo",
    clear: "Borrar",
    courseLanguageLabel: "Idioma de la clase",
    levelSelectLabel: "Nivel - España",
    revisionTypeLabel: "Tipo de repaso",
    save: "Guardar",
    saved: "Guardado",
    exportPdf: "PDF",
    audio: "Audio",
    flashcards: "Tarjetas",
    quiz: "Quiz",
    savedTitle: "Clases guardadas",
    noSaved: "No hay clases guardadas.",
    load: "Abrir",
    remove: "Eliminar",
    levelPending: "Nivel por detectar",
    subjectPending: "Asignatura",
    emptyOutput: "Pega una clase o añade fotos y luego crea el módulo.",
    jsonSummary: "Ver JSON",
    jsonPending: "El JSON aparecerá aquí.",
    emptyTitle: "No se ha introducido ninguna clase",
    emptyTakeaway: "Pega el texto de la clase para crear un módulo completo de repaso.",
    noLevel: "no determinado",
    noSubject: "no determinado",
    sections: {
      important: "Puntos importantes",
      concepts: "Conceptos clave",
      exercises: "Ejercicios",
      assignment: "Tarea",
      answer: "Respuesta",
      guide: "Guía",
      flashcards: "Tarjetas de repaso",
      quiz: "Quiz interactivo",
      showAnswer: "Ver respuesta",
      hideAnswer: "Ocultar",
      check: "Comprobar",
      score: "Puntuación"
    },
    ocrNeedsNet: "La lectura de imágenes necesita internet en la primera carga.",
    ocrReading: "Leyendo el texto...",
    ocrProgress: "Lectura del texto",
    ocrDone: "Textos leídos. Puedes revisarlos y crear el módulo.",
    ocrFail: "No se pudieron leer estas imágenes. Prueba con fotos más nítidas o pega el texto.",
    selectedImages: (count) => `${count} imagen${count > 1 ? "es" : ""} seleccionada${count > 1 ? "s" : ""}`,
    pageLabel: (index) => `Página ${index}`
  },
  it: {
    htmlLang: "it",
    dir: "ltr",
    appEyebrow: "Applicazione educativa",
    appTitle: "Assistente per il ripasso",
    languageLabel: "Lingua",
    copy: "Copia",
    copied: "Copiato",
    textMode: "Incolla testo",
    imageMode: "Foto della lezione",
    scanImageLabel: "Immagini scansionate con il telefono",
    noImage: "Nessuna immagine selezionata",
    extractText: "Leggi il testo dalle immagini",
    courseTextLabel: "Testo della lezione",
    placeholder: "Incolla qui il testo della lezione, oppure usa le foto per compilare automaticamente questo campo...",
    generate: "Crea modulo",
    clear: "Cancella",
    courseLanguageLabel: "Lingua della lezione",
    levelSelectLabel: "Livello - Italia",
    revisionTypeLabel: "Tipo di ripasso",
    save: "Salva",
    saved: "Salvato",
    exportPdf: "PDF",
    audio: "Audio",
    flashcards: "Flashcard",
    quiz: "Quiz",
    savedTitle: "Lezioni salvate",
    noSaved: "Nessuna lezione salvata.",
    load: "Apri",
    remove: "Elimina",
    levelPending: "Livello da rilevare",
    subjectPending: "Materia",
    emptyOutput: "Incolla una lezione o aggiungi foto, poi crea il modulo.",
    jsonSummary: "Vedi JSON",
    jsonPending: "Il JSON apparirà qui.",
    emptyTitle: "Nessuna lezione inserita",
    emptyTakeaway: "Incolla il testo della lezione per creare un modulo completo di ripasso.",
    noLevel: "non determinato",
    noSubject: "non determinato",
    sections: {
      important: "Punti importanti",
      concepts: "Concetti chiave",
      exercises: "Esercizi",
      assignment: "Compito",
      answer: "Risposta",
      guide: "Guida",
      flashcards: "Flashcard",
      quiz: "Quiz interattivo",
      showAnswer: "Mostra risposta",
      hideAnswer: "Nascondi",
      check: "Verifica",
      score: "Punteggio"
    },
    ocrNeedsNet: "La lettura delle immagini richiede internet al primo caricamento.",
    ocrReading: "Lettura del testo in corso...",
    ocrProgress: "Lettura del testo",
    ocrDone: "Testi letti. Puoi controllarli e poi creare il modulo.",
    ocrFail: "Impossibile leggere queste immagini. Prova foto più nitide o incolla il testo.",
    selectedImages: (count) => `${count} immagin${count > 1 ? "i" : "e"} selezionat${count > 1 ? "e" : "a"}`,
    pageLabel: (index) => `Pagina ${index}`
  }
};

const longCourseText = {
  fr: {
    stats: (words, pages) => `${words} mots environ · ${pages} page${pages > 1 ? "s" : ""} estimée${pages > 1 ? "s" : ""}`,
    long: "Cours long détecté : le résumé sera organisé par sections pour rester lisible.",
    sectionsTitle: "Plan du cours",
    sectionLabel: (index) => `Section ${index}`
  },
  nl: {
    stats: (words, pages) => `ongeveer ${words} woorden · ${pages} geschatte pagina${pages > 1 ? "'s" : ""}`,
    long: "Lange les gedetecteerd: de samenvatting wordt per sectie georganiseerd.",
    sectionsTitle: "Lesplan",
    sectionLabel: (index) => `Sectie ${index}`
  },
  ar: {
    stats: (words, pages) => `حوالي ${words} كلمة · ${pages} صفحة تقديرية`,
    long: "تم اكتشاف درس طويل: سيتم تنظيم الملخص حسب الأقسام.",
    sectionsTitle: "خطة الدرس",
    sectionLabel: (index) => `القسم ${index}`
  },
  es: {
    stats: (words, pages) => `${words} palabras aprox. · ${pages} página${pages > 1 ? "s" : ""} estimada${pages > 1 ? "s" : ""}`,
    long: "Clase larga detectada: el resumen se organizará por secciones.",
    sectionsTitle: "Plan de la clase",
    sectionLabel: (index) => `Sección ${index}`
  },
  it: {
    stats: (words, pages) => `circa ${words} parole · ${pages} pagin${pages > 1 ? "e" : "a"} stimat${pages > 1 ? "e" : "a"}`,
    long: "Lezione lunga rilevata: il riassunto sarà organizzato per sezioni.",
    sectionsTitle: "Schema della lezione",
    sectionLabel: (index) => `Sezione ${index}`
  }
};

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("./sw.js").catch(() => {});
  });
}

const subjectRules = [
  {
    subject: { fr: "Histoire-géographie", nl: "Geschiedenis-aardrijkskunde", ar: "التاريخ والجغرافيا", es: "Historia y geografía", it: "Storia e geografia" },
    keywords: ["révolution", "guerre", "empire", "frontière", "carte", "territoire", "population", "siècle", "colonisation"]
  },
  {
    subject: { fr: "Sciences", nl: "Wetenschappen", ar: "العلوم", es: "Ciencias", it: "Scienze" },
    keywords: ["cellule", "énergie", "molécule", "expérience", "hypothèse", "organisme", "réaction", "force", "vitesse"]
  },
  {
    subject: { fr: "Mathématiques", nl: "Wiskunde", ar: "الرياضيات", es: "Matemáticas", it: "Matematica" },
    keywords: ["équation", "fonction", "triangle", "probabilité", "dérivée", "fraction", "angle", "théorème", "calcul"]
  },
  {
    subject: { fr: "Français / littérature", nl: "Frans / literatuur", ar: "اللغة والأدب", es: "Lengua y literatura", it: "Lingua e letteratura" },
    keywords: ["auteur", "narrateur", "poème", "roman", "figure de style", "texte", "argumentation", "champ lexical"]
  },
  {
    subject: { fr: "Économie / gestion", nl: "Economie / beheer", ar: "الاقتصاد والتدبير", es: "Economía / gestión", it: "Economia / gestione" },
    keywords: ["marché", "entreprise", "coût", "prix", "demande", "offre", "profit", "client", "production"]
  }
];

const contentText = {
  fr: {
    generalSubject: "Cours général",
    higher: "université / supérieur",
    highSchool: "lycée",
    middleSchool: "collège",
    primary: "primaire",
    fallbackTitle: (subject) => `Module de révision - ${subject}`,
    fallbackConcepts: ["notion principale", "idée essentielle", "méthode"],
    subjectConcepts: (subject) => [subject, "notion clé", "raisonnement"],
    conceptDefinition: "Élément important du cours à savoir expliquer avec ses propres mots et à relier aux exemples étudiés.",
    fallbackSummary: "Le cours présente plusieurs notions importantes qu'il faut comprendre, mémoriser et savoir réutiliser dans des exercices. L'objectif est d'identifier les idées principales, de retenir le vocabulaire essentiel et de s'entraîner à expliquer les liens entre les notions.",
    fallbackBullets: [
      "Repérer les mots-clés et les définitions du cours.",
      "Comprendre les liens entre les idées principales.",
      "Savoir reformuler le cours avec des phrases simples et précises.",
      "S'entraîner avec des questions courtes avant de passer à un exercice plus long."
    ],
    explainConcept: (term) => `Explique avec tes mots la notion suivante : ${term}.`,
    conceptAnswer: (term) => `Une réponse correcte doit définir ${term} et donner un lien clair avec le cours.`,
    conceptExplanation: "L'objectif est de vérifier que la notion est comprise, pas seulement récitée.",
    trueFalseQuestion: "Les exemples du cours servent à mieux comprendre les notions principales.",
    trueAnswer: "Vrai",
    trueExplanation: "Un exemple permet de rendre une idée plus concrète et de montrer comment l'utiliser.",
    mcqQuestion: "Quelle est la meilleure méthode pour réviser ce cours ?",
    mcqOptions: [
      "Apprendre quelques mots sans comprendre",
      "Identifier les notions clés, les reformuler et s'entraîner",
      "Lire seulement le titre"
    ],
    mcqAnswer: "Identifier les notions clés, les reformuler et s'entraîner",
    mcqExplanation: "Une révision efficace combine compréhension, mémorisation active et application.",
    ideasQuestion: "Cite deux idées importantes à retenir dans ce cours.",
    ideasAnswer: "Deux idées présentes dans le résumé ou les points essentiels.",
    ideasExplanation: "Cette question aide à distinguer les informations centrales des détails secondaires.",
    assignmentTitle: "Analyse guidée du cours",
    assignmentInstructions: "Rédige un paragraphe structuré qui présente l'idée principale du cours, explique au moins deux notions importantes et utilise un exemple précis pour justifier ton raisonnement.",
    assignmentGuide: "Commencer par annoncer le thème général. Définir ensuite deux notions clés avec précision. Ajouter un exemple tiré du cours ou cohérent avec le sujet. Terminer par une phrase de synthèse qui montre le lien entre les notions."
  },
  nl: {
    generalSubject: "Algemene les",
    higher: "universiteit / hoger onderwijs",
    highSchool: "secundair onderwijs",
    middleSchool: "lager secundair onderwijs",
    primary: "basisonderwijs",
    fallbackTitle: (subject) => `Herhalingsmodule - ${subject}`,
    fallbackConcepts: ["hoofbegrip", "kernidee", "methode"],
    subjectConcepts: (subject) => [subject, "kernbegrip", "redenering"],
    conceptDefinition: "Belangrijk onderdeel van de les dat je met je eigen woorden moet kunnen uitleggen en verbinden met voorbeelden.",
    fallbackSummary: "De les bevat meerdere belangrijke begrippen die je moet begrijpen, onthouden en opnieuw kunnen gebruiken in oefeningen. Het doel is om de hoofdideeën te herkennen, de belangrijkste woordenschat te beheersen en verbanden tussen begrippen duidelijk uit te leggen.",
    fallbackBullets: [
      "Herken de sleutelwoorden en definities uit de les.",
      "Begrijp de verbanden tussen de hoofdideeën.",
      "Formuleer de les opnieuw in eenvoudige en precieze zinnen.",
      "Oefen eerst met korte vragen en ga daarna naar een langere taak."
    ],
    explainConcept: (term) => `Leg met je eigen woorden het volgende begrip uit: ${term}.`,
    conceptAnswer: (term) => `Een correct antwoord definieert ${term} en legt een duidelijk verband met de les.`,
    conceptExplanation: "Het doel is om te controleren of je het begrip echt begrijpt, niet alleen uit het hoofd leert.",
    trueFalseQuestion: "Voorbeelden uit de les helpen om de hoofdbegrippen beter te begrijpen.",
    trueAnswer: "Waar",
    trueExplanation: "Een voorbeeld maakt een idee concreter en toont hoe je het kunt gebruiken.",
    mcqQuestion: "Wat is de beste manier om deze les te herhalen?",
    mcqOptions: [
      "Enkele woorden leren zonder ze te begrijpen",
      "Kernbegrippen herkennen, herformuleren en oefenen",
      "Alleen de titel lezen"
    ],
    mcqAnswer: "Kernbegrippen herkennen, herformuleren en oefenen",
    mcqExplanation: "Doeltreffend studeren combineert begrijpen, actief onthouden en toepassen.",
    ideasQuestion: "Noem twee belangrijke ideeën uit deze les.",
    ideasAnswer: "Twee ideeën die in de samenvatting of bij de belangrijke punten staan.",
    ideasExplanation: "Deze vraag helpt je hoofdzaak en details van elkaar te onderscheiden.",
    assignmentTitle: "Geleide analyse van de les",
    assignmentInstructions: "Schrijf een gestructureerde alinea waarin je de hoofdgedachte van de les voorstelt, minstens twee belangrijke begrippen uitlegt en een precies voorbeeld gebruikt om je redenering te ondersteunen.",
    assignmentGuide: "Begin met het algemene thema. Definieer daarna twee kernbegrippen nauwkeurig. Voeg een voorbeeld toe uit de les of een passend voorbeeld bij het onderwerp. Eindig met een synthesezin die het verband tussen de begrippen toont."
  },
  ar: {
    generalSubject: "درس عام",
    higher: "التعليم العالي",
    highSchool: "الثانوي التأهيلي",
    middleSchool: "الثانوي الإعدادي",
    primary: "التعليم الابتدائي",
    fallbackTitle: (subject) => `وحدة مراجعة - ${subject}`,
    fallbackConcepts: ["المفهوم الأساسي", "الفكرة الرئيسية", "المنهجية"],
    subjectConcepts: (subject) => [subject, "مفهوم أساسي", "استدلال"],
    conceptDefinition: "عنصر مهم في الدرس يجب أن يستطيع المتعلم شرحه بكلماته وربطه بالأمثلة.",
    fallbackSummary: "يعرض الدرس مجموعة من المفاهيم المهمة التي ينبغي فهمها وحفظها واستعمالها في التمارين. الهدف هو تحديد الأفكار الرئيسية، ضبط المصطلحات الأساسية، والتدرب على شرح العلاقات بين المفاهيم.",
    fallbackBullets: [
      "تحديد الكلمات المفتاحية والتعاريف الأساسية.",
      "فهم العلاقة بين الأفكار الرئيسية.",
      "إعادة صياغة الدرس بجمل واضحة وبسيطة.",
      "التدرب بأسئلة قصيرة قبل إنجاز واجب أطول."
    ],
    explainConcept: (term) => `اشرح بكلماتك المفهوم التالي: ${term}.`,
    conceptAnswer: (term) => `الجواب الصحيح يعرّف ${term} ويربطه بوضوح بمضمون الدرس.`,
    conceptExplanation: "الهدف هو التأكد من فهم المفهوم وليس حفظه فقط.",
    trueFalseQuestion: "الأمثلة في الدرس تساعد على فهم المفاهيم الأساسية.",
    trueAnswer: "صحيح",
    trueExplanation: "المثال يجعل الفكرة أكثر وضوحا ويبين طريقة استعمالها.",
    mcqQuestion: "ما أفضل طريقة لمراجعة هذا الدرس؟",
    mcqOptions: [
      "حفظ بعض الكلمات دون فهمها",
      "تحديد المفاهيم الأساسية وإعادة صياغتها والتدرب عليها",
      "قراءة العنوان فقط"
    ],
    mcqAnswer: "تحديد المفاهيم الأساسية وإعادة صياغتها والتدرب عليها",
    mcqExplanation: "المراجعة الفعالة تجمع بين الفهم والحفظ النشط والتطبيق.",
    ideasQuestion: "اذكر فكرتين مهمتين من هذا الدرس.",
    ideasAnswer: "فكرتان موجودتان في الملخص أو ضمن النقاط المهمة.",
    ideasExplanation: "هذا السؤال يساعد على التمييز بين الأفكار الأساسية والتفاصيل.",
    assignmentTitle: "تحليل موجه للدرس",
    assignmentInstructions: "اكتب فقرة منظمة تقدم الفكرة الرئيسية للدرس، وتشرح مفهومين أساسيين على الأقل، وتستعمل مثالا دقيقا لدعم جوابك.",
    assignmentGuide: "ابدأ بتقديم الموضوع العام. عرّف بعد ذلك مفهومين أساسيين بدقة. أضف مثالا من الدرس أو مثالا مناسبا للموضوع. اختم بجملة تركيبية تبين العلاقة بين المفاهيم."
  },
  es: {
    generalSubject: "Clase general",
    higher: "Universidad / formación superior",
    highSchool: "Bachillerato",
    middleSchool: "ESO",
    primary: "Educación Primaria",
    fallbackTitle: (subject) => `Módulo de repaso - ${subject}`,
    fallbackConcepts: ["concepto principal", "idea clave", "método"],
    subjectConcepts: (subject) => [subject, "concepto clave", "razonamiento"],
    conceptDefinition: "Elemento importante de la clase que el alumno debe poder explicar con sus propias palabras y relacionar con ejemplos.",
    fallbackSummary: "La clase presenta varias ideas importantes que conviene comprender, memorizar y aplicar en ejercicios. El objetivo es identificar las ideas principales, dominar el vocabulario esencial y explicar las relaciones entre conceptos.",
    fallbackBullets: [
      "Identificar palabras clave y definiciones.",
      "Comprender las relaciones entre las ideas principales.",
      "Reformular la clase con frases claras y precisas.",
      "Practicar con preguntas cortas antes de pasar a una tarea más larga."
    ],
    explainConcept: (term) => `Explica con tus palabras el siguiente concepto: ${term}.`,
    conceptAnswer: (term) => `Una respuesta correcta define ${term} y establece una relación clara con la clase.`,
    conceptExplanation: "El objetivo es comprobar que el concepto se entiende, no solo que se memoriza.",
    trueFalseQuestion: "Los ejemplos de la clase ayudan a comprender mejor los conceptos principales.",
    trueAnswer: "Verdadero",
    trueExplanation: "Un ejemplo hace que una idea sea más concreta y muestra cómo usarla.",
    mcqQuestion: "¿Cuál es la mejor forma de repasar esta clase?",
    mcqOptions: [
      "Aprender algunas palabras sin comprenderlas",
      "Identificar conceptos clave, reformularlos y practicar",
      "Leer solo el título"
    ],
    mcqAnswer: "Identificar conceptos clave, reformularlos y practicar",
    mcqExplanation: "Un repaso eficaz combina comprensión, memorización activa y aplicación.",
    ideasQuestion: "Cita dos ideas importantes de esta clase.",
    ideasAnswer: "Dos ideas presentes en el resumen o en los puntos importantes.",
    ideasExplanation: "Esta pregunta ayuda a distinguir las ideas centrales de los detalles.",
    assignmentTitle: "Análisis guiado de la clase",
    assignmentInstructions: "Escribe un párrafo estructurado que presente la idea principal de la clase, explique al menos dos conceptos importantes y utilice un ejemplo preciso para justificar el razonamiento.",
    assignmentGuide: "Empieza presentando el tema general. Después define dos conceptos clave con precisión. Añade un ejemplo de la clase o un ejemplo coherente con el tema. Termina con una frase de síntesis que muestre la relación entre los conceptos."
  },
  it: {
    generalSubject: "Lezione generale",
    higher: "Università / istruzione superiore",
    highSchool: "Scuola secondaria di secondo grado",
    middleSchool: "Scuola secondaria di primo grado",
    primary: "Scuola primaria",
    fallbackTitle: (subject) => `Modulo di ripasso - ${subject}`,
    fallbackConcepts: ["concetto principale", "idea chiave", "metodo"],
    subjectConcepts: (subject) => [subject, "concetto chiave", "ragionamento"],
    conceptDefinition: "Elemento importante della lezione che lo studente deve saper spiegare con parole proprie e collegare agli esempi.",
    fallbackSummary: "La lezione presenta varie idee importanti da comprendere, memorizzare e riutilizzare negli esercizi. L'obiettivo è riconoscere le idee principali, padroneggiare il lessico essenziale e spiegare i collegamenti tra i concetti.",
    fallbackBullets: [
      "Individuare parole chiave e definizioni.",
      "Comprendere i collegamenti tra le idee principali.",
      "Riformulare la lezione con frasi semplici e precise.",
      "Allenarsi con domande brevi prima di passare a un compito più lungo."
    ],
    explainConcept: (term) => `Spiega con parole tue il seguente concetto: ${term}.`,
    conceptAnswer: (term) => `Una risposta corretta definisce ${term} e crea un collegamento chiaro con la lezione.`,
    conceptExplanation: "L'obiettivo è verificare che il concetto sia compreso, non solo memorizzato.",
    trueFalseQuestion: "Gli esempi della lezione aiutano a capire meglio i concetti principali.",
    trueAnswer: "Vero",
    trueExplanation: "Un esempio rende un'idea più concreta e mostra come usarla.",
    mcqQuestion: "Qual è il metodo migliore per ripassare questa lezione?",
    mcqOptions: [
      "Imparare alcune parole senza capirle",
      "Individuare i concetti chiave, riformularli ed esercitarsi",
      "Leggere solo il titolo"
    ],
    mcqAnswer: "Individuare i concetti chiave, riformularli ed esercitarsi",
    mcqExplanation: "Un ripasso efficace combina comprensione, memorizzazione attiva e applicazione.",
    ideasQuestion: "Indica due idee importanti di questa lezione.",
    ideasAnswer: "Due idee presenti nel riassunto o nei punti importanti.",
    ideasExplanation: "Questa domanda aiuta a distinguere le informazioni centrali dai dettagli.",
    assignmentTitle: "Analisi guidata della lezione",
    assignmentInstructions: "Scrivi un paragrafo strutturato che presenti l'idea principale della lezione, spieghi almeno due concetti importanti e usi un esempio preciso per giustificare il ragionamento.",
    assignmentGuide: "Inizia presentando il tema generale. Definisci poi due concetti chiave con precisione. Aggiungi un esempio tratto dalla lezione o coerente con l'argomento. Concludi con una frase di sintesi che mostri il collegamento tra i concetti."
  }
};

const levelLabels = {
  fr: {
    auto: "Auto",
    primary: "enseignement primaire - Wallonie",
    middle: "enseignement secondaire inférieur - Wallonie",
    high: "enseignement secondaire supérieur - Wallonie",
    higher: "enseignement supérieur - Wallonie"
  },
  nl: {
    auto: "Auto",
    primary: "lager onderwijs - Vlaanderen",
    middle: "secundair onderwijs eerste graad - Vlaanderen",
    high: "secundair onderwijs tweede/derde graad - Vlaanderen",
    higher: "hoger onderwijs - Vlaanderen"
  },
  ar: {
    auto: "تلقائي",
    primary: "التعليم الابتدائي - المغرب",
    middle: "الثانوي الإعدادي - المغرب",
    high: "الثانوي التأهيلي - المغرب",
    higher: "التعليم العالي - المغرب"
  },
  es: {
    auto: "Auto",
    primary: "Educación Primaria - España",
    middle: "ESO - España",
    high: "Bachillerato - España",
    higher: "Universidad / formación superior - España"
  },
  it: {
    auto: "Auto",
    primary: "Scuola primaria - Italia",
    middle: "Scuola secondaria di primo grado - Italia",
    high: "Scuola secondaria di secondo grado - Italia",
    higher: "Università / istruzione superiore - Italia"
  }
};

function normalize(text) {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

function detectSubject(text) {
  const normalized = normalize(text);
  const scored = subjectRules.map((rule) => ({
    subject: rule.subject[currentLanguage],
    score: rule.keywords.filter((keyword) => normalized.includes(normalize(keyword))).length
  }));
  scored.sort((a, b) => b.score - a.score);
  return scored[0].score > 0 ? scored[0].subject : contentText[currentLanguage].generalSubject;
}

function detectLevel(text) {
  const textForLanguage = contentText[currentLanguage];
  const localLevels = levelLabels[currentLanguage];
  if (levelSelect.value !== "auto") {
    return localLevels[levelSelect.value];
  }
  const normalized = normalize(text);
  const longWords = (text.match(/\b[\p{L}]{10,}\b/gu) || []).length;
  const sentences = text.split(/[.!?]+/).filter((item) => item.trim().length > 20).length;

  if (normalized.includes("universite") || normalized.includes("licence") || normalized.includes("master") || longWords > 35) {
    return localLevels.higher;
  }
  if (normalized.includes("terminale") || normalized.includes("premiere") || normalized.includes("seconde") || sentences > 14) {
    return localLevels.high;
  }
  if (normalized.includes("college") || normalized.includes("brevet") || text.length > 900) {
    return localLevels.middle;
  }
  return localLevels.primary;
}

function splitSentences(text) {
  return text
    .replace(/\s+/g, " ")
    .split(/(?<=[.!?])\s+/)
    .map((sentence) => sentence.trim())
    .filter((sentence) => sentence.length > 25);
}

function countWords(text) {
  return (text.trim().match(/[\p{L}\p{N}]+/gu) || []).length;
}

function estimatePages(text) {
  return Math.max(1, Math.ceil(countWords(text) / 350));
}

function updateTextStats() {
  const text = courseText.value.trim();
  if (!text) {
    textStats.textContent = "";
    textStats.classList.remove("strong");
    return;
  }

  const words = countWords(text);
  const pages = estimatePages(text);
  const copy = longCourseText[currentLanguage];
  textStats.textContent = words > 900
    ? `${copy.stats(words, pages)} · ${copy.long}`
    : copy.stats(words, pages);
  textStats.classList.toggle("strong", words > 900);
}

function chunkSentences(sentences, size) {
  const chunks = [];
  for (let index = 0; index < sentences.length; index += size) {
    chunks.push(sentences.slice(index, index + size));
  }
  return chunks;
}

function buildCourseSections(text) {
  const sentences = splitSentences(text);
  if (sentences.length < 8 && countWords(text) < 900) return [];

  const copy = longCourseText[currentLanguage];
  const targetSections = Math.min(8, Math.max(3, estimatePages(text)));
  const chunkSize = Math.max(3, Math.ceil(sentences.length / targetSections));

  return chunkSentences(sentences, chunkSize).slice(0, 8).map((chunk, index) => ({
    title: copy.sectionLabel(index + 1),
    summary: chunk.slice(0, 2).join(" "),
    key_points: chunk.slice(0, 4).map((sentence) => sentence.replace(/[.!?]$/, "."))
  }));
}

function extractTitle(text, subject) {
  const textForLanguage = contentText[currentLanguage];
  const firstLine = text
    .split(/\r?\n/)
    .map((line) => line.trim())
    .find((line) => line.length > 4 && line.length < 90);
  return firstLine || textForLanguage.fallbackTitle(subject);
}

function importantTerms(text) {
  const stopWords = new Set([
    "avec", "dans", "pour", "plus", "moins", "cette", "comme", "entre", "ainsi", "leurs", "elles", "cela",
    "cours", "texte", "partie", "exemple", "faire", "sont", "être", "avoir", "nous", "vous", "mais",
    "lequel", "laquelle", "grâce", "grace", "leurs", "notion", "idées", "idees", "belangrijk", "begrip",
    "waarbij", "worden", "eigen", "maken", "neemt", "daarbij", "ontstaan", "helpen", "uitleggen", "verbinden",
    "clase", "texto", "hacer", "tiene", "para", "como", "entre", "donde", "questo", "questa", "lezione", "testo",
    "della", "degli", "dagli", "nelle", "sono", "essere", "avere"
  ]);
  const words = normalize(text).match(/\b[a-z]{5,}\b/g) || [];
  const counts = new Map();

  words.forEach((word) => {
    if (!stopWords.has(word)) counts.set(word, (counts.get(word) || 0) + 1);
  });

  return [...counts.entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, 6)
    .map(([term]) => term);
}

function buildConcepts(text, subject) {
  const textForLanguage = contentText[currentLanguage];
  const terms = importantTerms(text);
  const fallback = subject === textForLanguage.generalSubject
    ? textForLanguage.fallbackConcepts
    : textForLanguage.subjectConcepts(subject);

  return (terms.length ? terms : fallback).slice(0, 5).map((term) => ({
    term,
    definition: textForLanguage.conceptDefinition
  }));
}

function buildSummary(text) {
  const textForLanguage = contentText[currentLanguage];
  const sentences = splitSentences(text);
  const maxSentences = revisionType.value === "short" ? 2 : 4;
  const isLong = countWords(text) > 900;
  const step = isLong ? Math.max(1, Math.floor(sentences.length / maxSentences)) : 1;
  const chosen = isLong
    ? sentences.filter((_, index) => index % step === 0).slice(0, maxSentences)
    : sentences.slice(0, maxSentences);
  if (chosen.length) return chosen.join(" ");
  return textForLanguage.fallbackSummary;
}

function buildBullets(text) {
  const textForLanguage = contentText[currentLanguage];
  const maxBullets = revisionType.value === "memo" ? 8 : revisionType.value === "short" ? 3 : 6;
  const allSentences = splitSentences(text);
  const step = countWords(text) > 900 ? Math.max(1, Math.floor(allSentences.length / maxBullets)) : 1;
  const sentences = allSentences.filter((_, index) => index % step === 0).slice(0, maxBullets);
  if (sentences.length >= 3) {
    return sentences.map((sentence) => sentence.replace(/[.!?]$/, "."));
  }
  return textForLanguage.fallbackBullets;
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function renderModule(module) {
  const text = uiText[currentLanguage];
  if (!module.basic_exercises.length) {
    friendlyOutput.textContent = module.summary.main_takeaway;
    return;
  }

  const concepts = module.summary.key_concepts
    .map((item) => `<li><strong>${escapeHtml(item.term)}</strong> : ${escapeHtml(item.definition)}</li>`)
    .join("");
  const bullets = module.summary.bullet_points
    .map((item) => `<li>${escapeHtml(item)}</li>`)
    .join("");
  const exercises = module.basic_exercises
    .map((item) => {
      const options = item.options.length
        ? `<ul>${item.options.map((option) => `<li>${escapeHtml(option)}</li>`).join("")}</ul>`
        : "";
      return `<div class="exercise"><strong>${item.id}. ${escapeHtml(item.question)}</strong>${options}<p><strong>${text.sections.answer} :</strong> ${escapeHtml(item.correct_answer)}</p><p>${escapeHtml(item.explanation)}</p></div>`;
    })
    .join("");
  const assignments = module.advanced_assignment
    .map((item) => `<div class="exercise"><strong>${item.id}. ${escapeHtml(item.title)}</strong><p>${escapeHtml(item.instructions)}</p><p><strong>${text.sections.guide} :</strong> ${escapeHtml(item.solution_guide)}</p></div>`)
    .join("");
  const sections = module.summary.course_sections?.length
    ? `
      <h3>${longCourseText[currentLanguage].sectionsTitle}</h3>
      <div class="section-list">
        ${module.summary.course_sections.map((section) => `
          <article class="section-item">
            <strong>${escapeHtml(section.title)}</strong>
            <p>${escapeHtml(section.summary)}</p>
          </article>
        `).join("")}
      </div>
    `
    : "";

  friendlyOutput.innerHTML = `
    <h2>${escapeHtml(module.summary.title)}</h2>
    <p>${escapeHtml(module.summary.main_takeaway)}</p>
    ${sections}
    <h3>${text.sections.important}</h3>
    <ul>${bullets}</ul>
    <h3>${text.sections.concepts}</h3>
    <ul>${concepts}</ul>
    <h3>${text.sections.exercises}</h3>
    ${exercises}
    <h3>${text.sections.assignment}</h3>
    ${assignments}
  `;
  studyTools.hidden = true;
  studyTools.innerHTML = "";
}

function makeModule(text) {
  const textForLanguage = contentText[currentLanguage];
  const subject = detectSubject(text);
  const level = detectLevel(text);
  const title = extractTitle(text, subject);
  const concepts = buildConcepts(text, subject);
  const words = countWords(text);
  const pages = estimatePages(text);
  const sections = buildCourseSections(text);
  const mainConcept = concepts[0]?.term || textForLanguage.fallbackConcepts[0];

  return {
    detected_level: level,
    subject,
    source_stats: {
      word_count: words,
      estimated_pages: pages,
      is_long_course: words > 900
    },
    summary: {
      title,
      main_takeaway: buildSummary(text),
      key_concepts: concepts,
      bullet_points: buildBullets(text),
      course_sections: sections
    },
    basic_exercises: [
      {
        id: 1,
        type: "short_answer",
        question: textForLanguage.explainConcept(mainConcept),
        options: [],
        correct_answer: textForLanguage.conceptAnswer(mainConcept),
        explanation: textForLanguage.conceptExplanation
      },
      {
        id: 2,
        type: "true_false",
        question: textForLanguage.trueFalseQuestion,
        options: [],
        correct_answer: textForLanguage.trueAnswer,
        explanation: textForLanguage.trueExplanation
      },
      {
        id: 3,
        type: "mcq",
        question: textForLanguage.mcqQuestion,
        options: textForLanguage.mcqOptions,
        correct_answer: textForLanguage.mcqAnswer,
        explanation: textForLanguage.mcqExplanation
      },
      {
        id: 4,
        type: "short_answer",
        question: textForLanguage.ideasQuestion,
        options: [],
        correct_answer: textForLanguage.ideasAnswer,
        explanation: textForLanguage.ideasExplanation
      }
    ].slice(0, revisionType.value === "short" ? 3 : revisionType.value === "quiz" ? 5 : 4),
    advanced_assignment: [
      {
        id: 1,
        title: textForLanguage.assignmentTitle,
        instructions: textForLanguage.assignmentInstructions,
        solution_guide: textForLanguage.assignmentGuide
      }
    ]
  };
}

function applyLanguage(language) {
  currentLanguage = language;
  const text = uiText[currentLanguage];

  document.documentElement.lang = text.htmlLang;
  document.documentElement.dir = text.dir;
  appEyebrow.textContent = text.appEyebrow;
  appTitle.textContent = text.appTitle;
  languageLabel.textContent = text.languageLabel;
  copyButton.textContent = text.copy;
  copyButton.title = text.copy;
  textMode.textContent = text.textMode;
  imageMode.textContent = text.imageMode;
  scanImageLabel.textContent = text.scanImageLabel;
  extractText.textContent = text.extractText;
  courseTextLabel.textContent = text.courseTextLabel;
  courseText.placeholder = text.placeholder;
  generateButton.textContent = text.generate;
  clearButton.textContent = text.clear;
  courseLanguageLabel.textContent = text.courseLanguageLabel;
  levelSelectLabel.textContent = text.levelSelectLabel;
  revisionTypeLabel.textContent = text.revisionTypeLabel;
  saveCourse.textContent = text.save;
  exportPdf.textContent = text.exportPdf;
  speakSummary.textContent = text.audio;
  showFlashcards.textContent = text.flashcards;
  startQuiz.textContent = text.quiz;
  savedTitle.textContent = text.savedTitle;
  jsonSummary.textContent = text.jsonSummary;
  updateOptionLabels();
  updateTextStats();
  renderSavedCourses();

  if (!selectedImages.length) {
    imagePreview.classList.add("empty");
    imagePreview.innerHTML = `<span>${text.noImage}</span>`;
  } else {
    renderImagePreview();
  }

  if (!currentJson) {
    levelBadge.textContent = text.levelPending;
    subjectBadge.textContent = text.subjectPending;
    friendlyOutput.textContent = text.emptyOutput;
    jsonOutput.textContent = text.jsonPending;
    return;
  }

  const existingText = courseText.value.trim();
  if (existingText) {
    currentJson = makeModule(existingText);
    levelBadge.textContent = currentJson.detected_level;
    subjectBadge.textContent = currentJson.subject;
    jsonOutput.textContent = JSON.stringify(currentJson, null, 2);
    renderModule(currentJson);
  }
}

function updateOptionLabels() {
  const options = {
    courseLanguage: {
      fr: ["Auto", "Français", "Néerlandais", "Arabe", "Espagnol", "Italien", "Anglais"],
      nl: ["Auto", "Frans", "Nederlands", "Arabisch", "Spaans", "Italiaans", "Engels"],
      ar: ["تلقائي", "الفرنسية", "الهولندية", "العربية", "الإسبانية", "الإيطالية", "الإنجليزية"],
      es: ["Auto", "Francés", "Neerlandés", "Árabe", "Español", "Italiano", "Inglés"],
      it: ["Auto", "Francese", "Olandese", "Arabo", "Spagnolo", "Italiano", "Inglese"]
    }[currentLanguage],
    levelSelect: [
      levelLabels[currentLanguage].auto,
      levelLabels[currentLanguage].primary,
      levelLabels[currentLanguage].middle,
      levelLabels[currentLanguage].high,
      levelLabels[currentLanguage].higher
    ],
    revisionType: {
      fr: ["Module complet", "Résumé court", "Fiche mémo", "Quiz rapide"],
      nl: ["Volledige module", "Korte samenvatting", "Memofiche", "Snelle quiz"],
      ar: ["وحدة كاملة", "ملخص قصير", "بطاقة مراجعة", "اختبار سريع"],
      es: ["Módulo completo", "Resumen corto", "Ficha de repaso", "Quiz rápido"],
      it: ["Modulo completo", "Riassunto breve", "Scheda memo", "Quiz rapido"]
    }[currentLanguage]
  };

  [...courseLanguage.options].forEach((option, index) => {
    option.textContent = options.courseLanguage[index];
  });
  [...levelSelect.options].forEach((option, index) => {
    option.textContent = options.levelSelect[index];
  });
  [...revisionType.options].forEach((option, index) => {
    option.textContent = options.revisionType[index];
  });
}

function setToolButtons(enabled) {
  toolstrip.hidden = !enabled;
  [copyButton, saveCourse, exportPdf, speakSummary, showFlashcards, startQuiz].forEach((button) => {
    button.disabled = !enabled;
  });
}

generateButton.addEventListener("click", () => {
  const textForUi = uiText[currentLanguage];
  const text = courseText.value.trim();
  if (!text) {
    currentJson = {
      detected_level: textForUi.noLevel,
      subject: textForUi.noSubject,
      summary: {
        title: textForUi.emptyTitle,
        main_takeaway: textForUi.emptyTakeaway,
        key_concepts: [],
        bullet_points: []
      },
      basic_exercises: [],
      advanced_assignment: []
    };
  } else {
    currentJson = makeModule(text);
  }

  levelBadge.textContent = currentJson.detected_level;
  subjectBadge.textContent = currentJson.subject;
  jsonOutput.textContent = JSON.stringify(currentJson, null, 2);
  renderModule(currentJson);
  setToolButtons(Boolean(text));
});

clearButton.addEventListener("click", () => {
  const text = uiText[currentLanguage];
  courseText.value = "";
  scanImage.value = "";
  selectedImages = [];
  currentJson = null;
  levelBadge.textContent = text.levelPending;
  subjectBadge.textContent = text.subjectPending;
  imagePreview.classList.add("empty");
  imagePreview.innerHTML = `<span>${text.noImage}</span>`;
  ocrStatus.textContent = "";
  extractText.disabled = true;
  friendlyOutput.textContent = text.emptyOutput;
  jsonOutput.textContent = text.jsonPending;
  setToolButtons(false);
  studyTools.hidden = true;
  studyTools.innerHTML = "";
});

copyButton.addEventListener("click", async () => {
  if (!currentJson) return;
  await navigator.clipboard.writeText(JSON.stringify(currentJson, null, 2));
  copyButton.textContent = uiText[currentLanguage].copied;
  window.setTimeout(() => {
    copyButton.textContent = uiText[currentLanguage].copy;
  }, 1200);
});

languageSelect.addEventListener("change", () => {
  applyLanguage(languageSelect.value);
});

textMode.addEventListener("click", () => {
  textMode.classList.add("active");
  imageMode.classList.remove("active");
  imageTools.hidden = true;
  imageTools.style.display = "none";
});

imageMode.addEventListener("click", () => {
  imageMode.classList.add("active");
  textMode.classList.remove("active");
  imageTools.hidden = false;
  imageTools.style.display = "";
});

scanImage.addEventListener("change", () => {
  selectedImages = Array.from(scanImage.files || []);
  extractText.disabled = !selectedImages.length;
  ocrStatus.textContent = "";

  if (!selectedImages.length) {
    imagePreview.classList.add("empty");
    imagePreview.innerHTML = `<span>${uiText[currentLanguage].noImage}</span>`;
    return;
  }

  renderImagePreview();
});

extractText.addEventListener("click", async () => {
  if (!selectedImages.length) return;

  if (!window.Tesseract) {
    ocrStatus.textContent = uiText[currentLanguage].ocrNeedsNet;
    return;
  }

  extractText.disabled = true;
  ocrStatus.textContent = uiText[currentLanguage].ocrReading;

  try {
    const extractedTexts = [];
    const languageMap = {
      auto: "fra+nld+ara+spa+ita+eng",
      fra: "fra",
      nld: "nld",
      ara: "ara",
      spa: "spa",
      ita: "ita",
      eng: "eng"
    };
    for (let index = 0; index < selectedImages.length; index += 1) {
      const image = selectedImages[index];
      const result = await Tesseract.recognize(image, languageMap[courseLanguage.value], {
        logger: (message) => {
          if (message.status === "recognizing text" && message.progress) {
            const page = `${index + 1}/${selectedImages.length}`;
            ocrStatus.textContent = `${uiText[currentLanguage].ocrProgress} ${page} : ${Math.round(message.progress * 100)} %`;
          }
        }
      });
      extractedTexts.push(result.data.text.trim());
    }
    courseText.value = extractedTexts.filter(Boolean).join("\n\n");
    updateTextStats();
    ocrStatus.textContent = uiText[currentLanguage].ocrDone;
  } catch (error) {
    ocrStatus.textContent = uiText[currentLanguage].ocrFail;
  } finally {
    extractText.disabled = false;
  }
});

applyLanguage(currentLanguage);
imageTools.style.display = "none";
renderSavedCourses();
courseText.addEventListener("input", updateTextStats);

function renderImagePreview() {
  const text = uiText[currentLanguage];
  imagePreview.classList.remove("empty");
  imagePreview.innerHTML = selectedImages
    .map((image, index) => {
      const imageUrl = URL.createObjectURL(image);
      return `
        <div class="scan-thumb">
          <img src="${imageUrl}" alt="${text.pageLabel(index + 1)}" />
          <span>${text.pageLabel(index + 1)}</span>
        </div>
      `;
    })
    .join("");
  ocrStatus.textContent = text.selectedImages(selectedImages.length);
}

saveCourse.addEventListener("click", () => {
  if (!currentJson) return;
  const saved = getSavedCourses();
  saved.unshift({
    id: Date.now(),
    title: currentJson.summary.title,
    subject: currentJson.subject,
    level: currentJson.detected_level,
    language: currentLanguage,
    sourceText: courseText.value,
    module: currentJson
  });
  localStorage.setItem(storageKey, JSON.stringify(saved.slice(0, 20)));
  saveCourse.textContent = uiText[currentLanguage].saved;
  window.setTimeout(() => {
    saveCourse.textContent = uiText[currentLanguage].save;
  }, 1200);
  renderSavedCourses();
});

exportPdf.addEventListener("click", () => {
  if (!currentJson) return;
  window.print();
});

speakSummary.addEventListener("click", () => {
  if (!currentJson || !("speechSynthesis" in window)) return;
  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(currentJson.summary.main_takeaway);
  const speechLang = {
    fr: "fr-BE",
    nl: "nl-BE",
    ar: "ar-MA",
    es: "es-ES",
    it: "it-IT"
  };
  utterance.lang = speechLang[currentLanguage];
  window.speechSynthesis.speak(utterance);
});

showFlashcards.addEventListener("click", () => {
  if (!currentJson) return;
  const text = uiText[currentLanguage];
  studyTools.hidden = false;
  studyTools.innerHTML = `
    <h3>${text.sections.flashcards}</h3>
    <div class="flashcard-list">
      ${currentJson.summary.key_concepts.map((concept, index) => `
        <article class="flashcard">
          <strong>${escapeHtml(concept.term)}</strong>
          <p id="flashcard-${index}" hidden>${escapeHtml(concept.definition)}</p>
          <button class="secondary" type="button" data-flashcard="${index}">${text.sections.showAnswer}</button>
        </article>
      `).join("")}
    </div>
  `;
});

startQuiz.addEventListener("click", () => {
  if (!currentJson) return;
  const text = uiText[currentLanguage];
  studyTools.hidden = false;
  studyTools.innerHTML = `
    <h3>${text.sections.quiz}</h3>
    <div class="quiz-list">
      ${currentJson.basic_exercises.map((exercise, index) => `
        <article class="quiz-card">
          <strong>${index + 1}. ${escapeHtml(exercise.question)}</strong>
          <input type="text" data-quiz="${index}" placeholder="${escapeHtml(text.sections.answer)}" />
          <button class="secondary" type="button" data-check="${index}">${text.sections.check}</button>
          <p id="quiz-result-${index}" aria-live="polite"></p>
        </article>
      `).join("")}
    </div>
  `;
});

studyTools.addEventListener("click", (event) => {
  const flashcardButton = event.target.closest("[data-flashcard]");
  if (flashcardButton) {
    const id = flashcardButton.dataset.flashcard;
    const answer = document.getElementById(`flashcard-${id}`);
    answer.hidden = !answer.hidden;
    flashcardButton.textContent = answer.hidden
      ? uiText[currentLanguage].sections.showAnswer
      : uiText[currentLanguage].sections.hideAnswer;
    return;
  }

  const quizButton = event.target.closest("[data-check]");
  if (quizButton) {
    const index = Number(quizButton.dataset.check);
    const input = studyTools.querySelector(`[data-quiz="${index}"]`);
    const result = document.getElementById(`quiz-result-${index}`);
    const expected = normalize(currentJson.basic_exercises[index].correct_answer);
    const given = normalize(input.value);
    const correct = given && (expected.includes(given) || given.includes(expected.split(" ")[0]));
    result.textContent = correct
      ? "Correct."
      : `${uiText[currentLanguage].sections.answer} : ${currentJson.basic_exercises[index].correct_answer}`;
  }
});

savedCourses.addEventListener("click", (event) => {
  const loadButton = event.target.closest("[data-load]");
  const removeButton = event.target.closest("[data-remove]");

  if (loadButton) {
    const item = getSavedCourses().find((course) => String(course.id) === loadButton.dataset.load);
    if (!item) return;
    languageSelect.value = item.language;
    applyLanguage(item.language);
    courseText.value = item.sourceText;
    currentJson = item.module;
    levelBadge.textContent = currentJson.detected_level;
    subjectBadge.textContent = currentJson.subject;
    jsonOutput.textContent = JSON.stringify(currentJson, null, 2);
    renderModule(currentJson);
    setToolButtons(true);
  }

  if (removeButton) {
    const filtered = getSavedCourses().filter((course) => String(course.id) !== removeButton.dataset.remove);
    localStorage.setItem(storageKey, JSON.stringify(filtered));
    renderSavedCourses();
  }
});

function getSavedCourses() {
  try {
    return JSON.parse(localStorage.getItem(storageKey) || "[]");
  } catch {
    return [];
  }
}

function renderSavedCourses() {
  const text = uiText[currentLanguage];
  const saved = getSavedCourses();
  if (!saved.length) {
    savedCourses.innerHTML = `<p>${text.noSaved}</p>`;
    return;
  }

  savedCourses.innerHTML = saved.map((course) => `
    <article class="saved-item">
      <strong>${escapeHtml(course.title)}</strong>
      <span>${escapeHtml(course.subject)} · ${escapeHtml(course.level)}</span>
      <div>
        <button class="secondary" type="button" data-load="${course.id}">${text.load}</button>
        <button class="secondary" type="button" data-remove="${course.id}">${text.remove}</button>
      </div>
    </article>
  `).join("");
}
