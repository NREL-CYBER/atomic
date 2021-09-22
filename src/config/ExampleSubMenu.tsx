import { IonSplitPane } from "@ionic/react"
import { AppContent } from "atomic"
import { AppCard, AppList } from "../components"
import AppSubMenu from "../components/AppSubMenu"
import { submenuRoute } from "./routes"

export const ExampleSubMenu: React.FC = () => {
    return <>
        <IonSplitPane>
            <AppList>
                <AppSubMenu pages={submenuRoute.nested as any} />
            </AppList>
            <AppContent>
                <AppCard></AppCard>
            </AppContent>
        </IonSplitPane>
    </>
}