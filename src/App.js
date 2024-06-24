import './App.css';
import axios from "axios";
import React, { useState, useEffect } from "react";
import UserDetails from './UserDetails';

function App() {
  const [data, setData] = useState([]);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState(null);
  const [query, setQuery] = useState('');
  const [filteredData, setFilteredData] = useState(data);
  const [isFilteredData, setisFilteredData] = useState(false);
  const openPopup = (todo) => {
    setIsPopupOpen(true);
    setSelectedTodo(todo);
  };

  
  const fetchData = () => {
     axios.get("https://jsonplaceholder.typicode.com/todos")
          .then((response) => setData([response.data][0]));
  }

  const handleInputChange = event => {
    setQuery(event.target.value);
    setFilteredData(data.filter(item => {
      return (item.title.toLowerCase().includes(query.toLowerCase())
      || item.id==query )
    }));
    setisFilteredData(true);
  };

  useEffect(() => {
    fetchData();
  },[])

  return (
   
    <div className="App d-flex">
      <div className='todo-table'>
          <div className="d-flex justify-content-between">
            <h5>Todos</h5>
            <input type="text" value={query} onChange={handleInputChange} placeholder="Search here"/>
          </div>
          <table>
            <tr className='tableRow'>
            <th>ToDo ID</th>
            <th>Title</th>
            <th>Status</th>
            <th>Action</th>
            </tr>
            {!isFilteredData && data.map((todo)=>{
            return <tr className='tableRow'>
              <td>{todo.id}</td>
              <td>{todo.title}</td>
              <td>{todo.completed ? 'Complete' : 'Incomplete'}</td>
              <td><a href='#popup'><button onClick={() => openPopup(todo)}>View User</button></a></td>
            </tr>
          })}
          {isFilteredData && filteredData.map((todo)=>{
            return <tr className='tableRow'>
              <td>{todo.id}</td>
              <td>{todo.title}</td>
              <td>{todo.completed ? 'Complete' : 'Incomplete'}</td>
              <td><a href='#popup'><button onClick={() => openPopup(todo)}>View User</button></a></td>
            </tr>
          })}
          
          </table>
      </div>
      <div id='popup'>
      {isPopupOpen &&<UserDetails todo={selectedTodo}></UserDetails>}
      </div>
    </div>
    
  );
}

export default App;

