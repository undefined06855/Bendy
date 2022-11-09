function toggleMax()
{
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
        if (list)
        {
            ctx.font = "12px monospace"
            ctx.fillText(this.l, nx+6, ny-6)
        }
        ctx.arc(nx, ny, this.radius, 0, 2 * Math.PI, false);
        ctx.fill();

        ctx.beginPath()
        ctx.moveTo(nx, ny)
        ctx.lineTo(dtx, dty)
        ctx.stroke()
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

