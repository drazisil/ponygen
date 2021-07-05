import { Pony } from "./Pony";

export class Child extends Pony {
    _ponyParent1: Pony | undefined
    _ponyParent2: Pony | undefined

    static fromParents(ponyParent1: Pony, ponyParent2: Pony): Child {
        const child = new Child()
        child._ponyParent1 = ponyParent1
        child._ponyParent2 = ponyParent2

        child._makeBreed()

        return child
    }

    _makeBreed(): void {
        if (!this._ponyParent1 || !this._ponyParent2) {
            throw new Error(`One of the parents is not set`)
        }
        if (!this._ponyParent1._breed || !this._ponyParent2._breed) {
            throw new Error(`One of the parents does not have a breed`)
        }
        if (this._isHybred(this._ponyParent1._breed) || this._isHybred(this._ponyParent2._breed)) {
            // this.calcBreedHybred()
            throw new Error(`Not Implemented`)
        } else {
            this._calcBreed()
        }
    }

    _isHybred(breed: string): boolean {
        switch (breed) {
            case 'MerPony': return true
            case 'Winged Unicorn': return true
            case 'Wishing Pony': return true
            case 'MerDragon': return true
            case 'DinoPony': return true
            case 'Leviathan': return true
            default: return false
        }
    }

    _calcBreed(): void {
        if (!this._ponyParent1 || !this._ponyParent2) {
            throw new Error(`One of the parents is not set`)
        }
        if (!this._ponyParent1._breed || !this._ponyParent2._breed) {
            throw new Error(`One of the parents does not have a breed`)
        }
        var d = Math.random();
        if (d < 0.5) {
            this._breed = this._ponyParent1._breed
        } else {
            this._breed = this._ponyParent2._breed
        }
    }
}