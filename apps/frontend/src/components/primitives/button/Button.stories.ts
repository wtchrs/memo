import type { Meta, StoryObj } from '@storybook/react-vite'
import { fn } from 'storybook/test'
import Button from './Button'

const meta = {
    title: 'Button',
    component: Button,
    parameters: {
        layout: 'centered',
    },
    args: {
        variant: 'secondary',
        size: 'md',
        disabled: false,
        label: 'Button',
        htmlType: 'button',
        onClick: fn(),
    },
} satisfies Meta<typeof Button>

export default meta

type Story = StoryObj<typeof meta>

export const Primary: Story = {
    args: {
        variant: 'primary',
        label: 'Primary',
    },
};

export const Secondary: Story = {
    name: 'Secondary (default)',
    args: {
        variant: 'secondary',
        label: 'Secondary',
    }
}

export const Danger: Story = {
    args: {
        variant: 'danger',
        label: 'Danger',
    }
}

export const disabled: Story = {
    args: {
        disabled: true,
        label: 'Disabled',
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

export const submit: Story = {
    args: {
        htmlType: 'submit',
        label: 'submit',
    }
}

export const reset: Story = {
    args: {
        htmlType: 'reset',
        label: 'reset',
    }
}
