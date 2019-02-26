import React, { Component } from 'react';
import {
  showToastNotification
} from '../components/ToastNotification';
import { Button } from '@blueprintjs/core';
import { IToastNotificationProps } from '../components/ToastNotification/VToastNotification';

class NotificationToastDemo extends Component {
  render() {
    const propsList: IToastNotificationProps[] = [
      {
        type: 'success',
        message:
          'This is a basic Success notification, Congratulations you do it well',
      },
      {
        type: 'warning',
        message:
          'This is a basic Warning notification, be careful with what are you doing'
      },
      {
        type: 'danger',
        message: 'This is a basic danger notification, something went wrong'
      },
      {
        type: 'primary',
        message: 'This is a primary notification, just normal, but Blue ;)'
      },
      {
        type: 'none',
        message: 'This is a normal notification, use it at your will'
      },
      {
        type: 'primary',
        message: (
          <>
            This is a more complex Toast notification is much like the one in
            the documentation <em>but better :)</em> it will print in the console just before this one banish and has a duration of
            <em>5 s (5000 ms)</em> form more documentation: <a href={'https://blueprintjs.com/docs/#core/components/toast'} target={"_blank"}>the documentation</a>,
            you can even pass a React component OMG!!!
          </>
        ),
        timeout: 5000,
        onDismiss: () => console.log('notification dismissed'),
        action: {
          href: "https://blueprintjs.com/docs/#core/components/toast",
          target: "_blank",
          text: <strong>This navigate to the site too</strong>,
        },
      }
    ];
    return (
      <div style={{ padding: '25px' }}>
        {propsList.map((props, index) => {
          const text =
            index === propsList.length - 1
              ? 'Complex Notification'
              : props.type;
          return (
            <Button
              key={index}
              intent={props.type}
              text={text}
              style={{ marginRight: '5px' }}
              onClick={() => showToastNotification(props)}
            />
          );
        })}
      </div>
    );
  }
}

export default NotificationToastDemo;
