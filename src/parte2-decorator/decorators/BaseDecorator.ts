import { DataExporter } from '../interfaces/DataExporter';

// Classe abstrata que serve de base para todos os decoradores
export abstract class BaseDecorator implements DataExporter {

    // "wrapee": o objeto que está sendo "embrulhado"
    protected wrapee: DataExporter;

    constructor(exporter: DataExporter) {
        this.wrapee = exporter;
    }

    // O decorador delega a chamada para o objeto embrulhado
    export(data: object): string {
        return this.wrapee.export(data);
    }
}