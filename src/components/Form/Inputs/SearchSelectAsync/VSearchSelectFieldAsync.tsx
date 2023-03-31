import {
  Classes,
  IconName,
  InputGroup,
  Intent,
  MaybeElement,
  Popover as WPopover,
  PopoverInteractionKind,
  Position
} from '@blueprintjs/core';
import { observer } from 'mobx-react';
import React, { FC, PropsWithChildren } from 'react';
import { IItem } from '../../types';
import { FormFieldContainer } from '../FormFieldContainer';
import { IFieldProps } from '../IFieldProps';
import { SelectSelectionInfo } from '../SearchSelect/SelectSelectionInfo';
import { StyledInput } from '../style';
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
  | 'labelInfo'
  | 'layer'
  | 'required'
  | 'value'
  | 'fieldState'
  | 'validators'
  | 'tooltip'
  | 'disabled'
  | 'onChange'
  | 'className'
  | 'inline'
  | 'margin'
  | 'displayRequired'
> & {
  onLoadData: (params: LoadData) => Promise<IItem[]>;
  placeholderSearch?: string;
  popoverMinimal?: boolean;
  popoverWidth?: number;
  multi?: boolean;
  fill?: boolean;
  isLoading?: boolean;
  amountCharacterSearch?: number;
  allowEmpty?: boolean;
  rightIcon?: IconName | MaybeElement;
  suppessLeftIconSearch?: boolean;
  allowFirstLoad?: boolean;
};

const Popover: PropsWithChildren<any> = WPopover;

export const VSearchSelectFieldAsync: FC<VSearchSelectFieldAsyncProps> = observer(
  ({
    id,
    label,
    placeholder,
    noLabel,
    labelInfo,
    layer,
    required,
    validators,
    displayRequired,
    popoverWidth,
    className,
    isLoading,
    inline,
    margin,
    value,
    allowEmpty,
    fieldState,
    fill,
    tooltip,
    rightIcon,
    placeholderSearch,
    suppessLeftIconSearch,
    multi = false,
    disabled = false,
    popoverMinimal = true,
    amountCharacterSearch = 3,
    onChange,
    onLoadData,
    allowFirstLoad
  }) => {
    const {
      text,
      count,
      isOpen,
      options,
      isValue,
      loading,
      selection,
      refInputSearch,
      isDisabledPopover,
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
      isLoading,
      onChange,
      onLoadData,
      allowFirstLoad
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
            position={Position.BOTTOM_LEFT}
            disabled={isDisabledPopover}
            content={
              <VSearchSelectFieldAsyncItems
                {...{
                  id,
                  multi,
                  popoverWidth,
                  allowEmpty,
                  placeholderSearch,
                  suppessLeftIconSearch
                }}
              />
            }
          >
            <div onClick={onTogglePopover}>
              <StyledInput
                {...{
                  className,
                  disabled,
                  inline,
                  labelInfo,
                  layer,
                  fill,
                  noLabel,
                  margin
                }}
                intent={
                  fieldState && fieldState.hasError
                    ? Intent.DANGER
                    : Intent.NONE
                }
                labelFor={id}
              >
                <FormFieldContainer
                  {...{ noLabel, label, fieldState, tooltip }}
                  required={required || displayRequired}
                >
                  <InputGroup
                    {...{
                      id,
                      label,
                      placeholder,
                      required,
                      disabled
                    }}
                    className={
                      !(loading || isLoading)
                        ? `gsi-input-select input-search-select2`
                        : Classes.SKELETON
                    }
                    autoFocus={false}
                    defaultValue={text}
                    rightElement={
                      <SelectSelectionInfo
                        {...{ count, deselectAllItems, rightIcon }}
                        disabled={disabled}
                        multi={multi}
                        allowEmpty={allowEmpty && isValue && !disabled}
                      />
                    }
                  />
                </FormFieldContainer>
              </StyledInput>
            </div>
          </Popover>
        </VSearchSelectBody>
      </VSearchSelectFieldAsyncContext.Provider>
    );
  }
);
