import { setSeed } from './core.mjs';
import { runRaid, DBG, DEFAULT_P } from './raid.mjs';
import { THISTLEWICK, GALLOWSMERE } from './towns.mjs';
DBG.on = true;
for (const sd of [+process.argv[2] || 5, (+process.argv[2] || 5) + 1]) {
  setSeed(sd); DBG.log = [];
  const st = runRaid(sd % 2 ? GALLOWSMERE : THISTLEWICK, sd % 2 ? ['Ghost', 'Mummy', 'Jekyll', 'Invisible'] : ['Dracula', 'Witch', 'Creature', 'Werewolf'], DEFAULT_P);
  console.log(DBG.log.join('\n'));
  console.log('RESULT', st.result, 'S', st.S, 'leftBehind', st.leftBehind, 'charges spent', st.chargesSpent, '\n');
}
