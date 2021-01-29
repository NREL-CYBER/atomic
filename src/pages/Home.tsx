import React from 'react';
import { AppButton, AppButtons, AppCard, AppContent, AppItem, AppPage } from '../components';

const Home: React.FC = () => {
  return <AppPage >
    <AppContent>
      <AppCard contentColor={"light"} titleColor="primary" title={"Welcome to Atomic!"}>
        Check out the examples to get started
        <AppItem>
          <AppButtons slot="end">
            <AppButton routerLink={"/form"} color="favorite" fill="solid">
              Form Example
            </AppButton>
          </AppButtons>
        </AppItem>
      </AppCard>
    </AppContent>
  </AppPage>
}
export default Home;
