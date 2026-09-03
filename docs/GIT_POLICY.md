# GIT_POLICY — безопасная автономная работа

## Safety first

- Не выполнять destructive reset/clean против файлов, происхождение которых неясно.
- Не затирать незакоммиченные пользовательские изменения.
- Перед крупной переделкой сначала понять Git status/diff.

## Checkpoints

Перед рискованными изменениями создавать checkpoint, если текущее состояние достаточно стабильно.

Примеры:

- `checkpoint: stable demo before coast realignment`
- `checkpoint: stable scanner before visual redesign`

## Normal commits

После законченной проверенной единицы:

- `feat: realign mission around coastal pollution`
- `feat: add interactive DZZ comparison`
- `fix: preserve cleaned coast state after navigation`
- `polish: improve mobile mission guidance`
- `test: cover critical demo flow`
- `refactor: isolate asset rendering from game state`
- `docs: record case realignment decision`

## Commit gate

Предпочтительно перед обычным готовым коммитом:

- relevant static checks pass;
- production build pass;
- изменённый flow проверен;
- нет нового known critical regression.

## Failed experiments

Потраченные строки кода не имеют ценности сами по себе. Если эксперимент ухудшает demo или создаёт неприемлемый риск:

- исправить, если причина ясна и fix ограничен;
- иначе безопасно откатить только собственный эксперимент;
- зафиксировать важный вывод в `DECISIONS.md`, если он предотвратит повторение.

## Branches

Не создавать сложную branch bureaucracy без пользы. Если среда/рабочий процесс уже использует ветку хакатона — встроиться в него.
