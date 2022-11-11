# Help for Bendy
---
## Sliders
Most sliders are self-explanatory, such as speed or length, and most can be figured out with a bit of tinkering. But here is a full description of each of them anyway.
#### Speed
This slider controls the speed of the line, more specifically the amplitude of the sine wave used to create the swinging motion. This will not take effect if the line is paused (by pressing the `Pause` button)
#### Length
This slider controls how many points are in the line. >350 points may start to lag lower-end devices, especially with a high `Size`.
#### Distance
This slider controls how far away each point is from each other. The actual Y-coordinate of the point at rotation value 0 is derived from the equation
```
i * distance
```
where `i` is the index of the point and `distance` is the value of the distance slider.
#### Change
This slider controls how bendy the curve is. It's used in the equation to derive the rotation of the point (see README.md).
#### Size
This slider controls the change in size for each point, where `n` is the index of the point.

---
## Checkboxes
There are only a few checkboxes, but if you really need it... Here you go.
#### Labels
This checkbox determines if the `point 0` `point 1` `etc...` shows up or not.
#### Lines
This checkbox determines if the lines between points show up or not.

---
## Buttons
Clicky click. These are some useful buttons, and they are entirely self-explanatory.
#### Play / Pause
This button plays and pauses the line. Don't worry though - playing and pausing is also exported with the file, so if you find a good frame to pause it on, you can show all your friends by exporting it.
#### Export / Import settings
These buttons export or import a `.bline` or a `.json` file. You can change the name of the file that saves by using the filename box at the top of the screen.
A `.bline` file is just a plain-text `json` file. An example can be found in [`example.bline`](/example.bline)
#### Help
...really? You needed an explanation for this? YOU CLICKED ON IT!

---
## Colours
Colours are determined on a `hsv` scale, where the hue is the `y` value of the dot, and the saturation and value are both 50%
