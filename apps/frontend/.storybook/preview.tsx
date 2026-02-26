import type { Preview } from '@storybook/react-vite';
import { withThemeByClassName } from '@storybook/addon-themes'
import '../src/styles/tailwind.css';

function applyTheme(theme: string) {
    document.documentElement.classList.toggle('dark', theme === 'dark')
    document
        .querySelectorAll('.sb-show-main,.docs-story')
        .forEach((elem) => elem.classList.add('bg-bg'))
}

const preview: Preview = {
    tags: ['autodocs'],

    parameters: {
        actions: { argTypesRegex: '^on[A-Z].*' },
        controls: {
            matchers: {
                color: /(background|color)$/i,
                date: /Date$/i,
            },
        },
    },

    decorators: [
        (Story, context) => {
            const theme = context.globals.theme || 'light'
            applyTheme(theme)
            return <Story {...context} />
        },
        withThemeByClassName({
            themes: {
                light: 'light',
                dark: 'dark',
            },
            defaultTheme: 'light',
        })
    ]
};

export default preview;
