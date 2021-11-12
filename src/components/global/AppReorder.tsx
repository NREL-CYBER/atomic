import { ItemReorderEventDetail } from "@ionic/core"
import { IonReorder, IonReorderGroup } from "@ionic/react"




interface reOrderItemProps {
    disabled?: boolean
    slot?: "start" | "end"
}
interface reOrderGroupProps {
    disabled?: boolean
    onReorder: (event: CustomEvent<ItemReorderEventDetail>) => void
}

export const AppReorder: React.FC<reOrderItemProps> = (props) => {
    return <IonReorder {...props} />
}

export const AppReorderGroup: React.FC<reOrderGroupProps> = (props) => {
    return <IonReorderGroup onIonItemReorder={props.onReorder ? props.onReorder : undefined} {...props} />
}