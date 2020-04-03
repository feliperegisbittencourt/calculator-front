import React, { useState } from 'react';
import './App.css';
import { library } from '@fortawesome/fontawesome-svg-core'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { faCheckSquare, faCoffee, faBackspace } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { ReactDom } from 'react-dom'

library.add(fab, faCheckSquare, faCoffee, faBackspace)


function App() {

  var request = new XMLHttpRequest();
  var url = "http://127.0.0.1:8000/report";
  var data = {};
  
  const[numbers, setNumbers] = useState([]);
  
  function write(number){
    let copyNumbers = numbers.slice();
    if(copyNumbers[0] == "Não é possível dividir por zero"){
      copyNumbers.pop();
    }
    copyNumbers.push(number);
    setNumbers(copyNumbers);
  }
  

  function erase(){
    let copyNumbers = numbers.slice();
    copyNumbers.pop();
    setNumbers(copyNumbers);
  }

  function square(){
    write('√');

  }

  function squared(){
    write('²');
  }

  function percent(){
    write('%');
  }

  function oneDivide(){
    let copyNumbers = numbers.slice();
    if(copyNumbers.length == 0 || copyNumbers[0] == 0 && copyNumbers.length == 1){
      copyNumbers.pop();
      copyNumbers.push("Não é possível dividir por zero");
    }else{
      copyNumbers.unshift('1/(')
      copyNumbers.push(')');
      
    }
    setNumbers(copyNumbers);
  }

  function clear(){
    setNumbers([]);
  }

  

  function send(){
    data = (JSON.stringify({"numbers":numbers,"operators_mat":["+","-","/"]}));
    console.log(data);
    request.open('POST', url, true);
    request.setRequestHeader('Content-Type', 'application/json; charset=UTF-8;');
    request.setRequestHeader('Accept', 'application/json');
    request.setRequestHeader('Authorization', 'authkey');
    request.setRequestHeader('Access-Control-Allow-Origin', '*');
    request.setRequestHeader('Access-Control-Allow-Credentials', 'true');
    console.log(request);
    request.send(data);

  }


  return ( 
    <div className="App">
      <header className="App-header">
        <div className="calculator">
          <div className="view">
            <h3>{numbers}</h3>
          </div>
          <div className="buttons">
            <button onClick={() => percent()}>%</button>
            <button onClick={() => clear()}>CE</button>
            <button onClick={() => clear()}>C</button>
            <button onClick={() => erase()}><FontAwesomeIcon icon={faBackspace} /></button>
            <button onClick={() => oneDivide()}><sup>1</sup>/<sub>x</sub></button>
            <button onClick={() => squared()}>x<sup>2</sup></button>
            <button onClick={() => square()}><sup>2</sup>√x
            </button>
            <button onClick={() => write('/')}>/</button>
            <button onClick={() => write(7)}>7</button>
            <button onClick={() => write(8)}>8</button>
            <button onClick={() => write(9)}>9</button>
            <button onClick={() => write('*')}>X</button>
            <button onClick={() => write(4)}>4</button>
            <button onClick={() => write(5)}>5</button>
            <button onClick={() => write(6)}>6</button>
            <button onClick={() => write('-')}>-</button>
            <button onClick={() => write(1)}>1</button>
            <button onClick={() => write(2)}>2</button>
            <button onClick={() => write(3)}>3</button>
            <button onClick={() => write('+')}>+</button>
            <button onClick={() => write('*(-1)')}><sup>+</sup>/<sub>-</sub></button>
            <button onClick={() => write(0)}>0</button>
            <button onClick={() => write('.')}>,</button>
            <button onClick={() => send()}>=</button>
          </div>
        </div>
      </header>
    </div>
  );
}

export default App;
