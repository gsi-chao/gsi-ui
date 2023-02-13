import {
  Classes,
  InputGroup,
  Popover as WPopover,
  PopoverInteractionKind
} from '@blueprintjs/core';
import React, { FC, PropsWithChildren } from 'react';
import { IItem } from '../../types';
import { FormFieldContainer } from '../FormFieldContainer';
import { IFieldProps } from '../IFieldProps';
import { SelectSelectionInfo } from '../SearchSelect/SelectSelectionInfo';
import { VSearchSelectFieldAsyncContext } from './context/VSearchSelectFieldAsyncContext';
import { useSearchSelectFieldAsync } from './hook/useSearchSelectFieldAsync';
import { VSearchSelectBody } from './styled';
import { VSearchSelectFieldAsyncItems } from './VSearchSelectFieldAsyncItems';

export type LoadData = {
  search: string | number;
  firstLoad: boolean;
};

export type VSearchSelectFieldAsyncProps = Pick<
  IFieldProps,
  | 'id'
  | 'label'
  | 'placeholder'
  | 'noLabel'
  | 'layer'
  | 'required'
  | 'value'
  | 'fieldState'
  | 'validators'
  | 'disabled'
  | 'tooltip'
  | 'onChange'
> & {
  onLoadData: (params: LoadData) => Promise<IItem[]>;
  popoverMinimal?: boolean;
  multi?: boolean;
  amountCharacterSearch?: number;
};

const Popover: PropsWithChildren<any> = WPopover;

export const VSearchSelectFieldAsync: FC<VSearchSelectFieldAsyncProps> = ({
  id,
  label,
  placeholder,
  noLabel,
  layer,
  required,
  validators,
  multi = false,
  disabled = false,
  popoverMinimal = true,
  amountCharacterSearch = 3,
  value,
  fieldState,
  tooltip,
  onChange,
  onLoadData
}) => {
  const {
    text,
    count,
    isOpen,
    options,
    loading,
    selection,
    refInputSearch,
    onSearchData,
    deselectAllItems,
    onTogglePopover,
    onOpeningPopover,
    onClearSearchData,
    changePopoverView,
    handleInteraction,
    onChangeFirstLoad,
    selectDeselectItem
  } = useSearchSelectFieldAsync({
    multi,
    disabled,
    required,
    validators,
    fieldState,
    value,
    onChange,
    onLoadData
  });

  return (
    <VSearchSelectFieldAsyncContext.Provider
      value={{
        isOpen,
        options,
        selection,
        loading,
        refInputSearch,
        amountCharacterSearch,
        onSearchData,
        onChangeFirstLoad,
        onClearSearchData,
        changePopoverView,
        selectDeselectItem
      }}
    >
      <VSearchSelectBody>
        <Popover
          {...{ isOpen }}
          targetClassName={'gsi-select-popover'}
          popoverClassName={'bp3-select-popover gsi-select-popover'}
          enforceFocus={false}
          autoFocus={false}
          canEscapeKeyClose={true}
          captureDismiss={true}
          minimal={popoverMinimal}
          interactionKind={PopoverInteractionKind.CLICK}
          modifiers={{
            flip: { enabled: true },
            keepTogether: { enabled: true },
            preventOverflow: { enabled: true }
          }}
          shouldReturnFocusOnClose={false}
          onOpening={onOpeningPopover}
          onInteraction={handleInteraction}
        >
          <div onClick={onTogglePopover}>
            <FormFieldContainer
              required={required}
              noLabel={noLabel}
              label={label}
              fieldState={fieldState}
              tooltip={tooltip}
            >
              <InputGroup
                {...{
                  id,
                  label,
                  placeholder,
                  layer,
                  required,
                  validators
                }}
                className={
                  !loading
                    ? `gsi-input-select input-search-select2`
                    : Classes.SKELETON
                }
                autoFocus={false}
                defaultValue={text}
                rightElement={
                  <SelectSelectionInfo
                    {...{ count, deselectAllItems }}
                    disabled={disabled}
                    multi={multi}
                  />
                }
              />
            </FormFieldContainer>
          </div>
          <VSearchSelectFieldAsyncItems {...{ multi }} />
        </Popover>
      </VSearchSelectBody>
    </VSearchSelectFieldAsyncContext.Provider>
  );
};
