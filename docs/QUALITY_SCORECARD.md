# QUALITY_SCORECARD — живой scorecard

Оркестратор обновляет фактические оценки после значимых review. Не завышать баллы для самоуспокоения.

## Current phase

`AUDIT` / `CASE_REALIGNMENT` / `BUILD` / `POLISH` / `FREEZE`

## Scores

| Metric | Score 0–10 | Evidence | Biggest gap |
|---|---:|---|---|
| Case Fit | TBD | | |
| Demo Readiness | TBD | | |
| DZZ Integration | TBD | | |
| Educational Clarity | TBD | | |
| Wow Effect | TBD | | |
| Visual Quality | TBD | | |
| Originality | TBD | | |
| Game Engagement | TBD | | |
| First-time Clarity | TBD | | |
| Mobile UX | TBD | | |
| Technical Stability | TBD | | |
| Performance | TBD | | |

## Hard gates

- Critical bugs: `TBD`
- Main demo flow: `TBD`
- Production build: `TBD`
- Console/runtime errors: `TBD`
- Tested primary viewport: `TBD`
- Regression status: `TBD`

## Scoring discipline

### 9–10
Требуется конкретное доказательство: browser flow, screenshot comparison, тест, независимый reviewer, либо ясное соответствие официальному кейсу.

### 7–8
Сильное состояние, но есть заметный пробел.

### 5–6
Работает/понятно частично, есть важные проблемы.

### <5
Слабое место, потенциальный P0/P1.

## Freeze target

Ориентир:

- Critical bugs = 0
- Main demo flow = 100%
- Case Fit ≥ 9
- Demo Readiness ≥ 9
- DZZ / Educational Clarity ≥ 9
- Mobile UX ≥ 9
- Visual Quality ≥ 9
- Technical Stability ≥ 9

Если новая функция рискует уронить эти показатели непосредственно перед FREEZE — не добавлять без очень сильной причины.
