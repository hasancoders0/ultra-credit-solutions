
const { spawn } = require("node:child_process");

const isWindows = process.platform === "win32";
const nextBin = require.resolve("next/dist/bin/next");

const child = spawn(
  process.execPath,
  [nextBin, "start", "--hostname", "0.0.0.0", "--port", process.env.PORT || "3000"],
  {
    stdio: "inherit",
    env: process.env,
    shell: isWindows,
  },
);

child.on("exit", (code) => {
  process.exitCode = code ?? 1;
});

child.on("error", (error) => {
  console.error("Failed to start Next.js:", error);
  process.exitCode = 1;
});
