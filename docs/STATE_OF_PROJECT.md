# STATE_OF_PROJECT — фактическое состояние

Обновлено: 2026-09-04 00:55 (MSK), после bootstrap-аудита и первой итерации CASE REALIGNMENT.

## Phase

BUILD / CASE_REALIGNMENT

До СТОП-КОДА по зафиксированному timebox остаётся достаточно времени для одной-двух high-impact итераций, но browser-проверка должна стать следующей обязательной вехой.

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
- Состояние сохраняется в localStorage; debug mode скрыт без ?debug=true.
- npm run lint, npm test (5/5) и npm run build проходят.

## What is broken / risky

- Полный пользовательский flow фактически не пройден в браузере на 390×844: в окружении нет доступной browser automation/Chrome-интеграции. HTTP-ответ dev-сервера проверен, но это не заменяет visual/runtime QA.
- Карта, снимок и персонажи остаются CSS placeholders; нет реального спутникового raster/API.
- Учебные проценты анализа — mock data и должны оставаться обозначенными как учебный снимок.
- Нужна проверка вертикального скролла analysis/result и читаемости на 320px после добавления интерактивного слоя.
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
- Unit tests: PASS, 5/5 (npm test -- --run).
- Production build: PASS (npm run build).
- Dev server: PASS, Vite отдаёт HTTP 200 на локальном порту.
- Browser flow: NOT VERIFIED — browser automation недоступна.
- Primary viewport: NOT VERIFIED визуально.
- Console errors: NOT VERIFIED в браузере.

## Current P0

1. Фактически пройти critical flow на 390×844 и соседних ширинах, когда доступен browser-инструмент.
2. По результатам browser review устранить layout/runtime regressions, особенно analysis layer и result payoff.
3. Проверить, что жюри без устного объяснения считывает: Чистый берег → ДЗЗ → сигнал мусора → точечная уборка.

## External blockers

- BLOCKED_EXTERNAL: browser automation/визуальный preview не предоставлены текущему окружению.
- Это блокирует только доказательство UI, не разработку; статические проверки и HTTP launch уже выполнены.

## Last stable checkpoint

fba0686 — MVP!!!!!!!!!!! (^///^), clean baseline before this realignment iteration.
