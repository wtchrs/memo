import { Button as ButtonPrimitive } from "@base-ui/react/button"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const buttonVariants = cva(
    [
        "group/button inline-flex shrink-0 items-center justify-center",
        "rounded border border-transparent bg-clip-padding",
        "font-label-md text-label-md whitespace-nowrap select-none transition-colors",
        "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring",
        "focus-visible:ring-offset-1 focus-visible:ring-offset-background",
        // Base UI also sets data-disabled when a disabled button remains focusable.
        "data-disabled:pointer-events-none data-disabled:text-disabled-fg",
        "data-disabled:border-transparent data-disabled:shadow-none",
        "aria-invalid:border-destructive aria-invalid:focus-visible:ring-destructive",
        "[&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
    ],
    {
        variants: {
            variant: {
                default: [
                    "bg-primary text-primary-foreground",
                    "hover:not-data-disabled:bg-primary/90 active:not-data-disabled:bg-primary/80",
                    "data-disabled:bg-disabled-bg",
                ],
                outline: [
                    "border-border bg-transparent text-foreground",
                    "hover:not-data-disabled:bg-secondary-hover aria-expanded:not-data-disabled:bg-secondary-hover",
                    "data-disabled:border-disabled-border",
                ],
                secondary: [
                    "border-border bg-secondary text-secondary-foreground",
                    "hover:not-data-disabled:bg-secondary-hover aria-expanded:not-data-disabled:bg-secondary-hover",
                    "data-disabled:bg-disabled-bg data-disabled:border-disabled-border dark:data-disabled:bg-transparent",
                ],
                ghost: [
                    "bg-transparent text-muted-foreground",
                    "hover:not-data-disabled:bg-secondary-hover hover:not-data-disabled:text-foreground",
                    "aria-expanded:not-data-disabled:bg-secondary-hover aria-expanded:not-data-disabled:text-foreground",
                ],
                destructive: [
                    "bg-destructive text-destructive-foreground",
                    "hover:not-data-disabled:bg-destructive/90 active:not-data-disabled:bg-destructive/80",
                    "data-disabled:bg-disabled-bg",
                ],
                link: "bg-transparent text-primary underline-offset-4 hover:not-data-disabled:underline",
            },
            size: {
                default:
                    "h-8 gap-2 px-4 has-data-[icon=inline-end]:pr-3 has-data-[icon=inline-start]:pl-3",
                xs: "h-6 gap-1 px-2 has-data-[icon=inline-end]:pr-1 has-data-[icon=inline-start]:pl-1 [&_svg:not([class*='size-'])]:size-3",
                sm: "h-7 gap-1 px-3 has-data-[icon=inline-end]:pr-2 has-data-[icon=inline-start]:pl-2",
                lg: "h-9 gap-2 px-4 text-sm font-medium has-data-[icon=inline-end]:pr-3 has-data-[icon=inline-start]:pl-3",
                icon: "size-8",
                "icon-xs":
                    "size-6 [&_svg:not([class*='size-'])]:size-3",
                "icon-sm": "size-7",
                "icon-lg": "size-9",
            },
        },
        defaultVariants: {
            variant: "default",
            size: "default",
        },
    }
)

function Button({
    className,
    variant = "default",
    size = "default",
    ...props
}: ButtonPrimitive.Props & VariantProps<typeof buttonVariants>) {
    return (
        <ButtonPrimitive
            data-slot="button"
            className={cn(buttonVariants({ variant, size, className }))}
            {...props}
        />
    )
}

export { Button, buttonVariants }
