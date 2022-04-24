import React, { useState } from "react";
import { chakra, extendTheme, ChakraProvider } from "@chakra-ui/react";
import { useAsyncFn, useMount, useUpdateEffect } from "react-use";
import { greet } from "./worker/greet";
import { run } from "./worker/game";

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
  const [canvas, setCanvas] = useState<HTMLCanvasElement | undefined>(
    undefined
  );
  useUpdateEffect(() => {
    if (canvas == null) return;
    const offscreen = (canvas as any).transferControlToOffscreen();
    run(offscreen);
  }, [canvas]);
  useMount(async () => {
    await greet();
    console.log("finish");
  });

  return (
    <ChakraProvider theme={theme}>
      <chakra.canvas
        width="100vw"
        height="100vh"
        id="game"
        ref={(canvas) => {
          if (canvas == null) return;
          setCanvas(canvas);
        }}
      />
    </ChakraProvider>
  );
};
