import React, { useState } from "react";
import { v4 } from "uuid";
import { AppButton, AppCard, AppContent, AppFormComposer, AppItem, AppLabel, AppPage, AppTitle } from "../components";
import AppBinaryImg from "../components/AppBinaryImg";
import { useAddress } from "./ExampleConfig";
import oscal_schema from "../schemas/address.schema.json"
const ExampleForm: React.FC = () => {
    const { schema, insert, all } = useAddress();
    const [status, setStatus] = useState<"idle" | "editing">("idle")
    return <AppPage>
        <AppContent>
            {status === "editing" ? <AppFormComposer
                objectSchema={oscal_schema.definitions.assessment_plan as any}
                rootSchema={oscal_schema}
                title={"Address"}
                onSubmit={(data: any) => {
                    insert(v4(), data).then(() => {
                        setStatus("idle");
                    });
                }} data={{}} /> :
                <AppCard contentColor="paper"
                    titleColor="secondary" headerColor="primary"
                    title="Addresses">
                    {all().map(({ street_address, country_name, street_view, region }, i) => {
                        return <AppCard key={i} contentColor="light">
                            <AppLabel position="floating" color="primary" >
                                {street_address}
                            </AppLabel>
                            {street_view && <AppLabel position="floating" color="primary" >
                                Street View
                            </AppLabel>}
                            <AppTitle>
                                {street_view && <AppBinaryImg height="100" alt="Street View" binary={atob(street_view)} />}
                            </AppTitle>
                        </AppCard >
                    })}
                    <AppItem>
                        <AppButton onClick={() => { setStatus("editing") }} >
                            Add Address
                        </AppButton>
                    </AppItem>
                </AppCard>
            }
        </AppContent>
    </AppPage>
}
export default ExampleForm;