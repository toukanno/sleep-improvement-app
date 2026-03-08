import { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Dashboard } from './components/Dashboard';
import { RecordForm } from './components/RecordForm';
import { History } from './components/History';
import { Tips } from './components/Tips';
import { Page, SleepRecord } from './types/sleep';
import { loadRecords, addRecord, deleteRecord, calcStats } from './utils/sleepUtils';
import './App.css';

function App() {
  const [page, setPage] = useState<Page>('dashboard');
  const [records, setRecords] = useState<SleepRecord[]>([]);

  useEffect(() => {
    setRecords(loadRecords());
  }, []);

  const handleSave = (record: SleepRecord) => {
    const updated = addRecord(record);
    setRecords(updated);
  };

  const handleDelete = (id: string) => {
    const updated = deleteRecord(id);
    setRecords(updated);
  };

  const stats = calcStats(records);

  return (
    <div className="app">
      <main className="main">
        {page === 'dashboard' && (
          <Dashboard
            records={records}
            stats={stats}
            onNavigateRecord={() => setPage('record')}
          />
        )}
        {page === 'record' && <RecordForm onSave={handleSave} />}
        {page === 'history' && <History records={records} onDelete={handleDelete} />}
        {page === 'tips' && <Tips />}
      </main>
      <Navbar current={page} onChange={setPage} />
    </div>
  );
}

export default App;
