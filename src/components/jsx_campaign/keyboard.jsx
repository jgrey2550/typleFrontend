import React, { useState } from 'react';
import { useEffect } from 'react';

import click from '../sounds/click.mp3';


function Keyboard({equiptSkin}) {
    //imports depending on keyboard selected

    const keyboardName = equiptSkin || "Default";

    const backtick = require(`../pictures/${keyboardName}/backtick.png`);
    const one = require(`../pictures/${keyboardName}/1.png`);
    const two = require(`../pictures/${keyboardName}/2.png`);
    const three = require(`../pictures/${keyboardName}/3.png`);
    const four = require(`../pictures/${keyboardName}/4.png`);
    const five = require(`../pictures/${keyboardName}/5.png`);
    const six = require(`../pictures/${keyboardName}/6.png`);
    const seven = require(`../pictures/${keyboardName}/7.png`);
    const eight = require(`../pictures/${keyboardName}/8.png`);
    const nine = require(`../pictures/${keyboardName}/9.png`);
    const zero = require(`../pictures/${keyboardName}/0.png`);
    const hyphon = require(`../pictures/${keyboardName}/-.png`);
    const equals = require(`../pictures/${keyboardName}/=.png`);
    const backspace = require(`../pictures/${keyboardName}/backspace.png`);
    const tab = require(`../pictures/${keyboardName}/tab.png`);
    const q = require(`../pictures/${keyboardName}/q.png`);
    const w = require(`../pictures/${keyboardName}/w.png`);
    const e = require(`../pictures/${keyboardName}/e.png`);
    const r = require(`../pictures/${keyboardName}/r.png`);
    const t = require(`../pictures/${keyboardName}/t.png`);
    const y = require(`../pictures/${keyboardName}/y.png`);
    const u = require(`../pictures/${keyboardName}/u.png`);
    const i = require(`../pictures/${keyboardName}/i.png`);
    const o = require(`../pictures/${keyboardName}/o.png`);
    const p = require(`../pictures/${keyboardName}/p.png`);
    const squareleft = require(`../pictures/${keyboardName}/[.png`);
    const squareright = require(`../pictures/${keyboardName}/].png`);
    const backslash = require(`../pictures/${keyboardName}/backslash.png`);
    const capslock = require(`../pictures/${keyboardName}/capslock.png`);
    const a = require(`../pictures/${keyboardName}/a.png`);
    const s = require(`../pictures/${keyboardName}/s.png`);
    const d = require(`../pictures/${keyboardName}/d.png`);
    const f = require(`../pictures/${keyboardName}/f.png`);
    const g = require(`../pictures/${keyboardName}/g.png`);
    const h = require(`../pictures/${keyboardName}/h.png`);
    const j = require(`../pictures/${keyboardName}/j.png`);
    const k = require(`../pictures/${keyboardName}/k.png`);
    const l = require(`../pictures/${keyboardName}/l.png`);
    const colon = require(`../pictures/${keyboardName}/colon.png`);
    const quote = require(`../pictures/${keyboardName}/quote.png`);
    const enter = require(`../pictures/${keyboardName}/enter.png`);
    const shift = require(`../pictures/${keyboardName}/shift.png`);
    const z = require(`../pictures/${keyboardName}/z.png`);
    const x = require(`../pictures/${keyboardName}/x.png`);
    const c = require(`../pictures/${keyboardName}/c.png`);
    const v = require(`../pictures/${keyboardName}/v.png`);
    const b = require(`../pictures/${keyboardName}/b.png`);
    const n = require(`../pictures/${keyboardName}/n.png`);
    const m = require(`../pictures/${keyboardName}/m.png`);
    const comma = require(`../pictures/${keyboardName}/comma.png`);
    const dot = require(`../pictures/${keyboardName}/dot.png`);
    const slash = require(`../pictures/${keyboardName}/slash.png`);
    const rightshift = require(`../pictures/${keyboardName}/rightshift.png`);
    const ctrl = require(`../pictures/${keyboardName}/ctrl.png`);
    const alt = require(`../pictures/${keyboardName}/alt.png`);
    const space = require(`../pictures/${keyboardName}/space.png`);
    const rightalt = require(`../pictures/${keyboardName}/rightalt.png`);
    const rightctrl = require(`../pictures/${keyboardName}/rightctrl.png`);




    //useState list keeps track of the keys currently being pressed
    const [pressedKeys, setPressedKeys] = useState([]);

    //detecting 'keydown' and storing in detectKeyDown addaEventListener true
    useEffect(() => {
        document.addEventListener('keydown', detectKeyDown, true)
    }, [])

    //pass detectKeyDown to theKey
    const detectKeyDown = (theKey) => {
        //check if pressedKeys has new key and if not add to pressedKeys with wierd cases like space or \
        if(!pressedKeys.includes(theKey)) {
            setPressedKeys([...pressedKeys, theKey.key])
            if(theKey.key === " ") {
                setPressedKeys([...pressedKeys, "Space"])
            }
            if(theKey.key === "\\") {
                setPressedKeys([...pressedKeys, "Backslash"])
            }
            //timeout to remove key from list after 500 ms
            setTimeout(() => {
                setPressedKeys(pressedKeys.filter((key) => key !== theKey.key));
            }, 500);
        }
        new Audio(click).play();
    }

    return <div>
        <div className='topdivkeyboard'>
            <center>
            {/* checks if pressedKeys has it's key and if so applies className pressed */}
                <img src={backtick} className={pressedKeys.includes("`") ? 'pressed square' : 'square'}/>
                <img src={one} className={pressedKeys.includes("1") ? 'pressed square' : 'square'}/>
                <img src={two} className={pressedKeys.includes("2") ? 'pressed square' : 'square'}/>
                <img src={three} className={pressedKeys.includes("3") ? 'pressed square' : 'square'}/>
                <img src={four} className={pressedKeys.includes("4") ? 'pressed square' : 'square'}/>
                <img src={five} className={pressedKeys.includes("5") ? 'pressed square' : 'square'}/>
                <img src={six} className={pressedKeys.includes("6") ? 'pressed square' : 'square'}/>
                <img src={seven} className={pressedKeys.includes("7") ? 'pressed square' : 'square'}/>
                <img src={eight} className={pressedKeys.includes("8") ? 'pressed square' : 'square'}/>
                <img src={nine} className={pressedKeys.includes("9") ? 'pressed square' : 'square'}/>
                <img src={zero} className={pressedKeys.includes("0") ? 'pressed square' : 'square'}/>
                <img src={hyphon} className={pressedKeys.includes("-") ? 'pressed square' : 'square'}/>
                <img src={equals} className={pressedKeys.includes("=") ? 'pressed square' : 'square'}/>
                <img src={backspace} className={pressedKeys.includes("Backspace") ? 'pressed' : ''}/>
            </center>
        </div>
        <div>
            <center>
                <img src={tab} className={pressedKeys.includes("Tab") ? 'pressed' : ''}/>
                <img src={q} className={pressedKeys.includes("q") ? 'pressed square' : 'square'}/>
                <img src={w} className={pressedKeys.includes("w") ? 'pressed square' : 'square'}/>
                <img src={e} className={pressedKeys.includes("e") ? 'pressed square' : 'square'}/>
                <img src={r} className={pressedKeys.includes("r") ? 'pressed square' : 'square'}/>
                <img src={t} className={pressedKeys.includes("t") ? 'pressed square' : 'square'}/>
                <img src={y} className={pressedKeys.includes("y") ? 'pressed square' : 'square'}/>
                <img src={u} className={pressedKeys.includes("u") ? 'pressed square' : 'square'}/>
                <img src={i} className={pressedKeys.includes("i") ? 'pressed square' : 'square'}/>
                <img src={o} className={pressedKeys.includes("o") ? 'pressed square' : 'square'}/>
                <img src={p} className={pressedKeys.includes("p") ? 'pressed square' : 'square'}/>
                <img src={squareleft} className={pressedKeys.includes("[") ? 'pressed square' : 'square'}/>
                <img src={squareright} className={pressedKeys.includes("]") ? 'pressed square' : 'square'}/>
                <img src={backslash} className={pressedKeys.includes("Backslash") ? 'pressed square' : 'square'}/>
            </center>
        </div>
        <div>
            <center>
                <img src={capslock} className={pressedKeys.includes("CapsLock") ? 'pressed square' : 'square'}/>
                <img src={a} className={pressedKeys.includes("a") ? 'pressed square' : 'square'}/>
                <img src={s} className={pressedKeys.includes("s") ? 'pressed square' : 'square'}/>
                <img src={d} className={pressedKeys.includes("d") ? 'pressed square' : 'square'}/>
                <img src={f} className={pressedKeys.includes("f") ? 'pressed square' : 'square'}/>
                <img src={g} className={pressedKeys.includes("g") ? 'pressed square' : 'square'}/>
                <img src={h} className={pressedKeys.includes("h") ? 'pressed square' : 'square'}/>
                <img src={j} className={pressedKeys.includes("j") ? 'pressed square' : 'square'}/>
                <img src={k} className={pressedKeys.includes("k") ? 'pressed square' : 'square'}/>
                <img src={l} className={pressedKeys.includes("l") ? 'pressed square' : 'square'}/>
                <img src={colon} className={pressedKeys.includes(";") ? 'pressed square' : 'square'}/>
                <img src={quote} className={pressedKeys.includes("'") ? 'pressed square' : 'square'}/>
                <img src={enter} className={pressedKeys.includes("Enter") ? 'pressed square' : 'square'}/>
            </center>
        </div>
        <div>
            <center>
                <img src={shift} className={pressedKeys.includes("Shift") ? 'pressed' : ''}/>
                <img src={z} className={pressedKeys.includes("z") ? 'pressed square' : 'square'}/>
                <img src={x} className={pressedKeys.includes("x") ? 'pressed square' : 'square'}/>
                <img src={c} className={pressedKeys.includes("c") ? 'pressed square' : 'square'}/>
                <img src={v} className={pressedKeys.includes("v") ? 'pressed square' : 'square'}/>
                <img src={b} className={pressedKeys.includes("b") ? 'pressed square' : 'square'}/>
                <img src={n} className={pressedKeys.includes("n") ? 'pressed square' : 'square'}/>
                <img src={m} className={pressedKeys.includes("m") ? 'pressed square' : 'square'}/>
                <img src={comma} className={pressedKeys.includes(",") ? 'pressed square' : 'square'}/>
                <img src={dot} className={pressedKeys.includes(".") ? 'pressed square' : 'square'}/>
                <img src={slash} className={pressedKeys.includes("/") ? 'pressed square' : 'square'}/>
                <img src={rightshift} className={pressedKeys.includes("Shift") ? 'pressed' : ''}/>
            </center>
        </div>
        <div>
            <center>
                <img src={ctrl} className={pressedKeys.includes("Control") ? 'pressed' : ''}/>
                <img src={alt} className={pressedKeys.includes("Alt") ? 'pressed' : ''}/>
                <img src={space} className={pressedKeys.includes("Space") ? 'pressed' : ''}/>
                <img src={rightalt} className={pressedKeys.includes("Alt") ? 'pressed' : ''}/>
                <img src={rightctrl} className={pressedKeys.includes("Control") ? 'pressed' : ''}/>                
            </center>
        </div>
    </div>
}

export default Keyboard;