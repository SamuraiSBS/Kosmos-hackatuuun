# QA_CHECKLIST — обязательные проверки

Использовать подходящие пункты после каждого существенного изменения и полный список перед FREEZE.

## Static

- [x] TypeScript/typecheck проходит.
- [x] Lint проходит, если настроен.
- [x] Unit/integration tests проходят, если есть.
- [x] Production build проходит.
- [x] Dependency audit проходит: `npm audit` и `npm audit --omit=dev` показывают 0 vulnerabilities.
- [x] Нет broken imports.
- [x] Нет очевидных dead/unreachable flow states.

## Runtime

- [x] Приложение запускается с чистого состояния.
- [x] Нет runtime crash в текущем browser walkthrough — Brave headless/CDP flow завершён.
- [x] Нет необъяснённых console errors — 0 Runtime exceptions, 0 app console errors и 0 HTTP responses >=400.
- [x] Нет бесконечных loading states.
- [x] Reset действительно возвращает демонстрацию к началу (reducer test).
- [x] localStorage сохраняет незавершённый flow, но завершённый run очищается и не ломает повторный demo.
- [x] Reducer отклоняет прямые переходы к analysis/decision/result, требует явного `REVEAL_SIGNAL` перед decision, блокирует выбор закрытых зон и повторную выдачу награды; malformed localStorage не ломает зоны (14 регрессионных тестов проходят).

## Critical demo flow

- [x] Intro/hook — Brave headless/CDP walkthrough.
- [x] Переход к побережью — Brave headless/CDP walkthrough.
- [x] Получение/понимание миссии — Brave headless/CDP walkthrough.
- [x] Нахождение проблемной зоны — Brave headless/CDP walkthrough.
- [x] Открытие анализа/ДЗЗ — Brave headless/CDP walkthrough.
- [x] Понимание ключевого наблюдения — обязательный слой и observation path.
- [x] Decision — Brave headless/CDP walkthrough.
- [x] Неверный выбор не ломает сценарий, если он предусмотрен — feedback оставляет пользователя в decision.
- [x] Правильный выбор приводит к result — Brave headless/CDP walkthrough.
- [x] Состояние мира меняется — 72% → 86%, restored tiles.
- [x] Прогресс/feedback виден — +120 XP и result payoff.
- [x] Возврат на карту сохраняет последствия — restored zone, completed-run storage cleanup.
- [x] Образовательный payoff понятен — DZZ → field work → official project CTA.

## Mobile viewports

Проверить минимум там, где доступно:

  - [x] 320px — responsive sweep, no horizontal overflow
  - [x] 360px — responsive sweep, no horizontal overflow
  - [x] 390×844 (primary) — walkthrough + visual review
  - [x] 430px — responsive sweep, no horizontal overflow
  - [x] 500px — responsive sweep, no horizontal overflow

Проверить:

- [x] Browser/mobile visual checks: no horizontal overflow; bottom navigation, sheet, HUD and readability reviewed at primary viewport.
- [x] safe areas учтены в layout через env(safe-area-inset-*);
- [x] touch target около 44px или больше для основных действий;
- [x] keyboard/focus не применим: экран не содержит ввода;
- [x] нет layout shift, мешающего нажатию.

## Visual

- [x] Понятна иерархия — visual review Space, analysis, result.
- [x] Главная CTA очевидна — layer reveal, cleanup plan and return CTA.
- [x] Нет SaaS-dashboard drift — scene/game presentation remains coherent.
- [x] Pixel/cozy язык последовательный — CSS/SVG visual system.
- [x] Problem/healthy states визуально различимы — polluted/watch/restored tiles.
- [x] DZZ scene выглядит технологично, но остаётся частью игры — scanner + orbital language.
- [x] Result визуально ощутим — animated cleanup, 72% → 86%, reward.
- [x] Нет случайного визуального мусора/неуместных emojis, если они конфликтуют со стилем — symbols are part of the established visual language.

## Performance

- [x] Intro performance — browser flow completes without a loading hang or visible crash.
- [x] Map jank — scripted drag surface and scene transitions complete without runtime issue; separate device profiling is not claimed.
- [x] Не используются тяжёлые blur/filter/DOM эффекты без необходимости.
- [x] Анимации не блокируют ввод.
- [x] Bundle/dependencies не раздуваются без причины.

## Case sanity

- [x] Пользователь понимает, что это «Чистый берег».
- [x] Побережье/загрязнение — центральная тема.
- [x] ДЗЗ играет реальную роль в flow.
- [x] Есть образовательная ценность.
- [x] Нет возврата к аграрной семантике из старого MVP.

## Before commit

- [x] Изменение проверено.
- [x] Не затронуты чужие незнакомые изменения.
- [x] Commit message описывает фактический результат.
