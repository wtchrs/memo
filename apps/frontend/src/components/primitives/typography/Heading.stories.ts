import type { Meta, StoryObj } from '@storybook/react-vite';
import Heading from './Heading'

const meta = {
    title: 'Heading',
    component: Heading,
    parameters: {
        layout: 'centered',
    },
    args: {
        variant: 'secondary',
        label: 'Heading',
        htmlTag: 'h3',
    }
} satisfies Meta<typeof Heading>

export default meta

type Story = StoryObj<typeof meta>

export const primary: Story = {
    args: {
        variant: 'primary',
        label: 'primary',
    }
}

export const secondary: Story = {
    args: {
        variant: 'secondary',
        label: 'secondary',
    }
}

export const danger: Story = {
    args: {
        variant: 'danger',
        label: 'danger',
    }
}

export const heading1: Story = {
    args: {
        htmlTag: 'h1',
        label: 'heading 1',
    }
}

export const heading2: Story = {
    args: {
        htmlTag: 'h2',
        label: 'heading 2',
    }
}

export const heading3: Story = {
    args: {
        htmlTag: 'h3',
        label: 'heading 3',
    }
}

export const heading4: Story = {
    args: {
        htmlTag: 'h4',
        label: 'heading 4',
    }
}

export const heading5: Story = {
    args: {
        htmlTag: 'h5',
        label: 'heading 5',
    }
}

export const heading6: Story = {
    args: {
        htmlTag: 'h6',
        label: 'heading 6',
    }
}
