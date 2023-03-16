import React, { useState, useEffect } from 'react';
import axios from 'axios';

function TodoList() {
  const [items, setItems] = useState([]);
  const [newItemName, setNewItemName] = useState('');
  const [editingItemId, setEditingItemId] = useState(null);
  const [editingItemName, setEditingItemName] = useState('');

  useEffect(() => {
    axios.get('/getall')
      .then(res => {
        setItems(res.data);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  const handleAddItem = e => {
    e.preventDefault();
    axios.post('/add', { name: newItemName })
      .then(res => {
        setItems([...items, res.data]);
        setNewItemName('');
      })
      .catch(err => {
        alert(err.response.data); // display the error message in an alert

        console.log(err);
      });
      axios.get('/getall')
      .then(res => {
        setItems(res.data);
      })
      .catch(err => {
        console.log(err);
      });
  };

  const handleStartEditItem = itemId => {
    const itemToEdit = items.find(item => item._id === itemId);
    setEditingItemId(itemId);
    setEditingItemName(itemToEdit.name);
  };

  const handleCancelEditItem = () => {
    setEditingItemId(null);
    setEditingItemName('');
  };

  const handleSaveEditItem = itemId => {
    axios.patch(`/update/${itemId}`, { name: editingItemName })
      .then(res => {
        const updatedItems = items.map(item => {
          if (item._id === itemId) {
            return res.data;
          } else {
            return item;
          }
        });
        setItems(updatedItems);
        setEditingItemId(null);
        setEditingItemName('');
      })
      .catch(err => {
        console.log(err);
      });
  };

  const handleRemoveItem = itemId => {
    axios.delete(`/delete/${itemId}`)
      .then(res => {
        const updatedItems = items.filter(item => item._id !== itemId);
        setItems(updatedItems);
      })
      .catch(err => {
        console.log(err);
      });
  };

  return (
    // <div className='Todo'>
    //   <form onSubmit={handleAddItem}>
    //     <input type="text" value={newItemName} onChange={e => setNewItemName(e.target.value)} />
    //     <button type="submit">Add Item</button>
    //   </form>
    //   <ul>
    //     {items.map(item => (
    //       <li key={item._id}>
    //         {editingItemId === item._id ? (
    //           <>
    //             <input type="text" value={editingItemName} onChange={e => setEditingItemName(e.target.value)} />
    //             <button onClick={() => handleSaveEditItem(item._id)}>Save</button>
    //             <button onClick={() => handleCancelEditItem()}>Cancel</button>
    //           </>
    //         ) : (
    //           <>
    //             {item.name}
    //             <button onClick={() => handleStartEditItem(item._id)}>Edit</button>
    //             <button onClick={() => handleRemoveItem(item._id)}>Remove</button>
    //           </>
    //         )}
    //       </li>
    //     ))}
    //   </ul>
    // </div>
    <div className='Todo'>
        <div className='todoContent'>
      <form onSubmit={handleAddItem}>
        <input type="text" value={newItemName} onChange={e => setNewItemName(e.target.value)} />
        <button type="submit">Add Item</button>
      </form>

      <table>
        <h2> </h2>
        <tbody>
        {items.map(item => (
          <tr key={item._id}>
            {editingItemId === item._id ? (
              <>
                <input type="text" value={editingItemName} onChange={e => setEditingItemName(e.target.value)} />
                <button onClick={() => handleSaveEditItem(item._id)}>Save</button>
                <button onClick={() => handleCancelEditItem()}>Cancel</button>
              </>
            ) : (
              <>
                <td>{item.name}</td>
                <td><button onClick={() => handleStartEditItem(item._id)}>Edit</button></td>
                <td><button onClick={() => handleRemoveItem(item._id)}>Remove</button></td>
              </>
            )}
          </tr>
        ))}
        </tbody>
      </table>
      </div>
    </div>
  );
}

export default TodoList;
