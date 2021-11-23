import { AppCol, AppRow, AppSequence } from '../components';
import { listOutline, peopleOutline } from 'ionicons/icons';
import React, { useEffect, useState } from 'react';
import { v4 } from 'uuid';
import { AppButton, AppButtons, AppCard, AppChip, AppContent, AppForm, AppInput, AppItem, AppItemDivider, AppLabel, AppPage, AppRouteCard, AppSelect, AppSelectButtons, AppSelectOption, AppTabs } from '../components';
import AppSuggestedInput from '../components/forms/AppSuggestedInput';
import { AppTable } from '../components/global/AppTable';
import { useCompletion } from '../hooks';
import usePageTitle from '../hooks/usePageTitle';
import { palletSchema } from '../schemas/pallete.schema';
import { VisualizeValue } from '../components/AppJsonDisplay';


const Home: React.FC = () => {
  const [platform, setPlatform] = useState<string>("Develop");
  const [val, setVal] = useState<string[]>([]);
  const [medal, setMedal] = useState<string>("");
  const { setTitle } = usePageTitle();
  useEffect(() => {
    setTitle("Awesome");
  }, [setTitle])


  const { setPathState } = useCompletion()
  useEffect(() => {

    setPathState("/form", "unlocked")
  }, [setPathState])
  return <AppPage >
    <AppContent next>
      <AppCard>

        <VisualizeValue value={{
          "uuid": "1c6d044c-ee2f-4f4a-89b2-a66dbeca5404", "metadata": {
            "title": "System Security Plan",
            "last_modified":
              "2021-11-22T15:31:08.236Z", "version": "0.0.0", "oscal_version": "1.0.0"
          }, "import_profile": { "href": "HTTPS://Google.com" },
          "system_characteristics": {
            "system_ids": ["NICE"], "system_name": "TEST", "description": "YEAH",
            "security_sensitivity_level": "", "system_information": { "information_types": [] }, "security_impact_level": { "security_objective_confidentiality": "", "security_objective_integrity": "", "security_objective_availability": "" }, "status": { "state": "" }, "authorization_boundary": { "description": "" }
          }, "system_implementation": { "users": [{ nice: "ok" }], "components": [{ nice: "ok", "yeah": "nice" }] }, "control_implementation": { "description": "", "implemented_requirements": [] }, "back_matter": { "resources": [] }
        }} propertyInfo={{}} />

      </AppCard>
      <AppCard headerColor="tertiary" titleColor="secondary" title="Welcome to atomic" subTitle="atomic">
        <AppChip color="success">
          Check out the examples to get started
        </AppChip>
        <AppRow>

          <AppCol>

            <AppTable
              data={[{ uuid: v4(), name: "test" }, { uuid: v4(), name: 'test' }]}
              columns={['name', 'uuid']}
            />
          </AppCol>
          <AppCol>
            <AppSequence sequence={{ title: "A", elements: [] }}>

            </AppSequence>
          </AppCol>
        </AppRow>

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
      <AppTabs height={600} slot='bottom' selectedTab='tab2' tabs={[{
        icon: listOutline, path: "tab1", title: "Tab 1", component: () => <div>
          <AppForm data={{}} onSubmit={() => { }} rootSchema={palletSchema} objectSchema={palletSchema.definitions.pallete_element} />
        </div>
      }, {
        icon: peopleOutline, path: "tab2", title: "Tab 2", component: () => <>
          <AppRouteCard icon={""} path="/Form" title="form" />
        </>
      }]} />

    </AppContent >
  </AppPage >
}
export default Home;
