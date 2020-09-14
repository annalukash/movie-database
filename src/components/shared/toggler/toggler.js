import React, {useState, useRef, useEffect} from 'react';
import styled from 'styled-components';

const TogglerWrapper = styled.div`
    width: fit-content;
    border: 1px solid rgb(3, 37, 65);;
    border-radius: 15px;
    display: flex;
    justify-content: space-between;
    position: relative;
    font-size: 1.1em;
    cursor: pointer;
`;

const ToggleItem = styled.div`
    padding: 0 15px;
    color: ${props => props.isActive ? 'rgb(30, 213, 169)' : 'rgb(3, 37, 65)'};
    position: relative;
    z-index: 2;
`;

const ToggleActive = styled.div`
    background-color: rgb(3, 37, 65);
    position: absolute;
    height: 100%;
    width: ${props => (props.width + 'px') || '100px'};
    border-radius: 15px;
    transition: all 200ms;

    &.first-active {
        left: 0;
    }

    &.second-active {
        left: ${props => `calc(100% - ${props.width}px)`}
    }
`;

const Toggler = ({names, loadTrend, types}) => {
    const buttonsArray = [
        {
            isActive: true,
            text: names[0],
            type: types[0]
        },
        {
            isActive: false,
            text: names[1],
            type: types[1]
        }
    ]

    const [buttons, setButtons] = useState(buttonsArray || []);
    const [width, setWidth] = useState(0);
    const ref = useRef(null);
    useEffect(() => {
        if (buttons[0].isActive) {
            setWidth(ref.current.clientWidth)
        }
    }, []);

    let classNames = buttons[0].isActive ? 'first-active' : 'second-active';

    const onToggle = (event, index) => {
        setWidth(event.currentTarget.clientWidth);
        
        buttons.forEach(item => item.isActive = false);
        buttons[index].isActive = true;
        loadTrend(buttons[index].type)

        setButtons(buttons);

    }

    const toggleItems = buttons.map((item, index) => {
        const reference = item.isActive ? ref : null;
        return (
            <ToggleItem 
                isActive={item.isActive}
                key={index}
                onClick={(event) => onToggle(event, index)}
                ref={reference}
            >{item.text}</ToggleItem>
        )
    })

    return (
        <TogglerWrapper>
            {toggleItems}
            <ToggleActive className={classNames} width={width}></ToggleActive>
        </TogglerWrapper>
    )
}

export default Toggler;