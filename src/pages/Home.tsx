import React from 'react';
import { AppButton, AppButtons, AppCard, AppChip, AppContent, AppItem, AppPage } from '../components';

const Home: React.FC = () => {
  return <AppPage >
    <AppContent >
      <AppCard headerColor="primary" titleColor="secondary" title="Welcome to atomic">
        <AppChip color="success">
          Check out the examples to get started
        </AppChip>
        <AppItem>
          <AppChip>
            Colors
          </AppChip>
          <AppItem color="primary">
            Primary
          </AppItem>
          <AppItem color="secondary">
            Secondary
          </AppItem>
          <AppItem color="tertiary">
            Tertiary
          </AppItem>
          <AppItem color="success">
            Success
          </AppItem>
          <AppItem color="favorite">
            Favorite
          </AppItem>
          <AppItem color="warning">
            Warning
          </AppItem>
          <AppItem color="danger">
            Danger
          </AppItem>
          <AppItem color="light">
            Light
          </AppItem>
          <AppItem color="dark">
            Dark
          </AppItem>
          <AppItem color="medium">
            Medium
          </AppItem>
          <AppItem color="paper">
            Paper
          </AppItem>


          <AppButtons slot="end">
            <AppButton routerLink={"/form"} color="primary" fill="solid">
              Form Example
            </AppButton>
          </AppButtons>
        </AppItem>
      </AppCard>
    </AppContent>
  </AppPage>
}
export default Home;
