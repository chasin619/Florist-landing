import React from 'react';
import { CircularProgress, Backdrop } from '@mui/material';

interface LoadingOverlayProps {
    open: boolean;
}

const LoadingOverlay: React.FC<LoadingOverlayProps> = ({ open }) => {
    return (
        <Backdrop open={open} sx={{ color: 'blue', zIndex: (theme) => theme.zIndex.drawer + 1 }}>
            <CircularProgress color="inherit" />
        </Backdrop>
    );
};

export default LoadingOverlay;
