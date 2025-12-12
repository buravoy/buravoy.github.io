const modalBackdrop = document.getElementById("backdrop");
const modalWindow = modalBackdrop.querySelector(".modal");
const modalTitle = modalWindow.querySelector(".title");
const orderButton = document.querySelector(".order-button");
const phoneSelector = document.querySelector(".phone-selector");
const phoneNumber = document.querySelector(".phone-number");
const itemCards = document.querySelectorAll(".item-card");
const chatModal = document.getElementById("chat");
const textArea = document.querySelector("textarea");
const messagesArea = document.getElementById("messages");

let completeInterval;

function openModal(title) {
    const digits = document.querySelectorAll(".phone-digit");
    digits.forEach(digit => shuffleElements(digit));
    orderButton.disabled = !isPhoneCorrect(phoneNumber);
    modalTitle.innerText = title;
    modalBackdrop.classList.add("show");
}

function closeModal() {
    modalBackdrop.classList.remove('show');
    setTimeout(dropModalState, 300);
    clearTimeout(completeInterval)
}

function dropModalState() {
    modalTitle.innerText = ''
    orderButton.innerText = 'ЖДУ ЗВОНКА'
    orderButton.classList.remove("green");
    orderButton.classList.add("blue");
}

function isPhoneCorrect(parent) {
    const children = parent.querySelectorAll('span');
    let isCorrect = true;

    for (const c of children) {
        if (c.innerText === '_') isCorrect = false;
    }
    return isCorrect;
}

function parseInputs(parent, phoneItem) {
    const children = [...parent.children];
    let val = '_';

    for (const c of children) {
        const i = c.querySelector('input');
        if (i.checked) val = i.value;
    }

    phoneItem.innerHTML = val;
}

function clearPhone(parent) {
    const children = parent.querySelectorAll('span');
    const inputs = document.querySelectorAll('input[type=radio]');
    for (const c of children) c.innerText = '_';
    for (const i of inputs) i.checked = false;
}

function shuffleElements(parent) {
    const children = [...parent.children];
    children.sort(() => Math.random() - 0.5);
    children.forEach(child => parent.appendChild(child));
}

function goToSlide(id) {
    window.history.pushState({}, '', 'index.html#' + id)

    document.getElementById(id).scrollIntoView({
        behavior: 'smooth'
    });
}

for (let i = 0; i <= 10; i++) {
    const phoneDigit = document.createElement("div");
    phoneDigit.classList.add("phone-digit");

    for (let j = 0; j <= 9; j++) {
        const digitItem = document.createElement("label");
        const input = document.createElement("input");

        input.type = "radio";
        input.name = 'd' + i;
        input.value = j.toString();
        digitItem.innerText = j.toString();
        digitItem.append(input);
        const phoneItem = phoneNumber.querySelector("#" + input.name);

        input.addEventListener("change", () => {
            phoneItem.innerText = input.value;
            orderButton.disabled = !isPhoneCorrect(phoneNumber);
        });

        digitItem.addEventListener("mouseenter", () => (phoneItem.innerText === '_') ? phoneItem.innerText = input.value : false);
        digitItem.addEventListener("mouseleave", () => parseInputs(phoneDigit, phoneItem));

        phoneDigit.append(digitItem);
        shuffleElements(phoneDigit);
    }

    phoneSelector.append(phoneDigit);
}

function randomString(minWords = 5, maxWords = 10, minWordLength = 5, maxWordLength = 15) {
    const letters = 'abcdefghijklmnopqrstuvwxyz';
    const getRandomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
    const generateWord = (length) => Array.from({ length }, () => letters[Math.floor(Math.random() * letters.length)]).join('');
    const wordCount = getRandomInt(minWords, maxWords);

    return Array.from({ length: wordCount }, () => {
        const wordLength = getRandomInt(minWordLength, maxWordLength);
        return generateWord(wordLength);
    }).join(' ');
}

function openChat() {
    document.getElementById('op-name').innerText = randomString(1,1)
    chatModal.classList.add("show");
}

function closeChat() {
    chatModal.classList.remove('show');
}

function keyDownHandler(e) {
    if (e.key === 'Enter') {
        e.preventDefault();
        sendMessage();
    }
}

function sendMessage() {
    if (textArea.value.trim() === '') return;

    const myMessage = document.createElement('div');
    myMessage.classList.add("forward");
    myMessage.innerText = textArea.value.trim()
    messagesArea.append(myMessage);
    textArea.value = '';
    textArea.focus();
    myMessage.scrollIntoView({behavior: 'smooth'});

    setTimeout(() => {
        const replyMessage = document.createElement('div');
        replyMessage.classList.add("reply");
        replyMessage.innerText = randomString();
        messagesArea.append(replyMessage);
        replyMessage.scrollIntoView({behavior: 'smooth'});
    }, 1000);
}

modalWindow.addEventListener("mousedown", e => e.stopPropagation());

modalBackdrop.addEventListener("mousedown", closeModal);

orderButton.addEventListener("click", () => {
    if (!isPhoneCorrect(phoneNumber)) return;

    orderButton.innerText = 'ЖДИТЕ ЗВОНКА!';
    orderButton.classList.add("green");

    completeInterval = setTimeout(() => {
        closeModal();
        clearPhone(phoneNumber);
    }, 3000)
})

itemCards.forEach(card => {
    const button = card.querySelector("button");
    const title = card.querySelector("h3").innerText
        .replace(/\n|\r|\t|\s/g, ' ')
        .trim();

    button.addEventListener("click", () => openModal("ЗАКАЗАТЬ " + title));
})
