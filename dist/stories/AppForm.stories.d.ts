import { Meta, Story } from '@storybook/react/types-6-0';
import { formProps } from '../components/forms/AppForm';
declare const _default: Meta<import("@storybook/react/types-6-0").Args>;
export default _default;
export interface Address {
    "post-office-box": string;
    "locality": string;
    "region": string;
    "postal-code": string;
    "country-name": string;
}
export declare const AddressExample: Story<formProps>;
export declare const VeggieExample: Story<formProps>;
export declare const ComplexExample: Story<formProps>;
