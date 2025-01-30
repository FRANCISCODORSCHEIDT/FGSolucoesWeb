document.getElementById('contact-form').addEventListener('submit', async function(event) {
    event.preventDefault();

    const form = event.target;
    const formData = new FormData(form);
    const name = formData.get('name').trim();
    const email = formData.get('email').trim();
    const message = formData.get('message').trim();
    let feedbackMessage = document.getElementById('feedback-message');

    if (!feedbackMessage) {
        feedbackMessage = document.createElement('p');
        feedbackMessage.id = 'feedback-message';
        feedbackMessage.style.marginTop = "10px";
        form.appendChild(feedbackMessage);
    }

    if (name && email && message) {
        try {
            const response = await fetch(form.action, {
                method: form.method,
                body: formData,
                headers: { 'Accept': 'application/json' }
            });

            if (response.ok) {
                feedbackMessage.textContent = `Obrigado, ${name}! Sua mensagem foi enviada com sucesso.`;
                feedbackMessage.style.color = "green";
                setTimeout(() => {
                    feedbackMessage.remove();
                    form.reset();
                }, 3000);
            } else {
                throw new Error("Falha no envio. Tente novamente mais tarde.");
            }
        } catch (error) {
            feedbackMessage.textContent = error.message;
            feedbackMessage.style.color = "red";
        }
    } else {
        feedbackMessage.textContent = "Por favor, preencha todos os campos corretamente.";
        feedbackMessage.style.color = "red";
    }
});
