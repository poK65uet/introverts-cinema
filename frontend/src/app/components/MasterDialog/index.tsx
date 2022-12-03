import React from 'react';
import {
	ToastContainer,
	ToastContainerProps,
	toast
} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface MasterDialogProps {
	type?: 'info' | 'success' | 'warning' | 'error' | 'promise' | undefined
	content: string
	autocloseDelay?: number
	promiseTimeout?: number
	promisePending?: string
	promiseSuccess?: string
	promiseError?: string
}

export const notify = (props: MasterDialogProps) => {

	props.type == 'info' ? toast.info(props.content, {
		autoClose: props.autocloseDelay ? props.autocloseDelay : undefined
	}) :
		props.type == 'success' ? toast.success(props.content, {
			autoClose: props.autocloseDelay ? props.autocloseDelay : undefined
		}) :
			props.type == 'warning' ? toast.warning(props.content, {
				autoClose: props.autocloseDelay ? props.autocloseDelay : undefined
			}) :
				props.type == 'error' ? toast.error(props.content, {
					autoClose: props.autocloseDelay ? props.autocloseDelay : undefined
				}) :
					props.type == 'promise' ? toast.promise(
						new Promise(resolve => setTimeout(resolve, props.promiseTimeout)),
						{
							pending: props.promisePending,
							success: props.promiseSuccess,
							error: props.promiseError,

						}
					) : toast(props.content);
}

export default function MasterDialog(props?: ToastContainerProps) {

	return (
		<ToastContainer {...props}
			position='bottom-left'
			newestOnTop
			pauseOnHover={false}
			pauseOnFocusLoss={false} />
	);
}