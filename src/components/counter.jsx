import React, {Component} from 'react'

class Counter extends Component {
    state = {
        count: 0
    }

    incrementNum = () => {
        this.setState({count: this.state.count + 1})
    }

    currentCount = () => {
        return this.state.count === 0 ? 'Zero' : this.state.count
    }

    resetCount = () => {
        this.setState({count: 0})
    }

    render() {
        return <div>
            <span className='badge bg-primary'>{this.currentCount()}</span>
            <button className='btn btn-secondary btn-sm' onClick={this.incrementNum}>Add value</button>
            <button className='btn btn-danger btn-sm' onClick={this.resetCount}>Reset</button>
        </div>
    }
}

export default Counter