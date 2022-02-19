import * as React from 'react'

type UserTextProps = { name: string; homeWorld: string }

const UserText: React.FunctionComponent<UserTextProps> = ({ name, homeWorld }) => {
	return (
		<p>
			{name} {homeWorld}
		</p>
	)
}

export default UserText
