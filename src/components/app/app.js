import React, { Component } from 'react';
import Header from '../header/header';
import {PopularPage, PlayingNowPage, TopRatedPage, UpcomingPage} from '../moviesPage';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import MovieDetails from '../movieDetails/movieDetails';
import ScrollToTop from '../scrollToTop/scrollToTop';
import MoviesByKeyword from '../movieDetails/moviesByKeyword';
import FullCast from '../movieDetails/fullCasts';
import PersonBiography from '../movieDetails/personBiography';


export default class App extends Component {

    render() {
        return(
            <Router>
                <Header></Header>
                <ScrollToTop>
                    <Switch>
                        <Route exact path='/popular' component={PopularPage}/>
                        <Route exact path='/playing-now' component={PlayingNowPage}/>
                        <Route exact path='/upcoming' component={UpcomingPage}/>
                        <Route exact path='/top-rated' component={TopRatedPage}/>
                        <Route exact path="/popular/:id" render={
                            ({match, history}) => {
                                const {id} = match.params;
                                return <MovieDetails movieId = {id} history={history}/>
                            }
                        }/>
                        <Route exact path="/playing-now/:id" render={
                            ({match, history}) => {
                                const {id} = match.params;
                                return <MovieDetails movieId = {id} history={history}/>
                            }
                        }/>
                        <Route exact path="/upcoming/:id" render={
                            ({match, history}) => {
                                const {id} = match.params;
                                return <MovieDetails movieId = {id} history={history}/>
                            }
                        }/>
                        <Route exact path="/top-rated/:id" render={
                            ({match, history}) => {
                                const {id} = match.params;
                                return <MovieDetails movieId = {id} history={history}/>
                            }
                        }/>
                        <Route exact path="/movie/:id/casts" render={
                            ({match, history}) => {
                                const {id} = match.params;
                                return <FullCast movieId = {id} history={history}/>
                            }
                        }/>
                        <Route exact path="/tv/:id/casts" render={
                            ({match, history}) => {
                                const {id} = match.params;
                                return <FullCast movieId = {id} history={history}/>
                            }
                        }/>
                        <Route path="/keywords/:id" render={
                            ({match, history}) => {
                                const {id} = match.params;
                                return <MoviesByKeyword keywordId = {id} history={history}/>
                            }
                        }/>
                        <Route exact path="/movie/:id" render={
                            ({match, history}) => {
                                const {id} = match.params;
                                return <MovieDetails movieId = {id} history={history}/>
                            }
                        }/>
                        <Route exact path="/tv/:id" render={
                            ({match, history}) => {
                                const {id} = match.params;
                                return <MovieDetails movieId = {id} history={history}/>
                            }
                        }/>
                        <Route exact path="/person/:id" render={
                            ({match}) => {
                                const {id} = match.params;
                                return <PersonBiography personId = {id}/>
                            }
                        }/>
                    </Switch>
                </ScrollToTop>
            </Router>
        )
    }
}