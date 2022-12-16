import React, { Component } from 'react'
import { getAdvData } from '../config/firbaseconfig'

class Advertisement extends Component {
    constructor(props) {
        super(props)

        this.state = {
            advData: []
        }
    }

    componentDidMount = () => {
        getAdvData().then((snapshot) => {
            if (snapshot.exists()) {

                this.setState({ advData: snapshot.val() })
            } else {
                console.log("No data available");
            }
        }).catch((error) => {
            console.error(error);
        });
    }

    render() {
        return (
            <>
                {this.state.advData.map((x, index) =>
                    <div className='marquee' key={index}>
                        <p> {x.desc} </p>
                    </div>)}
            </>
        )
    }
}

export default Advertisement