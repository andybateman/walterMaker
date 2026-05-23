# walterMaker
A little javascript to create an imitation of Gordon Walters Koru series of work, you know, without the artistic creativity.

Open the [demo here](https://raw.githack.com/andybateman/walterMaker/master/index.html)

---

## Usage

- **Click** anywhere on the canvas to regenerate a new pattern.
- **Right-click** (or long-press on touch devices) to open the configuration menu:
  - Choose a colour **preset** or pick custom fill and background colours
  - Set the number of **rows** (odd numbers look best — even values are nudged automatically)
  - **Redraw** applies your settings
  - **Copy link** updates the URL with current settings and copies it to the clipboard
  - **Start/stop animation** cycles through new patterns every 2 seconds
  - **Save image** downloads the current canvas as a PNG

---

## URL Parameters

Parameters can also be set via URL query string, e.g. `?rows=7&fillColour=c00&bgColour=fff`.

| Parameter | Default | Description |
|---|---|---|
| `rows` | `13` | Number of rows. Odd numbers ensure the pattern starts and ends with the background colour. |
| `fillColour` | `000` | Koru fill colour as a hex value without `#` (e.g. `c00` for red). |
| `bgColour` | `fff` | Background colour as a hex value without `#`. |
| `width` | browser width | Canvas width in pixels. Rendered at half size for retina displays. |
| `height` | browser height | Canvas height in pixels, snapped to a row multiple. Rendered at half size. |

---

Have a look at http://en.wikipedia.org/wiki/Gordon_Walters to learn more about his work.
