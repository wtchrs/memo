import { extendTailwindMerge } from "tailwind-merge";

export const twMerge = extendTailwindMerge({
    extend: {
        theme: {
            // --text-heading-sm / md / lg
            text: ['heading-sm', 'heading-md', 'heading-lg'],

            // --shadow-elev-1 / elev-2
            shadow: ['elev-1', 'elev-2'],

            // --font-weight-regular
            'font-weight': ['regular'],

            // not needed to add color and radius in general.
        },
    },
})
