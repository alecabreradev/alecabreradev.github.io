/**
 * Splits a text with ==highlighted== parts into pieces.
 * "I build ==web apps== fast" → [{text:"I build "}, {text:"web apps", marked:true}, {text:" fast"}]
 */
export function parseMarks(text) {
  return text
    .split(/(==[^=]+==)/)
    .filter(Boolean)
    .map((part) =>
      part.startsWith("==") && part.endsWith("==") && part.length > 4
        ? { text: part.slice(2, -2), marked: true }
        : { text: part, marked: false },
    );
}

/** Removes the ==markers== (for keys, titles and other plain-text uses). */
export function stripMarks(text) {
  return text.replace(/==([^=]+)==/g, "$1");
}
