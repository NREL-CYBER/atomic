import React from 'react';
import { AppButton, AppButtons, AppCard, AppChip, AppContent, AppItem, AppPage } from '../components';

const Home: React.FC = () => {
  return <AppPage >
    <AppContent center>
      <AppCard contentColor={"light"} headerColor="primary" title="Welcome to atomic">
        <AppChip color="success">
          Check out the examples to get started
        </AppChip>
        <AppItem>
          <AppButtons slot="start">
            <AppButton routerLink={"/uploader"} color="primary" fill="solid">
              Uploader Example
            </AppButton>
          </AppButtons>
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
