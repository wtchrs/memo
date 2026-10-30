import type { Meta, StoryObj } from '@storybook/react-vite';
import Heading from './Heading'

const UNSET = "__unset__" as const;

const meta = {
    title: 'typography/Heading',
    component: Heading,

    args: {
        tone: 'default',
        children: 'Heading',
        as: 'h3',
    },

    argTypes: {
        tone: {
            options: [UNSET, 'brand', 'default', 'danger', 'muted'],
            mapping: { [UNSET]: undefined },
            control: {
                type: 'radio',
                labels: { [UNSET]: 'auto' },
            },
            table: {
                type: { summary: "'brand' | 'default' | 'danger' | 'muted' | undefined" },
                defaultValue: { summary: 'default' },
            },
        },

        size: {
            options: [UNSET, 'sm', 'md', 'lg'],
            mapping: { [UNSET]: undefined },
            control: {
                type: 'radio',
                labels: { [UNSET]: 'auto' },
            },
            table: {
                type: { summary: "'sm' | 'md' | 'lg'" },
                defaultValue: { summary: 'auto' },
            }
        },

        as: {
            options: [UNSET, 'h1', 'h2', 'h3', 'h4', 'h5', 'h6'],
            mapping: { [UNSET]: undefined },
            control: {
                type: 'inline-radio',
                labels: { [UNSET]: 'auto' },
            },
            table: {
                type: { summary: "'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | undefined" },
                defaultValue: { summary: 'h3' },
            },
        },
    },
} satisfies Meta<typeof Heading>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
    args: {
        tone: 'default',
        children: 'Default',
    }
}

export const Brand: Story = {
    args: {
        tone: 'brand',
        children: 'Brand',
    }
}

export const Danger: Story = {
    args: {
        tone: 'danger',
        children: 'Danger',
    }
}

export const Muted: Story = {
    args: {
        tone: 'muted',
        children: 'Muted',
    }
}

export const Heading1: Story = {
    args: {
        as: 'h1',
        children: 'heading 1',
    }
}

export const Heading2: Story = {
    args: {
        as: 'h2',
        children: 'heading 2',
    }
}

export const Heading3: Story = {
    args: {
        as: 'h3',
        children: 'heading 3',
    }
}

export const Heading4: Story = {
    args: {
        as: 'h4',
        children: 'heading 4',
    }
}

export const Heading5: Story = {
    args: {
        as: 'h5',
        children: 'heading 5',
    }
}

export const Heading6: Story = {
    args: {
        as: 'h6',
        children: 'heading 6',
    }
}
