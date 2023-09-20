import React,{useState} from 'react'
import './App.css';
import Input from './component/Input.js'
// import Draganddrop from './component/Draganddrop.js'
//import { useDropzone } from "react-dropzone";


function App() {

  const getlistfromlocal = localStorage.getItem('todo');
  const listofarray = JSON.parse(getlistfromlocal);
  // setListTodo([...listTodo,listofarray]);
  let array;
  if(!listofarray){
    // console.log("null")
     array =[];
  }else{
    // console.log("note null"); 
    array=listofarray;
  }
  // console.log(array);
  const [listTodo,setListTodo] = useState(array);
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
  // const list = localStorage.getItem('todo');
  // const listedArray = JSON.parse(list);
  // setListTodo([...listTodo,listedArray]);
  // console.log("listed array ",listedArray);
  // console.log(setListTodo)/
  // console.log("list todo",listTodo);
    const onDragOver = (ev) => {
        ev.preventDefault();
    }
    const onDrop = (ev, cat) => {
       let id = ev.dataTransfer.getData("id");
       
       let tasks = listTodo.filter((tasks) => {
           if (tasks.id === id) {
            console.log(cat, "category");
               tasks.category = cat;
           }
           return tasks;
       });
       console.log("list task",tasks)
      localStorage.setItem('todo',JSON.stringify(tasks));
      setListTodo(tasks);
    }
    const onDragStart = (ev, id) => {
        console.log('dragstart:',id);
        ev.dataTransfer.setData("id", id);
    }
    const taskDelete = (id) => () =>{
      const choice = window.confirm("Are you sure you want to delete Task ?");
      if (choice) {
        const newTask = listTodo.filter((listTodo)=> listTodo.id !== id);
        localStorage.setItem('todo',JSON.stringify(newTask));
        setListTodo(newTask);
        console.log("task deleted with new array",newTask); 
      }
    };
   var tasks = {
            'todo': [],
            'inprogress':[],
            'done': [],
          }
   function arrayTomap(){listTodo.map(t=>{
       console.log('push task: ',tasks);
       tasks[t.category].push(
           <div key={t.name} 
               onDragStart = {(e) => onDragStart(e, t.id)}
               draggable
               className="draggable"
               >
               {t.name}
              <button className='delete_button' onClick={taskDelete(t.id)}><i className="fa-solid fa-circle-xmark"></i></button>
           </div>
       );
       });}
      arrayTomap();



  return(
    <>
    <div className="container-drag">
                    <div className='taskInput'>
                    <Input addList={addList}/>
                    </div>
                <div className="todo"onDrop={(e)=>{onDrop(e, "todo")}}>
                    <span className="task-header">TO-DO LIST</span>
                    <nav>{tasks.todo}</nav>
                </div>
                  <div className="droppable" id='inprogresscol'
                      onDrop={(e)=>onDrop(e, "inprogress")} 
                      onDragOver={(ev)=>onDragOver(ev)}>
                    <span className="task-header">IN PROGRESS</span>
                    <nav>{tasks.inprogress}</nav>
                </div>
               <div className='droppable' id='doneCol'
                    onDrop={(e)=>onDrop(e, "done")}
                    onDragOver={(ev)=>onDragOver(ev)}>
                    <span className="task-header">DONE</span>
                     <nav>{tasks.done}</nav>
                </div>
            </div>

    </>

    );
};
export default App;