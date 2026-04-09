function normalizeArabicInput(content) {
  return content
    .trim()
    .replace(/\s+/g, " ")
    .replace(/[أإآ]/g, "ا")
    .replace(/ة/g, "ه")
    .replace(/ى/g, "ي");
}

module.exports = { normalizeArabicInput };