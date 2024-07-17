import { ToastContainer, Slide } from 'react-toastify';
import { IToast } from './IToast';
import 'react-toastify/dist/ReactToastify.css';
import './Toast.css';

const Toast: React.FC<IToast> = () => {
	return (
		<ToastContainer
			autoClose={3000}
			position='top-center'
			closeButton
			pauseOnHover
			pauseOnFocusLoss={false}
			closeOnClick
			newestOnTop
			draggable
			limit={5}
			theme='colored'
			transition={Slide}
		/>
	);
};

export default Toast;
