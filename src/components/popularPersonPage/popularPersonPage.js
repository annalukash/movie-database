import React, { Component }  from 'react';
import PersonList from './components/personList';
import WithMoviesService from '../hoc/withMoviesService';
import {connect} from 'react-redux';
import {popularPersonRequested, popularPersonLoaded, popularPersonError} from '../../actions/actions';

class PersonPage extends Component {  
    componentWillMount() {
        const {popularPersonRequested, person, history, page} = this.props;
        
        history.push({
            pathname: '/person',
            search: `?page=${page}`
        })

        if (!person.length) {
            popularPersonRequested();
            this.loadPerson(); 
        }     
    }

    onServiceRequest = (page) => {
        const {MoviesService, popularPersonError, popularPersonLoaded, history} = this.props;

        MoviesService.getPopularPerson(page)
        .then((res) => {
            if (res) {
                history.push({
                    pathname: '/person',
                    search: `?page=${page}`
                });
                const payload = {
                    person: res.results,
                    totalPages: res.total_pages,
                    page: res.page
                }
                popularPersonLoaded(payload)
            } 
        })
        .catch(error => popularPersonError())
    }

    loadPerson = () => {
        const {page} = this.props;
        this.onServiceRequest(page)
    }

    loadMorePerson = (page) => {
        this.onServiceRequest(page)
    }

    render() {
        const {person, loading, totalPages, page, history} = this.props;
    
        return(
            <PersonList
                person={person}
                loading={loading}
                page={page}
                totalPages={totalPages}
                history={history}
                url={history.location.pathname}
                getPerson = {this.loadMorePerson}
            />
        )
    }
}

const mapStateToProps = (state) => {
    const {person, loading, page, totalPages} = state.popularPersonReducer;
    return {
        person,
        loading,
        page,
        totalPages
    }
}

const mapDispatchToProps = {
    popularPersonRequested,
    popularPersonLoaded,
    popularPersonError
}

export default WithMoviesService()(connect(mapStateToProps, mapDispatchToProps)(PersonPage));