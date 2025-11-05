# Atividade de Design Patterns com Express.js e TypeScript

Este repositório contém as resoluções dos exercícios da atividade de Design Patterns, utilizando Express.js e TypeScript.

## Como Executar o Projeto

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

## Parte 1: Padrões Criacionais

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

##  Parte 2: Padrões Estruturais

### Exercício 2.1: Adapter

**Descrição do Problema:** Integrar um novo sistema de pagamento com uma API incompatível (`executePayment(request)`) a um sistema legado que espera uma interface antiga (`processPayment(id, amount)`).
**Padrão Aplicado e Justificativa:** Foi usado o padrão **Adapter**. A classe `PaymentAdapter` implementa a interface legada `LegacyPaymentProcessor`, mas internamente "embrulha" uma instância do `NewPaymentSystem`. O método `processPayment` do adaptador traduz os parâmetros antigos (orderId, amount) para o novo formato (`PaymentRequest`), chama o novo sistema e traduz a resposta de volta, permitindo que o `PaymentService` (código antigo) funcione sem modificações.
* **Endpoints da API:**
    * `POST /adapter/process-payment`: Simula uma chamada do sistema legado.
        * **Body (JSON):** `{ "orderId": "...", "amount": 0.00 }`

### Exercício 2.2: Decorator

**Descrição do Problema:** Criar um serviço de exportação de dados (JSON, XML) que possa ter funcionalidades (compressão, criptografia) adicionadas dinamicamente.
**Padrão Aplicado e Justificativa:** Foi usado o padrão **Decorator**. Foi criada uma interface `DataExporter` e classes concretas (`JsonExporter`). A classe `BaseDecorator` permite "empilhar" responsabilidades. Os decoradores concretos (`CompressionDecorator`, `EncryptionDecorator`) herdam dela e adicionam sua lógica *antes* ou *depois* de chamar o método do objeto que estão "embrulhando".A API permite que o cliente escolha quais decoradores aplicar em tempo de execução.
* **Endpoints da API:**
    * `POST /decorator/export`: Exporta dados aplicando os decoradores selecionados.
        * **Body (JSON):** `{ "format": "json", "decorators": ["compress", "encrypt"] }`

### Exercício 2.3: Facade

**Descrição do Problema:** Simplificar a interação com um conjunto complexo de microsserviços (Cliente, Produto, Pedido, Pagamento) para uma operação de "Fazer Pedido".
**Padrão Aplicado e Justificativa:** Foi usado o padrão **Facade**. A classe `EcommerceFacade` atua como uma "fachada" ou ponto de entrada único. [cite_start]Ela esconde a complexidade de orquestrar os múltiplos subsistemas (`CustomerService`, `ProductService`, etc.). O controller da API só precisa chamar *um* método (`facade.placeOrder()`) que encapsula todo o fluxo complexo, desde verificar o cliente até processar o pagamento.
* **Endpoints da API:**
    * `POST /facade/place-order`: Executa o fluxo completo de um pedido.
        * **Body (JSON):** `{ "customerId": "...", "productIds": ["...", "..."] }`
