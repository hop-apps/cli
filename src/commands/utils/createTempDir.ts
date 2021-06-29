import tmp from "tmp";

export const createTempDir: () => Promise<{
  path: string;
  cleanup: () => void;
}> = () =>
  new Promise((resolve, reject) => {
    tmp.dir({ keep: true }, (err, path, cleanup) => {
      if (err) {
        reject(err);
      } else {
        resolve({ path, cleanup });
      }
    });
  });
