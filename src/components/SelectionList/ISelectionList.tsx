import { SemanticICONS} from 'semantic-ui-react';

export interface IItemsList{
    text:string
    icon?:SemanticICONS
    value:string
    active?:boolean,
    iconPosition?: 'left' | 'right'
}

export interface ISelctionListProps{
    elements:IItemsList[]
    onSelect(list:IItemsList[]):void,
    header:{
        text:string
        color?:string        
    },
    selection?:{
        textColor:string,
        background:string
    }
}