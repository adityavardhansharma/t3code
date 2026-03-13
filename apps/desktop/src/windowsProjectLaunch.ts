import * as FS from "node:fs";
import { win32 as WindowsPath } from "node:path";

type DirectoryStat = Pick<FS.Stats, "isDirectory">;

function stripWrappingQuotes(value: string): string {
  if (value.length >= 2 && value.startsWith('"') && value.endsWith('"')) {
    return value.slice(1, -1);
  }
  return value;
}

function normalizeProjectLaunchCandidate(value: string): string | null {
  const trimmed = stripWrappingQuotes(value.trim());
  if (trimmed.length === 0 || trimmed.startsWith("-")) {
    return null;
  }

  const normalized = WindowsPath.normalize(trimmed);
  if (!WindowsPath.isAbsolute(normalized)) {
    return null;
  }

  return normalized;
}

export function extractProjectLaunchPathFromArgv(
  argv: readonly string[],
  statSync: (path: string) => DirectoryStat = FS.statSync,
): string | null {
  for (const value of argv) {
    const candidate = normalizeProjectLaunchCandidate(value);
    if (!candidate) {
      continue;
    }

    try {
      if (statSync(candidate).isDirectory()) {
        return candidate;
      }
    } catch {
      // Ignore non-existent or inaccessible paths while scanning argv.
    }
  }

  return null;
}
