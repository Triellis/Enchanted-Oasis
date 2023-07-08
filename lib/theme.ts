// theme.ts

// 1. import `extendTheme` function
import { extendTheme, type ThemeConfig } from "@chakra-ui/react";
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

// 3. extend the theme
const theme = extendTheme({
  config,
  components: {
    Button,
  },
});

export { theme };
