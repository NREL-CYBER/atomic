/// <reference types="react" />
import { UseBoundStore } from "zustand";
import { Store } from "store";
import { columnAmount } from "./AppCol";
import { selectButtonProps } from "./AppSelectButtons";
export declare const AppCollectionInterface: React.FC<{
    title?: React.ReactFragment;
    search?: boolean;
    editable?: boolean;
    filterCategories?: Record<string, {
        multi: boolean;
        options: selectButtonProps[];
    }>;
    store: UseBoundStore<Store<any>>;
    pageSize?: number;
    itemSize?: {
        xs?: columnAmount;
        md?: columnAmount;
        lg?: columnAmount;
    };
    renderItem?: React.FC<Record<string, any>>;
}>;
