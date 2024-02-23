const base64Compile = str => WebAssembly.compile(typeof Buffer !== 'undefined' ? Buffer.from(str, 'base64') : Uint8Array.from(atob(str), b => b.charCodeAt(0)));

let dv = new DataView(new ArrayBuffer());
const dataView = mem => dv.buffer === mem.buffer ? dv : dv = new DataView(mem.buffer);

const isNode = typeof process !== 'undefined' && process.versions && process.versions.node;
let _fs;
async function fetchCompile (url) {
  if (isNode) {
    _fs = _fs || await import('fs/promises');
    return WebAssembly.compile(await _fs.readFile(url));
  }
  return fetch(url).then(WebAssembly.compileStreaming);
}

const instantiateCore = WebAssembly.instantiate;

function resourceTransfer(fromRid, toRid, handle) {
  const { table: fromTable } = {handle_tables}.get(fromRid);
  const entry = fromTable.get(handle);
  fromTable.delete(handle);
  const { table: toTable, createHandle } = {handle_tables}.get(toRid);
  const newHandle = createHandle();
  toTable.set(newHandle, entry);
  return newHandle;
}

const utf8Decoder = new TextDecoder();

let exports0;
let exports1;
let exports2;
let exports3;
let exports4;
let memory0;
let memory1;
let exports5;
let exports6;
let exports7;
let exports8;
let postReturn0;
function trampoline0(rep) {
  const handle = handleCnt4++;
  handleTable4.set(handle, { rep, own: true });
  return handle;
}
function trampoline1(rep) {
  const handle = handleCnt3++;
  handleTable3.set(handle, { rep, own: true });
  return handle;
}
function trampoline2(rep) {
  const handle = handleCnt2++;
  handleTable2.set(handle, { rep, own: true });
  return handle;
}
function trampoline3(rep) {
  const handle = handleCnt1++;
  handleTable1.set(handle, { rep, own: true });
  return handle;
}
function trampoline4(rep) {
  const handle = handleCnt0++;
  handleTable0.set(handle, { rep, own: true });
  return handle;
}
function trampoline5(handle) {
  const handleEntry = handleTable2.get(handle);
  if (!handleEntry) {
    throw new Error(`Resource error: Invalid handle ${handle}`);
  }
  return handleEntry.rep;
}
function trampoline6(handle) {
  const handleEntry = handleTable0.get(handle);
  if (!handleEntry) {
    throw new Error(`Resource error: Invalid handle ${handle}`);
  }
  handleTable0.delete(handle);
  if (handleEntry.own) {
    exports0['0'](handleEntry.rep);
  }
  
}
function trampoline7(handle) {
  const handleEntry = handleTable2.get(handle);
  if (!handleEntry) {
    throw new Error(`Resource error: Invalid handle ${handle}`);
  }
  handleTable2.delete(handle);
  if (handleEntry.own) {
    exports0['2'](handleEntry.rep);
  }
  
}
function trampoline8(rep) {
  const handle = handleCnt5++;
  handleTable5.set(handle, { rep, own: true });
  return handle;
}
function trampoline9(handle) {
  const handleEntry = handleTable4.get(handle);
  if (!handleEntry) {
    throw new Error(`Resource error: Invalid handle ${handle}`);
  }
  handleTable4.delete(handle);
  if (handleEntry.own) {
    exports0['22'](handleEntry.rep);
  }
  
}
function trampoline10(handle) {
  const handleEntry = handleTable85.get(handle);
  if (!handleEntry) {
    throw new Error(`Resource error: Invalid handle ${handle}`);
  }
  handleTable85.delete(handle);
  if (handleEntry.own) {
    exports0['22'](handleEntry.rep);
  }
  
}
function trampoline11(handle) {
  const handleEntry = handleTable86.get(handle);
  if (!handleEntry) {
    throw new Error(`Resource error: Invalid handle ${handle}`);
  }
  handleTable86.delete(handle);
  if (handleEntry.own) {
    exports0['0'](handleEntry.rep);
  }
  
}
function trampoline12(handle) {
  const handleEntry = handleTable87.get(handle);
  if (!handleEntry) {
    throw new Error(`Resource error: Invalid handle ${handle}`);
  }
  handleTable87.delete(handle);
  if (handleEntry.own) {
    exports0['2'](handleEntry.rep);
  }
  
}
function trampoline13(handle) {
  const handleEntry = handleTable88.get(handle);
  if (!handleEntry) {
    throw new Error(`Resource error: Invalid handle ${handle}`);
  }
  handleTable88.delete(handle);
  if (handleEntry.own) {
    exports0['3'](handleEntry.rep);
  }
  
}
const trampoline14 = resourceTransfer;
function trampoline15(from_ptr, len, to_ptr) {
  new Uint8Array(memory1.buffer, to_ptr, len).set(new Uint8Array(memory0.buffer, from_ptr, len));
}

