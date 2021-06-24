import reducer, { setCurrent, setLocations } from './location';

test('setCurrent', () => {
  const a = setCurrent('asd');
  const r = reducer({}, a);
  const e = { current: 'asd' };

  expect(r).toEqual(e);
});

test('setLocations', () => {
  const a = setLocations([{ id: 'asd' }, { id: 'sdf' }]);
  const r = reducer({}, a);
  const e = {
    ids: ['asd', 'sdf'],
    entities: { asd: { id: 'asd' }, sdf: { id: 'sdf' } },
  };

  expect(r).toEqual(e);
});
