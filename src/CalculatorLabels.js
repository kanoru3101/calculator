import React, { Component } from 'react';
import './App.css';


export const resultStyle = {
    color: "#767676"
}


export const calculatorLabelsStyle = {
    minHeight: "42px",
    background: "#212529",
    color: "#ffffff",
    textAlign: "right",
    paddingRight: "10px",
    paddingTop: "5px"
}



export class CalculatorLabels extends Component{

    render(){
        return(
            <div>
                <div style={{...calculatorLabelsStyle, ...resultStyle}}>{this.props.result}</div>
                <div style={calculatorLabelsStyle}>{this.props.formula}</div>
            </div>
        );

    }

}
