"use strict";
let review = {};

window.onload = function () {
    review = new Review();
}

/**
 * Класс обработки отзывов
 */
function Review() {
    this.rating = new Rating();
    this.button = document.getElementById("addOpinion");
    this.comment = document.getElementById("comment");


    this.init();

}

Review.prototype.init = function () {

    this.button.addEventListener("click", (e) => this.send(e));
}

Review.prototype.send = function (e) {
    e.preventDefault();

    if (this.validate()) {
        alert("Отзыв годен к отправке");
    }

    return false;
}

Review.prototype.validate = function () {
    let valide = true;

    if (this.rating.get() === 0) {
        valide = false;
    }

    this.rating.valide(valide);

    if (this.comment.value.length === 0) {
        this.comment.classList = "need";
    } else {
        this.comment.classList = "";
    }

    return valide;
}


/**
 * Класс Rating отвечает за отрисовку звездочек,
 * никакой смысловой нагрузки он не несет
 * @param {string} [id = "new_review"] id родительского элемента
 */
function Rating(id = "new_review") {
    this.id = id;
    this.rating = document.getElementById(id);
    this.init();

}

Rating.prototype.init = function () {

    // перебираем все label и начинаем отслеживать событие
    this.label = this.rating.querySelectorAll("label");



    for (let i = 0; i < this.label.length; i++) {
        this.label[i].addEventListener("mouseover", () => this.mouseMove(i));
        this.label[i].addEventListener("click", () => this.mouseClick(i));
    }



    // Навешиваем событие движение мыши над рейтингом
    this.rating.addEventListener("mouseout", () => this.mouseOut());
}

/**
 * Мышь навели на оценку
 * @param {integer} mark где сейчас находится указатель мыши
 */
Rating.prototype.mouseMove = function (mark) {
    this.valide();
    this.render(mark);
}

/**
 * Кликнули по оценки
 * @param {integer} mark по какой оценке кликнули
 */
Rating.prototype.mouseClick = function (mark) {
    this.rating.setAttribute("value", mark + 1);

    console.log(this.rating.getAttribute("value"));

}


/**
 * Мышка вышла из поля рейтинга
 */
Rating.prototype.mouseOut = function () {

    let mark = this.rating.getAttribute("value")

    if (mark === 0) {
        this.zero();
    } else {
        this.render(this.rating.getAttribute("value") - 1);
    }



}

Rating.prototype.render = function (mark) {
    for (let i = 0; i < this.label.length; i++) {


        let classlist = (i > mark) ? "" : "red";

        this.label[i].classList = classlist;



    }
}

Rating.prototype.zero = function () {
    for (let i = 0; i < this.label.length; i++) {
        this.label[i].classList = "";
    }
}

Rating.prototype.get = function () {

    let val = +this.rating.getAttribute("value");
    return val;
}

/**
 * Метод сигнализирует о том, что поле рейтинг
 * не валидно
 * @param {boolean} [valide = true] Валиден рейтинг или нет
 */
Rating.prototype.valide = function (valide = true) {
    if (valide) {
        this.rating.className = "ratings_control";
    } else {
        this.rating.className = "ratings_control need";
    }
}
