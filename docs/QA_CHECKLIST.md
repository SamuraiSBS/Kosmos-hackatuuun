# QA_CHECKLIST — обязательные проверки

Использовать подходящие пункты после каждого существенного изменения и полный список перед FREEZE.

## Static

- [x] TypeScript/typecheck проходит.
- [x] Lint проходит, если настроен.
- [x] Unit/integration tests проходят, если есть.
- [x] Production build проходит.
- [x] Нет broken imports.
- [x] Нет очевидных dead/unreachable flow states.

## Runtime

- [x] Приложение запускается с чистого состояния.
- [x] Нет runtime crash в фактически пройденном EdgeCore flow.
- [ ] Нет необъяснённых console errors — отдельный CDP console stream недоступен; host warnings зафиксированы отдельно.
- [x] Нет бесконечных loading states.
- [x] Reset действительно возвращает демонстрацию к началу (reducer test).
- [x] localStorage/persistence не ломает повторный demo.

## Critical demo flow

- [x] Intro/hook.
- [x] Переход к побережью.
- [x] Получение/понимание миссии.
- [x] Нахождение проблемной зоны.
- [x] Открытие анализа/ДЗЗ.
- [x] Понимание ключевого наблюдения.
- [x] Decision.
- [x] Неверный выбор не ломает сценарий, если он предусмотрен.
- [x] Правильный выбор приводит к result.
- [x] Состояние мира меняется.
- [x] Прогресс/feedback виден.
- [x] Возврат на карту сохраняет последствия.
- [x] Образовательный payoff понятен.

## Mobile viewports

Проверить минимум там, где доступно:

- [x] 320px
- [x] 360px
- [x] 390×844 (primary)
- [x] 430px
- [x] 500px

Проверить:

- [x] horizontal overflow не наблюдается на sweep screenshots;
- [x] safe areas учтены в layout через env(safe-area-inset-*);
- [x] bottom navigation;
- [x] bottom sheets/modals;
- [x] HUD;
- [x] touch target около 44px или больше для основных действий;
- [x] читаемость текста;
- [x] keyboard/focus не применим: экран не содержит ввода;
- [x] нет layout shift, мешающего нажатию.

## Visual

- [x] Понятна иерархия.
- [x] Главная CTA очевидна.
- [x] Нет SaaS-dashboard drift.
- [x] Pixel/cozy язык последовательный.
- [x] Problem/healthy states визуально различимы.
- [x] DZZ scene выглядит технологично, но остаётся частью игры.
- [x] Result визуально ощутим.
- [x] Нет случайного визуального мусора/неуместных emojis, если они конфликтуют со стилем.

## Performance

- [x] Intro не лагает в EdgeCore walkthrough.
- [x] Карта не вызывает заметного jank в walkthrough.
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
