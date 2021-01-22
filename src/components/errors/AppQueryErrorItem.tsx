import React from 'react';
import { QueryError } from '../../state/QueryError';
import { AppContent, AppItem, AppText, AppButtons, AppBadge, AppCard } from '..';


/**
 * Display a Query Error
 */
interface ErrorItemProps {
    error: QueryError<any> | undefined
}

const AppQueryErrorItem: React.FC<ErrorItemProps> = ({ error }) => {
    const errorMessage = (error && error.message) || "Unknown error";
    const property = (error && error.property) || "!";
    return <AppContent>
        <AppItem color='danger' >
            <AppText>{errorMessage}</AppText>
            <AppButtons slot='end'>
                <AppBadge color='warning'>{property}</AppBadge>
            </AppButtons>
        </AppItem>
        <AppCard title="Is this a bug?">
            <AppItem>
                Please submit an issue!
            </AppItem>
        </AppCard>
    </AppContent>
}
export default AppQueryErrorItem;
