# DECISIONS — журнал значимых решений

Хранить только решения, которые будущий оркестратор может захотеть отменить, не понимая причины.

## Format

### YYYY-MM-DD — короткое название

**Decision:** что решили.  
**Why:** почему.  
**Evidence:** тесты/review/официальный кейс/ограничение.  
**Alternatives rejected:** что не выбрали.  
**Revisit when:** при каких новых фактах пересмотреть.

---

## Seed decision — кейс важнее старой семантики MVP

**Decision:** сохранить полезную архитектуру и игровой loop исходного MVP, но убрать аграрную предметную семантику, если она не соответствует кейсу «Чистый берег».  
**Why:** первоначальный план использует поля/влажность/вегетацию/полив, тогда как кейс №1 посвящён популяризации образовательного проекта по экологическому анализу и побережьям.  
**Revisit when:** только если официальный кейс будет изменён/уточнён кейсодержателем.

## 2026-09-04 — CASE REALIGNMENT в береговую зону

**Decision:** сохранить reducer, сцены и tile-based interaction, но заменить runtime-модель farm/field/vegetation/moisture на coast/zone/debris signal. Зона A-04 теперь требует интерактивно показать слой ДЗЗ перед планированием уборки.
**Why:** текущий MVP проходил технический loop, но выглядел как кейс мониторинга вегетации и мог быть неверно пересказан жюри. Новый flow напрямую объясняет образовательный проект Чистый берег: снимок → сигнал загрязнения → полевой план → последствие.
**Evidence:** docs/CASE_SOURCE.md, bootstrap-аудит, успешные typecheck/tests/build.
**Alternatives rejected:** полный rewrite и backend/live API — высокая стоимость без влияния на короткий demo; сохранение аграрной терминологии — прямой case drift.
**Revisit when:** появится официальный dataset/ассет, который улучшает правдоподобие без выдачи mock за live.

## 2026-09-04 — guard critical observation sequence

**Decision:** запретить открытие анализа и decision до обязательных предыдущих шагов и в UI, и в reducer; нижняя навигация показывает понятный toast о необходимости открыть подсвеченную зону.
**Why:** свободная навигация позволяла обойти смысловую цепочку «сигнал на карте → ДЗЗ → полевая работа», что делало ДЗЗ декоративным.
**Evidence:** browser walkthrough, регрессионный reducer test, docs/DEMO_FLOW.md.
**Alternatives rejected:** скрывать вкладку «Анализ» — ухудшает discoverability; полагаться только на disabled CTA — не закрывает dispatch/navigation bypass.
**Revisit when:** появятся дополнительные миссии с отдельными prerequisite graph.

## 2026-09-04 — mobile result compression

**Decision:** сократить copy payoff и вертикальный ритм result на ширинах до 500px, чтобы consequence, educational CTA и возврат на карту помещались в первый экран 320–500×844.
**Why:** фактический screenshot review показал, что при исходном spacing нижний CTA уходил ниже экрана; это мешало короткой защите и повторному demo.
**Evidence:** EdgeCore screenshots на 320/360/390/430/500×844, visual review.
**Alternatives rejected:** оставить обязательный scroll — снижает demo clarity; уменьшать основной текст до нечитаемого размера — ухудшает educational payoff.
**Revisit when:** появится реальный mobile device profiling или добавится второй result-блок.

## 2026-09-04 — completed run does not persist

**Decision:** сохранять незавершённый flow в localStorage для refresh, но удалять завершённую миссию из storage после начисления результата и игнорировать старый completed payload при загрузке.

**Why:** повторный заход на localhost после прошлой демонстрации открывал уже выполненное задание и ломал critical demo-flow для жюри.

**Revisit when:** появится отдельный профиль пользователя или явный multi-run progress.

## 2026-09-04 — make observation-to-action explicit

**Decision:** после раскрытия слоя ДЗЗ показывать компактную цепочку «сигнал → точка A-04 → выезд» перед CTA планирования.

**Why:** пользователь должен не только увидеть оранжевые ячейки, но и сразу связать координаты снимка с последующим полевым действием.

**Evidence:** current AnalysisScene flow and case requirement to popularize the educational DZZ workflow.

**Alternatives rejected:** добавить вторую миссию — дороже и увеличивает demo-time без усиления первого объяснения.

**Revisit when:** появится второй тип загрязнения или реальный raster, для которого понадобится отдельная легенда.

## 2026-09-04 — educational shoreline raster fallback

**Decision:** добавить лёгкий стилизованный SVG-растр береговой линии как базовый слой scanner viewport через assetRegistry, оставив цветные ячейки отдельным интерактивным сигналом.

**Why:** текущая CSS-сетка объясняла механику, но выглядела слишком абстрактно для демонстрации ДЗЗ; береговой контекст делает снимок узнаваемее.

**Evidence:** local asset build and dev-server smoke-check; SVG явно описан как учебный снимок и не имитирует live imagery.

**Alternatives rejected:** подключать внешний raster/API — нет проверенного источника, attribution и необходимости для короткого deterministic demo.

**Revisit when:** появится согласованный реальный или финальный ассет с источником и attribution.

## 2026-09-04 — reducer owns decision correctness

**Decision:** `MAKE_DECISION` принимает только идентификатор выбранного действия, а правильность вычисляет reducer по `currentMission.correctDecision`.

**Why:** UI-флаг `correct` позволял внешнему dispatch обойти смысл миссии и открыть result для неверного выбора.

**Evidence:** reducer regression test covers both `ignore` and `cleanup`; lint, 10/10 tests and production build pass.

**Revisit when:** появится граф решений для нескольких миссий; правила останутся в mission config, а не в UI.

## 2026-09-04 — educational shoreline raster fallback

**Decision:** добавить лёгкий стилизованный SVG-растр береговой линии как базовый слой scanner viewport через assetRegistry, оставив цветные ячейки отдельным интерактивным сигналом.

**Why:** текущая CSS-сетка объясняла механику, но выглядела слишком абстрактно для демонстрации ДЗЗ; береговой контекст делает снимок узнаваемее.

**Evidence:** local asset build and dev-server smoke-check; SVG явно описан как учебный снимок и не имитирует live imagery.

**Alternatives rejected:** подключать внешний raster/API — нет проверенного источника, attribution и необходимости для короткого deterministic demo.

**Revisit when:** появится согласованный реальный или финальный ассет с источником и attribution.

## 2026-09-04 — make observation-to-action explicit

**Decision:** после раскрытия слоя ДЗЗ показывать компактную цепочку «сигнал → точка A-04 → выезд» перед CTA планирования.

**Why:** пользователь должен не только увидеть оранжевые ячейки, но и сразу связать координаты снимка с последующим полевым действием.

**Evidence:** current AnalysisScene flow and case requirement to popularize the educational DZZ workflow.

**Alternatives rejected:** добавить вторую миссию — дороже и увеличивает demo-time без усиления первого объяснения.

**Revisit when:** появится второй тип загрязнения или реальный raster, для которого понадобится отдельная легенда.
