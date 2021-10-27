import React, { useState } from "react";
import { AppPage } from "../components";
import { useAddress } from "./ExampleConfig";
const ExampleForm: React.FC = () => {
    const { schema, insert, all } = useAddress();
    const [status, setStatus] = useState<"idle" | "editing">("idle")
    return <AppPage>
    </AppPage>
}
export default ExampleForm;