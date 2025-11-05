import { BaseDecorator } from './BaseDecorator';
import { DataExporter } from '../interfaces/DataExporter';

export class EncryptionDecorator extends BaseDecorator {
    constructor(exporter: DataExporter) {
        super(exporter);
    }

    export(data: object): string {
        console.log('Adicionando CRIPTOGRAFIA...');
        // 1. Chama o método do objeto embrulhado (pode ser o Json ou o Compression)
        const exportedData = super.export(data);

        // 2. Adiciona a nova funcionalidade (simulada)
        const encryptedData = Buffer.from(exportedData).toString('base64');
        return `<encrypted>${encryptedData}</encrypted>`;
    }
}