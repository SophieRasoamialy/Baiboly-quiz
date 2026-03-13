import * as Localization from "expo-localization";
import { I18n } from "i18n-js";

const translations = {
  mg: {
    welcome: "Tongasoa ato amin'ny Baiboly Quiz",
    play: "Hilalao",
    solo: "Solo",
    multiplayer: "Maromaro",
    settings: "Fikirana",
    profile: "Piraofily",
    score: "Isa",
    gems: "Vato soa",
    hearts: "Fo",
    buyHearts: "Hividy fo",
    hint: "Soso-kevitra",
    correct: "Marina!",
    wrong: "Diso!",
    next: "Manaraka",
    finish: "Vita",
    back: "Miverina",
    language: "Fiteny",
    malagasy: "Malagasy",
    french: "Frantsay",
    selectLanguage: "Misafidiana fiteny",
  },
  fr: {
    welcome: "Bienvenue sur Baiboly Quiz",
    play: "Jouer",
    solo: "Solo",
    multiplayer: "Multijoueur",
    settings: "Paramètres",
    profile: "Profil",
    score: "Score",
    gems: "Gemmes",
    hearts: "Vies",
    buyHearts: "Acheter des vies",
    hint: "Indice",
    correct: "Correct!",
    wrong: "Faux!",
    next: "Suivant",
    finish: "Terminer",
    back: "Retour",
    language: "Langue",
    malagasy: "Malgache",
    french: "Français",
    selectLanguage: "Choisir la langue",
  },
};

const i18n = new I18n(translations);

i18n.locale = Localization.getLocales()[0].languageCode ?? "mg";
i18n.enableFallback = true;
i18n.defaultLocale = "mg";

export default i18n;
