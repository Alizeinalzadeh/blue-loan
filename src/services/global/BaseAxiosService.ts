import axios, { AxiosInstance } from 'axios';
import { environment } from '@/config/environment';

export abstract class BaseAxiosService {
	protected _http: AxiosInstance | undefined;
	protected defaultOptions = {};
	protected abortControllers: { [key: string]: AbortController } = {};

	constructor() {
		this.initializeHttpClient();
	}

	/**
		* Initializes an HTTP client instance with a base URL and endpoint for making requests.
		* If running in a browser environment, the base URL is obtained from the environment configuration.
		* Otherwise, it is obtained from the IP address. An authorization header is added to the request
		* based on the token data stored in local storage. Additionally, a response interceptor is added
		* to remove the corresponding AbortController from the object when a request is complete.
		* @returns {void}

	*/
	protected initializeHttpClient(): void {
		const baseUrl: string = `${environment.API_BASE_URL!}/${environment.API_BASE_ENDPOINT!}`;
		this._http = axios.create({
			baseURL: `${baseUrl}`,
			withCredentials: true,
			headers: {
				'Accept-Language': 'fa',
			},
		});

		this._http.interceptors.response.use(
			(response) => {
				const requestId =
					response.config.url +
					JSON.stringify(response.config.data) +
					JSON.stringify(response.config.params);
				if (requestId in this.abortControllers) {
					delete this.abortControllers[requestId];
				}
				return response;
			},
			async (error) => {
				// Check if the error is due to request cancellation
				if (axios.isCancel(error)) {
					return;
				}

				// Handle other errors
				return Promise.reject(error);
			}
		);
	}

	/**
	 * Sends an HTTP request with the specified method, URL, data, and options.
	 *
	 * This method is responsible for sending HTTP requests using the Axios library. It allows you to specify
	 * the HTTP method (GET, POST, PUT, DELETE, PATCH), the URL to send the request to, the data to include
	 * in the request body, and additional request options.
	 *
	 * @async
	 * @protected
	 * @param {string} method - The HTTP method for the request (e.g., 'GET', 'POST', 'PUT', 'DELETE', 'PATCH').
	 * @param {string} url - The URL to send the request to.
	 * @param {*} [data=null] - The data to include in the request body (if applicable).
	 * @param {object} [options={}] - Additional options to configure the request.
	 * @returns {Promise<*>} - A promise that resolves with the response data or rejects with an error.
	 * @throws {Error} - Throws an error if the request is canceled or encounters an error.
	 */
	protected async sendRequest(
		method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH',
		url: string,
		data: any = null,
		options: object = {}
	): Promise<any> {
		const requestId = url + JSON.stringify(data) + JSON.stringify(options);

		if (requestId in this.abortControllers) {
			this.abortControllers[requestId].abort();
		}

		const abortController = new AbortController();
		this.abortControllers[requestId] = abortController;

		try {
			const response = await this._http?.request({
				method,
				url,
				data,
				signal: abortController.signal,
				...this.defaultOptions,
				...options,
			});
			return response?.data;
		} catch (error) {
			if (axios.isCancel(error)) {
				return;
			}
			return Promise.reject(error);
		}
	}

	/**
	 * Sends an HTTP GET request to the specified URL with optional request options.
	 *
	 * This method is a convenient wrapper for sending GET requests using the `sendRequest` method. It allows you to
	 * specify the URL to send the GET request to and include optional request options such as headers or query parameters.
	 *
	 * @async
	 * @protected
	 * @param {string} url - The URL to send the GET request to.
	 * @param {object} [options={}] - Optional request options to configure the GET request.
	 * @returns {Promise<*>} - A promise that resolves with the response data or rejects with an error.
	 * @throws {Error} - Throws an error if the request is canceled or encounters an error.
	 */
	protected async _get(url: string, options: object = {}): Promise<any> {
		return this.sendRequest('GET', url, null, options);
	}

	/**
	 * Sends an HTTP POST request to the specified URL with the provided data and optional request options.
	 *
	 * This method is a convenient wrapper for sending POST requests using the `sendRequest` method. It allows you to
	 * specify the URL to send the POST request to, include data in the request body, and add optional request options
	 * such as headers.
	 *
	 * @async
	 * @protected
	 * @param {string} url - The URL to send the POST request to.
	 * @param {*} data - The data to include in the request body.
	 * @param {object} [options={}] - Optional request options to configure the POST request.
	 * @returns {Promise<*>} - A promise that resolves with the response data or rejects with an error.
	 * @throws {Error} - Throws an error if the request is canceled or encounters an error.
	 */
	protected async _post(
		url: string,
		data: any,
		options: object = {}
	): Promise<any> {
		return this.sendRequest('POST', url, data, options);
	}

	/**
	 * Send an HTTP DELETE request to the specified URL and return the response data.
	 * If a previous request to the same URL with the same options is pending, it will be cancelled.
	 * @async
	 * @protected
	 * @param {string} url - The URL to send the DELETE request to.
	 * @param {object} [options={}] - The options for the request.
	 * @returns {Promise<*>} - A promise that resolves with the response data or rejects with an error.
	 * @throws {Error} - Throws an error if the request is canceled or encounters an error.
	 */
	protected async _delete(url: string, options: object = {}): Promise<any> {
		return this.sendRequest('DELETE', url, null, options);
	}

	/**
	 * Sends an HTTP DELETE request to the specified URL with optional request options.
	 *
	 * This method is a convenient wrapper for sending DELETE requests using the `sendRequest` method. It allows you to
	 * specify the URL to send the DELETE request to and include optional request options such as headers or query parameters.
	 *
	 * @async
	 * @protected
	 * @param {string} url - The URL to send the DELETE request to.
	 * @param {object} [options={}] - Optional request options to configure the DELETE request.
	 * @returns {Promise<*>} - A promise that resolves with the response data or rejects with an error.
	 * @throws {Error} - Throws an error if the request is canceled or encounters an error.
	 */
	protected async _put(
		url: string,
		data: any,
		options: object = {}
	): Promise<any> {
		return this.sendRequest('PUT', url, data, options);
	}

	/**
	 * Sends an HTTP PATCH request to the specified URL with the provided data and optional request options.
	 *
	 * This method is a convenient wrapper for sending PATCH requests using the `sendRequest` method. It allows you to
	 * specify the URL to send the PATCH request to, include data in the request body, and add optional request options
	 * such as headers.
	 *
	 * @async
	 * @protected
	 * @param {string} url - The URL to send the PATCH request to.
	 * @param {*} data - The data to include in the request body.
	 * @param {object} [options={}] - Optional request options to configure the PATCH request.
	 * @returns {Promise<*>} - A promise that resolves with the response data or rejects with an error.
	 * @throws {Error} - Throws an error if the request is canceled or encounters an error.
	 */
	protected async _patch(
		url: string,
		data: any,
		options: object = {}
	): Promise<any> {
		return this.sendRequest('PATCH', url, data, options);
	}
}
