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
        this.handleRoot = this.handleRoot.bind(this);
        this.percent = this.percent.bind(this);
        this.power = this.power.bind(this);
        this.nPower = this.nPower.bind(this);
        this.remainingFromDivision = this.remainingFromDivision.bind(this);


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
        if (!(this.state.formula === "" && (param === "*" || param === "/" || param === "%" )))
        {

            if (this.state.lastOperator === "number" ||
                this.state.lastOperator === "mathFunction" ||
                this.state.lastOperator === "nPower"
               ){

                this.setState({
                    formula: this.state.formula + param,
                    formulaForCalculator: this.state.formulaForCalculator + param
                });

                if(this.state.lastOperator === "nPower"){
                    this.setState({
                        lastOperator: "nPower",
                        formulaForCalculator: this.state.formulaForCalculator,
                    });

                }

                if(param === "%"){
                    this.setState({formula: this.state.formula + "Mod"});
                }

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


    handleNumber(number) {
        if (this.state.lastOperator === "nPower"){
            this.nPower(number);
        }

        else {
            if (!(this.state.formula === "0")) {
                this.setState({
                    formula: this.state.formula + number,
                    formulaForCalculator: this.state.formulaForCalculator + number,
                    lastOperator: "number",
                    maxDigitLimit: this.state.formula.length >= 21 ? false : true,
                })
            }
            else if (!(number === "0")) {
                this.setState({
                    formula: number,
                    formulaForCalculator: number,
                    lastOperator: number,
                })
            }
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
        console.log("percent");
        if (this.state.result && this.state.result !== "0"){
            //if is result
            let formula = this.state.result + "*" + this.state.formulaForCalculator + "/100";
            this.setState({
                result: eval(formula),
                lastOperator: "mathFunction"
            });
        }
    }


    handleRoot(param){

        let regex = /[\d\.]+$|\([\d\+\-\*\s]+\)$/;
        let foundNumber = this.state.formulaForCalculator.match(regex);
        let foundNumberUserVersion = this.state.formula.match(regex);
        let foundNumberForUser = param + foundNumberUserVersion[0];
        let newStringForUser = this.state.formula.replace(regex, foundNumberForUser);

        if (param === "√"){

            let foundNumberForCalculator = Math.sqrt(eval(foundNumber[0]));
            let newStringForCalculator = this.state.formulaForCalculator.replace(regex, foundNumberForCalculator);

            this.setState({
                formula: newStringForUser,
                formulaForCalculator: newStringForCalculator,
                lastOperator: "mathFunction"
            });
        }

        if (param === "∛"){

            let foundNumberForCalculator = Math.cbrt(eval(foundNumber[0]));
            let newStringForCalculator = this.state.formulaForCalculator.replace(regex, foundNumberForCalculator);

            this.setState({
                formula: newStringForUser,
                formulaForCalculator: newStringForCalculator,
                lastOperator: "mathFunction"
            });
        }


    }


    power(param){
        if (param === "2"){

            let regex = /[\d\.]+$|\([\d\+\-\*\s]+\)$/;
            let foundNumber = this.state.formulaForCalculator.match(regex);
            let foundNumberUserVersion = this.state.formula.match(regex);

            let foundNumberForUser = foundNumberUserVersion[0] + "^(2)";
            let foundNumberForCalculator = Math.pow(eval(foundNumber[0]), 2);

            let newStringForUser = this.state.formula.replace(regex, foundNumberForUser);
            let newStringForCalculator = this.state.formulaForCalculator.replace(regex, foundNumberForCalculator);

            this.setState({
                formula: newStringForUser,
                formulaForCalculator: newStringForCalculator,
                lastOperator: "mathFunction"
            });
        }

    }


    nPower(number){

        if (number === "y"){
            this.setState({
                formula: this.state.formula + "^(",
                lastOperator: "nPower"
            });
        }

        else {
            let basis = /\d\^|\([\d\.\+\-\*\-]+\)\^/; //
            let endRegex = /\(\-$|\($/; //search minus degree
            let regex = /[\d\.]+$|\([\d\+\-\*\s]+\)$/; // for sting FormulaForCalculator


            if (this.state.formula.match(/\(\-$/)){ // if the number is negative
                number = "-" + number;
            }

            //for Calculator Display
            let foundBasis = this.state.formula.match(basis);
            foundBasis = foundBasis[0].slice(0, -1); //delete symbol "^"
            let foundNumberForCalculator = Math.pow(eval(foundBasis), number);
            let newStringForCalculator = this.state.formulaForCalculator.replace(regex, foundNumberForCalculator);

            //for User Display
            let foundNumberUserVersion = this.state.formula.match(endRegex);
            let foundNumberForUser = "(" + number + ")";
            let newStringForUser = this.state.formula.replace(endRegex, foundNumberForUser);


            this.setState({
                formulaForCalculator: newStringForCalculator,
                formula: newStringForUser,
                lastOperator: "mathFunction"
            })
        }

    }


    remainingFromDivision(){

    }


    handleBracket(bracket){

        this.setState({
            formula: this.state.formula + bracket,
            formulaForCalculator: this.state.formulaForCalculator + bracket,
            lastOperator: "mathFunction"
        });

        if (this.state.lastOperator === "nPower") this.nPower(")");

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
                    nRoot = {this.handleRoot}
                    quarePower = {this.power}
                    nPower = {this.nPower}
                    remainingFromDivision = {this.remainingFromDivision}
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
