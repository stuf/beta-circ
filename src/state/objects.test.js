import reducer, {
  addObject,
  addObjects,
  deleteObject,
  setObjects,
  updateObject,
  lockObject,
  enableObject,
  disableObject,
  unlockObject,
} from './objects';

import { replayState, show } from 'common/testutil';

test('addObject', () => {
  const a = addObject({ id: '1' });
  const r = reducer({}, a);
  const e = { entities: [{ id: '1' }] };

  expect(r).toEqual(e);
});

test('addObjects', () => {
  const a = addObjects([{ id: '1' }, { id: '2' }, { id: '3' }]);
  const r = reducer({ entities: [{ id: '0' }] }, a);
  const e = { entities: [{ id: '0' }, { id: '1' }, { id: '2' }, { id: '3' }] };

  expect(r).toEqual(e);
});

test('setObjects', () => {
  const a = setObjects([{ id: '1' }]);
  const r = reducer({ entities: [{ id: '123' }] }, a);
  const e = { entities: [{ id: '1' }] };

  expect(r).toEqual(e);
});

test('updateObject: insert', () => {
  const a = updateObject({ id: '1', name: 'turbokakn' });
  const r = reducer({}, a);
  const e = { entities: [{ id: '1', name: 'turbokakn' }] };

  expect(r).toEqual(e);
});

test('updateObject: merge', () => {
  const a = updateObject({ id: '1', name: 'turbokakn' });
  const r = reducer({ entities: [{ id: '1', foo: true }] }, a);
  const e = { entities: [{ id: '1', name: 'turbokakn', foo: true }] };

  expect(r).toEqual(e);
});

test('deleteObject', () => {
  const a = deleteObject({ id: '1' });
  const r = reducer({ entities: [{ id: '1' }, { id: '2' }] }, a);
  const e = { entities: [{ id: '2' }] };

  expect(r).toEqual(e);
});

test('lockObject', () => {
  const a = lockObject({ id: '1' });
  const r = reducer({ entities: [{ id: '1' }] }, a);
  const e = { entities: [{ id: '1', locked: true }] };

  expect(r).toEqual(e);
});

test('unlockObject', () => {
  const a = unlockObject({ id: '1' });
  const r = reducer({ entities: [{ id: '1' }] }, a);
  const e = { entities: [{ id: '1', locked: false }] };

  expect(r).toEqual(e);
});

test('enableObject', () => {
  const a = enableObject({ id: '1' });
  const r = reducer({ entities: [{ id: '1' }] }, a);
  const e = { entities: [{ id: '1', enabled: true }] };

  expect(r).toEqual(e);
});

test('disableObject', () => {
  const a = disableObject({ id: '1' });
  const r = reducer({ entities: [{ id: '1', enabled: true }] }, a);
  const e = { entities: [{ id: '1', enabled: false }] };

  expect(r).toEqual(e);
});