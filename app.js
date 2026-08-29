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

let currentJson = null;
let selectedImage = null;
let currentLanguage = "fr";

const uiText = {
  fr: {
    htmlLang: "fr",
    appEyebrow: "Application éducative",
    appTitle: "Assistant de révision",
    languageLabel: "Langue",
    copy: "Copier",
    copied: "Copié",
    textMode: "Coller le texte",
    imageMode: "Photo du cours",
    scanImageLabel: "Image scannée avec le téléphone",
    noImage: "Aucune image sélectionnée",
    extractText: "Lire le texte de l'image",
    courseTextLabel: "Texte du cours",
    placeholder: "Colle ici le texte du cours, ou utilise une photo pour remplir ce champ automatiquement...",
    generate: "Générer le module",
    clear: "Effacer",
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
      guide: "Guide"
    },
    ocrNeedsNet: "La lecture d'image nécessite une connexion internet au premier chargement.",
    ocrReading: "Lecture du texte en cours...",
    ocrProgress: "Lecture du texte",
    ocrDone: "Texte lu. Tu peux vérifier rapidement puis générer le module.",
    ocrFail: "Impossible de lire cette image. Essaie une photo plus nette ou colle le texte."
  },
  nl: {
    htmlLang: "nl",
    appEyebrow: "Educatieve applicatie",
    appTitle: "Studie-assistent",
    languageLabel: "Taal",
    copy: "Kopiëren",
    copied: "Gekopieerd",
    textMode: "Tekst plakken",
    imageMode: "Foto van de les",
    scanImageLabel: "Gescande afbeelding met de telefoon",
    noImage: "Geen afbeelding geselecteerd",
    extractText: "Tekst uit de afbeelding lezen",
    courseTextLabel: "Lestekst",
    placeholder: "Plak hier de tekst van de les, of gebruik een foto om dit veld automatisch te vullen...",
    generate: "Module maken",
    clear: "Wissen",
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
      guide: "Handleiding"
    },
    ocrNeedsNet: "Afbeeldingen lezen vereist internet bij de eerste keer laden.",
    ocrReading: "Tekst wordt gelezen...",
    ocrProgress: "Tekst lezen",
    ocrDone: "Tekst gelezen. Je kunt hem kort controleren en daarna de module maken.",
    ocrFail: "Deze afbeelding kon niet gelezen worden. Probeer een scherpere foto of plak de tekst."
  }
};

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("./sw.js").catch(() => {});
  });
}

