import React from 'react';
import { AppButton, AppButtons, AppCard, AppContent, AppItem, AppPage } from '../components';

const FormExamples = () => {
  return <AppPage>
        <AppContent>
            <AppCard titleColor="primary" title={"Welcome to Atomic!"}>
                Check out the examples to get started
  <AppItem>
                    <AppButtons slot="end">
                        <AppButton color="favorite" fill="solid">
                            Lets Go
            </AppButton>
                    </AppButtons>
                </AppItem>
            </AppCard>
        </AppContent>
    </AppPage>;
};

export default FormExamples;