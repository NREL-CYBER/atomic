import { AppConfig } from "../util/AppConfig";
declare type Address = {
    post_office_box?: string;
    street_address?: string;
    locality: string;
    region: string;
    country_name: string;
    street_view: string;
};
declare const useAddress: import("zustand").StoreApi<import("store").Store<Address>>;
export { useAddress };
declare const ExampleConfig: AppConfig;
export default ExampleConfig;
