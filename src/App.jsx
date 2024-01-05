// src/App.js
import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [greeting, setGreeting] = useState('');
  const [tasks, setTasks] = useState([]);
  const [completedTasks, setCompletedTasks] = useState([]);
  const [newTask, setNewTask] = useState('');

  const addTask = () => {
    if (newTask.trim() !== '') {
      setTasks([...tasks, newTask]);
      setNewTask('');
    }
  };

  const completeTask = (index) => {
    const completedTask = tasks[index];
    const updatedTasks = [...tasks];
    updatedTasks.splice(index, 1);
    setTasks(updatedTasks);
    setCompletedTasks([...completedTasks, completedTask]);
  };

  const removeTask = (index, fromCompleted = false) => {
    const updatedTasks = fromCompleted ? [...completedTasks] : [...tasks];
    updatedTasks.splice(index, 1);
    fromCompleted ? setCompletedTasks(updatedTasks) : setTasks(updatedTasks);
  };

  useEffect(() => {
    const getCurrentTime = () => {
      const currentHour = new Date().getHours();

      if (currentHour >= 6 && currentHour < 12) {
        document.body.style.backgroundImage = 'url(morning.jpg)'; // Sabah
        setGreeting('Günaydın');
      } else if (currentHour >= 12 && currentHour < 18) {
        document.body.style.backgroundImage = 'url(afternoon.jpg)'; // Öğle
        setGreeting('Tünaydın');
      } else {
        document.body.style.backgroundImage = 'url(evening.jpg)'; // Akşam
        setGreeting('İyi Akşamlar');
      }
    };

    getCurrentTime();
    const interval = setInterval(getCurrentTime, 60000); // Her dakika kontrol et

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="container">
      <h1>{greeting} Furkan</h1>
      <div className="App">
        <div>
          <input
            type="text"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            placeholder="Yeni görev ekle..."
          />
          <button onClick={addTask}>Ekle</button>
        </div>
        <div>
          <h2>Aktif Görevler</h2>
          <ul>
            {tasks.map((task, index) => (
              <li key={index}>
                {task}
                <button onClick={() => completeTask(index)}>Tamamlandı</button>
                <button onClick={() => removeTask(index)}>Sil</button>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h2>Tamamlanan Görevler</h2>
          <ul>
            {completedTasks.map((task, index) => (
              <li key={index}>
                {task}
                <button onClick={() => removeTask(index, true)}>Sil</button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default App;
