import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { Container, Row, Col, Button } from 'reactstrap';
import './MathFunctions.js';

// style
const paddingStyle = {
    padding: "0px"
};


const calculatorLabelsStyle = {
    minHeight: "42px",
    background: "#212529",
    color: "#ffffff",
    textAlign: "right",
    paddingRight: "10px",
    paddingTop: "5px"
}

const resultStyle = {
    color: "#767676"
}


//Components
class Buttons extends Component{
    constructor(props){
        super(props)
    }

    render(){
        return(
            <Container>
                <Row>
                    <Col xs="12" sm="12">
                        <Row>
                            <Col xs="12" sm="12"  style={paddingStyle}>
                                <button id="clear" className="button buttonClear  col-3"  value="C" onClick={this.props.clear} >C</button>
                                <button id="clearLastSymbol" className="button buttonNormal col-3"  value="AC" onClick={this.props.clearLastSymbol} >AC</button>
                                <button id="divide" className="button buttonNormal col-3" value="/" onClick={this.props.operator}>/</button>
                                <button id="multiply" className="button buttonNormal col-3" value="*" onClick={this.props.operator}>*</button>
                            </Col>

                            <Col xs="12" sm="12"  style={paddingStyle}>
                                <button id="7" className="button buttonNormal col-3" value="7" onClick={this.props.number}>7</button>
                                <button id="8" className="button buttonNormal col-3" value="8" onClick={this.props.number}>8</button>
                                <button id="9" className="button buttonNormal col-3" value="9" onClick={this.props.number}>9</button>
                                <button id="subtract" className="button buttonNormal col-3" value="-" onClick={this.props.operator}>-</button>
                            </Col>
                            <Col xs="12" sm="12" style={paddingStyle}>
                                <button id="4" className="button buttonNormal col-3" value="4" onClick={this.props.number}>4</button>
                                <button id="5" className="button buttonNormal col-3" value="5" onClick={this.props.number}>5</button>
                                <button id="6" className="button buttonNormal col-3" value="6" onClick={this.props.number}>6</button>
                                <button id="add" className="button buttonNormal col-3" value="+" onClick={this.props.operator}>+</button>
                            </Col>
                        </Row>
                    </Col>
                    <Col xs="12" sm="12">
                        <Row>
                            <Col xs="9" sm="9" style={paddingStyle}>
                                <button id="1" className="button buttonNormal col-4" value="1" onClick={this.props.number}>1</button>
                                <button id="2" className="button buttonNormal col-4" value="2" onClick={this.props.number}>2</button>
                                <button id="3" className="button buttonNormal col-4" value="3" onClick={this.props.number}>3</button>
                                <button id="0" className="button buttonNormal col-8" value="0" onClick={this.props.number}>0</button>
                                <button id="point" className="button buttonNormal col-4" value="." onClick={this.props.point}>.</button>
                            </Col>
                            <Col xs="3" sm="3" style={paddingStyle}>
                                <button id="result" className="button buttonResult equalHeight col-12" value="=" onClick={this.props.operator}>=</button>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Container>
        );
    }
}


const CalculatorLabels = ({result, formula}) => (
    <div>
        <div style={{...calculatorLabelsStyle, ...resultStyle}}>{result}</div>
        <div style={calculatorLabelsStyle}>{formula}</div>
    </div>
);





class Calculator extends Component{
  constructor(props) {
      super(props);
      this.state = {
          currentOperator: "",
          formula: "",
          lastOperator: "",
          result: "0",
          maxDigitLimit: true,
          typeButtons: "digital"

      }

      this.handleOperators = this.handleOperators.bind(this);
      this.handleNumber = this.handleNumber.bind(this);
      this.handleClear = this.handleClear.bind(this);
      this.handlePoint = this.handlePoint.bind(this);
      this.handleClearLastSymbol = this.handleClearLastSymbol.bind(this);


  }



  handleOperators(e) {


      this.setState({
          lastOperator: this.state.currentOperator,
          currentOperator: e.target.value
      });
      if (!(this.state.formula == "" && (e.target.value == "*" || e.target.value == "/")))
      {

          if (!("0" <= this.state.lastOperator && this.state.lastOperator <= "9")){

              this.setState({
                  formula: this.state.formula.slice(0, -1) + e.target.value
              });
          }

          else {
              if (e.target.value != "="){
                  this.setState({
                      formula: this.state.formula + e.target.value,
                      lastOperator: e.target.value
                  });
              }
              else {
                  this.setState({
                      result: eval(this.state.formula),
                      lastOperator: e.target.value,
                      formula: ""
                  });
              }

          }
      }


  }


  handleNumber(e){

      if (!(this.state.formula === "0")){
          this.setState({
              formula: this.state.formula + e.target.value,
              lastOperator: e.target.value,
              maxDigitLimit: this.state.formula.length >= 21 ? false : true,
          })
      }
      else if(!(e.target.value === "0")){
          this.setState({
              formula: e.target.value,
              lastOperator: e.target.value,
          })
      }


  }


