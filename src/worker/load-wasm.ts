export class WasmHandle<T> {
  private mod: T | undefined;
  private promise: Promise<void>;
  constructor(load: () => Promise<T>) {
    this.promise = load().then((mod) => {
      this.mod = mod;
    });
  }
  get modSync() {
    return new Promise<T>((resolve, reject) => {
      this.mod == null ? reject() : resolve(this.mod);
    });
  }
  get modAsync() {
    return new Promise<T>(async (resolve, reject) => {
      await this.promise;
      if (this.mod == null) {
        reject();
        return;
      }
      resolve(this.mod);
    });
  }
}
