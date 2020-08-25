import React, { Component }  from 'react';
import MoviesServices from '../../services/services';
import PersonList from './components/personList';

export default class PersonPage extends Component {
    constructor(props) {
        super(props);
        this.moviesServices = new MoviesServices();
        this.state = {
            person: [],
            loading: true,
            page: 1,
            totalPages: 0
        }     
    }
    
    componentWillMount() {
        this.props.history.push({
            pathname: '/person',
            search: `?page=${this.state.page}`
        })
        this.loadPerson();  
    }

    onLoading = (response, pages, currentPage) => {
        this.setState({
            person: response,
            loading: false,
            totalPages: pages,
            page: currentPage
        })

    }

    loadPerson = () => {
        this.moviesServices.getPopularPerson(this.state.page)
            .then((res) => { 
                this.props.history.push({
                    pathname: '/person',
                    search: `?page=${this.state.page}`
                })
                this.onLoading(res.results, res.total_pages, res.page)
            })
    }

    loadMorePerson = (page) => {
        this.moviesServices.getPopularPerson(page)
            .then((res) => { 
                this.props.history.push({
                    pathname: '/person',
                    search: `?page=${page}`
                })
                this.onLoading(res.results, res.total_pages, res.page)
            })
    }

    render() {
        const {person, loading, totalPages, page} = this.state;
        const {history} = this.props;

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