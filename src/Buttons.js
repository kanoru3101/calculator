import React, { Component } from 'react';
import './App.css';
import { Container, Row, Col} from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

//style
export const paddingStyle = {
    padding: "0px",

};

//Component
export class Buttons extends Component{
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
                                <button id="clear" className="button buttonClear  col-3"  value="C" onClick={this.props.clear} >
                                    <FontAwesomeIcon icon="eraser"/>
                                </button>
                                <button id="clearLastSymbol" className="button buttonNormal col-3"  value="AC" onClick={this.props.clearLastSymbol} >
                                    <FontAwesomeIcon icon="long-arrow-alt-left"/>
                                </button>
                                <button id="divide" className="button buttonNormal col-3" value="/" onClick={e => this.props.operator("/")}>
                                    <FontAwesomeIcon icon="divide"/>
                                </button>
                                <button id="multiply" className="button buttonNormal col-3" value="*" onClick={e => this.props.operator("*")}>
                                    <FontAwesomeIcon icon="times"/>
                                </button>
                            </Col>

                            <Col xs="12" sm="12"  style={paddingStyle}>
                                <button id="7" className="button buttonNormal col-3" value="7" onClick={this.props.number}>7</button>
                                <button id="8" className="button buttonNormal col-3" value="8" onClick={this.props.number}>8</button>
                                <button id="9" className="button buttonNormal col-3" value="9" onClick={this.props.number}>9</button>
                                <button id="subtract" className="button buttonNormal col-3" value="-" onClick={e => this.props.operator("-")}>
                                    <FontAwesomeIcon icon="minus"/>
                                </button>
                            </Col>
                            <Col xs="12" sm="12" style={paddingStyle}>
                                <button id="4" className="button buttonNormal col-3" value="4" onClick={this.props.number}>4</button>
                                <button id="5" className="button buttonNormal col-3" value="5" onClick={this.props.number}>5</button>
                                <button id="6" className="button buttonNormal col-3" value="6" onClick={this.props.number}>6</button>
                                <button id="add" className="button buttonNormal col-3" value="+" onClick={e => this.props.operator("+")}>
                                    <FontAwesomeIcon icon="plus" />
                                </button>
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
                                    <FontAwesomeIcon icon="exchange-alt" /></button>
                                <button id="0" className="button buttonNormal col-4" value="0" onClick={this.props.number}>0</button>
                                <button id="point" className="button buttonNormal col-4" value="." onClick={this.props.point}><b>.</b></button>
                            </Col>
                            <Col xs="3" sm="3" style={paddingStyle}>
                                <button id="result" className="button buttonResult equalHeight col-12" value="=" onClick={e => this.props.operator("=")}>
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