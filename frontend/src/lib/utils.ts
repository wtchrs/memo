import { clsx, type ClassValue } from "clsx";
import { twMerge } from "@/utils/customTailwindMerge";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}
