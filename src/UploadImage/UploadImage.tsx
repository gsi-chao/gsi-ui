import React, { Component } from 'react';
import { Card, Icon, Label } from 'semantic-ui-react';
import styled from 'styled-components';
import { CardHeader, CardImage } from './style';

const CardStyle = styled(Card)`
    width: 209px !Important;
    height: 261px;`;

interface IUploadImageState {
  file: any,
  imagePreviewUrl: string
}

interface IUploadImageProps {
  tittle?: string,
  onSelect?: (file: any) => void
}

export class UploadImage extends Component<IUploadImageProps, IUploadImageState> {
  constructor(props: IUploadImageProps) {
    super(props);
    this.state = {
      file: '',
      imagePreviewUrl: ''
    };
  }

  handleSubmit = (e: any) => {
    const { file, imagePreviewUrl } = this.state;
    e.preventDefault();
    if (imagePreviewUrl && file) {
      // TODO: do something with -> this.state.file
    }
  };

  handleImageChange = (e: any) => {
    e.preventDefault();

    const reader = new FileReader();
    const file = e.target.files[0];

    reader.onloadend = () => {
      this.setState({
        file,
        imagePreviewUrl: reader.result!.toString()
      });
    };

    reader.readAsDataURL(file);
  };

  render() {
    const { file, imagePreviewUrl } = this.state;
    const { tittle } = this.props;
    let $imagePreview = null;
    let $imageName = <Card.Header>Icon name</Card.Header>;
    if (imagePreviewUrl) {
      $imagePreview = (<img style={CardImage} src={imagePreviewUrl}/>);
    }
    if (tittle) {
      $imageName = (<Card.Header>{tittle}</Card.Header>);
    } else {
      $imageName = (<Card.Header>{file.name}</Card.Header>);
    }

    return (
      <CardStyle>
        <Card.Content>
          <CardHeader>
            {$imagePreview}
          </CardHeader>
          {$imageName}
          <form onSubmit={this.handleSubmit}>
            <Label as='label' htmlFor="file" size="large">
              <Icon name="upload"/>
              icon
            </Label>
            <input id="file" onChange={this.handleImageChange} hidden type="file"/>
            <Label as='a' onClick={this.handleSubmit} htmlFor="file" size="large">
              <Icon name="save"/>
              save
            </Label>
          </form>
        </Card.Content>
      </CardStyle>
    );
  }
}