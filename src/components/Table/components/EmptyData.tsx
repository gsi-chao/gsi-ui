import React from 'react';
import { Icon, IconName } from '@blueprintjs/core';
import { MaybeElement } from '@blueprintjs/core/src/common/props';

import { ISettingEmptyData } from '../Table';

interface IEmptyData {
  settings: ISettingEmptyData | undefined;
}

const EmptyData = (props: IEmptyData) => {
  const text: string =
    (props && props.settings && props.settings!.text && props.settings!.text) ||
    'No data';
  const color: string =
    (props &&
      props.settings &&
      props.settings!.color &&
      props.settings!.color) ||
    'rgba(49, 59, 67, 0.27)';
  const height: string =
    (props &&
      props.settings &&
      props.settings!.height &&
      props.settings!.height) ||
    '20vh';
  const backgroundColor: string =
    (props &&
      props.settings &&
      props.settings!.backgroundColor &&
      props.settings!.backgroundColor) ||
    'rgb(245, 245, 245)';

  const iconSize: number =
    (props &&
      props.settings &&
      props.settings!.iconSize &&
      props.settings!.iconSize) ||
    28;

  const textSize: number =
    (props &&
      props.settings &&
      props.settings!.textSize &&
      props.settings!.textSize) ||
    22;

  const icon: IconName | MaybeElement =
    (props && props.settings && props.settings!.icon && props.settings!.icon) ||
    'th';

  const customerIcon =
    props &&
    props.settings &&
    props.settings!.customerIcon &&
    props.settings!.customerIcon;

  const renderIcon = customerIcon ? (
    customerIcon
  ) : (
    <Icon icon={icon} iconSize={iconSize} />
  );

  return (
    <div
      style={{
        height,
        backgroundColor,
        color,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      }}
    >
      <div style={{ textAlign: 'center' }}>
        {renderIcon}
        <p
          style={{ color, fontSize: textSize, fontWeight: 400 }}
          className="bp3-heading"
        >
          {text}
        </p>
      </div>
    </div>
  );
};

export default EmptyData;
