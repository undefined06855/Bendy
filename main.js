// yes this is built on wordToShape...

const version = 0.8

    , canvas = document.querySelector("canvas")
    , ctx = canvas.getContext("2d")
    , center = new Point(canvas.width / 2, canvas.height / 2, "", 0)

    , offset = 90

    , maxes = [
        [5, 20, 100, 5, 15],
        [10, 500, 500, 30, 30],
    ]

var labelOffset = 2
  , max = 0

  , pl = []

  , label = true
  , lines = true

  , file = {}


document.querySelector("h1").innerText += " " + version

file.version = version

file.line = {}
file.other = {}

file.line.speed = 1.25
file.line.length = 4
file.line.change = .8
file.line.dist = 50
file.line.size = 2
file.line.zoom = 1

file.line.frame = -1
file.line.playing = true

file.other.secretFound = false
file.other.label = true
file.other.lines = true

// frame
function dp()
{
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    speed = file.line.speed
    length = file.line.length
    change = file.line.change
    dist = file.line.dist
    size = file.line.size

    pl = []
    for (var i = 0; i < length; i++)
    {
        const p = new Point(0, i*dist, "point "+i, i*size)
        
        if (file.line.playing)
            var rot = Math.sin(Date.now() * (speed/300)) * (i*change*10)
        else
            var rot = Math.sin(file.line.frame * (speed/300)) * (i*change*10)
        const n = p.rotate(rot)
        
        
        ctx.fillStyle = `hsl(${convertTo360(n.y, -canvas.height, canvas.height)}deg, 50%, 50%)`

        if (pl.length == 0) n.draw(label)
        else                n.draw(label, pl[pl.length - 1])

        pl.push(n)
    }

    requestAnimationFrame(dp)
}

canvas.addEventListener("click", () => {
    canvas.style.cursor = "default"
    document.getElementById("secretBox").style.scale = "1"
})

document.getElementById("fileInput").addEventListener("change", importSettings, false);

document.getElementById("scale").addEventListener("input", () => {
    file.line.speed = Number(document.getElementById("scale").value)
    document.getElementById("scaleLabel").innerText = `Speed (${document.getElementById("scale").value}): `
})

document.getElementById("scale2").addEventListener("input", () => {
    file.line.length = Number(document.getElementById("scale2").value) + 1
    document.getElementById("scaleLabel2").innerText = `Length (${document.getElementById("scale2").value}): `
})

document.getElementById("scale4").addEventListener("input", () => {
    file.line.dist = Number(document.getElementById("scale4").value)
    document.getElementById("scaleLabel4").innerText = `Distance (${document.getElementById("scale4").value}): `
})

document.getElementById("scale3").addEventListener("input", () => {
    file.line.change = Number(document.getElementById("scale3").value)
    document.getElementById("scaleLabel3").innerText = `Change (${document.getElementById("scale3").value}): `
})

document.getElementById("scale5").addEventListener("input", () => {
    file.line.size = Number(document.getElementById("scale5").value)
    document.getElementById("scaleLabel5").innerText = `Size (${document.getElementById("scale5").value + "n"}): `
})

document.getElementById("zoom").addEventListener("input", () => {
    file.line.zoom = Number(document.getElementById("zoom").value)
    document.getElementById("zoomLabel").innerText = `Zoom (${(1/document.getElementById("zoom").value).toFixed(2)}): `

    canvas.width = 500 * file.line.zoom
    canvas.height = 500 * file.line.zoom

    center.x = canvas.width / 2
    center.y = canvas.height / 2
})

document.getElementById("pausebtn").addEventListener("click", () => {
    if (file.line.playing)
    {
        document.getElementById("pausebtn").innerText = "Play"
        file.line.frame = Date.now()
    }
    else
    {
        document.getElementById("pausebtn").innerText = "Pause"
        file.line.frame = -1
    }
    file.line.playing = !file.line.playing
})

document.getElementById("helpbtn").addEventListener("click", () => {
    console.log("good luck!")
    window.location.href = "https://github.com/undefined06855/Bendy/blob/1fb17327ef372fe5a7834e02f8b3c04152193fa8/HELP.md"
})

requestAnimationFrame(dp)
