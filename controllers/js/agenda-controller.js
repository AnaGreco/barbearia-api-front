

function getAgendValidate() {

    var hfTelefone = $('#txtTelefone').val();
    var hfData = $('#txtData').val();
    var hfHorario = $('#txtHorario').find(':selected').val();

    var url = 'https://barbearia-api-back.herokuapp.com/usuarios/agendar';

    if (hfTelefone == "") {
        swal({
            closeOnClickOutside: false,
            closeOnEsc: false,
            title: 'Atenção!',
            text: "Preencher o campo TELEFONE.",
            icon: "warning",
            button: "Entendi",
        }).then((valid) => {
            $("#txtTelefone").select();
        });
    } else if (hfData == "") {
        swal({
            closeOnClickOutside: false,
            closeOnEsc: false,
            title: 'Atenção!',
            text: "Preencher o campo DATA.",
            icon: "warning",
            button: "Entendi",
        }).then((valid) => {
            $("#txtData").select();
        });
    } else if (hfHorario == "") {
        swal({
            closeOnClickOutside: false,
            closeOnEsc: false,
            title: 'Atenção!',
            text: "Preencher o campo HORARIO.",
            icon: "warning",
            button: "Entendi",
        }).then((valid) => {
            $('#txtHorario').val("");
        });
    }else{
        getCadAgend(hfTelefone, hfData, hfHorario, url);
    }

}

function getCadAgend(hfTelefone, hfData, hfHorario, url) {
    loading(true);

    $.ajax({
        url: url,
        type: 'POST',
        dataType: "json",
        crossDomain: true,
        format: "json",
        data: jQuery.param({
            desc_telefone: hfTelefone,
            dat_dataag: hfData,
            desc_horario: hfHorario,
        }),
        success: function (json) {
            swal({
                closeOnClickOutside: false,
                closeOnEsc: false,
                title: 'Sucesso!',
                text: "Agendamento realizado com sucesso!",
                icon: "success",
                button: "Entendi",
            }).then((correto) => {
                $("#txtTelefone").val("");
                $("#txtData").val("");
                $("#txtHorario").val("");
            })
        },
        error: function (data, textStatus, xhr) {

            if (xhr == "Conflict") {
                swal({
                    closeOnClickOutside: false,
                    closeOnEsc: false,
                    title: 'Atenção!',
                    text: "Escolha um horario ou dia diferente",
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