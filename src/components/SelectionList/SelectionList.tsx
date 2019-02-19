import React, {Component} from 'react';
import "normalize.css";
import "@blueprintjs/core/lib/css/blueprint.css";
import "@blueprintjs/icons/lib/css/blueprint-icons.css";
import { Classes, Menu, MenuItem } from "@blueprintjs/core";
import {IItemsList,ISelctionListProps} from './ISelectionList';

interface ISelctionListState{
    listSelected:IItemsList[]
}

export class SelectionList extends Component<ISelctionListProps, ISelctionListState>{
    constructor(props:ISelctionListProps){
        super(props);
    }

    public state:ISelctionListState = {
        listSelected:this.props.elements.filter(e=>e.active)
    };
    isActive = (elements:IItemsList)=>{
          return  !!this.state.listSelected.find(e=>e.value === elements.value)
    };
    onItemClick = (active:boolean, element:IItemsList)=>{
        const {listSelected} = this.state;
        let new_list:IItemsList[];

        active
        ?
        new_list = listSelected.filter(e=>e.value!==element.value)
        :
        new_list = listSelected.concat(element);

        this.setState({...listSelected, listSelected:new_list});
        this.props.onSelect(new_list);
    };
    render(){
        const {elements, selection} = this.props;
        
        return(
            <Menu className={Classes.ELEVATION_1}>
                {
                    elements.map(element=>{
                        const active = this.isActive((element));
                        const backgroundColor = (!!selection && !!selection.background ? selection!.background:'#00B3A4');
                        const textColor = (!!selection && !!selection.textColor ? selection!.textColor:'#10161A');
                        return(
                            <MenuItem
                                key={element.value}
                                active={active}
                                text={element.text}
                                style={{
                                    background:(active)?backgroundColor:'',
                                    color:(active)?textColor:''
                                }}
                                onClick={() => {
                                    this.onItemClick(active, element);
                                }}
                                icon={element.icon}
                            />
                        );
                    })
                }
            </Menu>

        );
    }
}