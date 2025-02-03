import eslintPlugin from '@eslint/js'
import {FlatCompat} from '@eslint/eslintrc'
import type {Linter} from 'eslint'

const compat = new FlatCompat()

const eslintConfig = [
  {
    name: 'custom/eslint/recommended',
    files: ['**/*.ts?(x)'],
    ...eslintPlugin.configs.recommended,
  },
]

const ignoresConfig = [
  {
    name: 'xprod/eslint/ignores',
    ignores: ['**/node_modules/', '.git/', '.vscode/', '.next/', 'public/'],
  },
] as Linter.Config[]

export default [
  ...compat.extends('next/core-web-vitals', 'next/typescript', 'prettier'),
  ...eslintConfig,
  ...ignoresConfig,
] satisfies Linter.Config[]
