import { Child } from './Child';
import { Pony } from './Pony';

const ponyParent1 = new Pony()
ponyParent1._breed = 'KirinPony'
const ponyParent2 = new Pony()
ponyParent2._breed = 'WishingPony'

it('Child - _isHybred returns true when passed a hybred breed ', async (done) => {
    const child = Child.fromParents(ponyParent1, ponyParent2)
    if (!child._ponyParent2 || !child._ponyParent2._breed) {
        throw new Error(`ponyParent2 not set`)
    }
    expect(child._isHybred(child._ponyParent2._breed)).toBeTruthy
    done();
});

it('Child - _isHybred returns false when passed a non-hybred breed ', async (done) => {
    const child = Child.fromParents(ponyParent1, ponyParent2)
    if (!child._ponyParent1 || !child._ponyParent1._breed) {
        throw new Error(`ponyParent1 not set`)
    }
    expect(child._isHybred(child._ponyParent1._breed)).toBeFalsy
    done();
});