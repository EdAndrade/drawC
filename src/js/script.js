function App(){
	this.mousedown = 0

	//CONFIGURACOES PINCEL
	this.pincelTamanho = 14
	this.pincelOpacidade = 1

	//CONFIGURACOES LAPIS
	this.lapisTamanho = 14
	this.lapisOpacidade = 1

	//CONFIGURACOES APAGADOR
	this.tamanhoApagador = 14

	//ULTIMAS POSCOES DO MOUSE
	this.lPosX = 0
	this.lPosy = 0


	this.ferramentaActiva = 0
	this.ferramentaEmUso = 4
}

App.prototype.desenhandoNoDesktop = function(canvas, context){
	var that = this

	canvas.addEventListener("mousemove", (event) => {

		var posX = event.pageX
		var posY = event.pageY

		if(that.mousedown){

			if(that.ferramentaEmUso == 3){

				that.pincel(context, posX, posY)

			}else if(that.ferramentaEmUso == 4){

				that.lapis(context, posX, posY)

			}else if(that.ferramentaEmUso == 5){

				that.apagador(context, posX, posY)
			}

		}
		
	})
}

//=======================================================ESCONDER E MOSTRAR OS REGULADORES DAS FERRAMENTAS
App.prototype.visibilidadeAuxilioFerramentas = function(){
	var that = this

	this.ferramentas = document.getElementsByClassName("todasFerramentas")
	var auxilios    = document.getElementsByClassName("caixaFerramentas")
	console.log(auxilios)

	for(let i = 0; i < this.ferramentas.length; i++){

		this.ferramentas[i].addEventListener("click", (event) => {

			var ferramentaClicada = event.target.getAttribute("data-ferramenta")
			that.ferramentaEmUso = ferramentaClicada
			
			if(ferramentaClicada != that.ferramentaActiva){

				if(that.ferramentaActiva){

					that.removerClasse(auxilios[that.ferramentaActiva-1], "mostrarAuxilio")
					that.adicionarClasse(auxilios[ferramentaClicada-1], "mostrarAuxilio")

				}else{
					that.adicionarClasse(auxilios[ferramentaClicada-1], "mostrarAuxilio")
				}

				that.ferramentaActiva = ferramentaClicada

			}else{
				that.removerClasse(auxilios[ferramentaClicada-1], "mostrarAuxilio")
				that.ferramentaActiva = 0
			}
		})
	}
}

App.prototype.dimensionarCanvas = function(){
	canvas.width = window.innerWidth
	canvas.height = window.innerHeight
}


//=================================================================FERRAMENTAS
App.prototype.lapis = function(context, posX, posY){

	context.strokeStyle = "red"
	context.globalAlpha = this.lapisOpacidade
	context.lineWidth = this.lapisTamanho
	context.beginPath()
	context.moveTo(this.lPosX, this.lPosy);
    context.lineTo(posX, posY);
    context.stroke();
	context.closePath()
	context.fill()

	//atualizando as ulimas posicoes
	this.lPosX = posX
	this.lPosy = posY
}

App.prototype.pincel = function(context, posX, posY){

	var gradient = context.createLinearGradient(posX-this.pincelTamanho, posY-this.pincelTamanho, posX, posY)
	gradient.addColorStop(0, "rgb(245, 100, 200)")
	gradient.addColorStop(1, "rgb(187, 110, 55)")
	context.fillStyle = gradient
	context.globalAlpha = this.pincelOpacidade
	context.beginPath()
	context.arc(posX, posY, this.pincelTamanho, 0, 2*Math.PI, false);
	context.closePath()
	context.fill()
}

App.prototype.apagador = function(context, posX, posY){
	var apagadorCalc = this.tamanhoApagador/2
	context.clearRect(posX-apagadorCalc, posY-apagadorCalc, this.tamanhoApagador, this.tamanhoApagador)
}

