/** `jmes-` prefixed account address */
export declare type AccAddress = string;
/** `jmesvaloper-` prefixed validator operator address */
export declare type ValAddress = string;
/** `jmesvalcons-` prefixed validator consensus address */
export declare type ValConsAddress = string;
/** `jmespub-` prefixed account public key */
export declare type AccPubKey = string;
/** `jmesvaloperpub-` prefixed validator public key */
export declare type ValPubKey = string;
export declare namespace AccAddress {
    /**
     * Checks if a string is a valid jmes account address.
     *
     * @param data string to check
     */
    function validate(data: string): boolean;
    /**
     * Converts a validator address into an account address
     *
     * @param address validator address
     */
    function fromValAddress(address: ValAddress): AccAddress;
}
export declare namespace AccPubKey {
    /**
     * Checks if a string is a jmes account's public key
     * @param data string to check
     */
    function validate(data: string): boolean;
    /**
     * Converts a jmes validator pubkey to an account pubkey.
     * @param address validator pubkey to convert
     */
    function fromAccAddress(address: AccAddress): AccPubKey;
}
export declare namespace ValAddress {
    /**
     * Checks if a string is a jmes validator address.
     *
     * @param data string to check
     */
    function validate(data: string): boolean;
    /**
     * Converts a jmes account address to a validator address.
     * @param address account address to convert
     */
    function fromAccAddress(address: AccAddress): ValAddress;
}
export declare namespace ValPubKey {
    /**
     * Checks if a string is a jmes validator pubkey
     * @param data string to check
     */
    function validate(data: string): boolean;
    /**
     * Converts a jmes validator operator address to a validator pubkey.
     * @param valAddress account pubkey
     */
    function fromValAddress(valAddress: ValAddress): ValPubKey;
}
export declare namespace ValConsAddress {
    /**
     * Checks if a string is a jmes validator consensus address
     * @param data string to check
     */
    function validate(data: string): boolean;
}
