import { ILoanForm } from '@/interfaces/loan/loan';

export async function POST(request: Request) {
	const body: ILoanForm = await request.json();
	const success = {
		message: 'درخواست شما با موفقیت ثبت شد',
	};
	const error = {
		message: 'درخواست شما ثبت نشد',
	};

	if (!body) {
		return new Response(JSON.stringify(error), {
			status: 400,
			headers: {
				'Content-Type': 'application/json',
			},
			statusText: 'Bad Request',
		});
	}

	return new Response(JSON.stringify(success), {
		status: 200,
		headers: {
			'Content-Type': 'application/json',
		},
		statusText: 'OK',
	});
}
