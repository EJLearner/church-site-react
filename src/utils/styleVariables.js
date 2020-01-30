const FONT_FAMILIES = {
  ARIAL: 'arial, helvetica, sans_serif',
  ARIAL_COND:
    "'arial nova cond light', 'arial nova cond', arial, helvetica, sans_serif",
  BRUSH_SCRIPT: "'Brush Script MT', cursive",
  CALIBRI: "Calibri, 'Segoe UI', Candara, Segoe, Optima, Arial, sans_serif",
  CAMBRIA: "cambria, georgia, 'bookman old style', 'times new roman', serif",
  CENTURY_GOTHIC: "'Century Gothic', CenturyGothic, AppleGothic, sans_serif",
  GARAMOND:
    "'Adobe Garamond Pro', Garamond, Baskerville, 'Baskerville Old Face'," +
    "'Hoefler Text', 'Times New Roman', serif"
};
const COLORS = {
  GREEN_20: 'rgb(146, 208, 80)',
  GREEN_50: 'rgb(115, 175, 85)',
  GREEN_80: 'rgb(102, 158, 74)',
  ORANGE: 'orange',
  PEACH: 'rgb(255, 230, 149)',
  GRAY41: 'rgb(41, 41, 41)',
  GRAY63: 'rgb(63, 63, 63)',
  GRAY77: 'rgb(77, 77, 77)',
  GRAY83: 'rgb(83, 83, 83)',
  GRAY95: '#5f5f5f',
  GRAY180: 'rgb(180, 180, 180)',
  GRAY217: 'rgb(217, 217, 217)',
  LIGHT_BLUE: '#5b9bd5',
  LIGHTER_BLUE: 'rgb(190,215,239)',
  BLACK: 'black',
  WHITE: 'white',
  RED: 'red',
  YELLOW: 'yellow',
  MAROON: '#C00000',
  GREEN: 'green',
  GRAY: 'gray'
};

const LOGICAL_COLORS = {
  STANDARD_BACKGROUND: COLORS.WHITE,
  STANDARD_TEXT: COLORS.BLACK,
  CT_PRIMARY: COLORS.MAROON,
  CT_TEXT_ON_PRIMARY: COLORS.WHITE,
  CT_TEXT_ON_SECONDARY: COLORS.WHITE,
  CT_TEXT_ON_DARK: COLORS.WHITE,
  CT_ACCENT: '#00bae2',
  CT_LIGHTENED_ACCENT: '#bff3ff',
  CT_SECOND: '#ff9b71',
  CT_THIRD: '#d2b48c'
};

const STYLES = {
  FONT_FAMILIES: FONT_FAMILIES,
  COLORS: COLORS,
  LOGICAL_COLORS: LOGICAL_COLORS
};

const WIDTHS = {
  SIDE_CONTENT_PADDING: '64px'
};

export {FONT_FAMILIES, COLORS, LOGICAL_COLORS, WIDTHS};
export default STYLES;
