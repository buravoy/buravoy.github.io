const modalBackdrop = document.getElementById("backdrop");
const modalWindow = modalBackdrop.querySelector(".modal");
const modalTitle = modalWindow.querySelector(".title");
const orderButton = document.querySelector(".order-button");
const phoneSelector = document.querySelector(".phone-selector");
const phoneNumber = document.querySelector(".phone-number");
const itemCards = document.querySelectorAll(".item-card");

let completeInterval;

function openModal(title) {
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

    button.addEventListener("click", (e) => {
        const digits = document.querySelectorAll(".phone-digit");
        digits.forEach(digit => shuffleElements(digit));
        openModal("ЗАКАЗАТЬ " + title)
    });
})
