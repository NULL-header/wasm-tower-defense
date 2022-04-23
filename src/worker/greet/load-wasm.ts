import type Mod from "../../../lib/subthread/pkg";

class WasmHandle {
  private mod: typeof Mod | undefined;
  private promise: Promise<void>;
  constructor() {
    this.promise = import("../../../lib/subthread/pkg").then((mod) => {
      this.mod = mod;
    });
  }
  get modSync() {
    return new Promise<typeof Mod>((resolve, reject) => {
      this.mod == null ? reject() : resolve(this.mod);
    });
  }
  get modAsync() {
    return new Promise<typeof Mod>(async (resolve, reject) => {
      await this.promise;
      if (this.mod == null) {
        reject();
        return;
      }
      resolve(this.mod);
    });
  }
}

export const wasmHandle = new WasmHandle();
