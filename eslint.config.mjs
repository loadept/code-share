import eslint from '@eslint/js'
import tseslint from 'typescript-eslint'
import react from 'eslint-plugin-react'
import globals from 'globals'

export default tseslint.config(
  eslint.configs.recommended,
  tseslint.configs.strict,
  tseslint.configs.stylistic,
  {
    files: ['**/*.{js,jsx}'],
    plugins: {
      react
    },
    languageOptions: {
      globals: globals.browser
    }
  },
  {
    rules: {
      // Espaciado alrededor de operadores (variable = valor)
      '@/space-infix-ops': 'error',
      // No espacios en blanco al final de líneas
      'no-trailing-spaces': 'error',
      // Espacios antes y después de llaves
      'object-curly-spacing': ['error', 'always'],
      // Espacios en arrays [1, 2, 3]
      'array-bracket-spacing': ['error', 'never'],
      // Espacios en paréntesis de funciones
      'space-in-parens': ['error', 'never'],
      // Espacios antes de bloques de código
      'space-before-blocks': 'error',
      // Espacios alrededor de keywords (if, for, etc.)
      'keyword-spacing': 'error',
      // Espacios después de comas
      'comma-spacing': ['error', { before: false, after: true }],
      // Indentación consistente (2 espacios)
      '@/indent': ['error', 2],
      // Punto y coma al final
      '@/semi': ['error', 'never'],
      // Comillas simples o dobles consistentes
      '@/quotes': ['error', 'single'],
      // Tipo de final de línea
      'linebreak-style': ['error', 'unix']
    }
  },
  {
    ignores: [
      '**/node_modules/**',
      '**/dist/**',
      '**/build/**',
    ]
  }
)
