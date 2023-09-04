import React, { useState } from 'react';
import ListTodo from './ListTodo';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

const Todo = () => {
  // Define the initial state and type annotations
  const [task, setTask] = useState<string>('');
  const [updateTask, setUpdateTask] = useState<string>('');
  const [updateId, setUpdateId] = useState<number>(0);
  const [todo, setTodo] = useState<{ task: string; id: number }[]>([]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTask(e.target.value);
  };
  const handleInputChangeUpdate = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUpdateTask(e.target.value);
  };
  const handleSubmit = () => {
    if (task.trim() !== '') {
      const myData = {
        task: task,
        id: Date.now(),
      };

      setTodo([...todo, myData]);
      setTask(''); // Clear the input field after submitting
    }
  };


  const handleDelete = (id: number) => {
    // Filter out the item with the matching id
    const updatedTodo = todo.filter((item) => item.id !== id);
    setTodo(updatedTodo);
  };

  const handleUpdate = (id: number, updatedTask: string) => {
    // Create a copy of the todo array and update the item with the matching id
    const updatedTodo = todo.map((item) =>
      item.id === id ? { ...item, task: updatedTask } : item
    );
    setTodo(updatedTodo);
    setUpdateTask("")
    setShow(false)
  };
  const [show, setShow] = useState<boolean>(false)
  const handleClose = () => setShow(false);
  const handleShow = (id: number) => {
    setShow(true);
    setUpdateId(id);
    const res = todo.find((item) => item.id === id);

    if (res) {
      setUpdateTask(res.task); // Set updateTask to the task of the found item
    }
  };

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Task</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="mb-3">
            <label htmlFor="updateTask" className="form-label">Task:</label>
            <input
              type="text"
              className="form-control"
              id="updateTask"
              value={updateTask}
              onChange={handleInputChangeUpdate}
            />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={() => handleUpdate(updateId, updateTask)}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>

      <div className='bg-danger p-5 ml-auto  ' style={{ height: '100vh', overflowY: "scroll" }}>
        <h1 className='text-center text-underline'>To do</h1>
        <div className="d-flex justify-content-center gap-2">
          <input type="text" className='form-control w-25' value={task} onChange={handleInputChange} />
          <button className='btn btn-success' onClick={handleSubmit}>
            Submit
          </button>
        </div>
        <ListTodo todo={todo} handleDelete={handleDelete} handleUpdate={handleShow} />
      </div>
    </>
  );
};

export default Todo;
