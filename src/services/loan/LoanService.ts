import {
	CREATE_LOAN_REQUEST,
	LOAN_LIST,
} from '@/config/endpoints/loan/endpoints';
import { BaseAxiosService } from '../global/BaseAxiosService';
import { ILoanForm } from '@/interfaces/loan/loan';

export class LoanService extends BaseAxiosService {
	readLoansList = (signal?: AbortSignal) => {
		return this._get(LOAN_LIST, { signal });
	};

	createLoanRequest = (data: ILoanForm) => {
		return this._post(CREATE_LOAN_REQUEST, data);
	};
}
