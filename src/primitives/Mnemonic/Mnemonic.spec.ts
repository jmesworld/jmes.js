import 'mocha';
import { expect } from 'chai';
import {Mnemonic} from "./Mnemonic";

describe('Primitives - Mnemonic', function suite() {
    it('should generate a new mnemonic', async function () {
        const mnemonic = await Mnemonic.generateMnemonic();
        expect(mnemonic).to.be.a('string');
        expect(mnemonic.split(' ').length).to.be.equal(24);
    });
    it('should generate a new instance with a set mnemonic', function () {
        const instance = new Mnemonic();
        expect(instance.mnemonic).to.exist;
        expect(instance.mnemonic).to.be.a('string');
        expect(instance.mnemonic.split(' ').length).to.be.equal(24);
    });
    let instance: Mnemonic;
    it('should instantiate from Mnemonic string', function () {
        const mnemonic = 'better junior picnic scorpion weekend pledge alley upgrade security guess tank advance switch home segment trend cousin tomato language indicate flame demise head noble';
        instance = new Mnemonic(mnemonic);
        expect(instance.mnemonic).to.equal(mnemonic);
    });
    it('should transform a mnemonic to seed', async function () {
        const seed: string = await instance.toSeed();
        const seed2: string = await Mnemonic.mnemonicToSeed(instance.mnemonic)
        expect(seed).to.equal("35a3979ce1674ddcfba17bcc2e0b6c58486329a53905a2f468b940cecf6b75e7325bd61a793a30fb2bc0f5e5e83c6ab16f065a1ed8bfdfd6fb66117a5accee08")
        expect(seed).to.equal(seed2)
    });
});
