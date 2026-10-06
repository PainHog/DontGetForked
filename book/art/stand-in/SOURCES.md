# Stand-in art: sources and checks

Public-domain prints standing in until the illustrator's work arrives (decided by Richard on 2026-10-05; `docs/DESIGN.md`). Every piece was checked against its Wikimedia Commons licence data on 2026-10-05 (CC0 museum release or public domain; no restrictions recorded), looked at, and audited against `book/art/ART-CHECKLIST.md`. The monsters appear only in the Entities' portraits (the last section), which Richard asked for as inspiration for the illustrator.

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

## ch09-fair: Chapter 9 header

- **Work:** Dorpskermis, RP-P-OB-62.004.jpg
- **Artist:** Jan de Visscher (Dutch, c. 1636–after 1692), after a painting by Adriaen van Ostade (Dutch, 1610–1685); 1643–1692
- **Source:** https://commons.wikimedia.org/wiki/File:Dorpskermis,_RP-P-OB-62.004.jpg (the 1920px thumbnail)
- **Licence:** CC0 (CC-zero). Rijksmuseum Amsterdam scan released CC0 (Copyright: Publiek domein); both artists died more than 250 years ago. Checked on its Commons file page through the API on 2026-10-06.
- **Audit:** A dance in front of an inn: the piper stands raised above the crowd (his footing is hidden behind the dancers), a couple dances hand in hand with a child between them, a man sits on a barrel raising a cup, onlookers stand in the doorway, a dog runs at the children, a broken cart lies by a dead tree, and a pole with a festival rag leans on the roof. Counted: faces in profile show one eye, frontal faces two; arms join at the shoulders. Feet, the dog's legs, the barrel and the cart wheel run off the bottom edge with the ground, deliberately (the street continues out of frame); nothing is cut inside the frame. The houses' upper storeys, the sky and the plate border are cropped off. Nothing crude in the crop (the scene is a dance; no drunkenness or brawling shown).

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

## spot-bonfire: Spot (Chapter 8 end)

