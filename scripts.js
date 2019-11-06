const ENTER_KEYCODE = 13;

document.addEventListener('DOMContentLoaded', () => {
  const items = document.querySelector('.items');
  const form = document.querySelector('.form');

  text.init(items, form);
});

const text = (() => {
  let items; // div sem inniheldur texta
  let input; // div fyrir input í formi

  function init(_items, _form) {
    items = _items;

    input = _form.querySelector('.form__input, form');
    _form.addEventListener('submit', formHandler);

    const checkbox = document.querySelectorAll('.item__checkbox');
    for (let i = 0; i < checkbox.length; i++) {
      checkbox[i].addEventListener('click', finish);
    }
    const text = document.querySelectorAll('.item__text');
    for (let i = 0; i < text.length; i++) {
      text[i].addEventListener('click', edit);
    }
    const button = document.querySelectorAll('.item__button');
    for (let i = 0; i < button.length; i++) {
      button[i].addEventListener('click', deleteItem);
    }
  }

  // event handler fyrir form
  function formHandler(e) {
    e.preventDefault();

    const value = input.value;
    let valid = true;
    if (!validText(value)) {
      valid = false;
    }

    if (valid) {
      add(value);
    }

    input.value = '';

    console.log('formHandler virkur');
  }

  // event handler fyrir það að klára færslu
  function finish(e) {
    e.target.parentElement.classList.toggle('item--done');

    console.log('finishHandler virkur');
  }

  // event handler fyrir það að breyta færslu
  function edit(e) {
    const editText = document.createElement('input');
    editText.classList.add('item__edit');
    editText.value = e.target.innerHTML;
    e.target.parentElement.replaceChild(editText, e.target);
    editText.focus();

    editText.addEventListener('keypress', commit);

    console.log('editHandler virkur');
  }

  // event handler fyrir það að klára að breyta færslu
  function commit(e) {
    if (e.which === 13) {
      const text = document.createElement('span');
      text.classList.add('item__text');
      text.innerHTML = e.target.value;
      e.target.parentElement.replaceChild(text, e.target);
      text.addEventListener('click', edit);

      console.log('commitHandler virkur');
    }
  }

  // fall sem sér um að bæta við nýju item
  function add(value) {
    const itemElement = el('li', null, 'item', null);

    const inputElement = el('input', 'checkbox', 'item__checkbox', finish);

    const spanElement = el('span', null, 'item__text', edit);
    spanElement.appendChild(document.createTextNode(value));

    const buttonElement = el('button', null, 'item__button', deleteItem);
    buttonElement.appendChild(document.createTextNode('Eyða'));

    itemElement.appendChild(inputElement);
    itemElement.appendChild(spanElement);
    itemElement.appendChild(buttonElement);
    items.appendChild(itemElement);
  }

  // event handler til að eyða færslu
  function deleteItem(e) {
    e.target.parentElement.parentElement.removeChild(e.target.parentElement);

    console.log('deleteHandler virkur');
  }

  // hjálparfall til að útbúa element
  function el(tag, type, className, clickHandler) {
    const element = document.createElement(tag);
    element.type = type;
    element.classList.add(className);
    element.addEventListener('click', clickHandler);
    return element;
  }

  // hjálparfall til að athuga hvort texti sé löglegur
  function validText(value) {
    return (/\S/.test(value));
  }

  return {
    init: init
  }
})();
