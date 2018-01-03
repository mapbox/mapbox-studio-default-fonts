const mapnik = require('mapnik');
const path = require('path');
const fs = require('fs');

mapnik.register_fonts('./', { recurse: true });
// Keywords are ordered by "display priority" -- e.g. fonts
// containing earlier words should be favored for being a preview
// of the family as a whole.
const keywords = [
    'medium',
    'normal',
    'regular',
    'book',
    'roman',
    'semibold',
    'semibolditalic',
    'demi',
    'bold',
    'bolditalic',
    'caption',
    'cn',
    'cond',
    'condensed',
    'semicondensed',
    'extended',
    'extrabold',
    'black',
    'heavy',
    'ultra',
    'light',
    'narrow',
    'thin',
    'extlight',
    'extralight',
    'ultralight',
    'hairline',
    'italic',
    'oblique',
    'dash'
];

function getFontFamilies() {
    const fonts = mapnik.fonts();
    fonts.sort();
    let level1 = {};
    for (let i = 0; i < fonts.length; i++) {
        let parts = fonts[i].split(' ');
        while (parts.length) {
            let word = parts[parts.length - 1];
            if (keywords.indexOf(word.toLowerCase()) === -1) break;
            parts.pop();
        }
        let family = parts.join(' ');
        level1[family] = level1[family] || [];
        level1[family].push(fonts[i]);
    }
    let level2 = {};
    for (let fam in level1) {
        if (level1[fam].length > 1) continue;

        let parts = fam.split(' ');
        if (parts.length === 1) continue;
        parts.pop();
        let family = parts.join(' ');

        level2[family] = level2[family] || [];
        level2[family].push(level1[fam][0]);
    }
    for (let fam in level1) {
        if (level1[fam].length > 1) continue;

        let parts = fam.split(' ');
        if (parts.length === 1) continue;
        parts.pop();
        let family = parts.join(' ');

        if (level2[family].length > 1) {
            delete level1[fam];
            level1[family] = level2[family];
        }
    }
    for (let k in level1) {
        level1[k].sort(famsort);
    }

    function famsort(a, b) {
        let ascore = 0;
        let bscore = 0;
        let aindex = -1;
        let bindex = -1;
        const aparts = a.split(' ');
        const bparts = b.split(' ');
        for (let i = 0; i < aparts.length; i++) {
            aindex = keywords.indexOf(aparts[i].toLowerCase());
            ascore += aindex >= 0 ? aindex : 0;
        }
        for (let i = 0; i < bparts.length; i++) {
            bindex = keywords.indexOf(bparts[i].toLowerCase());
            bscore += bindex >= 0 ? bindex : 0;
        }
        return ascore - bscore;
    }

    fs.writeFile('font_families.json', JSON.stringify(level1, null, 2), err => {
        if (err) throw err;
        console.log('complete');
    });
}

getFontFamilies();
