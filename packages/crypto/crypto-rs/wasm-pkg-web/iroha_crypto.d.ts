/* tslint:disable */
/* eslint-disable */
/**
* @returns {DigestFunction}
*/
export function digest_function_default(): DigestFunction;
/**
* # Errors
* Fails if byte code is not valid
* @param {number} value
* @returns {DigestFunction}
*/
export function digest_function_from_byte_code(value: number): DigestFunction;
/**
* # Errors
* Fails if digest function parsing fails
* @param {DigestFunction} digest
* @returns {number}
*/
export function digest_function_to_byte_code(digest: DigestFunction): number;
/**
* @returns {Algorithm}
*/
export function algorithm_default(): Algorithm;
/**
*/
export function main(): void;

export interface PrivateKeyJson {
    digest_function: string
    /** Hex-encoded bytes */
    payload: string
}
    


export type BytesInput =
    | { t: 'Array', c: Uint8Array }
    | { t: 'Hex', c: string }



export interface KeyPairJson {
    public_key: string
    private_key: PrivateKeyJson
}



export type DigestFunction =
    | 'ed25519-pub'
    | 'secp256k1-pub'
    | 'bls12_381-g1-pub'
    | 'bls12_381-g2-pub'



export type VerifyResult =
    | { t: 'ok' }
    | { t: 'err', error: string }



export type Algorithm = 
    | 'ed25519'
    | 'secp256k1'
    | 'bls_normal'
    | 'bls_small'


