import React, { Component } from 'react';
import Header from '../header/header';
import {PopularPage, PlayingNowPage, TopRatedPage, UpcomingPage} from '../moviesPage';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import MovieDetails from '../movieDetails/movieDetails';
import ScrollToTop from '../scrollToTop/scrollToTop';
import MoviesByKeyword from '../movieDetails/moviesByKeyword';
import FullCast from '../movieDetails/fullCasts';
import PersonBiography from '../movieDetails/personBiography';
import {TVPopularPage, OnTheAirPage, TVTopRatedPage, AiringTodayPage} from '../TVPages';


export default class App extends Component {

    render() {
        return(
            <Router>
                <Header></Header>
                <ScrollToTop>
                    <Switch>
                        <Route exact path='/movie/popular' render={
                            ({history}) => {
                                return <PopularPage history={history}/>
                            }
                        }/>
                        <Route exact path='/movie/playing-now' render={
                            ({history}) => {
                                return <PlayingNowPage history={history}/>
                            }
                        }/>
                        <Route exact path='/movie/upcoming' render={
                            ({history}) => {
                                return <UpcomingPage history={history}/>
                            }
                        }/>
                        <Route exact path='/movie/top-rated' render={
                            ({history}) => {
                                return <TopRatedPage history={history}/>
                            }
                        }/>
                        <Route exact path="/movie/popular/:id" render={
                            ({match, history}) => {
                                const {id} = match.params;
                                return <MovieDetails movieId = {id} history={history}/>
                            }
                        }/>
                        <Route exact path="/movie/playing-now/:id" render={
                            ({match, history}) => {
                                const {id} = match.params;
                                return <MovieDetails movieId = {id} history={history}/>
                            }
                        }/>
                        <Route exact path="/movie/upcoming/:id" render={
                            ({match, history}) => {
                                const {id} = match.params;
                                return <MovieDetails movieId = {id} history={history}/>
                            }
                        }/>
                        <Route exact path="/movie/top-rated/:id" render={
                            ({match, history}) => {
                                const {id} = match.params;
                                return <MovieDetails movieId = {id} history={history}/>
                            }
                        }/>
                        <Route exact path='/tv/popular/' render={
                            ({history}) => {
                                return <TVPopularPage history={history}/>
                            }
                        }/>
                        <Route exact path='/tv/airing_today' render={
                            ({history}) => {
                                return <AiringTodayPage history={history}/>
                            }
                        }/>
                        <Route exact path='/tv/on_the_air' render={
                            ({history}) => {
                                return <OnTheAirPage history={history}/>
                            }
                        }/>
                        <Route exact path='/tv/top-rated' render={
                            ({history}) => {
                                return <TVTopRatedPage history={history}/>
                            }
                        }/>
                        <Route exact path="/tv/popular/:id" render={
                            ({match, history}) => {
                                const {id} = match.params;
                                return <MovieDetails movieId = {id} history={history}/>
                            }
                        }/>
                        <Route exact path="/tv/airing_today/:id" render={
                            ({match, history}) => {
                                const {id} = match.params;
                                return <MovieDetails movieId = {id} history={history}/>
                            }
                        }/>
                        <Route exact path="/tv/on_the_air/:id" render={
                            ({match, history}) => {
                                const {id} = match.params;
                                return <MovieDetails movieId = {id} history={history}/>
                            }
                        }/>
                        <Route exact path="/tv/top-rated/:id" render={
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