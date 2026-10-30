import type { StorybookConfig } from '@storybook/react-vite';

const config: StorybookConfig = {
    framework: '@storybook/react-vite',

    stories: [
        '../src/components/**/*.mdx',
        '../src/components/**/*.stories.@(js|jsx|mjs|ts|tsx)',
    ],

    addons: [
        '@storybook/addon-docs',
        '@storybook/addon-a11y',
        '@storybook/addon-themes',
    ],

    staticDirs: ['../public'],

    typescript: {
        reactDocgen: 'react-docgen-typescript',
        reactDocgenTypescriptOptions: {
            shouldExtractLiteralValuesFromEnum: true,
            shouldExtractValuesFromUnion: true,
            propFilter: (prop) =>
                prop.parent ? !/node_modules/.test(prop.parent.fileName) : true,
        },
    },
};

export default config;
