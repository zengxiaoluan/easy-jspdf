export function getColorValues(color: string): [string, string, string] {
  const colors: { [key: string]: [number, number, number] } = {
    red: [255, 0, 0],
    green: [0, 128, 0],
    blue: [0, 0, 255],
    white: [255, 255, 255],
    black: [0, 0, 0],
    yellow: [255, 255, 0],
    cyan: [0, 255, 255],
    magenta: [255, 0, 255],
    gray: [128, 128, 128],
    lightgray: [211, 211, 211],
    darkgray: [169, 169, 169],
    orange: [255, 165, 0],
    lime: [0, 255, 0],
    purple: [128, 0, 128],
    brown: [165, 42, 42],
    pink: [255, 192, 203],
    aqua: [0, 255, 255],
    navy: [0, 0, 128],
    teal: [0, 128, 128],
    olive: [128, 128, 0],
  };

  let arr = colors[color.toLowerCase()] || [0, 0, 0];
  return rgbToPdfColor.apply(null, arr);
}

export function rgbToPdfColor(
  r: number,
  g: number,
  b: number
): [string, string, string] {
  const red = (r / 255).toFixed(3);
  const green = (g / 255).toFixed(3);
  const blue = (b / 255).toFixed(3);
  return [red, green, blue];
}
