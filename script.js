function shuffleElements(parent) {
    const children = [...parent.children];
    children.sort(() => Math.random() - 0.5);
    children.forEach(child => parent.appendChild(child));
}

const modalBackdrop = document.getElementById("backdrop");
const modalWindow = modalBackdrop.querySelector(".modal");
const modalTitle = modalWindow.querySelector(".title");

modalWindow.addEventListener("mousedown", (e) => e.stopPropagation());

modalBackdrop.addEventListener("mousedown", () => {
    modalBackdrop.classList.remove("show");
    modalTitle.innerText = '';
})

const phoneSelector = document.querySelector(".phone-selector");
const phoneNumber = document.querySelector(".phone-number");

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

        digitItem.addEventListener("change", () => {
            console.log(input.value);
            phoneNumber.querySelector("#"+input.name).innerText = input.value;
        })

        phoneDigit.append(digitItem);
        shuffleElements(phoneDigit);
    }

    phoneSelector.append(phoneDigit);
}


const itemCards = document.querySelectorAll(".item-card");
itemCards.forEach(card => {
    const button = card.querySelector("button");
    const title = card.querySelector("h3").innerText
        .replace(/\n|\r|\t|\s/g, ' ')
        .trim();

    button.addEventListener("click", (e) => {
        modalTitle.innerText = "ЗАКАЗАТЬ " + title;
        modalBackdrop.classList.add("show");
    });
})
