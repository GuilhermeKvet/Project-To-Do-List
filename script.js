function criarTarefa() {
  let button = document.getElementById('criar-tarefa');

  button.addEventListener('click', function () {
    let input = document.getElementById('texto-tarefa');
    let ol = document.getElementById('lista-tarefas');
    let value = input.value;

    if (value.length >= 0) {
      let li = document.createElement('li');
      li.innerText = value;
      li.className = 'itens';
      ol.appendChild(li);
      input.value = '';
    }
  });
}
criarTarefa();

function colorSelectedItens() {
  let lista = document.getElementById('lista-tarefas');

  lista.addEventListener('click', coloring);

  function coloring(event) {
    let itens = document.querySelectorAll('.itens');
    for (index = 0; index < itens.length; index += 1) {
      if (itens[index].classList.contains('selected')) {
        itens[index].classList.remove('selected');
      }
    }
    event.target.classList.add('selected');
  }
}
colorSelectedItens();

function scratchItens() {
  let lista = document.querySelector('#lista-tarefas');

  lista.addEventListener('dblclick', scratch);

  function scratch(event) {
    event.target.classList.toggle('completed');
  }
}
scratchItens();

function deleted() {
  let buttonDeleted = document.getElementById('apaga-tudo');

  buttonDeleted.addEventListener('click', function () {
    let lista = document.querySelectorAll('.itens');
    for (index = 0; index < lista.length; index += 1) {
      lista[index].parentNode.removeChild(lista[index]);
    }
    localStorage.clear();
  });
}
deleted();

function deletedFinish() {
  let buttonDeleted = document.getElementById('remover-finalizados');

  buttonDeleted.addEventListener('click', function () {
    let lista = document.querySelectorAll('.completed');
    for (index = 0; index < lista.length; index += 1) {
      lista[index].parentNode.removeChild(lista[index]);
      localStorage.getItem('list');
    }
  });
}
deletedFinish();

function savedListItens() {
  let buttonSaved = document.getElementById('salvar-tarefas');

  buttonSaved.addEventListener('click', function () {
    let itens = document.querySelectorAll('.itens');
    let array = [];
    if (itens.length > 0) {
      for (index = 0; index < itens.length; index += 1) {
        array[index] = {
          texto: itens[index].innerText,
          class: itens[index].className,
        };
      }
      let saveArray = JSON.stringify(array);
      localStorage.setItem('list', saveArray);
    } else {
      localStorage.clear();
    }
  });
}

function getItemList() {
  let lista = document.getElementById('lista-tarefas');
  let savedList = JSON.parse(localStorage.getItem('list'));

  for (index = 0; index < savedList.length; index += 1) {
    let iten = document.createElement('li');
    lista.appendChild(iten);
    iten.innerText = savedList[index].texto;
    iten.className = savedList[index].class;
  }
}

function checkStorage() {
  if (localStorage.length > 0) {
    getItemList();
  }
}
checkStorage();

function moveUp() {

  let button = document.getElementById('mover-cima');
  let lista = document.getElementById('lista-tarefas');

  button.addEventListener('click', function () {
    for (let iten of lista.children) {
      if (iten.classList.contains('selected')) {
        if (!(iten.previousSibling == null)) {
          
          let passText = iten.previousSibling.innerText;
          let passClass = iten.previousSibling.className;
          let textoiten = iten.innerText;
          let classesiten = iten.className;
          
          iten.previousSibling.innerText = textoiten;
          iten.previousSibling.className = classesiten;
          iten.innerText = passText;
          iten.className = passClass;
        }
      }
    }
  })
}
moveUp();

function moveDown() {

  let button = document.getElementById('mover-baixo');
  let lista = document.getElementById('lista-tarefas');

  button.addEventListener('click', function () {
    for (let iten of lista.children) {
      if (iten.classList.contains('selected')) {
        if (!(iten.nextSibling == null)) {
          
          let textPass = iten.nextSibling.innerText;
          let classPass = iten.nextSibling.className;
          let textoiten = iten.innerText;
          let classesiten = iten.className;
          
          iten.nextSibling.innerText = textoiten;
          iten.nextSibling.className = classesiten;
          iten.innerText = textPass;
          iten.className = classPass;
          break;
        }

      }
    }
  })
}
moveDown();

function deletedSelected() {

  let button = document.getElementById('remover-selecionado');

  button.addEventListener('click', function () {
    let lista = document.getElementById('lista-tarefas');
    let itenSelected = document.querySelector('.selected');
    if (itenSelected) {
      lista.removeChild(itenSelected);
    }
    else {
      alert('Erro, selecione uma tarefa para removê-la');
    }
  })
}
deletedSelected();

window.onload = function () {
  savedListItens();
};
