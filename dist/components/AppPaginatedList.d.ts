import React from "react";
import { Store } from "store";
import { UseStore } from "zustand";
import { selectButtonProps } from "./AppSelectButtons";
import { columnAmount } from "./AppCol";
export declare const AppPaginatedList: React.FC<{
    filterCategories?: Record<string, {
        multi: boolean;
        options: selectButtonProps[];
    }>;
    store: UseStore<Store<any>>;
    pageSize?: number;
    itemSize?: {
        xs?: columnAmount;
        md?: columnAmount;
        lg?: columnAmount;
    };
    renderItem: React.FC<{
        item: Record<string, any>;
    }>;
}>;
