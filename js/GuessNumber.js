export default class  GuessNumber {
    constructor(chat) {
      // Переменные для работы с элементами, которые соответсвуют различным компонентам  чата
      this.chat = document.querySelector('.chat');
      this.messages = document.querySelector('.messages');
      this.input = document.querySelector('.input input[type="text"]');
      this.button = document.querySelector('.input button');
      // Создаем переменную загаданного числа  для игры
      this.secretNumber;
      // Это начало игры при загрузке страницы
      this.newGame();
      // Отправка сообщения по клику на кнопку. Когда мы нажимаем на "button", вызывается функция  handleUserMessage
      this.button.addEventListener('click', () => this.handleUserMessage());
    }


    // Функция для начала игры
    newGame() {
      this.secretNumber = Math.floor(Math.random() * 10) + 1; // Загадываем новое число(Math.random - генерирует рандомное число, Math.floor - для того, чтобы у нашего числа не было знаков после запятой)
      this.messages.innerHTML = '';  // Очищаем список сообщений
      this.createMessage("Привет! Сыграем в игру 'Угадай число'? Я загадаю число от 1 до 10, а ты попробуешь его отгадать!", 'bot');  // Создаем приветственное сообщение для игрока
      this.button.disabled = false;  // Активируем кнопку отправки сообщения
      this.input.disabled = false;  // Активируем кнопку поля ввода
    }


// createMessage- функция для создания нового сообщения.Она принимает текст сообщения, создает новый элемент сообщения,
//соответсвующий заданному тексту и добавляет его в окно с сообщениями
    createMessage(content, sender) {
      const message= document.createElement('div');//Создает элемент div, в нем будет текст сообщения
      message.classList.add('message', sender);//Добавляем классы message и sender к элементу message (который создает див). Класс message обрабатывает стили сообщения, а sender указывает на отправителя
      message.textContent = content;//Закидываем в сообщение наш контент
      this.messages.appendChild(message);//Добавляем все наши элементы в чат(добавляем сообщение в чат)
      this.messages.scrollTop = this.messages.scrollHeight;//Прокрутка окна чата вниз, до последнего сообщения
    }

    //  handleUserMessage - функция для обработки сообщения пользователя
//Извлекаем введенное значение из input, проверяем, что это число из заданного диапазона
//Затем выводим сообщение игроку о результате(больше число, меньше , или это победа)
    handleUserMessage() {
      const userInput = this.input.value;// Получаем текст, введенный в поле ввода
      if (!isNaN(userInput) && userInput != '' && userInput >= 1 && userInput <= 10) {// А это проверка на то, что игрок ввел число в установленном диапазоне
        const guess = parseInt(userInput);// Преобразуем строку в число
        this.input.value = '';//очищаем поле ввода
        this.createMessage(`Ты загадал ${guess}?`, 'user');//Создаем сообщение от имени игрока с числом
        if (guess === this.secretNumber) {//Проверяем введенное число с загаданным.В зависимости от выполнения условия, выводим сообщение игроку
          this.createMessage('Ура, ты молодец! Ты угадал число.', 'bot');
        } else if (guess < this.secretNumber) {
          this.createMessage(`Хм...Мое число больше, чем ${guess}.`, 'bot');
        } else {
          this.createMessage(`Хм...Мое число меньше, чем ${guess}.`, 'bot');
        }
      } else {//а если игрок ввел какую - то ерунду, то мы создаем сообщение, где говорим что ему нужно ввести число от 1 до  10
        this.input.value = '';
        this.createMessage('Введи ЧИСЛО от 1 до 10.', 'bot');
      }
    }
  }



