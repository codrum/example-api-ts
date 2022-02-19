import * as React from 'react'
import './App.css'
import UserText from './components/UserText'
import getUserWithHomeWorldFactory, { HomeWorld } from './util/getUserWithHomeWorldFactory'

type User = { name: string; homeworld: HomeWorld }

const App = () => {
	const [data, setData] = React.useState<Array<User>>()
	const [nextPageURL, setNextPageURL] = React.useState<string>('')
	const getUserWithHomeWorld = React.useCallback(getUserWithHomeWorldFactory({}), [])

	React.useEffect(() => {
		const fetchUsers = async () => {
			const userData = await getUserWithHomeWorld('https://swapi.dev/api/people')
			setData(userData.results)
			setNextPageURL(userData.next)
		}
		fetchUsers()
	}, [getUserWithHomeWorld])

	const loadMore = async () => {
		const userData = await getUserWithHomeWorld(nextPageURL)
		setNextPageURL(userData.next)
		setData(data?.concat(userData.results))
	}

	return (
		<div className='App'>
			{data ? (
				data.map((user, idx) => (
					<UserText name={user.name} homeWorld={user.homeworld.name} key={idx} />
				))
			) : (
				<p>Loading...</p>
			)}
			<button onClick={loadMore}>Load more</button>
		</div>
	)
}

export default App
