import React, { useState } from 'react';
import axios from 'axios';
import {Button, IconButton, Input} from "@mui/material";
import {FileDownload, FileUpload} from "@mui/icons-material";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

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
            await axios.post('http://127.0.0.1:1240/api/import', formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });
            alert('Import successful!');
        } catch (error) {
            console.error('Import failed:', error.response?.data || error.message);
            alert('Failed to import data.');
        }
        handleClose()
    };

    const handleExport = async () => {
        try {
            const response = await axios.get('http://127.0.0.1:1240/api/export', { responseType: 'blob' });
            const blob = new Blob([response.data], { type: 'application/json' });
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'exported_data.json');
            document.body.appendChild(link);
            link.click();
            link.remove();
        } catch (error) {
            console.error('Export failed:', error.response?.data || error.message);
            alert('Failed to export data.');
        }
    };
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"

            >
                <DialogTitle id="alert-dialog-title">
                    {"Choose your data"}
                </DialogTitle>
                <DialogContent>
                    <input  type="file" accept=".json" onChange={handleFileChange}

                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Close</Button>
                    <Button onClick={handleImport}>
                        Load
                    </Button>
                </DialogActions>
            </Dialog>

            <IconButton onClick = {()=>{
                handleClickOpen()
            }}>
                <FileUpload  className="profile_app_bar_icon"></FileUpload>
            </IconButton>
            <IconButton onClick={()=>{
                handleExport()
            }}>
                <FileDownload  className="profile_app_bar_icon"></FileDownload>
            </IconButton>
            {/*<h1>Import and Export Data</h1>*/}

            {/*/!* Import Section *!/*/}
            {/*<div>*/}
            {/*    <h2>Import Data</h2>*/}
            {/*    <input type="file" accept=".json" onChange={handleFileChange} />*/}
            {/*    <button onClick={handleImport} disabled={loading}>*/}
            {/*        {loading ? 'Importing...' : 'Import'}*/}
            {/*    </button>*/}
            {/*</div>*/}

            {/*/!* Export Section *!/*/}
            {/*<div>*/}
            {/*    <h2>Export Data</h2>*/}
            {/*    <button onClick={handleExport} disabled={loading}>*/}
            {/*        {loading ? 'Exporting...' : 'Export'}*/}
            {/*    </button>*/}
            {/*</div>*/}
        </div>
    );
};

export default ImpExpComponent;