App.prototype.limparTela = function(context){
	var buttonLimparTela = document.getElementById("limparTela")
	var that = this

	buttonLimparTela.addEventListener("click", () => {
		that.dimensionarCanvas()
	})
}
//=============================================PARA INFORMAR QUANDO O MOUSE FOI PRESSIONADO OU LARGADO
App.prototype.mudarEstadoMouse = function(canvas){
	var that = this

	canvas.addEventListener("mousedown", (event) =>{
		that.mousedown = 1

		//ATUALIZANDO A ULTIMA POSICAO DO MOUSE
		that.lPosX = event.clientX
		that.lPosy = event.clientY
	})

	canvas.addEventListener("mouseup", (event) =>{
		that.mousedown = 0
	})
}
//===================================================================================///////////////

App.prototype.esconderSeccao = function(){
	var that = this

	setInterval(() => {

		if(that.mousedown){
			if(that.existeClasse("footer", "esconderFerramentas") == -1){
				that.adicionarClasse("footer", "esconderFerramentas")
			}
		}else{
			that.removerClasse("footer", "esconderFerramentas")
		}

	}, 1000)
}

//==================================================ACTUALIZACAO DOS TAMANHOS DAS FERRAMENTAS E OPACIDADE
App.prototype.actualizarTamanhoPincel = function(){
	var that = this

	var tamanhoDoPincel = document.getElementById("rangeTamanhoPincel");

	tamanhoDoPincel.addEventListener("input", (event) => {
		that.pincelTamanho = tamanhoDoPincel.value
	})
}

App.prototype.actualizarPincelOpacidade = function(){
	var that = this

	var opacidade = document.getElementById("rangePincelOpacidade");

	opacidade.addEventListener("input", (event) => {
		that.pincelOpacidade = opacidade.value/100
	})
}

App.prototype.actualizarTamanhoLapis = function(){
	var that = this

	var tamanhoDoLapis = document.getElementById("rangeTamanhoLapis");

	tamanhoDoLapis.addEventListener("input", (event) => {
		that.lapisTamanho = tamanhoDoLapis.value
	})
}

App.prototype.actualizarLapisOpacidade = function(){
	var that = this

	var opacidade = document.getElementById("rangeLapisOpacidade");

	opacidade.addEventListener("input", (event) => {
		that.lapisOpacidade = opacidade.value/100
	})
}

App.prototype.actualizarTamanhoApagador= function(){
	var that = this

	var apagador = document.getElementById("rangeTamanhoApagador");

	apagador.addEventListener("input", (event) => {
		that.tamanhoApagador = apagador.value
		console.log(that.tamanhoApagador)
	})
}

//===================================================================================///////////////


//========================================================MANIPULACAO DE CLASSES
App.prototype.existeClasse = function(elemento, classe){
	if(typeof(elemento) == "string"){
		var elemento = document.querySelector(elemento)
	}
	return elemento.className.indexOf(classe)
}

App.prototype.adicionarClasse = function(elemento, classe){
	if(typeof(elemento) == "string"){
		var elemento = document.querySelector(elemento)
	}
	elemento.className += " "+classe
}

App.prototype.removerClasse = function(elemento, classe){
	if(typeof(elemento) == "string"){
		var elemento = document.querySelector(elemento)
	}
	var classes = elemento.className.split(" ")
	var index   = classes.indexOf(classe)
	classes = classes.slice(0, index).concat(classes.slice(index+1))

	elemento.className = classes.join(" ")
}
//===================================================================================///////////////

App.prototype.redimensionando = function(canvas){
	var that = this

	window.addEventListener("resize", () => {
		that.dimensionarCanvas(canvas)
	})
}

App.prototype.executarMetodos = function(){
	var canvas = document.getElementById("canvas")
	var context = canvas.getContext("2d")

	this.desenhandoNoDesktop(canvas, context)
	this.dimensionarCanvas(canvas)
	this.mudarEstadoMouse(canvas)
	this.redimensionando(canvas)
	
	this.visibilidadeAuxilioFerramentas()
	this.esconderSeccao()
	this.limparTela()

	//ACTUALIZAR FERRAMENTAS
	this.actualizarTamanhoApagador()

	this.actualizarTamanhoLapis()
	this.actualizarLapisOpacidade()

	this.actualizarTamanhoPincel()
	this.actualizarPincelOpacidade()
}

window.onload = () =>{
	var app = new App()
	app.executarMetodos()
}