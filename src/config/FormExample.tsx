import { AppContent } from "atomic";
import React, { useState } from "react";
import { AppPage } from "../components";
import AppForm from "../components/forms/AppForm";
import { useAddress, useAttack } from "./ExampleConfig";
const ExampleForm: React.FC = () => {
    const { schema, insert, all, collection } = useAddress();
    const [status, setStatus] = useState<"idle" | "editing">("idle")
    return <AppPage>
        <AppContent>
            <AppForm rootSchema={schema as any} objectSchema={schema.definitions!['system_security_plan']} data={{}} onSubmit={() => {
            }}>

            </AppForm>
        </AppContent>
    </AppPage>
}
export default ExampleForm;