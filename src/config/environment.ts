export const environment = {
	PRODUCTION: process.env.NEXT_PUBLIC_NODE_ENV === 'production',
	ENV: process.env.NEXT_PUBLIC_NODE_ENV,
	VERSION: process.env.NEXT_PUBLIC_VERSION,

	APP_URL: process.env.NEXT_PUBLIC_APP_URL,
	API_BASE_URL: process.env.NEXT_PUBLIC_API_BASE_URL,
	API_BASE_ENDPOINT: process.env.NEXT_PUBLIC_API_BASE_ENDPOINT,
};
