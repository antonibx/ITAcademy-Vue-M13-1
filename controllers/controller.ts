let cars:[Car];
let car:Car;
let regexMatricula = /^(?<![\w\d])[0-9]{4}[BCDFGHJKLMNPRSTVWXYZ]{3}\b/

function creaCotxe() {
    document.getElementById("inici")?.classList.add("d-none");
    document.getElementById("creaCotxe")?.classList.remove("d-none");
}
function validaCotxe(e:any){
    e.preventDefault();

    let plate:string = e.target[0].value;
    let brand:string = e.target[1].value;
    let color:string = e.target[2].value;

    if (regexMatricula.test(plate.toLocaleUpperCase())) {
        car = new Car(plate, brand, color);
        document.getElementById("creaCotxe")?.classList.add("d-none");
        document.getElementById("creaRodes")?.classList.remove("d-none");
        e.target.reset();
        e.target[0].classList.remove('is-valid');
    } else {
        alert('Matricula incorrecte: ha de contenir 4 numeros i 3 lletres \n (Exemple: 1234ABC)');
    }
}
function validaRodes(e:any) {
    e.preventDefault();
    let rodes = [];
    for (let i=0; i<=7; i=i+2){
        let marca:string = e.target[i].value;
        let diametre:number = e.target[i+1].value;  
        if(diametre>=0.4 && diametre<=2){
            rodes.push(new Wheel(diametre,marca));
        } else {
        }
    }
    if (rodes.length==4){
        rodes.forEach(roda => car.addWheel(roda));
        dadesCar();
        e.target.reset();
        e.target[1].classList.remove('is-valid')
        e.target[3].classList.remove('is-valid')
        e.target[5].classList.remove('is-valid')
        e.target[7].classList.remove('is-valid')
    } else {
        alert(`El diàmetre de les rodes ha de estar entre 0,4 i 2.\nS'ha detectat ${4-rodes.length} rodes fora del rang`);
    } 
}
function dadesCar(){
    if(cars==undefined){
        cars = [car]
    } else {
        cars.push(car);
    }
    afegirTaula(car);
    document.getElementById("creaRodes")?.classList.add("d-none");
    document.getElementById("inici")?.classList.remove("d-none");
}
function afegirTaula(car:Car) {
    let taula: HTMLElement = document.getElementById('llistaCotxes')!;
    let fila = document.createElement('tr');

    let tdMatricula = document.createElement('td')
    let matricula = document.createTextNode(car.plate)
    tdMatricula.appendChild(matricula);
    fila.appendChild(tdMatricula);

    let tdMarca = document.createElement('td')
    let marca = document.createTextNode(car.brand)
    tdMarca.appendChild(marca);
    fila.appendChild(tdMarca);

    let tdColor = document.createElement('td')
    let color = document.createTextNode(car.color)
    tdColor.appendChild(color);
    fila.appendChild(tdColor);

    let tdRodes = document.createElement('td')
    let rodes = document.createTextNode(JSON.stringify(car.wheels))
    tdRodes.appendChild(rodes);
    fila.appendChild(tdRodes);

    taula.appendChild(fila);
}
function listeners() {
    document.querySelectorAll('input').forEach((input) => {
        input.addEventListener('keyup', validar);
        //input.addEventListener('blur', validar);
    });
}
function validar(e:any){
    switch (e.target.name) {
		case "matricula":
			if (regexMatricula.test((e.target.value).toUpperCase())) {
                e.target.classList.remove('is-invalid');
                e.target.classList.add('is-valid');
            } else {
                e.target.classList.remove('is-valid');
                e.target.classList.add('is-invalid');
            };
		break;
		case "diametre":
			if (e.target.value>=0,4 && e.target.value<=2) {
                e.target.classList.remove('is-invalid');
                e.target.classList.add('is-valid');
            } else {
                e.target.classList.remove('is-valid');
                e.target.classList.add('is-invalid');
            };
		break;
    }
}