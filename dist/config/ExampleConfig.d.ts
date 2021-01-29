import { AppConfig } from "../util/AppConfig";
declare type Address = {
    post_office_box?: string;
    street_address?: string;
    locality: string;
    region: string;
    country_name: string;
};
declare const useAddress: import("zustand").UseStore<import("store").Store<Address>>;
export { useAddress };
declare const ExampleConfig: AppConfig;
export default ExampleConfig;
