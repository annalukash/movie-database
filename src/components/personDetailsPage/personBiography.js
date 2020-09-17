import React, { Component } from "react";
import Spinner from "../shared/spinner/spinner";
import { PersonDetails } from "./components";
import PersonDetailsMobile from "./components/componentsMobile/personDetailsMob";
import WithMoviesService from "../hoc/withMoviesService";
import { connect } from "react-redux";
import {
    personBiographyRequested,
    personBiographyLoaded,
    personBiographyError,
    personSocialLinkRequested,
    personSocialLinkLoaded,
    personSocialLinkError,
} from "../../actions/actionsPersonDetailsPage/actionPersonDetailsPage";

class PersonBiography extends Component {
    componentWillMount() {
        const {
            personId,
            personBiographyRequested,
            personSocialLinkRequested,
        } = this.props;

        personBiographyRequested();
        personSocialLinkRequested();
        this.getBiography(personId);
        this.getPersonSocailLink(personId);
    }

    getBiography = (personId) => {
        const {
            MoviesService,
            personBiographyLoaded,
            personBiographyError,
        } = this.props;

        MoviesService.getPersonBiography(personId)
            .then((response) => {
                const payload = {
                    person: response.biography,
                    cast: response.combinedMoviesTv.cast,
                    crew: response.combinedMoviesTv.crew,
                };
                personBiographyLoaded(payload);
            })
            .catch((error) => personBiographyError());
    };

    getPersonSocailLink = (personId) => {
        const {
            MoviesService,
            personSocialLinkLoaded,
            personSocialLinkError,
        } = this.props;

        MoviesService.getPersonExternalIds(personId)
            .then((response) => personSocialLinkLoaded(response))
            .catch((error) => personSocialLinkError());
    };

    render() {
        const {
            person,
            loading,
            cast,
            crew,
            socialLink,
            socialLinkLoading,
            width,
            history,
            MoviesService
        } = this.props;

        if (loading || socialLinkLoading) {
            return <Spinner />;
        } else if (width < 415) {
            return (
                <PersonDetailsMobile 
                    person={person}
                    cast={cast}
                    crew={crew}
                    socialLink={socialLink}
                    history={history}
                    MoviesService={MoviesService}
                    width={width}
                />
            );
        } else {
            return (
                <PersonDetails
                    person={person}
                    cast={cast}
                    crew={crew}
                    socialLink={socialLink}
                    history={history}
                />
            );
        }
    }
}

const mapStateToProps = (state) => {
    const {
        person,
        loading,
        cast,
        crew,
        socialLink,
        socialLinkLoading,
    } = state.personDetailsPageReducer;
    return {
        person,
        loading,
        cast,
        crew,
        socialLink,
        socialLinkLoading,
    };
};

const mapDispatchToProps = {
    personBiographyRequested,
    personBiographyLoaded,
    personBiographyError,
    personSocialLinkRequested,
    personSocialLinkLoaded,
    personSocialLinkError,
};

export default WithMoviesService()(
    connect(mapStateToProps, mapDispatchToProps)(PersonBiography)
);
