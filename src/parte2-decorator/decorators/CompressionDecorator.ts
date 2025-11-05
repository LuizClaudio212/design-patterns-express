import { BaseDecorator } from './BaseDecorator';
import { DataExporter } from '../interfaces/DataExporter';

export class CompressionDecorator extends BaseDecorator {
    constructor(exporter: DataExporter) {
        super(exporter);
    }

    export(data: object): string {
        console.log('Adicionando COMPRESSÃO...');
        // 1. Chama o método do objeto embrulhado (ex: JsonExporter)
        const exportedData = super.export(data);

        // 2. Adiciona a nova funcionalidade (simulada)
        return `<compressed>${exportedData.replace(/\s/g, '')}</compressed>`;
    }
}