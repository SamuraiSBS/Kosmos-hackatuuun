# STATE_OF_PROJECT — фактическое состояние

Обновлено: 2026-09-04 10:16 (MSK), после browser/mobile hardening и полного critical-flow sweep.

## Phase

DEMO_HARDENING / READY_FOR_HANDOFF

Основной demo-flow собран и фактически пройден; новые изменения теперь оправданы только если заметно усиливают защиту и не повышают риск.

## Current stack

- React + TypeScript + Vite.
- useReducer + Context API для игрового состояния.
- CSS-only pixel/cozy placeholders через GameAsset и asset registry.
- Локальные учебные данные анализа через service boundary getZoneAnalysis.
- Vitest для unit-тестов.
- Основной viewport: 390×844; поддерживаемый диапазон: 320–500px.

## What works now

- Орбитальная заставка с пропуском и переходом к карте.
- Onboarding от помощника: пользователь получает сигнал загрязнения у северной линии.
- Береговая карта с draggable-осмотром, береговыми зонами, штабом полевой команды и станцией ДЗЗ.
- Bottom Sheet по подсвеченной зоне A-04 с объяснением, зачем открыть слой ДЗЗ.
- Асинхронный mock-анализ с фазами получения, анализа, обнаружения и готовности.
- Интерактивное действие «Показать слой»: загрязнённые ячейки появляются на снимке только после действия пользователя.
- Решение «Спланировать уборку», обратная связь на неверные варианты и повторный выбор.
- Последствие: tiles polluted/watch переходят в restored/clear, состояние берега 72% → 86%, +120 XP.
- Образовательный payoff связывает снимок ДЗЗ с планированием полевой работы.
- Финальный экран ведёт на официальный материал проекта «Чистый берег»; станция ДЗЗ не позволяет случайно обойти mission onboarding.
- Нижняя навигация и reducer guards не позволяют обойти последовательность сигнал → ДЗЗ → решение.
- Result-заголовок исправлен на JSX; компактный mobile layout показывает payoff, официальный CTA и возврат на 320–500px.
- Незавершённое состояние сохраняется в localStorage для безопасного refresh; завершённый demo-run не гидратируется и очищает storage, поэтому новый заход начинается с чистой экспедиции; debug mode скрыт без ?debug=true.
- Browser sweep на 320×844, 360×844, 390×844, 430×844 и 500×844 прошёл для map/sheet/analysis/decision/result; returned-map подтверждён на 320 и 390.
- npm run lint, npm test (7/7) и npm run build проходят.

## What is broken / risky

- Карта, снимок и персонажи остаются CSS placeholders; нет реального спутникового raster/API.
- Учебные проценты анализа — mock data и должны оставаться обозначенными как учебный снимок.
- Browser runner даёт Edge host warnings о registry/GPU, но app stages доходят до конца; отдельный CDP console stream недоступен, поэтому console gate не объявляется полностью закрытым.
- Legacy CSS имена компонентов (field-*) остались техническими селекторами, но пользовательская семантика и state model уже береговые.

## Current demo flow

1. Space: ЧИСТЫЙ БЕРЕГ / наблюдение береговой линии по ДЗЗ.
2. Intro: помощник сообщает о сигнале скопления мусора.
3. Map: пользователь нажимает подсвеченную ЗОНА A.
4. Mission sheet: видит Скопление мусора и нажимает Открыть анализ ДЗЗ.
5. Analysis: ждёт учебный снимок, нажимает Показать слой, видит выделенные ячейки сигнала.
6. Decision: выбирает Спланировать уборку.
7. Result: видит последовательное очищение зоны, 72% → 86%, +120 XP и связь с Чистым берегом.
8. Return: карта сохраняет очищенную северную зону.

## Case alignment

- Видимая семантика realigned с аграрного MVP на береговую линию, загрязнение, полевую уборку, ДЗЗ и образовательный проект Чистый берег.
- Убраны из runtime-flow: ферма, поля как аграрный объект, растения, влажность почвы, NDVI и полив.
- ZoneState теперь использует clear/watch/polluted/restored, а состояние прогресса называется coastHealth.
- Старый original/INITIAL_MVP_PLAN.md и исторический coding plan намеренно не переписывались: это архивные источники, не runtime truth.

## Test status

- Typecheck/lint: PASS (npm run lint).
- Unit tests: PASS, 6/6 (npm test -- --run).
- Production build: PASS (npm run build).
- Dev server: PASS, Vite отдаёт HTTP 200 на локальном порту.
- Browser flow: PASS — EdgeCore same-origin walkthrough достиг всех стадий без app crash.
- Primary viewport: PASS — 390×844 CSS viewport, включая returned-map.
- Responsive viewport sweep: PASS — 320/360/390/430/500×844.
- Console errors: PARTIAL — отдельный CDP console stream недоступен; в ходе flow app error overlay/uncaught failure не surfaced, Edge host warnings не относятся к app.

## Current P0

1. Не добавлять рискованные функции до защиты; держать deterministic demo path frozen.
2. При появлении отдельного console/CDP-инструмента повторить только console gate.
3. Проверить, что жюри без устного объяснения считывает: Чистый берег → ДЗЗ → сигнал мусора → точечная уборка.

## External blockers

- BLOCKED_EXTERNAL: отдельный delegated review отклонён средой (403), а CDP console stream не предоставлен.
- Это не блокирует demo-flow: browser/mobile и visual acceptance пройдены через доступный EdgeCore harness.

## Last stable checkpoint

cb61e25 — fix: harden mobile demo flow, browser/mobile verified checkpoint.
