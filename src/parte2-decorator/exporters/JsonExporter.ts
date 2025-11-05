import { DataExporter } from '../interfaces/DataExporter';

export class JsonExporter implements DataExporter {
    export(data: object): string {
        console.log('Exportando dados para JSON...');
        return JSON.stringify(data, null, 2);
    }
}