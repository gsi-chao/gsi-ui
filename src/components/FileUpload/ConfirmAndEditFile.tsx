import React, { useEffect, useState } from 'react';
import { VCardPanel } from '../Card';
import { AnchorButton, Button, Divider } from '@blueprintjs/core';
import { VInputField } from '../Form';
import {
  ButtonsRowContainer,
  DivContainerTop,
  FileExtSpan,
  FileNameContainer,
  PreviewContainer,
  StyledDialog
} from './styles';
import PreviewComponent from './PreviewComponent';

export interface ConfirmAndEditFileProps {
  isOpen: boolean;
  toggleIsOpen: any;
  fileName: string;
  triggerFileBrowser: any;
  changeFileName: any;
  eraseFile: any;
  handleFinish: any;
  file: any;
}

const getFileNameAndExt = (completeFileName: string) => {
  const splicedFileName = completeFileName.split('.');
  if (splicedFileName.length > 1) {
    const fileExt = splicedFileName[splicedFileName.length - 1];
    let fileName = '';
    splicedFileName.some((item, index) => {
      fileName += `${item}${index !== splicedFileName.length - 2 ? '.' : ''}`;
      return index === splicedFileName.length - 2;
    });
    return { fileName, fileExt };
  }
  return {
    fileName: '',
    fileExt: ''
  };
};

const ConfirmAndEditFile = (props: ConfirmAndEditFileProps) => {
  const {
    handleFinish,
    toggleIsOpen,
    eraseFile,
    triggerFileBrowser,
    isOpen,
    changeFileName,
    file
  } = props;

  const [url, setUrl] = useState('');
  const [type, setType] = useState('');
  const [fileExt, setFileExt] = useState('');
  const [fileName, setFileName] = useState('');

  useEffect(() => {
    if (file) {
      setUrl(window.URL.createObjectURL(file));
      setType(file.type);
      const { fileExt, fileName } = getFileNameAndExt(props.fileName);
      setFileName(fileName);
      setFileExt(fileExt);
    } else {
      clear();
    }
  }, [file, props.fileName]);

  const clear = () => {
    setFileExt('');
    setFileName('');
    setUrl('');
    setType('');
  };

  const handleChangeFileName = (value: any) => {
    changeFileName(`${value}.${fileExt}`);
  };

  return (
    <>
      <StyledDialog isOpen={isOpen}>
        <VCardPanel
          width={'340px'}
          bodyPadding={'10px'}
          headerText={'Confirm or Edit File'}
        >
          <div>
            <DivContainerTop>
              <FileNameContainer>
                <VInputField
                  id={'fileName'}
                  fill
                  noLabel
                  value={fileName}
                  onChange={handleChangeFileName}
                  rightElement={
                    <AnchorButton
                      onClick={triggerFileBrowser}
                      icon={'cloud-upload'}
                    />
                  }
                />
                <FileExtSpan>{`${fileExt && '.'}${fileExt}`}</FileExtSpan>
              </FileNameContainer>
              <PreviewContainer>
                <PreviewComponent url={url} type={type} />
              </PreviewContainer>
            </DivContainerTop>
            <Divider />
            <ButtonsRowContainer>
              <Button
                minimal
                intent={'success'}
                icon={'tick'}
                onClick={handleFinish}
                text={'Finish'}
              />
              <Button
                minimal
                intent={'warning'}
                icon={'eraser'}
                onClick={eraseFile}
                text={'Clear'}
              />
              <Button
                minimal
                intent={'danger'}
                icon={'cross'}
                onClick={toggleIsOpen}
                text={'Cancel'}
              />
            </ButtonsRowContainer>
          </div>
        </VCardPanel>
      </StyledDialog>
    </>
  );
};

export default ConfirmAndEditFile;
