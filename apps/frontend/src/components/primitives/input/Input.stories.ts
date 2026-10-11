import Input from "./Input"
import type { Meta, StoryObj } from "@storybook/react-vite"

const UNSET = "__unset__" as const;

const meta = {
    title: 'input/Input',
    component: Input,

    parameters: {
        layout: 'centered',
    },

    args: {
        placeholder: 'Placeholder...',
    },

    argTypes: {
        size: {
            options: [UNSET, 'sm', 'md', 'lg'],
            mapping: { [UNSET]: undefined },
            control: {
                type: 'radio',
                labels: { [UNSET]: 'default (md)' },
            },
            table: {
                type: { summary: "'sm' | 'md' | 'lg'" },
                defaultValue: { summary: 'md' },
            }
        },
        'aria-invalid': {
            options: [UNSET, false, true, 'grammar', 'spelling'],
            mapping: { [UNSET]: undefined },
            control: {
                type: 'radio',
                labels: { [UNSET]: 'unset' },
            },
            table: {
                type: { summary: "boolean | 'true' | 'false' | 'grammar' | 'spelling'" },
                defaultValue: { summary: 'unset' },
            }
        },
        disabled: {
            type: 'boolean',
            table: { defaultValue: { summary: 'false' } },
        },
    },
} satisfies Meta<typeof Input>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const Invalid: Story = {
    args: {
        'aria-invalid': true,
    },
}

export const Disabled: Story = {
    args: {
        disabled: true,
    },
}

export const Sm: Story = {
    args: {
        size: 'sm',
    },
}

export const Md: Story = {
    args: {
        size: 'md',
    },
}

export const Lg: Story = {
    args: {
        size: 'lg',
    },
}

export const DisabledWithValue: Story = {
    args: {
        value: 'Some Value',
        disabled: true,
    },
}

export const DisabledWithInvalid: Story = {
    args: {
        'aria-invalid': true,
        disabled: true,
    },
}
