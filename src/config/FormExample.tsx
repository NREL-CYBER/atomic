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
                onSubmit={(data) => {
                    insert(data).then(() => {
                        setStatus("idle");
                    });
                }} data={{}} lazyLoadValidator={lazyLoadValidator} /> :
                <AppCard contentColor="paper"
                    titleColor="secondary" headerColor="primary"
                    title="Addresses">
                    {all().map(({ street_address, country_name, street_view, region }, i) => {
                        return <AppCard key={i} contentColor="light">
                            <AppLabel position="floating" color="primary" >
                                Address
                            </AppLabel>
                            <AppTitle color="medium">
                                {country_name}-{street_address} {region}
                            </AppTitle>
                            <AppLabel position="floating" color="primary" >
                                Street View
                            </AppLabel>
                            <AppTitle>
                                <AppAvatar>
                                    {street_view && <AppBinaryImg height="100" alt="Street View" binary={atob(street_view)} />}
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