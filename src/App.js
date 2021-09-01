import { useState, useEffect } from 'react';
import List from './List';
import Alert from './Alert';

function App() {

  const [name, setName] = useState('');
  const [list, setList] = useState([]);
  const [isEdditing, setIsEdditing] = useState(false);
  const [editId, setEditId] = useState(null);
  const [alert, setAlert] = useState({show: false, msg: '', type: ''});

  const handleSubmit = e => {
    e.preventDefault();
    if (!name) {
      //display Alert 
      showAlert(true, 'danger', 'please enter value');
      //zerowanie alertu zostanie zrobione poprzez wykorzystanie useEffect wewnątrz komponentu Alert, dlatego jako props przekazywane jest ciało funkcji showAlert a uruchomiona bez argumentów ukrywa alert
    } else if (name && isEdditing) {
      // deal with edit
    } else {
      //show alert
      showAlert(true, 'success', 'item added to the list');
      //add item to the list array
      const newItem = { 
        id: new Date().getTime().toString(),
        title: name
      }
      setList([...list, newItem]);//dodanie do listy
      setName('');//zerowanie inputa
    }
  };

  //funkcja służąca do wyświtlania alertu żeby wykorzystać ją w wielu miejscach, podano specjalnie wartości domyśle które powodują, że wywołanie jej bez argumentów zeruje stan
  const showAlert = (show=false, type='', msg='') => {
    setAlert({show, type, msg});
  };  
  
  //funkcja czyszcząca listę
  const clearList = () => {
    showAlert(true, 'danger', 'empty list');
    setList([]);
  }

  //funkcja usuwająca wybrany element
  const removeItem = id => {
    showAlert(true, 'danger', 'item removed');
    setList(list.filter(item => item.id !== id));
  }

  return (
    <section className="section-center">
      <form className="grocery-form" onSubmit={handleSubmit}>
      {/* listę przekazujemy do alertu pownieważ chcemy żeby opóźnienie na usunięcie działało za każdym razem jak zmienia się stan listy a nie komponentu alert, dlatego jest tam w useEffect w drugim parametrze podana zależność do wartości list Dzięki temu mamy tzw. better user experience */}
        {alert.show && <Alert {...alert} removeAlert={showAlert} list={list} />}
        <h3>grocery bud</h3>
        <div className="form-control">
          <input 
            type="text" 
            className="grocery" 
            placeholder="e.g. eggs" 
            value={name}
            onChange={e => setName(e.target.value)}
          />
          <button type="submit" className="submit-btn">{ isEdditing ? 'edit' : 'submit' }</button>
        </div>
      </form>
      {list.length > 0 && (
        <div className="grocery-container">
          <List items={list} removeItem={removeItem} />
          <button className="clear-btn" onClick={clearList}>clear items</button>
        </div>
      )}
    </section>
  );
}

export default App;