import React from 'react';
import AppButtons from '../../AppButtons';
import AppItem from '../../AppItem';
import AppPage from '../../AppPage';
import AppLabel from '../../AppLabel';


export type GlossaryDefinition = string;
export interface Glossary {
    records: Record<string, GlossaryDefinition>;
}

interface glossaryParams {
    glossary: Glossary
}
const AppGlossary: React.FC<glossaryParams> = ({ glossary }) =>
    <AppPage>
        {Object.entries(glossary.records)
            .map(([word, definition]) => < AppItem>
                <AppButtons slot="start">
                    <AppLabel>
                        {word}
                    </AppLabel>
                </AppButtons>
                <AppButtons slot="end">
                    <AppLabel>
                        {definition}
                    </AppLabel>
                </AppButtons>
            </AppItem>)}
        <AppItem />
    </AppPage >

export default AppGlossary;