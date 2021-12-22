export interface Farm {
    location: string,
}

export interface DataPoint extends Farm {
    location: string,
    date: Date,
    sensorType: string,
    value: number
}