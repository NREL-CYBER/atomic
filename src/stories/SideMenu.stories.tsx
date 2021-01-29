// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Meta, Story } from '@storybook/react/types-6-0';
import React from 'react';
import { AppSideMenu, AppContent, AppCard } from '../components';
import { routerOutletProps } from '../components/AppRouterOutlet';
import { IonReactHashRouter } from '@ionic/react-router';
import { atOutline, tvOutline } from 'ionicons/icons';
import { useCompletion } from '../hooks';


export default {
    title: 'atomic/SideMenu',
    component: AppSideMenu,
} as Meta;

const Template: Story<routerOutletProps> = (args) => <IonReactHashRouter><AppSideMenu {...args} /></IonReactHashRouter>;

export const SideMenuExample = Template.bind({});
SideMenuExample.args = {
    id: "nice",
    root: {
        icon: "", path: "/", title: "ok", component: () => <AppContent center><AppCard titleColor="danger" headerColor="tertiary" contentColor={"primary"} title="OK"></AppCard></AppContent>,
        nested: [{
            icon: atOutline,
            path: "/test/nice",
            title: "ok nice",
            component: () => {
                // eslint-disable-next-line react-hooks/rules-of-hooks
                return <AppContent center>nice</AppContent >
            }
        },
        {
            icon: tvOutline,
            path: "/test/wtf",
            title: "wtf",
            component: () => <>nice</>
        }]
    }
}
