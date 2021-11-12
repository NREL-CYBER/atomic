import { AppContent } from "../components";
import { AppCollectionInterface } from "../components/AppCollectionInterface";
import { useAttack } from "./ExampleConfig";
export const ExamplePaginationAndSearch: React.FC = () => {
    return <AppContent>
        <AppCollectionInterface showInsert store={useAttack} />
    </AppContent >
}