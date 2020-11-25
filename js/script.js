let dados = [];

function ApagaRegistro(id) {
    let confirmar = confirm("Deseja realmente excluir estre cadastro?")

    if (confirmar) {
        for (let i = 0; i < dados.length; i++) {
            if (dados[i].id == id) {
                dados.splice(i, 1);
            }

        }
        PopulaTabela();
    }
};

function EditarRegistro(id) {
    $("#modalRegistro").modal("show")

    dados.forEach(function (item) {
        if (item.id == id) {
            $("#hdId").val(item.id);
            $("#txtNome").val(item.nome);
            $("#txtSobrenome").val(item.sobrenome);
            $("#txtDt_Nasc").val(item.dt_nasc.substr(6, 4) + "-" + item.dt_nasc.substr(3, 2) + "-" + item.dt_nasc.substr(0, 2));
            $("#txtTel").val(item.tel);
            $("#txtEmail").val(item.email);
        }
    })
};

function PopulaTabela() {
    if (Array.isArray(dados)) {
        localStorage.setItem("__dados__", JSON.stringify(dados));

        $("#tblDados tbody").html("")

        dados.forEach(function (item) {
            $("#tblDados tbody").append(`
             <tr>
                <th scope="row">${item.id}</th>
                <td>${item.nome}</td>
                <td>${item.sobrenome}</td>
                <td>${item.dt_nasc}</td>
                <td>${item.tel}</td>
                <td>${item.email}</td>
                <td><button type="button" class="btn btn-primary" onclick="javascript:EditarRegistro(${item.id})"><i class="fa fa-edit" /></button></td>
                <td><button type="button" class="btn btn-danger" onclick="javascript:ApagaRegistro(${item.id});"><i class="fa fa-trash" /></button></td>
            </tr>`);
        })
    }
}

$(function () {
    dados = JSON.parse(localStorage.getItem("__dados__"));

    if (dados) {
        PopulaTabela();
    }

    $("#btnSalvar").click(function () {
        let id = $("#hdId").val();
        let nome = $("#txtNome").val();
        let sobrenome = $("#txtSobrenome").val();
        let dtNasc = new Date($("#txtDt_Nasc").val()).toLocaleDateString("pt-br", ({ timezone: "UTC" }));
        let telefone = $("#txtTel").val();
        let email = $("#txtEmail").val();

        let registro = {}

        // Inserir os dados dos campos
        if (!id || id == "0") {
            registro.id = dados.length + 1;
            registro.nome = nome;
            registro.sobrenome = sobrenome;
            registro.dt_nasc = dtNasc;
            registro.tel = telefone;
            registro.email = email;

            dados.push(registro);
        }
        else {
            dados.forEach(function (item) {
                if (item.id == id) {
                    item.nome = nome
                    item.sobrenome = sobrenome
                    item.dt_nasc = dtNasc
                    item.tel = telefone
                    item.email = email
                }
            });
        }


        alert("Cadastro salvo com sucesso!")
        $("#modalRegistro").modal("hide")

        // Limpar os campos
        $("#hdId").val("0");
        $("#txtNome").val("");
        $("#txtSobrenome").val("");
        $("#txtDt_Nasc").val("");
        $("#txtTel").val("");
        $("#txtEmail").val("");

        PopulaTabela();
    })
});