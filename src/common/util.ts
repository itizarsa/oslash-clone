export const asyncWrapper = (promise: Promise<any>): Promise<any> => {
	return new Promise((resolve) => {
		promise.then((data) => resolve([null, data])).catch((err) => resolve([err]))
	})
}
