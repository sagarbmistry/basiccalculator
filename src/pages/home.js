import React, { Component } from 'react';
import titlewifi from '../titlewifi.png'
import vibrate from '../vibrate.png'
import wifi from '../wifi.png'
import singal from '../singal.png'
import battery from '../battery.png'
import back from '../back.png'
import home from '../home.png'
import recent from '../recent.png'

class Home extends Component {
	constructor(props) {
        super(props);
        this.enterDigit = this.enterDigit.bind(this);
        this.enterOperator = this.enterOperator.bind(this);
        this.state = {
            input: '',
            output: '',
			operator: null,
			disableddel:false
            // deleteToggle: 'DEL'
        }
	}
	percentage(percent, total) {
		return ((percent/ 100) * total)
	}
    enterDigit(value) {
         if(value === '=') {
            this.setState({
                input: this.state.output,
                output: this.state.output,
				operator: null,
				disableddel:true
                // deleteToggle: 'AC'
            })
        } else if (this.state.operator !== null) {
			var newInput = this.state.input + value;
			// console.log(newInput)
			// console.log(this.state.input,value)
            var replace = newInput.replace(/x/g, '*').replace(/÷/g, '/');
			var result = eval(replace);
			console.log(result)
            this.setState({
                input: newInput,
				output: result,
				disableddel:false
                // deleteToggle: 'DEL'
            })
        } else {
			if(this.state.input === "x" || this.state.input === "÷"|| this.state.input === "-" || this.state.input === "+" || this.state.input === "%"){
				console.log('Invalid')
			}else{
				this.setState({
					input: this.state.input + value,
					disableddel:false
					// deleteToggle: 'DEL'
				})
			}
            
        }
    }
    enterOperator(value) {
		console.log(value)
        if(value === 'AC') {
            this.setState({
                input: '',
                output: '',
				operator: null,
				disableddel:true
            })           
        } else if(value === 'DEL') {
            this.setState({
				// input: this.state.input.substring(0, (this.state.input.length - 1)),
				input:this.state.input.slice(0,-1),
				output:eval(this.state.input.replace(/x/g, '*').replace(/÷/g, '/')),
				operator: null,
				disableddel:false
            }) 
		}else if(value === '=') {
            this.setState({
                input: eval(this.state.input.replace(/x/g, '*').replace(/÷/g, '/')),
				output: '',
				operator: null,
				disableddel:true
            })           
        } else {
			if(this.state.input + value === "x" || this.state.input + value === "÷"|| this.state.input + value === "-" || this.state.input + value === "+" || this.state.input + value === "%" || this.state.input + value === "="){
				console.log('Invalid')
			}else{
				this.setState({
					input: this.state.input + value,
					operator: value.replace(/x/g, '*').replace(/÷/g, '/'),
					disableddel:false
				})
			}
        }
    }
    render() {
        return(
            <div>
				<div className='head'>
					<span className='time'>2:51</span>
					<div className="rightfloat">
						<span><img alt="calcimag" src={titlewifi}/></span>
						<span><img alt="calcimag" src={vibrate}/></span>
						<span><img alt="calcimag" src={wifi}/></span>
						<span><img alt="calcimag" src={singal}/></span>
						<span><img alt="calcimag" src={battery}/></span>
					</div>
				</div>
				<div className='header'>
					<p className='titlehead'>Calculator</p>
					<span className='iconhist'><i className="fa fa-history"></i></span>
				</div>
                <Display input={this.state.input} output={this.state.output} />
                <CalcInput  enterDigit={this.enterDigit} enterOperator={this.enterOperator} disableddel={this.state.disableddel}/>
				<div>
				<div className="bottom">
						<span><img alt="calcimag" src={back}/></span>
						<span><img alt="calcimag" src={home}/></span>
						<span><img alt="calcimag" src={recent}/></span>
					</div>
				</div>
            </div>
        )
    }
}
class Display extends React.Component {
    render() {
        return(
            <div className="display">
                <div className="input">{this.props.input.toString()}</div>
                <div className="output">{this.props.output}</div>
            </div>
        )
    }
}
class CalcInput extends React.Component {

	mapKeys(arr) {
        return arr.map(a => <Key key={a.toString()} value={a} showvalue={a}  enterValue={this.props.enterDigit} />);
	}
    render(props) {
		let rowOne = [7, 8, 9],
			rowTwo = [4, 5, 6],
			rowThree = [1, 2, 3];
        return(
            <div className="keypaddrop">
				<div className='bordern'/>
				<div className='keypaddropinner'>
					<div className="keypad">
						<div className="keyRow openc">
							<Key value='AC' showvalue='AC' enterValue={this.props.enterOperator} />
							<Key value='DEL' showvalue={'Del'} deldis={this.props.disableddel} enterValue={this.props.enterOperator} />
							<Key value='%' showvalue='%' enterValue={this.props.enterOperator} />
						</div>
						<div className="keyRow">{this.mapKeys(rowOne)}</div>
						<div className="keyRow">{this.mapKeys(rowTwo)}</div>
						<div className="keyRow">{this.mapKeys(rowThree)}</div>
						
						<div className="keyRow">
							<Key key={'.'.toString()} value="." showvalue='.' enterValue={this.props.enterDigit} />
							<Key key={'0'.toString()} value="0" showvalue='0' enterValue={this.props.enterDigit} />
							<Key value='()'  showvalue='()' enterValue={this.props.enterOperator} />
						</div>
						
					</div>
					<Operators  enterOperator={this.props.enterOperator} />
					<ExtendedOperators enterDigit={this.props.enterDigit} />
				</div>
            </div>
        )
    }
}


class Key extends React.Component {
    render() {
		const value = this.props.value;
		const showvalue = this.props.showvalue;
        return(
            <button className={this.props.deldis === true?"key waves-effect waves-circle waves-light disabled":"key waves-effect waves-circle waves-light"} onClick={this.props.enterValue.bind(this, value)}>{showvalue}</button>
        ) 
    }
}
class Operators extends React.Component {
    render() {
        return(
            <div className="operators">
                
                <Key value='÷' showvalue='÷' enterValue={this.props.enterOperator} />
                <Key value='x' showvalue='x' enterValue={this.props.enterOperator} />
                <Key value='-' showvalue='-' enterValue={this.props.enterOperator} />
                <Key value='+' showvalue='+' enterValue={this.props.enterOperator} />
				<Key value='=' showvalue='=' enterValue={this.props.enterOperator} />
            </div>
        )
    }
}
class ExtendedOperators extends React.Component {
    render() {
        return(
            <div className="extendedOperators"></div>
        )
    }
}
export default Home;