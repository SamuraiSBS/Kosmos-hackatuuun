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
- [ ] Нет runtime crash в текущем browser walkthrough — runner недоступен; историческая EdgeCore запись сохранена отдельно.
- [ ] Нет необъяснённых console errors — отдельный CDP console stream недоступен; host warnings зафиксированы отдельно.
- [x] Нет бесконечных loading states.
- [x] Reset действительно возвращает демонстрацию к началу (reducer test).
- [x] localStorage сохраняет незавершённый flow, но завершённый run очищается и не ломает повторный demo.
- [x] Reducer отклоняет прямые переходы к decision/result, выбор закрытых зон и повторную выдачу награды; malformed localStorage не ломает зоны (14 регрессионных тестов проходят).

## Critical demo flow

- [ ] Intro/hook — browser walkthrough pending.
- [ ] Переход к побережью — browser walkthrough pending.
- [ ] Получение/понимание миссии — browser walkthrough pending.
- [ ] Нахождение проблемной зоны — browser walkthrough pending.
- [ ] Открытие анализа/ДЗЗ — browser walkthrough pending.
- [ ] Понимание ключевого наблюдения — browser walkthrough pending.
- [ ] Decision — browser walkthrough pending.
- [ ] Неверный выбор не ломает сценарий, если он предусмотрен — browser walkthrough pending.
- [ ] Правильный выбор приводит к result — browser walkthrough pending.
- [ ] Состояние мира меняется — browser walkthrough pending.
- [ ] Прогресс/feedback виден — browser walkthrough pending.
- [ ] Возврат на карту сохраняет последствия — browser walkthrough pending.
- [ ] Образовательный payoff понятен — browser walkthrough pending.

## Mobile viewports

Проверить минимум там, где доступно:

- [ ] 320px — runner недоступен
- [ ] 360px — runner недоступен
- [ ] 390×844 (primary) — runner недоступен
- [ ] 430px — runner недоступен
- [ ] 500px — runner недоступен

Проверить:

- [ ] Browser/mobile visual checks pending runner: horizontal overflow, bottom navigation, sheets, HUD and readability.
- [x] safe areas учтены в layout через env(safe-area-inset-*);
- [x] touch target около 44px или больше для основных действий;
- [x] keyboard/focus не применим: экран не содержит ввода;
- [x] нет layout shift, мешающего нажатию.

## Visual

- [ ] Понятна иерархия — current browser review pending.
- [ ] Главная CTA очевидна — current browser review pending.
- [ ] Нет SaaS-dashboard drift — current browser review pending.
- [ ] Pixel/cozy язык последовательный — current browser review pending.
- [ ] Problem/healthy states визуально различимы — current browser review pending.
- [ ] DZZ scene выглядит технологично, но остаётся частью игры — current browser review pending.
- [ ] Result визуально ощутим — current browser review pending.
- [ ] Нет случайного визуального мусора/неуместных emojis, если они конфликтуют со стилем — current browser review pending.

## Performance

- [ ] Intro performance не переоткрыта в текущем browser walkthrough; историческая EdgeCore запись сохранена.
- [ ] Map jank не переоценён в текущем browser walkthrough; историческая EdgeCore запись сохранена.
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
