function App(){
	this.mousedown = 0

	//CONFIGURACOES FIGURAS
	this.figuraBorda = 3
	this.figuraOpacidade = 1

	//CONFIGURACOES PINCEL
	this.pincelTamanho = 30
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
	this.ferramentaEmUso = 4

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

	//ALTERNAR OS BOTOES CUSTOMIZAR COR
	this.botaoCustomizarEmUso = 0

	//COR EM USO
	this.corFill = "#000"
	this.corStroke = "#000"

	//CUSTOMIZAR NORMAL
	this.normalR = 0
	this.normalG = 0
	this.normalB = 0

	//CUSTOMIZAR GRADIENTE
	this.gradiente1R = 0
	this.gradiente1G = 0
	this.gradiente1B = 0
	//////////////////////
	this.gradiente2R = 0
	this.gradiente2G = 0
	this.gradiente2B = 0

	//USO DO GRADIENTE
	this.gradienteActivo = false

	//COR DO GRADIENTE PARA DESENHO E BACKGROUND DA COR EM USO EM RGB
	this.gradienteCor1 = "rgb(0,0,0)"
	this.gradienteCor2 = "rgb(0,0,0)"

}
//===================================================================================///////////////

App.prototype.desenhandoNoDesktop = function(canvas, context, canvas2, context2){

	canvas.addEventListener("mousemove", (event) => {

		var posX = event.pageX; this.posGx = posX
		var posY = this.posGy = event.pageY

		if(this.mousedown){

			if(this.ferramentaEmUso == 2){

				this.figuras(canvas2, context2, posX, posY)

			}else if(this.ferramentaEmUso == 3){

				this.pincel(context, posX, posY)

			}else if(this.ferramentaEmUso == 4){

				this.lapis(context, posX, posY)

			}else if(this.ferramentaEmUso == 5){

				this.apagador(context, posX, posY)
			}

		}
		
	})
}
//===================================================================================///////////////

//=======================================================PALETA DE CORES

App.prototype.customizarNormal = function(){

	var rangeNormalR = document.getElementById("normalR")
	var rangeNormalG = document.getElementById("normalG")
	var rangeNormalB = document.getElementById("normalB")
	var that = this

	function makeThis(){
		that.atualizarCor( "rgb("+that.normalR+","+that.normalG+","+that.normalB+")" )
		that.gradienteActivo = false
	}	

	rangeNormalR.addEventListener("input", () => {
		this.normalR = rangeNormalR.value
		makeThis()
	})

	rangeNormalG.addEventListener("input", () => {
		this.normalG = rangeNormalG.value
		makeThis()
	})

	rangeNormalB.addEventListener("input", () => {
		this.normalB = rangeNormalB.value
		makeThis()
	})

}

App.prototype.customizarGradiente = function(context){

	var rangeGradiente1R = document.getElementById("gradiente1R")
	var rangeGradiente1B = document.getElementById("gradiente1G")
	var rangeGradiente1G = document.getElementById("gradiente1B")

	var rangeGradiente2R = document.getElementById("gradiente2R")
	var rangeGradiente2G = document.getElementById("gradiente2G")
	var rangeGradiente2B = document.getElementById("gradiente2B")
	var that = this

	//FUNCAO INTERNA
	function makeThis(){
		that.atualizarCor(  "rgb("+that.gradiente1R+","+that.gradiente1G+","+that.gradiente1B+")",
							"rgb("+that.gradiente2R+","+that.gradiente2G+","+that.gradiente2B+")",context)

		that.gradienteActivo = true
	}

	rangeGradiente1R.addEventListener("input", () => {
		this.gradiente1R = rangeGradiente1R.value
		makeThis()
	})

	rangeGradiente1G.addEventListener("input", () => {
		this.gradiente1G = rangeGradiente1G.value
		makeThis()
	})

	rangeGradiente1B.addEventListener("input", () => {
		this.gradiente1B = rangeGradiente1B.value
		makeThis()
	})

	rangeGradiente2R.addEventListener("input", () => {
		this.gradiente2R = rangeGradiente2R.value
		makeThis()
	})

	rangeGradiente2G.addEventListener("input", () => {
		this.gradiente2G = rangeGradiente2G.value
		makeThis()
	})

	rangeGradiente2B.addEventListener("input", () => {
		this.gradiente2B = rangeGradiente2B.value
		makeThis()
	})

}

