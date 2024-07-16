export interface IModalProps {
	visible?: boolean;
	onHide: () => void;
	title?: string | React.ReactNode;
	subTitle?: string | React.ReactNode;
	children?: React.ReactNode;
	className?: string;
	closeOnEscape?: boolean;
	closeOnOutside?: boolean;
	showBackIcon?: boolean;
	childrenClass?: string;
}
