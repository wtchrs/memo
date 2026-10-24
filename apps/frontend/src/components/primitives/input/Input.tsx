import { twMerge } from "@/utils/customTailwindMerge"
import type { NativeProps } from "@/utils/polymorphicProps"
import { cva } from "class-variance-authority"

const inputVariants = cva([
    'block w-full min-w-0',
    'rounded border',
    'bg-background text-foreground border-input',
    'font-sans font-regular',
    'transition-colors',
    'placeholder:text-muted-foreground',

    // focus
    'focus-visible:outline-none',
    'focus-visible:ring-1 focus-visible:ring-ring',
    'focus-visible:ring-offset-1 focus-visible:ring-offset-bg',

    // invalid
    'enabled:aria-invalid:border-danger',
    'enabled:aria-invalid:focus-visible:ring-danger',
    'enabled:aria-[invalid=grammar]:border-danger',
    'enabled:aria-[invalid=grammar]:focus-visible:ring-danger',
    'enabled:aria-[invalid=spelling]:border-danger',
    'enabled:aria-[invalid=spelling]:focus-visible:ring-danger',

    // disabled
    'disabled:cursor-not-allowed',
    'disabled:bg-surface-container-low',
    'disabled:text-disabled-fg',
    'disabled:border-disabled-border',
    'disabled:placeholder:text-disabled-fg',
], {
    variants: {
        size: {
            sm: 'h-9 px-3 text-sm',
            md: 'h-10 px-4 text-base',
            lg: 'h-11 px-5 text-lg',
        },
    },
    defaultVariants: {
        size: 'md',
    },
})

type InputOwnProps = {
    type?: 'text' | 'password' | 'email' | 'search' | 'tel' | 'url'
    size?: 'sm' | 'md' | 'lg'
}

export type InputProps =
    & InputOwnProps
    & NativeProps<'input', InputOwnProps>

function Input({
    type = 'text',
    size = 'md',
    className,
    ...nativeProps
}: InputProps) {
    const resolvedClassName = twMerge(inputVariants({ size }), className)

    return (
        <input
            type={type}
            className={resolvedClassName}
            {...nativeProps}
        />
    )
}

export default Input
