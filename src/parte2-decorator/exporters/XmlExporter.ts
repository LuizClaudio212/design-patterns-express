import { DataExporter } from "../interfaces/DataExporter";

export class XmlExporter implements DataExporter {
    export(data: object): string {
        console.log('Exportando dados para XML...');
        let xml = '<root>\n';
        for (const key in data) {
            xml += `  <${key}>${(data as any)[key]}</${key}>\n`;
        }
        xml += '</root>';
        return xml;
    }
}