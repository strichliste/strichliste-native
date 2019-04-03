const baseTheme = {
  base: 16,
  borderRadius: 4
};

export const lightTheme = {
  ...baseTheme,
  border: "#E5E6E5",
  componentBackgroundDark: "#fff",
  componentBackgroundLight: "#fff",
  green: "#63C658",
  greenHover: "#B3E5BB",
  greenLight: "#CFE9D1",
  greenText: "#63C658",
  mainBackground: "#f2f3f2",
  primary: "#28333D",
  red: "#D16069",
  redHover: "#f3b4bb",
  redLight: "#ffdce0",
  redText: "#D16069",
  text: "#343434",
  textSubtile: "#bababa",
  buttonCancelFont: "#ffedf0",
  buttonCancelBackground: "#E86C76",
  buttonAcceptFont: "#e8eaeb",
  buttonAcceptBackground: "#213440",
  buttonGreenBackground: "#cbf5d7",
  buttonGreenFont: "#00cc1d",
  buttonRedBackground: "#ffdce0",
  buttonRedFont: "#f54963",
  buttonDefaultBackground: "#fff",
  buttonDefaultFont: "#58697d",
  buttonDisabled: "#bababa"
};

export const darkTheme = {
  ...baseTheme,
  border: "#f3f4f3",
  componentBackgroundDark: "#1d2832",
  componentBackgroundLight: "#2E3D4D",
  green: "#C2FFCD",
  greenHover: "#1E4B3D",
  greenLight: "#2B584A",
  greenText: "#C2FFCD",
  hover: "#47525A",
  mainBackground: "#25333F",
  primary: "#fff",
  red: "#FFBAC2",
  redHover: "#443444",
  redLight: "#514151",
  redText: "#FFBAC2",
  text: "#fdfdfd",
  textSubtile: "#59687c",
  themedWhite: "#1d2832",
  buttonCancelFont: "#ffedf0",
  buttonCancelBackground: "#f54963",
  buttonAcceptFont: "#353535",
  buttonAcceptBackground: "#f2f3f2",
  buttonGreenBackground: "#155949",
  buttonGreenFont: "#00cc1d",
  buttonRedBackground: "#544052",
  buttonRedFont: "#f54963",
  buttonDefaultBackground: "#2a3e4f",
  buttonDefaultFont: "#eaebed",
  defaultFillColor: "#e9ebec"
};

export const getTheme = (hasDarkMode = false) =>
  hasDarkMode ? darkTheme : lightTheme;
