import clsx from 'clsx';
import { useDispatch } from 'react-redux';
import { setCurrentEntity, addingNew } from 'state/canvas';

import { Tier } from 'common/constants';
import { useCanvasState } from 'common/hooks/canvas';
import { show } from 'common/util';

/**
 *
 * @param {React.DragEvent<HTMLDivElement>} e
 * @param {Data.GameEntityObject} o
 */
// eslint-disable-next-line
const onDragStart = (e, o, fn) => {
  e.dataTransfer.setData('application/json', JSON.stringify(o));
  e.dataTransfer.dropEffect = 'copy';
  fn(o);
};

/**
 *
 * @param {import('components/canvas/EntityPalette').Props} props
 * @returns
 */
export function EntityPalette(props) {
  const { gameObjects } = props;

  const update = useDispatch();
  const canvasState = useCanvasState();
  const objects = Object.values(gameObjects.entities);

  const uneven = objects.length % 2 === 1;

  return (
    <div className={clsx('entity-palette')}>
      <header className="entity-palette__head">Modules</header>

      <div
        className={clsx(
          'entity-palette__list',
          props.isAdding && 'entity-palette--adding-new',
        )}
      >
        {objects.map((o, i) => (
          <div
            key={i}
            className="entity-palette__list-item"
            onClick={e => {
              update(addingNew(o));
              console.log(show({ canvasState }));
            }}
          >
            {o.id}
            <div className="entity-palette__list-item-stats">
              <span>{o.power}</span>
              <span>{Tier[o.tier]}</span>
            </div>
          </div>
        ))}
        {uneven && <div className="entity-palette__list-item" />}
      </div>
    </div>
  );
}
