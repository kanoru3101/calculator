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
                                <button id="openingBracket" className="button buttonNormal  col-3"  value="(" onClick={e => this.props.bracket("(")} >
                                    <b>(</b>
                                </button>
                                <button id="closingBracket" className="button buttonNormal col-3"  value=")" onClick={e => this.props.bracket(")")} >
                                    <b>)</b>
                                </button>
                                <button id="multiplicativeInverse" className="button buttonNormal col-3" value="1/" onClick={e => this.props.reverse("1/")}>
                                    <b>1/X</b>
                                </button>
                                <button id="percent" className="button buttonNormal col-3" value="*0,01" onClick={e => this.props.percent("%")}>
                                    <FontAwesomeIcon icon="percent"/>
                                </button>
                            </Col>

                            <Col xs="12" sm="12"  style={paddingStyle}>
                                <button id="squareRoot" className="button buttonNormal col-3" value="squareRoot" onClick={e => this.props.nRoot("√")}>
                                    <FontAwesomeIcon icon="square-root-alt"/>
                                </button>
                                <button id="cubeRoot" className="button buttonNormal col-3" value="cubeRoot"  onClick={e => this.props.nRoot("∛")}>
                                    <b>&#x221B;x</b>
                                </button>
                                <button id="quarePow" className="button buttonNormal col-3" value="quarePow" onClick={e => this.props.quarePower("2")}>
                                    <b>X<sup>2</sup></b>
                                </button>
                                <button id="nPow" className="button buttonNormal col-3" value="nPow" onClick={e => this.props.nPower("y")}>
                                    <b>X<sup>y</sup></b>
                                </button>
                            </Col>
                            <Col xs="12" sm="12" style={paddingStyle}>
                                <button id="remainingFromDivision" className="button buttonNormal col-3" value="remainingFromDivision" onClick={e => this.props.operator("%")}>
                                    <b>Mod</b>
                                </button>
                                <button id="5" className="button buttonNormal col-3" value="5" onClick={this.props.number}>?</button>
                                <button id="6" className="button buttonNormal col-3" value="6" onClick={this.props.number}>?</button>
                                <button id="add" className="button buttonNormal col-3" value="+" onClick={this.props.operator}>?</button>
                            </Col>
                        </Row>
                    </Col>
                    <Col xs="12" sm="12">
                        <Row>
                            <Col xs="9" sm="9" style={paddingStyle}>
                                <button id="1" className="button buttonNormal col-4" value="1" onClick={this.props.number}>?</button>
                                <button id="2" className="button buttonNormal col-4" value="2" onClick={this.props.number}>?</button>
                                <button id="3" className="button buttonNormal col-4" value="3" onClick={this.props.number}>?</button>
                                <button id="changeButtons" className="button buttonNormal col-4" value="changeButtons" onClick={this.props.changeButtons} >
                                    <FontAwesomeIcon icon="exchange-alt" />
                                </button>
                                <button id="0" className="button buttonNormal col-4" value="0" onClick={this.props.number}>?</button>
                                <button id="point" className="button buttonNormal col-4" value="." onClick={this.props.point}>?</button>
                            </Col>
                            <Col xs="3" sm="3" style={paddingStyle}>
                                <button id="result" className="button buttonResult equalHeight col-12" value="=" onClick={this.props.equals}>
                                    <FontAwesomeIcon icon="equals"/>
                                </button>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Container>
        );
    }
}