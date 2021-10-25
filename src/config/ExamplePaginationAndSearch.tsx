import { AppButtons, AppLabel, AppText } from "atomic";
import { AppChip, AppContent, AppFoldingNode, AppModal, AppTitle, AppItem, AppCard } from "../components";
import { AppPaginatedList } from "../components/AppPaginatedList";
import { useAttack } from "./ExampleConfig";
export const ExamplePaginationAndSearch: React.FC = () => {
    const { setActive, activeInstance } = useAttack()
    const selected = activeInstance();
    return <AppContent center>
        <AppModal smol isOpen={typeof selected !== 'undefined'} onDismiss={() => {
            setActive(undefined);
        }}>

            <AppCard>
                {Object.keys(selected || {}).map((k) => <AppItem>
                    <AppLabel>
                        {k}
                    </AppLabel>
                    {typeof selected[k] === 'string' && <AppText color='medium'>{selected[k]}</AppText>}
                </AppItem>)}
            </AppCard>
        </AppModal>

        <AppPaginatedList render=
            {({ item }) => {
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
    </AppContent>
}