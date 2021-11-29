$( document ).ready(function() {
    console.log('commit');
});

function getValidate() {
    var user = $("#txtUser").val();
    var pass = $("#txtPass").val();
    var url = "https://barbearia-api-back.herokuapp.com/usuarios/login";
    if (user == "" || pass == "") {
        swal({
            closeOnClickOutside: false,
            closeOnEsc: false,
            title: 'Atenção!',
            text: "Informar e-mail e senha validos.",
            icon: "warning",
            button: "Entendi",
        });
    } else {
        getLogin(user, pass, url)
    }
}

function getLogin(user, pass, url) {
    loading(true);
    $.ajax({
        url: url,
        type: 'POST',
        dataType: "json",
        crossDomain: true,
        format: "json",
        data: jQuery.param({ desc_email: user, desc_password: pass }),
        success: function (json) {
            window.open('agendamento.html', '_self');
        },
        error: function (error) {
            swal({
                closeOnClickOutside: false,
                closeOnEsc: false,
                title: 'Atenção!',
                text: "O e-mail informado não foi cadastrado, por favor realizar o cadastro.",
                icon: "warning",
                button: "Entendi",
            });
        }
    });
}

function getCadValidate() {
    var hfNome = $("#txtNome").val();
    var hfEmail = $("#txtEmail").val();
    var hfCadSenha = $("#txtCadSenha").val();
    var hfConSenha = $("#txtConSenha").val();
    var url = "https://barbearia-api-back.herokuapp.com/usuarios/cadastro";
    if (hfNome == "") {
        swal({
            closeOnClickOutside: false,
            closeOnEsc: false,
            title: 'Atenção!',
            text: "Preencher o campo NOME.",
            icon: "warning",
            button: "Entendi",
        }).then((valid) => {
            $("#txtNome").select();
        })
    } else if (hfEmail == "") {
        swal({
            closeOnClickOutside: false,
            closeOnEsc: false,
            title: 'Atenção!',
            text: "Preencher o campo EMAIL.",
            icon: "warning",
            button: "Entendi",
        }).then((valid) => {
            $("#txtEmail").select();
        })
    } else if (hfCadSenha == "") {
        swal({
            closeOnClickOutside: false,
            closeOnEsc: false,
            title: 'Atenção!',
            text: "Preencher o campo SENHA.",
            icon: "warning",
            button: "Entendi",
        }).then((valid) => {
            $("#txtCadSenha").select();
        })
    } else if (hfCadSenha != hfConSenha) {
        swal({
            closeOnClickOutside: false,
            closeOnEsc: false,
            title: 'Atenção!',
            text: "As senhas são diferentes.",
            icon: "warning",
            button: "Entendi",
        }).then((valid) => {
            $("#txtCadSenha").select();
        })
    } else {
        getCad(hfNome, hfEmail, hfCadSenha, url);
    }

    function getCad(hfNome, hfEmail, hfCadSenha, url) {
        loading(true);

        var dataAtual = getData();

        $.ajax({
            url: url,
            type: 'POST',
            dataType: "json",
            crossDomain: true,
            format: "json",
            data: jQuery.param({
                desc_email: hfEmail,
                desc_nome: hfNome,
                desc_password: hfCadSenha,
                dat_data: dataAtual
            }),
            success: function (json) {
                swal({
                    closeOnClickOutside: false,
                    closeOnEsc: false,
                    title: 'Sucesso!',
                    text: "Cadastro realizado com sucesso!",
                    icon: "success",
                    button: "Entendi",
                }).then((correto) => {
                    $("#txtNome").val("");
                    $("#txtEmail").val("");
                    $("#txtCadSenha").val("");
                    $("#txtConSenha").val("");
                })
            },
            error: function (data, textStatus, xhr) {

                if (xhr == "Conflict") {
                    swal({
                        closeOnClickOutside: false,
                        closeOnEsc: false,
                        title: 'Atenção!',
                        text: "E-mail já cadastrado no sistema.",
                        icon: "warning",
                        button: "Entendi",
                    });
                } else {
                    swal({
                        closeOnClickOutside: false,
                        closeOnEsc: false,
                        title: 'Atenção!',
                        text: "Entre em contato com o administrador do sistema.",
                        icon: "warning",
                        button: "Entendi",
                    });
                }
            }
        });
    }

    function getData() {
        var data = new Date(),
            dia = data.getDate().toString().padStart(2, '0'),
            mes = (data.getMonth() + 1).toString().padStart(2, '0'),
            ano = data.getFullYear();
        return dia + "-" + mes + "-" + ano;
    }

}