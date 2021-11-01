import { AppContent } from "../components";
import { AppCollectionInterface } from "../components/AppCollectionInterface";
import { useAddress } from "./ExampleConfig";
export const ExamplePaginationAndSearch: React.FC = () => {
    return <AppContent>
        <AppCollectionInterface showInsert store={useAddress} />
    </AppContent >
}