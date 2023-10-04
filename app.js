firebase.initializeApp({
    apiKey: "AIzaSyBnSSGupJiMAln0FQF0MELn0zl_altoHEE",
  authDomain: "proyectobasica-1bf8f.firebaseapp.com",
  projectId: "proyectobasica-1bf8f",
})
var db = firebase.firestore();


//AGREGAR DOCUMENTOS
function guardar(){
    var nombre = document.getElementById('nombre').value;
    var apellido = document.getElementById('apellido').value;
    var edad = document.getElementById('edad').value;

    db.collection("users").add({
        first: nombre,
        last: apellido,
        age: edad
    })
    .then(function(docRef) {
        console.log("Document written with ID: ", docRef.id);
        document.getElementById('nombre').value = '';
        document.getElementById('apellido').value = '';
        document.getElementById('edad').value = '';
    })
    .catch(function(error){
        console.error("Error adding document: ", e);
    })
}

//LEER DOCUMENTOS
var tabla = document.getElementById('tabla');
db.collection("users").onSnapshot((querySnapshot) => {
    tabla.innerHTML = '';
    querySnapshot.forEach((doc) => {
        console.log(`${doc.id} => ${doc.data().first}`);
        tabla.innerHTML += `
            <tr>
                <th scope="row">${doc.id}</th>
                <td>${doc.data().first}</td>
                <td>${doc.data().last}</td>
                <td>${doc.data().age}</td>
                <td><button class="btn btn-danger" onclick="eliminar('${doc.id}')">Eliminar</button></td>
                <td><button class="btn btn-warning">Editar</button></td>
            </tr>
        `
    });
});

//BORRAR DOCUMENTOS
function eliminar(id){
    db.collection("users").doc(id).delete().then(function(){
        console.log("Documento EXITOSAMENTE eliminado!!!");
    }).catch(function(error){
        console.error("ERROR al eliminar el Documento: ", error);
    });
}






