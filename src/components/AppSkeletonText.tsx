import { IonSkeletonText } from "@ionic/react"

interface skeletonTextProps {
    animated?: boolean
}
export const AppSkeletonText: React.FC<skeletonTextProps> = ({ animated = true }) => {
    return <IonSkeletonText animated={animated} />
}
