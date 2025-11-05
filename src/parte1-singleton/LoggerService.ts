// Define o formato de uma entrada de log 
type LogEntry = {
    timestamp: string;
    level: 'info' | 'warn' | 'error';
    message: string;
};

export class LoggerService {
    // 1. A instância estática e privada
    private static instance: LoggerService;

    // 2. O armazenamento de logs [cite: 14]
    private logs: LogEntry[] = [];
    private readonly MAX_LOGS = 100; // [cite: 14]

    // 3. O construtor privado impede o 'new LoggerService()' fora da classe
    private constructor() {
        console.log("Instância do LoggerService CRIADA");
    }

    // 4. O método estático público para obter a instância
    public static getInstance(): LoggerService {
        if (!LoggerService.instance) {
            LoggerService.instance = new LoggerService();
        }
        return LoggerService.instance;
    }

    // 5. Métodos de log (requisitos) [cite: 15]
    private addLog(level: 'info' | 'warn' | 'error', message: string) {
        const logEntry: LogEntry = {
            timestamp: new Date().toISOString(),
            level,
            message,
        };

        this.logs.push(logEntry);

        // Garante que armazena apenas os últimos 100 logs 
        if (this.logs.length > this.MAX_LOGS) {
            this.logs.shift(); // Remove o log mais antigo
        }
    }

    public info(message: string) {
        this.addLog('info', message);
        console.log(`[INFO] ${message}`);
    }

    public warn(message: string) {
        this.addLog('warn', message);
        console.warn(`[WARN] ${message}`);
    }

    public error(message: string) {
        this.addLog('error', message);
        console.error(`[ERROR] ${message}`);
    }

    // 6. Método para o endpoint REST 
    public getLogs(): LogEntry[] {
        return this.logs;
    }
}