import * as React from 'react';
import { RisizeContainer } from './dialog';

export const ResizeHandle = (
  props: React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  >
): React.ReactElement => (
  <RisizeContainer>
    <div className="ant-design-draggable-modal-resize-handle" {...props}>
      <div className="ant-design-draggable-modal-resize-handle-inner" />
    </div>
  </RisizeContainer>
);
