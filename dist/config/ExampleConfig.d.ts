import { Store } from "store";
import { AppConfig } from "../util/AppConfig";
import { UseBoundStore } from "zustand";
declare type Address = {
    post_office_box?: string;
    street_address?: string;
    locality: string;
    region: string;
    country_name: string;
    street_view: string;
};
declare const useAddress: UseBoundStore<Store<Address>>;
export interface MitreNode extends Record<string, any> {
    type: string;
    name: string;
    id: string;
}
export declare const useAttack: UseBoundStore<Store<MitreNode>, import("zustand").StoreApi<Store<MitreNode>>>;
export { useAddress };
declare const ExampleConfig: AppConfig;
export default ExampleConfig;
