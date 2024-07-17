import { ILoanItem } from '@/interfaces/loan/loan';

export interface ILoanListItemProps {
	item: ILoanItem;
	selectable?: boolean;
	selected?: boolean;
}
