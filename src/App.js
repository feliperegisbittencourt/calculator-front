import React, { useState } from 'react';
import './App.css';
import { library } from '@fortawesome/fontawesome-svg-core'
import { faDivide, faTimes, faMinus, faPlus, faEquals } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

library.add(faDivide, faTimes, faMinus, faPlus, faEquals)


function App() {

  var request = new XMLHttpRequest();
  var urlget = "http://127.0.0.1:8000/report";
  var urlpost = "http://127.0.0.1:800/report?s5!qts7^bsba8-ds#s2o94!=jc8a==+uux)k8n6*_%ih=+ko)q"
  var data = {};
  
  const[numbers, setNumbers] = useState([]);
  const[operators, setOperator] = useState([]);
  const[view, setView] = useState([]);
  const[numAux, setAux] = useState([]);

  const axios = require('axios').default;
  
  function write(number){
    let copyAux = numAux.slice();
    copyAux.push(number);
    setAux(copyAux);
    //console.log(copyAux);
    let copyView = view.slice();
    if(copyView[0] === "Não é possível dividir por zero"){
      copyView.pop();
    }
    copyView.push(number);
    setView(copyView);

  }

  function writeOperador(operator){
    let aux = "";
    let copyAux = numAux.slice();
    console.log(copyAux);
    if(copyAux.length === 0 && operator === "-"){
      write('-');
    }else if (copyAux.length !== 0){
      for(var i = 0; i < copyAux.length; i++){
        aux += copyAux[i].toString();
        console.log(copyAux[i]);
      }
      //aux = (copyAux[0]).toString() + (copyAux[1]).toString();
      console.log(aux);
      let copyNumbers = numbers.slice();
      copyNumbers.push(aux);
      console.log('copyNumbers >>>',copyNumbers);
      setNumbers(copyNumbers);
      console.log('numbers >>>', numbers);
      numbers.push(aux);
      setAux([]);
      let copyView = view.slice();
      copyView.push(operator);
      setView(copyView);
      let copyOperators = operators.slice();
      copyOperators.push(operator);
      setOperator(copyOperators);
    }else{

      console.log(aux);
      let copyNumbers = numbers.slice();
      copyNumbers.push(aux);
      console.log('copyNumbers >>>',copyNumbers);
      setNumbers(copyNumbers);
      console.log('numbers >>>', numbers);
      setAux([]);
      let copyView = view.slice();
      copyView.push(operator);
      setView(copyView);
      let copyOperators = operators.slice();
      copyOperators.push(operator);
      setOperator(copyOperators);
    }
  }

  function clear(){
    setView([]);
    setNumbers([]);
    setOperator([]);
    setAux([]);
  }


  async function send(){
    writeOperador("");
    data = {"numbers": numbers,"operators": operators};

    axios.post(urlget, data).then(
      function(response){
        write(response.data.result);
      }
    );

  }


  return ( 
    <div className="App">
      <header className="App-header">
        <div className="calculator">
          <div className="view">
            <h3>{view}</h3>
          </div>
          <div>
            <div className="specialButtons">
              <button className="button" onClick={() => clear()}>C</button>
              <button className="operators" onClick={() => writeOperador('/')}><FontAwesomeIcon icon={"divide"}/></button>
            </div>
            <div className="buttons">
              <button className="numbers" onClick={() => write(7)}>7</button>
              <button className="numbers" onClick={() => write(8)}>8</button>
              <button className="numbers" onClick={() => write(9)}>9</button>
              <button className="operators" onClick={() => writeOperador('*')}><FontAwesomeIcon icon={"times"}/></button>
              <button className="numbers" onClick={() => write(4)}>4</button>
              <button className="numbers" onClick={() => write(5)}>5</button>
              <button className="numbers" onClick={() => write(6)}>6</button>
              <button className="operators" onClick={() => writeOperador('-')}><FontAwesomeIcon icon={"minus"}/></button>
              <button className="numbers" onClick={() => write(1)}>1</button>
              <button className="numbers" onClick={() => write(2)}>2</button>
              <button className="numbers" onClick={() => write(3)}>3</button>
              <button className="operators" onClick={() => writeOperador('+')}><FontAwesomeIcon icon={"plus"}/></button>
            </div>
            <div className="finalgrid">
              <button className="numbers" onClick={() => write(0)}>0</button>
              <button className="numbers" onClick={() => write('.')}>,</button>
              <button className="operators" onClick={() => send()}><FontAwesomeIcon icon={"equals"}/></button>
            </div>
          </div>
        </div>
      </header>
    </div>
  );
}

export default App;
