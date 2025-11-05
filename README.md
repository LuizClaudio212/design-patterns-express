# Atividade de Design Patterns com Express.js e TypeScript

Este repositório contém as resoluções dos exercícios da atividade de Design Patterns, utilizando Express.js e TypeScript.

## 🚀 Como Executar o Projeto

1.  Clone este repositório:
    ```bash
    git clone https://github.com/LuizClaudio212/design-patterns-express
    cd design-patterns-express
    ```

2.  Instale as dependências:
    ```bash
    npm install
    ```

3.  Inicie o servidor em modo de desenvolvimento:
    ```bash
    npm run dev
    ```

4.  O servidor estará rodando em `http://localhost:3000`.

---

## 🏛️ Parte 1: Padrões Criacionais

### Exercício 1.1: Singleton

**Descrição do Problema:** Implementar um serviço de logging que seja acessível globalmente, garantindo uma única instância para manter a ordem e a centralização dos logs.
**Padrão Aplicado e Justificativa:** Foi usado o padrão **Singleton**. A classe `LoggerService` foi implementada com um construtor privado, uma instância estática privada e um método `getInstance()` público. Isso garante que, não importa quantas vezes ou de quantos lugares (`server.ts`, `LoggerRoutes.ts`) o serviço seja solicitado, apenas uma instância é criada e compartilhada.
Isso resolve o problema de centralizar todos os logs em um único array.
**Endpoints da API:**
    * `GET /singleton/logs`: Consulta os logs mais recentes.
    * `GET /singleton/log-teste`: Adiciona logs de exemplo para teste.

### Exercício 1.2: Factory Method

**Descrição do Problema:** Criar um sistema flexível de envio de notificações que suporte múltiplos canais (Email, SMS, Push).
**Padrão Aplicado e Justificativa:** Foi usado o padrão **Factory Method**. Foi criada uma interface `NotificationService`  (o "contrato") e implementações concretas (`EmailService`, `SmsService`, `PushService`). A `NotificationFactory` atua como a "fábrica", recebendo um tipo (ex: "email") e decidindo qual classe concreta instanciar. Isso desacopla o *controller* (API) dos serviços: o controller não sabe como um email é enviado, ele apenas pede à fábrica um objeto que *sabe* enviar, tornando o sistema fácil de estender no futuro (ex: adicionar "Whatsapp") sem modificar o controller.
**Endpoints da API:**
    * `POST /factory-method/send`: Envia uma notificação.
         **Body (JSON):** `{ "type": "email", "recipient": "...", "subject": "...", "content": "..." }`
        **Body (JSON):** `{ "type": "sms", "recipient": "...", "subject": "...", "content": "..." }`
