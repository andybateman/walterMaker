# walterMaker
A little javascript to create an imitation of Gordon Walters Koru series of work, you know, without the artistic creativity.

Open the [demo here](https://raw.githack.com/andybateman/walterMaker/master/index.html)

---

## Parameters

Parameters are passed as URL query strings, e.g. `?rows=7&fillColour=c00&bgColour=fff`.

| Parameter | Default | Description |
|---|---|---|
| `rows` | `13` | Number of rows. Odd numbers ensure the pattern starts and ends with the background colour. |
| `fillColour` | `000` | Koru fill colour as a hex value without `#` (e.g. `c00` for red). |
| `bgColour` | `fff` | Background colour as a hex value without `#`. |
| `width` | browser width | Canvas width in pixels. Rendered at half size for retina displays. |
| `height` | browser height | Canvas height in pixels, snapped to a row multiple. Rendered at half size. |

---

Have a look at http://en.wikipedia.org/wiki/Gordon_Walters to learn more about his work.
