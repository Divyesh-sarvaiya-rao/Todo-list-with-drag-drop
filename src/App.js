import React,{useState} from 'react'
import './App.css';
import Input from './component/Input.js'
// import Draganddrop from './component/Draganddrop.js'
//import { useDropzone } from "react-dropzone";


function App() {

  const getlistfromlocal = localStorage.getItem('todo');
  const listofarray = JSON.parse(getlistfromlocal);
  // setListTodo([...listTodo,listofarray]);
  // if(listofarray=null){
  //   const [listTodo,setListTodo] = useState(listofarray);
  // }
  const [listTodo,setListTodo] = useState([],listofarray);
  let addList = (inputText)=>{
    if(!inputText){
      alert('please add some task');
    }
    else{
      const index =  {id: new Date().getTime().toString()}
      const task ={
          id:index.id,
          name:inputText,
          category:"todo"
      }
      setListTodo([...listTodo,task]);
      listTodo.push(task);
    }
      localStorage.setItem('todo',JSON.stringify(listTodo));
  }
  const list = localStorage.getItem('todo');
  const listedArray = JSON.parse(list);
  // setListTodo([...listTodo,listedArray]);
  console.log("listed array ",listedArray);
  // console.log(setListTodo)/
  console.log("list todo",listTodo);
    const onDragOver = (ev) => {
        ev.preventDefault();
    }
    const onDrop = (ev, cat) => {
       let id = ev.dataTransfer.getData("id");
       
       let tasks = listTodo.filter((tasks) => {
           if (tasks.name === id) {
               tasks.category = cat;
           }
           return tasks;
       });

      setListTodo([...listTodo,tasks]);
    }
    const  onDragStart = (ev, id) => {
        console.log('dragstart:',id);
        ev.dataTransfer.setData("id", id);
    }
   const tasks = {
            todo: [],
            inprogress:[],
            done: [],
        }
   listTodo.forEach ((t) => {
    tasks[t.category].push(
        <div key={t.name} 
            onDragStart = {(e) => onDragStart(e, t.name)}
            draggable
            className="draggable"
            >
            {t.name}
        </div>
    );
    });

  return(
    <>
                     
    <div className="container-drag">
                    <div className='taskInput'>
                    <Input addList={addList}/>
                    </div>
                <div className="todo"
                      onDrop={(e)=>{onDrop(e, "todo")}}>
                    <span className="task-header">TO-DO LIST</span>
                    {tasks.todo}
                </div>
                  <div className="droppable" id='inprogresscol'
                    onDrop={(e)=>onDrop(e, "inprogress")}
                    onDragOver={(ev)=>onDragOver(ev)}>
                    <span className="task-header">IN PROGRESS</span>
                    {tasks.inprogress}
                </div>
               <div className='droppable' id='doneCol'
                    onDrop={(e)=>onDrop(e, "done")}
                    onDragOver={(ev)=>onDragOver(ev)}>
                    <span className="task-header">DONE</span>
                     {tasks.done}

                </div>
            </div>

    </>

    );
};
export default App;