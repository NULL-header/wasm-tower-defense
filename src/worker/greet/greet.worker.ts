import { WasmHandle } from "../load-wasm";

const wasmHandle = new WasmHandle(() => import("../../../lib/subthread/pkg"));

const ctx = self;

ctx.addEventListener("message", async (event) => {
  const mod = await wasmHandle.modAsync;
  mod.greet();
  ctx.postMessage("");
});
