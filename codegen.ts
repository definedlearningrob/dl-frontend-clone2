import { CodegenConfig } from '@graphql-codegen/cli';

const commonTypesConfig = {
  plugins: ['typescript'],
};

const commonOperationsConfig = {
  plugins: ['typescript-operations'],
  preset: 'import-types' as const,
  presetConfig: {
    typesPath: './types',
  },
};

const commonHooksConfig = {
  plugins: ['typescript-react-apollo'],
  preset: 'import-types' as const,
  presetConfig: {
    typesPath: './operations',
  },
};

const config: CodegenConfig = {
  config: {
    namingConvention: {
      enumValues: 'change-case-all#upperCase',
    },
    dedupeOperationSuffix: true,
    skipTypename: true,
    scalars: {
      ISO8601Date: 'string',
      ISO8601DateTime: 'string',
    },
    avoidOptionals: {
      inputValue: false,
      field: true,
      object: true,
    },
  },
  generates: {
    'src/__generated__/dc/students/types.ts': {
      schema: { 'http://localhost:4000/api/students/introspect': { assumeValid: true } },
      documents: [
        'src/Careers/graphql/student/**/*.ts',
        'src/Careers/graphql/fragments/**/*.ts',
        'src/Careers/graphql/shared/fragments/**/*.ts',
      ],
      ...commonTypesConfig,
    },
    'src/__generated__/dc/students/operations.ts': {
      schema: { 'http://localhost:4000/api/students/introspect': { assumeValid: true } },
      documents: [
        'src/Careers/graphql/student/**/*.ts',
        'src/Careers/graphql/fragments/**/*.ts',
        'src/Careers/graphql/shared/fragments/**/*.ts',
      ],
      ...commonOperationsConfig,
    },
    'src/__generated__/dc/students/hooks.ts': {
      schema: { 'http://localhost:4000/api/students/introspect': { assumeValid: true } },
      documents: [
        'src/Careers/graphql/student/**/*.ts',
        'src/Careers/graphql/fragments/**/*.ts',
        'src/Careers/graphql/shared/fragments/**/*.ts',
      ],
      ...commonHooksConfig,
    },
    'src/__generated__/dc/users/types.ts': {
      schema: { 'http://localhost:4000/api/users/introspect': { assumeValid: true } },
      documents: [
        'src/Careers/graphql/user/**/*.ts',
        'src/Careers/graphql/fragments/**/*.ts',
        'src/Careers/graphql/shared/fragments/**/*.ts',
      ],
      ...commonTypesConfig,
    },
    'src/__generated__/dc/users/operations.ts': {
      schema: { 'http://localhost:4000/api/users/introspect': { assumeValid: true } },
      documents: [
        'src/Careers/graphql/user/**/*.ts',
        'src/Careers/graphql/fragments/**/*.ts',
        'src/Careers/graphql/shared/fragments/**/*.ts',
      ],
      ...commonOperationsConfig,
    },
    'src/__generated__/dc/users/hooks.ts': {
      schema: { 'http://localhost:4000/api/users/introspect': { assumeValid: true } },
      documents: [
        'src/Careers/graphql/user/**/*.ts',
        'src/Careers/graphql/fragments/**/*.ts',
        'src/Careers/graphql/shared/fragments/**/*.ts',
      ],
      ...commonHooksConfig,
    },
    'src/__generated__/dc/public/types.ts': {
      schema: { 'http://localhost:4000/api/public/introspect': { assumeValid: true } },
      documents: ['src/Careers/graphql/public/**/*.ts', 'src/Careers/graphql/fragments/**/*.ts'],
      ...commonTypesConfig,
    },
    'src/__generated__/dc/public/operations.ts': {
      schema: { 'http://localhost:4000/api/public/introspect': { assumeValid: true } },
      documents: ['src/Careers/graphql/public/**/*.ts', 'src/Careers/graphql/fragments/**/*.ts'],
      ...commonOperationsConfig,
    },
    'src/__generated__/dc/public/hooks.ts': {
      schema: { 'http://localhost:4000/api/public/introspect': { assumeValid: true } },
      documents: ['src/Careers/graphql/public/**/*.ts', 'src/Careers/graphql/fragments/**/*.ts'],
      ...commonHooksConfig,
    },
    'src/__generated__/dc/shared/types.ts': {
      schema: { 'http://localhost:4000/api/users/introspect': { assumeValid: true } },
      documents: ['src/Careers/graphql/shared/**/*.ts', 'src/Careers/graphql/fragments/**/*.ts'],
      ...commonTypesConfig,
    },
    'src/__generated__/dc/shared/operations.ts': {
      schema: { 'http://localhost:4000/api/users/introspect': { assumeValid: true } },
      documents: ['src/Careers/graphql/shared/**/*.ts', 'src/Careers/graphql/fragments/**/*.ts'],
      ...commonOperationsConfig,
    },
    'src/__generated__/dc/shared/hooks.ts': {
      schema: { 'http://localhost:4000/api/users/introspect': { assumeValid: true } },
      documents: ['src/Careers/graphql/shared/**/*.ts', 'src/Careers/graphql/fragments/**/*.ts'],
      ...commonHooksConfig,
    },
    'src/__generated__/dl/shared/types.ts': {
      schema: { 'http://localhost:4000/api/learning/users/introspect': { assumeValid: true } },
      documents: ['src/Pbl/graphql/shared/**/*.ts', 'src/Pbl/graphql/fragments/**/*.ts'],
      ...commonTypesConfig,
    },
    'src/__generated__/dl/shared/operations.ts': {
      schema: { 'http://localhost:4000/api/learning/users/introspect': { assumeValid: true } },
      documents: ['src/Pbl/graphql/shared/**/*.ts', 'src/Pbl/graphql/fragments/**/*.ts'],
      ...commonOperationsConfig,
    },
    'src/__generated__/dl/shared/hooks.ts': {
      schema: { 'http://localhost:4000/api/learning/users/introspect': { assumeValid: true } },
      documents: ['src/Pbl/graphql/shared/**/*.ts', 'src/Pbl/graphql/fragments/**/*.ts'],
      ...commonHooksConfig,
    },
    'src/__generated__/dl/public/types.ts': {
      schema: { 'http://localhost:4000/api/learning/public/introspect': { assumeValid: true } },
      documents: ['src/Pbl/graphql/public/**/*.ts', 'src/Pbl/graphql/fragments/**/*.ts'],
      ...commonTypesConfig,
    },
    'src/__generated__/dl/public/operations.ts': {
      schema: { 'http://localhost:4000/api/learning/public/introspect': { assumeValid: true } },
      documents: ['src/Pbl/graphql/public/**/*.ts', 'src/Pbl/graphql/fragments/**/*.ts'],
      ...commonOperationsConfig,
    },
    'src/__generated__/dl/public/hooks.ts': {
      schema: { 'http://localhost:4000/api/learning/public/introspect': { assumeValid: true } },
      documents: ['src/Pbl/graphql/public/**/*.ts', 'src/Pbl/graphql/fragments/**/*.ts'],
      ...commonHooksConfig,
    },
    'src/__generated__/dl/students/types.ts': {
      schema: { 'http://localhost:4000/api/learning/students/introspect': { assumeValid: true } },
      documents: [
        'src/Pbl/graphql/student/**/*.ts',
        'src/Pbl/graphql/fragments/**/*.ts',
        'src/Pbl/graphql/shared/fragments/**/*.ts',
      ],
      ...commonTypesConfig,
    },
    'src/__generated__/dl/students/operations.ts': {
      schema: { 'http://localhost:4000/api/learning/students/introspect': { assumeValid: true } },
      documents: [
        'src/Pbl/graphql/student/**/*.ts',
        'src/Pbl/graphql/fragments/**/*.ts',
        'src/Pbl/graphql/shared/fragments/**/*.ts',
      ],
      ...commonOperationsConfig,
    },
    'src/__generated__/dl/students/hooks.ts': {
      schema: { 'http://localhost:4000/api/learning/students/introspect': { assumeValid: true } },
      documents: [
        'src/Pbl/graphql/student/**/*.ts',
        'src/Pbl/graphql/fragments/**/*.ts',
        'src/Pbl/graphql/shared/fragments/**/*.ts',
      ],
      ...commonHooksConfig,
    },
    'src/__generated__/dl/users/types.ts': {
      schema: { 'http://localhost:4000/api/learning/users/introspect': { assumeValid: true } },
      documents: [
        'src/Pbl/graphql/user/**/*.ts',
        'src/Pbl/graphql/fragments/**/*.ts',
        'src/Pbl/graphql/shared/fragments/**/*.ts',
      ],
      ...commonTypesConfig,
    },
    'src/__generated__/dl/users/operations.ts': {
      schema: { 'http://localhost:4000/api/learning/users/introspect': { assumeValid: true } },
      documents: [
        'src/Pbl/graphql/user/**/*.ts',
        'src/Pbl/graphql/fragments/**/*.ts',
        'src/Pbl/graphql/shared/fragments/**/*.ts',
      ],
      ...commonOperationsConfig,
    },
    'src/__generated__/dl/users/hooks.ts': {
      schema: { 'http://localhost:4000/api/learning/users/introspect': { assumeValid: true } },
      documents: [
        'src/Pbl/graphql/user/**/*.ts',
        'src/Pbl/graphql/fragments/**/*.ts',
        'src/Pbl/graphql/shared/fragments/**/*.ts',
      ],
      ...commonHooksConfig,
    },
    'src/__generated__/shared/shared/types.ts': {
      schema: { 'http://localhost:4000/api/users/introspect': { assumeValid: true } },
      documents: ['src/Shared/graphql/shared/**/*.ts', 'src/Shared/graphql/fragments/**/*.ts'],
      ...commonTypesConfig,
    },
    'src/__generated__/shared/shared/operations.ts': {
      schema: { 'http://localhost:4000/api/users/introspect': { assumeValid: true } },
      documents: ['src/Shared/graphql/shared/**/*.ts', 'src/Shared/graphql/fragments/**/*.ts'],
      ...commonOperationsConfig,
    },
    'src/__generated__/shared/shared/hooks.ts': {
      schema: { 'http://localhost:4000/api/users/introspect': { assumeValid: true } },
      documents: ['src/Shared/graphql/shared/**/*.ts', 'src/Shared/graphql/fragments/**/*.ts'],
      ...commonHooksConfig,
    },
    'src/__generated__/shared/students/types.ts': {
      schema: { 'http://localhost:4000/api/students/introspect': { assumeValid: true } },
      documents: ['src/Shared/graphql/student/**/*.ts', 'src/Shared/graphql/fragments/**/*.ts'],
      ...commonTypesConfig,
    },
    'src/__generated__/shared/students/operations.ts': {
      schema: { 'http://localhost:4000/api/students/introspect': { assumeValid: true } },
      documents: ['src/Shared/graphql/student/**/*.ts', 'src/Shared/graphql/fragments/**/*.ts'],
      ...commonOperationsConfig,
    },
    'src/__generated__/shared/students/hooks.ts': {
      schema: { 'http://localhost:4000/api/students/introspect': { assumeValid: true } },
      documents: ['src/Shared/graphql/student/**/*.ts', 'src/Shared/graphql/fragments/**/*.ts'],
      ...commonHooksConfig,
    },
    'src/__generated__/shared/users/types.ts': {
      schema: { 'http://localhost:4000/api/users/introspect': { assumeValid: true } },
      documents: ['src/Shared/graphql/user/**/*.ts', 'src/Shared/graphql/fragments/**/*.ts'],
      ...commonTypesConfig,
    },
    'src/__generated__/shared/users/operations.ts': {
      schema: { 'http://localhost:4000/api/users/introspect': { assumeValid: true } },
      documents: ['src/Shared/graphql/user/**/*.ts', 'src/Shared/graphql/fragments/**/*.ts'],
      ...commonOperationsConfig,
    },
    'src/__generated__/shared/users/hooks.ts': {
      schema: { 'http://localhost:4000/api/users/introspect': { assumeValid: true } },
      documents: ['src/Shared/graphql/user/**/*.ts', 'src/Shared/graphql/fragments/**/*.ts'],
      ...commonHooksConfig,
    },
  },
};

export default config;
