import { AnimatePresence, motion } from 'framer-motion';
import { useCallback, useEffect, useRef } from 'react';
import { Text } from '@/components/ui/Text';
import classes from './Modal.module.scss';
import { IModalProps } from './IModalProps';
import { Icon } from '../Icon';

const Modal: React.FC<IModalProps> = ({
	onHide,
	children,
	className,
	closeOnEscape,
	closeOnOutside,
	title,
	subTitle,
	visible,
	childrenClass,
	showBackIcon,
}) => {
	const backdropRef = useRef<HTMLDivElement>(null);

	const handleKeydown = useCallback(
		(event: KeyboardEvent) => {
			if (event.key === 'Escape' && closeOnEscape) {
				onHide();
			}
		},
		[closeOnEscape, onHide]
	);

	useEffect(() => {
		const handleBackdropClick = () => {
			onHide();
		};

		const handleDocumentKeydown = (event: KeyboardEvent) => {
			handleKeydown(event);
		};

		const handlePopState = () => {
			onHide();
		};

		if (visible) {
			document.body.style.overflow = 'hidden';
			window.history.pushState(null, '', window.location.href);

			if (closeOnOutside) {
				backdropRef.current?.addEventListener(
					'click',
					handleBackdropClick
				);
			}
			if (closeOnEscape) {
				document.addEventListener('keydown', handleDocumentKeydown);
			}
			window.addEventListener('popstate', handlePopState);
		} else {
			document.body.style.overflow = 'unset';
			if (closeOnOutside) {
				backdropRef.current?.removeEventListener(
					'click',
					handleBackdropClick
				);
			}
			if (closeOnEscape) {
				document.removeEventListener('keydown', handleDocumentKeydown);
			}
			window.removeEventListener('popstate', handlePopState);
		}

		return () => {
			if (closeOnOutside) {
				backdropRef.current?.removeEventListener(
					'click',
					handleBackdropClick
				);
			}
			if (closeOnEscape) {
				document.removeEventListener('keydown', handleDocumentKeydown);
			}
			window.removeEventListener('popstate', handlePopState);
		};
	}, [visible, closeOnOutside, closeOnEscape, handleKeydown, onHide]);

	return (
		<AnimatePresence>
			{visible && (
				<div className={classes.parent}>
					<div
						className={classes.backdrop}
						ref={backdropRef}
						data-testid='backdrop'
					></div>
					<motion.div
						data-testid='modal'
						animate={{
							x: 0,
							y: 0,
						}}
						transition={{ duration: 0.2 }}
						initial={{ y: '100%', x: 0 }}
						exit={{ y: '100%', x: 0 }}
						className={`${classes.container} ${className || ''}`}
					>
						<div className={classes.title}>
							{showBackIcon && <Icon name='arrow/right-long' />}
							{(title || subTitle) && (
								<div className={classes['title-content']}>
									{title && (
										<Text variant='h6' size='base'>
											{title}
										</Text>
									)}
									{subTitle && (
										<Text
											variant='p'
											size='sm'
											color='content-secondary'
										>
											{title}
										</Text>
									)}
								</div>
							)}
						</div>
						<div className={`w-full ${childrenClass || ''}`}>
							{children}
						</div>
					</motion.div>
				</div>
			)}
		</AnimatePresence>
	);
};

export default Modal;
