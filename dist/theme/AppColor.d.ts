export declare type AppColor = "success" | "primary" | "secondary" | "favorite" | "tertiary" | "light" | "paper" | "medium" | "dark" | "clear" | "warning" | "danger" | undefined;
export declare const AppColors: string[];
export declare type RogueColor = {
    text: string;
    bg: string;
};
export declare const rogueColorToStyle: (options: RogueColor) => Record<string, string>;
