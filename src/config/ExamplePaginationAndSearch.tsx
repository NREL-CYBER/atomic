import { AppButtons, AppLabel, AppText } from "atomic";
import { AppCard, AppChip, AppContent, AppItem, AppModal, AppTitle } from "../components";
import { AppPaginatedList } from "../components/AppPaginatedList";
import { useAttack } from "./ExampleConfig";
export const ExamplePaginationAndSearch: React.FC = () => {
    const { setActive, activeInstance } = useAttack()
    const selected = activeInstance();
    return <AppContent center>
        <AppModal smol isOpen={typeof selected !== 'undefined'} onDismiss={() => {
            setActive("");
        }}>
            <AppContent>
                {selected && <AppCard title={selected["name"] || "Relationship"}>
                    {Object.keys(selected || {}).map((k, i) => <AppItem key={i}>
                        <AppLabel>
                            {k}
                        </AppLabel>
                        {typeof selected[k] === 'string' && <AppText color='medium'>{selected[k]}</AppText>}
                        {typeof selected[k] === 'object' && typeof selected[k].map === "function" && <AppText color='medium'>{selected[k].map((x: any) => <AppChip>
                            {typeof x === 'string' && <AppText color='medium'>{x}</AppText>}
                            {typeof x === 'object' && <AppText color='medium'>{Object.values(x)}</AppText>}

                        </AppChip>)}</AppText>}
                    </AppItem>)}
                </AppCard>}
            </AppContent>
        </AppModal >

        <AppPaginatedList  search filterCategories={{ "type": { multi: false, options: [{ value: "malware" }, { value: "attack-pattern" }] } }} renderItem=
            {(item) => {
                return <AppItem href={"javascript:void"} onClick={() => {
                    setActive(item.id)
                }} >
                    <AppButtons slot='start'>
                        <AppTitle>{item.name || item.relationship_type}</AppTitle>
                    </AppButtons>
                    <AppButtons slot='end'>
                        <AppChip>{item.type}</AppChip>
                    </AppButtons>

                </AppItem>
            }}
            store={useAttack}
        />
    </AppContent >
}