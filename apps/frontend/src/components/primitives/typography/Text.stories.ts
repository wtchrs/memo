import type { Meta, StoryObj } from "@storybook/react-vite";
import Text from './Text'

const meta = {
    title: 'Text',
    component: Text,
    parameters: {
        layout: 'centered',
    },
    args: {
        variant: 'secondary',
        size: 'md',
        label: 'Text',
        htmlTag: 'p',
    }
} satisfies Meta<typeof Text>

export default meta

type Story = StoryObj<typeof meta>

export const primary: Story = {
    args: {
        variant: 'primary',
        size: 'md',
        label: 'Primary',
    }
}

export const secondary: Story = {
    args: {
        variant: 'secondary',
        size: 'md',
        label: 'Secondary',
    }
}

export const danger: Story = {
    args: {
        variant: 'danger',
        size: 'md',
        label: 'Danger',
    }
}

export const sm: Story = {
    args: {
        size: 'sm',
        label: 'sm',
    }
}

export const md: Story = {
    args: {
        size: 'md',
        label: 'md',
    }
}

export const lg: Story = {
    args: {
        size: 'lg',
        label: 'lg',
    }
}

export const span: Story = {
    args: {
        htmlTag: 'span',
        label: 'Span',
    }
}
