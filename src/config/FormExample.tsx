import React, { useState } from "react";
import { AppButton, AppCard, AppContent, AppForm, AppItem, AppLabel, AppPage, AppTitle, AppAvatar } from "../components";
import { useAddress } from "./ExampleConfig";
import { binaryToFileUri } from "../util";
import AppBinaryImg from "../components/AppBinaryImg";

const ExampleForm: React.FC = () => {
    const { validator, insert, all } = useAddress()
    const [status, setStatus] = useState<"idle" | "editing">("idle")
    return <AppPage>
        <AppContent center>
            {status === "editing" ? <AppForm title={"form"} requiredOnly onSubmit={(data) => { insert(data); setStatus("idle") }} data={{}} validator={validator()} /> :
                <AppCard contentColor="light" headerColor="primary" title="Addresses">{all().map(({ street_address, country_name, street_view, region }, i) => {

                    const file_uri = binaryToFileUri(street_view, "image/png")
                    return <AppCard>
                        <AppLabel key={i} position="floating" color="primary" >
                            Address
                        </AppLabel>
                        <AppTitle color="medium">
                            {country_name}-{street_address}
                        </AppTitle>
                        <AppLabel key={i} position="floating" color="primary" >
                            Street View
                        </AppLabel>
                        <AppTitle>
                            <AppAvatar>
                                <AppBinaryImg height="100" alt="Street View" binary={street_view} />
                            </AppAvatar>
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