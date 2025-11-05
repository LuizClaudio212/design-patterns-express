import { Router, Request, Response } from 'express';
import { DataExporter } from './interfaces/DataExporter';
import { JsonExporter } from './exporters/JsonExporter';
import { XmlExporter } from './exporters/XmlExporter';
import { CompressionDecorator } from './decorators/CompressionDecorator';
import { EncryptionDecorator } from './decorators/EncryptionDecorator';

const router = Router();

router.post('/export', (req: Request, res: Response) => {
    // format: 'json' | 'xml'
    // decorators: ['compress', 'encrypt']
    const { format, decorators = [] } = req.body;
    const data = { user: 'bruno', projectId: 123, status: 'active' };

    // 1. ETAPA BASE: Escolhe o exportador concreto (o "presente")
    let exporter: DataExporter;
    if (format === 'xml') {
        exporter = new XmlExporter();
    } else {
        exporter = new JsonExporter();
    }

    // 2. ETAPA DE DECORAÇÃO: Embrulha o objeto dinamicamente
    // A ordem importa!
    if (decorators.includes('compress')) {
        exporter = new CompressionDecorator(exporter); // Embrulha o exportador
    }
    if (decorators.includes('encrypt')) {
        exporter = new EncryptionDecorator(exporter); // Embrulha (possivelmente) o decorador anterior
    }

    // 3. EXECUÇÃO: Chama o método 'export'
    // O controller não sabe se está chamando o JsonExporter ou o EncryptionDecorator
    // Ele apenas chama, e a cadeia de responsabilidades faz o resto.
    try {
        const result = exporter.export(data);
        res.setHeader('Content-Type', 'text/plain');
        res.send(result);
    } catch (error) {
        res.status(500).json({ error: (error as Error).message });
    }
});

export default router;