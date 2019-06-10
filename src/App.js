import React, { useState, Fragment } from 'react';
import Navbar from './components/Navbar';
import KeyUpload from './components/KeyUpload';
import Container from '@material-ui/core/Container';

const App = () => {
  const [wallet, setWallet] = useState(null);

  return (
    <Fragment>
      <Navbar />
      <Container fixed>
        <KeyUpload setWallet={setWallet} />
      </Container>
    </Fragment>
  );
};

export default App;
