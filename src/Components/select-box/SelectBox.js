import React, { useState } from 'react';
import styled from 'styled-components'
import ArrowDown from './images/arrow_down.svg'
import ArrowUp from './images/arrow_up.svg'

const SelectBox = (props) => {
    const [items] = useState(props.items || []);
    const [showItems, setShowItems] = useState(false);
    const [selectedItem, setSelectedItem] = useState(props.items && props.items[0]);
    

    const dropDown = () => {
        setShowItems(!showItems)
    }

    const selectItem = (item) => {
        setSelectedItem(item);
        setShowItems(false);
    }

    const Wrapper = styled.section`
        box-sizing: border-box;
        border: transparent;
        width: 10rem;
        padding: 0;
        top: 5px;
        left: 10%;
        position: absolute;
    `;

    const Selected = styled.div`
        /* display: inline-box; */
        height: 100%;
        width: 100%;
        padding: 6px;
        font-weight: bold;
        margin-left: 50px;
    `;

    const DropdownButton = styled.button`
        width: 40px;
        height: 32px;
        margin: 0;
        padding: 0;
        background-color: inherit;
        border: transparent;
        cursor: pointer;
        position: absolute;
        background-image: url(${showItems ? ArrowUp : ArrowDown});
        background-position: center;
        background-repeat: no-repeat;
        background-size: 40px 40px;
    `;

    const Select = styled.section`
        display: ${showItems ? 'block' : 'none'};
    `;

    const Option = styled.div`
        cursor: pointer;
        border: 1px solid #ddd;
        padding: 6px;
        padding-left: 20px;
        border-radius: 0.2rem;
        background-color: #ff9900;
    `;
    
        return(
                <Wrapper>

                    <DropdownButton onClick={dropDown} />

                    <Selected>
                        {selectedItem.value}
                    </Selected>                 

                    <Select>
                        {
                            items.map(item => 
                                <Option
                                    key={ item.id }
                                    onClick={() => selectItem(item)}
                                    style={item === selectedItem ? {color: '#1111ff'} : {color: 'inherit'}}
                                >
                                    { item.value }
                                </Option>
                            )
                        }
                    </Select> 
                </Wrapper>
        )
    }

export default SelectBox;