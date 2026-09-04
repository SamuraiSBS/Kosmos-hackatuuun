# STATE_OF_PROJECT — фактическое состояние

Обновлено: 2026-09-04 19:39 (MSK), после browser/CDP walkthrough и mobile polish.

## Phase

FREEZE

Основной demo-flow собран, фактически пройден в Brave headless/CDP на 390×844 и проверен на 320/360/390/430/500px; состояние заморожено.

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
- Кнопка возврата из Decision в Analysis работает только по валидному guarded-переходу и покрыта regression test.
- Последствие: tiles polluted/watch переходят в restored/clear, состояние берега 72% → 86%, +120 XP.
- Образовательный payoff связывает снимок ДЗЗ с планированием полевой работы.
- Финальный экран ведёт на официальный материал проекта «Чистый берег»; станция ДЗЗ не позволяет случайно обойти mission onboarding.
- Нижняя навигация и reducer guards не позволяют обойти последовательность сигнал → ДЗЗ → решение; `OPEN_DECISION` требует отдельного `REVEAL_SIGNAL` после готовности анализа.
- Reducer дополнительно отклоняет прямые переходы к decision/result, выбор закрытых зон и небезопасные SET_SCENE; критическая последовательность покрыта регрессионными тестами.
- Первое объяснение раскрывает ДЗЗ как «дистанционное зондирование Земли» в orbital hook, onboarding и карточке слоя; подсказка карты ведёт к сигналу мусора.
- Result-заголовок исправлен на JSX; компактный mobile layout показывает payoff, официальный CTA и возврат на 320–500px.
- Незавершённое состояние сохраняется в localStorage для безопасного refresh; завершённый demo-run не гидратируется и очищает storage, поэтому новый заход начинается с чистой экспедиции; debug mode скрыт без ?debug=true.
- Гидратация localStorage нормализует каждую береговую зону как безопасную 5×5-сетку и откатывает повреждённые/устаревшие зоны к исходному состоянию.
- В репозитории сохранена историческая запись EdgeCore walkthrough для map/sheet/analysis/decision/result; текущий Brave headless/CDP walkthrough подтвердил тот же critical path.
- Browser/mobile walkthrough фактически пройден: Space → intro → зона A → sheet → скан → обязательный слой ДЗЗ → неверное решение без dead end → правильное решение → result → возврат на карту.
- Responsive sweep 320/360/390/430/500px не выявил горизонтального overflow; 390px result CTA заканчивается в пределах viewport после mobile polish.
- npm run lint, npm test (15/15) и npm run build проходят.

## What is broken / risky

- Карта, снимок и персонажи остаются CSS placeholders; нет реального спутникового raster/API.
- Учебные проценты анализа — mock data и должны оставаться обозначенными как учебный снимок.
- Live imagery/API и финальный raster по-прежнему не подключены: scanner явно остаётся учебным SVG/mock-слоем.
- Legacy CSS имена компонентов (field-*) остались техническими селекторами, но пользовательская семантика и state model уже береговые.

## Current demo flow

1. Space: ЧИСТЫЙ БЕРЕГ / дистанционное зондирование Земли (ДЗЗ) показывает берег сверху.
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
- Unit tests: PASS, 15/15 (npm test -- --run).
- Production build: PASS (npm run build).
- Dev server: PASS, Vite отдаёт HTTP 200 на локальном порту.
- Browser flow: PASS — Brave headless/CDP, 390×844, critical path и wrong-choice recovery пройдены.
- Primary viewport: PASS — 390×844 CSS viewport открыт и визуально проверен на Space, analysis и result.
- Responsive viewport sweep: PASS — 320/360/390/430/500×844; horizontal overflow не обнаружен.
- Console errors: PASS — 0 Runtime exceptions, 0 app console errors и 0 HTTP responses >=400 в финальном walkthrough.

## Current P0

1. Не добавлять новые функции до защиты; держать deterministic demo path frozen.
2. Перед защитой повторить только короткий smoke-check на целевом устройстве, если оно отличается от проверенного viewport.
3. На защите показать цепочку без дополнительного объяснения: Чистый берег → ДЗЗ → сигнал мусора → точечная уборка.

## External blockers

- BLOCKED_EXTERNAL: отдельный delegated review отклонён средой (403); это не блокирует freeze, так как финальный in-thread jury pass и фактический browser/CDP gate завершены.

## Last stable checkpoint

ca28cd7 — polish: close browser console and mobile gates; latest freeze checkpoint.
