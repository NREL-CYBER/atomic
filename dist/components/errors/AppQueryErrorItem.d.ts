import React from 'react';
import { QueryError } from '../../state/QueryError';
/**
 * Display a Query Error
 */
interface ErrorItemProps {
    error: QueryError<any> | undefined;
}
declare const AppQueryErrorItem: React.FC<ErrorItemProps>;
export default AppQueryErrorItem;
