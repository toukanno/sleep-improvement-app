import { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Dashboard } from './components/Dashboard';
import { RecordForm } from './components/RecordForm';
import { History } from './components/History';
import { Tips } from './components/Tips';
import { Page, SleepRecord } from './types/sleep';
import { loadRecords, addRecord, deleteRecord, calcStats, updateRecord } from './utils/sleepUtils';
import './App.css';

function App() {
  const [page, setPage] = useState<Page>('dashboard');
  const [records, setRecords] = useState<SleepRecord[]>([]);
  const [editingRecord, setEditingRecord] = useState<SleepRecord | null>(null);

  useEffect(() => {
    setRecords(loadRecords());
  }, []);

  const handleSave = (record: SleepRecord) => {
    const updated = editingRecord ? updateRecord(record) : addRecord(record);
    setRecords(updated);
    setEditingRecord(null);
  };

  const handleDelete = (id: string) => {
    const updated = deleteRecord(id);
    setRecords(updated);
  };

  const handleEdit = (record: SleepRecord) => {
    setEditingRecord(record);
    setPage('record');
  };

  const stats = calcStats(records);

  const handlePageChange = (nextPage: Page) => {
    if (nextPage !== 'record') {
      setEditingRecord(null);
    }
    setPage(nextPage);
  };

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
        {page === 'record' && (
          <RecordForm
            onSave={handleSave}
            initialRecord={editingRecord}
            onCancelEdit={() => { setEditingRecord(null); setPage('history'); }}
          />
        )}
        {page === 'history' && <History records={records} onDelete={handleDelete} onEdit={handleEdit} />}
        {page === 'tips' && <Tips />}
      </main>
      <Navbar current={page} onChange={handlePageChange} />
    </div>
  );
}

export default App;