  handleClear(){

      this.setState({
          currentOperator: "",
          formula: "",
          lastOperator: "",
          result: "0",
          maxDigitLimit: true
      })
  }


  handleClearLastSymbol(){
      let newFormula = this.state.formula;
      this.setState({
          formula: newFormula.substring(0, newFormula.length - 1),
          maxDigitLimit: newFormula.substring(0, newFormula.length - 1).length > 21 ? false : true,
          });

  }


  handlePoint(){

      if (this.state.lastOperator != '.') {
          if (this.state.formula == "") {

              this.setState({
                  formula: "0.",
                  lastOperator: ".",
              });
          }
          else {
              let resultSearchPoint = this.state.formula.match(/(\d|\.)+/g);
              try {
                  let lastNumber = resultSearchPoint[resultSearchPoint.length - 1];
                  var isDecimal = lastNumber.search(/\./g);
              }
              catch (e) {
                  var isDecimal = -1;
              }
              finally {
                  if (isDecimal === -1) {
                      this.setState({
                          formula: this.state.formula + ".",
                          lastOperator: ".",
                      });
                  }
              }
          }




      }
  }


  render(){
    return(
        <div className="calculator">
            <Container style={{border: "10px solid #000000;"}}>
                <Row>
                    <Col xs="12">
                        <CalculatorLabels
                            result = {this.state.result}
                            //formula = {this.state.formula}
                            formula = {this.state.maxDigitLimit ? this.state.formula : "MAX LIMIT"}
                        />
                    </Col>
                    <Col xs="12">
                        <Buttons
                            operator = {this.handleOperators}
                            number = {this.handleNumber}
                            clear = {this.handleClear}
                            clearLastSymbol = {this.handleClearLastSymbol}
                            point = {this.handlePoint}

                        />
                    </Col>
                </Row>
            </Container>
        </div>
    );
  }


    /*
  class Buttons extends Component{
    constructor(props){
      super(props)
    }

    render(){
      return(
          <Container>
           <Row>
               <Col xs="12" sm="12">
                  <Row>
                      <Col xs="12" sm="12"  style={paddingStyle}>
                          <button id="clear" className="button buttonClear  col-3"  value="C" onClick={this.props.clear} >C</button>
                          <button id="clearLastSymbol" className="button buttonNormal col-3"  value="AC" onClick={this.props.clearLastSymbol} >AC</button>
                          <button id="divide" className="button buttonNormal col-3" value="/" onClick={this.props.operator}>/</button>
                          <button id="multiply" className="button buttonNormal col-3" value="*" onClick={this.props.operator}>*</button>
                      </Col>

                      <Col xs="12" sm="12"  style={paddingStyle}>
                          <button id="7" className="button buttonNormal col-3" value="7" onClick={this.props.number}>7</button>
                          <button id="8" className="button buttonNormal col-3" value="8" onClick={this.props.number}>8</button>
                          <button id="9" className="button buttonNormal col-3" value="9" onClick={this.props.number}>9</button>
                          <button id="subtract" className="button buttonNormal col-3" value="-" onClick={this.props.operator}>-</button>
                      </Col>
                      <Col xs="12" sm="12" style={paddingStyle}>
                          <button id="4" className="button buttonNormal col-3" value="4" onClick={this.props.number}>4</button>
                          <button id="5" className="button buttonNormal col-3" value="5" onClick={this.props.number}>5</button>
                          <button id="6" className="button buttonNormal col-3" value="6" onClick={this.props.number}>6</button>
                          <button id="add" className="button buttonNormal col-3" value="+" onClick={this.props.operator}>+</button>
                      </Col>
                  </Row>
               </Col>
               <Col xs="12" sm="12">
                  <Row>
                      <Col xs="9" sm="9" style={paddingStyle}>
                          <button id="1" className="button buttonNormal col-4" value="1" onClick={this.props.number}>1</button>
                          <button id="2" className="button buttonNormal col-4" value="2" onClick={this.props.number}>2</button>
                          <button id="3" className="button buttonNormal col-4" value="3" onClick={this.props.number}>3</button>
                          <button id="0" className="button buttonNormal col-8" value="0" onClick={this.props.number}>0</button>
                          <button id="point" className="button buttonNormal col-4" value="." onClick={this.props.point}>.</button>
                      </Col>
                      <Col xs="3" sm="3" style={paddingStyle}>
                          <button id="result" className="button buttonResult equalHeight col-12" value="=" onClick={this.props.operator}>=</button>
                      </Col>
                  </Row>
               </Col>
           </Row>
          </Container>
      );
    }
  }
  */

    /*
    class CalculatorLabels extends Component{
        constructor(props){
            super(props);

        }

        render(){
            return(
                <div>
                    <div>{this.props.result}</div>
                    <div>{this.props.formula}</div>
                </div>
            );
        }
    }
*/
}



class App extends Component {
  render() {
    return (

      <div className="App">
          <Calculator/>
      </div>
    );
  }
}

export default App;
