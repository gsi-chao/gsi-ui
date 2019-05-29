import React, { useEffect, useRef, useState } from 'react';
import { AnchorButton, MenuItem, Popover, Position } from '@blueprintjs/core';
import ConfirmAndEditFile from './ConfirmAndEditFile';
import { OptionsMenu } from './styles';

export interface FileUploadProps {
  handleFileUpload?: any;
  handleFileDelete?: any;
  handleFileDownload?: any;
  handleFileView?: any;
  file?: FileProps;
}

export interface FileProps {
  url: string;
}

export interface FileUploadState {
  file: any;
  fileName: string;
  isOpenMenu: boolean;
  isOpenEditFileDialog: boolean;
}

export const FileUpload = (props: FileUploadProps) => {
  const fileInputRef = useRef(null);
  const [state, setState] = useState<FileUploadState>({
    file: null,
    fileName: '',
    isOpenEditFileDialog: false,
    isOpenMenu: false
  });

  const { isOpenMenu, isOpenEditFileDialog, fileName, file } = state;
  useEffect(() => {
    if (file) {
      console.log(file);
      setState({ ...state, fileName: file.name });
    }
  }, [file]);

  useEffect(() => {
    if (file && fileName) {
      setState({ ...state, isOpenEditFileDialog: true });
    }
  }, [fileName]);

  const handleFileChange = () => {
    // @ts-ignore
    const newFile = fileInputRef.current!.files[0];
    setState({ ...state, file: newFile });
  };
  const triggerFileBrowser = () => {
    // @ts-ignore
    fileInputRef.current.click();
  };

  const toggleIsOpenMenu = () => {
    setState({ ...state, isOpenMenu: !isOpenMenu });
  };

  const toggleIsOpenDialog = () => {
    setState({ ...state, isOpenEditFileDialog: !isOpenEditFileDialog });
  };

  const changeFileName = (value: any) => {
    setState({ ...state, fileName: value });
  };

  const eraseFile = () => {
    setState({ ...state, fileName: '', file: '' });
    // @ts-ignore
    fileInputRef.current.value = '';
  };

  return (
    <>
      <input
        style={{ display: 'none' }}
        type={'file'}
        ref={fileInputRef}
        onChange={handleFileChange}
      />
      <AnchorButton
        minimal
        onClick={triggerFileBrowser}
        icon={'cloud-upload'}
      />
      <Popover
        content={
          <OptionsMenu>
            <MenuItem icon={'cloud-download'} />
            <MenuItem icon={'trash'} />
            <MenuItem icon={'eye-open'} />
          </OptionsMenu>
        }
        position={Position.BOTTOM_LEFT}
      >
        <AnchorButton minimal onClick={toggleIsOpenMenu} icon={'menu'} />
      </Popover>
      {isOpenEditFileDialog && (
        <ConfirmAndEditFile
          isOpen={isOpenEditFileDialog}
          toggleIsOpen={toggleIsOpenDialog}
          fileName={fileName}
          triggerFileBrowser={triggerFileBrowser}
          changeFileName={changeFileName}
          eraseFile={eraseFile}
          handleFinish={toggleIsOpenDialog}
          file={file}
        />
      )}
    </>
  );
};
