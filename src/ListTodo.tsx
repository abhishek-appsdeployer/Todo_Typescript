import React from 'react';

// Define the prop type for the ListTodo component
interface ListTodoProps {
  todo: { task: string; id: number }[]; // Update the prop type to match the data structure
  handleDelete: (id: number) => void; // Update the type of handleDelete prop to accept an ID
  handleUpdate: (id: number, updatedTask: string) => void; // Update the type of handleUpdate prop
}

const ListTodo: React.FC<ListTodoProps> = ({ todo, handleDelete, handleUpdate }) => {
  return (
    <div className='mt-1'>
      <ul>
        {todo.map((item, index) => (
          <div className="d-flex justify-content-center gap-3 mt-5" key={item.id}>
            <li style={{ width: "50px" }}>{item.task}</li>
            <button onClick={() => handleDelete(item.id)}>Delete</button>
            <button onClick={() => handleUpdate(item.id, "Updated Task")}>Edit</button>
          </div>
        ))}
      </ul>
    </div>
  );
};

export default ListTodo;