- **Work:** Kinderen bij een vreugdevuur op St. Maarten, RP-T-2016-35.jpg ("van St. Martens Vuurtje", children at a St Martin's Day bonfire, the Dutch lantern festival; added 2026-10-05 with Lantern Night)
- **Artist:** Christiaan Andriessen (Dutch, 1775-1846); 1805-1808, pen and watercolour
- **Source:** https://commons.wikimedia.org/wiki/File:Kinderen_bij_een_vreugdevuur_op_St._Maarten,_RP-T-2016-35.jpg (prepared from Commons' 1920 px rendition; the full scan is throttled)
- **Licence:** CC0 (CC-zero), checked 2026-10-05. Rijksmuseum Amsterdam scan released CC0; artist died 1846.
- **Audit:** Seven figures standing or kneeling on the ground round a bonfire, their shadows running out from the fire across the ground; the fire on the ground among their feet; a tree rooted at the left, its branches overhead; fence posts set in the ground at the right. Faces that turn to us show two eyes. The artist's handwritten date and title are cropped off.

## The Entities' portraits (Chapter 2)

Added 2026-10-05 at Richard's request ("my illustrator uses them for inspiration"): two per Entity, in costume and revealed, in frames about 0.85:1 (1.66 × 1.95 in). Licences re-checked on Commons the same day. Every monster is a pre-1930 print, so none borrows the Universal film looks; they show what the illustrator's originals should be about, not how they should look.

### dracula-costume: Dracula, in costume

- **Work:** Scène uit toneeldrama De kinderroofster, RP-P-1877-A-168.jpg
- **Artist:** Charles Rochussen (1814-1894); 1868 (playbill for 'De Kinderroofster', Amsterdam Stadsschouwburg)
- **Source:** https://commons.wikimedia.org/wiki/File:Sc%C3%A8ne_uit_toneeldrama_De_kinderroofster,_RP-P-1877-A-168.jpg
- **Licence:** CC0 (CC-Zero). Artist died 1894; Rijksmuseum scan released CC0 (CC-Zero).
- **Audit:** A masked man in a broad-brimmed hat and cloak, his right hand resting on a table among papers; a candle burning in a bottle on the table. Character: two eyes behind the half-mask, two arms (one hand on the table, fingers spread on the papers; the other under the cloak), legs run out of the frame at the bottom. The pleading woman is cut by the left frame edge, deliberately; the playbill's lettering is cropped off.

### dracula-revealed: Dracula, revealed

- **Work:** Philippe-Amédée Roustan dans le rôle de Lord Ruthwen.jpg
- **Artist:** Anonymous engraver, for Charles Malo's Almanach des Spectacles (Paris, Louis Janet); 1821 (role created 1820, Théâtre de la Porte Saint-Martin)
- **Source:** https://commons.wikimedia.org/wiki/File:Philippe-Am%C3%A9d%C3%A9e_Roustan_dans_le_r%C3%B4le_de_Lord_Ruthwen.jpg
- **Licence:** Public domain (PD-anon-70-EU). Anonymous work published 1821 (205 years old, over the 150-year bar for unknown artists); Commons tags it PD-anon-70-EU.
- **Audit:** The actor stands on the stage floor, both feet down; sword hung from his belt, plumed hat on his head. Character: two eyes (profile, one visible), two arms (right pointing, five fingers; left on hip), two legs. The plate's printed border shows at the left edge; the caption is cropped off.

### creature-costume: Frankenstein’s Creature, in costume

- **Work:** Reuzenfiguren in de optocht voor de Heilige Rombout, 1825. De Reuse Familie, BI-B-FM-117-12.jpg (Mechelen's festival giants in the 1825 procession)
- **Artist:** Jan Vervloet (Flemish, 1798-1869), lithograph; printed by Burggraaff, published by Van Velsen-Van der Elst, Mechelen, 1825
- **Source:** https://commons.wikimedia.org/wiki/File:Reuzenfiguren_in_de_optocht_voor_de_Heilige_Rombout,_1825_De_Reuse_Familie_(titel_op_object),_BI-B-FM-117-12.jpg (prepared from Commons' 1920 px rendition)
- **Licence:** CC0 (Rijksmuseum Amsterdam scan released CC0), checked 2026-10-06; artist died 1869, published 1825.
- **Replaces** (2026-10-06): Pietro Longhi's *Il gigante Magrat* (Ca' Rezzonico, Venice), because Italian law lets state museums charge for commercial reproductions of works they hold, even out of copyright.
- **Audit:** Three festival giants standing on the cobbles, their skirts reaching the ground; a fifer (fife held to his mouth) and a drummer (drum hung at his side, sticks in hand) standing at their feet, two legs each, both feet down. Faces turned to us show two eyes. The other two giants and the printed caption are cropped off.

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
- **Audit:** The mummy sits up in its sarcophagus, both hands on the rim; a hieroglyph frieze on the sarcophagus; a bird-headed statue standing behind. Character: two eyes, two arms, head-wrapping on. Low-resolution scan: reference only. Not the film look.

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

- **Work:** -Qui diable ça peut-il être. G.31461.jpg
- **Artist:** Paul Gavarni (designer, 1804-1866); engraved by Pierre Verdeil (1812-after 1874); 1840s ('Le Carnaval à Paris: bals masqués par Gavarni', Œuvres de Gavarni)
- **Source:** https://commons.wikimedia.org/wiki/File:-Qui_diable_%C3%A7a_peut-il_%C3%AAtre._G.31461.jpg
- **Licence:** CC0 (CC-Zero). Designer died 1866; engraver born 1812; Paris Musées (Musée Carnavalet) scan released CC0.
- **Audit:** Two gentlemen in top hats and evening coats stand on the floor, both feet down, each in a false nose and moustache; one whispers to the other; a crowd in the doorway behind. Character rows: two eyes, two arms, two legs each. A collector's stamp on the blank paper at bottom right is painted out (`erase` in the manifest); the caption is cropped off.

### invisible-revealed: the Invisible Man, revealed

- **Work:** Wells Strimpl - L'homme invisible.jpg
- **Artist:** Ludvík Strimpl (1880-1937); 1912 (cover of 'L'Homme invisible', Calmann-Lévy, Nouvelle Collection illustrée)
- **Source:** https://commons.wikimedia.org/wiki/File:Wells_Strimpl_-_L%27homme_invisible.jpg
- **Licence:** Public domain (PD-Art (PD-old-auto-expired), PD-old-80-expired, CC-PD-Mark). Artist died 1937; published 1912; Commons: PD-old-80-expired / PD-Art.
- **Audit:** A skeleton crouches on a ledge by a window, hands and feet on the ledge, in a beam of light. Character: two arms, two legs, the skull turned away. Nothing floats.

### ghost-costume: a Ghost, in costume

- **Work:** Hammersmith Ghost.PNG
- **Artist:** Anonymous engraver, Kirby's Wonderful and Scientific Museum, vol. II (London); 1804
- **Source:** https://commons.wikimedia.org/wiki/File:Hammersmith_Ghost.PNG
- **Licence:** Public domain (Author died more than 100 years ago public domain images, CC-PD-Mark). Anonymous work published 1804 (222 years old); Commons: author died more than 100 years ago.
- **Audit:** A man under a white sheet, holding it up over his head, face peeping out; a door on its hinges with a bolt at the right, a lattice fence at the left, moon and clouds in the sky. The sheet runs out of the frame at the bottom.

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
- **Audit:** A child dressed as a witch (pointed hat, cloak) holds a tall staff topped with a ball, a large moon disc behind her; she runs out of the frame at the bottom. Character: two eyes, two hands on the staff.

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
