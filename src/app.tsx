import React from "react";
import { chakra, extendTheme, ChakraProvider } from "@chakra-ui/react";
import { useAsyncFn, useMount } from "react-use";
import { greet } from "./worker/greet";

const theme = extendTheme({
  style: {
    global: {
      "html, body": {
        margin: 0,
        padding: 0,
      },
    },
  },
});

export const App = () => {
  // const [, importWasm] = useAsyncFn(() => import("../lib/subthread/pkg"), []);
  useMount(async () => {
    await greet();
    console.log("finish");
  });

  return (
    <ChakraProvider theme={theme}>
      <chakra.canvas width="100vw" height="100vh" id="game" />
    </ChakraProvider>
  );
};
