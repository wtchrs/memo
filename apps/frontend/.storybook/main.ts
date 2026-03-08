import type { StorybookConfig } from '@storybook/react-vite';
import { mergeConfig } from 'vite'
import tsconfigPaths from 'vite-tsconfig-paths'

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

    async viteFinal(config) {
        return mergeConfig(config, {
            plugins: [tsconfigPaths()],
        })
    }
};

export default config;
