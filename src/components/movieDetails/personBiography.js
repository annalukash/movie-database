import React, {Component} from 'react';
import Spinner from '../shared/spinner/spinner';
import MoviesServices from '../../services/services';
import { Row, Container } from 'react-bootstrap';
import {PersonDetails} from './components';


export default class PersonBiography extends Component {
    constructor(props) {
        super(props)
        this.state ={
            person: null,
            loading: true,
            cast: null,
            crew: null,
            socialLink: {}
        }
        this.moviesServices = new MoviesServices();
    }

    componentDidMount() {
        const {personId} = this.props;
        this.getBiography(personId);  
        this.getPersonSocailLink(personId); 
    }

    onLoading = (response, cast, crew) => {
        this.setState({
            person: response,
            loading: false,
            cast: cast,
            crew: crew,       
        })
    }

    getBiography = (personId) => {
        this.moviesServices.getPersonBiography(personId)
            .then((response) => {
                this.onLoading(response.biography, response.combinedMoviesTv.cast, response.combinedMoviesTv.crew)
            })
    }

    getPersonSocailLink = (personId) => {
        this.moviesServices.getPersonExternalIds(personId)
            .then((response) => {
                this.onLoadingLink(response)
            })
    }

    onLoadingLink = (response) => {
        this.setState({
            socialLink: response
        })
    }


    render() {
        const {person, loading, cast, crew, socialLink} = this.state;
        const spinnerPerson = loading ? <Spinner/> : <PersonDetails person={person} cast={cast} crew={crew} socialLink={socialLink}/>
        return(
            <Container className="mt-4">
                <Row>
                    {spinnerPerson}
                </Row>
            </Container>
        )
    }
}

