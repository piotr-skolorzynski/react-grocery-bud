import { useState, useEffect } from 'react';
import List from './List';
import Alert from './Alert';

const getLocalStorage = () => {
  let list = localStorage.getItem('list');
  if (list) {
    return JSON.parse(list);
  } else {
    return [];
  }
};

function App() {

  const [name, setName] = useState('');
  //używamy funkcji getLocalStorage żeby załadować zapisaną listę jeśli istnieje
  const [list, setList] = useState(getLocalStorage());
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
      //założenie jest takie że zawsze zwracamy item, robimy conditionala w którym iterujemy po tablicy list i sprawdzamy czy któryś item.id jest równy editId po wciśnięciu przycisku edit i wtedy modyfikujemy title
      setList(list.map(item => {
        if (item.id === editId) {
          return {...item, title: name};
        }
        return item;
      }));
      setName('');
      setEditId(null);
      setIsEdditing(false);
      showAlert(true, 'success', 'value changed')
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
  };

  //funkcja usuwająca wybrany element
  const removeItem = id => {
    showAlert(true, 'danger', 'item removed');
    setList(list.filter(item => item.id !== id));
  };

  //funkcja edytująca element
  const editItem = id => {
    const specificItem = list.find(item => item.id === id);
    setIsEdditing(true);
    setEditId(id);
    setName(specificItem.title);
  };

  //ustanowienie useEffect na każdą zmianę na liście w celu zapisu jej w localStorage
  useEffect(() => {
    localStorage.setItem('list', JSON.stringify(list));
  }, [list]);

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
          <List items={list} removeItem={removeItem} editItem={editItem} />
          <button className="clear-btn" onClick={clearList}>clear items</button>
        </div>
      )}
    </section>
  );
}

export default App;