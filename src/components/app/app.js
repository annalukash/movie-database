import React, { Component } from 'react';
import Header from '../header/header';
import {PopularPage, PlayingNowPage, TopRatedPage, UpcomingPage} from '../moviesPage';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import MovieDetails from '../movieDetails/movieDetails';


export default class App extends Component {

    render() {
        return(
            <Router>
                <Header></Header>
                <Switch>
                    <Route exact path='/popular' component={PopularPage}/>
                    <Route exact path='/playing-now' component={PlayingNowPage}/>
                    <Route exact path='/upcoming' component={UpcomingPage}/>
                    <Route exact path='/top-rated' component={TopRatedPage}/>
                    <Route exact path="/popular/:id" render={
                        ({match}) => {
                            const {id} = match.params;
                            return <MovieDetails movieId = {id}/>
                        }
                    }/>
                    <Route exact path="/playing-now/:id" render={
                        ({match}) => {
                            const {id} = match.params;
                            return <MovieDetails movieId = {id}/>
                        }
                    }/>
                    <Route exact path="/upcoming/:id" render={
                        ({match}) => {
                            const {id} = match.params;
                            return <MovieDetails movieId = {id}/>
                        }
                    }/>
                    <Route exact path="/top-rated/:id" render={
                        ({match}) => {
                            const {id} = match.params;
                            return <MovieDetails movieId = {id}/>
                        }
                    }/>
                </Switch>
            </Router>
        )
    }
}