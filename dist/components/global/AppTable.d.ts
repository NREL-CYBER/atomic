import React from "react";
export interface appTableProps {
    columns: string[];
    data: any[];
}
export interface appListTableProps {
    rows: string[];
    data: any[];
    type: string;
}
export declare const AppTableList: React.FC<appListTableProps>;
export declare const AppTable: React.FC<appTableProps>;
