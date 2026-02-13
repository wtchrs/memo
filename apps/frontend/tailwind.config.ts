import type { Config } from "tailwindcss";

const config: Config = {
    content: ["./src/**/*.{ts,tsx}"],
    theme: {
        extend: {
            colors: {
                background: {
                    default: "var(--color-bg-default)",
                    subtle: "var(--color-bg-subtle)",
                    emphasis: "var(--color-bg-emphasis)",
                },
                text: {
                    primary: "var(--color-text-primary)",
                    secondary: "var(--color-text-secondary)",
                    muted: "var(--color-text-muted)",
                    inverse: "var(--color-text-inverse)",
                },
                border: {
                    default: "var(--color-border-default)",
                    subtle: "var(--color-border-subtle)",
                    focus: "var(--color-border-focus)",
                },
                intent: {
                    primary: "var(--color-intent-primary)",
                    success: "var(--color-intent-success)",
                    warning: "var(--color-intent-warning)",
                    danger: "var(--color-intent-danger)",
                },
            },
            borderRadius: {
                sm: "var(--radius-sm)",
                md: "var(--radius-md)",
                lg: "var(--radius-lg)",
                full: "var(--radius-full)",
            },
            boxShadow: {
                sm: "var(--shadow-sm)",
                md: "var(--shadow-md)",
                lg: "var(--shadow-lg)",
            },
            transitionDuration: {
                fast: "var(--motion-fast)",
                normal: "var(--motion-normal)",
                slow: "var(--motion-slow)",
            },
            transitionTimingFunction: {
                standard: "var(--motion-easing-standard)",
            },
        },
    },
    plugins: [],
};

export default config;

