import "../styles/globals.css";
import type { AppProps } from "next/app";
import { ChakraProvider, ThemeProvider } from "@chakra-ui/react";
import { extendTheme } from "@chakra-ui/react";

// 2. Add your color mode config
const config = {
  initialColorMode: "dark",
  useSystemColorMode: false,
};

// 3. extend the theme
const theme = extendTheme({
  config,
  modes: {
    light: {
      background: "#000",
    },
  },
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={theme}>
      <ChakraProvider theme={theme}>
        <Component {...pageProps} />{" "}
      </ChakraProvider>
    </ThemeProvider>
  );
}
