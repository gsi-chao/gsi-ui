import React from 'react';
import { Icon, IconName } from '@blueprintjs/core';
import { MaybeElement } from '@blueprintjs/core/src/common/props';

interface ISettingEmptyData {
  textSize?: number;
  iconSize?: number;
  color?: string;
  backgroundColor?: string;
  height?: string;
  text?: string;
  icon?: IconName | MaybeElement;
  customerIcon?: any;
}

interface IEmptyData {
  settings: ISettingEmptyData | undefined;
}

export const EmptyData = (props: IEmptyData) => {
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
    '100%';
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
        height: '100%',
        width: '100%',
        position: 'relative',
        minHeight: '15vh'
      }}
      className={'empty-container'}
    >
      <div
        style={{
          height,
          backgroundColor,
          color,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          position: 'absolute',
          width: '100%'
        }}
      >
        <div style={{ textAlign: 'center' }}>
          {renderIcon}
          <p
            style={{ color, fontSize: textSize, fontWeight: 400, width: 100 }}
            className="bp3-heading"
          >
            {text}
          </p>
        </div>
      </div>
    </div>
  );
};
