import type { Meta, StoryObj } from '@storybook/react-vite'
import { fn } from 'storybook/test'
import Button from './Button'

const meta = {
    title: 'button/Button',
    component: Button,
    parameters: {
        layout: 'centered',
    },
    args: {
        variant: 'secondary',
        size: 'md',
        disabled: false,
        children: 'Button',
        type: 'button',
        onClick: fn(),
    },
    argTypes: {
        variant: {
            type: { name: 'enum', value: ['primary', 'secondary', 'danger'] },
            table: { defaultValue: { summary: 'secondary' } },
        },
        size: {
            type: { name: 'enum', value: ['sm', 'md', 'lg'] },
            table: { defaultValue: { summary: 'md' } },
        },
        disabled: {
            type: 'boolean',
            table: { defaultValue: { summary: 'false' } },
        },
        type: {
            type: { name: 'enum', value: ['button', 'submit', 'reset'] },
            table: { defaultValue: { summary: 'button' } },
        },
    }
} satisfies Meta<typeof Button>

export default meta

type Story = StoryObj<typeof meta>

export const Primary: Story = {
    args: {
        variant: 'primary',
        children: 'Primary',
    },
};

export const Secondary: Story = {
    args: {
        variant: 'secondary',
        children: 'Secondary',
    }
}

export const Danger: Story = {
    args: {
        variant: 'danger',
        children: 'Danger',
    }
}

export const Disabled: Story = {
    args: {
        disabled: true,
        children: 'Disabled',
    }
}

export const Sm: Story = {
    args: {
        size: 'sm',
        children: 'sm',
    }
}

export const Md: Story = {
    args: {
        size: 'md',
        children: 'md',
    }
}

export const Lg: Story = {
    args: {
        size: 'lg',
        children: 'lg',
    }
}

export const Submit: Story = {
    args: {
        type: 'submit',
        children: 'submit',
    }
}

export const Reset: Story = {
    args: {
        type: 'reset',
        children: 'reset',
    }
}
