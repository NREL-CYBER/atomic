import React, { useState } from 'react';
import { AppButton, AppButtons, AppCard, AppChip, AppContent, AppItem, AppItemDivider, AppLabel, AppPage, AppSelect, AppSelectButtons, AppSelectOption } from '../components';
import AppSuggestedInput from '../components/forms/AppSuggestedInput';

const Home: React.FC = () => {
  const [platform, setPlatform] = useState<string>("Develop");
  const [val, setVal] = useState<string[]>([]);
  const [medal, setMedal] = useState<string>("");
  return <AppPage >
    <AppContent>
      <AppCard headerColor="primary" titleColor="secondary" title="Welcome to atomic" subTitle="atomic">
        <AppChip color="success">
          Check out the examples to get started
        </AppChip>
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
