const worker = new Worker(new URL("./game.worker.ts", import.meta.url));

export const run = (canvas: any) => {
  return new Promise<void>((resolve) => {
    const onMsg = () => {
      worker.removeEventListener("message", onMsg);
      resolve();
    };
    worker.addEventListener("message", onMsg);
    worker.postMessage({ canvas }, [canvas]);
  });
};
