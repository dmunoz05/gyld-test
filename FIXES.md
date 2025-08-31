# FIXED

This document records the main issues encountered during test development and how they were resolved.

---

## 1. Error: `Cannot find module 'minimist'`
**Cause:** `minimist` was not added to `dependencies`.
**Solution:** Install the package and its types:
```bash
npm install minimist
npm install -D @types/minimist
```

- Affected Snippet:

- src/index.ts
`const args = require("minimist")(process.argv.slice(2));`

## 2. Debug with TypeScript (Unknown file extension ".ts")

Cause: Node does not recognize .ts when debugging directly.
Solution: Added a dev script with ts-node and configured VSCode to use that command in debug mode:

```
"scripts": {
"start": "ts-node src/index.ts",
"build": "tsc",
"dev": "nodemon --exec ts-node src/index.ts"
}
```

## 3. Error: Could not find a declaration file for module 'seedrandom'

Cause: The seedrandom library does not include type definitions.
Solution: Install the definitions:

npm install -D @types/seedrandom

## 4. Unused seed

Cause: In the first version, the seed (--seed) had no effect on the assignment.
Solution: Update the algorithm so that in case of a tie in engagement_score, it uses seedrandom(seed) to break ties deterministically.

## 5. tsconfig.json Configuration

Cause: Initial configuration used "module": "nodenext", generating incompatibilities with ts-node.
Solution: Change to:

```
"compilerOptions": {
"module": "commonjs",
"target": "esnext",
"strict": true,
"esModuleInterop": true,
"skipLibCheck": true,
"outDir": "./dist"
}
```

## 6. Consistency between start and dev

Cause: start should have been used in the official release, but a local debug command was also needed.
Solution:

npm start → official release command.

npm run dev → command to debug VSCode.