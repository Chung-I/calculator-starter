import React from 'react';

import CalcButton from './CalcButton';
// 計算機 App
class CalcApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: "",
      pending: [],
      status: ''
    };
  }

  resetState = () => {
    this.setState({
      value: "",
      pending: [],
      status: ""
    });
  }

  onNumberClick = num => {
    let intNum = parseInt(num);
    let pending = this.state.pending;
    let status = this.state.status;
    let value = this.state.value;
    if(status === '' || status === "output") {
      if(intNum !== 0) {
        value = num;
        pending = [intNum];
        status = "number";
      }
    }
    else {
      if(status === "number") {
        pending[pending.length-1] *= 10;
        pending[pending.length-1] += intNum;
        value = pending[pending.length-1].toString();
      } else if(status === "operator"){
        value = intNum;
        pending.push(intNum);
        status = "calculate";
      }
    }
    this.setState({
      value: value,
      pending: pending,
      status: status
    });
  }

  calculate = () => {
    let status = this.state.status;
    if(status !== "calculate") return;
    let pending = this.state.pending;
    let value = this.state.value;
    if(pending[1] === '+') {
      value = pending[0] + pending[2];
    } else if(pending[1] === '-') {
      value = pending[0] - pending[2];
    } else if(pending[1] === 'x') {
      value = pending[0] * pending[2];
    } else if(pending[1] === '÷') {
      value = pending[0] / pending[2];
    }
    pending = [value];
    this.setState({
      value: value,
      pending: pending,
      status: 'output'
    });
  }

  onOpClick = (op) => {
    let pending = this.state.pending;
    let status = this.state.status;
    if(status === "calculate") this.calculate();
    else if(status === "operator") pending[1] = op;
    else if(status === "number" || status === "output") {
      pending.push(op);
      status = "operator";
    }
    this.setState({
      pending: pending,
      status: status
    });
  }

  render() {
    return (
      <div className="calc-app">
        <div className="calc-container">
          <div className="calc-output">
            <div className="calc-display">{this.state.value}</div>
          </div>
          <div className="calc-row">
            <CalcButton onClick={this.resetState}>AC</CalcButton>
            <CalcButton>+/-</CalcButton>
            <CalcButton>%</CalcButton>
            <CalcButton onClick={this.onOpClick} className="calc-operator">÷</CalcButton>
          </div>
          <div className="calc-row">
            <CalcButton onClick={this.onNumberClick} className="calc-number">7</CalcButton>
            <CalcButton onClick={this.onNumberClick} className="calc-number">8</CalcButton>
            <CalcButton onClick={this.onNumberClick} className="calc-number">9</CalcButton>
            <CalcButton onClick={this.onOpClick} className="calc-operator">x</CalcButton>
          </div>
          <div className="calc-row">
            <CalcButton onClick={this.onNumberClick} className="calc-number">4</CalcButton>
            <CalcButton onClick={this.onNumberClick} className="calc-number">5</CalcButton>
            <CalcButton onClick={this.onNumberClick} className="calc-number">6</CalcButton>
            <CalcButton onClick={this.onOpClick} className="calc-operator">-</CalcButton>
          </div>
          <div className="calc-row">
            <CalcButton onClick={this.onNumberClick} className="calc-number">1</CalcButton>
            <CalcButton onClick={this.onNumberClick} className="calc-number">2</CalcButton>
            <CalcButton onClick={this.onNumberClick} className="calc-number">3</CalcButton>
            <CalcButton onClick={this.onOpClick} className="calc-operator">+</CalcButton>
          </div>
          <div className="calc-row">
            <CalcButton onClick={this.onNumberClick} className="calc-number bigger-btn">0</CalcButton>
            <CalcButton className="calc-number">.</CalcButton>
            <CalcButton onClick={this.calculate} className="calc-operator">=</CalcButton>
          </div>
        </div>
      </div>
    );
  }
}

export default CalcApp;
