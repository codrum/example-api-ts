import { getUsers, getHomeWorldFactory } from '../api/userAPI'

export type HomeWorld = { name: string }
export type HomeWorldCache = Record<string, HomeWorld>

const getUserWithHomeWorldFactory = (homeWorldCache: HomeWorldCache) => {
	const getUserWithHomeWorld = async (URL: string) => {
		const userData = await getUsers(URL)
		for (let user of userData.results) {
			const homeWorldURL = user.homeworld
			const getHomeWorld = getHomeWorldFactory(homeWorldCache)
			const homeWorld = await getHomeWorld(homeWorldURL)
			user.homeworld = homeWorld
		}
		return userData
	}

	return getUserWithHomeWorld
}

export default getUserWithHomeWorldFactory
