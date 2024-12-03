document.getElementById('bookingForm').addEventListener('submit', async function(event) {
    event.preventDefault(); // Отменяем стандартное поведение формы

    const formData = new FormData(this); // Получаем данные из формы

    try {
        // Отправляем POST-запрос на сервер
        const response = await fetch('http://localhost:3000/submit', {
            method: 'POST',
            body: formData,
            headers: {
                // Устанавливаем заголовок, если ваш сервер ожидает его
                // 'Accept': 'application/json', // Если сервер возвращает JSON
            },
        });

        // Проверяем статус ответа
        if (response.ok) {
            const result = await response.text(); // Или response.json() если сервер возвращает JSON
            alert('Форма отправлена: ' + result);
        } else {
            alert('Ошибка при бронировании: ' + response.statusText);
        }
    } catch (error) {
        console.error('Ошибка:', error);
        alert('Произошла ошибка при отправке данных.');
    }
});