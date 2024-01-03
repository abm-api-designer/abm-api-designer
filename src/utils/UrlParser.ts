const CURLY_BRACES_REGEX = /\{([^{}]+)\}/g;

export function parseUrl(value: string): string[] {
  const foundMatches = value.match(CURLY_BRACES_REGEX);
  const placeholders: string[] = [];
  if (foundMatches) {
    foundMatches.forEach((item) => {
      const valueWithin = item.substring(1, item.length - 1);
      placeholders.push(valueWithin);
    });
  }
  return placeholders;
}
