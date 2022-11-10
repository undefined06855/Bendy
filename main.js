// yes this is built on wordToShape...

const canvas = document.querySelector("canvas")
    , ctx = canvas.getContext("2d")
    , center = new Point(canvas.width / 2, canvas.height / 2, "", 0)

    , offset = 90

    , maxes = [
        [5, 20, 100, 5, 15],
        [10, 500, 500, 30, 30],
    ]


var speed = 1.25
  , length = 4
  , change = .8
  , dist = 50
  , size = 2

  , hasSecret = false


  , labelOffset = 2
  , max = 0

  , pl = []

  , label = true
  , lines = true


canvas.addEventListener("click", () => {
    canvas.style.cursor = "default"
    document.getElementById("secretBox").style.scale = "1"
})

function exportSettings()
{
    const copy = `Speed: ${speed},\nLength: ${length-1},\nDistance: ${dist},\nChange: ${change},\nSize: ${size}${(()=>{var p="";if(!label){p+="\n\nWithout labels";if(!lines)p+=" and lines"}else if(!lines)p+="\n\nWithout lines";return p})()}${hasSecret?"\n\nYou may need to find a secret to be able to do these settings...":""}\n\nhttps://undefined06855.github.io/Bendy`

    navigator.clipboard.writeText(copy)
    console.log(copy)

    document.querySelector("button").innerText = "Copied to clipboard!"
    setTimeout(() => {
        document.querySelector("button").innerText = "Export settings"
    }, 2000)
}

// frame
function dp()
{
    ctx.clearRect(0, 0, canvas.width, canvas.height)

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
    speed = Number(document.getElementById("scale").value)
    document.getElementById('scaleLabel').innerText = `Speed (${document.getElementById("scale").value}): `
})

document.getElementById("scale2").addEventListener("input", () => {
    length = Number(document.getElementById("scale2").value) + 1
    document.getElementById('scaleLabel2').innerText = `Length (${document.getElementById("scale2").value}): `
})

document.getElementById("scale4").addEventListener("input", () => {
    dist = Number(document.getElementById("scale4").value)
    document.getElementById('scaleLabel4').innerText = `Distance (${document.getElementById("scale4").value}): `
})

document.getElementById("scale3").addEventListener("input", () => {
    change = Number(document.getElementById("scale3").value)
    document.getElementById('scaleLabel3').innerText = `Change (${document.getElementById("scale3").value}): `
})

document.getElementById("scale5").addEventListener("input", () => {
    size = Number(document.getElementById("scale5").value)
    document.getElementById('scaleLabel5').innerText = `Size (${document.getElementById("scale5").value}): `
})

requestAnimationFrame(dp)
