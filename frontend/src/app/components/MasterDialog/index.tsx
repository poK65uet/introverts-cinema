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
	promiseTimeout?: number
	promisePending?: string
	promiseSuccess?: string
	promiseError?: string
}

export const notify = (props: MasterDialogProps) => {
	props.type == 'info' ? toast.info(props.content) :
		props.type == 'success' ? toast.success(props.content) :
			props.type == 'warning' ? toast.warning(props.content) :
				props.type == 'error' ? toast.error(props.content) :
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
		<ToastContainer style={{ zIndex: 9 }} position='bottom-left' {...props} />
	);
}