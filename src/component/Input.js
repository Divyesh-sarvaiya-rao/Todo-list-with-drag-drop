import React,{useState} from 'react'

function Input(props) {
  const [inputText,setInputText] = useState('');
  const   handelEnterPress = (e)=>{
    if(e.keyCode===13){
      props.addList(inputText)
      setInputText("");
    }
  }
	return (
		<>
			<div className="taskInput">
				<input type="text" placeholder="Add your task" name='inputText'
					value={inputText}
					onChange={e =>{setInputText(e.target.value);}} 
	            	onKeyUp={handelEnterPress} />
				<button className='addtask'
					onClick={()=>{props.addList(inputText)
					setInputText("")}}
	        	>Add Task</button>
			</div>
		</>
	);
}

export default Input