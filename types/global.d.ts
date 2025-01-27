declare global {
  interface String {
    convertURI(internal?: boolean): string;
    trimHTML(): string;
  }

  interface Number {
    getWeight(): string;
    getHeight(): string;
  }
}

export {};
