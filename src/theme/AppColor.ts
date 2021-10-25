import { StyleHTMLAttributes } from "react";

export type AppColor = "success" | "primary" | "secondary" | "favorite" | "tertiary" | "light" | "paper" | "medium" | "dark" | "clear" | "warning" | "danger" | undefined

export const AppColors = ["success", "primary", "secondary", "favorite", "tertiary", "light", "paper", "medium", "dark", "clear", "warning", "danger"]
export type RogueColor = { text: string, bg: string };
export const rogueColorToStyle: (options: RogueColor) => Record<string, string> = ({ bg, text }) => ({
    color: text,
    "--color": text,
    "--ion-color-primary": bg,
    "--placeholder-color": text
})

