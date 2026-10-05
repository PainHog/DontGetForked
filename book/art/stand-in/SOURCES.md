# Stand-in art: sources and checks

Public-domain prints standing in until the illustrator's work arrives (decided by Richard on 2026-10-05; `docs/DESIGN.md`). Every piece was checked against its Wikimedia Commons licence data on 2026-10-05 (CC0 museum release or public domain; no restrictions recorded), looked at, and audited against `book/art/ART-CHECKLIST.md`. No monster is shown: the Entities stay placeholders for the illustrator.

`book/tools/prep-art.py` downloads each scan, crops it (fractions in `manifest.json`), turns it into a two-tone image from the book's ink to its paper colour, and saves the JPEG used by the build. The pieces are credited on the credits page.

**Rights rule used:** keep a print only if its Commons licence is CC0 or public domain, the artist died before 1955 and the work was published before 1930. Rejected during the search: a CC-BY-SA photo, a scan from a commercial print seller, and an etching whose artist couldn't be confirmed. Rejected for content: a gallows, a blackface mask, crude scenes, an anti-Catholic print, torture devices and a corpse.

## cover-castle: Front cover

- **Work:** Kasteel op een klif, RP-P-1892-A-17662.jpg
- **Artist:** Anton Louis Koster (Dutch, 1859-1937); 1869-1892 (in the Rijksmuseum by 1892)
- **Source:** https://commons.wikimedia.org/wiki/File:Kasteel_op_een_klif,_RP-P-1892-A-17662.jpg
- **Licence:** CC0 (CC-zero). Rijksmuseum Amsterdam scan released CC0; artist died 1937 (more than 70 years ago) and the print dates from before 1892.
- **Audit:** Castle on its cliff, bridge on its piers over water, roofs on the bank, moon and clouds in the sky: all supported. No figures. Inventory number and signature cropped off.

## part1-tower: Part One title page

