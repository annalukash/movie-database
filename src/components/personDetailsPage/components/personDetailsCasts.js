import React, {useState, useEffect} from 'react';
import styled from 'styled-components';
import Overlay from 'react-bootstrap/Overlay';
import Popover from 'react-bootstrap/Popover';
import moment from 'moment';
import { useHistory } from "react-router-dom";
import textEllipsis from 'text-ellipsis';
import MoviesServices from '../../../services/services';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';

const MovieListItemWrapper = styled.div`
    border-bottom: ${props => !props.hasBorder ? '1px solid rgb(227, 227, 227)' : 'none'};
    font-size: 16px;
    color: #000;
    display: flex;
    align-items: center;
`;

const ReleaseDate = styled.div`   
    font-weight: 400;
    padding: 8px 16px;
    width: 70px;
    text-align: center;
`;

const MovieTitle = styled.div`
    font-weight: 600;
    padding: 8px 0 8px 16px;
    cursor: pointer;
`;

const LikeCharacter = styled.div`
    opacity: 0.5;
    padding: 0 8px;
`;

const Character = styled.div`
    opacity: 0.8;
    padding: 8px 16px 8px 0;
`;

const MoviePreviewButton = styled.div`
    width: 10px;
    height: 10px;
    border-radius: 50%;
    border: 1px solid #000;
    cursor: pointer;
    position: relative;

    .popover-body {
        width: 535px;
        background-color: rgb(3, 37, 65);
        color: #fff;
        border-radius: 4px;
        display: flex;
        justify-content: space-around;
        cursor: default;
        padding: 13px;
    }

    .bs-popover-top > .arrow::after, .bs-popover-auto[x-placement^="top"] > .arrow::after{
        border-top-color: rgb(3, 37, 65);
    }
`;

const CircleHover = styled.div`
    width: 5px;
    height: 5px;
    border-radius: 50%;
    cursor: pointer;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: #000;
    opacity: ${(props) => props.show ? 1 : 0};
    transition: opacity 200ms;

    &:hover {
        opacity: 1;
    }
`;

const PopoverImgWrapper = styled.div``;

const PopoverPoster = styled.img`
    width: 94px;
    height: 141px;
    border-radius: 8px;
    cursor: pointer;
`;

const PopoverContentWrapper = styled.div`
    padding-left: 20px;
`;

const PopoverTitleWrapper = styled.div`
    display: flex;
    align-items: center;
`;

const PopoverTitle = styled.div`
    font-size: 24px;
    font-weight: 700;
    cursor: pointer;
`;

const PopoverDescription = styled.div`
    font-size: 14.4px;
    line-height: 21.6px;
`;

const PopoverRate = styled.div`
    background-color: rgb(1, 180, 228);
    padding: 4px 8px;
    font-size: 14.4px;
    border-radius: 5px;
    display: flex;
    align-items: center;
    justify-content: space-around;
    margin-left: 10px;

    & i {
        font-size: 10px;
        margin-right: 3px;
    }
`;

const MovieListWrapper = styled.div``;

const DepartmentListTitle = styled.div`
    font-size:20.8px;
    font-weight:600;
    margin: 10px 0;
    display: flex;
    justify-content: space-between;
`;

const MovieListContent = styled.div`
    box-shadow:rgba(0, 0, 0, 0.1) 0px 2px 8px 0px;
    border: 1px solid rgb(227, 227, 227);
`;

const FilterWrapper = styled.div`
    display: flex;
`;

const ClearButton = styled.button`
    border: none;
    background-color: transparent;
    color: rgb(1, 180, 228);
    font-size: 16px;
    margin-right: 10px;

    &:hover {
        color:rgb(30, 213, 169);
    }

    &:focus {
        outline: none;
    }
`;

