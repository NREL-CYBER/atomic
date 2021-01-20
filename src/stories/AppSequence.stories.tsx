// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Meta, Story } from '@storybook/react/types-6-0';
import React, { useEffect } from 'react';
import AppInput from '../components/AppInput';
import AppSequence, { appSequenceProps } from '../components/AppSequence';


export default {
    title: 'atomic/Sequence',
    component: AppSequence,
} as Meta;

const Template: Story<appSequenceProps> = (args) => <AppSequence {...args} />;

export const SequenceExample = Template.bind({});
SequenceExample.args = {
    onBack: () => alert("previous sequence"),
    onNext: () => alert("sequence complete"),
    sequence: {
        title: "Prepare",
        elements: [
            {
                title: "Let us define your organization's mission for the DER system, in other words, which business processes this system will support? ",
                guidance: "The user requires to define the organization's mission/business process that informs the development of the DER architecture. This is important as it identifies what is it that the DER system will support, clarifying how to best build the business policies around it. Examples of support functions for a DER system are:1.	Reduce/eliminate electricity bills2.	Advance energy independence 3.	Protect against grid disconnections (backup/peak shaving) 4.	Promote renewable energy goals by supporting smart grid initiatives",
                component: ({ onStatusChange }) => {
                    // eslint-disable-next-line react-hooks/rules-of-hooks
                    useEffect(() => {
                        onStatusChange("locked");
                    }, [onStatusChange])
                    return <><AppInput onInputChange={(text) => { onStatusChange(text.length === 0 ? "locked" : "valid") }} placeholder="Business Process" /></>
                },
            },
            {
                title: "Edit Model attribute 2",
                guidance: "THis is a pieace of a model to edit",
                component: ({ onStatusChange }) => {
                    // eslint-disable-next-line react-hooks/rules-of-hooks
                    useEffect(() => {
                        onStatusChange("locked");
                    }, [onStatusChange])
                    return <><AppInput onInputChange={(text) => { onStatusChange(text.length === 0 ? "locked" : "valid") }} placeholder="Model 2" /></>
                },
            },
            {
                title: "Edit Model attribute 3",
                guidance: "THis is another pieace of a model to edit",
                component: ({ onStatusChange }) => {
                    // eslint-disable-next-line react-hooks/rules-of-hooks
                    useEffect(() => {
                        onStatusChange("locked");
                    }, [onStatusChange])
                    return <><AppInput onInputChange={(text) => { onStatusChange(text.length === 0 ? "locked" : "valid") }} placeholder="Model 3" /></>
                },
            }
        ],
        guidance: "This is an example of a sequence"
    }
}

