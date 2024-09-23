// Função para alternar a visibilidade do chatbox
function toggleChat() {
    const chatbox = document.getElementById('chatbox'); // Seleciona o chatbox pelo ID
    
    // Verifica se o chatbox está escondido ou não
    if (chatbox.style.display === "none" || chatbox.style.display === "") {
        chatbox.style.display = "flex"; // Mostra o chatbox
        startConversation(); // Inicia a conversa com a atendente virtual
    } else {
        chatbox.style.display = "none"; // Esconde o chatbox
    }
}

// Função que inicia a conversa do chatbot
function startConversation() {
    // Mostra as primeiras opções de resposta
    addOptions([
        { text: "Quero saber mais sobre o produto", action: () => handleOptionClick("Quero saber mais sobre o produto", showProductInfo) }, // Opção de saber mais sobre o produto
        { text: "Gostaria de falar com um atendente", action: () => handleOptionClick("Gostaria de falar com um atendente", contactSupport) }, // Opção de falar com um atendente
        { text: "Quais são os horários de atendimento?", action: () => handleOptionClick("Quais são os horários de atendimento?", showBusinessHours) } // Opção de saber os horários de atendimento
    ]);
}

// Função para adicionar as opções de resposta
function addOptions(options) {
    const footer = document.getElementById('chatboxFooter'); // Seleciona o rodapé do chatbox
    footer.innerHTML = ''; // Limpa qualquer conteúdo anterior

    options.forEach(option => {
        const button = document.createElement('button'); // Cria um botão para cada opção
        button.classList.add('chatbox__option'); // Adiciona a classe de estilo
        button.textContent = option.text; // Define o texto do botão
        button.onclick = option.action; // Define a ação que será executada ao clicar no botão
        footer.appendChild(button); // Adiciona o botão ao rodapé
    });
}

// Função que lida com o clique de uma opção, exibe a opção no chat e chama a ação correspondente
function handleOptionClick(userMessage, action) {
    addMessage(userMessage, 'user'); // Adiciona a mensagem do usuário no chatbox
    action(); // Chama a ação correspondente à escolha do usuário
}

// Função para exibir informações sobre o produto
function showProductInfo() {
    addMessage("Aqui estão mais informações sobre o produto...", 'bot'); // Exibe uma mensagem do bot
    addOptions([ // Oferece novas opções
        { text: "Como posso comprar?", action: () => handleOptionClick("Como posso comprar?", showPurchaseOptions) }, // Opção de compra
        { text: "Voltar", action: () => handleOptionClick("Voltar", startConversation) } // Opção de voltar
    ]);
}

// Função para exibir opções de contato
function contactSupport() {
    addMessage("Entrarei em contato com um atendente. Aguarde...", 'bot'); // Exibe uma mensagem do bot informando que vai contatar um atendente
}

// Função para exibir os horários de atendimento
function showBusinessHours() {
    addMessage("Nosso horário de atendimento é das 9h às 18h.", 'bot'); // Exibe uma mensagem com os horários de atendimento
    addOptions([{ text: "Voltar", action: () => handleOptionClick("Voltar", startConversation) }]); // Oferece opção de voltar
}

// Função para exibir opções de compra
function showPurchaseOptions() {
    addMessage("Você pode comprar através do nosso site ou em uma de nossas lojas físicas.", 'bot'); // Exibe uma mensagem com as opções de compra
    addOptions([{ text: "Voltar", action: () => handleOptionClick("Voltar", startConversation) }]); // Oferece opção de voltar
}

// Função para adicionar uma mensagem ao corpo do chat
function addMessage(text, sender) {
    const chatboxBody = document.getElementById('chatboxBody'); // Seleciona o corpo do chat
    const messageDiv = document.createElement('div'); // Cria um novo elemento div para a mensagem
    messageDiv.classList.add('chatbox__message'); // Adiciona a classe de mensagem

    // Define se a mensagem é do bot ou do usuário
    if (sender === 'bot') {
        messageDiv.classList.add('chatbox__message--bot'); // Classe de mensagem do bot
    } else {
        messageDiv.classList.add('chatbox__message--user'); // Classe de mensagem do usuário
    }

    messageDiv.textContent = text; // Define o texto da mensagem
    chatboxBody.appendChild(messageDiv); // Adiciona a mensagem ao corpo do chat
    chatboxBody.scrollTop = chatboxBody.scrollHeight; // Mantém o scroll no final
}