- **Work:** Samuel Palmer - The Lonely Tower - Google Art Project (2397075).jpg
- **Artist:** Samuel Palmer (British, 1805-1881); 1879 (etching for Milton's Il Penseroso)
- **Source:** https://commons.wikimedia.org/wiki/File:Samuel_Palmer_-_The_Lonely_Tower_-_Google_Art_Project_(2397075).jpg
- **Licence:** Public domain (PD-Art|PD-old-100-1923|deathyear=1881). Palmer died 1881; published 1879; PD-Art.
- **Audit:** Ruined tower on its hill, trees rooted on the slope, crescent moon on the horizon. No figures in the crop.

## part2-village: Part Two title page

- **Work:** Dorpje aan het water, bij maanlicht, RP-P-1995-419.jpg
- **Artist:** Carl Bloch (Danish, 1834-1890); 1881
- **Source:** https://commons.wikimedia.org/wiki/File:Dorpje_aan_het_water,_bij_maanlicht,_RP-P-1995-419.jpg
- **Licence:** CC0 (CC-zero). Rijksmuseum Amsterdam scan released CC0; artist died 1890.
- **Audit:** Houses on the shore, moon in the sky. No figures. Signature cropped off.

## ch01-castle: Chapter 1 header

- **Work:** Idylls of the King 3.jpg
- **Artist:** Gustave Doré (French, 1832-1883); engraved on steel for the Moxon edition; Tennyson, Enid, London: Edward Moxon & Co., 1867-68
- **Source:** https://commons.wikimedia.org/wiki/File:Idylls_of_the_King_3.jpg
- **Licence:** Public domain (PD-Art|PD-old-auto-expired|deathyear=1883). Doré died 1883; published 1867-68; PD-Art / PD-old-auto-expired (deathyear 1883).
- **Audit:** Castle on its crag; towers cut by the bottom frame edge, deliberately (the crag continues out of frame). The mounted figure of the original is cropped out.

## ch02-curiosities: Chapter 2 header

- **Work:** RitrattoMuseoFerranteImperato.jpg
- **Artist:** Anonymous engraver for Ferrante Imperato; Dell'Historia Naturale, Naples, 1599
- **Source:** https://commons.wikimedia.org/wiki/File:RitrattoMuseoFerranteImperato.jpg
- **Licence:** Public domain (PD-art|PD-old-100). Published 1599; PD-art.
- **Audit:** Specimens are fixed to the vaulted ceiling and shelves as in a real cabinet; shelving and a stuffed bird cut by the frame edge, deliberately. The visitors of the original are cropped out.

## ch03-dice: Chapter 3 header

- **Work:** Drie dobbelaars bij kaarslicht, RP-P-OB-75.053.jpg
- **Artist:** Anonymous (Netherlands); 1600-1700
- **Source:** https://commons.wikimedia.org/wiki/File:Drie_dobbelaars_bij_kaarslicht,_RP-P-OB-75.053.jpg
- **Licence:** CC0 (CC-zero). Rijksmuseum Amsterdam scan released CC0; anonymous 17th-century print.
- **Audit:** Three players at a table by candlelight; the candlestick and the players' hands rest on the tabletop (no dice are visible at this size). Counted: the left and middle players show two eyes in three-quarter view, the right-hand player is in profile (one eye, correctly); arms join at the shoulders. Colour strip and inventory number cropped off.

## ch04-parade: Chapter 4 header

- **Work:** Fakkeloptocht door een stad, RP-P-1903-A-23931.jpg
- **Artist:** Jacob Folkema (Dutch, 1692-1767); 1702-1767 (book illustration, 'Tom. I Pag. 267')
- **Source:** https://commons.wikimedia.org/wiki/File:Fakkeloptocht_door_een_stad,_RP-P-1903-A-23931.jpg
- **Licence:** CC0 (CC-zero). Rijksmuseum Amsterdam scan released CC0; artist died 1767.
- **Audit:** Costumed figures in ruffs and feathered hats in a doorway and at the left; the torch on the left is held in a hand, the lower torches rise from the bottom edge, held by marchers below the frame (a deliberate crop). Faces have two eyes each. Plate border trimmed.

## ch05-bellman: Chapter 5 header

- **Work:** Samuel Palmer - The Bellman - Google Art Project.jpg
- **Artist:** Samuel Palmer (British, 1805-1881); 1879 (etching for Milton's Il Penseroso)
- **Source:** https://commons.wikimedia.org/wiki/File:Samuel_Palmer_-_The_Bellman_-_Google_Art_Project.jpg
- **Licence:** Public domain (PD-Art|PD-old-100-1923|deathyear=1881). Palmer died 1881; published 1879; PD-Art.
- **Audit:** Cottages on the ground, smoke rising from chimneys, cattle lying in the field, a figure standing on the path. No floating objects.

## ch06-crowd: Chapter 6 header

- **Work:** Félix Vallotton, La Manifestation (The Demonstration), 1893, NGA 42211.jpg
- **Artist:** Félix Vallotton (Swiss-French, 1865-1925); 1893
- **Source:** https://commons.wikimedia.org/wiki/File:F%C3%A9lix_Vallotton,_La_Manifestation_(The_Demonstration),_1893,_NGA_42211.jpg
- **Licence:** CC0 (CC0). Vallotton died 1925 (PD-old-100 from 2026); published 1893; National Gallery of Art scan, CC0.
- **Audit:** Running figures caught mid-stride (Vallotton's style: solid black shapes); heads and feet cut by the frame edge, deliberately. The fallen figure and the flying hat of the original are cropped out.

## ch07-dawn: Chapter 7 header

- **Work:** Samuel Palmer - Opening the Fold - Google Art Project.jpg
- **Artist:** Samuel Palmer (British, 1805-1881); 1880 (etching)
- **Source:** https://commons.wikimedia.org/wiki/File:Samuel_Palmer_-_Opening_the_Fold_-_Google_Art_Project.jpg
- **Licence:** Public domain (PD-Art|PD-old-100-1923|deathyear=1881). Palmer died 1881; PD-Art.
- **Audit:** Trees rooted, shepherd standing, sheep on the ground, sun rays rising. No floating objects.

## ch08-town: Chapter 8 header

- **Work:** Schedelsche Weltchronik Trier 1497.jpg
- **Artist:** Michael Wolgemut (1434-1519) and Wilhelm Pleydenwurff (c.1460-1494) workshop, for Hartmann Schedel (1440-1514); Nuremberg Chronicle, 1493 (this impression from the 1497 edition)
- **Source:** https://commons.wikimedia.org/wiki/File:Schedelsche_Weltchronik_Trier_1497.jpg
- **Licence:** Public domain (PD-Old-100). All makers died around 1500; PD-old-100.
- **Audit:** Walled town, buildings on their foundations, a statue on its column; the town continues past the frame. Title lettering cropped off.

## back-moonrise: Back cover

- **Work:** Samuel Palmer, The Rising Moon, 1857, NGA 119976.jpg
- **Artist:** Samuel Palmer (British, 1805-1881); 1857 (Etching Club)
- **Source:** https://commons.wikimedia.org/wiki/File:Samuel_Palmer,_The_Rising_Moon,_1857,_NGA_119976.jpg
- **Licence:** CC0 (CC0). Palmer died 1881; National Gallery of Art scan, CC0.
- **Audit:** Sheep lying in the field, a figure standing, cypresses and moon. Signature cropped off.

## spot-watchman: Spot (Chapter 5 end)

- **Work:** Nachtwaker, RP-P-OB-14.117.jpg
- **Artist:** Daniel Nikolaus Chodowiecki (German-Polish, 1726-1801); 1779
- **Source:** https://commons.wikimedia.org/wiki/File:Nachtwaker,_RP-P-OB-14.117.jpg
- **Licence:** CC0 (CC-zero). Rijksmuseum Amsterdam scan released CC0; artist died 1801.
- **Audit:** Night watchman standing on the street, the halberd held in his right hand with its foot on the ground, his left hand on his sword hilt, lanterns hung from brackets. Two eyes, two hands, two feet.

## spot-cart: Spot (Chapter 7 end)

- **Work:** Boerin op een paardenkar met twee wielen, RP-P-BI-1178.jpg
- **Artist:** Gerrit Claesz. Bleker (Dutch, c.1592-1656); 1643
- **Source:** https://commons.wikimedia.org/wiki/File:Boerin_op_een_paardenkar_met_twee_wielen,_RP-P-BI-1178.jpg
- **Licence:** CC0 (CC-zero). Rijksmuseum Amsterdam scan released CC0; artist died 1656.
- **Audit:** Horse in harness with all four hooves on the ground, cart wheels on the road, the driver walking beside it, a woman seated on the load. Inscription cropped off.

## spot-lantern: Spot (Chapter 1 end)

- **Work:** Lantaarn, RP-P-BI-6405X.jpg
- **Artist:** Jacobus Ludovicus Cornet (Dutch, 1815-1882); 1825-1882
- **Source:** https://commons.wikimedia.org/wiki/File:Lantaarn,_RP-P-BI-6405X.jpg
- **Licence:** CC0 (CC-zero). Rijksmuseum Amsterdam scan released CC0; artist died 1882.
- **Audit:** A lantern standing on a ledge in a dark room; the ledge is visible under it.

## spot-owl: Spot (Chapter 2 end)

- **Work:** Bewick Thomas Barn Owl Tyto alba.png
- **Artist:** Thomas Bewick (British, 1753-1828); A History of British Birds, vol. 1, 1797 (scan from the 1847 edition)
- **Source:** https://commons.wikimedia.org/wiki/File:Bewick_Thomas_Barn_Owl_Tyto_alba.png
- **Licence:** Public domain (PD-old-auto-expired|deathyear=1828). Bewick died 1828; PD-old-auto-expired.
- **Audit:** Owl perched on a stump, talons gripping the bark; stump rooted, leaves attached to branches. Two eyes, two feet. Printed caption cropped off.

## spot-windmill: Spot (Chapter 6 end)

- **Work:** Landschap met molen bij maanlicht, RP-P-BI-6653.jpg
- **Artist:** Johannes van Cuylenburgh (Dutch, c.1772-1841); 1803-1841
- **Source:** https://commons.wikimedia.org/wiki/File:Landschap_met_molen_bij_maanlicht,_RP-P-BI-6653.jpg
- **Licence:** CC0 (CC-zero). Rijksmuseum Amsterdam scan released CC0; artist died 1841.
- **Audit:** Windmill on its post, cottages on the bank, a boat on the water with a figure in it. No floating objects.
