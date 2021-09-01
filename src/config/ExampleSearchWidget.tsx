import { AppItem, AppList } from "../components"

export const ExampleSearchWidget: React.FC<{ query: string, dismiss: () => void }> = ({ query, dismiss }) => {
    return <AppList>
        <AppItem routerLink={"/form"} onClick={dismiss}>
            Form
        </AppItem>
    </AppList >
}