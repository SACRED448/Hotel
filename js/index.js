document.getElementById('bookingForm').addEventListener('submit', async function(event) {
    event.preventDefault(); // Отменяем стандартное поведение формы

    const formData = new FormData(this); // Получаем данные из формы

    try {
        const response = await fetch('/book', { // Укажите путь к вашему серверному маршруту
            method: 'POST',
            body: formData,
        });

        if (response.ok) {
            const result = await response.text(); // Или response.json() если сервер возвращает JSON
            alert('Бронирование успешно: ' + result);
        } else {
            alert('Ошибка при бронировании: ' + response.statusText);
        }
    } catch (error) {
        console.error('Ошибка:', error);
        alert('Произошла ошибка при отправке данных.');
    }
});