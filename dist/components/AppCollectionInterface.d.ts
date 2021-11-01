import { formComposerProps } from "atomic/dist/components/forms/AppForm";
import { Store } from "store";
import { UseBoundStore } from "zustand";
import { columnAmount } from "./AppCol";
import { selectButtonProps } from "./AppSelectButtons";
import React from "react";
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
    formProps?: formComposerProps;
    showInsert?: boolean;
    renderDetail?: React.FC<Record<string, any>>;
}>;
