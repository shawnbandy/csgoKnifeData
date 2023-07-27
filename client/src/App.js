import logo from './logo.svg';
import './App.css';
import Header from './components/header/header.js';
import Body from './components/body/body.js';
import Footer from './components/footer/footer.js';
import { useState } from 'react';

function App() {
  const [currentNav, setCurrentNav] = useState('tAP');
  const handleNavChange = (page) => setCurrentNav(page);
  return (
    <main>
      <Header currentNav={currentNav} handleNavChange={handleNavChange} />
      <Body currentNav={currentNav} handleNavChange={handleNavChange} />
      <Footer />
    </main>
  );
}

export default App;
