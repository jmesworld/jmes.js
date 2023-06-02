import { SHA256, Word32Array } from 'jscrypto';
import { Key } from './Key';
import { SimplePublicKey } from '../core/PublicKey';
import * as elliptic from "elliptic";

/**
 * An implementation of the Key interfaces that uses a raw private key.
 */
export class RawKey extends Key {
  /**
   * Raw private key, in bytes.
   */
  public privateKey: Buffer;

  constructor(privateKey: Buffer) {
    const ec = new elliptic.ec('secp256k1');
    const key = ec.keyFromPrivate(privateKey);
    const publicKey = key.getPublic(true,'array');
    super(new SimplePublicKey(Buffer.from(publicKey).toString('base64')));
    this.privateKey = privateKey;
  }

  public ecdsaSign(payload: Buffer): { signature: Uint8Array; recid: number }  {
    const ec = new elliptic.ec('secp256k1');
    const key = ec.keyFromPrivate(this.privateKey);
    const hash = Uint8Array.from(Buffer.from(
        SHA256.hash(new Word32Array(payload)).toString(),
        'hex'
    ));
    // @ts-ignore
    const sign = key.sign(hash,'hex',{canonical: true})
    // @ts-ignore
    const r = sign.r.toArrayLike(Uint8Array, 'be', 32)
    // @ts-ignore
    const s = sign.s.toArrayLike(Uint8Array, 'be', 32)
    return {
      //@ts-ignore
      signature:Uint8Array.from(Buffer.concat([r,s])),
      //@ts-ignore
      recid:  sign.recoveryParam
    };
  }

  public async sign(payload: Buffer): Promise<Buffer> {
    const { signature } = this.ecdsaSign(payload);
    return Buffer.from(signature);
  }
}
