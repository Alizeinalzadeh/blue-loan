import React from 'react';
import { ToastContainerProps } from 'react-toastify';

export interface IToast extends ToastContainerProps {
	position?:
		| 'top-right'
		| 'top-center'
		| 'top-left'
		| 'bottom-right'
		| 'bottom-center'
		| 'bottom-left';
	autoClose?: number | false;
	closeButton?: React.ReactElement | boolean;
	hideProgressBar?: boolean;
	pauseOnHover?: boolean;
	pauseOnFocusLoss?: boolean;
	rtl?: boolean;
	closeOnClick?: boolean;
	newestOnTop?: boolean;
	draggable?: boolean;
	limit?: number;
	theme?: 'colored' | 'light' | 'dark';
}
