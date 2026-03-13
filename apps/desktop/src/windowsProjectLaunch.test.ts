import { describe, expect, it } from "vitest";

import { extractProjectLaunchPathFromArgv } from "./windowsProjectLaunch";

describe("extractProjectLaunchPathFromArgv", () => {
  it("returns the first absolute directory argument", () => {
    const path = extractProjectLaunchPathFromArgv(
      [
        "C:\\Program Files\\T3 Code\\T3 Code.exe",
        "--inspect=0",
        "C:\\Users\\alice\\src\\demo",
        "C:\\Users\\alice\\src\\other",
      ],
      (candidate) => ({
        isDirectory: () => candidate === "C:\\Users\\alice\\src\\demo",
      }),
    );

    expect(path).toBe("C:\\Users\\alice\\src\\demo");
  });

  it("ignores files, relative paths, and flags", () => {
    const path = extractProjectLaunchPathFromArgv(
      [
        "main.js",
        "--t3code-dev-root=C:\\repo\\apps\\desktop",
        "C:\\Users\\alice\\src\\demo\\README.md",
      ],
      () => ({
        isDirectory: () => false,
      }),
    );

    expect(path).toBeNull();
  });

  it("accepts quoted explorer command arguments", () => {
    const path = extractProjectLaunchPathFromArgv(['"C:\\Users\\alice\\src\\quoted"'], () => ({
      isDirectory: () => true,
    }));

    expect(path).toBe("C:\\Users\\alice\\src\\quoted");
  });
});
