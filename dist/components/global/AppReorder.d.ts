/// <reference types="react" />
import { ItemReorderEventDetail } from "@ionic/core";
interface reOrderItemProps {
    disabled?: boolean;
    slot?: "start" | "end";
}
interface reOrderGroupProps {
    disabled?: boolean;
    onReorder: (event: CustomEvent<ItemReorderEventDetail>) => void;
}
export declare const AppReorder: React.FC<reOrderItemProps>;
export declare const AppReorderGroup: React.FC<reOrderGroupProps>;
export {};
