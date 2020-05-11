/**
 * Computes the length of a binary sequence from its MSB 1-bit
 */
function bitLength (num: number): number {
  if (num < 0) return 52 // v8 supports 52 mantissa bits
  if (num === 0) return 0
  return Math.max(0, Math.floor(Math.log2(num))) + 1
}

/**
 * Class that can be used to construct binary masks
 */
export class Mask {
  private readonly mask: number

  // Mask defaults to all 1's
  constructor (mask: number = ~0) {
    this.mask = mask
  }

  /**
   * Apply mask to the `n` least significant bits
   */
  lsb (count: number): Mask {
    return new Mask(this.mask & (2 ** count - 1))
  }

  /**
   * Apply mask to at most `n` most significant bits for mask with length `m`.
   * `m` defaults the length from the most significant 1-bit.
   *
   * If `length` is greater than `count`, the mask will have at most `count` 1-bits.
   */
  msb (count: number, length: number = bitLength(this.mask)): Mask {
    const ones = new Mask().lsb(count).mask
    const mask = ones << Math.max(0, length - count)
    return new Mask(this.mask & mask)
  }

  /**
   * Inverses the mask
   */
  inverse (): Mask {
    return new Mask(~this.mask)
  }

  /**
   * Combines two masks to make a single one
   */
  combine (mask: Mask|number): Mask {
    return new Mask(this.mask | (mask as number))
  }

  valueOf (): number {
    return this.mask
  }
}

/**
 * Creates a mask object
 */
function mask (num?: number) {
  return new Mask(num)
}

export default mask
