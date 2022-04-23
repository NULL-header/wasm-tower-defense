import { wasmHandle } from "./load-wasm";

const worker = new Worker(new URL("./greet.worker.ts", import.meta.url));
worker.addEventListener("message", () => {});

export const greet = () => {
  return new Promise<void>((resolve) => {
    const onMsg = () => {
      worker.removeEventListener("message", onMsg);
      resolve();
    };
    worker.addEventListener("message", onMsg);
    worker.postMessage("");
  });
};
