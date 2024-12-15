import React, { useState } from 'react';
import axios from 'axios';

const ImpExpComponent = () => {
    const [file, setFile] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleImport = async () => {
        if (!file) {
            alert('Please select a file to import.');
            return;
        }

        const formData = new FormData();
        formData.append('file', file);

        try {
            setLoading(true);
            const response = await axios.post('http://127.0.0.1:1240/api/import', formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });

            const { recordsAdded } = response.data;
            alert(`Import successful! ${recordsAdded} records added.`);
        } catch (error) {
            console.error('Import failed:', error.response?.data || error.message);
            alert('Failed to import data.');
        } finally {
            setLoading(false);
        }
    };

    const handleExport = async () => {
        try {
            setLoading(true);
            const response = await axios.get('http://127.0.0.1:1240/api/export', { 
                responseType: 'blob'
            });
    
            const totalRecords = response.headers['x-total-records'] || response.headers['X-Total-Records'];
            if (totalRecords) {
                alert(`Export successful! ${totalRecords} records exported.`);
            } else {
                alert('Export successful, but total records count could not be retrieved.');
            }
    
            // Handle file download
            const blob = response.data;
            const link = document.createElement('a');
            link.href = URL.createObjectURL(blob);
            link.download = 'exported_data.json';
            link.click();
        } catch (error) {
            console.error('Export failed:', error.response?.data || error.message);
            alert('Failed to export data.');
        } finally {
            setLoading(false);
        }
    };
    

    return (
        <div>
            <h1>Import and Export Data</h1>

            <div>
                <h2>Import Data</h2>
                <input type="file" accept=".json" onChange={handleFileChange} />
                <button onClick={handleImport} disabled={loading}>
                    {loading ? 'Importing...' : 'Import'}
                </button>
            </div>

            <div>
                <h2>Export Data</h2>
                <button onClick={handleExport} disabled={loading}>
                    {loading ? 'Exporting...' : 'Export'}
                </button>
            </div>
        </div>
    );
};

export default ImpExpComponent;

