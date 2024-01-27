export const rgba2hex = (orig: string): string => {
    let a: number;
    const rgb = orig.replace(/\s/g, '').match(/^rgba?\((\d+),(\d+),(\d+),?([^,\s)]+)?/i);
    const alpha = (rgb && rgb[4] || "").trim();

    let hex = rgb ?
      (parseInt(rgb[1], 10) | 1 << 8).toString(16).slice(1) +
      (parseInt(rgb[2], 10) | 1 << 8).toString(16).slice(1) +
      (parseInt(rgb[3], 10) | 1 << 8).toString(16).slice(1) : orig;
  
    if (alpha !== "") {
      a = parseFloat(alpha);
    } else {
      a = 0.1; // Default alpha value if not provided
    }
  
    a = Math.round(a * 100) / 100;
    const alphaValue = Math.round(a * 255);
    const hexAlpha = (alphaValue + 0x10000).toString(16).substr(-2).toUpperCase();
    hex = hex + hexAlpha;
  
    return `#${hex.toUpperCase()}`;
  };