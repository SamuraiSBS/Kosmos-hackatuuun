# STATE_OF_PROJECT — фактическое состояние

Обновлено: 2026-09-04 15:31 (MSK), после persistence hardening и полного critical-flow sweep.

## Phase

DEMO_HARDENING / LIMITED_VALIDATION

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
- Scanner получил отдельный учебный SVG-растр береговой линии под интерактивной сеткой сигнала; это базовый визуальный контекст, а не live imagery.
- Решение «Спланировать уборку», обратная связь на неверные варианты и повторный выбор.
- Последствие: tiles polluted/watch переходят в restored/clear, состояние берега 72% → 86%, +120 XP.
- Образовательный payoff связывает снимок ДЗЗ с планированием полевой работы.
- Финальный экран ведёт на официальный материал проекта «Чистый берег»; станция ДЗЗ не позволяет случайно обойти mission onboarding.
- Нижняя навигация и reducer guards не позволяют обойти последовательность сигнал → ДЗЗ → решение.
- Result-заголовок исправлен на JSX; компактный mobile layout показывает payoff, официальный CTA и возврат на 320–500px.
- Незавершённое состояние сохраняется в localStorage для безопасного refresh; завершённый demo-run не гидратируется и очищает storage, поэтому новый заход начинается с чистой экспедиции; debug mode скрыт без ?debug=true.
- В репозитории сохранена историческая запись EdgeCore walkthrough для map/sheet/analysis/decision/result; в текущем окружении этот runner недоступен, поэтому browser/mobile acceptance здесь не переобъявляется завершённой.
- npm run lint, npm test (9/9) и npm run build проходят.

## What is broken / risky

- Карта, снимок и персонажи остаются CSS placeholders; нет реального спутникового raster/API.
- Учебные проценты анализа — mock data и должны оставаться обозначенными как учебный снимок.
- Chrome/Chromium/Edge и Playwright/Puppeteer не обнаружены в текущем окружении; отдельный CDP console stream недоступен. Browser/mobile и console gates остаются ограниченными.
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
- Unit tests: PASS, 9/9 (npm test -- --run).
- Production build: PASS (npm run build).
- Dev server: PASS, Vite отдаёт HTTP 200 на локальном порту.
- Browser flow: LIMITED — стандартный browser automation runner недоступен; исторический EdgeCore result не воспроизводился в этой итерации.
- Primary viewport: LIMITED — 390×844 CSS viewport не открыт доступным инструментом в этой итерации.
- Responsive viewport sweep: LIMITED — 320/360/390/430/500×844 не открыты доступным инструментом в этой итерации.
- Console errors: PARTIAL — отдельный CDP console stream недоступен; в ходе flow app error overlay/uncaught failure не surfaced, Edge host warnings не относятся к app.

## Current P0

1. Не добавлять рискованные функции до защиты; держать deterministic demo path frozen.
2. При появлении approved browser/CDP-инструмента повторить browser/mobile flow и console gate.
3. Проверить, что жюри без устного объяснения считывает: Чистый берег → ДЗЗ → сигнал мусора → точечная уборка.

## External blockers

- BLOCKED_EXTERNAL: отдельный delegated review отклонён средой (403), а CDP console stream не предоставлен.
- Это не блокирует статическую разработку и smoke-check, но блокирует объявление browser/mobile acceptance завершённой.

## Last stable checkpoint

eb7325c — fix: make reducer own decision correctness, latest static-verified checkpoint.
