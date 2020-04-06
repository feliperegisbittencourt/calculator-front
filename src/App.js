import React, { useState } from 'react';
import './App.css';
import { library } from '@fortawesome/fontawesome-svg-core'
import { faDivide, faTimes, faMinus, faPlus, faEquals } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

//Add to Library of FontAwesomeIcon to use this icons in bottons
library.add(faDivide, faTimes, faMinus, faPlus, faEquals)


function App() {
  //Post url to send the operations and get the result
  var url = "http://127.0.0.1:8000/report";
  //Inicializing data to put a value after click in equals button
  var data = {};
  
  //States variables, variables that is acessible in the entire application
  ///Numbers state is used to store the numbers of the operation
  const[numbers, setNumbers] = useState([]);
  ///Operators state is used to store the operators of the operation
  const[operators, setOperator] = useState([]);
  ///View state is used to store the numbers and operators of the equation
  const[view, setView] = useState([]);
  ///NumAux state is used to store numbers before put in the numbers state, use to put more one digit's numbers
  const[numAux, setAux] = useState([]);
  ///Result state is used to store the result of operation
  const[result, setResult] = useState([]);
  
  //import axis lib to use in request
  const axios = require('axios').default;
  
  //the function write is used to atualize the view state with the numbers of buttons
  function write(number){
    let copyViewsize = view.slice();
    //set the max length of a view 
    if(copyViewsize.length >6){
      //clear the states
      clear();
      //check if are more operators then numbers
      if(numbers.length === operators.length || numbers.length < operators.length){
        //remove the last operator
        removeOperators();
      }
      //send data if has the max length
      send();
    }else{
      //include in array of numAux a digit of number
      let copyAux = numAux.slice();
      copyAux.push(number);
      setAux(copyAux);
      let copyView = view.slice();
      copyView.push(number);
      setView(copyView);
    }

  }

  //the function writeOperator is used to atualize the view with the operators of buttons and atualize the numbers state and the operators state
  function writeOperator(operator){
    let copyViewsize = view.slice();
    //include in numbers state, the auxNum, this function are created to application support numbers of more than one digit
    if(operator === ""){
      let copyAux = numAux.slice();
      let aux = "";
      //put in a string all digits of the number
      for(var i = 0; i < copyAux.length; i++){
        aux += copyAux[i].toString();
      }
      if(aux !== ""){
        //put this string in the last space of numbers's array state
        let copyNumbers = numbers.slice();
        copyNumbers.push(aux);
        setNumbers(copyNumbers);
        numbers.push(aux);
        //clean auxNum
        setAux([]);
      }
      //check if view is in max length
    }else if(copyViewsize.length >6){
      //clean states
      clear();
      //check if are more operators than numbers and remove the last operator to equalize the equation
      if(numbers.length === operators.length || numbers.length < operators.length){
        removeOperators();
      }
      //send data
      send();
    }else{
      // if divide nothing to something, check in the divide operator are the first in view state
      if(operator === "/" && copyViewsize.length === 0){
        //set zero in the numbers
        let copyZero = numbers.slice();
        copyZero.push('0');
        setNumbers(copyZero);
        setView(copyZero);
      }
        let copyAux = numAux.slice();
        let aux = "";
      //check if the operator minus are the first in view state
      if(copyViewsize.length === 0 && operator === "-"){
        //set minus in part of a number, to make a negative number
        write('-');
        //check if the operator aren't the first in space in view state
      }else if (copyAux.length !== 0){
        //put in a string all digits of the number
        for(i = 0; i < copyAux.length; i++){
          aux += copyAux[i].toString();
        }
        //check if aux isn't empty
        if(aux !== ""){
          //put in numbers the auxNum, that are a string with all digits of a number
          let copyNumbers = numbers.slice();
          copyNumbers.push(aux);
          setNumbers(copyNumbers);
          numbers.push(aux);
          //clear aux state
          setAux([]);
        }
        //set operator in operators state
        let copyView = view.slice();
        copyView.push(operator);
        setView(copyView);
        let copyOperators = operators.slice();
        copyOperators.push(operator);
        setOperator(copyOperators);
      }else{
        //check if aux isn't empty
        if( aux !== ""){
          //put in numbers the auxNum, that are a string with all digits of a number
          let copyNumbers = numbers.slice();
          copyNumbers.push(aux);
          setNumbers(copyNumbers);
          //clear aux state
          setAux([]);
        }
        //update view
        let copyView = view.slice();
        copyView.push(operator);
        setView(copyView);
        //update operators
        let copyOperators = operators.slice();
        copyOperators.push(operator);
        setOperator(copyOperators);

      }
    }
  }

  // function clear is used to make empty the states view, numbers, operators and numAux, clean the screen too
  function clear(){
    //clear view
    setView([]);
    //clear numbers
    setNumbers([]);
    //clear operators
    setOperator([]);
    //clear numAux
    setAux([]);
  }

  // function resultSet is used to store the result of operation in result's state and the number state
  function resultSet(answer){
    //set the parameter answer in position 0 of result's array
    let copyresult = result.slice();
    copyresult[0] = answer;
    setResult(copyresult);
    //clean the states
    clear();
    //set result in view state
    setView(copyresult);
    //set result in number state
    setNumbers(copyresult);
    //clean result state
    copyresult = [];
    setResult(copyresult);
  }

  //function removeOperators is used to remove the last operator of the expression if aren't space in view to complete the operation
  function removeOperators(){
    let copyOperators = operators.slice();
    copyOperators.pop();
    setOperator(copyOperators);
  }

  //function send is used to request the method post of api url and set the data that will be send
  function send(){
    //the numbers only are store in numbers state after a operator are write, here, this operation put the last number in number state
    writeOperator("");

    //set the data that will be send
    data = {"numbers": numbers,"operators": operators};
    
    //validate if are more then one number to do the operation
    if(numbers.length > 1){

      //call the api and send the data
      axios.post(url, data).then(
        function(response){
          //call the function to set the api's return in result state
          resultSet(response.data.result);
        }
      );
    }

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
              <button className="operators" onClick={() => writeOperator('/')}><FontAwesomeIcon icon={"divide"}/></button>
            </div>
            <div className="buttons">
              <button className="numbers" onClick={() => write(7)}>7</button>
              <button className="numbers" onClick={() => write(8)}>8</button>
              <button className="numbers" onClick={() => write(9)}>9</button>
              <button className="operators" onClick={() => writeOperator('*')}><FontAwesomeIcon icon={"times"}/></button>
              <button className="numbers" onClick={() => write(4)}>4</button>
              <button className="numbers" onClick={() => write(5)}>5</button>
              <button className="numbers" onClick={() => write(6)}>6</button>
              <button className="operators" onClick={() => writeOperator('-')}><FontAwesomeIcon icon={"minus"}/></button>
              <button className="numbers" onClick={() => write(1)}>1</button>
              <button className="numbers" onClick={() => write(2)}>2</button>
              <button className="numbers" onClick={() => write(3)}>3</button>
              <button className="operators" onClick={() => writeOperator('+')}><FontAwesomeIcon icon={"plus"}/></button>
            </div>
            <div className="finalgrid">
              <button className="numbers" onClick={() => write(0)}>0</button>
              <button className="operators" onClick={() => send()}><FontAwesomeIcon icon={"equals"}/></button>
            </div>
          </div>
        </div>
      </header>
    </div>
  );
}

export default App;
