// Получаем данные
const DATA = "./data/big_data_persons.json",
// ..из HTML
  table = document.querySelector("tbody"),
  idSort = document.querySelector(".id_sort"),
  nameSort = document.querySelector(".name_sort"),
  surnameSort = document.querySelector(".surname_sort"),
  ageSort = document.querySelector(".age_sort");

// Подключаем JSONфайл
let myObj,
  xmlhttp = new XMLHttpRequest();

xmlhttp.onreadystatechange = function () {
  if (this.readyState == 4 && this.status == 200) {
    myObj = JSON.parse(this.responseText);
    //..и кладём его в таблицу
    myObj.forEach(function (item) {
      let row = document.createElement("TR");
      row.insertAdjacentHTML(
        "afterbegin",
        `<td class="table__id">${item.ID}</td>
          <td class="table__name">${item.Name}</td>
          <td class="table__age">${item.Age}</td>`
      );
      table.appendChild(row);
    });
  }
};
xmlhttp.open("GET", DATA, true);
xmlhttp.send();

//Сортировка по ID, фамилии и возрасту
document.addEventListener("DOMContentLoaded", () => {
  const getSort = ({ target }) => {
    const order = (target.dataset.order = -(target.dataset.order || -1));
    const index = [...target.parentNode.cells].indexOf(target);
    const collator = new Intl.Collator(["en", "ru"], {
      numeric: true,
    });
    const comparator = (index, order) => (a, b) =>
      order *
      collator.compare(
        a.children[index].innerHTML,
        b.children[index].innerHTML
      );

    for (const tBody of target.closest("table").tBodies)
      tBody.append(...[...tBody.rows].sort(comparator(index, order)));

    for (const cell of target.parentNode.cells)
      cell.classList.toggle("sorted", cell === target);
  };

  document
    .querySelectorAll(".table_sort thead")
    .forEach((tableTH) =>
      tableTH.addEventListener("click", () => getSort(event))
    );
});
