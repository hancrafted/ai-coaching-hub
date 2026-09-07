import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    passWithNoTests: true,
    include: ['**/*.{test,spec}.ts'],
    coverage: {
      provider: 'v8',
    },
  },
});
