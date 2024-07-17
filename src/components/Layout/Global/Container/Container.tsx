const Container = ({ children }: Readonly<{ children: React.ReactNode }>) => {
	return <div className='px-4 max-w-md lg:mx-auto'>{children}</div>;
};
export default Container;
