import React from "react";
import { AppChip, AppForm, AppPage, AppButton, AppContent, AppCard, AppItem } from "../components";
import { useAddress } from "./ExampleConfig";
import { useState } from "react";

const ExampleForm: React.FC = () => {
    const { validator, insert, all } = useAddress()
    const [status, setStatus] = useState<"idle" | "editing">("idle")
    return <AppPage>
        <AppContent center>
            {status === "editing" ? <AppForm title={"form"} requiredOnly onSubmit={(data) => { insert(data); setStatus("idle") }} data={{}} validator={validator} /> :
                <AppCard contentColor="light" headerColor="primary" title="Addresses">{all().map(({ country_name, locality, region }, i) => <AppChip key={i} > {country_name + " " + locality + " " + region}</AppChip>)}
                    <AppItem>
                        <AppButton onClick={() => { setStatus("editing") }} >
                            Add Address
                        </AppButton>
                    </AppItem>
                </AppCard>}
        </AppContent>
    </AppPage>
}
export default ExampleForm;