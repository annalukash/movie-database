import React, {useState} from 'react';
import Overlay from 'react-bootstrap/Overlay';
import Popover from 'react-bootstrap/Popover';
import moment from 'moment';
import { useHistory } from "react-router-dom";
import textEllipsis from 'text-ellipsis';
import {CircleHover, MoviePreviewButton, Character, LikeCharacter, MovieTitle, ReleaseDate, MovieListItemWrapper, PopoverImgWrapper, PopoverPoster, PopoverContentWrapper, PopoverTitleWrapper, PopoverTitle, PopoverDescription, PopoverRate} from './personDetailsCasts';

const PersonDetailsCrew = ({crew}) => {
    const noDateCrew = crew.filter((item) => !item.release_date && !item.first_air_date);
    const releaseDateCrew = crew.filter((item) => item.release_date || item.first_air_date);
    const sortedCrew = releaseDateCrew.sort((a, b) => {
        const previous = new Date(a.release_date || a.first_air_date);
        const current = new Date(b.release_date || b.first_air_date);
        return current - previous;
    });
    
    const allCrews = [...noDateCrew, ...sortedCrew];
    
    const crewItem = allCrews.map((item, index, arr) => {
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
                <HistoryItem key={index} item={item} date={date} hasBorder={next === current}/>
            )
        }
    })

    return crewItem;
}


const HistoryItem = ({item, date, hasBorder}) => {
    const history = useHistory();
    const ref = React.useRef(null);
    const [show, setShow] = useState(false);
    const [target, setTarget] = useState(null);

    const handleClick = (event, index) => {
        setShow(!show);
        setTarget(event.target);
    };

    const src = item.poster_path ? ('https://image.tmdb.org/t/p/w94_and_h141_bestv2' + item.poster_path) : '../../assets/poster.png';
    const rate = item.vote_average.toFixed(1);
    const tvEpisodes = item.episode_count ? `(${item.episode_count} эпизодов)` : null;
    
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
                                        alt={item.title || item.name} 
                                        onClick={() => {history.push(`/${item.media_type}/${item.id}`)}}
                                    />
                                </PopoverImgWrapper>
                                <PopoverContentWrapper>
                                    <PopoverTitleWrapper>
                                        <PopoverTitle
                                            onClick={() => {history.push(`/${item.media_type}/${item.id}`)}}
                                        >{item.title || item.name}</PopoverTitle>
                                        <PopoverRate>
                                            <i className="fas fa-star"></i> {rate}
                                        </PopoverRate>
                                    </PopoverTitleWrapper> 
                                    <PopoverDescription>{textEllipsis(item.overview, 96)}</PopoverDescription>    
                                </PopoverContentWrapper>
                            </Popover.Content>
                        </Popover>
                    </Overlay>
                <MovieTitle
                    onClick={() => {
                        history.push(`/${item.media_type}/${item.id}`)
                    }}
                >{item.title || item.name}</MovieTitle>
                <LikeCharacter> {tvEpisodes} ...</LikeCharacter>
                <Character>{item.job}</Character>
            </MovieListItemWrapper>
    );
}

const yearFormatter = (date) => {
    return moment(date).format('YYYY');
}

export default PersonDetailsCrew;