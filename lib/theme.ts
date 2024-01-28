// theme.ts

// 1. import `extendTheme` function
import { extendTheme, type ThemeConfig, theme as chakraTheme } from "@chakra-ui/react";
import { defineStyleConfig } from "@chakra-ui/react";

// 2. Add your color mode config
const config: ThemeConfig = {
  initialColorMode: "dark",
  useSystemColorMode: false,
};

const Button = defineStyleConfig({
  // The styles all button have in common
  baseStyle: {
    borderRadius: "var(--rounded-btn)", // <-- border radius is same for all variants and sizes
  },
  // Two sizes: sm and md
});

const Badge = defineStyleConfig({
  baseStyle: {
    borderRadius: "0.5em",
    display: "flex",
    letterSpacing: "0.1em",
    justifyContent: "center",
    alignItems: "center",
    maxWidth: "fit-content",
  },
});

const Popover = {
  baseStyle: {
    popper: {
      zIndex: "popover",
    },
  },
};
// 3. extend the theme
export const theme = extendTheme({
  config,
  components: {
    Button,
    Badge,
    Popover,
  },
});

