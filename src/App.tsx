import React, {Component} from "react";
import "./App.css";
import {VTable} from "./components/Table/Table";
import {VCardPanel} from './components/Card/VCardPanel';

class App extends Component {
    render() {
        const data = [
            {name: "Carlos", lastname: "Chao"},
            {name: "Name1", lastname: "Lastname1"},
            {name: "Name2", lastname: "Lastname2"},
            {name: "Name3", lastname: "Lastname3"},
            {name: "Name4", lastname: "Lastname4"},
            {name: "Name5", lastname: "Lastname5"},
            {name: "Name6", lastname: "Lastname6"},
            {name: "Name7", lastname: "Lastname7"},
            {name: "Name7", lastname: "Lastname7"},
            {name: "Name7", lastname: "Lastname7"},
            {name: "Name7", lastname: "Lastname7"},
            {name: "Name7", lastname: "Lastname7"},
        ];

        // validator example
        const nameValidation = (value: string) => {
            return value.length > 5;
        };

        return (
            <div style={{
                padding: '20px',
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between'
            }}>
                <VCardPanel headerText={'This is the header of the card'}
                       headerIcon={'calendar'}
                       headerBackgroundColor={'violet'}
                       headerColor={'white'}
                       cardElevation={3}
                       headerHorizontalAlign={'start'}
                       height={'350px'}
                       width={'30%'}
                >
                    <div>This is the card content</div>
                </VCardPanel>
                <VCardPanel collapse
                       keepChildrenMounted
                       headerTextJustify={'center'}
                       bodyPadding={'10px'}
                       openIcon={'plus'}
                       closeIcon={'minus'}
                       headerText={'This is the header of the 2 card'}
                       cardElevation={2}
                       height={'150px'}
                       width={'25%'}
                >
                    <div>This is the card content</div>
                </VCardPanel>
                <VCardPanel headerIcon={'calendar'}
                       headerBackgroundColor={'blue'}
                       headerColor={'white'}
                       cardElevation={3}
                       headerHorizontalAlign={'center'}
                       height={'140px'}
                       width={'15%'}
                >
                    <div>This is the card content of a card with no text in the header</div>
                </VCardPanel>

                <VCardPanel headerText={'This is the header of the  default card'}
                >
                    <div>This is the card content</div>
                </VCardPanel>
            </div>
        );
    }

    onSort = (index: number, order: string) => {
        console.log(index);
        console.log(order);
    }
}

export default App;
