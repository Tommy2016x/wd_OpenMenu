import React from 'react';

import Card from '@material-ui/core/Card';
import MauricioC from '../../components/MauricioC';
import ElliotC from '../../components/ElliotC'

const LandingPV = props => {
  return (
    <div>
      <Card>
        <h1>Home Page!</h1>
        <MauricioC />
        <ElliotC />
      </Card>
    </div>
  );
};

export default LandingPV;
