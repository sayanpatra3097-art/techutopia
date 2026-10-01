import { runSync } from './scripts/importAndBlast.js';

async function test() {
  try {
    const res = await runSync();
    console.log(res);
  } catch(e) {
    console.error("ERROR CAUGHT:");
    console.error(e.message);
  }
}
test();
