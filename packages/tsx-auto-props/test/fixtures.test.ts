import { readFile } from "node:fs/promises";
import { join } from "node:path";

import { testFixtures } from "@vue-macros/test-utils";
import { ensureLanguage } from "@vue.ts/language";
import { beforeAll, describe } from "vitest";

import { transform } from "../src/core/transform";

beforeAll(() => {
	ensureLanguage(join(__dirname, "__fixtures__", "tsconfig.json"));
});

describe("fixtures", async () => {
	await testFixtures(
		["__fixtures__/**/*.tsx", "!__fixtures__/**/*.exclude.tsx"],
		async (_args, id) => {
			const text = await readFile(id, { encoding: "utf-8" });

			return (transform(text, id) as any).code;
		},
		{
			cwd: __dirname,
			promise: true,
		},
	);
});
