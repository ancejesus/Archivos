// Contáctos {} [] 
$(function(){
	$('#cListar').tap(function(){
		LeerContactos();
	});	
	$('#ncSend').tap(function(){
		nuevoContacto($('#ncNom').val(),$('#ncTel').val(),$('#ncMail').val());
	});
});

// Wait for device API libraries to load
function LeerContactos(){
document.addEventListener("deviceready", Contactos, false);
}

// device APIs are available

function Contactos() {
	// find all contacts with 'Bob' in any name field
	var options = new ContactFindOptions();
	//options.filter = " ";
	var fields = ["*"];
	navigator.contacts.find(fields, leidos, onError1, options);
}

// onSuccess: Get a snapshot of the current contacts

function leidos(contacts) {
	if(contacts.length>0)
	$('#cMostrar').html('');
	else
	$('#cMostrar').html('<li> Sin leer contáctos</li>')
	for (var i = 0; i < contacts.length; i++) {
		var tel = contacts[i].phoneNumbers[0].value;
		var nombre = contacts[i].name.formatted;
		$('#cMostrar').append('<li><a href="tel:'+tel+'">'+nombre+'</a></li>');
	}
}

// onError: Failed to get the contacts

function onError1(contactError) {
	alert('onError!');
}

//Crear Contactos
function nuevoContacto(nom,tel,mail){
	document.addEventListener("deviceready",function(){
		datosContacto(nom,tel,mail);},false);
	
}
//Crear módulo de nuevo contacto
function datosContacto(nom,tel,mail){
	var contacto = navigator.contacts.create();
	contacto.displayName = nom;
	contacto.nickname = nom;
	var nombre = new ContactName();
	nombre.givenName = nom;
	nombre.familyName = "Prueba";
	contacto.name = nombre;
	var telefonos = [];
	telefonos[0] = new ContactField('home', tel, true);
	contacto.phoneNumbers = telefonos;
	var correos = [];
	correos[0] = new ContactField('personal', email, true);
	contacto.emails = correos;
	
	contacto.save(nuevoCorrecto,nuevoError);
}

function nuevoError(err) {
	alert.('Error: '+ err.code);
}

function nuevoCorrecto(){
	alert.('Contácto Creado Satisfactoriamente');
	$('#ncNom').val('');
	$('#ncTel').val('');
	$('#ncMail').val('');
	window.history.back();
}