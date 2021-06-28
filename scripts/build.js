const { build } = require("esbuild");

const NodeResolve = require("@esbuild-plugins/node-resolve");

build({
  outdir: "bin",
  bundle: true,
  minify: true,
  sourcemap: true,
  entryPoints: ["src/cli.ts"],
  platform: "node",
  plugins: [
    NodeResolve.default({
      extensions: [".ts", ".js"],
      onResolved: (resolved) => {
        if (resolved.includes("node_modules")) {
          return {
            external: true,
          };
        }
        return resolved;
      },
    }),
  ],
});
