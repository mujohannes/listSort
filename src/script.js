async function loadData(url) {
  let response = await fetch(url);
  let data = await response.json();
  return data;
}

function removeFromList( list, id ) {
  list.forEach((item, index ) => {
    if(item.id == id ) {
      list.splice( index, 1 );
    }
  });
}

function renderMaster(list, element ) {
  element.innerHTML = '';
  list.forEach( (item) => {
    let id = item.id;
    let name = item.name;
    let unit = item.unit;
    let category = item.category;
    let listItem = 
    `<li data-id="${id}">
      ${name}
      <div class="buttons">
        <button type="button" 
        class="button" 
        data-action="perishable"
        data-id="${id}"
        data-name="${name}"
        data-unit="${unit}"
        data-category="${category}"
        >
          Perishable
        </button>
        <button type="button" class="button" 
        data-action="non-perishable"
        data-id="${id}"
        data-name="${name}"
        data-unit="${unit}"
        data-category="${category}"
        >
          Non-Perishable
        </button>
      </div>
    </li>`;
    element.insertAdjacentHTML('beforeend', listItem );
  })
}

function renderPerishables( list, element ) {
  element.innerHTML = '';
  list.forEach( (item) => {
    let id = item.id;
    let name = item.name;
    let unit = item.unit;
    let category = item.category;
    let listItem = 
    `<li data-id="${id}">
      ${name}
      <div class="buttons">
        <button type="button" 
        class="button" 
        data-action="perishable"
        data-id="${id}"
        data-name="${name}"
        data-unit="${unit}"
        data-category="${category}"
        >
          Remove
        </button>
      </div>
    </li>`;
    element.insertAdjacentHTML('beforeend', listItem );
  })
}

let masterList = new Array();
let perishablesList = new Array();
let nonPerishablesList = new Array();

window.addEventListener('load', () => {
  const masterDisplay = document.querySelector('#master');
  const perishableDisplay = document.querySelector('#perishables');
  // load the data
  const dataFile = 'data.json';
  loadData( dataFile )
  .then( (data) => { 
    data.forEach((item) => {
      masterList.push(item)
    })
    renderMaster(masterList, masterDisplay )
  })
  // listen for click in master
  masterDisplay.addEventListener('click', (event) => {
    const action = event.target.getAttribute('data-action');
    const id = event.target.getAttribute('data-id');
    const name = event.target.getAttribute('data-name');
    const unit = event.target.getAttribute('data-unit');
    const category = event.target.getAttribute('data-category');
    if( action == 'perishable' ) {
      const item = {id: id, name: name, unit: unit, category: category }
      perishablesList.push( item );
      removeFromList( masterList, id );
      renderPerishables( perishablesList, perishableDisplay );
      renderMaster( masterList, masterDisplay );
    }
  })


})

