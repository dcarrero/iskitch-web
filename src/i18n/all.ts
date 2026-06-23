// Diccionario de todas las traducciones, indexado por código de idioma.
// Lo usan las rutas dinámicas del blog para elegir el JSON según el idioma.
import en from "./en.json";
import es from "./es.json";
import fr from "./fr.json";
import de from "./de.json";
import it from "./it.json";
import pt from "./pt.json";
import ja from "./ja.json";
import ko from "./ko.json";

export const DICT: Record<string, any> = { en, es, fr, de, it, pt, ja, ko };
