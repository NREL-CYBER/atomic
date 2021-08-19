import { listOutline, peopleOutline } from 'ionicons/icons';
import React, { useState } from 'react';
import { AppButton, AppButtons, AppCard, AppChip, AppContent, AppInput, AppItem, AppItemDivider, AppLabel, AppPage, AppSelect, AppSelectButtons, AppSelectOption, AppTabs } from '../components';
import AppSuggestedInput from '../components/forms/AppSuggestedInput';

const Home: React.FC = () => {
  const [platform, setPlatform] = useState<string>("Develop");
  const [val, setVal] = useState<string[]>([]);
  const [medal, setMedal] = useState<string>("");
  return <AppPage >
    <AppContent next>
      <AppCard >
        <div style={{ height: '200px' }}>

        </div>
        <AppTabs slot='bottom' selectedTab='tab1' tabs={[{
          icon: listOutline, path: "tab1", title: "Tab 1", component: () => <>
            This is a tab
          </>
        }, {
          icon: peopleOutline, path: "tab2", title: "Tab 2", component: () => <>
            This is another tab
          </>
        }]} />

      </AppCard>
      <AppCard headerColor="primary" titleColor="secondary" title="Welcome to atomic" subTitle="atomic">

        <AppChip color="success">
          Check out the examples to get started
        </AppChip>
        <AppInput debounce={500} onInputChange={() => {
          console.log("change");
        }} onInputBlur={() => {
          console.log("blur");
        }}>
        </AppInput>

        <AppItemDivider />
        <AppChip>
          AppColors
        </AppChip>
        <AppItem>

          <AppItem color="primary">
            Primary
          </AppItem>
          <AppItem color="secondary">
            Secondary
          </AppItem>
          <AppItem color="tertiary">
            Tertiary
          </AppItem>
          <AppItem color="success">
            Success
          </AppItem>
          <AppItem color="warning">
            Warning
          </AppItem>
        </AppItem>
        <AppItem>
          <AppItem color="favorite">
            Favorite
          </AppItem>
          <AppItem color="danger">
            Danger
          </AppItem>
          <AppItem color="light">
            Light
          </AppItem>
          <AppItem color="dark">
            Dark
          </AppItem>
          <AppItem color="medium">
            Medium
          </AppItem>
          <AppItem color="paper">
            Paper
          </AppItem>

        </AppItem>
        <AppItemDivider />

        <AppButtons slot="end">
          <AppButton routerLink={"/form"} color="primary" fill="solid">
            Form Example
          </AppButton>
        </AppButtons>
        <AppItem>
          <AppButtons slot="start">
            <AppLabel>
              AppSelectButtons
            </AppLabel>
          </AppButtons>
          <AppSelectButtons multi
            buttons={
              [
                { text: "multiple", value: "M", color: "primary" },
                { text: "choice", value: "C", color: "favorite" },
                { text: "selections", value: "S", color: "secondary" }
              ]
            } selected={val}
            onSelectionChange={(value) => {
              console.log(value);
              setVal(value);
            }} />
        </AppItem>
        <AppItemDivider />
        <AppItem>
          <AppLabel>
            App Datalist input
          </AppLabel>
          <AppButtons slot="end">
            <AppSuggestedInput value={medal} id="test" values={["gold", "silver", "bronze"]} onInputChange={(freshMedal) => {
              setMedal(freshMedal)
            }} />
          </AppButtons>
        </AppItem>
        <AppItemDivider />
        <AppItem>
          <AppLabel>
            AppSelect
          </AppLabel>
          <AppSelect onSelectionChange={setPlatform} value={platform} color={typeof val === "undefined" ? "warning" : "success"} placeholder="Environment" >
            <AppSelectOption value="Development" />
            <AppSelectOption value="Production" />
          </AppSelect>
        </AppItem>
      </AppCard>
    </AppContent >
  </AppPage >
}
export default Home;
