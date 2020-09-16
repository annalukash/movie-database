import React from 'react';
import styled from 'styled-components';
import EllipsisText from "react-ellipsis-text";
import moment from 'moment';
import useWindowSize from '../../shared/useWindowSize/useWindowSize';

const MovieCardWrapper = styled.div`
    max-width: 1218px;
    width: 90%;
    min-height: 141px;
    height: 100%;
    box-shadow:rgba(0, 0, 0, 0.1) 0px 2px 8px 0px;
    border-radius: 10px;
    display: flex;
    align-items: center;
    margin: 10px;

    &:first-child {
        margin-top: 35px;
    }
`;

const MovieCardImg = styled.img`
    border-top-left-radius: 10px;
    border-bottom-left-radius: 10px;
    height: 141px;
    cursor: pointer;
    flex-shrink: 0;
`;

const MovieCardContent = styled.div`
    padding: 0 15px;
`;

const MovieCardTitle = styled.div`
    font-size: 19.2px;
    font-weight: 700;
    cursor: pointer;
`;

const MovieCardReleaseDate = styled.div`
    font-size: 16px;
    color: #999;
`;

const MovieCardDescription = styled.div`
    font-size: 16px;
    margin-top: 10px;
`;

const HeaderWrapper = styled.div`
    background-color: rgb(21, 50, 97);
    max-width: 1920px;
    width: 100%;
    height: 72px;
    display: flex;
    align-items: center;
`;

const Header = styled.div`
    max-width: 1218px;
    width: 100%;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 15px;
`;

const KeywordName = styled.div`
    font-size: 1.6em;
    font-weight: 700;
    color: #fff;
`;

const MovieQuantity = styled.div`
    font-size: 1.2em;
    font-weight: 600;
    opacity: 0.5;
    color: #fff;
`;

const MovieListByKeywords = ({movies, totalResults, keywordName, history}) => {
    const size = useWindowSize();
    const moviesItem = movies.map((item, index) => {
        
        const releaseDate = moment(item.release_date).format('DD/MM/YYYY');
    
        const src = !item.poster_path ? (process.env.PUBLIC_URL + '/assets/poster.png') : ('https://image.tmdb.org/t/p/w94_and_h141_bestv2' + item.poster_path);


        return (
            <MovieCardWrapper key={index}>
                <MovieCardImg 
                    src={src}
                    onClick={() => {
                        history.push(`/movie/${item.id}`)
                    }}/>
                <MovieCardContent>
                    <MovieCardTitle
                        onClick={() => {
                            history.push(`/movie/${item.id}`)
                        }}
                    >{item.title}</MovieCardTitle>
                    <MovieCardReleaseDate>{releaseDate}</MovieCardReleaseDate>
                    <MovieCardDescription>
                        <EllipsisText text={item.overview} length={size < 415 ? 47 : 260}/>
                    </MovieCardDescription>
                </MovieCardContent>
            </MovieCardWrapper>
        )
    })

    const film = totalResults === 1 ? 'фильм' : totalResults < 5 ? 'фильма' : 'фильмов'

    return (
        <>
            <HeaderWrapper>
                <Header>
                    <KeywordName>{keywordName}</KeywordName>
                    <MovieQuantity>{totalResults} {film}</MovieQuantity>
                </Header>
            </HeaderWrapper>
            {moviesItem}
        </>
    )
}

export default MovieListByKeywords;