import React, {Component} from 'react';
import { SemanticICONS, Label, Segment, List, Icon } from 'semantic-ui-react';
import {IItemsList,ISelctionListProps} from './ISelectionList';
import {ListItem} from './style'



interface ISelctionListState{
    listSelected:IItemsList[]
}

export class SelectionList extends Component<ISelctionListProps, ISelctionListState>{
    constructor(props:ISelctionListProps){
        super(props);
    }

    public state:ISelctionListState = {
        listSelected:this.props.elements.filter(e=>e.active)
    }
    isActive = (elements:IItemsList)=>{
          return  !!this.state.listSelected.find(e=>e.value === elements.value)
    }
    onItemClick = (active:boolean, element:IItemsList)=>{
        const {listSelected} = this.state;
        let new_list:IItemsList[];

        active
        ?
        new_list = listSelected.filter(e=>e.value!==element.value)
        :
        new_list = listSelected.concat(element);

        this.setState({...listSelected, listSelected:new_list})
        this.props.onSelect(new_list);
    }
    render(){
        const {header, elements, selection} = this.props;
        
        return(
            <Segment basic>
                <Label attached="top" style={{backgroundColor:header.color || '#767676'}}>{header.text}</Label>
                <List selection verticalAlign="middle">
                {
                    elements.map(element=>{
                        const active = this.isActive(element);
                        return(
                            <ListItem active={active} key={element.value} {...selection}>
                                <List.Item
                                    value={element.value}
                                    active={active}
                                    onClick={() => {
                                    this.onItemClick(active, element);
                                    }}>                                    
                                    <List.Content>
                                        {
                                            !!element.icon &&
                                            <Icon name={element.icon} style={{float:(element.iconPosition !=='right')?'left':'inherit'}}/>
                                        }
                                        {element.text}
                                    </List.Content>
                                </List.Item>
                            </ListItem>
                    )})
                }
                </List>
            </Segment>
        );
    }
}