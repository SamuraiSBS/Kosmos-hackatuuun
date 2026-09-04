# BACKLOG — живой приоритетный список

Последняя сортировка: 2026-09-04 после browser/CDP walkthrough и mobile polish. Backlog заморожен до защиты.

## P0 — сделать следующими

| Item | Impact | Cost | Risk | Case impact | Demo impact | User clarity impact | Status |
|---|---:|---:|---:|---:|---:|---:|---|
| Browser walkthrough 390×844 + 320/360/430/500 | 10 | 4 | 3 | 8 | 10 | 10 | DONE: Brave headless/CDP flow + responsive sweep, no overflow |
| Исправить найденные runtime/layout regressions и повторить critical flow | 10 | 4 | 4 | 8 | 10 | 10 | DONE: favicon 404 и mobile overlap/CTA закрыты |
| Проверить визуальную силу result/payoff и safe reset | 9 | 3 | 3 | 8 | 9 | 8 | DONE: visual + reducer + completed-run cleanup |
| Дочистить технический legacy drift (field-* selectors/filenames), не меняя flow | 5 | 3 | 2 | 4 | 3 | 2 | DEFERRED post-freeze |

## P1 — после P0

| Item | Impact | Cost | Risk | Case impact | Demo impact | User clarity impact | Decision |
|---|---:|---:|---:|---:|---:|---:|---|
| Подключить один правдоподобный raster/SVG-ассет береговой зоны | 8 | 5 | 4 | 8 | 9 | 7 | DONE: educational SVG fallback; final asset optional |
| Усилить before/after: добавить явную легенду «сигнал → полевой выезд» | 8 | 3 | 2 | 9 | 8 | 9 | DONE: observation path after DZZ reveal |
| Улучшить educational payoff и CTA на продолжение обучения | 7 | 3 | 2 | 9 | 7 | 8 | DONE: compact payoff + project CTA |
| Независимый Jury + Case + QA review | 8 | 2 | 1 | 8 | 8 | 8 | DONE: final in-thread review; delegated review unavailable (external) |

## P2 — только если P0/P1 сильны

- Второй тип загрязнения, только если он заметно увеличит educational value.
- Более богатое окружение побережья и реальные ассеты для карты.
- Дополнительные микроэффекты без увеличения времени demo.

## BLOCKED_EXTERNAL

- Независимый delegated review недоступен в среде (403); browser/CDP gate закрыт установленным Brave headless.

## Done / rejected

- [x] CASE REALIGNMENT: runtime переориентирован с аграрной семантики на береговой кейс.
- [x] ДЗЗ стало интерактивным: пользователь должен показать слой сигнала, прежде чем планировать действие.
- [x] Mock data явно обозначены как учебный слой в анализе.
- [x] Финальный payoff ведёт на официальный материал проекта «Чистый берег».
- [x] Станция ДЗЗ не обходит onboarding: first-time flow начинается с сигнала на карте.
- [x] Нижняя навигация и reducer не позволяют открыть анализ/решение до наблюдения и интерпретации ДЗЗ; `OPEN_DECISION` дополнительно требует `REVEAL_SIGNAL`.
- [x] Reducer отклоняет прямые переходы к анализу/решению/result и выбор закрытых зон; bypass-кейсы покрыты тестами.
- [x] Расшифровка «ДЗЗ — дистанционное зондирование Земли» видна в первом hook, onboarding и интерактивном слое.
- [x] Повреждённый localStorage payload не ломает карту: зоны нормализуются в безопасные 5×5-сетки.
- [x] Result-заголовок рендерит JSX корректно; на 320–500px payoff и CTA не уходят за первый экран.
- [x] Browser critical flow: Brave headless/CDP на 390×844; wrong-choice recovery, result, return и storage cleanup подтверждены.
- [x] Документация bootstrap-аудита заполнена фактическими результатами.
- [x] Backend, auth, multiplayer, open world и feature creep отклонены: не видны в коротком demo и не усиливают кейс.
