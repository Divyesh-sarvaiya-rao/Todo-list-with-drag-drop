import React,{useState,useCallback} from 'react'
import './App.css';
import Input from './component/Input.js'
import Draganddrop from './component/Draganddrop.js'
import { useDropzone } from "react-dropzone";

function App() {

  const getlistfromlocal = localStorage.getItem('todo');
  const listofarray = JSON.parse(getlistfromlocal);
  // setListTodo([...listTodo,listofarray]);
  const [listTodo,setListTodo] = useState(listofarray,[]);
  let addList = (inputText)=>{
    if(!inputText){
      alert('please add some task');
    }
    else{
      const index =  {id: new Date().getTime().toString()}
      const task ={
          id:index.id,
          value:inputText,
          status:"todo"
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
 //const onDrop = useCallback(acceptedFiles => {
    // Do something with the files
  //}, [])
  // const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop})

  return(
    <>
                     
     <div className="Container">
        <Input addList={addList} />

    <div className='container'>
       <div className="row">
    <div className='col-4 text-center' id='todoCol'>
               <div className='row'>
                   <h2 className='table_head_todo'>TO DO</h2>
                </div>
                  {listTodo.map((listitem,i)=>{
                     return(
                       <Draganddrop key={i} index={i}
                       item={listitem} 
                       />
                       )
                   })}
            </div>
             <div className='col-4 text-center' id='inprogressCol'>
               <div className='row'>
               <h2 className='table_head_inprogress'>IN PROGRESS</h2>
               </div>
                   <div className='task_card'>
                     <h3>in progress</h3>
                   </div>
             </div>
             <div className='col-4 text-center' id='doneCol'>
               <div className='row'>
                 <h2 className='table_head_done'>DONE</h2>
                 </div>
                   <div className='task_card'>
                     <h3>Done task</h3>
                   </div>
             </div>
           </div>
     </div>
       </div>

    </>

    );
};
export default App;

///<div {...getRootProps()}>
     // <input {...getInputProps()} />
     // {
     //   isDragActive ?
     //     <p>Drop the files here ...</p> :
        //  <p>Drag 'n' drop some files here, or click to select files</p>
     // }
    //</div>
  