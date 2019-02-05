import React, {Component} from 'react';
import {
    dividerProgresVertical,
    ProgressLabelSegment, ProgressLabelSegmentCenter,
    ProgressLabelSegmentFirst,
    ProgressLabelSegmentLast, ProgressLabelSegmentUnic,
    SpanText
} from "./style";
import {Divider} from "@blueprintjs/core";
import {IProgressLabelProps, ISegment} from "./IPregressLabel";

class ProgressLabel extends Component<IProgressLabelProps> {
    constructor(props: IProgressLabelProps) {
        super(props);
    }

    createSegment(total: number, segment: ISegment) {
        let segmentResult = (<div>default</div>);
        const percent = (segment.amount * 100) / total;
        switch (segment.type) {
            case 'first':
                segmentResult =
                    <ProgressLabelSegmentFirst key={segment.key} Width={`${percent}%`}>
                        <SpanText>
                            {`${segment.amount} ${segment.label}`}
                        </SpanText>
                    </ProgressLabelSegmentFirst>;
                break;
            case 'last':
                segmentResult =
                    <ProgressLabelSegmentLast key={segment.key} Width={`${percent}%`}>
                        <SpanText>
                            {`${segment.amount} ${segment.label}`}
                        </SpanText>
                    </ProgressLabelSegmentLast>;
                break;
            case 'unique':
                segmentResult =
                    <ProgressLabelSegmentUnic key={segment.key} Width={`${percent}%`}>
                        <SpanText>
                            {`${segment.amount} ${segment.label}`}
                        </SpanText>
                    </ProgressLabelSegmentUnic>;
                break;
            case 'center':
                segmentResult =
                    <ProgressLabelSegmentCenter key={segment.key} Width={`${percent}%`}>
                        <SpanText>
                            {`${segment.amount} ${segment.label}`}
                        </SpanText>
                    </ProgressLabelSegmentCenter>;
                break
        }
        return segmentResult;
    }

    render() {
        const {total, segments} = this.props;
        const segmentsRender = segments.map(segment => {
            return this.createSegment(total, segment);
        });
        return (
            <ProgressLabelSegment>
                {segmentsRender}
            </ProgressLabelSegment>
        );
    }
}

export default ProgressLabel;