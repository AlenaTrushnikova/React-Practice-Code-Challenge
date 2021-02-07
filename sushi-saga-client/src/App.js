import React, {Component} from 'react';
import SushiContainer from './containers/SushiContainer';
import Table from './containers/Table';

// Endpoint!
const API = "http://localhost:3000/sushis"

class App extends Component {
    state = {
        sushis: [],
        sliceSushi: 0,
        eatenSushi: [],
        budget: 50,
    }

    /**
     * get all Sushis data from json server
     */
    componentDidMount() {
        fetch(API)
            .then(resp => resp.json())
            .then(resp => {
                this.setState({
                    sushis: resp
                })
            })
    }

    /**
     * grab only 4 sushi objects from sushis array
     * @returns {*[]}
     */
    sliceFourSushi = () => {
        return this.state.sushis.slice(this.state.sliceSushi, (this.state.sliceSushi + 4))
    }

    /**
     * show next 4 sushi objects from array when "more sushi!" button is clicked
     * @param e
     */
    moreSushi = (e) => {
        let nextSushi = this.state.sliceSushi + 4
        if (nextSushi >= this.state.sushis.length) {
            nextSushi = 0
        }

        this.setState({
            sliceSushi: nextSushi
        })
    }

    /**
     * get clicked sushi object (from Sushi component) and 1. update budget 2. add to eatenSushi array
     * @param sushi
     */
    eatSushi = (sushi) => {
        const updatedBudget = this.state.budget - sushi.price
        if (!this.state.eatenSushi.includes(sushi) && updatedBudget >= 0) {
            this.setState({
                eatenSushi: [...this.state.eatenSushi, sushi],
                budget: updatedBudget
            })
        }

    }

    /**
     * adds money to the budget when "add money" button is fired (in Table container), checks that input is valid (integer, >0)
     * TODO reset form after adding money
     * @param e
     */
    addMoney = (e) => {
        e.preventDefault()
        let sum = parseInt(e.target.money.value)
        if (!sum || sum < 0) {
            sum = 0
        }
        this.setState({
            budget: this.state.budget + sum,
        })
        // this.form.reset()
    }

    render() {
        return (
            <div className="app">
                <SushiContainer sushis={this.sliceFourSushi()}
                                moreSushi={this.moreSushi}
                                eatSushi={this.eatSushi}
                                eatenSushi={this.state.eatenSushi}
                />
                <Table eatenSushi={this.state.eatenSushi}
                       budget={this.state.budget}
                       addMoney={this.addMoney}
                />
            </div>
        );
    }
}

export default App;