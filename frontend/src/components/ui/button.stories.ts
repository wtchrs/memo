import type { Meta, StoryObj } from '@storybook/react-vite'
import { createElement } from 'react'
import { PlusIcon } from 'lucide-react'
import { fn } from 'storybook/test'
import { Button } from './button'

const visibleProps = ['variant', 'size', 'disabled', 'focusableWhenDisabled', 'children'];

const meta = {
    title: 'ui/Button',
    component: Button,

    parameters: {
        layout: 'centered',
        controls: {
            include: visibleProps,
        },
        docs: {
            controls: {
                include: visibleProps,
            },
        },
    },

    args: {
        variant: 'default',
        size: 'default',
        disabled: false,
        focusableWhenDisabled: false,
        children: 'Button',
        onClick: fn(),
    },

    argTypes: {
        variant: {
            options: ['default', 'outline', 'secondary', 'ghost', 'destructive', 'link'],
            control: 'radio',
            table: {
                type: { summary: "'default' | 'outline' | 'secondary' | 'ghost' | 'destructive' | 'link'" },
                defaultValue: { summary: 'default' },
            },
        },

        size: {
            options: ['default', 'xs', 'sm', 'lg', 'icon', 'icon-xs', 'icon-sm', 'icon-lg'],
            control: 'radio',
            table: {
                type: { summary: "'default' | 'xs' | 'sm' | 'lg' | 'icon' | 'icon-xs' | 'icon-sm' | 'icon-lg'" },
                defaultValue: { summary: 'default' },
            },
        },

        disabled: {
            type: 'boolean',
            table: { defaultValue: { summary: 'false' } },
        },

        focusableWhenDisabled: {
            type: 'boolean',
            table: { defaultValue: { summary: 'false' } },
        }
    }
} satisfies Meta<typeof Button>

export default meta

type Story = StoryObj<typeof meta>

// variant: 'default', 'outline', 'secondary', 'ghost', 'destructive', 'link'

export const DefaultVariant: Story = {
    args: {
        children: 'Default',
    },
};

export const DefaultDisabled: Story = {
    args: {
        disabled: true,
        children: 'Default Disabled',
    }
}

export const Outline: Story = {
    args: {
        variant: 'outline',
        children: 'Outline',
    },
};

export const OutlineDisabled: Story = {
    args: {
        variant: 'outline',
        disabled: true,
        children: 'Outline Disabled',
    }
}

export const Secondary: Story = {
    args: {
        variant: 'secondary',
        children: 'Secondary',
    },
};

export const SecondaryDisabled: Story = {
    args: {
        variant: 'secondary',
        disabled: true,
        children: 'Secondary Disabled',
    },
};

export const Ghost: Story = {
    args: {
        variant: 'ghost',
        children: 'Ghost',
    },
};

export const GhostDisabled: Story = {
    args: {
        variant: 'ghost',
        disabled: true,
        children: 'Ghost Disabled',
    },
};

export const Destructive: Story = {
    args: {
        variant: 'destructive',
        children: 'Destructive',
    },
};

export const DestructiveDisabled: Story = {
    args: {
        variant: 'destructive',
        disabled: true,
        children: 'Destructive Disabled',
    },
};

export const Link: Story = {
    args: {
        variant: 'link',
        children: 'Link',
    },
};

export const LinkDisabled: Story = {
    args: {
        variant: 'link',
        disabled: true,
        children: 'Link Disabled',
    },
};

// size: 'default', 'xs', 'sm', 'lg', 'icon', 'icon-xs', 'icon-sm', 'icon-lg'

export const Xs: Story = {
    args: {
        size: 'xs',
        children: 'xs size',
    }
}

export const Sm: Story = {
    args: {
        size: 'sm',
        children: 'sm size',
    }
}

export const DefaultSize: Story = {
    args: {
        children: 'Default',
    }
}

export const Lg: Story = {
    args: {
        size: 'lg',
        children: 'lg size',
    }
}

export const Icon: Story = {
    args: {
        size: 'icon',
        children: createElement(PlusIcon),
        'aria-label': 'Add memo',
    },
}

export const IconXs: Story = {
    args: {
        ...Icon.args,
        size: 'icon-xs',
    },
}

export const IconSm: Story = {
    args: {
        ...Icon.args,
        size: 'icon-sm',
    },
}

export const IconLg: Story = {
    args: {
        ...Icon.args,
        size: 'icon-lg',
    },
}

export const FocusableDisabled: Story = {
    args: {
        disabled: true,
        focusableWhenDisabled: true,
        children: 'Saving memo',
    },
}