function trampoline16() {
  console.log('RESOURCE ENTER CALL');
}
const trampoline17 = resourceTransfer;
function trampoline18() {
  console.log('RESOURCE EXIT CALL');
}

function helloWorld() {
  const ret = exports4['hello-world']();
  var ptr0 = dataView(memory1).getInt32(ret + 0, true);
  var len0 = dataView(memory1).getInt32(ret + 4, true);
  var result0 = utf8Decoder.decode(new Uint8Array(memory1.buffer, ptr0, len0));
  postReturn0(ret);
  return result0;
}

const $init = (async() => {
  const module0 = fetchCompile(new URL('./virt.core.wasm', import.meta.url));
  const module1 = fetchCompile(new URL('./virt.core2.wasm', import.meta.url));
  const module2 = base64Compile('AGFzbQEAAAABKQdgAX8AYAN/fn8AYAJ/fwBgBH9/f38AYAR/f39/AX9gAn9/AX9gAX8AAxEQAAABAgICAgIDAwIABAUFBgQFAXABEBAHUhEBMAAAATEAAQEyAAIBMwADATQABAE1AAUBNgAGATcABwE4AAgBOQAJAjEwAAoCMTEACwIxMgAMAjEzAA0CMTQADgIxNQAPCCRpbXBvcnRzAQAKxwEQCQAgAEEAEQAACwkAIABBAREAAAsNACAAIAEgAkECEQEACwsAIAAgAUEDEQIACwsAIAAgAUEEEQIACwsAIAAgAUEFEQIACwsAIAAgAUEGEQIACwsAIAAgAUEHEQIACw8AIAAgASACIANBCBEDAAsPACAAIAEgAiADQQkRAwALCwAgACABQQoRAgALCQAgAEELEQAACw8AIAAgASACIANBDBEEAAsLACAAIAFBDREFAAsLACAAIAFBDhEFAAsJACAAQQ8RBgALAC4JcHJvZHVjZXJzAQxwcm9jZXNzZWQtYnkBDXdpdC1jb21wb25lbnQGMC4yMC4zANEHBG5hbWUAExJ3aXQtY29tcG9uZW50OnNoaW0BtAcQADdpbmRpcmVjdC13YXNpOmZpbGVzeXN0ZW0vcHJlb3BlbnNAMC4yLjAtZ2V0LWRpcmVjdG9yaWVzATdpbmRpcmVjdC13YXNpOmZpbGVzeXN0ZW0vcHJlb3BlbnNAMC4yLjAtZ2V0LWRpcmVjdG9yaWVzAkhpbmRpcmVjdC13YXNpOmZpbGVzeXN0ZW0vdHlwZXNAMC4yLjAtW21ldGhvZF1kZXNjcmlwdG9yLndyaXRlLXZpYS1zdHJlYW0DSWluZGlyZWN0LXdhc2k6ZmlsZXN5c3RlbS90eXBlc0AwLjIuMC1bbWV0aG9kXWRlc2NyaXB0b3IuYXBwZW5kLXZpYS1zdHJlYW0EQGluZGlyZWN0LXdhc2k6ZmlsZXN5c3RlbS90eXBlc0AwLjIuMC1bbWV0aG9kXWRlc2NyaXB0b3IuZ2V0LXR5cGUFPGluZGlyZWN0LXdhc2k6ZmlsZXN5c3RlbS90eXBlc0AwLjIuMC1bbWV0aG9kXWRlc2NyaXB0b3Iuc3RhdAY6aW5kaXJlY3Qtd2FzaTpmaWxlc3lzdGVtL3R5cGVzQDAuMi4wLWZpbGVzeXN0ZW0tZXJyb3ItY29kZQdAaW5kaXJlY3Qtd2FzaTppby9zdHJlYW1zQDAuMi4wLVttZXRob2Rdb3V0cHV0LXN0cmVhbS5jaGVjay13cml0ZQg6aW5kaXJlY3Qtd2FzaTppby9zdHJlYW1zQDAuMi4wLVttZXRob2Rdb3V0cHV0LXN0cmVhbS53cml0ZQlNaW5kaXJlY3Qtd2FzaTppby9zdHJlYW1zQDAuMi4wLVttZXRob2Rdb3V0cHV0LXN0cmVhbS5ibG9ja2luZy13cml0ZS1hbmQtZmx1c2gKQ2luZGlyZWN0LXdhc2k6aW8vc3RyZWFtc0AwLjIuMC1bbWV0aG9kXW91dHB1dC1zdHJlYW0uYmxvY2tpbmctZmx1c2gLM2luZGlyZWN0LXdhc2k6Y2xpL2Vudmlyb25tZW50QDAuMi4wLWdldC1lbnZpcm9ubWVudAwlYWRhcHQtd2FzaV9zbmFwc2hvdF9wcmV2aWV3MS1mZF93cml0ZQ0oYWRhcHQtd2FzaV9zbmFwc2hvdF9wcmV2aWV3MS1lbnZpcm9uX2dldA4uYWRhcHQtd2FzaV9zbmFwc2hvdF9wcmV2aWV3MS1lbnZpcm9uX3NpemVzX2dldA8mYWRhcHQtd2FzaV9zbmFwc2hvdF9wcmV2aWV3MS1wcm9jX2V4aXQ');
  const module3 = base64Compile('AGFzbQEAAAABKQdgAX8AYAN/fn8AYAJ/fwBgBH9/f38AYAR/f39/AX9gAn9/AX9gAX8AAmYRAAEwAAAAATEAAAABMgABAAEzAAIAATQAAgABNQACAAE2AAIAATcAAgABOAADAAE5AAMAAjEwAAIAAjExAAAAAjEyAAQAAjEzAAUAAjE0AAUAAjE1AAYACCRpbXBvcnRzAXABEBAJFgEAQQALEAABAgMEBQYHCAkKCwwNDg8ALglwcm9kdWNlcnMBDHByb2Nlc3NlZC1ieQENd2l0LWNvbXBvbmVudAYwLjIwLjMAHARuYW1lABUUd2l0LWNvbXBvbmVudDpmaXh1cHM');
  const module4 = fetchCompile(new URL('./virt.core3.wasm', import.meta.url));
  const module5 = base64Compile('AGFzbQEAAAABBQFgAX8AAxkYAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAUBcAEYGAd6GQEwAAABMQABATIAAgEzAAMBNAAEATUABQE2AAYBNwAHATgACAE5AAkCMTAACgIxMQALAjEyAAwCMTMADQIxNAAOAjE1AA8CMTYAEAIxNwARAjE4ABICMTkAEwIyMAAUAjIxABUCMjIAFgIyMwAXCCRpbXBvcnRzAQAK8QEYCQAgAEEAEQAACwkAIABBAREAAAsJACAAQQIRAAALCQAgAEEDEQAACwkAIABBBBEAAAsJACAAQQURAAALCQAgAEEGEQAACwkAIABBBxEAAAsJACAAQQgRAAALCQAgAEEJEQAACwkAIABBChEAAAsJACAAQQsRAAALCQAgAEEMEQAACwkAIABBDREAAAsJACAAQQ4RAAALCQAgAEEPEQAACwkAIABBEBEAAAsJACAAQRERAAALCQAgAEESEQAACwkAIABBExEAAAsJACAAQRQRAAALCQAgAEEVEQAACwkAIABBFhEAAAsJACAAQRcRAAALAC4JcHJvZHVjZXJzAQxwcm9jZXNzZWQtYnkBDXdpdC1jb21wb25lbnQGMC4yMS4wAKQKBG5hbWUAExJ3aXQtY29tcG9uZW50OnNoaW0BhwoYACZkdG9yLVtleHBvcnRdd2FzaTppby9lcnJvckAwLjIuMC1lcnJvcgEoZHRvci1bZXhwb3J0XXdhc2k6aW8vcG9sbEAwLjIuMC1wb2xsYWJsZQIvZHRvci1bZXhwb3J0XXdhc2k6aW8vc3RyZWFtc0AwLjIuMC1pbnB1dC1zdHJlYW0DMGR0b3ItW2V4cG9ydF13YXNpOmlvL3N0cmVhbXNAMC4yLjAtb3V0cHV0LXN0cmVhbQRFZHRvci1bZXhwb3J0XXdhc2k6c29ja2V0cy9pcC1uYW1lLWxvb2t1cEAwLjIuMC1yZXNvbHZlLWFkZHJlc3Mtc3RyZWFtBS5kdG9yLVtleHBvcnRdd2FzaTpzb2NrZXRzL3RjcEAwLjIuMC10Y3Atc29ja2V0Bi5kdG9yLVtleHBvcnRdd2FzaTpzb2NrZXRzL3VkcEAwLjIuMC11ZHAtc29ja2V0BzxkdG9yLVtleHBvcnRdd2FzaTpzb2NrZXRzL3VkcEAwLjIuMC1pbmNvbWluZy1kYXRhZ3JhbS1zdHJlYW0IPGR0b3ItW2V4cG9ydF13YXNpOnNvY2tldHMvdWRwQDAuMi4wLW91dGdvaW5nLWRhdGFncmFtLXN0cmVhbQkpZHRvci1bZXhwb3J0XXdhc2k6aHR0cC90eXBlc0AwLjIuMC1maWVsZHMKM2R0b3ItW2V4cG9ydF13YXNpOmh0dHAvdHlwZXNAMC4yLjAtaW5jb21pbmctcmVxdWVzdAszZHRvci1bZXhwb3J0XXdhc2k6aHR0cC90eXBlc0AwLjIuMC1vdXRnb2luZy1yZXF1ZXN0DDJkdG9yLVtleHBvcnRdd2FzaTpodHRwL3R5cGVzQDAuMi4wLXJlcXVlc3Qtb3B0aW9ucw00ZHRvci1bZXhwb3J0XXdhc2k6aHR0cC90eXBlc0AwLjIuMC1yZXNwb25zZS1vdXRwYXJhbQ40ZHRvci1bZXhwb3J0XXdhc2k6aHR0cC90eXBlc0AwLjIuMC1pbmNvbWluZy1yZXNwb25zZQ8wZHRvci1bZXhwb3J0XXdhc2k6aHR0cC90eXBlc0AwLjIuMC1pbmNvbWluZy1ib2R5EDJkdG9yLVtleHBvcnRdd2FzaTpodHRwL3R5cGVzQDAuMi4wLWZ1dHVyZS10cmFpbGVycxE0ZHRvci1bZXhwb3J0XXdhc2k6aHR0cC90eXBlc0AwLjIuMC1vdXRnb2luZy1yZXNwb25zZRIwZHRvci1bZXhwb3J0XXdhc2k6aHR0cC90eXBlc0AwLjIuMC1vdXRnb2luZy1ib2R5EztkdG9yLVtleHBvcnRdd2FzaTpodHRwL3R5cGVzQDAuMi4wLWZ1dHVyZS1pbmNvbWluZy1yZXNwb25zZRQ5ZHRvci1bZXhwb3J0XXdhc2k6Y2xpL3Rlcm1pbmFsLWlucHV0QDAuMi4wLXRlcm1pbmFsLWlucHV0FTtkdG9yLVtleHBvcnRdd2FzaTpjbGkvdGVybWluYWwtb3V0cHV0QDAuMi4wLXRlcm1pbmFsLW91dHB1dBYzZHRvci1bZXhwb3J0XXdhc2k6ZmlsZXN5c3RlbS90eXBlc0AwLjIuMC1kZXNjcmlwdG9yFz9kdG9yLVtleHBvcnRdd2FzaTpmaWxlc3lzdGVtL3R5cGVzQDAuMi4wLWRpcmVjdG9yeS1lbnRyeS1zdHJlYW0');
  const module6 = base64Compile('AGFzbQEAAAABBQFgAX8AApYBGQABMAAAAAExAAAAATIAAAABMwAAAAE0AAAAATUAAAABNgAAAAE3AAAAATgAAAABOQAAAAIxMAAAAAIxMQAAAAIxMgAAAAIxMwAAAAIxNAAAAAIxNQAAAAIxNgAAAAIxNwAAAAIxOAAAAAIxOQAAAAIyMAAAAAIyMQAAAAIyMgAAAAIyMwAAAAgkaW1wb3J0cwFwARgYCR4BAEEACxgAAQIDBAUGBwgJCgsMDQ4PEBESExQVFhcALglwcm9kdWNlcnMBDHByb2Nlc3NlZC1ieQENd2l0LWNvbXBvbmVudAYwLjIxLjAAHARuYW1lABUUd2l0LWNvbXBvbmVudDpmaXh1cHM');
  const module7 = base64Compile('AGFzbQEAAAABKAdgAAF/YAN/f38Bf2ABfwBgBH9/f38Bf2ADf39/AGAAAX9gA39/fwACpwIOBWZsYWdzCWluc3RhbmNlMQN/AQVmbGFncwppbnN0YW5jZTMyA38BBmNhbGxlZQhhZGFwdGVyMAAACHJlc291cmNlDHRyYW5zZmVyLW93bgABBmNhbGxlZQhhZGFwdGVyMQACBmNhbGxlZQhhZGFwdGVyMgAABmNhbGxlZQhhZGFwdGVyMwAABm1lbW9yeQJtMAIAAAdyZWFsbG9jAmY1AAMGY2FsbGVlCGFkYXB0ZXI0AAALcG9zdF9yZXR1cm4IYWRhcHRlcjQAAgl0cmFuc2NvZGUbdXRmOC10by11dGY4IChtZW0wID0+IG1lbTEpAAQIYXVnbWVudHMPbWVtMSBNZW1vcnlTaXplAAUIYXVnbWVudHMNbWVtMSBJMzJTdG9yZQAGAwYFAAIAAAIHOAUIYWRhcHRlcjAACwhhZGFwdGVyMQAMCGFkYXB0ZXIyAA0IYWRhcHRlcjMADghhZGFwdGVyNAAPCukFBU8BAX8jAUEBcUUEQAALIwBBAnFFBEAACyMAQX1xJAAjAEF+cSQAIwBBAXIkABAAIQAjAUF+cSQBIABBA0HYABABIwFBAXIkASMAQQJyJAALXAAjAUEBcUUEQAALIwBBAnFFBEAACyMAQX1xJAAjAEF+cSQAAn8CQAJAAkAgAA4CAQIACwALQQAMAQtBAQsjAEEBciQAEAIjAUF+cSQBIwFBAXIkASMAQQJyJAALTwEBfyMBQQFxRQRAAAsjAEECcUUEQAALIwBBfXEkACMAQX5xJAAjAEEBciQAEAMhACMBQX5xJAEgAEECQdcAEAEjAUEBciQBIwBBAnIkAAtPAQF/IwFBAXFFBEAACyMAQQJxRQRAAAsjAEF9cSQAIwBBfnEkACMAQQFyJAAQBCEAIwFBfnEkASAAQQNB2AAQASMBQQFyJAEjAEECciQAC5kDAwN/AX4JfyMBQQFxRQRAAAsjAEECcUUEQAALIwBBfXEkACMAQX5xJAAjAEEBciQAEAYhASMBQX5xJAEgAUEDcQRAAAsgAEEDcQRAAAsgASgCACABKAIEIQIhAyADQQNxBEAACwJAAkAgAq1CDH4iBEIgiFANAQsACyAEpyEFIAUhBkEAQQBBBCAGEAUhByAHQQNxBEAACwJAAkA/AK1CEIYgA60gBa18Wg0BCwALAkACQBAJrUIQhiAHrSAGrXxaDQELAAsCQCACIgZFDQAgAyEFIAchCANAIAggBSgCAEEEQdUAEAFBABAKIAUoAgQgBSgCCCEJIQogCUGAgICAeE8EQAALIAkiCyEMQQBBAEEBIAwQBSENAkACQD8ArUIQhiAKrSAJrXxaDQELAAsCQAJAEAmtQhCGIA2tIAytfFoNAQsACyAKIAkgDRAIIAggDUEEEAogCCALQQgQCiAFQQxqIQUgCEEMaiEIIAZBf2oiBg0ACwsgACAHQQAQCiAAIAJBBBAKIwFBAXIkASABEAcjAEECciQACw');
  const module8 = fetchCompile(new URL('./virt.core4.wasm', import.meta.url));
  const instanceFlags1 = new WebAssembly.Global({ value: "i32", mutable: true }, 3);
  const instanceFlags32 = new WebAssembly.Global({ value: "i32", mutable: true }, 3);
  ({ exports: exports0 } = await instantiateCore(await module5));
  ({ exports: exports1 } = await instantiateCore(await module4, {
    '[export]wasi:filesystem/types@0.2.0': {
      '[resource-drop]descriptor': trampoline9,
      '[resource-new]descriptor': trampoline0,
      '[resource-new]directory-entry-stream': trampoline8,
    },
    '[export]wasi:io/error@0.2.0': {
      '[resource-drop]error': trampoline6,
      '[resource-new]error': trampoline4,
    },
    '[export]wasi:io/poll@0.2.0': {
      '[resource-new]pollable': trampoline3,
    },
    '[export]wasi:io/streams@0.2.0': {
      '[resource-drop]input-stream': trampoline7,
      '[resource-new]input-stream': trampoline2,
      '[resource-new]output-stream': trampoline1,
      '[resource-rep]input-stream': trampoline5,
    },
  }));
  ({ exports: exports2 } = await instantiateCore(await module6, {
    '': {
      $imports: exports0.$imports,
      '0': exports1['wasi:io/error@0.2.0#[dtor]error'],
      '1': exports1['wasi:io/poll@0.2.0#[dtor]pollable'],
      '10': exports1['wasi:http/types@0.2.0#[dtor]fields'],
      '11': exports1['wasi:http/types@0.2.0#[dtor]fields'],
      '12': exports1['wasi:cli/terminal-input@0.2.0#[dtor]terminal-input'],
      '13': exports1['wasi:http/types@0.2.0#[dtor]fields'],
      '14': exports1['wasi:http/types@0.2.0#[dtor]fields'],
      '15': exports1['wasi:http/types@0.2.0#[dtor]fields'],
      '16': exports1['wasi:http/types@0.2.0#[dtor]fields'],
      '17': exports1['wasi:http/types@0.2.0#[dtor]fields'],
      '18': exports1['wasi:http/types@0.2.0#[dtor]fields'],
      '19': exports1['wasi:http/types@0.2.0#[dtor]fields'],
      '2': exports1['wasi:io/streams@0.2.0#[dtor]input-stream'],
      '20': exports1['wasi:cli/terminal-input@0.2.0#[dtor]terminal-input'],
      '21': exports1['wasi:cli/terminal-input@0.2.0#[dtor]terminal-input'],
      '22': exports1['wasi:filesystem/types@0.2.0#[dtor]descriptor'],
      '23': exports1['wasi:filesystem/types@0.2.0#[dtor]directory-entry-stream'],
      '3': exports1['wasi:io/streams@0.2.0#[dtor]output-stream'],
      '4': exports1['wasi:cli/terminal-input@0.2.0#[dtor]terminal-input'],
      '5': exports1['wasi:cli/terminal-input@0.2.0#[dtor]terminal-input'],
      '6': exports1['wasi:cli/terminal-input@0.2.0#[dtor]terminal-input'],
      '7': exports1['wasi:cli/terminal-input@0.2.0#[dtor]terminal-input'],
      '8': exports1['wasi:cli/terminal-input@0.2.0#[dtor]terminal-input'],
      '9': exports1['wasi:http/types@0.2.0#[dtor]fields'],
    },
  }));
  ({ exports: exports3 } = await instantiateCore(await module2));
  ({ exports: exports4 } = await instantiateCore(await module0, {
    'wasi:filesystem/preopens@0.2.0': {
      'get-directories': exports3['0'],
    },
    'wasi:filesystem/types@0.2.0': {
      '[resource-drop]descriptor': trampoline10,
    },
    wasi_snapshot_preview1: {
      environ_get: exports3['13'],
      environ_sizes_get: exports3['14'],
      fd_write: exports3['12'],
      proc_exit: exports3['15'],
    },
  }));
  memory0 = exports1.memory;
  memory1 = exports4.memory;
  ({ exports: exports5 } = await instantiateCore(await module7, {
    augments: {
      'mem1 I32Store': (ptr, val, offset) => {
        new DataView(exports4.memory.buffer).setInt32(ptr + offset, val, true);
      },
      'mem1 MemorySize': ptr => exports4.memory.buffer.byteLength / 65536,
    },
    callee: {
      adapter0: exports1['wasi:cli/stderr@0.2.0#get-stderr'],
      adapter1: exports1['wasi:http/types@0.2.0#[dtor]fields'],
      adapter2: exports1['wasi:cli/stdin@0.2.0#get-stdin'],
      adapter3: exports1['wasi:cli/stdout@0.2.0#get-stdout'],
      adapter4: exports1['wasi:filesystem/preopens@0.2.0#get-directories'],
    },
    flags: {
      instance1: instanceFlags1,
      instance32: instanceFlags32,
    },
    memory: {
      m0: exports1.memory,
    },
    post_return: {
      adapter4: exports1['cabi_post_wasi:filesystem/preopens@0.2.0#get-directories'],
    },
    realloc: {
      f5: exports4.cabi_realloc,
    },
    resource: {
      'transfer-own': trampoline14,
    },
    transcode: {
      'utf8-to-utf8 (mem0 => mem1)': trampoline15,
    },
  }));
  ({ exports: exports6 } = await instantiateCore(await module1, {
    __main_module__: {
      cabi_realloc: exports4.cabi_realloc,
    },
    env: {
      memory: exports4.memory,
    },
    'wasi:cli/environment@0.2.0': {
      'get-environment': exports3['11'],
    },
    'wasi:cli/exit@0.2.0': {
      exit: exports5.adapter1,
    },
    'wasi:cli/stderr@0.2.0': {
      'get-stderr': exports5.adapter0,
    },
    'wasi:cli/stdin@0.2.0': {
      'get-stdin': exports5.adapter2,
    },
    'wasi:cli/stdout@0.2.0': {
      'get-stdout': exports5.adapter3,
    },
    'wasi:filesystem/preopens@0.2.0': {
      'get-directories': exports3['1'],
    },
    'wasi:filesystem/types@0.2.0': {
      '[method]descriptor.append-via-stream': exports3['3'],
      '[method]descriptor.get-type': exports3['4'],
      '[method]descriptor.stat': exports3['5'],
      '[method]descriptor.write-via-stream': exports3['2'],
      '[resource-drop]descriptor': trampoline10,
      'filesystem-error-code': exports3['6'],
    },
    'wasi:io/error@0.2.0': {
      '[resource-drop]error': trampoline11,
    },
    'wasi:io/streams@0.2.0': {
      '[method]output-stream.blocking-flush': exports3['10'],
      '[method]output-stream.blocking-write-and-flush': exports3['9'],
      '[method]output-stream.check-write': exports3['7'],
      '[method]output-stream.write': exports3['8'],
      '[resource-drop]input-stream': trampoline12,
      '[resource-drop]output-stream': trampoline13,
    },
  }));
  ({ exports: exports7 } = await instantiateCore(await module8, {
    augments: {
      'mem1 I32Load8U': (ptr, off) => new DataView(exports4.memory.buffer).getUint8(ptr + off, true),
      'mem1 I32Store': (ptr, val, offset) => {
        new DataView(exports4.memory.buffer).setInt32(ptr + offset, val, true);
      },
      'mem1 I32Store8': (ptr, val, offset) => {
        new DataView(exports4.memory.buffer).setInt8(ptr + offset, val, true);
      },
      'mem1 I64Store': (ptr, val, offset) => {
        new DataView(exports4.memory.buffer).setBigInt64(ptr + offset, val, true);
      },
      'mem1 MemorySize': ptr => exports4.memory.buffer.byteLength / 65536,
    },
    callee: {
      adapter10: exports1['wasi:filesystem/types@0.2.0#filesystem-error-code'],
      adapter11: exports1['wasi:io/streams@0.2.0#[method]output-stream.check-write'],
      adapter12: exports1['wasi:io/streams@0.2.0#[method]output-stream.write'],
      adapter13: exports1['wasi:io/streams@0.2.0#[method]output-stream.flush'],
      adapter14: exports1['wasi:cli/environment@0.2.0#get-environment'],
      adapter5: exports1['wasi:filesystem/preopens@0.2.0#get-directories'],
      adapter6: exports1['wasi:filesystem/types@0.2.0#[method]descriptor.write-via-stream'],
      adapter7: exports1['wasi:filesystem/types@0.2.0#[method]descriptor.append-via-stream'],
      adapter8: exports1['wasi:filesystem/types@0.2.0#[method]descriptor.get-type'],
      adapter9: exports1['wasi:filesystem/types@0.2.0#[method]descriptor.stat'],
    },
    flags: {
      instance1: instanceFlags1,
      instance32: instanceFlags32,
    },
    memory: {
      m0: exports1.memory,
    },
    post_return: {
      adapter14: exports1['cabi_post_wasi:cli/environment@0.2.0#get-environment'],
      adapter5: exports1['cabi_post_wasi:filesystem/preopens@0.2.0#get-directories'],
    },
    realloc: {
      f0: exports6.cabi_import_realloc,
      f14: exports1.cabi_realloc,
    },
    resource: {
      'enter-call': trampoline16,
      'exit-call': trampoline18,
      'transfer-borrow': trampoline17,
      'transfer-own': trampoline14,
    },
    transcode: {
      'utf8-to-utf8 (mem0 => mem1)': trampoline15,
    },
  }));
  ({ exports: exports8 } = await instantiateCore(await module3, {
    '': {
      $imports: exports3.$imports,
      '0': exports5.adapter4,
      '1': exports7.adapter5,
      '10': exports7.adapter13,
      '11': exports7.adapter14,
      '12': exports6.fd_write,
      '13': exports6.environ_get,
      '14': exports6.environ_sizes_get,
      '15': exports6.proc_exit,
      '2': exports7.adapter6,
      '3': exports7.adapter7,
      '4': exports7.adapter8,
      '5': exports7.adapter9,
      '6': exports7.adapter10,
      '7': exports7.adapter11,
      '8': exports7.adapter12,
      '9': exports7.adapter12,
    },
  }));
  postReturn0 = exports4['cabi_post_hello-world'];
})();

await $init;

export { helloWorld,  }