import { useEffect } from 'react';

const Alert = ({type, msg, removeAlert, list}) => {
  //useEffect wykorzystujący przekazaną funkcję showAlert, która z parametrami domyślnymi usuwa alert i wykorzystujemy cleanup function
  useEffect(() => {
    const timeout = setTimeout(() => {
      removeAlert();
      return () => clearTimeout(timeout);
    }, 2000)
  }, [list]);

  return (
    <p className={`alert alert-${type}`}>{ msg }</p>
  );
}

export default Alert