# ASSET_REQUESTS — будущие финальные ассеты

Список составлен по фактически видимому demo-flow 2026-09-04. Ассеты не блокируют код: сейчас работают CSS placeholders через assetRegistry.

## P0 — если художник может дать один короткий набор

Текущий scanner уже использует лёгкий учебный SVG-фон `src/assets/coast-satellite.svg` через `assetRegistry`; он не заменяет финальный raster с источником и attribution.

### [shore-zone-grid]

- Scene: Map / Analysis / Result
- Purpose: сделать связь «снимок → загрязнение → очистка» визуально правдоподобной.
- Visual description: вид сверху на береговую зону с песком, водой и небольшим скоплением пластикового/смешанного мусора; отдельные состояния clear, watch, polluted, restored.
- Perspective / camera: orthographic top-down, pixel/cozy.
- Target dimensions / aspect: tile 32×32; сетка 5×5, итог 160×160.
- Required states: clear, watch, polluted, restored.
- Transparent background: no for tile; yes for isolated debris details.
- Replacement target in code: src/game/assetRegistry.ts + FieldTile.

### [satellite-shoreline-crop]

- Scene: Analysis
- Purpose: заменить CSS-сетку в scanner viewport, сохранив overlay сигнала.
- Visual description: учебно помеченный raster-снимок береговой линии с контрастным участком накопления отходов.
- Perspective / camera: satellite/top-down; без избыточных подписей внутри картинки.
- Target dimensions / aspect: 360×240, 3:2.
- Required states: base image; pollution signal overlay.
- Transparent background: no.
- Replacement target in code: scanner viewport; данные по-прежнему идут через getZoneAnalysis.
- Notes: не выдавать mock snapshot за live imagery без источника и attribution.

### [coastal-debris-cluster]

- Scene: Map / Result
- Purpose: усилить узнаваемость загрязнения и payoff очистки.
- Visual description: небольшая куча мусора/пластика, читаемая в масштабе mobile.
- Perspective / camera: top-down three-quarter.
- Target dimensions / aspect: 64×48.
- Required states: visible / removed.
- Transparent background: yes.
- Replacement target in code: debris-pile in assetRegistry.

## P1

- [ranger-field-post] — полевой штаб команды, 150×120, top-down pixel building.
- [orbit-guide] — помощник для intro, 86×98, idle/talk.
- [satellite-station] — станция связи/ДЗЗ, 150×120, idle/active scan.
- [volunteer-avatar] — игрок, idle/walk directions, 54×68.

## P2

- Варианты дюнной растительности, волн, береговых линий и микродекора.
- Мягкие particle/success sprites, только если не ухудшают performance.
