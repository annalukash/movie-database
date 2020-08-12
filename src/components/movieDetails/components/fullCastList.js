import React from 'react';
import styled from 'styled-components';

const CastTitle = styled.div`
    font-size: 22.4px;
    font-family: Arial;
    font-weight: 600;
`;

const CastNumber = styled.span`
    opacity: 0.6;
`;

const CastItemWrapper = styled.div`
    display: flex;
    align-items: center;
    margin-top: 10px;
`;

const CastItemImg = styled.img`
    width: 66px;
    height: 66px;
    border-radius: 5px;
    cursor: pointer;
`;

const CastNameWrapper = styled.div`
    display: flex;
    flex-direction: column;
    padding-left: 20px;
`;

const CastName = styled.div`
    font-size: 16px;
    font-weight: 700;
    cursor: pointer;
`;

const CastCharacter = styled.div`
    font-size: 16px;
    cursor: pointer;
`;

const CastContent = styled.div``;

const DepartmentTitle = styled.div`
    margin: 20px 0 8px;
    font-weight: 700;
    font-size: 16px;
`;

const Actors = ({casts, history}) => {

    const {cast} = casts;

    const sortedByOrderCasts = cast.sort((a, b) => {
        const previous = a.order;
        const current = b.order;
        return previous - current;
    })

    const castItem = sortedByOrderCasts.map((item, index) => {
        const src = item.profile_path ? ('https://image.tmdb.org/t/p/w66_and_h66_face' + item.profile_path) : '../../assets/avatar.png';

        return (
            <CastItemWrapper key={index}>
                <CastItemImg 
                    alt={item.name} 
                    src={src} 
                    onClick={() => {history.push(`/person/${item.id}`)}}
                />
                <CastNameWrapper>
                    <CastName 
                        onClick={() => {history.push(`/person/${item.id}`)}}
                    >{item.name}</CastName>
                    <CastCharacter>{item.character}</CastCharacter>
                </CastNameWrapper>
            </CastItemWrapper>
        )
    })

    return (
        <>
            <CastTitle>
                Актёрский состав <CastNumber>{cast.length}</CastNumber>
            </CastTitle>
            <CastContent>
                {castItem}
            </CastContent>
        </>
    )
}

const Crew = ({casts, history}) => {

    const {crew} = casts;

    const CrewDepartment = ({department}) => {
        const crewItem = crew.map((item, index) => {
            const src = item.profile_path ? ('https://image.tmdb.org/t/p/w66_and_h66_face' + item.profile_path) : '../../assets/avatar.png';

            if (item.department === department) {
                return (
                    <CastItemWrapper key={index}>
                        <CastItemImg 
                            alt={item.name} 
                            src={src} 
                            onClick={() => {history.push(`/person/${item.id}`)}}
                        />
                        <CastNameWrapper>
                            <CastName 
                                onClick={() => {history.push(`/person/${item.id}`)}}
                            >{item.name}</CastName>
                            <CastCharacter>{item.job}</CastCharacter>
                        </CastNameWrapper>
                    </CastItemWrapper> 
                )
            }
            return null;
        })
        return crewItem;
    }

    return (
        <>
            <CastTitle>
                Съёмочный состав <CastNumber>{crew.length}</CastNumber>
            </CastTitle>
            <CastContent>
                <DepartmentTitle>Оформление</DepartmentTitle>
                <CrewDepartment department={'Art'}/>
                <DepartmentTitle>Камера</DepartmentTitle>
                <CrewDepartment department={'Camera'}/>
                <DepartmentTitle>Костюмы и грим</DepartmentTitle>
                <CrewDepartment department={'Costume & Make-Up'}/>
                <DepartmentTitle>Ещё</DepartmentTitle>
                <CrewDepartment department={'Crew'}/>
                <DepartmentTitle>Режиссура</DepartmentTitle>
                <CrewDepartment department={'Directing'}/>
                <DepartmentTitle>Монтаж</DepartmentTitle>
                <CrewDepartment department={'Editing'}/>
                <DepartmentTitle>Свет</DepartmentTitle>
                <CrewDepartment department={'Lighting'}/>
                <DepartmentTitle>Продакшн</DepartmentTitle>
                <CrewDepartment department={'Production'}/>
                <DepartmentTitle>Звук</DepartmentTitle>
                <CrewDepartment department={'Sound'}/>
                <DepartmentTitle>Визуальные эффекты</DepartmentTitle>
                <CrewDepartment department={'Visual Effects'}/>
                <DepartmentTitle>Сценарий</DepartmentTitle>
                <CrewDepartment department={'Writing'}/>
            </CastContent>
        </>
    )
}

export {Actors, Crew};