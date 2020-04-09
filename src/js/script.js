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

	//FERRAMENTAS
	this.ferramentaActiva = 0
	this.ferramentaEmUso = 2

	//INICIO DA POSICAO DAS FIGURAS
	this.figuraX = undefined
	this.figuraY = undefined

	//FINAL DA POSICAO DAS FIGURAS
	this.finalFiguraX = undefined
	this.finalFiguraY = undefined

	//FIGURA SENDO DESENHADA
	this.tipoFigura = 1
	//Preenchimeto FALSE/TRUE
	this.figuraPre = 0

	//CONTROLADOR MENU
	this.visMenu = 0
}
//===================================================================================///////////////

App.prototype.desenhandoNoDesktop = function(canvas, context, canvas2, context2){
	var that = this

	canvas.addEventListener("mousemove", (event) => {

		var posX = event.pageX
		var posY = event.pageY

		if(that.mousedown){

			if(that.ferramentaEmUso == 2){

				that.figuras(canvas2, context2, posX, posY)

			}else if(that.ferramentaEmUso == 3){

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
App.prototype.esconderMenu = function(){
	var that = this
	var caixaMenu = document.getElementById("menu")

	document.getElementById("navbar").addEventListener("click", () => {
		that.visMenu += 1

		if(that.visMenu%2){
			that.adicionarClasse(caixaMenu, "mostrarMenu")
		}else{
			that.removerClasse(caixaMenu, "mostrarMenu")
		}
	})
}

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

App.prototype.dimensionarCanvas = function(canvas){
	canvas.width = window.innerWidth
	canvas.height = window.innerHeight
}
//===================================================================================///////////////


//=================================================================DESENHAR FIGURAS
App.prototype.figuras = function(canvas2, context2, posX, posY, limpar=1){

	if(this.figuraX == undefined){

		this.figuraX = posX
		this.figuraY = posY

	}

	this.finalFiguraX = posX
	this.finalFiguraY = posY

	if(limpar){
		context2.clearRect(0,0, canvas2.width, canvas2.height)
	}

	if(this.tipoFigura == 1){

		this.desenharQuadrado(context2, posX, posY)
		
	}else if(this.tipoFigura == 2){

		this.desenharCirculo(context2, posX, posY)

	}else if(this.tipoFigura == 3){

		this.desenharRecta(context2, posX, posY)

	}

}

App.prototype.desenharQuadrado = function(context2, posX, posY){

	if(this.figuraPre%2){
		context2.fillRect(this.figuraX, this.figuraY, posX-this.figuraX, posY-this.figuraY)
	}else{
		context2.strokeRect(this.figuraX, this.figuraY, posX-this.figuraX, posY-this.figuraY)
	}
}

App.prototype.desenharCirculo = function(context2, posX, posY){

	var radius = posX-this.figuraX

	if(radius < 0){
		radius *= -1
	}

	context2.beginPath()
	context2.arc(this.figuraX, this.figuraY, radius, 0, 2*Math.PI, false)
	context2.closePath()
	
	if(this.figuraPre%2){
		context2.fill()
	}else{
		context2.stroke()
	}
}

App.prototype.desenharRecta = function(context2, posX, posY){
	context2.beginPath()
	context2.moveTo(this.figuraX, this.figuraY)
	context2.lineTo(posX, posY)
	context2.stroke()
	context2.closePath()
}

App.prototype.trocarFiguras = function(){

	var todasFiguras = document.getElementsByClassName("selFig")
	var that = this

	for(let i = 0; i < todasFiguras.length; i++){

		todasFiguras[i].addEventListener("click", (event) => {

			var elemento = event.target.getAttribute("data-figura")
			that.tipoFigura = Number(elemento)
		})
	}
}

//ALTERNAR ENTRE DESENHAR A FIGURA COM PREENCHIMENTO INTERNO OU SEM PREENCHIMENTO
App.prototype.preFigura = function(){
	var botaoFi = document.getElementById("botaoP")
	var that = this

	botaoFi.addEventListener("click", (event) => {
		that.figuraPre += 1

		if(that.figuraPre%2){
			that.adicionarClasse(botaoFi, "preencherFiguras")
		}else{
			that.removerClasse(botaoFi, "preencherFiguras")
		}
	})
}
//===================================================================================///////////////


//=================================================================FERRAMENTAS
App.prototype.lapis = function(context, posX, posY){

	context.strokeStyle = "red"
	context.globalAlpha = this.lapisOpacidade
	context.lineWidth = this.lapisTamanho
	context.beginPath()
	context.moveTo(this.lPosX, this.lPosy)
    context.lineTo(posX, posY)
    context.stroke()
	context.closePath()
	context.fill()

	//atualizando as ulimas posicoes
	this.lPosX = posX
	this.lPosy = posY
}

App.prototype.pincel = function(context, posX, posY){

	var gradient = context.createLinearGradient(posX-this.pincelTamanho, posY-this.pincelTamanho, posX, posY)
	gradient.addColorStop(0, "rgb(124, 145, 123)")
	gradient.addColorStop(1, "rgb(200, 167, 45)")
	context.fillStyle = gradient
	context.globalAlpha = this.pincelOpacidade
	context.beginPath()
	context.arc(posX, posY, this.pincelTamanho, 0, 2*Math.PI, false)
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
		that.dimensionarCanvas(canvas)
	})
}
//=============================================PARA INFORMAR QUANDO O MOUSE FOI PRESSIONADO OU LARGADO
App.prototype.mudarEstadoMouse = function(canvas, context, context2){
	var that = this

	canvas.addEventListener("mousedown", (event) =>{
		that.mousedown = 1

		//ATUALIZANDO A ULTIMA POSICAO DO MOUSE
		that.lPosX = event.clientX
		that.lPosy = event.clientY
	})

	canvas.addEventListener("mouseup", (event) =>{
		that.mousedown = 0

		//CASO ESTEJA SE DESENHANDO ALGUMA FIGURA, DESENHAR AS POSICOES FINAIS E LIMPAR A SEGUNDA CAMADA
		if(that.figuraX != undefined){
			context2.clearRect(0, 0, canvas.width, canvas.height)
			that.figuras(canvas, context, that.finalFiguraX, that.finalFiguraY, 0)

		}

		//SETANDO A POSICAO INICIAL PARA A CRIACAO DAS FIGURAS PARA INDIFINIDO
		that.figuraX = undefined
		that.figuraY = undefined

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

	}, 500)
}

//==================================================ACTUALIZACAO DOS TAMANHOS DAS FERRAMENTAS E OPACIDADE
App.prototype.actualizarTamanhoPincel = function(){
	var that = this

	var tamanhoDoPincel = document.getElementById("rangeTamanhoPincel")

	tamanhoDoPincel.addEventListener("input", (event) => {
		that.pincelTamanho = tamanhoDoPincel.value
	})
}

App.prototype.actualizarPincelOpacidade = function(){
	var that = this

	var opacidade = document.getElementById("rangePincelOpacidade")

	opacidade.addEventListener("input", (event) => {
		that.pincelOpacidade = opacidade.value/100
	})
}

App.prototype.actualizarTamanhoLapis = function(){
	var that = this

	var tamanhoDoLapis = document.getElementById("rangeTamanhoLapis")

	tamanhoDoLapis.addEventListener("input", (event) => {
		that.lapisTamanho = tamanhoDoLapis.value
	})
}

App.prototype.actualizarLapisOpacidade = function(){
	var that = this

	var opacidade = document.getElementById("rangeLapisOpacidade")

	opacidade.addEventListener("input", (event) => {
		that.lapisOpacidade = opacidade.value/100
	})
}

App.prototype.actualizarTamanhoApagador= function(){
	var that = this

	var apagador = document.getElementById("rangeTamanhoApagador")

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

	var canvas2 = document.getElementById("segundacamada")
	var context2 = canvas2.getContext("2d")

	this.desenhandoNoDesktop(canvas, context, canvas2, context2)
	this.dimensionarCanvas(canvas)
	this.redimensionando(canvas)

	this.dimensionarCanvas(canvas2)
	this.redimensionando(canvas2)

	this.mudarEstadoMouse(canvas, context, context2)
	this.trocarFiguras()
	
	this.visibilidadeAuxilioFerramentas()
	this.esconderSeccao()
	this.esconderMenu()
	this.limparTela(canvas)
	this.preFigura()

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