const lists = document.querySelector('.lists');
const upcomming__list = document.querySelector('.upcomming__list');
const finished__list = document.querySelector('.finished__list');
const input = document.querySelector('.item__input');
const add__button = document.querySelector('.plus__button');

function onadd() {
    //1.사용자가 입력한 텍스트를 받아온다
    const text = input.value;
    console.log(text);
    if (text === '') {
        input.focus();
        return;
    }
    //2. 새로운 아이템을 만든다
    const item = createitem(text);
    //3. list에 추가 한다.
    upcomming__list.appendChild(item);
    //4. 새로 추가된 곳으로 스크롤링
    item.scrollIntoView({ block: "center" });
    //5. input에 있는 값을 초기화 한다
    input.value = '';
    input.focus();
}
let id = 0;//UUID
function createitem(text) {
    // const list__item = document.createElement('li');
    // list__item.setAttribute('class', 'list__item__row');

    // const item = document.createElement('div');
    // item.setAttribute('class', 'item');

    // const item__content = document.createElement('span');
    // item__content.setAttribute('class', 'item__content');
    // item__content.innerText = text;

    // const icons = document.createElement('div');
    // icons.setAttribute('class', 'icons');

    // const item__done = document.createElement('button');
    // item__done.setAttribute('class', 'item__done');
    // item__done.innerHTML = '<i class="far fa-square"></i>';
    // item__done.addEventListener('click', () => {
    //     const ul__name = item__delete.closest("ul").className
    //     if (ul__name === 'finished__list') {
    //         item__done.innerHTML = '<i class="far fa-square"></i>';
    //         item__content.removeAttribute('class', 'done');
    //         upcomming__list.appendChild(list__item);
    //     } else if (ul__name === 'upcomming__list') {
    //         item__done.innerHTML = '<i class="far fa-check-square"></i>';
    //         item__content.setAttribute('class', 'done');
    //         finished__list.appendChild(list__item);

    //     }


    // });


    // const item__delete = document.createElement('button');
    // item__delete.setAttribute('class', 'item__delete');
    // item__delete.innerHTML = '<i class="fas fa-trash-alt"></i>';
    // item__delete.addEventListener('click', e => {

    //     const ul__name = item__delete.closest("ul").className
    //     console.log(ul__name);
    //     if (ul__name === 'upcomming__list') {
    //         upcomming__list.removeChild(list__item);
    //     } else if (ul__name === 'finished__list') {
    //         finished__list.removeChild(list__item);
    //     }

    // });

    // list__item.appendChild(item);
    // item.appendChild(item__content);
    // item.appendChild(icons);
    // icons.appendChild(item__done);
    // icons.appendChild(item__delete);

    const list__item = document.createElement('li');
    list__item.setAttribute('class', 'list__item__row');
    list__item.setAttribute('data-id', id);
    list__item.innerHTML = `
    <div class="item">
        <span class="item__content">${text}</span>
        <div class="icons">
            <button class="item__done" >
                <i class="far fa-square" data-id=${id}></i>
            </button>
            <button class="item__delete" data-id=${id}>
                <i class="fas fa-trash-alt" data-id=${id}></i>
            </button>
        </div>
    </div>`;
    id++;

    return list__item;
}

function deleteitem() {

}
lists.addEventListener('click', (event) => {
    const id = event.target.dataset.id;

    if (id) {
        const selected__item = document.querySelector(`.list__item__row[data-id="${id}"]`);
        const finished__list = document.querySelector('.finished__list');
        const item__content = document.querySelector('.item__content');
        const item__done = document.querySelector('.item__done');
        if (event.target.parentNode.className === 'item__delete' || event.target.className === 'item__delete') {
            selected__item.remove();
        }
        else if (event.target.parentNode.className === 'item__done' || event.target.className === 'item__done') {

            if (selected__item.closest('ul').className === 'upcomming__list') {

                finished__list.appendChild(selected__item);
                item__done.innerHTML = `<i class="far fa-check-square" data-id=${id}></i>`
                item__done.style.display = 'none';
                item__content.classList.add('done');
            } else if (selected__item.closest('ul').className === 'finished__list') {

                upcomming__list.appendChild(selected__item);
                item__done.innerHTML = `<i class="far fa-square" data-id=${id}></i>`

            }

        }
    }


});


add__button.addEventListener('click', () => {
    onadd();
});
input.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
        onadd();
    }
});