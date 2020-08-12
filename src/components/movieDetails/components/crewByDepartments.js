import React from 'react';
import styled from 'styled-components';
import PersonDetailsCrew from './personDetailsCrew';

const MovieListWrapper = styled.div``;

const DepartmentListTitle = styled.div`
    font-size:20.8px;
    font-weight:600;
    margin: 10px 0;
`;

const MovieListContent = styled.div`
    box-shadow:rgba(0, 0, 0, 0.1) 0px 2px 8px 0px;
    border: 1px solid rgb(227, 227, 227);
`;

const CrewByDepartments = ({crew}) => {

    const filteredCrew = (department) => {
        return crew.filter(item => item.department === department);
    }

    const production = !filteredCrew("Production").length ? null : <Department crew={filteredCrew("Production")}/>;
    const writing = !filteredCrew("Writing").length ? null : <Department crew={filteredCrew("Writing")}/>;
    const art = !filteredCrew("Art").length ? null : <Department crew={filteredCrew("Art")}/>;
    const camera = !filteredCrew("Camera").length ? null : <Department crew={filteredCrew("Camera")}/>;
    const makeUp = !filteredCrew("Costume & Make-Up").length ? null : <Department crew={filteredCrew("Costume & Make-Up")}/>;
    const crews = !filteredCrew("Crew").length ? null : <Department crew={filteredCrew("Crew")}/>;
    const directing = !filteredCrew("Directing").length ? null : <Department crew={filteredCrew("Directing")}/>;
    const editing = !filteredCrew("Editing").length ? null : <Department crew={filteredCrew("Editing")}/>;
    const lighting = !filteredCrew("Lighting").length ? null : <Department crew={filteredCrew("Lighting")}/>;
    const sound = !filteredCrew("Sound").length ? null : <Department crew={filteredCrew("Sound")}/>;
    const visualEffects = !filteredCrew("Visual Effects").length ? null : <Department crew={filteredCrew("Visual Effects")}/>;

    return (
        <MovieListWrapper>
            {production}
            {writing}
            {art}
            {camera}
            {makeUp}
            {crews}
            {directing}
            {editing}
            {lighting}
            {sound}
            {visualEffects}
        </MovieListWrapper>
    )
}

const Department = ({crew}) => {
    return (
        <>
            <DepartmentListTitle>{crew[0].department}</DepartmentListTitle>
            <MovieListContent>
                <PersonDetailsCrew crew={crew}/>
            </MovieListContent>
        </>
    )
}

export default CrewByDepartments;