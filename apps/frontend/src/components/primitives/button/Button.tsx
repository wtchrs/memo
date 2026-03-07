import { cva } from "class-variance-authority"

const buttonVariants = cva([
    'inline-flex items-center justify-center gap-2',
    'select-none whitespace-nowrap',
    'rounded-md',
    'font-sans font-semibold',
    'transition-colors',
    'shadow-elev-1',
    'border',

    // focus
    'focus-visible:outline-none',
    'focus-visible:ring-2 focus-visible:ring-ring',
    'focus-visible:ring-offset-2 focus-visible:ring-offset-bg',

    // disabled
    'disabled:pointer-events-none',
    'disabled:cursor-not-allowed',
    'disabled:bg-disabled-bg',
    'disabled:text-disabled-fg',
    'disabled:border-disabled-border',
    'disabled:shadow-none',
], {
    variants: {
        variant: {
            primary: [
                'bg-primary text-on-primary border-transparent',
                'hover:bg-primary/90 active:bg-primary/80',
            ],
            secondary: [
                'bg-secondary text-on-secondary border-border',
                'hover:bg-secondary/90 active:bg-secondary/80',
            ],
            danger: [
                'bg-danger text-on-danger border-transparent',
                'hover:bg-danger/90 active:bg-danger/80',
            ],
        },
        size: {
            sm: 'h-9 px-3 text-sm',
            md: 'h-10 px-4 text-base',
            lg: 'h-11 px-5 text-lg',
        }
    },
    defaultVariants: {
        variant: 'secondary',
        size: 'md',
    },
})

export interface ButtonProps {
    variant?: 'primary' | 'secondary' | 'danger'
    disabled?: boolean
    size?: 'sm' | 'md' | 'lg'
    label: string
    htmlType?: 'button' | 'submit' | 'reset'
    onClick: () => void
}

function Button({
    variant = 'secondary',
    size = 'md',
    disabled = false,
    label,
    htmlType = 'button',
    onClick,
}: ButtonProps) {
    return (
        <button
            type={htmlType}
            className={buttonVariants({ variant, size })}
            onClick={onClick}
            disabled={disabled}
            aria-disabled={disabled}
        >
            {label}
        </button>
    )
}

export default Button
