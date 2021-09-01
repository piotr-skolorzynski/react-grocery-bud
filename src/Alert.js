import { useEffect } from 'react';

const Alert = ({type, msg, removeAlert}) => {
  //useEffect wykorzystujący przekazaną funkcję showAlert, która z parametrami domyślnymi usuwa alert i wykorzystujemy cleanup function
  useEffect(() => {
    const timeout = setTimeout(() => {
      removeAlert();
      return () => clearTimeout(timeout);
    }, 2000)
  }, []);

  return (
    <p className={`alert alert-${type}`}>{ msg }</p>
  );
}

export default Alert