var cars;
var car;
var regexMatricula = /^(?<![\w\d])[0-9]{4}[BCDFGHJKLMNPRSTVWXYZ]{3}\b/;
function creaCotxe() {
    var _a, _b;
    (_a = document.getElementById("inici")) === null || _a === void 0 ? void 0 : _a.classList.add("d-none");
    (_b = document.getElementById("creaCotxe")) === null || _b === void 0 ? void 0 : _b.classList.remove("d-none");
}
function validaCotxe(e) {
    var _a, _b;
    e.preventDefault();
    var plate = e.target[0].value;
    var brand = e.target[1].value;
    var color = e.target[2].value;
    if (regexMatricula.test(plate.toLocaleUpperCase())) {
        car = new Car(plate, brand, color);
        (_a = document.getElementById("creaCotxe")) === null || _a === void 0 ? void 0 : _a.classList.add("d-none");
        (_b = document.getElementById("creaRodes")) === null || _b === void 0 ? void 0 : _b.classList.remove("d-none");
        e.target.reset();
        e.target[0].classList.remove('is-valid');
    }
    else {
        alert('Matricula incorrecte: ha de contenir 4 numeros i 3 lletres \n (Exemple: 1234ABC)');
    }
}
function validaRodes(e) {
    e.preventDefault();
    var rodes = [];
    for (var i = 0; i <= 7; i = i + 2) {
        var marca = e.target[i].value;
        var diametre = e.target[i + 1].value;
        if (diametre >= 0.4 && diametre <= 2) {
            rodes.push(new Wheel(diametre, marca));
        }
        else {
        }
    }
    if (rodes.length == 4) {
        rodes.forEach(function (roda) { return car.addWheel(roda); });
        dadesCar();
        e.target.reset();
        e.target[1].classList.remove('is-valid');
        e.target[3].classList.remove('is-valid');
        e.target[5].classList.remove('is-valid');
        e.target[7].classList.remove('is-valid');
    }
    else {
        alert("El di\u00E0metre de les rodes ha de estar entre 0,4 i 2.\nS'ha detectat " + (4 - rodes.length) + " rodes fora del rang");
    }
}
function dadesCar() {
    var _a, _b;
    if (cars == undefined) {
        cars = [car];
    }
    else {
        cars.push(car);
    }
    afegirTaula(car);
    (_a = document.getElementById("creaRodes")) === null || _a === void 0 ? void 0 : _a.classList.add("d-none");
    (_b = document.getElementById("inici")) === null || _b === void 0 ? void 0 : _b.classList.remove("d-none");
}
function afegirTaula(car) {
    var taula = document.getElementById('llistaCotxes');
    var fila = document.createElement('tr');
    var tdMatricula = document.createElement('td');
    var matricula = document.createTextNode(car.plate);
    tdMatricula.appendChild(matricula);
    fila.appendChild(tdMatricula);
    var tdMarca = document.createElement('td');
    var marca = document.createTextNode(car.brand);
    tdMarca.appendChild(marca);
    fila.appendChild(tdMarca);
    var tdColor = document.createElement('td');
    var color = document.createTextNode(car.color);
    tdColor.appendChild(color);
    fila.appendChild(tdColor);
    var tdRodes = document.createElement('td');
    var rodes = document.createTextNode(JSON.stringify(car.wheels));
    tdRodes.appendChild(rodes);
    fila.appendChild(tdRodes);
    taula.appendChild(fila);
}
function listeners() {
    document.querySelectorAll('input').forEach(function (input) {
        input.addEventListener('keyup', validar);
        //input.addEventListener('blur', validar);
    });
}
function validar(e) {
    switch (e.target.name) {
        case "matricula":
            if (regexMatricula.test((e.target.value).toUpperCase())) {
                e.target.classList.remove('is-invalid');
                e.target.classList.add('is-valid');
            }
            else {
                e.target.classList.remove('is-valid');
                e.target.classList.add('is-invalid');
            }
            ;
            break;
        case "diametre":
            if (e.target.value >= 0, 4 && e.target.value <= 2) {
                e.target.classList.remove('is-invalid');
                e.target.classList.add('is-valid');
            }
            else {
                e.target.classList.remove('is-valid');
                e.target.classList.add('is-invalid');
            }
            ;
            break;
    }
}
