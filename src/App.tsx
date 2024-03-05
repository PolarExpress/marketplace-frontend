// Should handle global routing and overall page layout
import React from 'react';
import HomePage from './pages/HomePage';
import Header from './components/Header'; 

const App = () => {
  return (
    <> 
      <Header />  
      <HomePage /> 
    </>
  );
};

export default App;