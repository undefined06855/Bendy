// yes this is built on wordToShape...

const version = 0.6

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

file.other.secretFound = false
file.other.label = true
file.other.lines = true


canvas.addEventListener("click", () => {
    canvas.style.cursor = "default"
    document.getElementById("secretBox").style.scale = "1"
})

function downloadFile(data, filename, type) {
    var file = new Blob([data], {type: type});
    if (window.navigator.msSaveOrOpenBlob) // IE10+
        window.navigator.msSaveOrOpenBlob(file, filename);
    else { // Others
        var a = document.createElement("a"),
                url = URL.createObjectURL(file);
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        setTimeout(function() {
            document.body.removeChild(a);
            window.URL.revokeObjectURL(url);  
        }, 0); 
    }
}

function exportSettings()
{
    filename = document.getElementById("filenameInput").value + ".bline"

    //https://stackoverflow.com/a/30832210
    var file2 = JSON.stringify(file)
    var f = new Blob([file2], {type: "text/json"});
    if (window.navigator.msSaveOrOpenBlob) // IE10+
        window.navigator.msSaveOrOpenBlob(f, filename);
    else { // Others
        var a = document.createElement("a"),
                url = URL.createObjectURL(f)
        a.href = url
        a.download = filename
        document.body.appendChild(a)
        a.click()
        setTimeout(function() {
            document.body.removeChild(a)
            window.URL.revokeObjectURL(url)
        }, 0)
    }
    console.log(file)
}

function importSettings(importer)
{
    var f = importer.target.files[0]
    if (!f) return
    var reader = new FileReader()
    reader.onload = e => {
        file = JSON.parse(e.target.result)

        document.getElementById("scale").value = file.line.speed
        document.getElementById("scale2").value = file.line.length
        document.getElementById("scale4").value = file.line.distance
        document.getElementById("scale3").value = file.line.change
        document.getElementById("scale5").value = file.line.size

        document.getElementById("scaleLabel").innerText = `Speed (${document.getElementById("scale").value}): `
        document.getElementById("scaleLabel2").innerText = `Length (${document.getElementById("scale2").value}): `
        document.getElementById("scaleLabel4").innerText = `Distance (${document.getElementById("scale4").value}): `
        document.getElementById("scaleLabel3").innerText = `Change (${document.getElementById("scale3").value}): `
        document.getElementById("scaleLabel5").innerText = `Size (${document.getElementById("scale5").value}): `

        document.getElementById("labelCh").checked = file.other.label
        document.getElementById("linesCh").checked = file.other.lines
    }
    reader.readAsText(f)
}

document.getElementById("file-input").addEventListener("change", importSettings, false);

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
        
        var rot = Math.sin(Date.now() * (speed/300)) * (i*change*10)
          , n = p.rotate(rot)

        if (pl.length == 0) n.draw(label)
        else                n.draw(label, pl[pl.length - 1])

        pl.push(n)
    }

    requestAnimationFrame(dp)
}

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
    document.getElementById("scaleLabel5").innerText = `Size (${document.getElementById("scale5").value}): `
})

requestAnimationFrame(dp)
