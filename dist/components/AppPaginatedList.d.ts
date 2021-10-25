import React from "react";
import { Store } from "store";
import { UseStore } from "zustand";
import { selectButtonProps } from "./AppSelectButtons";
export declare const AppPaginatedList: React.FC<{
    filterCategories?: Record<string, {
        multi: boolean;
        values: selectButtonProps[];
    }>;
    store: UseStore<Store<any>>;
    pageSize?: number;
    render: React.FC<{
        item: Record<string, any>;
    }>;
}>;
