import { wasmHandle } from "./load-wasm";

const ctx = self;

ctx.addEventListener("message", async (event) => {
  const mod = await wasmHandle.modAsync;
  mod.greet();
  ctx.postMessage("");
});
