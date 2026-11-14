/** Extract only an English entry heading on the three textbook glossary routes. */
export function glossarySpeechText(pathname, heading) {
  if (!/\/docs\/(?:nccer-core|electrical\/level-1|hvacr\/level-1)\/glossary\/?$/.test(pathname)) return null;
  if (!/[:：]$/.test(heading.trim())) return null;
  const term = heading.trim().replace(/[:：]$/, '').trim();
  if (/[\u3400-\u9fff]/.test(term)) {
    const english = term.match(/（([^（）]+)）$/)?.[1];
    return english && !/[\u3400-\u9fff]/.test(english) ? english : null;
  }
  return term || null;
}