const PersonDetailsCasts = ({cast}) => {
    const [castItem, setCastItem] = useState([]);
    const [filterSelected, setFilterSelected] = useState(false);
    const noDateCasts = cast.filter((item) => !item.release_date && !item.first_air_date);
    const releaseDateCasts = cast.filter((item) => item.release_date || item.first_air_date);
    const sortedCast = releaseDateCasts.sort((a, b) => {
        const previous = new Date(a.release_date || a.first_air_date);
        const current = new Date(b.release_date || b.first_air_date);
        return current - previous;
    });

    const allCasts = [...noDateCasts, ...sortedCast];

    const filteredByMovieType = allCasts.filter(item => item.media_type === 'movie');
    const filteredByTVType = allCasts.filter(item => item.media_type === 'tv');
    const movieQuantity = filteredByMovieType.length;
    const tvQuantity = filteredByTVType.length;
    const movies = (casts) => {
        return casts.map((item, index, arr) => {
            if (item.title || item.name) {
                const releaseDate = item.release_date || item.first_air_date;
                const fullDateToYear = moment(releaseDate).format('YYYY');
                const date = (!item.release_date && !item.first_air_date) ? '—' : fullDateToYear;
                let current;
                let next;
                if (index > 0) {
                    current = arr[index]?.release_date ? yearFormatter(arr[index]?.release_date) : yearFormatter(arr[index]?.first_air_date);
                    next = arr[index + 1]?.release_date ? yearFormatter(arr[index + 1]?.release_date) : yearFormatter(arr[index + 1]?.first_air_date);
                }
                return (
                    <HistoryItem key={index} cast={item} date={date} hasBorder={next === current}/>  
                )
            }
        })
    }

    useEffect(() => {
        const data = movies(allCasts)
        setCastItem(data)
    }, []);

    const onSelect = (content) => {
        const data = movies(content)
        setCastItem(data)
        setFilterSelected(true)
    }

    const clearFilter = () => {
        const data = movies(allCasts)
        setCastItem(data)
        setFilterSelected(false)
    }

    const clearButton = filterSelected ? <ClearButton onClick={clearFilter}>Очистить</ClearButton> : null;

    return (
        <>
            <MovieListWrapper>
                <DepartmentListTitle>
                    Актёрское искусство
                    <FilterWrapper>
                        {clearButton}
                        <DropdownButton id="dropdown-basic-button" title="Все">
                            <Dropdown.Item onClick={() => onSelect(filteredByMovieType)}>Фильмы {movieQuantity}</Dropdown.Item>
                            <Dropdown.Item onClick={() => onSelect(filteredByTVType)}>ТВ Сериалы {tvQuantity}</Dropdown.Item>
                        </DropdownButton>
                    </FilterWrapper>
                </DepartmentListTitle>
                <MovieListContent>
                    {castItem}
                </MovieListContent>
            </MovieListWrapper>
        </>
    ); 
}

const HistoryItem = ({cast, date, hasBorder}) => {
    const history = useHistory();
    const ref = React.useRef(null);
    const [show, setShow] = useState(false);
    const [target, setTarget] = useState(null);

    const handleClick = (event, index) => {
        setShow(!show);
        setTarget(event.target);
    };

    const src = cast.poster_path ? ('https://image.tmdb.org/t/p/w94_and_h141_bestv2' + cast.poster_path) : (process.env.PUBLIC_URL + '/assets/poster.png');
    const rate = cast.vote_average.toFixed(1);
    const tvEpisodes = cast.episode_count ? `(${cast.episode_count} эпизодов)` : null;
  
    const handleRouting = (id, type) => {
        const moviesServices = new MoviesServices();
        moviesServices.getMovieDetails(id)
            .then((res) => {
                if (res && res.status_code === 34) {
                    history.push(`/collection/${id}`)
                } else {
                    history.push(`/${type}/${id}`)
                }
            })
    }

    return (
        <MovieListItemWrapper hasBorder={hasBorder}>
            <ReleaseDate>{date}</ReleaseDate>
            <MoviePreviewButton ref={ref}
                onClick={handleClick}>
                    <CircleHover show={show}></CircleHover>  
            </MoviePreviewButton>
                <Overlay 
                    show={show}
                    target={target}
                    container={ref.current}
                    rootClose={true}
                    onHide={handleClick}
                >
                    <Popover>
                        <Popover.Content>
                            <PopoverImgWrapper>
                                <PopoverPoster 
                                    src={src} 
                                    alt={cast.title || cast.name} 
                                    onClick={() => handleRouting(cast.id, cast.media_type)}
                                />
                            </PopoverImgWrapper>
                            <PopoverContentWrapper>
                                <PopoverTitleWrapper>
                                    <PopoverTitle
                                        onClick={() => handleRouting(cast.id, cast.media_type)}
                                    >{cast.title || cast.name}</PopoverTitle>
                                    <PopoverRate>
                                        <i className="fas fa-star"></i> {rate}
                                    </PopoverRate>
                                </PopoverTitleWrapper> 
                                <PopoverDescription>{textEllipsis(cast.overview, 96)}</PopoverDescription>    
                            </PopoverContentWrapper>
                        </Popover.Content>
                    </Popover>
                </Overlay>
            <MovieTitle
                onClick={() => handleRouting(cast.id, cast.media_type)}
            >{cast.title || cast.name}</MovieTitle>
            <LikeCharacter> {tvEpisodes} как</LikeCharacter>
            <Character>{cast.character}</Character>
        </MovieListItemWrapper>
    );
}

const yearFormatter = (date) => {
    return moment(date).format('YYYY');
}

export default PersonDetailsCasts;
export {CircleHover, MoviePreviewButton, Character, LikeCharacter, MovieTitle, ReleaseDate, MovieListItemWrapper, PopoverImgWrapper, PopoverPoster, PopoverContentWrapper, PopoverTitleWrapper, PopoverTitle, PopoverDescription, PopoverRate};