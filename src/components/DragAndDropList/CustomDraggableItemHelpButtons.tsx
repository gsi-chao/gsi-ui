import React from 'react';
import { observer } from 'mobx-react';
import { SelectedItemHelpButton, SelectedItemHelpButtonList } from './types';
import { Button } from '@blueprintjs/core';

export interface ICDIHBProps {
  displayButtons?: boolean;
  source?: string;
  selectedItemHelpButtons?: SelectedItemHelpButtonList;
  draggableId: string;
  handleHelpButtonClicked?: (
    itemId: any,
    source: any,
    destination: any
  ) => void;
}
export const CustomDraggableItemHelpButtons = observer((props: ICDIHBProps) => {
  const {
    displayButtons,
    selectedItemHelpButtons,
    source,
    draggableId
  } = props;
  return (
    <div className={'buttonsContainer'}>
      {displayButtons &&
        selectedItemHelpButtons &&
        selectedItemHelpButtons.buttons.map(
          (button: SelectedItemHelpButton, index: number) => {
            return (
              (source !== button.destinationId && (
                <Button
                  small
                  id={`button_${button.destinationId}`}
                  key={index}
                  text={button.text}
                  icon={button.icon}
                  intent={button.intent || 'none'}
                  onClick={() => {
                    if (props.handleHelpButtonClicked) {
                      props.handleHelpButtonClicked(
                        draggableId,
                        source,
                        button.destinationId
                      );
                    }
                  }}
                />
              )) ||
              null
            );
          }
        )}
    </div>
  );
});
