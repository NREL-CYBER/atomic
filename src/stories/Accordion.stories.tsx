// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Meta, Story } from '@storybook/react/types-6-0';
import React from 'react';
import AppAccordion, { accordionProps } from '../components/AppAccordion';


export default {
    title: 'atomic/Accordion',
    component: AppAccordion,
} as Meta;

const Template: Story<accordionProps> = (args) => <AppAccordion {...args} />;

export const AccordionExample = Template.bind({});
AccordionExample.args = {
    itemColor: "light",
    selectedColor: "tertiary",
    items: [
        {
            toolbarContent: () => <>reeds</>,
            innerContent: () => <>the thing that makes sound</>
        },
        {
            toolbarContent: () => <>bellows</>,
            innerContent: () => <>the thing that has air in it</>
        },
        {
            toolbarContent: () => <>keys</>,
            innerContent: () => <>the things for melody</>
        }
    ]
}
