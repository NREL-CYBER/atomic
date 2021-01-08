import React from 'react';
import { AppButtons } from '..';
import AppItem from '../AppItem';
import AppPage from '../AppPage';
import AppLabel from '../AppLabel';

const AppGlossary = ({
  glossary
}) => <AppPage>
        {Object.entries(glossary.records).map(([word, definition]) => <AppItem>
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
    </AppPage>;

export default AppGlossary;