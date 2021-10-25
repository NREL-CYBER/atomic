import { Store } from "store";
import { AppConfig } from "../util/AppConfig";
import { UseStore } from "zustand";
declare type Address = {
    post_office_box?: string;
    street_address?: string;
    locality: string;
    region: string;
    country_name: string;
    street_view: string;
};
declare const useAddress: UseStore<Store<Address>>;
export declare const useAttack: any;
export { useAddress };
declare const ExampleConfig: AppConfig;
export default ExampleConfig;
