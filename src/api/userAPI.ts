import { HomeWorld, HomeWorldCache } from '../util/getUserWithHomeWorldFactory'

export const getUsers = async (url: string) => {
	try {
		const response = await fetch(url)
		const data = await response.json()

		return data
	} catch (error) {
		console.log(error)
	}
}

export const getHomeWorldFactory = (cache: HomeWorldCache = {}) => {
	const getHomeWorld = async (url: string) => {
		if (cache[url]) return cache[url]

		try {
			const response = await fetch(url)
			const data = (await response.json()) as HomeWorld
			cache[url] = data
			return data
		} catch (error) {
			console.error(error)
		}
	}

	return getHomeWorld
}
