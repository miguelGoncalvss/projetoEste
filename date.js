document.addEventListener("DOMContentLoaded", function () {
    const dateInput = document.getElementById("dateInput");
    if (dateInput) {
        dateInput.min = "2026-01-01T00:00";
        dateInput.max = "2026-12-31T23:59";
    }
});

function showDate() {
    const inputDate = document.getElementById("dateInput").value;
    const dateDisplay = document.getElementById("dateDisplay");

    if (!inputDate) {
        dateDisplay.innerText = "Você ainda não escolheu uma data :( ";
        dateDisplay.style.display = "block";
        return;
    }

    const date = new Date(inputDate);

    // Validação para garantir que a data esteja no ano de 2026
    if (date.getFullYear() !== 2026) {
        dateDisplay.innerText = "Por favor, escolha uma data dentro do ano de 2026! 📅";
        dateDisplay.style.display = "block";
        return;
    }

    // Formatar a data em português
    const options = {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    };
    
    const formattedDate = date.toLocaleString('pt-BR', options);

    // Exibir a data formatada
    dateDisplay.innerText = `Perfeito! Nosso date está marcado para: ${formattedDate} 🥰`;
    dateDisplay.style.display = "block";
}