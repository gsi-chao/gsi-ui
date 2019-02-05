export interface IProgressLabelProps {
    total: number,
    width?: string,
    minWidth?: string,
    segments: ISegment[]
}

export interface ISegment {
    key: string,
    type: 'first' | 'center' | 'last' | 'unique',
    label: string,
    amount: number,
    color?: string
}