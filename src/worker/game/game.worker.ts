import { WasmHandle } from "../load-wasm";

const wasmHandle = new WasmHandle(() => import("../../../lib/game/pkg"));

const ctx = self;

interface EventData {
  canvas: any;
}

ctx.addEventListener("message", async (event: MessageEvent<EventData>) => {
  const mod = await wasmHandle.modAsync;
  const canvas = event.data.canvas;
  mod.greet(canvas);
});
