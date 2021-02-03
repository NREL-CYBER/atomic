import React from "react";
import { AppChip, AppForm, AppPage } from "../components";
import { useAddress } from "./ExampleConfig";

const ExampleForm: React.FC = () => {
    const { validator, insert, all } = useAddress()
    return <AppPage>
        {all().map(({ country_name, locality, region }) => <AppChip> {country_name + " " + locality + " " + region}</AppChip>)}
        <AppForm requiredOnly onSubmit={insert} data={{}} validator={validator} />
    </AppPage>
}
export default ExampleForm;