/**
* Hash of Iroha entities. Currently supports only blake2b-32.
*/
export class Hash {
  free(): void;
/**
* @returns {string}
*/
  bytes_hex(): string;
/**
* @returns {Uint8Array}
*/
  bytes(): Uint8Array;
/**
* Hash the given bytes.
* @param {BytesInput} bytes
* @returns {Hash}
*/
  static hash(bytes: BytesInput): Hash;
/**
* Construct zeroed hash
* @returns {Hash}
*/
  static zeroed(): Hash;
}
/**
* Configuration of key generation
*/
export class KeyGenConfiguration {
  free(): void;
/**
* # Errors
* Fails if byte input parsing fails
* @param {BytesInput} seed
* @returns {KeyGenConfiguration}
*/
  use_seed(seed: BytesInput): KeyGenConfiguration;
/**
* @param {PrivateKey} key
* @returns {KeyGenConfiguration}
*/
  use_private_key(key: PrivateKey): KeyGenConfiguration;
/**
* # Errors
* Fails if algorithm parsing fails
* @param {Algorithm} algorithm
* @returns {KeyGenConfiguration}
*/
  with_algorithm(algorithm: Algorithm): KeyGenConfiguration;
/**
* # Errors
* Fails if algorithm parsing fails.
* @param {Algorithm} algorithm
* @returns {KeyGenConfiguration}
*/
  static create_with_algorithm(algorithm: Algorithm): KeyGenConfiguration;
/**
* @returns {KeyGenConfiguration}
*/
  static _default(): KeyGenConfiguration;
}
/**
* Pair of Public and Private keys.
*/
export class KeyPair {
  free(): void;
/**
* @param {PublicKey} public_key
* @param {PrivateKey} private_key
* @returns {KeyPair}
*/
  static reproduce(public_key: PublicKey, private_key: PrivateKey): KeyPair;
/**
* # Errors
* Fails if serialization fails
* @returns {KeyPairJson}
*/
  to_json(): KeyPairJson;
/**
* @returns {PublicKey}
*/
  public_key(): PublicKey;
/**
* @returns {PrivateKey}
*/
  private_key(): PrivateKey;
/**
* Generate with default configuration
* @returns {KeyPair}
*/
  static generate(): KeyPair;
/**
* # Errors
* Fails if decoding fails
* @param {KeyGenConfiguration} key_gen_configuration
* @returns {KeyPair}
*/
  static generate_with_configuration(key_gen_configuration: KeyGenConfiguration): KeyPair;
/**
* # Errors
* Fails if public key fails to derive from the private key
* @param {PrivateKey} priv_key
* @returns {KeyPair}
*/
  static from_private_key(priv_key: PrivateKey): KeyPair;
/**
* # Errors
* Fails if deserialization fails
* @param {KeyPairJson} value
* @returns {KeyPair}
*/
  static from_json(value: KeyPairJson): KeyPair;
/**
*/
  readonly digest_function: Algorithm;
}
/**
* Multihash
*/
export class Multihash {
  free(): void;
/**
* @returns {Uint8Array}
*/
  clone_payload(): Uint8Array;
/**
* # Errors
* Fails if bytes conversion fails
* @returns {string}
*/
  to_bytes_hex(): string;
/**
* # Errors
* Fails if bytes are not a valid multihash
* @param {string} hex
* @returns {Multihash}
*/
  static from_bytes_hex(hex: string): Multihash;
/**
* # Errors
* Fails if bytes are not a valid multihash
* @param {Uint8Array} bytes
* @returns {Multihash}
*/
  static from_bytes(bytes: Uint8Array): Multihash;
/**
* # Errors
* Fails if digest could not fit into a byte
* @returns {Uint8Array}
*/
  to_bytes(): Uint8Array;
/**
*/
  readonly digest_function: DigestFunction;
}
/**
* Private Key used in signatures.
*/
export class PrivateKey {
  free(): void;
/**
* # Errors
* Fails if parsing of digest function or payload byte input fails
* @param {Algorithm} digest_function
* @param {BytesInput} payload
* @returns {PrivateKey}
*/
  static reproduce(digest_function: Algorithm, payload: BytesInput): PrivateKey;
/**
* # Errors
* Fails is serialization fails
* @returns {PrivateKeyJson}
*/
  to_json(): PrivateKeyJson;
/**
* @returns {string}
*/
  payload_hex(): string;
/**
* @returns {Uint8Array}
*/
  payload(): Uint8Array;
/**
* # Errors
* Fails if serialization fails
* @param {PrivateKeyJson} value
* @returns {PrivateKey}
*/
  static from_json(value: PrivateKeyJson): PrivateKey;
/**
*/
  readonly digest_function: Algorithm;
}
/**
* Public Key used in signatures.
*/
export class PublicKey {
  free(): void;
/**
* # Errors
* Fails if parsing of digest function or payload byte input fails
* @param {Algorithm} digest_function
* @param {BytesInput} payload
* @returns {PublicKey}
*/
  static reproduce(digest_function: Algorithm, payload: BytesInput): PublicKey;
/**
* @returns {string}
*/
  payload_hex(): string;
/**
* @returns {Uint8Array}
*/
  payload(): Uint8Array;
/**
* @returns {string}
*/
  to_multihash_hex(): string;
/**
* @returns {Multihash}
*/
  to_multihash(): Multihash;
/**
* @returns {string}
*/
  to_format(): string;
/**
* @param {PrivateKey} key
* @returns {PublicKey}
*/
  static from_private_key(key: PrivateKey): PublicKey;
/**
* @param {Multihash} multihash
* @returns {PublicKey}
*/
  static from_multihash(multihash: Multihash): PublicKey;
/**
* # Errors
* Fails if multihash parsing fails
* @param {string} multihash
* @returns {PublicKey}
*/
  static from_multihash_hex(multihash: string): PublicKey;
/**
*/
  readonly digest_function: Algorithm;
}
/**
* Represents signature of the data (`Block` or `Transaction` for example).
*/
export class Signature {
  free(): void;
/**
* @returns {string}
*/
  payload_hex(): string;
/**
* @returns {Uint8Array}
*/
  payload(): Uint8Array;
/**
* @returns {PublicKey}
*/
  public_key(): PublicKey;
/**
* @param {BytesInput} payload
* @returns {VerifyResult}
*/
  verify(payload: BytesInput): VerifyResult;
/**
* @param {PublicKey} pub_key
* @param {BytesInput} payload
* @returns {Signature}
*/
  static reproduce(pub_key: PublicKey, payload: BytesInput): Signature;
/**
* @param {PrivateKey} private_key
* @param {BytesInput} message
* @returns {Signature}
*/
  static sign_with_private_key(private_key: PrivateKey, message: BytesInput): Signature;
/**
* @param {KeyPair} key_pair
* @param {BytesInput} message
* @returns {Signature}
*/
  static sign_with_key_pair(key_pair: KeyPair, message: BytesInput): Signature;
}

export type InitInput = RequestInfo | URL | Response | BufferSource | WebAssembly.Module;

