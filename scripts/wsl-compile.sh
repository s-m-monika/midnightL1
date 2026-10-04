#!/usr/bin/env bash
# Compile the Compact contract from WSL on a Windows host.
#
# The Compact compiler ships no native Windows binary, so on Windows the
# toolchain must run inside WSL. This script resolves the project directory
# relative to its own location, so it works regardless of where the repo lives.
set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_DIR="$(dirname "$SCRIPT_DIR")"
cd "$PROJECT_DIR"

export PATH="$HOME/.local/bin:$PATH"

echo "=== compact version ==="
compact --version
echo "=== compiling counter.compact ==="
compact compile contracts/counter.compact contracts/managed/counter
echo "=== managed/ tree ==="
find contracts/managed -maxdepth 3 -type d | sort
echo "--- files ---"
find contracts/managed -type f | sort
