import { Store } from "store";
import { UseBoundStore } from "zustand";
import { AppConfig } from "../util/AppConfig";
declare type PalleteItem = {
    name: string;
    type: string;
    r: number;
    g: number;
    b: number;
};
declare const useAddress: UseBoundStore<Store<PalleteItem>>;
export interface MitreNode extends Record<string, any> {
    type: string;
    name: string;
    id: string;
}
export declare const useAttack: UseBoundStore<Store<MitreNode>, import("zustand").StoreApi<Store<MitreNode>>>;
export { useAddress };
declare const ExampleConfig: AppConfig;
export default ExampleConfig;
