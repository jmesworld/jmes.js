import { bech32 } from 'bech32';

/** `jmes-` prefixed account address */
export type AccAddress = string;

/** `jmesvaloper-` prefixed validator operator address */
export type ValAddress = string;

/** `jmesvalcons-` prefixed validator consensus address */
export type ValConsAddress = string;

/** `jmespub-` prefixed account public key */
export type AccPubKey = string;

/** `jmesvaloperpub-` prefixed validator public key */
export type ValPubKey = string;

function checkPrefixAndLength(
    prefix: string,
    data: string,
    length: number
): boolean {
    try {
        const vals = bech32.decode(data);
        return vals.prefix === prefix && data.length == length;
    } catch (e) {
        return false;
    }
}

export namespace AccAddress {
    /**
     * Checks if a string is a valid jmes account address.
     *
     * @param data string to check
     */
    export function validate(data: string): boolean {
        // 44 for normal account and 64 for contract account
        return (
            checkPrefixAndLength('jmes', data, 44) ||
            checkPrefixAndLength('jmes', data, 64)
        );
    }

    /**
     * Converts a validator address into an account address
     *
     * @param address validator address
     */
    export function fromValAddress(address: ValAddress): AccAddress {
        const vals = bech32.decode(address);
        return bech32.encode('jmes', vals.words);
    }
}

export namespace AccPubKey {
    /**
     * Checks if a string is a jmes account's public key
     * @param data string to check
     */

    export function validate(data: string): boolean {
        return checkPrefixAndLength('jmespub', data, 47);
    }

    /**
     * Converts a jmes validator pubkey to an account pubkey.
     * @param address validator pubkey to convert
     */
    export function fromAccAddress(address: AccAddress): AccPubKey {
        const vals = bech32.decode(address);
        return bech32.encode('jmespub', vals.words);
    }
}

export namespace ValAddress {
    /**
     * Checks if a string is a jmes validator address.
     *
     * @param data string to check
     */
    export function validate(data: string): boolean {
        return checkPrefixAndLength('jmesvaloper', data, 51);
    }

    /**
     * Converts a jmes account address to a validator address.
     * @param address account address to convert
     */
    export function fromAccAddress(address: AccAddress): ValAddress {
        const vals = bech32.decode(address);
        return bech32.encode('jmesvaloper', vals.words);
    }
}

export namespace ValPubKey {
    /**
     * Checks if a string is a jmes validator pubkey
     * @param data string to check
     */
    export function validate(data: string): boolean {
        return checkPrefixAndLength('jmesvaloperpub', data, 54);
    }

    /**
     * Converts a jmes validator operator address to a validator pubkey.
     * @param valAddress account pubkey
     */
    export function fromValAddress(valAddress: ValAddress): ValPubKey {
        const vals = bech32.decode(valAddress);
        return bech32.encode('jmesvaloperpub', vals.words);
    }
}

export namespace ValConsAddress {
    /**
     * Checks if a string is a jmes validator consensus address
     * @param data string to check
     */

    export function validate(data: string): boolean {
        return checkPrefixAndLength('jmesvalcons', data, 51);
    }
}
