import React from 'react';
import styled from 'styled-components';
import useWindowSize from '../../../../shared/useWindowSize/useWindowSize';

const CollectionWrapper = styled.div`
    padding: 30px 0;
    border-bottom: 1px solid rgb(215, 215, 215);
`;

const CollectionContent = styled.div`
    border-radius: 8px;
    background-image: linear-gradient(315deg, rgba(42, 42, 114, 0.5) 0%, rgba(0, 159, 253, 0.5) 74%), ${props => `url(${props.bg})`};
    background-repeat: no-repeat;
    max-width: 730px;
    width: 100%;
    height: 320px;
    padding: 0 20px;
    display: flex;
    flex-direction: column;
    justify-content: center;
`;

const CollectionName = styled.div`
    color: #fff;
    font-size: 1.9em;
    font-weight: 600;
`
const CollectionDescription = styled.div`
    font-size: 1.1em;
    margin-bottom: 20px;
    color: #fff;
`;

const CollectionButton = styled.button`
    font-size: 1.1em;
    color: #fff;
    background-color: rgb(53, 40, 30);
    text-transform: uppercase;
    border: none;
    border-radius: 20px;
    font-weight: 700;
    padding: 6px 20px;
    max-width: 260px;
    font-family: "Source Sans Pro", Arial, sans-serif;

    &:focus {
        outline: none;
    }
`;

const Collection = ({details, history, collection}) => {
    const size = useWindowSize();
    const {belongs_to_collection} = details;
    const {name, backdrop_path, id} = belongs_to_collection;
    const {parts} = collection;

    const getTitle = () => {
        if (collection.hasOwnProperty('parts')) {
            const moviesTitle = parts.map(part => part.title);
            return moviesTitle.join(', ');
        } 
        return null
    }
    
    const path = size < 415 ? `https://image.tmdb.org/t/p/w1000_and_h450_multi_faces${backdrop_path}` : `https://image.tmdb.org/t/p/w1440_and_h320_multi_faces${backdrop_path}`;
    const collectionIncludes = size < 415 ? null : `Коллекция включает ${getTitle()}`;
    return (
        <CollectionWrapper>
            <CollectionContent bg={path}>
            <CollectionName>Входит в {name}</CollectionName>
            <CollectionDescription>{collectionIncludes}</CollectionDescription>
            <CollectionButton
                onClick={() => history.push(`/collection/${id}`)}
            >Смотреть коллекцию</CollectionButton>
            </CollectionContent>
        </CollectionWrapper>
    )
}

export default Collection;