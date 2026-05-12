# Tests

## Test Framework

The project uses Jest for audit engine testing.

Run tests with:

```bash
npm test
```

---

## Automated Tests

### tests/audit.test.ts

Covers:

- yearly spend calculation
- monthly savings calculation
- optimization score generation
- seat reduction recommendations
- overlapping tool detection
- productivity risk handling
- spend-per-employee calculations

---

## Why These Tests Matter

The audit engine is the most important business-logic layer in the application.

Testing helps ensure:
- financial calculations remain stable
- recommendation logic behaves consistently
- optimization scoring works correctly
- future refactors do not break calculations

---

## Future Tests

Potential future coverage:
- API route testing
- PDF export testing
- form validation testing
- integration tests
- rate-limit testing
- accessibility testing