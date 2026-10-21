# Stand-in art: sources and checks

Public-domain prints standing in until the illustrator's work arrives (decided by Richard on 2026-10-05; `docs/DESIGN.md`). Every piece was checked against its Wikimedia Commons licence data on 2026-10-05 (CC0 museum release or public domain; no restrictions recorded), looked at, and audited against `book/art/ART-CHECKLIST.md`. The monsters appear only in the Entities' portraits (the last section), which Richard asked for as inspiration for the illustrator.

`book/tools/prep-art.py` downloads each scan, crops it (fractions in `manifest.json`), turns it into a two-tone image from the book's ink to its paper colour, and saves the JPEG used by the build. The pieces are credited on the credits page.

**Rights rule used:** keep a print only if its Commons licence (or, for a museum's own release, its museum record) is CC0 or public domain, the artist died before 1955 and the work was published before 1930. Rejected during the search: a CC-BY-SA photo, a scan from a commercial print seller, and an etching whose artist couldn't be confirmed. Rejected for content: a gallows, a blackface mask, crude scenes, an anti-Catholic print, torture devices and a corpse. Swapped out after the outside review of v0.1 (2026-10-20): Gavarni and Verdeil's two men in long hooked false noses (invisible-costume), which read like a 19th-century antisemitic caricature, and Vervloet's Mechelen festival giants (creature-costume), where one dark face read as blackface and a fold crease ran through the print. Rejected in that search: Toulouse-Lautrec's *The Motorist* (goggled and muffled, but the face is drawn as a dark caricature), Gavarni's *Un honnête Domino* (the companion wears a long false nose), the *Varney the Vampire* woodcuts (at portrait size the frontispiece reads as a couple in bed, and the part-cover vampire is tangled in lettering), a 1690 broadside "Figure d'un antropophage" (an anti-Irish caricature), Mechelen's seated giant *Groot-Vader* (reads as a statue, with no crowd for scale, and fold creases) and a pen sketch of the Antwerp giant in the 1685 ommegang (too sketchy at 1.66 in). The second round of 2026-10-20 (A3, A4, A5, L12 and the two Palmer re-sources) prefers CC0 museum releases taken from the museums' own servers; its rejected candidates are listed under each picture.

## cover-castle: Front cover

- **Work:** Kasteel op een klif, RP-P-1892-A-17662.jpg
- **Artist:** Anton Louis Koster (Dutch, 1859-1937); 1869-1892 (in the Rijksmuseum by 1892)
- **Source:** https://commons.wikimedia.org/wiki/File:Kasteel_op_een_klif,_RP-P-1892-A-17662.jpg
- **Licence:** CC0 (CC-zero). Rijksmuseum Amsterdam scan released CC0; artist died 1937 (more than 70 years ago) and the print dates from before 1892.
- **Publication (checked 2026-10-20, outside review of v0.1):** the Rijksmuseum dates the etching 1869–1892 and records this impression as part of the bequest of Jhr. P. A. van den Velden, The Hague, received in 1892 (collector's mark Lugt 2228 on the back), so impressions were in circulation by 1892, well before 1930. Even if it were treated as never formally published, Koster died in 1937, so its term (life + 70 years) ended in 2008.
- **Audit:** Castle on its cliff, bridge on its piers over water, roofs on the bank, moon and clouds in the sky: all supported. No figures. Inventory number and signature cropped off.

## part1-tower: Part One title page

- **Work:** *The Lonely Tower*, 1879, etching in black on laid paper (for Milton's *Il Penseroso*); National Gallery of Art, Washington, 1991.154.6 (gift of Charles Ryskamp)
- **Artist:** Samuel Palmer (British, 1805–1881); 1879
- **Source:** https://www.nga.gov/collection/art-object-page.73572.html (image from the NGA's IIIF server, https://api.nga.gov/iiif/885dbecb-b8a6-4343-ac25-ba33f3f5cd86, at 4096 px wide, the largest the server gives; the scan is 4472 px)
- **Licence:** CC0 (National Gallery of Art Open Access; the NGA open-data image record is marked open access), checked 2026-10-20. Palmer died 1881; published 1879.
- **Replaces** (2026-10-20, outside review of v0.1, R3): the Google Art Project scan of another impression on Wikimedia Commons (File:Samuel_Palmer_-_The_Lonely_Tower_-_Google_Art_Project_(2397075).jpg, PD-Art), which isn't a museum release. **Same crop:** the old crop was carried over to the NGA scan by matching the two scans' features (1,406 matched points; scale 1.08, rotation under 0.1°). 1800 px wide (was 1600), so 269 ppi at the 6.7 in it prints at (was 239). The NGA impression is inkier, so its mid-tones are lifted (`gamma` 1.45 in the manifest) to keep the old picture's tone on the dark Part One page.
- **Audit:** Ruined tower on its hill, trees rooted on the slope, crescent moon on the horizon, stars in the sky. The bottom edge cuts, deliberately, the top of a reclining shepherd's hat (bottom left) and a small ox-wain on the horizon by the moon: the scene continues out of frame (book audit BA-34; raising the crop loses the moon). The plate's border and paper are outside the crop on every side (BA-33): no plate line shows.

## part2-village: Part Two title page

- **Work:** Dorpje aan het water, bij maanlicht, RP-P-1995-419.jpg
- **Artist:** Carl Bloch (Danish, 1834-1890); 1881
- **Source:** https://commons.wikimedia.org/wiki/File:Dorpje_aan_het_water,_bij_maanlicht,_RP-P-1995-419.jpg
- **Licence:** CC0 (CC-zero). Rijksmuseum Amsterdam scan released CC0; artist died 1890.
- **Audit:** Houses standing on the shore, a church spire and a cottage in the distance. No figures. Re-cropped lower on 2026-10-06 (book audit BA-46) so the whole village shows on its shore; the moon is now above the frame. Signature cropped off.

## ch01-castle: Chapter 1 header (also the one-shot's Part One header)

- **Work:** *Caernarvon Castle (Night)*, 1776; etching, aquatint and lift-ground aquatint printed in brown on laid paper; National Gallery of Art, Washington, 1994.60.58 (gift of Ruth B. Benedict). Lettered in the plate "P.Sandby Fecit", "Publish'd according to Act of Parliament by P.Sandby St. Georges Row Sepr.1st.1776" and "CAERNARVON CASTLE."
- **Artist:** Paul Sandby (British, 1731–1809); published by the artist, 1 September 1776
- **Source:** https://www.nga.gov/collection/art-object-page.79397.html (image from the NGA's IIIF server, https://api.nga.gov/iiif/336a2985-a211-4309-9bbe-00b6a06ac3c8, at 4096 px wide, the largest the server gives)
- **Licence:** CC0 (National Gallery of Art Open Access; open-data image record marked open access), checked 2026-10-20. Sandby died 1809; published 1776.
- **Replaces** (2026-10-20, outside review of v0.1, A5): Gustave Doré's castle from Tennyson's *Enid* (Moxon, 1867–68; File:Idylls_of_the_King_3.jpg on Commons, 1774 px), upscaled and smeary at print size, with more than half the band empty sky. A sharper scan of the same Doré plate exists (Internet Archive, enidalfred00tennrich, page n49, University of California copy of *Enid*, 1868), but its plate gives only about 1790 px across the banner's crop, and its sky is the same half-empty band, so a different castle was chosen. Also tried and rejected: Turner's *Dunstanborough Castle* (Liber Studiorum, NGA; a daylight seascape, the castle small), Legros's *Ruins of a Château* and Buhot's *Château des hiboux* (NGA; small ruins that don't read as a castle in a wide band), Victor Hugo's 1868 etching (NGA; the castle tiny) and the Rijksmuseum's moonlit Rhine castles (small book plates).
- **Printed size:** the chapter header, 7.14 × 1.8 in; 2000 px wide from 2957 px of the scan, so 280 ppi (the old one was 1500 px upscaled from about 1420).
- **Audit:** Object table: the moon low in the sky at the left, half behind cloud; a large tree at the left edge, its trunk and roots below the frame (the tree runs out of the left and bottom edges, deliberately); clouds and one star in the sky; the castle's great tower with three turrets on its top, the curtain wall and a second, slimmer tower at the right, all standing on walls that run out of the bottom and right edges (the castle continues out of frame, deliberately). The shore, the boats and figures, a bright streak in the sky at the far right and the plate's lettering are cropped off, so the band has no figures and no lettering. Two-tone from the brown print; mid-tones lifted slightly (`gamma` 1.2). Not upscaled.

## ch02-curiosities: Chapter 2 header

- **Work:** RitrattoMuseoFerranteImperato.jpg
- **Artist:** Anonymous engraver for Ferrante Imperato; Dell'Historia Naturale, Naples, 1599
- **Source:** https://commons.wikimedia.org/wiki/File:RitrattoMuseoFerranteImperato.jpg
- **Licence:** Public domain (PD-art|PD-old-100). Published 1599; PD-art.
- **Audit:** Re-cropped lower on 2026-10-06 (book audit BA-37): the strip now shows the room — the vault and its wall with the specimens fixed to it, the window, the shelves with stuffed birds and books — so the specimens read as mounted, not floating. A visitor's pointer runs out of the bottom edge (held below the frame) and a sawfish's bill leans on the shelving; the shelving is cut by the frame edges, deliberately. The visitors of the original are cropped out.

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

## ch05-bellman: Chapter 5 header (also the one-shot's Part Four header)

- **Work:** *The Bellman*, 1879, etching on japan paper, pasted to board (for Milton's *Il Penseroso*); National Gallery of Art, Washington, 1991.154.5 (gift of Charles Ryskamp). The NGA holds a second impression, 1947.7.89, which would serve as well.
- **Artist:** Samuel Palmer (British, 1805–1881); 1879
- **Source:** https://www.nga.gov/collection/art-object-page.73571.html (image from the NGA's IIIF server, https://api.nga.gov/iiif/737fac19-8000-49c0-8ff9-6a31883d50ab, at 4096 px wide, the largest the server gives; the scan is 4449 px)
- **Licence:** CC0 (National Gallery of Art Open Access; open-data image record marked open access), checked 2026-10-20. Palmer died 1881; published 1879.
- **Replaces** (2026-10-20, outside review of v0.1, R3): the Google Art Project scan of another impression on Wikimedia Commons (File:Samuel_Palmer_-_The_Bellman_-_Google_Art_Project.jpg, PD-Art). **Same crop**, carried over by matching the scans' features (1,821 matched points; scale 0.98, rotation 0.2°), kept just inside the image at both sides. 2000 px wide (was 1500), so 280 ppi across the 7.14 in header (was 210). Mid-tones lifted (`gamma` 1.3) to keep the old tone.
- **Audit:** Cottages on the ground, smoke rising from chimneys, cattle lying in the field, the bellman and villagers standing on the path, their legs cut by the bottom edge (deliberate: the lane continues). Trees rooted out of frame at the right. No floating objects; no plate line shows.

## ch06-crowd: Chapter 6 header

- **Work:** Félix Vallotton, La Manifestation (The Demonstration), 1893, NGA 42211.jpg
- **Artist:** Félix Vallotton (Swiss-French, 1865-1925); 1893
- **Source:** https://commons.wikimedia.org/wiki/File:F%C3%A9lix_Vallotton,_La_Manifestation_(The_Demonstration),_1893,_NGA_42211.jpg
- **Licence:** CC0 (CC0). Vallotton died 1925 (PD-old-100 from 2026); published 1893; National Gallery of Art scan, CC0.
- **Audit:** Running figures caught mid-stride (Vallotton's style: solid black shapes, no ground drawn); heads and feet cut by the frame edge, deliberately. The fallen figure and the flying hat of the original are cropped out (the bottom raised slightly on 2026-10-06 so no fragment of the fallen figure shows, book audit BA-44).

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

## ch09-fair: Chapter 9 header

- **Work:** Dorpskermis, RP-P-OB-62.004.jpg
- **Artist:** Jan de Visscher (Dutch, c. 1636–after 1692), after a painting by Adriaen van Ostade (Dutch, 1610–1685); 1643–1692
- **Source:** https://commons.wikimedia.org/wiki/File:Dorpskermis,_RP-P-OB-62.004.jpg (the 1920px thumbnail)
- **Licence:** CC0 (CC-zero). Rijksmuseum Amsterdam scan released CC0 (Copyright: Publiek domein); both artists died more than 250 years ago. Checked on its Commons file page through the API on 2026-10-06.
- **Audit:** A dance in front of an inn: the piper stands raised above the crowd (his footing is hidden behind the dancers), a couple dances hand in hand with a child between them, a man sits on a barrel raising a cup, onlookers stand in the doorway, a dog runs at the children, a broken cart lies by a dead tree, and a pole with a festival rag leans on the roof. Counted: faces in profile show one eye, frontal faces two; arms join at the shoulders. Feet, the dog's legs, the barrel and the cart wheel run off the bottom edge with the ground, deliberately (the street continues out of frame); nothing is cut inside the frame. The houses' upper storeys, the sky and the plate border are cropped off. Nothing crude in the crop (the scene is a dance; no drunkenness or brawling shown).

## back-moonrise: the one-shot's cover (the rulebook's back cover until 2026-10-20)

- **Work:** Samuel Palmer, The Rising Moon, 1857, NGA 119976.jpg
- **Artist:** Samuel Palmer (British, 1805-1881); 1857 (Etching Club)
- **Source:** https://commons.wikimedia.org/wiki/File:Samuel_Palmer,_The_Rising_Moon,_1857,_NGA_119976.jpg
- **Licence:** CC0 (CC0). Palmer died 1881; National Gallery of Art scan, CC0.
- **Audit:** Sheep lying in the field, a figure standing, cypresses and moon. Signature, plate edge and paper margins cropped off (narrowed on 2026-10-06, book audit BA-38).
- **Now:** printed only on the cover of the one-shot, *Lantern Night in Hallowby*. The rulebook's back cover has `back-festival` since 2026-10-20 (outside review of v0.1, L12).

## back-festival: Back cover

- **Work:** *14 Juillet. Illumination de la Place de la République* (Bastille Day: the illuminations in the Place de la République, Paris), 1883; wood engraving; National Gallery of Art, Washington, 2007.12.21 (Ailsa Mellon Bruce Fund)
- **Artist:** Auguste Lepère (French, 1849–1918), engraver, after Henri Louis Scott (French, c. 1846–1884); 1883
- **Source:** https://www.nga.gov/collection/art-object-page.138626.html (image from the NGA's IIIF server, https://api.nga.gov/iiif/fd1e0308-9e6b-41b2-923b-b5fdd06faf52, at 4096 px wide, the largest the server gives; the scan is 5293 px)
- **Licence:** CC0 (National Gallery of Art Open Access; open-data image record marked open access), checked 2026-10-20. Lepère died 1918, Scott 1884; dated 1883.
- **Chosen** (2026-10-20, outside review of v0.1, L12): a festival town at night (a crowd with paper lanterns, flags and fireworks) sells "monsters go shopping on Lantern Night" better than Palmer's sheep, and it is printed nowhere else in the book (the reviewer's other ideas, the torchlit procession and Vallotton's crowd, are already chapter headers). Rejected: Lepère's *Fête vénitienne sur la Seine* (NGA; lantern boats under a bridge, no town) and Dürer's *Masquerade Dance with Torches* (NGA; an indoor court dance).
- **Printed size:** the back cover's frame, 4.4 in wide, in a tall crop (0.92:1) that also closes the empty band the review flagged; 1600 px wide, so 364 ppi.
- **Audit:** Object table: the right-hand part of the print. A night crowd fills the square, holding paper lanterns up on sticks and in their hands; flags on poles held above the crowd; strings of round lanterns hung from the illuminated pylon at the right and running out of the right edge; a tall flagpole with a banner standing in the crowd, its foot hidden by the crowd; two temporary illuminated pylons with stars on them standing in the square, their bases hidden by the crowd; fireworks streaking and smoke rising in the sky. The crowd runs out of the bottom and both side edges (the square continues, deliberately). The left part of the print, with the Monument to the Republic and its lettering and the dome behind, is cropped off. Lettering left in the picture is real ("RF" on the lanterns), not pseudo-text. Character rows: the foreground figures face away or are in profile; faces turned to us show two eyes; arms join at the shoulders; the raised hand at the centre is whole. A faint vertical hairline where two of the engraving's wood blocks meet ran down the sky above the left pylon; it is retouched (`seams` in the manifest, redrawn row by row from the hatching either side). Not a caricature: a news engraving of a real festival.

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
- **Audit:** Horse in harness with all four hooves on the ground, cart wheels on the road, the driver walking beside it, a woman seated on the load. Inscription cropped off. Re-prepared on 2026-10-20 (outside review of v0.1): 2000 px wide from the 3840 px scan (was 900 px, about 126 ppi at full text width), and trimmed inside the plate mark on all four sides, so no plate edge shows.

## spot-lantern: Spot (Chapter 1 end)

- **Work:** Lantaarn, RP-P-BI-6405X.jpg
- **Artist:** Jacobus Ludovicus Cornet (Dutch, 1815-1882); 1825-1882
- **Source:** https://commons.wikimedia.org/wiki/File:Lantaarn,_RP-P-BI-6405X.jpg
- **Licence:** CC0 (CC-zero). Rijksmuseum Amsterdam scan released CC0; artist died 1882.
- **Audit:** A lantern standing on a ledge in a dark room; the ledge is visible under it, but not what holds the ledge (lost in the dark; book audit BA-43, accepted for a stand-in). Re-cropped on 2026-10-20 (outside review of v0.1: it printed as a near-black block at 2.1 in): the crop now holds the lantern, its glow and the ledge, so the lantern fills about half the width.

## spot-owl: Spot (Chapter 2 end)

- **Work:** Bewick Thomas Barn Owl Tyto alba.png
- **Artist:** Thomas Bewick (British, 1753-1828); A History of British Birds, vol. 1, 1797 (scan from the 1847 edition)
- **Source:** https://commons.wikimedia.org/wiki/File:Bewick_Thomas_Barn_Owl_Tyto_alba.png
- **Licence:** Public domain (PD-old-auto-expired|deathyear=1828). Bewick died 1828; PD-old-auto-expired.
- **Audit:** Owl perched on a stump, talons gripping the bark; stump rooted, leaves attached to branches. Two eyes, two feet. Printed caption cropped off. The text printed on the back of the page showed through faintly; the levelling now clips the lightest 35% to paper (`cutoff` in the manifest, 2026-10-06, book audit BA-35), which removes it and keeps the engraving. Re-prepared on 2026-10-20 at the scan's full width (1864 px; was 900 px, about 174 ppi at the 5.3 in it prints at).

## spot-windmill: Spot (Chapter 6 end)

- **Work:** Landschap met molen bij maanlicht, RP-P-BI-6653.jpg
- **Artist:** Johannes van Cuylenburgh (Dutch, c.1772-1841); 1803-1841
- **Source:** https://commons.wikimedia.org/wiki/File:Landschap_met_molen_bij_maanlicht,_RP-P-BI-6653.jpg
- **Licence:** CC0 (CC-zero). Rijksmuseum Amsterdam scan released CC0; artist died 1841.
- **Audit:** Windmill on its post, cottages on the bank, a boat on the water with a figure in it. No floating objects. Plate margin at the top and right cropped off (2026-10-06, book audit BA-39). Re-prepared on 2026-10-20 (outside review of v0.1): 2000 px wide from the 3840 px scan (was 900 px, about 126 ppi at full text width); same crop. Re-cropped on 2026-10-21 (outside review of v0.2, N6): the right edge moves from 0.935 to 0.941 of the scan, so the engraver's signature ("J. van Cuylenburgh", in the grass at the lower right) is whole instead of cut through its last letters; the plate's etched edge is at about 0.942, so no paper or plate line shows. 2000 × 1177 px (was 1185 px tall).

## spot-bonfire: Spot (Chapter 8 end)

- **Work:** Kinderen bij een vreugdevuur op St. Maarten, RP-T-2016-35.jpg ("van St. Martens Vuurtje", children at a St Martin's Day bonfire, the Dutch lantern festival; added 2026-10-05 with Lantern Night)
- **Artist:** Christiaan Andriessen (Dutch, 1775-1846); 1805-1808, pen and watercolour
- **Source:** https://commons.wikimedia.org/wiki/File:Kinderen_bij_een_vreugdevuur_op_St._Maarten,_RP-T-2016-35.jpg (prepared from Commons' 3840 px rendition since 2026-10-20; it was the 1920 px one, about 126 ppi at full text width)
- **Licence:** CC0 (CC-zero), checked 2026-10-05. Rijksmuseum Amsterdam scan released CC0; artist died 1846.
- **Audit:** Seven figures standing or kneeling on the ground round a bonfire, their shadows running out from the fire across the ground; the fire on the ground among their feet; a tree rooted at the left, its branches overhead; fence posts set in the ground at the right. Faces that turn to us show two eyes. The artist's handwritten date and title are cropped off. **Printed again** from 2026-10-21 (outside review of v0.2, N1 and N3): Chapter 8 now ends with room for it, so it is the chapter's end spot again (7.14 × 6.36 in, the sides trimmed about 8% each by the build's fill, which keeps the tree's trunk and roots at the left and a fence post at the right), and Christiaan Andriessen is back on the rulebook's credits page.

## The Entities' portraits (Chapter 2)

Added 2026-10-05 at Richard's request ("my illustrator uses them for inspiration"): two per Entity, in costume and revealed, in frames about 0.85:1 (1.66 × 1.95 in). Licences re-checked on Commons the same day. Every monster is a pre-1930 print, so none borrows the Universal film looks; they show what the illustrator's originals should be about, not how they should look.

### dracula-costume: Dracula, in costume

- **Work:** Scène uit toneeldrama De kinderroofster, RP-P-1877-A-168.jpg
- **Artist:** Charles Rochussen (1814-1894); 1868 (playbill for 'De Kinderroofster', Amsterdam Stadsschouwburg)
- **Source:** https://commons.wikimedia.org/wiki/File:Sc%C3%A8ne_uit_toneeldrama_De_kinderroofster,_RP-P-1877-A-168.jpg
- **Licence:** CC0 (CC-Zero). Artist died 1894; Rijksmuseum scan released CC0 (CC-Zero).
- **Audit:** A masked man in a broad-brimmed hat and cloak, his right hand resting on a table among papers; a candle burning in a bottle on the table, the bottle standing on the tabletop. A woman in a straw bonnet clings to him, both hands on his chest. Character rows: the man — two eyes behind the half-mask, two arms (one hand on the table, fingers spread on the papers; the other under the cloak), two legs, both feet on the floor; the woman — profile, one eye, two arms, both hands on the man, her skirt running out of the left and bottom edges. Re-cropped on 2026-10-20 (outside review of v0.1: the old crop sliced her vertically through the face): her head and face are now whole, and no partial face remains. The playbill's lettering is cropped off.

### dracula-revealed: Dracula, revealed

- **Work:** "Me miserable! which way shall I fly / Infinite wrath, and infinite despair?" (*Paradise Lost*, Book IV, lines 73–74), plate 13 of Doré's illustrations to Milton's *Paradise Lost*; wood engraving, the block signed "Pannemaker–Doms" by its engravers
- **Artist:** Gustave Doré (French, 1832–1883), designer; engraved by Pannemaker and Doms; first published 1866 (Cassell, Petter & Galpin, London); this impression from *Milton's Paradise Lost*, ed. Robert Vaughan, New York: Cassell Publishing Co., undated (19th century)
- **Source:** Internet Archive, https://archive.org/details/miltonsparadisel18milt (page n169; full-page image https://archive.org/download/miltonsparadisel18milt/page/n169.jpg, 3090 × 4420 px from a 300 ppi camera scan). The same plate is on Wikimedia Commons as File:Paradise_Lost_13.jpg (975 px, public domain), too small to use.
- **Licence:** Public domain. Doré died 1883; published 1866. The Internet Archive item states no licence or restriction; it is a straight photograph of a flat printed page, which adds no copyright of its own. No CC0 museum copy was found (searched: NGA, the Met, Art Institute of Chicago, Cleveland, Rijksmuseum).
- **Replaces** (2026-10-20, outside review of v0.1, A3): the anonymous 1821 engraving of Philippe-Amédée Roustan as Lord Ruthven, a plumed theatre cavalier who didn't read as a vampire, with its plate rules inside the frame (BA-40). Doré's bat-winged figure in human form reads as a creature of the night at 1.66 in, and the review suggested a Doré bat. Rejected in this search: Delacroix's *Mephistopheles in the Air* (NGA; a horned devil, reads as the Devil, the figure small over the town), Goya's *Modo de volar* (NGA; men with strapped-on wings, reads as flying machines), Meryon's *Le Stryge* (NGA; a stone gargoyle), Munch's *Vampire* (NGA, not open access), René de Moraine's *Le Vampire* (Commons; 629 px, too small), Redon's lithographs (NGA; nothing reads as a vampire at portrait size) and the scan's other bat-winged Satan plates (the figure small in a wide scene).
- **Printed size:** 1.66 × 1.95 in (one-shot cards 1.55 in tall); 640 px wide from 1730 px of the scan, so 385 ppi.
- **Audit:** Object table: the figure stands on a rocky crag: his right foot, bare, flat on the rock (a sandal strap round the ankle); his left knee raised, the left foot set on a ledge of rock; his right hand grips the rock's edge (four fingers over it, the thumb behind); his left arm crosses over his head, the hand clutching his hair. Both wings join at his shoulders, and both are whole inside the frame, tips included. Rock fills the left and lower part of the frame and runs out of the bottom and left edges (the crag continues); the rock face at the right runs up out of the top edge; dark night sky at the top right. Character row: one head, face upturned in three-quarter view, the eyes shadowed under his hand; two arms, two hands; two legs, two feet; two wings. Scale armour and a short kilt. The plate border, Doré's and the engravers' signatures and the caption are cropped off. Not a film look.

### creature-costume: Frankenstein’s Creature, in costume

- **Work:** *Paris. – Le départ de Dornon, se rendant de Paris à Moscou sur des échasses* (Paris: Dornon setting off from Paris for Moscow on stilts); wood engraving for an illustrated periodical, Musée Carnavalet, Paris
- **Artist:** Charles Morel (French, 1860–1908; BnF and Getty ULAN authority records), draughtsman ("Dessin de M. Charles Morel" on the sheet); the wood engraver is unrecorded; c. 1891 (Sylvain Dornon walked from Paris to Moscow on stilts in 1891)
- **Source:** https://commons.wikimedia.org/wiki/File:Paris._-_Le_d%C3%A9part_de_Dornon,_se_rendant_de_Paris_%C3%A0_Moscou_sur_des_%C3%A9chasses._Paris_Mus%C3%A9es_20231102103448.jpg (Paris Musées' own upload of https://www.parismuseescollections.paris.fr/fr/musee-carnavalet/oeuvres/paris-le-depart-de-dornon-se-rendant-de-paris-a-moscou-sur-des-echasses; prepared from Commons' 1920 px rendition)
- **Licence:** CC0 (Commons: CC-0; Paris Musées open-content release), checked 2026-10-20. Morel died 1908; published c. 1891.
- **Replaces** (2026-10-20, outside review of v0.1): Jan Vervloet's *De Reuse Familie* (Mechelen's festival giants, 1825), because one giant's face, dark at print size, can read as blackface, and a fold crease ran through the picture. One tall figure above a crowd sells "a head above the crowd" better.
- **Audit:** Object table: the stilt-walker stands with his foot on the stilt's footrest, and that stilt runs down through the crowd to its foot on the pavement (the other leg and stilt are hidden behind the crowd); the long balancing pole lies across his shoulders, held in both hands; the beret is on his head; the sheepskin coat hangs from his shoulders. A street lamp on its post; a statue (one of the Marly horses) on its pedestal; trees rooted behind the crowd; a man holds his hat up in his raised hand; a policeman stands in front with both hands raised. The crowd's legs run out of the bottom edge with the pavement, and the crowd runs out of both side edges, deliberately (the street continues); the bowler-hatted man at the right is cut by the right edge through his back, his face whole; only small background heads are cut at the left edge. Character rows: the stilt-walker has two eyes, two arms (both hands on the pole), two legs (one on its stilt, one hidden); the foreground faces show two eyes when frontal and one in profile; arms join at the shoulders. The caption, Morel's signature and the engraver's mark are cropped off. A news engraving of a real event, not a caricature.

### creature-revealed: Frankenstein’s Creature, revealed

- **Work:** Frankenstein Cooke 1823 original.jpg
- **Artist:** Thomas Charles Wageman (painter, c.1787-1863); drawn on stone by Nathaniel Whittock (1791-1860); 1823
- **Source:** https://commons.wikimedia.org/wiki/File:Frankenstein_Cooke_1823_original.jpg
- **Licence:** Public domain (PD-old-100-expired, CC-PD-Mark). Artists died 1860 and 1863; published 1823; Commons: PD-old-100-expired.
- **Audit:** The Creature stands barefoot on the stage floor, right fist gripping a broken sword's hilt, left arm flung out (open hand, five fingers); Frankenstein fallen on the floor at the right; a balustrade behind. Character: two eyes, two arms, two legs. Not the 1931 film look (curls, drapery, no bolts, no flat head).

### mummy-costume: the Mummy, in costume

- **Work:** Blanche Rosevelt in Egyptian Costume, from the set Actors and Actresses, Second Series (N71), for Duke brand cigarettes (colour lithograph card, 1888-90)
- **Artist:** W. Duke, Sons & Co. (New York and Durham, North Carolina), publisher; artist unrecorded
- **Source:** https://www.metmuseum.org/art/collection/search/422975 (The Jefferson R. Burdick Collection)
- **Licence:** Public domain; The Metropolitan Museum of Art's Open Access image (CC0, free for any use including commercial), checked 2026-10-06. Published in the US 1888-90.
- **Replaces** (2026-10-06): Auguste Mariette's *Aïda* costume design, a Bibliothèque nationale de France scan, because the BnF requires a paid licence for commercial reuse of its scans.
- **Audit:** Head and shoulders in profile: the headdress sits on her head and falls to the collar; one eye (profile), one ear hidden by the headdress. The card's frame and printed caption are cropped off.

### mummy-revealed: the Mummy, revealed

- **Work:** Lot No. 249 by Martin van Maële 1.jpg
- **Artist:** Martin van Maële (1863-1926); 1906 (French edition of Conan Doyle's 'Lot No. 249', Société d'Édition et de Publications)
- **Source:** https://commons.wikimedia.org/wiki/File:Lot_No._249_by_Martin_van_Ma%C3%ABle_1.jpg
- **Licence:** Public domain (CC-PD-Mark, PD-old-95-expired). Artist died 1926; published 1906; Commons: PD-old-95-expired.
- **Audit:** The mummy sits up in its sarcophagus; its right arm runs from the shoulder out of the left edge (to the hand on the rim, beyond the frame); its long left leg is drawn up over the rim, whole from the hip to the foot resting against the sarcophagus front; a hieroglyph frieze on the sarcophagus; a bird-headed statue standing behind. Character: two eyes, two arms (one leaving the frame at the left, attached at the shoulder), two legs, head-wrapping on. Re-cropped on 2026-10-20 (outside review of v0.1: the old crop cut the drawn-up limb at the right edge so it read as a disembodied arm): the crop now runs from the mummy's right shoulder to past its foot, so every limb in the frame is attached to the body. The printed rule along the top is erased (BA-42). Low-resolution scan (496 px wide, about 300 ppi at 1.66 in): reference only. Not the film look.

### werewolf-costume: the Werewolf, in costume

- **Work:** Le Chaperon rouge fut bien étonné de voir comment sa grand'mère était faite en son déshabillé.jpg
- **Artist:** Gustave Doré (1832-1883); 1862 (Perrault's Contes, Hetzel)
- **Source:** https://commons.wikimedia.org/wiki/File:Le_Chaperon_rouge_fut_bien_%C3%A9tonn%C3%A9_de_voir_comment_sa_grand%27m%C3%A8re_%C3%A9tait_faite_en_son_d%C3%A9shabill%C3%A9.jpg
- **Licence:** Public domain (PD Old, CC-PD-Mark). Artist died 1883; published 1862; Commons: PD-old.
- **Audit:** The wolf lies in bed under the bedclothes, Grandmother's frilled nightcap on its head, both forepaws on the sheet. Character: two eyes, two forepaws with claws; the rest under the covers.

### werewolf-revealed: the Werewolf, revealed

- **Work:** Loup garou 02.jpg
- **Artist:** Maurice Sand (1823-1889); 1858 (George Sand, 'Légendes rustiques', plate 'Les Lupins')
- **Source:** https://commons.wikimedia.org/wiki/File:Loup_garou_02.jpg
- **Licence:** Public domain (PD-old-100-expired, PD-Art (PD-old-100-expired), CC-PD-Mark, PD-Art missing SDC copyright status, PD-old missing SDC copyright status). Artist died 1889; published 1858; Commons: PD-old-100-expired / PD-Art.
- **Audit:** Five upright wolf-men stand on the grass against a wall, each on two legs, their shadows on the wall; trees above. The leftmost is cut by the frame edge, deliberately. Low-resolution scan: reference only.

### invisible-costume: the Invisible Man, in costume

- **Work:** *Le Masque au caffé* (The Masked Man Taking Coffee), from Giovanni David's series of Venetian figures (Venice, 1775); etching and aquatint
- **Artist:** Giovanni David (Italian, 1743–1790); 1775
- **Source:** https://www.nga.gov/collection/art-object-page.163476.html (National Gallery of Art, Washington, 2013.173.1; image from the NGA's IIIF server, https://api.nga.gov/iiif/86d41746-6177-4f03-8dfe-9c00f765c16a, at 3000 px wide)
- **Licence:** CC0 (National Gallery of Art Open Access; the NGA open-data image record is marked open access), checked 2026-10-20. David died 1790; published 1775.
- **Replaces** (2026-10-20, outside review of v0.1): Paul Gavarni and Pierre Verdeil's *—Qui diable ça peut-il être* (1840s), two men in long hooked false noses whispering, which at print size reads like a 19th-century antisemitic caricature.
- **Audit:** A Venetian carnival-goer muffled in the *bauta*: the tricorn hat sits on his head; the white carnival mask is pushed up and rests on the hat; the black lace hood and cape fall from under the hat over his head and shoulders to below the frame. His right hand holds a coffee cup on its saucer (thumb over the rim, fingers under the saucer); his left arm is hidden under the cape. A shelf at the left with jars and cakes standing on it, cut by the left edge deliberately (the counter continues out of frame); a curtain swag on the wall behind. Character row: frontal face, two eyes, one nose, one mouth; one hand visible (thumb and four fingers); body runs out of the bottom edge at the hip. The plate's lettering, the counter with its title panel, the man's left hand at the counter and the chair at the right are cropped off, so no lettering, cut hand or chair fragment shows. No caricature: the mask is a plain white carnival mask.

### invisible-revealed: the Invisible Man, revealed

- **Work:** *Pastorales*, no. 19: "Que nous sommes bêtes d'avoir une peur pareille (...)" ("How silly of us to be so frightened…"), lithograph, published in *Le Charivari*, 17 August 1845; Rijksmuseum, Amsterdam, RP-P-OB-41.116 (Delteil 1406, second state)
- **Artist:** Honoré Daumier (French, 1808–1879); printed and published by Aubert & Cie, Paris; 1845
- **Source:** https://id.rijksmuseum.nl/200182474 (the Rijksmuseum's record; image https://iiif.micr.io/CvzYw/full/max/0/default.jpg, 3210 × 4140 px)
- **Licence:** Public domain: the Rijksmuseum marks the image Public Domain Mark 1.0 (https://creativecommons.org/publicdomain/mark/1.0/), checked 2026-10-20. Daumier died 1879; published 1845.
- **Replaces** (2026-10-20, outside review of v0.1, A4): Ludvík Strimpl's skeleton from the cover of *L'Homme invisible* (Calmann-Lévy, 1912), which read as Death and competed with the Ghost. The review asked for empty clothes; a scarecrow's coat and hat flapping with nobody inside reads that way at portrait size. Rejected in this search: Klinger's *A Glove* etchings (NGA; the glove is small among figures at 1.66 in), Whistler's *Old-Clothes Shop* (NGA; a shopfront, no clothes read), Cruikshank's *Meditations in Monmouth Street* (*Sketches by Boz*, 1836, Rijksmuseum; crowded at portrait size) and the 1810 caricatures *Les Invisibles* (the Met and NGA; deep bonnets, not invisibility).
- **Printed size:** 1.66 × 1.95 in (one-shot cards 1.55 in tall); 640 px wide from 1187 px of the scan, so 385 ppi.
- **Audit:** Object table: a scarecrow in a wheat field in a gale. A battered top hat sits on the top of its pole; an old coat hangs from the pole's crossbar, both sleeves blown out (one raised at the left and running out of the left edge, one streaming to the right), its skirts flapping; the pole runs down from under the coat into the wheat. The wheat runs out of the bottom and right edges (the field continues); a small bird sits in the wheat at the right. Nobody is inside the clothes. The frightened couple of the original are cropped off except the end of the woman's wind-blown scarf at the left edge and a shadow of her shoulder in the bottom-left corner, both cut by the frame deliberately (they continue out of frame) and reading as blown leaves at this size. The vignette's corner, the series title, the number and the caption are cropped off; newspaper text printed on the back shows through only faintly in the sky (levelled with `cutoff` [1, 3], which keeps the crayon grain). Character row: none (no figure); the coat has two sleeves, the hat sits on the pole.

### ghost-costume: a Ghost, in costume

- **Work:** Hammersmith Ghost.PNG
- **Artist:** Anonymous engraver, Kirby's Wonderful and Scientific Museum, vol. II (London); 1804
- **Source:** https://commons.wikimedia.org/wiki/File:Hammersmith_Ghost.PNG
- **Licence:** Public domain (Author died more than 100 years ago public domain images, CC-PD-Mark). Anonymous work published 1804 (222 years old); Commons: author died more than 100 years ago.
- **Audit:** A man under a white sheet, holding it up over his head, face peeping out; a door on its hinges with a bolt at the right, clouds in the sky. The sheet runs out of the frame at the bottom and the left. Re-cropped on 2026-10-06 (book audit BA-36) to drop a lattice fence at the left that had no posts in the frame and read as floating.

### ghost-revealed: a Ghost, revealed

- **Work:** Marley's Ghost-John Leech, 1843.jpg
- **Artist:** John Leech (1817-1864); 1843 (Dickens, A Christmas Carol, first edition)
- **Source:** https://commons.wikimedia.org/wiki/File:Marley%27s_Ghost-John_Leech,_1843.jpg
- **Licence:** Public domain (PD-old-100-expired, PD-Art (PD-old-auto-expired), CC-PD-Mark, PD-Art missing SDC copyright status, PD-old missing SDC copyright status). Artist died 1864; published 1843; Commons: PD-old-100-expired.
- **Audit:** Scrooge sits in his armchair, bare feet on the floor; a basin on the floor; a table with a candlestick and a bowl on it, its legs on the floor; Marley's ghost stands at the right, its chain and cash-boxes trailing to the floor; the fireplace behind. Character rows: two eyes, two arms, two legs each.

### witch-costume: a Witch, in costume

- **Work:** Page 10 of 'Red Apple and Silver Bells. A book of verse for children ... Illustrated by A. B. Woodward' (11149264234).jpg
- **Artist:** Alice B. Woodward (1862-1951); 1897 (Hamish Hendry, 'Red Apple and Silver Bells', Blackie)
- **Source:** https://commons.wikimedia.org/wiki/File:Page_10_of_%27Red_Apple_and_Silver_Bells._A_book_of_verse_for_children_..._Illustrated_by_A._B._Woodward%27_(11149264234).jpg
- **Licence:** Public domain (Author died more than 70 years ago public domain images, CC-PD-Mark). Artist died 1951 (before 1955), published 1897; Commons: author died more than 70 years ago (British Library scan).
- **Publication (checked 2026-10-20, outside review of v0.1):** first published 1897 by Blackie & Son, London and Glasgow (British Library catalogue; HathiTrust record 103399010 lists the 1897 and 1899 printings; Blackie's 1899 catalogue advertises it with "over 150 illustrations by Miss Alice B. Woodward").
- **Audit:** A child dressed as a witch (pointed hat, cloak) holds a tall staff topped with a ball, a large moon disc behind her; she runs out of the frame at the bottom. Character: two eyes, one hand on the staff, the other at her cloak.

### witch-revealed: a Witch, revealed

- **Work:** Illustration at page 180 in Europa's Fairy Book.png
- **Artist:** John D. Batten (1860-1932); 1916 (Joseph Jacobs, Europa's Fairy Book, 'Johnnie and Grizzle')
- **Source:** https://commons.wikimedia.org/wiki/File:Illustration_at_page_180_in_Europa%27s_Fairy_Book.png
- **Licence:** Public domain (PD-old-80-expired, CC-PD-Mark, PD-old missing SDC copyright status). Artist died 1932; published 1916; Commons: PD-old-80-expired.
- **Audit:** A hooded witch stands, cane on the floor, a ring of keys hanging from her belt, one hand at a drawer; shelves of jars and bags behind, every jar on a shelf or the floor. Character: one eye (profile), two arms, feet on the floor.

### jekyll-hyde-costume: Jekyll & Hyde, in costume

- **Work:** Jekyll.and.Hyde.Ch3.Drawing1.jpg
- **Artist:** Charles Raymond Macauley (1871-1934); 1904 (Strange Case of Dr Jekyll and Mr Hyde, Scott-Thaw, New York)
- **Source:** https://commons.wikimedia.org/wiki/File:Jekyll.and.Hyde.Ch3.Drawing1.jpg
- **Licence:** Public domain (PD Old, CC-PD-Mark, PD-old missing SDC copyright status). Artist died 1934; published 1904; Commons: PD-old.
- **Audit:** Dr Jekyll sits in his armchair, hands on its arms; legs run out of the frame at the bottom. Character: two eyes, two arms.

### jekyll-hyde-revealed: Jekyll & Hyde, revealed

- **Work:** Jekyll.and.Hyde.Ch2.Drawing2.jpg
- **Artist:** Charles Raymond Macauley (1871-1934); 1904 (same edition, chapter 2 'Search for Mr Hyde')
- **Source:** https://commons.wikimedia.org/wiki/File:Jekyll.and.Hyde.Ch2.Drawing2.jpg
- **Licence:** Public domain (PD-Art (PD-old-auto-expired), PD-old-80-expired, CC-PD-Mark, PD-Art missing SDC copyright status, PD-old missing SDC copyright status). Artist died 1934; published 1904; Commons: PD-old-80-expired / PD-Art.
- **Audit:** Mr Hyde stands in profile by a door in a top hat and heavy coat, one arm bent behind his back; the door on its frame at the left; legs run out of the frame at the bottom. Character: profile (one eye), one arm visible, the other hidden by the coat. Low contrast: reference only.

## Credits page check (2026-10-20)

The credits page (`book/src/chapters/01-credits.html`, "Stand-in illustrations") against what the book now prints:

| Credited on the page | Printed now | Change |
|---|---|---|
| Anton Louis Koster | cover-castle | keep |
| Samuel Palmer | part1-tower, ch05-bellman, ch07-dawn, back-moonrise | keep |
| Carl Bloch | part2-village | keep |
| Gustave Doré | ch01-castle, werewolf-costume | keep |
| Félix Vallotton | ch06-crowd | keep |
| Jacob Folkema | ch04-parade | keep |
| Michael Wolgemut, Wilhelm Pleydenwurff | ch08-town | keep |
| Jan de Visscher after Adriaen van Ostade | ch09-fair | keep |
| Daniel Chodowiecki | spot-watchman | keep |
| Gerrit Claesz. Bleker | spot-cart | keep |
| Jacobus Ludovicus Cornet | spot-lantern | keep |
| Thomas Bewick | spot-owl | keep |
| Johannes van Cuylenburgh | spot-windmill | keep |
| Christiaan Andriessen | spot-bonfire, but the 2026-10-20 build has no room for it at the end of Chapter 8, so it is not printed | keep only if the spot is printed again; otherwise **remove** |
| Charles Rochussen | dracula-costume | keep |
| Jan Vervloet | nothing (creature-costume replaced) | **remove** |
| Thomas Charles Wageman, Nathaniel Whittock | creature-revealed | keep |
| Martin van Maële | mummy-revealed | keep |
| Maurice Sand | werewolf-revealed | keep |
| Paul Gavarni, Pierre Verdeil | nothing (invisible-costume replaced) | **remove both** |
| Ludvík Strimpl | invisible-revealed | keep |
| John Leech | ghost-revealed | keep |
| Alice B. Woodward | witch-costume | keep |
| John D. Batten | witch-revealed | keep |
| Charles Raymond Macauley | jekyll-hyde-costume, jekyll-hyde-revealed | keep |
| W. Duke, Sons & Co. (publishers) | mummy-costume | keep (the Met also names the lithographers, Knapp & Company, which could be added) |
| unknown 16th–19th-century engravers | ch02-curiosities (1599), ch03-dice (17th c.), dracula-revealed (1821), ghost-costume (1804), and the wood engraver of creature-costume (c. 1891) | keep |
| — | creature-costume: Charles Morel | **add** |
| — | invisible-costume: Giovanni David | **add** |
| Institutions: the Rijksmuseum, the National Gallery of Art, the Metropolitan Museum of Art, Paris Musées, the British Library, Wikimedia Commons | all still used (Paris Musées now for creature-costume; the National Gallery of Art also for invisible-costume) | keep |

So the line should drop **Jan Vervloet, Paul Gavarni and Pierre Verdeil** and add **Charles Morel and Giovanni David**.

## Credits check after the open review items (2026-10-20, second round)

A3, A4, A5, L12 and the two Palmer re-sources changed five printed pictures and added one (`back-festival`). Both credits pages against what each book now prints:

| Artist | Rulebook prints | One-shot prints | Change |
|---|---|---|---|
| Samuel Palmer | part1-tower, ch05-bellman, ch07-dawn (back-moonrise no longer) | back-moonrise (cover), ch05-bellman, ch07-dawn | keep |
| Gustave Doré | werewolf-costume, dracula-revealed (ch01-castle no longer) | the same two portraits | keep |
| Paul Sandby | ch01-castle | ch01-castle (Part One header) | **add** to both |
| Auguste Lepère after Henri Louis Scott | back-festival | nothing | **add** to the rulebook only |
| Honoré Daumier | invisible-revealed | invisible-revealed (Entity card) | **add** to both |
| Ludvík Strimpl | nothing (invisible-revealed replaced) | nothing | **remove** from both |
| unknown engravers | ch02-curiosities (1599), ch03-dice (17th c.), ghost-costume (1804), creature-costume's wood engraver (c. 1891); dracula-revealed is now Doré's design, engraved by Pannemaker and Doms | ghost-costume, creature-costume's engraver | keep ("16th–19th-century" in the rulebook, "19th-century" in the one-shot) |
| Institutions | the Internet Archive is new (dracula-revealed); the Rijksmuseum also for invisible-revealed; the National Gallery of Art also for part1-tower, ch05-bellman, ch01-castle and back-festival | the same, less back-festival | **add** the Internet Archive to both |

Every other row of the table above is unchanged. Ch07-dawn stays the Google Art Project scan on Commons: the National Gallery of Art has no copy of *Opening the Fold*.

## Credits check after the outside review of v0.2 (2026-10-21)

The review said Paul Gavarni's print was still Dracula's "In costume" picture and that his name had been dropped. That isn't so: `dracula-costume` is Charles Rochussen's 1868 playbill scene (above), and Rochussen is credited; nothing by Gavarni is printed. Every picture each book prints (the `data-art` names in `book/dist/dont-get-forked.html` and `book/dist/lantern-night-in-hallowby.html`) was matched to its artist above, and both credits lines checked in both directions:

| Book | Change | Result |
|---|---|---|
| Rulebook | `spot-bonfire` printed again (Chapter 8's end) | **Christiaan Andriessen added back** to the credits, after Cuylenburgh, where he was before |
| Rulebook | — | Every other credited name has a printed picture: Koster, Palmer, Bloch, Sandby, Doré, Vallotton, Folkema, Wolgemut, Pleydenwurff, de Visscher after van Ostade, Chodowiecki, Bleker, Cornet (`spot-lantern`, Chapter 1's end), Bewick, Cuylenburgh, Lepère after Scott, Rochussen (`dracula-costume`), Morel, David, Wageman and Whittock (`creature-revealed`), van Maële, Sand, Daumier, Leech, Woodward, Batten, Macauley, W. Duke, Sons & Co., and the unknown engravers (`ch02-curiosities`, `ch03-dice`, `ghost-costume`, `creature-costume`'s engraver); every printed picture's artist is credited |
| One-shot | — | Unchanged and still exact: its five spots (lantern, owl, windmill, watchman, cart) are all printed, and every credited name has a printed picture |

