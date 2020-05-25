/**
 * ColorConsole
 */

const COLOR: { [key: string]: string } = {
  red: "#B71C1C",
  blue: "#2962FF",
  yellow: "#F9A825",
  green: "#2E7D32"
};

function consoleFactory(color: string) {
  return (message: string | string) => {
    console.log(`%c ${message}`, `color:${COLOR[color]}`);
  };
}

export const ColorConsole = {
  red: consoleFactory("red"),
  blue: consoleFactory("blue"),
  yellow: consoleFactory("yellow"),
  green: consoleFactory("green"),

  error: consoleFactory("red"),
  success: consoleFactory("green"),
  warn: consoleFactory("yellow")
};

export default ColorConsole;