export interface InitOutput {
  readonly memory: WebAssembly.Memory;
  readonly __wbg_privatekey_free: (a: number) => void;
  readonly privatekey_reproduce: (a: number, b: number, c: number) => void;
  readonly privatekey_to_json: (a: number, b: number) => void;
  readonly privatekey_payload_hex: (a: number, b: number) => void;
  readonly privatekey_payload: (a: number, b: number) => void;
  readonly privatekey_digest_function: (a: number) => number;
  readonly privatekey_from_json: (a: number, b: number) => void;
  readonly __wbg_hash_free: (a: number) => void;
  readonly hash_bytes_hex: (a: number, b: number) => void;
  readonly hash_bytes: (a: number, b: number) => void;
  readonly hash_hash: (a: number, b: number) => void;
  readonly hash_zeroed: () => number;
  readonly __wbg_keygenconfiguration_free: (a: number) => void;
  readonly __wbg_keypair_free: (a: number) => void;
  readonly keypair_reproduce: (a: number, b: number) => number;
  readonly keypair_to_json: (a: number, b: number) => void;
  readonly keypair_public_key: (a: number) => number;
  readonly keypair_private_key: (a: number) => number;
  readonly keypair_digest_function: (a: number) => number;
  readonly keypair_generate: (a: number) => void;
  readonly keypair_generate_with_configuration: (a: number, b: number) => void;
  readonly keypair_from_private_key: (a: number, b: number) => void;
  readonly keypair_from_json: (a: number, b: number) => void;
  readonly keygenconfiguration_use_seed: (a: number, b: number, c: number) => void;
  readonly keygenconfiguration_use_private_key: (a: number, b: number) => number;
  readonly keygenconfiguration_with_algorithm: (a: number, b: number, c: number) => void;
  readonly keygenconfiguration_create_with_algorithm: (a: number, b: number) => void;
  readonly keygenconfiguration__default: () => number;
  readonly digest_function_from_byte_code: (a: number, b: number) => void;
  readonly digest_function_to_byte_code: (a: number, b: number) => void;
  readonly __wbg_multihash_free: (a: number) => void;
  readonly multihash_digest_function: (a: number) => number;
  readonly multihash_clone_payload: (a: number, b: number) => void;
  readonly multihash_to_bytes_hex: (a: number, b: number) => void;
  readonly multihash_from_bytes_hex: (a: number, b: number, c: number) => void;
  readonly multihash_from_bytes: (a: number, b: number, c: number) => void;
  readonly multihash_to_bytes: (a: number, b: number) => void;
  readonly digest_function_default: () => number;
  readonly __wbg_signature_free: (a: number) => void;
  readonly signature_payload_hex: (a: number, b: number) => void;
  readonly signature_payload: (a: number, b: number) => void;
  readonly signature_public_key: (a: number) => number;
  readonly signature_verify: (a: number, b: number, c: number) => void;
  readonly signature_reproduce: (a: number, b: number, c: number) => void;
  readonly signature_sign_with_private_key: (a: number, b: number, c: number) => void;
  readonly signature_sign_with_key_pair: (a: number, b: number, c: number) => void;
  readonly __wbg_publickey_free: (a: number) => void;
  readonly publickey_reproduce: (a: number, b: number, c: number) => void;
  readonly publickey_payload_hex: (a: number, b: number) => void;
  readonly publickey_payload: (a: number, b: number) => void;
  readonly publickey_digest_function: (a: number) => number;
  readonly publickey_to_multihash_hex: (a: number, b: number) => void;
  readonly publickey_to_multihash: (a: number) => number;
  readonly publickey_to_format: (a: number, b: number) => void;
  readonly publickey_from_private_key: (a: number) => number;
  readonly publickey_from_multihash: (a: number) => number;
  readonly publickey_from_multihash_hex: (a: number, b: number, c: number) => void;
  readonly algorithm_default: () => number;
  readonly main: () => void;
  readonly __wbindgen_malloc: (a: number) => number;
  readonly __wbindgen_realloc: (a: number, b: number, c: number) => number;
  readonly __wbindgen_add_to_stack_pointer: (a: number) => number;
  readonly __wbindgen_free: (a: number, b: number) => void;
  readonly __wbindgen_exn_store: (a: number) => void;
  readonly __wbindgen_start: () => void;
}

export type SyncInitInput = BufferSource | WebAssembly.Module;
/**
* Instantiates the given `module`, which can either be bytes or
* a precompiled `WebAssembly.Module`.
*
* @param {SyncInitInput} module
*
* @returns {InitOutput}
*/
export function initSync(module: SyncInitInput): InitOutput;

/**
* If `module_or_path` is {RequestInfo} or {URL}, makes a request and
* for everything else, calls `WebAssembly.instantiate` directly.
*
* @param {InitInput | Promise<InitInput>} module_or_path
*
* @returns {Promise<InitOutput>}
*/
export default function init (module_or_path?: InitInput | Promise<InitInput>): Promise<InitOutput>;