//ALERTAR ENTRE CUSTOMZICAO NORMAL OU GRADIENTE
App.prototype.selecaoCorCustomizar = function(){

	var botoesCores = document.getElementsByClassName("botoesParaCores")
	var secoesCustomizar = document.getElementsByClassName("secoesCustomizar")
	var that = this

	for(let i = 0; i < botoesCores.length; i++){

		botoesCores[i].addEventListener("click", function(event){

			var selecionado = Number(this.getAttribute("data-customizar"))
			console.log(selecionado)

			if(selecionado){

				that.gradienteActivo = true
				that.atualizarCorEmUsoGrad(2)
	
			}else{
				
				that.gradienteActivo = false
				that.atualizarCorEmUsoGrad(1)

			}
			
			if(selecionado != that.botaoCustomizarEmUso){
				that.removerClasse(botoesCores[that.botaoCustomizarEmUso], "selecionarBotaoCor")
				that.removerClasse(secoesCustomizar[that.botaoCustomizarEmUso], "selecionarCustomizador")

				that.adicionarClasse(botoesCores[selecionado], "selecionarBotaoCor")
				that.adicionarClasse(secoesCustomizar[selecionado], "selecionarCustomizador")
			}

			that.botaoCustomizarEmUso = selecionado

		})
	}
}

App.prototype.selecionarCor = function(){

	var cores = document.getElementsByClassName("palCor")
	var that = this

	for(let i = 0; i < cores.length; i++){

		that.gradienteActivo = false

		cores[i].addEventListener("click", function(event){

			var cor = this.getAttribute("data-cor")
			that.atualizarCor(cor)
		})
	}
}

App.prototype.atualizarCor = function(cor, cor2=undefined, context=undefined){

	if(cor2 == undefined){
		this.corStroke = cor
		this.corFill  = cor
		this.atualizarCorEmUsoGrad(1)
		this.gradienteActivo = false
	}else{

		this.gradienteCor1 = cor
		this.gradienteCor2  = cor2
		this.atualizarCorEmUsoGrad(2)
	}

}

App.prototype.atualizarCorEmUsoGrad = function(tipo){
	var corEmUso = document.getElementById("corEmUsoCont")

	if(tipo == 1){
		corEmUso.style.backgroundImage = "none"
		corEmUso.style.backgroundColor = this.corFill
		console.log(this.corFill)
	}else{
		corEmUso.style.backgroundImage = "linear-gradient("+this.gradienteCor1+","+this.gradienteCor2+")"
	}
	
}

App.prototype.desenharComGradiente = function(context, posX, posY, tamanhoFiguraX, tamanhoFiguraY){
	this.gradientCor = context.createLinearGradient(posX-tamanhoFiguraX, posY-tamanhoFiguraY, posX, posY)
	this.gradientCor.addColorStop(0, this.gradienteCor1)
	this.gradientCor.addColorStop(1, this.gradienteCor2)
}

//===================================================================================///////////////

//=======================================================ESCONDER E MOSTRAR O MENU E OS REGULADORES DAS FERRAMENTAS
App.prototype.esconderMenu = function(){

	var caixaMenu = document.getElementById("menu")

	document.getElementById("navbar").addEventListener("click", () => {
		this.visMenu += 1

		if(this.visMenu%2){
			this.adicionarClasse(caixaMenu, "mostrarMenu")
		}else{
			this.removerClasse(caixaMenu, "mostrarMenu")
		}
	})
}

