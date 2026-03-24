import type { Meta, StoryObj } from "@storybook/react-vite";
import Text from './Text'

const UNSET = "__unset__" as const;

const meta = {
    title: 'typography/Text',
    component: Text,

    args: {
        as: 'p',
        size: 'md',
        children: 'Text',
    },

    argTypes: {
        as: {
            options: ['p', 'span', 'strong', 'em', 'del'],
            table: {
                type: { summary: "'p' | 'span' | 'strong' | 'em' | 'del'" },
                defaultValue: { summary: 'p' },
            },
        },

        tone: {
            options: [UNSET, 'brand', 'default', 'danger', 'muted'],
            mapping: { [UNSET]: undefined },
            control: {
                type: 'radio',
                labels: { [UNSET]: 'auto' },
            },
            table: {
                type: { summary: "'brand' | 'default' | 'danger' | 'muted' | undefined" },
                defaultValue: { summary: 'auto' },
            },
        },

        size: {
            options: ['sm', 'md', 'lg'],
            control: { type: 'radio' },
            table: {
                type: { summary: "'sm' | 'md' | 'lg'" },
                defaultValue: { summary: 'md' },
            },
        },

        weight: {
            options: [UNSET, 'regular', 'semibold'],
            mapping: { [UNSET]: undefined },
            control: {
                type: 'radio',
                labels: { [UNSET]: 'auto' },
            },
            table: {
                type: { summary: "'regular' | 'semibold' | undefined" },
                defaultValue: { summary: 'auto' },
            },
        },

        italic: {
            options: [UNSET, 'true', 'false'],
            mapping: {
                [UNSET]: undefined,
                'true': true,
                'false': false,
            },
            control: {
                type: 'radio',
                labels: { [UNSET]: 'auto' },
            },
            table: {
                type: { summary: "boolean?" },
                defaultValue: { summary: 'auto' },
            },
        },

        strikethrough: {
            options: [UNSET, true, false],
            mapping: { [UNSET]: undefined },
            control: {
                type: 'radio',
                labels: { [UNSET]: 'auto' },
            },
            table: {
                type: { summary: "boolean?" },
                defaultValue: { summary: 'auto' },
            },
        },
    }
} satisfies Meta<typeof Text>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
    args: {
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

export const Span: Story = {
    args: {
        as: 'span',
        children: 'Span',
    }
}

export const Strong: Story = {
    args: {
        as: 'strong',
        children: 'Strong',
    }
}

export const Em: Story = {
    args: {
        as: 'em',
        children: 'Em',
    }
}

export const Del: Story = {
    args: {
        as: 'del',
        children: 'Del'
    }
}

export const Semibold: Story = {
    args: {
        weight: 'semibold',
        children: 'Semibold',
    }
}

export const Italic: Story = {
    args: {
        italic: true,
        children: 'Italic',
    }
}

export const Strikethrough: Story = {
    args: {
        strikethrough: true,
        children: 'Strikethrough',
    }
}

export const Children: Story = {
    args: {
        as: 'p',
        tone: 'default',
        children: (
            <>
                Root text, {' '}
                <Text as="span" tone="brand">brand text</Text>, {' '}
                <Text as="span" tone="danger">danger text</Text>, {' '}
                <Text as="span" tone="muted">muted text</Text>, {' '}
                <Text as="span" size="lg">large text</Text>, {' '}
                <Text as="span" size="sm">small text</Text>
            </>
        )
    }
}

export const LongText: Story = {
    args: {
        children: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed ' +
            'do eiusmod tempor incididunt ut labore et dolore magna aliqua. ' +
            'Ut enim ad minim veniam, quis nostrud exercitation ullamco ' +
            'laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure ' +
            'dolor in reprehenderit in voluptate velit esse cillum dolore eu ' +
            'fugiat nulla pariatur. Excepteur sint occaecat cupidatat non ' +
            'proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
    }
}
