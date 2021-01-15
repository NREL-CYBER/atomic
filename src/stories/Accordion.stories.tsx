import React from 'react';
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Story, Meta } from '@storybook/react/types-6-0';

import Validator, { RootSchemaObject } from 'validator';
import { AppFormComposer } from '../components';
import { formComposerProps } from '../components/forms/AppFormComposer';
import AppAccordion, { accordionProps } from '../components/AppAccordion';

export default {
    title: 'FormComposer',
    component: AppFormComposer,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as Meta;

const Template: Story<accordionProps> = (args) => <AppAccordion {...args} />;

export const AccordionExample = Template.bind({});
AccordionExample.args = {
    itemColor: "medium",
    selectedColor: "tertiary",
    items: [
        {
            toolbarContent: () => <>reeds</>,
            innerContent: () => <>the thing that makes sound</>
        },
        {
            toolbarContent: () => <>bellows</>,
            innerContent: () => <>the thing that has air in it</>
        }
    ]
}
