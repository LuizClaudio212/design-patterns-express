export interface DataExporter {
    export(data: object): string;
}