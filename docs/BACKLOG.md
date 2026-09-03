# BACKLOG — живой приоритетный список

Последняя сортировка: 2026-09-04 после bootstrap-аудита. Приоритет определяется impact на защиту, а не размером задачи.

## P0 — сделать следующими

| Item | Impact | Cost | Risk | Case impact | Demo impact | User clarity impact | Status |
|---|---:|---:|---:|---:|---:|---:|---|
| Browser walkthrough 390×844 + 320/360/430/500 | 10 | 4 | 3 | 8 | 10 | 10 | BLOCKED_EXTERNAL |
| Исправить найденные runtime/layout regressions и повторить critical flow | 10 | 4 | 4 | 8 | 10 | 10 | READY after browser access |
| Проверить визуальную силу result/payoff и safe reset | 9 | 3 | 3 | 8 | 9 | 8 | READY |
| Дочистить технический legacy drift (field-* selectors/filenames), не меняя flow | 5 | 3 | 2 | 4 | 3 | 2 | DEFERRED until browser gate |

## P1 — после P0

| Item | Impact | Cost | Risk | Case impact | Demo impact | User clarity impact | Decision |
|---|---:|---:|---:|---:|---:|---:|---|
| Подключить один правдоподобный raster/SVG-ассет береговой зоны | 8 | 5 | 4 | 8 | 9 | 7 | Do if asset is available |
| Усилить before/after: добавить явную легенду «сигнал → полевой выезд» | 8 | 3 | 2 | 9 | 8 | 9 | Candidate |
| Улучшить educational payoff и CTA на продолжение обучения | 7 | 3 | 2 | 9 | 7 | 8 | Candidate |
| Независимый Jury + Case + QA review | 8 | 2 | 1 | 8 | 8 | 8 | Ready |

## P2 — только если P0/P1 сильны

- Второй тип загрязнения, только если он заметно увеличит educational value.
- Более богатое окружение побережья и реальные ассеты для карты.
- Дополнительные микроэффекты без увеличения времени demo.

## BLOCKED_EXTERNAL

- Browser/visual QA: текущая среда не предоставляет доступный браузер или Playwright.

## Done / rejected

- [x] CASE REALIGNMENT: runtime переориентирован с аграрной семантики на береговой кейс.
- [x] ДЗЗ стало интерактивным: пользователь должен показать слой сигнала, прежде чем планировать действие.
- [x] Mock data явно обозначены как учебный слой в анализе.
- [x] Финальный payoff ведёт на официальный материал проекта «Чистый берег».
- [x] Станция ДЗЗ не обходит onboarding: first-time flow начинается с сигнала на карте.
- [x] Документация bootstrap-аудита заполнена фактическими результатами.
- [x] Backend, auth, multiplayer, open world и feature creep отклонены: не видны в коротком demo и не усиливают кейс.
