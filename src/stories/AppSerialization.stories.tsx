// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Meta, Story } from '@storybook/react/types-6-0';
import React from 'react';
import AppRoot from '../components/AppRoot';
import ExampleConfig from '../config/ExampleConfig';
import { AppConfig } from '../util';


export default {
    title: 'atomic/AppExample',
    component: AppRoot,
} as Meta;

const Template: Story<AppConfig> = (args) => <AppRoot {...args} />;

export const AppExample = Template.bind({});
AppExample.args = ExampleConfig
