# BACKLOG — живой приоритетный список

Последняя сортировка: 2026-09-04 после browser/mobile hardening. Приоритет определяется impact на защиту, а не размером задачи.

## P0 — сделать следующими

| Item | Impact | Cost | Risk | Case impact | Demo impact | User clarity impact | Status |
|---|---:|---:|---:|---:|---:|---:|---|
| Browser walkthrough 390×844 + 320/360/430/500 | 10 | 4 | 3 | 8 | 10 | 10 | DONE: EdgeCore sweep |
| Исправить найденные runtime/layout regressions и повторить critical flow | 10 | 4 | 4 | 8 | 10 | 10 | DONE: nav/state/result/mobile |
| Проверить визуальную силу result/payoff и safe reset | 9 | 3 | 3 | 8 | 9 | 8 | DONE: visual + reducer + completed-run cleanup |
| Дочистить технический legacy drift (field-* selectors/filenames), не меняя flow | 5 | 3 | 2 | 4 | 3 | 2 | DEFERRED until browser gate |

## P1 — после P0

| Item | Impact | Cost | Risk | Case impact | Demo impact | User clarity impact | Decision |
|---|---:|---:|---:|---:|---:|---:|---|
| Подключить один правдоподобный raster/SVG-ассет береговой зоны | 8 | 5 | 4 | 8 | 9 | 7 | DONE: educational SVG fallback; final asset optional |
| Усилить before/after: добавить явную легенду «сигнал → полевой выезд» | 8 | 3 | 2 | 9 | 8 | 9 | DONE: observation path after DZZ reveal |
| Улучшить educational payoff и CTA на продолжение обучения | 7 | 3 | 2 | 9 | 7 | 8 | DONE: compact payoff + project CTA |
| Независимый Jury + Case + QA review | 8 | 2 | 1 | 8 | 8 | 8 | Self-review + browser QA done; delegated review unavailable |

## P2 — только если P0/P1 сильны

- Второй тип загрязнения, только если он заметно увеличит educational value.
- Более богатое окружение побережья и реальные ассеты для карты.
- Дополнительные микроэффекты без увеличения времени demo.

## BLOCKED_EXTERNAL

- Независимый delegated review не запущен: создание worktree-task отклонено средой (403). Продуктовая и QA-проверка выполнены оркестратором.

## Done / rejected

- [x] CASE REALIGNMENT: runtime переориентирован с аграрной семантики на береговой кейс.
- [x] ДЗЗ стало интерактивным: пользователь должен показать слой сигнала, прежде чем планировать действие.
- [x] Mock data явно обозначены как учебный слой в анализе.
- [x] Финальный payoff ведёт на официальный материал проекта «Чистый берег».
- [x] Станция ДЗЗ не обходит onboarding: first-time flow начинается с сигнала на карте.
- [x] Нижняя навигация и reducer не позволяют открыть анализ/решение до наблюдения и интерпретации ДЗЗ.
- [x] Result-заголовок рендерит JSX корректно; на 320–500px payoff и CTA не уходят за первый экран.
- [x] Browser critical flow пройден на 320×844, 360×844, 390×844, 430×844 и 500×844; возвращённая карта сохраняет 86% / 240 XP.
- [x] Документация bootstrap-аудита заполнена фактическими результатами.
- [x] Backend, auth, multiplayer, open world и feature creep отклонены: не видны в коротком demo и не усиливают кейс.
