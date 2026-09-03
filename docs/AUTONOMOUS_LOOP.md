# AUTONOMOUS_LOOP — как оркестратор работает без микроменеджмента

## Principle

После bootstrap оркестратор не ждёт очередного сообщения пользователя. В пределах доступной сессии он повторяет цикл улучшения до FREEZE или реальной внешней блокировки всего проекта.

## Loop

1. **Observe** — фактическое состояние приложения, тестов, screenshots, scorecard.
2. **Diagnose** — найти 1–3 главных ограничения на победу.
3. **Generate options** — несколько улучшений, не один импульсивный вариант.
4. **Prioritize** — Impact / Cost / Risk + Case/Demo/User impact.
5. **Checkpoint** — если изменение рискованное.
6. **Implement** — минимально достаточное качественное решение.
7. **Static verify** — typecheck/lint/tests/build.
8. **Runtime verify** — dev server, browser, console.
9. **Experience verify** — critical demo-flow, mobile, screenshots.
10. **Independent review** — нужные субагенты.
11. **Compare** — стало ли реально лучше относительно предыдущего состояния.
12. **Accept / Fix / Revert**.
13. **Commit**.
14. **Update memory** — backlog/state/score/decisions только по существу.
15. **Repeat**.

## Selection heuristic

Не выбирать задачу только потому, что она простая. Не выбирать задачу только потому, что она сложная и «интересная».

Высокий приоритет: сильное влияние на case/demo/clarity при приемлемой цене.

## Anti-loop safeguards

Остановить конкретный тип улучшений, если:

- три итерации подряд почти не изменяют score/user experience;
- изменения начинают возвращать предыдущие решения без новых данных;
- визуальный polish становится незаметным в реальном размере экрана;
- новые фичи увеличивают demo-time без роста понимания;
- refactor не решает конкретный риск.

Переключиться на другой слабый показатель.

## Review cadence

- после каждого существенного flow change → Demo + QA;
- после case semantics change → Case Reviewer;
- после крупного visual redesign → Visual + Demo;
- после архитектурной переделки → Frontend Architect + QA;
- после нескольких значимых итераций → Jury Review;
- перед POLISH и FREEZE → полный review набор.

## Blockers

`BLOCKED_EXTERNAL` не блокирует весь loop. Выбрать следующий незаблокированный item.

## Communication

Коротко сообщать о вехах, но не спрашивать разрешение продолжать.
