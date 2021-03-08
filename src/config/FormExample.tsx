import React, { useState } from "react";
import { AppButton, AppCard, AppContent, AppForm, AppItem, AppLabel, AppPage, AppTitle, AppAvatar } from "../components";
import { useAddress } from "./ExampleConfig";
import AppBinaryImg from "../components/AppBinaryImg";
import { useCompletion } from "../hooks";
import { useEffect } from "react";

const ExampleForm: React.FC = () => {
    const { validator, insert, all } = useAddress.getState();
    const { setPathState } = useCompletion();
    useEffect(() => {
        setPathState("/Form", "valid");
        setPathState("/", "valid");
    }, [setPathState]);
    const [status, setStatus] = useState<"idle" | "editing">("idle")
    return <AppPage>
        <AppContent center>
            {status === "editing" ? <AppForm title={"Address"} requiredOnly onSubmit={(data) => { insert(data); setStatus("idle") }} data={{}} validator={validator()} /> :
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