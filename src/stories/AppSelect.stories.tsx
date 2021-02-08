// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Meta, Story } from '@storybook/react/types-6-0';
import React from 'react';
import AppSelectButtons, { selectButtonsProps } from '../components/AppSelectButtons';


export default {
    title: 'atomic/SelectButtons',
    component: AppSelectButtons,
} as Meta;

const Template: Story<selectButtonsProps> = (args) => <AppSelectButtons {...args} />;

export const SelectButtonsExample = Template.bind({});
SelectButtonsExample.args = {
    selected: ["nist_800_36"],
    display: "column",
    buttons: [
        { value: "nist_800_36", color: "danger", text: "HIGH" }, { value: "nist_800_37", color: "success", text: "LOW" }
    ],
    onSelectionChange: (values) => {
        console.log(values);
    }
}
