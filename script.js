/* ===== ELEMENTOS ===== */
const chkErro = document.getElementById("chkErro");
const chkDuvida = document.getElementById("chkDuvida");
const lblCausa = document.getElementById("lblCausa");

const txtCausa = document.getElementById("txtCausa");
const txtSolucao = document.getElementById("txtSolucao");
const txtFeedback = document.getElementById("txtFeedback");
const txtUpsell = document.getElementById("txtUpsell");

const chkSemUpsell = document.getElementById("chkSemUpsell");
const btnCopiar = document.getElementById("btnCopiar");

const atalhosList = document.getElementById("atalhosList");
const chkTema = document.getElementById("chkTema");

/* ===== CONSTANTES ===== */
const ATALHOS_KEY = "express_atalhos";
const TEMA_KEY = "express_tema";

/* ===== TIPO ERRO / DÚVIDA ===== */
chkErro.onchange = () => {
  if (chkErro.checked) {
    chkDuvida.checked = false;
    lblCausa.textContent = "Causa do Erro";
  }
};

chkDuvida.onchange = () => {
  if (chkDuvida.checked) {
    chkErro.checked = false;
    lblCausa.textContent = "Dúvida";
  }
};

/* ===== UPSELL ===== */
chkSemUpsell.onchange = () => {
  if (chkSemUpsell.checked) {
    txtUpsell.value = "Não tive oportunidade";
    txtUpsell.disabled = true;
  } else {
    txtUpsell.value = "";
    txtUpsell.disabled = false;
  }
};

/* ===== ATALHOS ===== */
const atalhosPadrao = [
  { nome: "ERRO 204 DUPLICIDADE", texto: "baixei o xml da sefaz e importei no sistema do cliente" },
  { nome: "Atualização de versão", texto: "atualizei o sistema do cliente para versão mais atual" },
  { nome: "Reparação banco", texto: "compactei e reparei o banco de dados do cliente" }
];

let atalhos = JSON.parse(localStorage.getItem(ATALHOS_KEY)) || atalhosPadrao;

function salvarAtalhos() {
  localStorage.setItem(ATALHOS_KEY, JSON.stringify(atalhos));
}

function renderAtalhos() {
  atalhosList.innerHTML = "";

  atalhos.forEach((a, index) => {
    const item = document.createElement("div");
    item.className = "atalho-item";
    item.draggable = true;
    item.dataset.index = index;

    const label = document.createElement("label");
    const chk = document.createElement("input");
    chk.type = "checkbox";

    chk.onchange = () => {
      if (chk.checked) {
        txtSolucao.value += (txtSolucao.value ? "\n" : "") + a.texto;
      } else {
        txtSolucao.value = txtSolucao.value.replace(a.texto, "").trim();
      }
    };

    label.append(chk, a.nome);

    const acoes = document.createElement("div");
    acoes.className = "atalho-acoes";

    const btnEdit = document.createElement("button");
    btnEdit.textContent = "✏️";
    btnEdit.onclick = () => editarAtalho(index);

    const btnDel = document.createElement("button");
    btnDel.textContent = "❌";
    btnDel.onclick = () => {
      atalhos.splice(index, 1);
      salvarAtalhos();
      renderAtalhos();
    };

    acoes.append(btnEdit, btnDel);
    item.append(label, acoes);
    atalhosList.appendChild(item);

    configurarDragDrop(item);
  });
}

/* ===== DRAG & DROP ===== */
let dragIndex = null;

function configurarDragDrop(item) {
  item.ondragstart = () => dragIndex = item.dataset.index;
  item.ondragover = e => e.preventDefault();
  item.ondrop = () => {
    const dropIndex = item.dataset.index;
    const movido = atalhos.splice(dragIndex, 1)[0];
    atalhos.splice(dropIndex, 0, movido);
    salvarAtalhos();
    renderAtalhos();
  };
}

/* ===== CRUD ===== */
function editarAtalho(index) {
  const nome = prompt("Editar nome:", atalhos[index].nome);
  const texto = prompt("Editar texto:", atalhos[index].texto);
  if (nome && texto) {
    atalhos[index] = { nome, texto };
    salvarAtalhos();
    renderAtalhos();
  }
}

document.getElementById("btnNovoAtalho").onclick = () => {
  const nome = prompt("Nome do atalho:");
  const texto = prompt("Texto do atalho:");
  if (nome && texto) {
    atalhos.push({ nome, texto });
    salvarAtalhos();
    renderAtalhos();
  }
};

/* ===== COPIAR (CORRIGIDO) ===== */
btnCopiar.onclick = () => {
  const tipo = chkErro.checked ? "Erro" : chkDuvida.checked ? "Dúvida" : "";

  const texto =
`Tipo: ${tipo}
${lblCausa.textContent}: ${txtCausa.value}

Solução:
${txtSolucao.value}

Feedback do Cliente:
${txtFeedback.value}

Oportunidade de Upsell:
${txtUpsell.value}`;

  navigator.clipboard.writeText(texto);

  document.querySelectorAll("textarea").forEach(t => {
    t.value = "";
    t.disabled = false;
  });

  document.querySelectorAll("input[type=checkbox]").forEach(c => c.checked = false);
  lblCausa.textContent = "Causa do Erro/Dúvida";
};

/* ===== TEMA ===== */
if (localStorage.getItem(TEMA_KEY) === "dark") {
  document.body.classList.add("dark");
  chkTema.checked = true;
}

chkTema.onchange = () => {
  document.body.classList.toggle("dark");
  localStorage.setItem(TEMA_KEY, chkTema.checked ? "dark" : "light");
};

renderAtalhos();
