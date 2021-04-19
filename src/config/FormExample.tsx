import React, { useState } from "react";
import { AppAvatar, AppButton, AppCard, AppContent, AppItem, AppLabel, AppPage, AppTitle } from "../components";
import AppBinaryImg from "../components/AppBinaryImg";
import AppFormComposer from "../components/forms/AppFormComposer";
import { useAddress } from "./ExampleConfig";

const ExampleForm: React.FC = () => {
    const { lazyLoadValidator, insert, all } = useAddress.getState();
    const [status, setStatus] = useState<"idle" | "editing">("idle")
    return <AppPage>
        <AppContent center>
            {status === "editing" ? <AppFormComposer
                title={"Address"}
                requiredOnly
                onSubmit={(data) => {
                    console.log(data);
                    insert(data); setStatus("idle")
                }} data={{}} lazyLoadValidator={lazyLoadValidator} /> :
                <AppCard contentColor="paper" titleColor="secondary" headerColor="primary" title="Addresses">{all().map(({ street_address, country_name, street_view, region }, i) => {
                    return <AppCard contentColor="light">
                        <AppLabel key={i} position="floating" color="primary" >
                            Address
                        </AppLabel>
                        <AppTitle color="medium">
                            {country_name}-{street_address} {region}
                        </AppTitle>
                        <AppLabel key={i} position="floating" color="primary" >
                            Street View
                        </AppLabel>
                        <AppTitle>
                            <AppAvatar>
                                <AppBinaryImg height="100" alt="Street View" binary={atob(street_view)} />
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