App.prototype.visibilidadeAuxilioFerramentas = function(){

	this.ferramentas = document.getElementsByClassName("todasFerramentas")
	var auxilios    = document.getElementsByClassName("caixaFerramentas")

	for(let i = 0; i < this.ferramentas.length; i++){

		this.ferramentas[i].addEventListener("click", (event) => {

			var ferramentaClicada = Number(event.target.getAttribute("data-ferramenta"))
			
			if(ferramentaClicada != 1){
				this.ferramentaEmUso = ferramentaClicada
			}
			
			if(ferramentaClicada != this.ferramentaActiva){

				if(this.ferramentaActiva){

					this.removerClasse(auxilios[this.ferramentaActiva-1], "mostrarAuxilio")
					this.adicionarClasse(auxilios[ferramentaClicada-1], "mostrarAuxilio")

				}else{
					this.adicionarClasse(auxilios[ferramentaClicada-1], "mostrarAuxilio")
				}

				this.ferramentaActiva = ferramentaClicada

			}else{
				this.removerClasse(auxilios[ferramentaClicada-1], "mostrarAuxilio")
				this.ferramentaActiva = 0
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

	context2.lineWidth = this.figuraBorda
	context2.globalAlpha = this.figuraOpacidade

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

	var tamanhoQuadradoX = posX-this.figuraX
	var tamanhoQuadradoY = posY-this.figuraY

	if(this.figuraPre%2){

		if(this.gradienteActivo){

			this.desenharComGradiente(context2, posX, posY, tamanhoQuadradoX, tamanhoQuadradoY)
			context2.fillStyle = this.gradientCor

		}else{
			context2.fillStyle = this.corFill
		}
		
		context2.fillRect(this.figuraX, this.figuraY, tamanhoQuadradoX, tamanhoQuadradoY)
	}else{

		if(this.gradienteActivo){

			this.desenharComGradiente(context2, posX, posY, tamanhoQuadradoX, tamanhoQuadradoY)
			context2.strokeStyle = this.gradientCor

			console.log("activo")

		}else{
			context2.strokeStyle = this.corStroke
		}

		context2.strokeRect(this.figuraX, this.figuraY, tamanhoQuadradoX, tamanhoQuadradoY)
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

		if(this.gradienteActivo){

			this.desenharComGradiente(context2, posX, posY, radius, radius)
			context2.fillStyle = this.gradientCor

		}else{

			context2.fillStyle = this.corFill
		}

		context2.fill()
	}else{

		if(this.gradienteActivo){

			this.desenharComGradiente(context2, posX, posY, radius, radius)
			context2.strokeStyle = this.gradientCor

		}else{
			
			context2.strokeStyle = this.corStroke
		}

		context2.stroke()
	}
}

App.prototype.desenharRecta = function(context2, posX, posY){

	if(this.gradienteActivo){

		this.desenharComGradiente(context2, this.figuraX, this.figuraY, posX, posY)
		context2.strokeStyle = this.gradientCor

	}else{
		context2.strokeStyle = this.corStroke
	}

	context2.beginPath()
	context2.moveTo(this.figuraX, this.figuraY)
	context2.lineTo(posX, posY)
	context2.stroke()
	context2.closePath()
}

App.prototype.trocarFiguras = function(){

	var todasFiguras = document.getElementsByClassName("selFig")

	for(let i = 0; i < todasFiguras.length; i++){

		todasFiguras[i].addEventListener("click", (event) => {

			var elemento = event.target.getAttribute("data-figura")
			this.tipoFigura = Number(elemento)
		})
	}
}

//ALTERNAR ENTRE DESENHAR A FIGURA COM PREENCHIMENTO INTERNO OU SEM PREENCHIMENTO
App.prototype.preFigura = function(){
	var botaoFi = document.getElementById("botaoP")

	botaoFi.addEventListener("click", (event) => {
		this.figuraPre += 1

		if(this.figuraPre%2){
			this.adicionarClasse(botaoFi, "preencherFiguras")
		}else{
			this.removerClasse(botaoFi, "preencherFiguras")
		}
	})
}
//===================================================================================///////////////


//=================================================================FERRAMENTAS
App.prototype.lapis = function(context, posX, posY){

	if(this.gradienteActivo){

		this.desenharComGradiente(context, posX, posY, this.lapisTamanho, this.lapisTamanho)
		context.strokeStyle = this.gradientCor

	}else{
		context.strokeStyle = this.corStroke
	}

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

	if(this.gradienteActivo){

		this.desenharComGradiente(context, posX, posY, this.pincelTamanho, this.pincelTamanho)
		context.fillStyle = this.gradientCor

	}else{

		context.fillStyle = this.corFill
	}

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

	buttonLimparTela.addEventListener("click", () => {
		this.dimensionarCanvas(canvas)
	})
}
//=============================================PARA INFORMAR QUANDO O MOUSE FOI PRESSIONADO OU LARGADO
App.prototype.mudarEstadoMouse = function(canvas, context, context2){

	canvas.addEventListener("mousedown", (event) =>{
		this.mousedown = 1

		//ATUALIZANDO A ULTIMA POSICAO DO MOUSE
		this.lPosX = event.clientX
		this.lPosy = event.clientY
	})

	canvas.addEventListener("mouseup", (event) =>{
		this.mousedown = 0

		//CASO ESTEJA SE DESENHANDO ALGUMA FIGURA, DESENHAR AS POSICOES FINAIS E LIMPAR A SEGUNDA CAMADA
		if(this.figuraX != undefined){
			context2.clearRect(0, 0, canvas.width, canvas.height)
			this.figuras(canvas, context, this.finalFiguraX, this.finalFiguraY, 0)

		}

		//SETANDO A POSICAO INICIAL PARA A CRIACAO DAS FIGURAS PARA INDIFINIDO
		this.figuraX = undefined
		this.figuraY = undefined

	})
}
//===================================================================================///////////////

App.prototype.esconderSeccao = function(){

	setInterval(() => {

		if(this.mousedown){
			if(this.existeClasse("footer", "esconderFerramentas") == -1){
				this.adicionarClasse("footer", "esconderFerramentas")
			}
		}else{
			this.removerClasse("footer", "esconderFerramentas")
		}

	}, 100)
}

//==================================================ACTUALIZACAO DOS TAMANHOS DAS FERRAMENTAS E OPACIDADE
App.prototype.actualizarBordaFigura = function(){

	var bordaFigura = document.getElementById("rangeBordaFigura")

	bordaFigura.addEventListener("input", (event) => {
		this.figuraBorda = bordaFigura.value
	})
}

App.prototype.actualizarOpacidadeFigura = function(){

	var opacidade = document.getElementById("rangeOpacidadeFigura")

	opacidade.addEventListener("input", (event) => {
		this.figuraOpacidade = opacidade.value/100
	})
}

App.prototype.actualizarTamanhoPincel = function(){

	var tamanhoDoPincel = document.getElementById("rangeTamanhoPincel")

	tamanhoDoPincel.addEventListener("input", (event) => {
		this.pincelTamanho = tamanhoDoPincel.value
	})
}

App.prototype.actualizarPincelOpacidade = function(){

	var opacidade = document.getElementById("rangePincelOpacidade")

	opacidade.addEventListener("input", (event) => {
		this.pincelOpacidade = opacidade.value/100
	})
}

App.prototype.actualizarTamanhoLapis = function(){

	var tamanhoDoLapis = document.getElementById("rangeTamanhoLapis")

	tamanhoDoLapis.addEventListener("input", (event) => {
		this.lapisTamanho = tamanhoDoLapis.value
	})
}

App.prototype.actualizarLapisOpacidade = function(){

	var opacidade = document.getElementById("rangeLapisOpacidade")

	opacidade.addEventListener("input", (event) => {
		this.lapisOpacidade = opacidade.value/100
	})
}

App.prototype.actualizarTamanhoApagador= function(){

	var apagador = document.getElementById("rangeTamanhoApagador")

	apagador.addEventListener("input", (event) => {
		this.tamanhoApagador = apagador.value
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

	window.addEventListener("resize", () => {
		this.dimensionarCanvas(canvas)
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

	//FIGURAS
	this.trocarFiguras()
	this.preFigura()
	
	this.visibilidadeAuxilioFerramentas()
	this.esconderSeccao()
	this.esconderMenu()
	this.limparTela(canvas)

	//PALETA DE CORES
	this.selecaoCorCustomizar()
	this.selecionarCor()
	this.customizarNormal()
	this.customizarGradiente(context)

	//ACTUALIZAR FERRAMENTAS
	this.actualizarTamanhoApagador()

	this.actualizarTamanhoLapis()
	this.actualizarLapisOpacidade()

	this.actualizarTamanhoPincel()
	this.actualizarPincelOpacidade()

	this.actualizarBordaFigura()
	this.actualizarOpacidadeFigura()
}

window.onload = () =>{
	var app = new App()
	app.executarMetodos()
}