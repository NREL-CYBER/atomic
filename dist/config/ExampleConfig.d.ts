import { Store } from "store";
import { UseStore } from "zustand";
import { AppConfig } from "../util/AppConfig";
declare type PalleteItem = {
    name: string;
    type: string;
    r: number;
    g: number;
    b: number;
};
declare const useAddress: UseStore<Store<PalleteItem>>;
export interface MitreNode extends Record<string, any> {
    type: string;
    name: string;
    id: string;
}
export declare const useAttack: UseStore<Store<MitreNode>, import("zustand").StoreApi<Store<MitreNode>>>;
export { useAddress };
declare const ExampleConfig: AppConfig;
export default ExampleConfig;
