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
            formulaForCalculator: "",
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
        this.handleReverse = this.handleReverse.bind(this);
        this.handleBracket = this.handleBracket.bind(this);
        this.equals = this.equals.bind(this);
        this.handleMathFunction = this.handleMathFunction.bind(this);
        this.percent = this.percent.bind(this);

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
            lastOperator: "operator",
        });
        if (!(this.state.formula === "" && (param === "*" || param === "/" )))
        {

            if (this.state.lastOperator === "number" || this.state.lastOperator === "mathFunction"){
                this.setState({
                    formula: this.state.formula + param,
                    formulaForCalculator: this.state.formulaForCalculator + param
                });
            }
            else {

                // replace operator
                this.setState({
                    formula: this.state.formula.slice(0, -1) + param,
                    formulaForCalculator: this.state.formulaForCalculator.slice(0, -1) + param,

                });
            }
        }


    }


    equals(){
        if (this.state.lastOperator !== "equals"){
            try {
                // if previous operator don`t equal "=" and current operator is "="
                if (this.state.lastOperator === "operator"){

                    this.setState({
                        result: eval(this.state.formulaForCalculator.slice(0, -1)),
                        lastOperator: "equals",
                        formula: "",
                        formulaForCalculator: "",
                        currentOperator: "",
                    });
                }
                else {
                    this.setState({
                        result: eval(this.state.formulaForCalculator),
                        currentOperator: "",
                        lastOperator: "equals",
                        formula: "",
                        formulaForCalculator: "",
                    });
                }
            }
            catch (e) {
                this.setState({
                    result: "Error in Formula",
                    currentOperator: "",
                    lastOperator: "equals",
                    formula: "",
                    formulaForCalculator: "",

                });
            }
        }
    }


    handleNumber(e) {
        if (!(this.state.formula === "0")) {
            this.setState({
                formula: this.state.formula + e.target.value,
                formulaForCalculator: this.state.formulaForCalculator + e.target.value,
                lastOperator: "number",
                maxDigitLimit: this.state.formula.length >= 21 ? false : true,
            })
        }
        else if (!(e.target.value === "0")) {
            this.setState({
                formula: e.target.value,
                formulaForCalculator: e.target.value,
                lastOperator: e.target.value,
            })
        }
    }

    handleMathFunction(param){
        let newParam = null;

        if (param === "%"){
            newParam = "*0.01"
        }



        this.setState({
            formula: this.state.formula + param,
            formulaForCalculator: this.state.formulaForCalculator + newParam,
            lastOperator: "mathFunction"
        })

    }


    handleClear(){
        this.setState({
            currentOperator: "",
            formula: "",
            formulaForCalculator: "",
            lastOperator: "",
            result: "0",
            maxDigitLimit: true
        })
    }


    handleClearLastSymbol(){
        let newFormula = this.state.formula;

        this.setState({
            formula: newFormula.substring(0, newFormula.length - 1),
            formulaForCalculator: this.state.formulaForCalculator.substring(0, this.state.formulaForCalculator.length - 1),
            maxDigitLimit: newFormula.substring(0, newFormula.length - 1).length > 21 ? false : true,
        });

    }


    handlePoint(){

        if (this.state.lastOperator !== '.') {
            if (this.state.formula === "") {
                this.setState({
                    formula: "0.",
                    formulaForCalculator: "0.",
                    lastOperator: "point",
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
                            formulaForCalculator: this.state.formulaForCalculator + ".",
                            lastOperator: "point",
                        });
                    }
                }
            }


        }
    }


    handleReverse(){
        if (this.state.lastOperator === "number" || this.state.lastOperator === "mathFunction"){

            let regex = /[\d\.]+$|\([\d\+\-\*\s]+\)$/;

            let foundNumber = this.state.formulaForCalculator.match(regex);
            foundNumber = "(1/" + foundNumber + ")";
            foundNumber = eval(foundNumber);

            let newStringForCalculator = this.state.formulaForCalculator.replace(regex, foundNumber)
            let newString = this.state.formulaForCalculator.replace(regex, foundNumber)

            this.setState({
                formula: newString,
                formulaForCalculator: newStringForCalculator,
                lastOperator: "mathFunction"
            });
        }

        if (this.state.result !== "0" && this.state.result !== null){

            this.setState({
                result: 1/this.state.result,
                lastOperator: "mathFunction"
            });
        }
    }


    percent(){
        //find the number by the percentage

        if (this.state.result && this.state.result !== "0"){
            //if is result
            let formula = this.state.result + "*" + this.state.formulaForCalculator + "/100";
            this.setState({
                result: eval(formula),
                lastOperator: "mathFunction"
            });
        }
    }


    handleBracket(bracket){
        this.setState({
            formula: this.state.formula + bracket,
            formulaForCalculator: this.state.formulaForCalculator + bracket,
            lastOperator: "mathFunction"
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
                    bracket = {this.handleBracket}
                    equals = {this.equals}
                    reverse = {this.handleReverse}
                    percent = {this.percent}
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
                                formulaForCalculator = {this.state.formulaForCalculator}
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
