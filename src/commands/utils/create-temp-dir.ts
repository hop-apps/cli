import tmp from "tmp";

type TempDir = {
  path: string;
  cleanup: () => void;
};

export function createTempDir(): Promise<TempDir> {
  return new Promise((resolve, reject) => {
    tmp.dir({ keep: true }, (err, path, cleanup) => {
      if (err) {
        reject(err);
      } else {
        resolve({ path, cleanup });
      }
    });
  });
}
