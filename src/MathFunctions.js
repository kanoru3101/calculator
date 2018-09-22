import React, { Component } from 'react';
import './App.css';
import { Container, Row, Col} from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


//Style
export const paddingStyle = {
    padding: "0px"
};

//Component
export class MathFunctions extends Component{
    render(){
        return(
            <Container>
                <Row>
                    <Col xs="12" sm="12">
                        <Row>
                            <Col xs="12" sm="12"  style={paddingStyle}>
                                <button id="openingBracket" className="button buttonNormal  col-3"  value="(" onClick={e => this.props.operator("(")} >
                                    <b>(</b>
                                </button>
                                <button id="closingBracket" className="button buttonNormal col-3"  value=")" onClick={e => this.props.operator(")")} >
                                    <b>)</b>
                                </button>
                                <button id="multiplicativeInverse" className="button buttonNormal col-3" value="1/" onClick={e => this.props.inverse("1/")}>
                                    <b>1/X</b>
                                </button>
                                <button id="percent" className="button buttonNormal col-3" value="*0,01" onClick={e => this.props.operator("*0,01")}>
                                    <FontAwesomeIcon icon="percent"/>
                                </button>
                            </Col>

                            <Col xs="12" sm="12"  style={paddingStyle}>
                                <button id="7" className="button buttonNormal col-3" value="7" onClick={this.props.number}>
                                    <FontAwesomeIcon
                                        icon="square-root-alt"
                                    /></button>
                                <button id="sqrt" className="button buttonNormal col-3" value="sqrt" onClick={e => this.props.operator("")}>Ysqrt(X)</button>
                                <button id="9" className="button buttonNormal col-3" value="9" onClick={this.props.number}>y^x</button>
                                <button id="subtract" className="button buttonNormal col-3" value="-" onClick={this.props.operator}>ln</button>
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
                                <button id="changeButtons" className="button buttonNormal col-4" value="changeButtons" onClick={this.props.changeButtons} >
                                    <FontAwesomeIcon icon="exchange-alt" />
                                </button>
                                <button id="0" className="button buttonNormal col-4" value="0" onClick={this.props.number}>0</button>
                                <button id="point" className="button buttonNormal col-4" value="." onClick={this.props.point}>.</button>
                            </Col>
                            <Col xs="3" sm="3" style={paddingStyle}>
                                <button id="result" className="button buttonResult equalHeight col-12" value="=" onClick={e => this.props.operator("=")}>=</button>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Container>
        );
    }
}