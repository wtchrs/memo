import type { Meta, StoryObj } from "@storybook/react-vite";
import Text from './Text'

const meta = {
    title: 'typography/Text',
    component: Text,
    args: {
        tone: 'default',
        size: 'md',
        as: 'p',
        children: 'Text',
    },
    argTypes: {
        tone: {
            type: { name: 'enum', value: ['brand', 'default', 'danger', 'muted'] },
            table: { defaultValue: { summary: 'default' } },
        },
        size: {
            type: { name: 'enum', value: ['sm', 'md', 'lg'] },
            table: { defaultValue: { summary: 'md' } },
        },
        as: {
            type: { name: 'enum', value: ['p', 'span'] },
            table: { defaultValue: { summary: 'p' } },
        }
    }
} satisfies Meta<typeof Text>

export default meta

type Story = StoryObj<typeof meta>

export const Brand: Story = {
    args: {
        tone: 'brand',
        children: 'Brand',
    }
}

export const Default: Story = {
    args: {
        tone: 'default',
        children: 'Default',
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
