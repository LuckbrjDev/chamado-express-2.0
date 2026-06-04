/* ===== ELEMENTOS ===== */
const chkErro = document.getElementById("chkErro");
const chkDuvida = document.getElementById("chkDuvida");
const lblCausa = document.getElementById("lblCausa");

const txtCausa = document.getElementById("txtCausa");
const txtSolucao = document.getElementById("txtSolucao");
const txtFeedback = document.getElementById("txtFeedback");
const txtUpsell = document.getElementById("txtUpsell");

const chkSemFeedback = document.getElementById("chkSemFeedback");
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
    lblCausa.textContent = "Causa do Erro";
  }
};

chkDuvida.onchange = () => {
  if (chkDuvida.checked) {
    lblCausa.textContent = "Dúvida";
  }
};

/* ===== FEEDBACK ===== */
chkSemFeedback.onchange = () => {
  if (chkSemFeedback.checked) {
    txtFeedback.value = "Agradeceu";
    txtFeedback.disabled = true;
  } else {
    txtFeedback.value = "";
    txtFeedback.disabled = false;
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
  { nome: "ERRO 204 DUPLICIDADE", texto: "baixei o XML da Sefaz e importei no sistema do cliente" },
  { nome: "Atualização de versão", texto: "atualizei o sistema do cliente para a versão mais atual" },
  { nome: "Reparação de banco", texto: "compactei e reparei o banco de dados do cliente" },
  { nome: "Configuração de certificado", texto: "localizei o arquivo do certificado e configurei o certificado digital no sistema do cliente" },
  { nome: "Mudança de regime", texto: "acessei o cadastro do cliente no sistema e alterei para regime normal, após isso consultei qual CFOP ele usava e configurei os impostos que ele me passou nas respectivas CFOPs, depois fiz a config2 de tabelas para puxar os impostos por CFOP" },
  { nome: "IE do destinatário", texto: "consultei o CNPJ do destinatário na Sefaz, identifiquei a IE e cadastrei no sistema, depois abri a nota e reinseri o destinatário" },
  { nome: "Atualização de versão do cliente", texto: "atualizei o sistema do cliente para a versão atual" },
];

function carregarAtalhos() {
  try {
    const salvos = JSON.parse(localStorage.getItem(ATALHOS_KEY));
    return Array.isArray(salvos) ? salvos : atalhosPadrao;
  } catch {
    localStorage.removeItem(ATALHOS_KEY);
    return atalhosPadrao;
  }
}

let atalhos = carregarAtalhos();

function salvarAtalhos() {
  localStorage.setItem(ATALHOS_KEY, JSON.stringify(atalhos));
}

function removerUltimaOcorrencia(texto, trecho) {
  const linhas = texto.split("\n");
  const posicao = linhas.lastIndexOf(trecho);

  if (posicao === -1) {
    return texto;
  }

  linhas.splice(posicao, 1);
  return linhas.join("\n").trim();
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
        txtSolucao.value = removerUltimaOcorrencia(txtSolucao.value, a.texto);
      }
    };

    label.append(chk, a.nome);

    const acoes = document.createElement("div");
    acoes.className = "atalho-acoes";

    const btnEdit = document.createElement("button");
    btnEdit.textContent = "Editar";
    btnEdit.onclick = () => editarAtalho(index);

    const btnDel = document.createElement("button");
    btnDel.textContent = "Excluir";
    btnDel.onclick = () => {
      if (!confirm("Excluir este atalho?")) return;

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
  item.ondragstart = () => {
    dragIndex = Number(item.dataset.index);
    item.classList.add("dragging");
  };

  item.ondragend = () => {
    item.classList.remove("dragging");
  };

  item.ondragover = e => e.preventDefault();
  item.ondrop = () => {
    const dropIndex = Number(item.dataset.index);

    if (dragIndex === null || dragIndex === dropIndex) return;

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

  if (nome?.trim() && texto?.trim()) {
    atalhos[index] = { nome: nome.trim(), texto: texto.trim() };
    salvarAtalhos();
    renderAtalhos();
  }
}

document.getElementById("btnNovoAtalho").onclick = () => {
  const nome = prompt("Nome do atalho:");
  const texto = prompt("Texto do atalho:");

  if (nome?.trim() && texto?.trim()) {
    atalhos.push({ nome: nome.trim(), texto: texto.trim() });
    salvarAtalhos();
    renderAtalhos();
  }
};

/* ===== COPIAR ===== */
btnCopiar.onclick = async () => {
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

  try {
    await navigator.clipboard.writeText(texto);
  } catch {
    alert("Não foi possível copiar o texto. Os campos foram mantidos para você tentar novamente.");
    return;
  }

  document.querySelectorAll("textarea").forEach(t => {
    t.value = "";
    t.disabled = false;
  });

  document.querySelectorAll("input[type=checkbox]").forEach(c => c.checked = false);
  document.querySelectorAll("input[name=tipo]").forEach(c => c.checked = false);
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
