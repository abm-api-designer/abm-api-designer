export function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export function resetArray(data: any[]) {
  data.splice(0, data.length);
}
