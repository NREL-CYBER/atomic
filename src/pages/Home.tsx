import React, { useState } from 'react';
import { AppButton, AppButtons, AppCard, AppChip, AppContent, AppItem, AppItemDivider, AppLabel, AppPage, AppSelect, AppSelectButtons, AppSelectOption } from '../components';
import AppSuggestedInput from '../components/forms/AppSuggestedInput';

const Home: React.FC = () => {
  const [val, setVal] = useState<string | undefined>();
  return <AppPage >
    <AppContent>
      <AppCard headerColor="primary" titleColor="secondary" title="Welcome to atomic" subTitle="@nrel/atomic">
        <AppChip color="success">
          Check out the examples to get started
        </AppChip>
        <AppItemDivider />
        <AppItem>
          <AppChip>
            AppColors
          </AppChip>
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
          <AppItem color="favorite">
            Favorite
          </AppItem>
          <AppItem color="warning">
            Warning
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


          <AppButtons slot="end">
            <AppButton routerLink={"/form"} color="primary" fill="solid">
              Form Example
            </AppButton>
          </AppButtons>
        </AppItem>
        <AppItem>
          <AppLabel>
            App Select Buttons
          </AppLabel>
          <AppSelectButtons multi={false} buttons={[{ text: "asdasd", value: "s", color: "primary" }, { text: "asdssasd", value: "sw", color: "primary" }]} selected={[]} onSelectionChange={() => { }} />
        </AppItem>
        <AppItemDivider />
        <AppItem>
          <AppLabel>
            App Datalist input
          </AppLabel>
          <AppSuggestedInput id="test" values={["test", "value"]} onInputChange={() => {
            console.log("")
          }} />
        </AppItem>
        <AppItemDivider />
        <AppItem>
          <AppLabel>
            AppSelect
          </AppLabel>
          <AppSelect onSelectionChange={setVal} value={val} color={typeof val === "undefined" ? "warning" : "success"} placeholder="Environment" >
            <AppSelectOption value="Development" />
            <AppSelectOption value="Production" />
          </AppSelect>
        </AppItem>
      </AppCard>
    </AppContent>
  </AppPage>
}
export default Home;
