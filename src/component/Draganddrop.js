import React from 'react'

function Draganddrop(props) {
	console.log(props)
	return (
		<div className='task_card'>
       		<h3>{props.item.value}</h3>
		</div>
	)
}

export default Draganddrop