import { Text } from '@/components/ui/Text';
import { ILoanListItemProps } from './ILoanListItemProps';
import { numberSeparator } from '@/utils/numberSeprator';
import { Button } from '@/components/ui/Button';

const LoanListItem: React.FC<ILoanListItemProps> = ({
	item,
	selectable,
	selected,
}) => {
	return (
		<div
			className={`w-full cursor-pointer  rounded-lg border p-4 flex flex-col gap-4 ${selectable && selected ? 'border-2 border-primary-main' : 'border-surface-light'}`}
		>
			<header className='flex justify-between items-center pb-4 border-b border-b-surface-light border-dashed'>
				<Text variant='h3' size='base'>
					{item.name}
				</Text>
				<div className='flex justify-start items-center gap-1'>
					<Text variant='p' size='base'>
						{numberSeparator(item.amount)}
					</Text>
					<Text variant='p' color='content-secondary' size='xs'>
						ریال
					</Text>
				</div>
			</header>
			<div className='flex justify-between items-center pb-4 border-b border-b-surface-light border-dashed [&>div]:flex [&>div]:justify-start [&>div]:items-center [&>div]:gap-2 '>
				<div>
					<Text variant='p' color='content-secondary'>
						سود:
					</Text>
					<Text variant='p' weight={600}>
						{numberSeparator(item.interestRate)}%
					</Text>
				</div>
				<div>
					<Text variant='p' color='content-secondary'>
						جریمه دیرکرد:
					</Text>
					<Text variant='p' weight={600}>
						{numberSeparator(item.penaltyRate)}%
					</Text>
				</div>
			</div>
			<div className='flex justify-start items-center gap-3'>
				<Text variant='p' color='content-secondary'>
					بازپرداخت:
				</Text>
				<div className='flex justify-start items-center gap-2 overflow-auto'>
					{item.repaymentType.map((repaymentType) => (
						<div
							key={repaymentType.value}
							className='border rounded-lg px-2 py-1 border-primary-light bg-surface-secondary'
						>
							<Text variant='p' noWrap>
								{repaymentType.name}
							</Text>
						</div>
					))}
				</div>
			</div>
			{selectable && <Button label='انتخاب' fluid />}
		</div>
	);
};

export default LoanListItem;
