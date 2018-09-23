import React, { Component } from 'react';

import './App.css';
import "./Buttons.js";
import "./CalculatorLabels.js";
import { Container, Row, Col} from 'reactstrap';
import { MathFunctions } from './MathFunctions.js';
import { library } from '@fortawesome/fontawesome-svg-core';

import { faEnvelope, faKey, faSquareRootAlt, faLongArrowAltLeft, faExchangeAlt, faDivide, faPlus, faMinus, faEquals,
    faTimes, faEraser, faPercent} from '@fortawesome/free-solid-svg-icons';
import {Buttons} from "./Buttons";
import {CalculatorLabels} from "./CalculatorLabels";



// create library font
library.add(faEnvelope, faKey, faSquareRootAlt, faLongArrowAltLeft, faExchangeAlt, faDivide, faPlus, faMinus, faEquals,
    faTimes, faEraser, faPercent);


// style

export const calculatorLabelsStyle = {
    minHeight: "42px",
    background: "#212529",
    color: "#ffffff",
    textAlign: "right",
    paddingRight: "10px",
    paddingTop: "5px"
}

export const resultStyle = {
    color: "#767676"
}




//Components


class Calculator extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentOperator: "",
            formula: "",
            lastOperator: "",
            result: "0",
            maxDigitLimit: true,
            typeButtons: "numeric"

        }

        this.handleOperators = this.handleOperators.bind(this);
        this.handleNumber = this.handleNumber.bind(this);
        this.handleClear = this.handleClear.bind(this);
        this.handlePoint = this.handlePoint.bind(this);
        this.handleClearLastSymbol = this.handleClearLastSymbol.bind(this);
        this.changeButtons = this.changeButtons.bind(this);
        this.renderButtons = this.renderButtons.bind(this);
        this.handleInverse = this.handleInverse.bind(this);
        this.handleBracket = this.handleBracket.bind(this);
        this.equals = this.equals.bind(this);
        this.repalceFormula = this.repalceFormula.bind(this);
        this.handleMathFunction = this.handleMathFunction.bind(this);

    }

    //change the type of numeric buttons to math functions
    changeButtons(){
        let statusButtons = this.state.typeButtons;
        if (statusButtons === "numeric"){
            this.setState({typeButtons: "math functions"})
        }
        else {
            this.setState({typeButtons: "numeric"})
        }
    }

    handleOperators(param) {

        this.setState({
            lastOperator: this.state.currentOperator,
            currentOperator: param
        });

        if (!(this.state.formula === "" && (param === "*" || param === "/" )))
        {

            if (("0" <= this.state.lastOperator && this.state.lastOperator <= "9")){
                this.setState({
                    formula: this.state.formula + param,
                    lastOperator: param
                });

            }
            else {

                // replace operator
                this.setState({
                    formula: this.state.formula.slice(0, -1) + param
                });
            }
        }


    }

    repalceFormula(){

        let newFormula = this.state.formula;
        newFormula = newFormula.replace("%", "*0.01");
        console.log(newFormula);
        this.setState({
            formula: newFormula
        });
        console.log(this.state.formula);
    }

    equals(){

        this.setState({
            lastOperator: this.state.currentOperator,
        });
        this.repalceFormula();
        console.log(this.state.formula);


        try {
            // if previous operator don`t equal "=" and current operator is "="
            if (!("0" <= this.state.lastOperator && this.state.lastOperator <= "9")){
                this.setState({
                    result: eval(this.state.formula.slice(0, -1)),
                    lastOperator: "",
                    formula: "",
                    currentOperator: "",
                });
            }
            else {
                this.setState({
                    result: eval(this.state.formula),
                    currentOperator: "",
                    lastOperator: "",
                    formula: ""
                });
            }
        }
        catch (e) {
            this.setState({
                result: "Error in Formula",
                currentOperator: "",
                lastOperator: "",
                formula: ""
            });
        }
    }


    handleNumber(e) {

        if (!(this.state.formula === "0")) {
            this.setState({
                formula: this.state.formula + e.target.value,
                lastOperator: e.target.value,
                maxDigitLimit: this.state.formula.length >= 21 ? false : true,
            })
        }
        else if (!(e.target.value === "0")) {
            this.setState({
                formula: e.target.value,
                lastOperator: e.target.value,
            })
        }
    }

    handleMathFunction(param){
        this.setState({
            formula: this.state.formula + param,
            lastOperator: "0000"
        })

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

        if (this.state.lastOperator !== '.') {
            if (this.state.formula === "") {

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


    handleInverse(param){
        if ("0" <= this.state.lastOperator && this.state.lastOperator <= "9"){
            let lastNumber = this.state.formula.slice(-1);
            let previousFormula = this.state.formula.slice(0, -1);
            this.setState({
                formula: previousFormula + param + lastNumber
            });
        }
    }



    handleBracket(bracket){
        this.setState({
            formula: this.state.formula + bracket
        });
    }


    renderButtons(){
        if (this.state.typeButtons === "numeric"){
            return(
                <Buttons
                    operator = {this.handleOperators}
                    number = {this.handleNumber}
                    clear = {this.handleClear}
                    clearLastSymbol = {this.handleClearLastSymbol}
                    point = {this.handlePoint}
                    changeButtons = {this.changeButtons}
                    equals = {this.equals}
                />
            );
        }
        else {
            return(
                <MathFunctions
                    changeButtons = {this.changeButtons}
                    operator = {this.handleOperators}
                    inverse = {this.handleInverse}
                    bracket = {this.handleBracket}
                    equals = {this.equals}
                    handleMathFunction = {this.handleMathFunction}
                />
            );
        }
    }

    render() {
        return (
            <div className="calculator">
                <Container>
                    <Row>
                        <Col xs="12">
                            <CalculatorLabels
                                result={this.state.result}

                                formula={this.state.maxDigitLimit ? this.state.formula : "MAX LIMIT"}
                            />
                        </Col>
                        <Col xs="12">
                            {this.renderButtons()}
                        </Col>
                    </Row>
                </Container>
            </div>
        );
    }
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
