const DATA = "./data/big_data_persons.json",
      table = document.querySelector('table'),
      idSort = document.querySelector('.id_sort'),
      nameSort = document.querySelector('.name_sort'),
      ageSort = document.querySelector('.age_sort');
let myObj,
    xmlhttp = new XMLHttpRequest();
    

console.log(idSort, nameSort, ageSort);

 
xmlhttp.onreadystatechange = function()
{
    if (this.readyState == 4 && this.status == 200)
    {
        myObj = JSON.parse(this.responseText);
        
        myObj.forEach(function(item){
          let row = document.createElement('TR');
          row.insertAdjacentHTML('afterbegin', `<td class="table__id">${item.ID}</td>
          <td class="table__name">${item.Name}</td>
          <td class="table__age">${item.Age}</td>`);
          table.appendChild(row);
        });
      }
    };
    xmlhttp.open("GET", DATA, true);
    xmlhttp.send();
    


 
