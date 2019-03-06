import React, { Component } from 'react';
import styled from 'styled-components';
import {
  AnchorButton,
  Button,
  IconName,

  Toaster
} from '@blueprintjs/core';
import { ISetupEditToolbar } from '../Table';
import { MaybeElement } from '@blueprintjs/core/src/common/props';

interface IProps {
  onSave: () => void;
  onCancel: () => void;
  onEdit: () => void;
  edit: boolean;
  setupEditToolbar?: ISetupEditToolbar;
}

interface IState {}

class EditToolBar extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
  }

  render() {
    const EditContainer = styled.div`
      background-color: #ebf1f5;
      display: flex;
      justify-content: flex-end;
      padding: 2px;
      @media (max-width: 991px) {
        justify-content: center;
      }
    `;

    return (
      <EditContainer>
        {this.props.edit ? this.getButtonActions() : this.getEditAction()}
      </EditContainer>
    );
  }

  getButtonActions = () => {
    return (
      <div>
        <AnchorButton onClick={this.props.onSave} minimal rightIcon={this.getSaveIcon()}>
          {this.getSaveText()}
        </AnchorButton>
        <AnchorButton
          onClick={this.onCancel}
          minimal
          rightIcon={this.getCancelIcon()}
        >
          {this.getCancelText()}
        </AnchorButton>
      </div>
    );
  };

  getSaveText = () => {
    if (this.existSetupToolbarProp()) {
      return this.props.setupEditToolbar!.textSave
        ? this.props.setupEditToolbar!.textSave
        : 'Save';
    }
    return 'Save';
  };

  getCancelText = () => {
    if (this.existSetupToolbarProp()) {
      return this.props.setupEditToolbar!.textCancel
        ? this.props.setupEditToolbar!.textCancel
        : 'Cancel';
    }
    return 'Cancel';
  };

  getCancelIcon = (): IconName | MaybeElement => {
    if (this.existSetupToolbarProp()) {
      return this.props.setupEditToolbar!.iconCancel
        ? this.props.setupEditToolbar!.iconCancel
        : 'disable';
    }
    return 'disable';
  };

  getSaveIcon = (): IconName | MaybeElement => {
    if (this.existSetupToolbarProp()) {
      return this.props.setupEditToolbar!.iconSave
        ? this.props.setupEditToolbar!.iconSave
        : 'tick';
    }

    return 'tick';
  };

  getEditIcon = (): IconName | MaybeElement => {
    if (this.existSetupToolbarProp()) {
      return this.props.setupEditToolbar!.iconEdit
        ? this.props.setupEditToolbar!.iconEdit
        : 'edit';
    }

    return 'edit';
  };


  existSetupToolbarProp = () => {
    return !!this.props.setupEditToolbar;
  };

  onCancel = () => {
    this.confirmCancel();
  };

  confirmCancel = () => {
    Toaster.create();
  };

  getEditAction = () => {
    return (
      <div>
        <Button onClick={this.props.onEdit} minimal icon={this.getEditIcon()} />
      </div>
    );
  };
}

export default EditToolBar;
