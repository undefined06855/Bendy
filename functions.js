function toggleMax()
{
    file.other.secretFound = !file.other.secretFound
    max++
    if (max % 2 == 0)
    {
        document.getElementById("scale").max =  maxes[0][0]
        document.getElementById("scale2").max = maxes[0][1]
        document.getElementById("scale4").max = maxes[0][2]
        document.getElementById("scale3").max = maxes[0][3]
        document.getElementById("scale5").max = maxes[0][4]
    }
    else
    {
        document.getElementById("scale").max =  maxes[1][0]
        document.getElementById("scale2").max = maxes[1][1]
        document.getElementById("scale4").max = maxes[1][2]
        document.getElementById("scale3").max = maxes[1][3]
        document.getElementById("scale5").max = maxes[1][4]
    }
}

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
    filename = document.getElementById("filenameInput").value.replace(".bline", "") + ".bline"

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
        document.getElementById("zoom").value = file.line.zoom

        document.getElementById("scaleLabel").innerText = `Speed (${document.getElementById("scale").value}): `
        document.getElementById("scaleLabel2").innerText = `Length (${document.getElementById("scale2").value}): `
        document.getElementById("scaleLabel4").innerText = `Distance (${document.getElementById("scale4").value}): `
        document.getElementById("scaleLabel3").innerText = `Change (${document.getElementById("scale3").value}): `
        document.getElementById("scaleLabel5").innerText = `Size (${document.getElementById("scale5").value}): `

        document.getElementById("zoomLabel").innerText = `Zoom (${(1/document.getElementById("zoom").value).toFixed(2)}): `

        document.getElementById("labelCh").checked = file.other.label
        document.getElementById("linesCh").checked = file.other.lines
        document.getElementById("largerCh").checked = file.other.secretFound

        if (file.line.zoom)
        {
            canvas.width = 500 * file.line.zoom
            canvas.height = 500 * file.line.zoom
            center.x = canvas.width / 2
            center.y = canvas.height / 2
    
        }
    }
    reader.readAsText(f)
}

// pointClass

class Point {
    constructor(x, y, label = "N/A", r = 2)
    {
        this.radius = r
        this.x = x
        this.y = y
        this.l = label
    }

    draw(list = false, drawTo = center)
    {
        const nx = this.x + center.x
            , ny = this.y + center.y

            , dtx = (drawTo !== center ? drawTo.x + center.x : drawTo.x)
            , dty = (drawTo !== center ? drawTo.y + center.y : drawTo.y)

        ctx.beginPath();
        if (file.other.label)
        {
            ctx.font = "12px monospace"
            ctx.fillText(this.l, nx+this.radius+labelOffset, ny-this.radius+labelOffset)
        }

        if ( !(
                nx < 0-this.radius ||
                nx > canvas.width + this.radius ||
                nx < 0-this.radius ||
                nx > canvas.height + this.radius
            )
        ) {
            ctx.arc(nx, ny, this.radius, 0, 2 * Math.PI, false);
            ctx.fill();    
        }

        if (file.other.lines)
        {
            ctx.beginPath()
            ctx.moveTo(nx, ny)
            ctx.lineTo(dtx, dty)
            ctx.stroke()
        }

    }

    rotate(angle)
    {
        const rad = angle * (Math.PI / 180)
        //console.log(`Rotating with angle ${angle}deg and ${rad}rad`)

        return new Point (
            ( this.x * Math.cos(rad) ) - ( this.y * Math.sin(rad) ),
            ( this.x * Math.sin(rad) ) + ( this.y * Math.cos(rad) ),
            this.l,
            this.radius
        )
    }
}

