import React, { Component } from 'react';
import { TypePickerColor, VColorPicker, VColorResult } from '../components/ColorPicker';
import { VHSLColor, VRGBColor } from '../components/ColorPicker/types';


interface IState {
  typePickerColor: TypePickerColor;
  color:string | VHSLColor | VRGBColor;
}

class ColorPickerDemo extends Component<any, IState> {
  constructor(props: any) {
    super(props);

    this.state = {
      typePickerColor: 'SketchPicker',
      color:'blue'
    };
  }

  render() {
    return (
      <div>
        <br />
        <br />
        <button onClick={this.handleChangeTypeToSketchPicker}>
          SketchPicker
        </button>
        <button onClick={this.handleChangeTypeToChromePicker}>
          ChromePicker
        </button>
        <br />
        <br />
        <VColorPicker
         Color={this.state.color}
          onChange={this.handleChangeColor}
          typePickerColor={this.state.typePickerColor}
          position={'right'}
          width={30}
          height={30}
        />
        <br/>
        <br/>
        <button onClick={()=>{
          this.setState({
            color:'red'
          })
        }}>change color to red</button>

        <button onClick={()=>{
          this.setState({
            color:'blue'
          })
        }}>change color to blue</button>

      </div>
    );
  }

  handleChangeColor = (color: VColorResult) => {
    this.setState({
      color:color.rgb
    })

    console.log(' color:', color.hex)

  };

  handleChangeTypeToChromePicker = () => {
    this.setState({
      typePickerColor: 'ChromePicker'
    });
  };

  handleChangeTypeToSketchPicker = () => {
    this.setState({
      typePickerColor: 'SketchPicker'
    });
  };
}

export default ColorPickerDemo;