const subjectRules = [
  {
    subject: { fr: "Histoire-géographie", nl: "Geschiedenis-aardrijkskunde" },
    keywords: ["révolution", "guerre", "empire", "frontière", "carte", "territoire", "population", "siècle", "colonisation"]
  },
  {
    subject: { fr: "Sciences", nl: "Wetenschappen" },
    keywords: ["cellule", "énergie", "molécule", "expérience", "hypothèse", "organisme", "réaction", "force", "vitesse"]
  },
  {
    subject: { fr: "Mathématiques", nl: "Wiskunde" },
    keywords: ["équation", "fonction", "triangle", "probabilité", "dérivée", "fraction", "angle", "théorème", "calcul"]
  },
  {
    subject: { fr: "Français / littérature", nl: "Frans / literatuur" },
    keywords: ["auteur", "narrateur", "poème", "roman", "figure de style", "texte", "argumentation", "champ lexical"]
  },
  {
    subject: { fr: "Économie / gestion", nl: "Economie / beheer" },
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
  const normalized = normalize(text);
  const longWords = (text.match(/\b[\p{L}]{10,}\b/gu) || []).length;
  const sentences = text.split(/[.!?]+/).filter((item) => item.trim().length > 20).length;

  if (normalized.includes("universite") || normalized.includes("licence") || normalized.includes("master") || longWords > 35) {
    return textForLanguage.higher;
  }
  if (normalized.includes("terminale") || normalized.includes("premiere") || normalized.includes("seconde") || sentences > 14) {
    return textForLanguage.highSchool;
  }
  if (normalized.includes("college") || normalized.includes("brevet") || text.length > 900) {
    return textForLanguage.middleSchool;
  }
  return textForLanguage.primary;
}

function splitSentences(text) {
  return text
    .replace(/\s+/g, " ")
    .split(/(?<=[.!?])\s+/)
    .map((sentence) => sentence.trim())
    .filter((sentence) => sentence.length > 25);
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
    "waarbij", "worden", "eigen", "maken", "neemt", "daarbij", "ontstaan", "helpen", "uitleggen", "verbinden"
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
  const chosen = sentences.slice(0, 4);
  if (chosen.length) return chosen.join(" ");
  return textForLanguage.fallbackSummary;
}

function buildBullets(text) {
  const textForLanguage = contentText[currentLanguage];
  const sentences = splitSentences(text).slice(0, 6);
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

  friendlyOutput.innerHTML = `
    <h2>${escapeHtml(module.summary.title)}</h2>
    <p>${escapeHtml(module.summary.main_takeaway)}</p>
    <h3>${text.sections.important}</h3>
    <ul>${bullets}</ul>
    <h3>${text.sections.concepts}</h3>
    <ul>${concepts}</ul>
    <h3>${text.sections.exercises}</h3>
    ${exercises}
    <h3>${text.sections.assignment}</h3>
    ${assignments}
  `;
}

function makeModule(text) {
  const textForLanguage = contentText[currentLanguage];
  const subject = detectSubject(text);
  const level = detectLevel(text);
  const title = extractTitle(text, subject);
  const concepts = buildConcepts(text, subject);
  const mainConcept = concepts[0]?.term || textForLanguage.fallbackConcepts[0];

  return {
    detected_level: level,
    subject,
    summary: {
      title,
      main_takeaway: buildSummary(text),
      key_concepts: concepts,
      bullet_points: buildBullets(text)
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
    ],
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
  jsonSummary.textContent = text.jsonSummary;

  if (!selectedImage) {
    imagePreview.innerHTML = `<span>${text.noImage}</span>`;
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
  copyButton.disabled = false;
});

clearButton.addEventListener("click", () => {
  const text = uiText[currentLanguage];
  courseText.value = "";
  scanImage.value = "";
  selectedImage = null;
  currentJson = null;
  levelBadge.textContent = text.levelPending;
  subjectBadge.textContent = text.subjectPending;
  imagePreview.innerHTML = `<span>${text.noImage}</span>`;
  ocrStatus.textContent = "";
  extractText.disabled = true;
  friendlyOutput.textContent = text.emptyOutput;
  jsonOutput.textContent = text.jsonPending;
  copyButton.disabled = true;
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
  selectedImage = scanImage.files?.[0] || null;
  extractText.disabled = !selectedImage;
  ocrStatus.textContent = "";

  if (!selectedImage) {
    imagePreview.innerHTML = `<span>${uiText[currentLanguage].noImage}</span>`;
    return;
  }

  const imageUrl = URL.createObjectURL(selectedImage);
  imagePreview.innerHTML = `<img src="${imageUrl}" alt="Aperçu du cours scanné" />`;
});

extractText.addEventListener("click", async () => {
  if (!selectedImage) return;

  if (!window.Tesseract) {
    ocrStatus.textContent = uiText[currentLanguage].ocrNeedsNet;
    return;
  }

  extractText.disabled = true;
  ocrStatus.textContent = uiText[currentLanguage].ocrReading;

  try {
    const result = await Tesseract.recognize(selectedImage, "fra+nld+eng", {
      logger: (message) => {
        if (message.status === "recognizing text" && message.progress) {
          ocrStatus.textContent = `${uiText[currentLanguage].ocrProgress} : ${Math.round(message.progress * 100)} %`;
        }
      }
    });
    courseText.value = result.data.text.trim();
    ocrStatus.textContent = uiText[currentLanguage].ocrDone;
  } catch (error) {
    ocrStatus.textContent = uiText[currentLanguage].ocrFail;
  } finally {
    extractText.disabled = false;
  }
});

applyLanguage(currentLanguage);
imageTools.style.display = "none";
