import React from 'react';
import MoviesServicesContext from '../moviesContext/moviesContext';

const WithMoviesService = () => (Wrapped) => {
    return (props) => {
        return(
            <MoviesServicesContext.Consumer>
                {
                    (MoviesService) => {
                        return <Wrapped {...props} MoviesService={MoviesService}/>
                    }
                }
            </MoviesServicesContext.Consumer>
        )
    }
};

export default WithMoviesService;