document.addEventListener('DOMContentLoaded', () => {

    const email = {
        email: '',
        asunto: '',
        mensaje:''
    }

    // VARIABLES FORMULARIO
    const inputEmail = document.querySelector('#email');
    const inputAsunto = document.querySelector('#asunto');
    const inputMensaje = document.querySelector('#mensaje');
    const formulario = document.querySelector('#formulario');
    const buttonSubmit = document.querySelector('#formulario button[type="submit"]')
    const buttonReset = document.querySelector('#formulario button[type="reset"]')

    inputEmail.addEventListener('input', validarInputs)
    inputAsunto.addEventListener('input', validarInputs)
    inputMensaje.addEventListener('input', validarInputs)

    buttonReset.addEventListener('click', evento => {
        evento.preventDefault();

        // Reiniciar el objeto
        email.email = '';
        email.asunto = '';
        email.mensaje = '';

        formulario.reset();
        comprobarEnvioEmail();
    })


    function validarInputs(data) {

        if(data.target.value.trim() === ''){
            mostrarAlerta(`El campo ${data.target.id} es obligatorio.`, data.target.parentElement);
            email[data.target.name] = '';
            comprobarEnvioEmail();
            return;
        }

        if(data.target.id === 'email' && !validarEmail(data.target.value)){
            mostrarAlerta('El email no es valido', data.target.parentElement);
            email[data.target.name] = '';
            comprobarEnvioEmail();
            return;
        }

        limpiarAlerta(data.target.parentElement);

        email[data.target.name] = data.target.value.trim().toLowerCase();

        comprobarEnvioEmail();

    }


    function mostrarAlerta(mensaje, referencia) {

        limpiarAlerta(referencia);

        // Generamos la alerta en el HTML
        const mensajeAlerta = document.createElement('DIV');
        mensajeAlerta.textContent = mensaje;
        mensajeAlerta.classList.add('bg-red-600', 'p-2', 'rounded-md', 'text-white');

        // Inyectamos el mensaje de error en el formulario con referencia a los elementoss
        referencia.appendChild(mensajeAlerta);

    }


    function limpiarAlerta(referencia){
        const alerta = referencia.querySelector('.bg-red-600');
        if(alerta){
            alerta.remove();
        }
    }


    function validarEmail(email){
        const regex =  /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/;
        const resultado = regex.test(email);
        return resultado;
    }


    function comprobarEnvioEmail(){
        if(Object.values(email).includes('')){
            buttonSubmit.classList.add('opacity-50');
            buttonSubmit.disabled = true;
            return;
        }
        
        buttonSubmit.classList.remove('opacity-50');
        buttonSubmit.disabled = false;
    }


})
