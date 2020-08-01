import React, {Component, Fragment} from "react";
import CardList from "../components/CardList";
import SearchBox from "../components/SearchBoxs"
import "./App.css"
import  Scroll from "../components/Scroll"
import ErrorBoundry from "../components/ErrorBoundry";

class App extends Component {
    constructor() {
        super();
       this.state = {
           robots: [],
           searchfield:''
       }
    }

    componentDidMount(){
        fetch('https://jsonplaceholder.typicode.com/users')
            .then(response=> response.json())
            .then(users=> this.setState({robots: users}));
    }

    onSearchChange = (event)=> {
        this.setState({searchfield: event.target.value})
        }

    render() {
        const { robots, searchfield} = this.state;
        const filteredRobotos = robots.filter(robot =>{
            return robot.name.toLowerCase().includes(searchfield.toLowerCase())
         })
        return !robots.length ?
        <h1>Loading</h1> :
        (
            <Fragment>
                    <div className="tc">
                        <h1 className="f2">Robofriends</h1>
                        <SearchBox searchChange={this.onSearchChange}/>
                        <Scroll>
                            <ErrorBoundry>
                                <CardList robots={filteredRobotos}/>
                            </ErrorBoundry>
                        </Scroll>
                    </div>
            </Fragment>
            )
        }
}


export default App;