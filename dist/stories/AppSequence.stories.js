// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import React, { useEffect } from 'react';
import AppInput from '../components/AppInput';
import AppSequence from '../components/AppSequence';
export default {
  title: 'atomic/Sequence',
  component: AppSequence
};

const Template = args => /*#__PURE__*/React.createElement(AppSequence, args);

export const SequenceExample = Template.bind({});
SequenceExample.args = {
  onBack: () => alert("previous sequence"),
  onNext: () => alert("sequence complete"),
  sequence: {
    title: "Prepare",
    elements: [{
      title: "Let us define your organization's mission for the DER system, in other words, which business processes this system will support? ",
      guidance: "The user requires to define the organization's mission/business process that informs the development of the DER architecture. This is important as it identifies what is it that the DER system will support, clarifying how to best build the business policies around it. \nExamples of support functions for a DER system are:\n1.	Reduce/eliminate electricity bills\n2.	Advance energy independence \n3.	Protect against grid disconnections (backup/peak shaving) \n4.	Promote renewable energy goals by supporting smart grid initiatives",
      component: ({
        onStatusChange
      }) => {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        useEffect(() => {
          onStatusChange("locked");
        }, [onStatusChange]);
        return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(AppInput, {
          onInputChange: text => {
            onStatusChange(text.length === 0 ? "locked" : "valid");
          },
          placeholder: "Business Process"
        }));
      }
    }, {
      title: "Great! To support this mission, you are encouraged to document any threat associated to the control system devices within the DER environment and their relevance.",
      guidance: " To support this, various activities such as identifying and establishing risk-aware mission/business process along with formulating a list of threats associates with the DER system. These threats may pose a significant impact on the facilities operation. Guidance on devising a strategy for threats related to operational technology assets can sought through the MITRE ATT&CK for Industrial Control System (ICS)\n https://collaborate.mitre.org/attackics/index.php/Main_Page  and NIST SP 800-30r1 https://csrc.nist.gov/publications/detail/sp/800-30/rev-1/final The types of threat sources and events that can affect the ability of the facility’s operation, potential consequences, and the likelihood should all shape the establishment of business process in-turn shaping the DER system architecture.",
      component: ({
        onStatusChange
      }) => {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        useEffect(() => {
          onStatusChange("locked");
        }, [onStatusChange]);
        return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(AppInput, {
          onInputChange: text => {
            onStatusChange(text.length === 0 ? "locked" : "valid");
          },
          placeholder: "Threat"
        }));
      }
    }, {
      title: "We now need some semi-quantitative values to be able to calculate your risk score. Let us start by assigning some values to the threat you just defined, shall we? ",
      guidance: "It is crucial to convey risk related information to business owners, officials, system owners, information security officers, and other stakeholders. Hence, the user requires to develop a list of DER system stakeholders and work with them from the Prepare step.",
      component: ({
        onStatusChange
      }) => {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        useEffect(() => {
          onStatusChange("locked");
        }, [onStatusChange]);
        return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(AppInput, {
          onInputChange: text => {
            onStatusChange(text.length === 0 ? "locked" : "valid");
          },
          placeholder: "Values"
        }));
      }
    }],
    guidance: "This is an example of a sequence"
  }
};