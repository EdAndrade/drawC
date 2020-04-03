var app = {

	mousedown: 0,

	redimensionarCanvas: function(canvas){
		canvas.width = window.innerWidth
		canvas.height = window.innerHeight
	},

	desenhandoComCanvas: function(canvas, context){

		canvas.addEventListener("mousemove", (event) => {
			var posX = event.pageX
			var posY = event.pageY

			if(this.mousedown){
				context.beginPath()
				context.arc(posX, posY, 2, 0, Math.PI*2, false)
				context.closePath()
				context.fill()
				console.log(posX, posY);
			}
		})
	},

	mudarEstadoDoMouse: function(canvas){

		canvas.addEventListener("mousedown", (event) =>{
			this.mousedown = 1
		})

		canvas.addEventListener("mouseup", (event) =>{
			this.mousedown = 0
		})
	}

}

window.addEventListener("load", () => {
	var canvas = document.getElementById("canvas")
	var context = canvas.getContext("2d")

	app.redimensionarCanvas(canvas)
	app.mudarEstadoDoMouse(canvas)
	app.desenhandoComCanvas(canvas, context)
});

window.addEventListener("resize", () => {
	redimensionarCanvas(canvas)
})