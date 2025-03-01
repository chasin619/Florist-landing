import React, { useState } from 'react';
import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Button,
    CircularProgress
} from '@mui/material';

interface DeleteConfirmationModalProps {
    open: boolean;
    onClose: () => void;
    onConfirm: () => Promise<void>;
    title?: string;
    description?: string;
    isShareable: boolean;
}

const
    DeleteConfirmationModal: React.FC<DeleteConfirmationModalProps> = ({
        open,
        onClose,
        onConfirm,
        title = 'Delete Confirmation',
        description = 'Are you sure you want to delete this item?',
        isShareable
    }) => {
        const [loading, setLoading] = useState(false);

        const handleDelete = async () => {
            setLoading(true);
            try {
                await onConfirm();
            } catch (error) {
                console.error("Error during deletion:", error);
            } finally {
                setLoading(false);
                onClose();
            }
        };

        return (
            <Dialog open={open} onClose={onClose}>
                <DialogTitle>{title}</DialogTitle>
                <DialogContent>
                    <DialogContentText>{description}</DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={onClose} color="primary" disabled={loading}>
                        Cancel
                    </Button>
                    <Button
                        onClick={handleDelete}
                        color="error"
                        variant="contained"
                        disabled={loading || isShareable}
                        startIcon={loading ? <CircularProgress size={20} /> : null}
                    >
                        {loading ? 'Deleting...' : 'Delete'}
                    </Button>
                </DialogActions>
            </Dialog>
        );
    };

export default DeleteConfirmationModal;
