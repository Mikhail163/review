"use strict";
let rating = {};

window.onload = function () {
    rating = new Rating();
}

function Rating(id = "new_review") {
    this.id = id;
    this.rating = document.getElementById(id);
    this.init();

    this.mouseIn = false;
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
 * Мышка зашла на поле рейтинга
 */
Rating.prototype.mouseOver = function () {
    this.mouseIn = true;
}

/**
 * Мышка вышла из поля рейтинга
 */
Rating.prototype.mouseOut = function () {
    this.mouseIn = false;

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
