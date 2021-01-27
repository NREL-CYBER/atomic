// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Meta, Story } from '@storybook/react/types-6-0';
import React from 'react';
import { AppSideMenu } from '../components';
import { routerOutletProps } from '../components/AppRouterOutlet';
import { IonReactHashRouter } from '@ionic/react-router';
import { atOutline, tvOutline } from 'ionicons/icons';


export default {
    title: 'atomic/SideMenu',
    component: AppSideMenu,
} as Meta;

const Template: Story<routerOutletProps> = (args) => <IonReactHashRouter><AppSideMenu {...args} /></IonReactHashRouter>;

export const AccordionExample = Template.bind({});
AccordionExample.args = {
    id: "nice",
    root: {
        icon: "", path: "/test", title: "ok", component: () => <>NICE</>,
        nested: [{
            icon: atOutline,
            path: "/test/nice",
            title: "ok nice",
            component: () => <>nice</>
        },
        {
            icon: tvOutline,
            path: "/test/wtf",
            title: "wtf",
            component: () => <>nice</>
        }]
    }
}
