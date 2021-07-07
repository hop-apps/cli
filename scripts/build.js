const path = require("path");

const { build } = require("esbuild");

const NodeResolve = require("@esbuild-plugins/node-resolve");

const nodeModulesDirectory = path.join(__dirname, "..", "node_modules");

build({
  outdir: "bin",
  bundle: true,
  minify: true,
  sourcemap: true,
  entryPoints: ["src/cli.ts"],
  banner: {
    js: "#!/usr/bin/env node",
  },
  platform: "node",
  plugins: [
    NodeResolve.default({
      extensions: [".ts", ".js"],
      onResolved: (resolved) => {
        if (resolved.includes(nodeModulesDirectory)) {
          return {
            external: true,
          };
        }
        return resolved;
      },
    }),
  ],
});
