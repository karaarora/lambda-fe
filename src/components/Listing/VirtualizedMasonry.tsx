
import React, { useCallback, useMemo, useRef } from 'react';
import { AutoSizer, CellMeasurer, CellMeasurerCache, Masonry } from 'react-virtualized';
import { createCellPositioner } from 'react-virtualized/dist/es/Masonry';

import Card from '../../ui/Card';

const VirtualizedMasonry:React.FC<{ items:any[], handleClick: (data:any) => void, isTemplate: boolean; }> = (
  { items, handleClick, isTemplate }
):JSX.Element => {
  const state = {
    columnWidth: 200,
    height: 500,
    gutterSize: 10,
    overscanByPixels: 0,
    windowScrollerEnabled: false,
  };
  let columnCount = 0;
  let WIDTH = 0;
  let cellPositioner:any; let HEIGHT:number; let SCROLLTOP;
  const masonry = useRef(null);
  const cache = useMemo(() => new CellMeasurerCache({
    defaultHeight: 250,
    defaultWidth: 200,
    fixedWidth: true,
  }), []);
  
  function calculateColumnCount() {
    const {columnWidth, gutterSize} = state;

    columnCount = Math.floor(WIDTH / (columnWidth + gutterSize));
  }

  function cellRenderer({index, key, parent, style}:any) {
    const {columnWidth} = state;

    const datum = items[index];
    console.log(datum);
    return (
      <CellMeasurer cache={cache} index={index} key={key} 
        parent={parent}>
        <div
          className="cell"
          style={{
            ...style,
            height: 200,
            width: columnWidth,
          }}>
          {/* {datum && <Card data={datum} handleClick={handleClick} isTemplate={isTemplate} />} */}
        </div>
      </CellMeasurer>
    );
  }

  function initCellPositioner() {
    if (typeof cellPositioner === 'undefined') {
      const {columnWidth, gutterSize} = state;

      cellPositioner = createCellPositioner({
        cellMeasurerCache: cache,
        columnCount,
        columnWidth,
        spacer: gutterSize,
      });
    }
  }

  function resetCellPositioner() {
    const {columnWidth, gutterSize} = state;

    cellPositioner.reset({
      columnCount,
      columnWidth,
      spacer: gutterSize,
    });
  }

  function onResize({width}:any) {
    WIDTH = width;

    calculateColumnCount();
    resetCellPositioner();
    (masonry?.current as any)?.recomputeCellPositions();
  };

  function renderMasonry({width}:any) {
    WIDTH = width;

    calculateColumnCount();
    initCellPositioner();

    const {height, overscanByPixels, windowScrollerEnabled} = state;

    return (
      <Masonry
        autoHeight={windowScrollerEnabled}
        cellCount={items.length}
        cellMeasurerCache={cache}
        cellPositioner={cellPositioner}
        cellRenderer={cellRenderer as any}
        height={windowScrollerEnabled ? HEIGHT : height}
        overscanByPixels={overscanByPixels}
        ref={masonry}
        scrollTop
        width={width}
      />
    );
  }

  function renderAutoSizer({height, scrollTop}:any) {
    HEIGHT = height;
    SCROLLTOP = scrollTop;
    const {overscanByPixels} = state;

    return (
      <AutoSizer
        disableHeight
        height={height}
        onResize={onResize as any}
        overscanByPixels={overscanByPixels}
        scrollTop={SCROLLTOP}>
        {renderMasonry}
      </AutoSizer>
    );
  }

  return renderAutoSizer({height: 300});
};

export default VirtualizedMasonry;