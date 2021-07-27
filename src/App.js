import React, {useState} from 'react';
import './index.css';
import Activity from './Activity';

function App() {

    const [todo, setTodo] = useState([]); //maintains a list of entries in the todo list
    const [cnt, setCnt] = useState(0); //to generate a new value for the key attribute in elements in 'todo'
    const [entryText, setEntryText] = useState(''); //maintains the text inside the form for new entries
    const [showForm, setShowForm] = useState(false); //true-show form, false-hide form
    const [showColorOptions, setShowColorOptions] = useState(false); //true-show popup, false-hide pop-up

    //adds new element to 'todo'
    const add = (event) => { 
        event.preventDefault();
        if(entryText) {
            setCnt(cnt+1);
            setTodo((prevTodo) => {
                return [...prevTodo, {id: cnt, message: entryText}]
            });
            setEntryText('');
        }
        setShowForm(false);
    };

    //removes element in 'todo'
    const remove = (id) => {
        setTodo((prevTodo) => {
            return prevTodo.filter((activity) => {return activity.id!==id;});
        });
    }

    //the current color theme
    const [color, setColor] = useState('red');

    //changes the color theme
    const changeColor = (col) => {
        setColor(col);
        setShowColorOptions(false);
    }


    return (
        <div className='h-full font-mono'>

            {/* popup for color options */}
            {showColorOptions && (
                <div id='popup' className='flex w-8/12 mx-auto my-8 space-x-4'>
                    <div className='animate-bounce flex-1 p-2 text-center rounded-full bg-red-200 shadow-sm' onClick={()=>changeColor('red')}>red</div>
                    <div className='animate-bounce flex-1 p-2 text-center rounded-full bg-blue-200 shadow-sm' onClick={()=>changeColor('blue')}>blue</div>
                    <div className='animate-bounce flex-1 p-2 text-center rounded-full bg-green-200 shadow-sm' onClick={()=>changeColor('green')}>green</div>
                    <div className='animate-bounce flex-1 p-2 text-center rounded-full bg-yellow-200 shadow-sm' onClick={()=>changeColor('yellow')}>yellow</div>
                    <div className='animate-bounce flex-1 p-2 text-center rounded-full bg-purple-200 shadow-sm' onClick={()=>changeColor('purple')}>purple</div>
                </div>
            )}

            {/* todo-list */}
            <div className={`w-3/6 h-auto mx-auto my-8 p-12 rounded-lg bg-${color}-50 shadow`}>
                <div className='mx-auto'>
                    <div className='py-3'>Todo List</div>
                    <div className='pb-8 text-sm'>Instructions: Click entry to remove from list</div>
                </div>
                <div className='space-y-8'>
                    {
                        todo.map((activity) => {
                            return(
                                <Activity key={activity.id} message={activity.message} onClick={()=>remove(activity.id)} color={color}></Activity>
                            )
                        })
                    }
                </div>
            </div>
            
            {/* buttons for commands */}
            <div className='flex w-3/6 mx-auto'>
                <button id='btn1' type='button' className={`flex-1 rounded-lg bg-${color}-200 shadow-sm p-4 mx-2 transform hover:scale-105`} onClick={()=>setShowForm(!showForm)}>Add</button>
                <button id='btn2' type='button' className={`flex-1 rounded-lg bg-${color}-200 shadow-sm p-4 mx-2 transform hover:scale-105`} onClick={()=>setTodo([])}>Clear</button>
                <button id='btn3' type='button' className={`flex-1 rounded-lg bg-${color}-200 shadow-sm p-4 mx-2 transform hover:scale-105`} onClick={()=>setShowColorOptions(true)}>Change Color</button>
            </div>

            {/* popup for new entry submissions */}
            {showForm && (
                <div>
                    <form className={`my-8 p-6 w-3/6 mx-auto bg-${color}-100 rounded-md shadow`} onSubmit={add}>
                        <label>New Entry: 
                            <textarea className='w-full rounded-md p-8' value={entryText} onChange={(event)=> setEntryText(event.target.value)}> </textarea>
                        </label>
                        <button type='submit' className={`p-2 mt-2 rounded-md bg-${color}-300 transform hover:bg-${color}-400`}>Submit</button>
                    </form>
                </div>
            )}


            <br></br>

        </div>
    );
}

export default App;
