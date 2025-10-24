import React from 'react';
import { Header } from './components/Header';
import { InputSection } from './components/InputSelection';
import { DataTable } from './components/DataTable';

const App: React.FC = () => {
  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f5f5f5' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '20px' }}>
        <Header />
        <InputSection />
        <DataTable />
      </div>
    </div>
  );
};

export default App;