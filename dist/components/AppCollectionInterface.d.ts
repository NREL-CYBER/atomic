import { formNodeProps } from "./forms/AppForm";
import React from "react";
import { Store } from "store";
import { UseBoundStore } from "zustand";
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
    editFormProps?: Partial<formNodeProps>;
    createFormProps?: Partial<formNodeProps>;
    showInsert?: boolean;
    renderDetail?: React.FC<Record<string, any>>;
}>;
