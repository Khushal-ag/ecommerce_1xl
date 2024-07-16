(async () => {
  const { success, logs } = await Bun.build({
    entrypoints: ["src/index.ts"],
    outdir: "api",
    format: "esm",
    target: "node",
    minify: true,
  });

  if (success) {
    console.log(">>> Build successful");
  } else {
    console.error(">>> Build failed", logs);
  }
})();
