////////////////////////////////////////////////////////////////////////
////////////////// FAÇA O SEU CÓDIGO AQUI \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
////////////////////////////////////////////////////////////////////////


class Aluno {
  Nome
  Idade
  Nota
  constructor(nome, idade, nota){
    this.Nome = nome;
    this.Idade = idade;
    this.Nota = nota;
  }
}

// Array
let arrayAlunos = []

//funções projeto

function CadastrarAluno(nome, idade, nota, array) {
  let objetoAluno = new Aluno(nome, idade, nota)
  if (!array.some(x => x.Nome == nome))
    array.push(objetoAluno)
  return objetoAluno
}

function OrdenarPorNota(array) {
 array.sort((a, b) => a.Nota - b.Nota)
 return array
}

function OrdenarPorIdade(array) {
  array.sort((a, b) => b.Idade - a.Idade)
  return array
}

function OrdenarPorNome(array) {
  array.sort((a, b) => {
    const nomeA = a.Nome.toUpperCase();
    const nomeB = b.Nome.toUpperCase();

    if (nomeA < nomeB) {
      return -1;
    }
    if (nomeA > nomeB) {
      return 1;
    }
    return 0; 
  });
  return array
}

function CalcularMedia(array){
  if (array.length === 0) {
    return 0; 
  }
  let somaNotas = 0;

  array.forEach((aluno) =>{
    somaNotas += Number(aluno.Nota)
  })

  const media = somaNotas / array.length;
  return media;
}

////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////

function ExcluirAluno(array, nome) {
  let index
  let removido = false
  array.forEach(aluno => {
    if (aluno.Nome == nome) {
      index = array.indexOf(aluno)
      removido = true
    }
  })
  array.splice(index, 1)
  return removido
}

function PesquisarAluno(array, nome) {
  let pesquisa = false
  array.forEach(aluno => {
    if (aluno.Nome.includes(nome)) {
      pesquisa = true
    }
  })

  return pesquisa
}

// Seleção de elementos
const alunoForm = document.querySelector("#aluno-form");
const alunoInput = document.querySelector("#aluno-input");
const alunoInput2 = document.querySelector("#aluno-input-2");
const alunoInput3 = document.querySelector("#aluno-input-3");
const alunoList = document.querySelector("#aluno-list");
const editForm = document.querySelector("#edit-form");
const editInput = document.querySelector("#edit-input");
const cancelEditBtn = document.querySelector("#cancel-edit-btn");
const searchInput = document.querySelector("#search-input");
const eraseBtn = document.querySelector("#erase-button");
const filterBtn = document.querySelector("#filter-select");

let oldInputValue;

// Funções
const saveAluno = (nome, idade, nota, done = 0, save = 1) => {
  let objetoAluno = CadastrarAluno(nome, idade, nota, arrayAlunos)

  const aluno = document.createElement("div");
  aluno.classList.add("aluno");

  const alunoNome = document.createElement("h3");
  alunoNome.innerText = objetoAluno.Nome;
  aluno.appendChild(alunoNome);

  const alunoIdade = document.createElement("h3");
  alunoIdade.innerText = objetoAluno.Idade;
  aluno.appendChild(alunoIdade);

  const alunoNota = document.createElement("h3");
  alunoNota.innerText = objetoAluno.Nota;
  aluno.appendChild(alunoNota);

  const deleteBtn = document.createElement("button");
  deleteBtn.classList.add("remove-aluno");
  deleteBtn.innerHTML = '<i class="fa-solid fa-xmark"></i>';
  aluno.appendChild(deleteBtn);

  // Utilizando dados da localStorage

  alunoList.appendChild(aluno);
  

  const media = document.querySelector("#media");
  media.textContent = CalcularMedia(arrayAlunos).toFixed(2)

  alunoInput.value = "";
  alunoInput2.value = "";
  alunoInput3.value = "";

};

const toggleForms = () => {
  editForm.classList.toggle("hide");
  alunoForm.classList.toggle("hide");
  alunoList.classList.toggle("hide");
};

const getBuscarAluno = (busca) => {
  const alunos = document.querySelectorAll(".aluno");

  let pesquisa = PesquisarAluno(arrayAlunos, busca)

  if (pesquisa) {
    alunos.forEach((aluno) => {
      const alunoNome = aluno.querySelector("h3").innerText.toLowerCase();

      aluno.style.display = "flex";

      if (!alunoNome.includes(busca)) {
        aluno.style.display = "none";
      }
    });
  };
}



const filterAlunos = (filterValue) => {
  const alunos = document.querySelectorAll(".aluno");

  switch (filterValue) {
    case "nota":
      alunos.forEach((aluno) => {
        aluno.remove()
      })
      arrayAlunos = OrdenarPorNota(arrayAlunos)
      arrayAlunos.forEach((aluno) => saveAluno(aluno.Nome, aluno.Idade, aluno.Nota, done = 0, save = 1))
      break;

    case "idade":
      alunos.forEach((aluno) => {
        aluno.remove()
      })
      arrayAlunos = OrdenarPorIdade(arrayAlunos)
      arrayAlunos.forEach((aluno) => saveAluno(aluno.Nome, aluno.Idade, aluno.Nota, done = 0, save = 1))
      break;

    case "nome":
      alunos.forEach((aluno) => {
        aluno.remove()
      })
      arrayAlunos = OrdenarPorNome(arrayAlunos)
      arrayAlunos.forEach((aluno) => saveAluno(aluno.Nome, aluno.Idade, aluno.Nota, done = 0, save = 1))
      break;

    default:
      break;
  }
};

// Eventos
alunoForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const inputValue = alunoInput.value;
  const inputValue2 = alunoInput2.value;
  const inputValue3 = alunoInput3.value;

  if (inputValue && inputValue2 && inputValue3) {
    saveAluno(inputValue, inputValue2, inputValue3);
  }
});

document.addEventListener("click", (e) => {
  const targetEl = e.target;
  const parentEl = targetEl.closest("div");
  let alunoTitle;

  if (parentEl && parentEl.querySelector("h3")) {
    alunoTitle = parentEl.querySelector("h3").innerText || "";
  }

  if (targetEl.classList.contains("remove-aluno")) {
    alunoTitle = parentEl.querySelector("h3").innerText
    let removido = ExcluirAluno(arrayAlunos, alunoTitle)
    if (removido) {
      parentEl.remove();

      // Utilizando dados da localStorage

    }

  }
});

searchInput.addEventListener("keyup", (e) => {
  const busca = e.target.value;

  getBuscarAluno(busca);
});

eraseBtn.addEventListener("click", (e) => {
  e.preventDefault();

  searchInput.value = "";

  searchInput.dispatchEvent(new Event("keyup"));
});

filterBtn.addEventListener("change", (e) => {
  const filterValue = e.target.value;

  filterAlunos(filterValue);
});

// Local Storage

// const loadAlunos = () => {

//   arrayAlunos.forEach((aluno) => {
//     saveAluno(aluno.Nome, aluno.Idade, aluno.Nota, 0);
//   });
// };

// loadAlunos();
