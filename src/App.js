import React, { Component } from 'react';

import './App.css';
import "./Buttons.js";
import { Container, Row, Col, Button } from 'reactstrap';
import { MathFunctions } from './MathFunctions.js';
import { library } from '@fortawesome/fontawesome-svg-core';

import { faEnvelope, faKey, faSquareRootAlt, faLongArrowAltLeft, faExchangeAlt, faDivide, faPlus, faMinus, faEquals,
    faTimes, faEraser, faPercent} from '@fortawesome/free-solid-svg-icons';
import {Buttons} from "./Buttons";



// create library font
library.add(faEnvelope, faKey, faSquareRootAlt, faLongArrowAltLeft, faExchangeAlt, faDivide, faPlus, faMinus, faEquals,
    faTimes, faEraser, faPercent);


// style

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
const CalculatorLabels = ({result, formula}) => (
    <div>
        <div style={{...calculatorLabelsStyle, ...resultStyle}}>{result}</div>
        <div style={calculatorLabelsStyle}>{formula}</div>
    </div>
);



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
        if (!(this.state.formula == "" && (param == "*" || param == "/")))
        {

            if (!("0" <= this.state.lastOperator && this.state.lastOperator <= "9")){

                // replace operator
                this.setState({
                    formula: this.state.formula.slice(0, -1) + param
                });

                // if previous operator don`t equal "=" and current operator is "="
                if (param === "="){
                    this.setState({
                        result: eval(this.state.formula.slice(0, -1)),
                        lastOperator: "",
                        formula: ""
                    });
                }
            }

            else {
                if (param != "="){

                    this.setState({
                        formula: this.state.formula + param,
                        lastOperator: param
                    });
                }
                else {
                    try {
                        this.setState({
                            result: eval(this.state.formula),
                            lastOperator: "",
                            formula: ""
                        });
                    }
                    catch (e) {
                        this.setState({
                            result: "Error in Formula",
                            lastOperator: "",
                            formula: ""
                        });
                    }

                }

            }
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


    handleClear() {

        this.setState({
            currentOperator: "",
            formula: "",
            lastOperator: "",
            result: "0",
            maxDigitLimit: true
        })
    }


    handleClearLastSymbol() {
        let newFormula = this.state.formula;
        this.setState({
            formula: newFormula.substring(0, newFormula.length - 1),
            maxDigitLimit: newFormula.substring(0, newFormula.length - 1).length > 21 ? false : true,
        });

    }


    handlePoint() {

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


    handleInverse(param){
        if ("0" <= this.state.lastOperator && this.state.lastOperator <= "9"){
            let lastNumber = this.state.formula.slice(-1);
            let previousFormula = this.state.formula.slice(0, -1);
            this.setState({
                formula: previousFormula + param + lastNumber
            });
        }
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
                />
            );
        }
        else {
            return(
                <MathFunctions
                    changeButtons = {this.changeButtons}
                    operator = {this.handleOperators}
                    inverse = {this.handleInverse}

                />
            );
        }
    }

    render() {
        return (
            <div className="calculator">
                <Container style={{border: "10px solid #000000;"}}>
                    <Row>
                        <Col xs="12">
                            <CalculatorLabels
                                result={this.state.result}
                                //formula = {this.state.formula}
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
