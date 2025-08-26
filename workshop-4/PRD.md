# PRD: KBTP Points — Wallet, Shopping & Transfer
**Version:** 1.0  
**Date:** \[Current Date]  
**Owner:** Product Team  
**Status:** Draft (UI-aligned)

---

## 1) Overview
**KBTP Points** is a loyalty points system that lets members: view profile & tier, see recent activity, transfer points via QR, and redeem (shop) items using points. A purchase confirmation **SMS** is sent upon successful checkout.

**Primary flows (from UI):**
1. Member Home → **Settings**  
2. Member Home → **View all** (Recent Activity)  
3. Member Home → **Transfer** → Transfer form → **QR Code Ready**  
4. Member Home → **Shopping** → Product list → **Add to cart** → **Confirm order** → Use **KBTP Points + send SMS**

---

## 2) Goals & Non-Goals
### Goals
- Self-service profile management (Settings).
- Transparent transaction history (View all).
- Secure, fast point transfer (QR).
- Point redemption (shopping) with SMS confirmation.

### Non-Goals
- Cash/credit card/other payment gateways (points-only for this scope).
- Full merchant marketplace features.
- Advanced loyalty rule engine (static tier logic for now).

---

## 3) Personas
- **Member (End User):** Holds points; wants to view/transfer/use points and redeem benefits.
- **Support/CS:** Troubleshoots transfers and orders (via back office; outside this UI).

---

## 4) Assumptions & Constraints
- Points are integers (no decimals).
- Balance must be sufficient before any deduction.
- Transfer QR has an expiration (e.g., 5 minutes) and is single-use.
- Order confirmation must trigger **SMS** to the member.

---

## 5) User Flows & UI Mapping

### 5.1 Member Home (Card)
**Displays**
- Member tier (e.g., Gold), member name/ID, **points balance**.
- Quick actions: **Settings**, **Shopping**, **Transfer**.
- **Recent activity** list (earn/use/transfer) with +/- points and **View all** link.

**Acceptance**
- Tapping each quick action routes to the correct page.
- Balance reflects completed transactions in real time.

---

### 5.2 Settings
**Fields**
- Personal info: full name, phone, email.
- Shipping address (optional).
- Bank/return method (optional, future-use).

**Actions**
- Save changes with validation and feedback.

**Acceptance**
- Validates phone/email formats.
- Saves successfully and shows success/error states.

---

### 5.3 Transactions — View All
**Page**
- Tabs/filters: **All**, **Earned**, **Used**.
- Reverse chronological list; infinite scroll.
- Row detail: date/time, type, points, source/destination, reference/notes.

**Acceptance**
- Tab filters work correctly.
- Totals reconcile with balance and itemized entries.

---

### 5.4 Transfer → QR Code Ready
**Transfer Form**
- **Recipient** lookup by phone/member ID → show resolved recipient name.
- **Amount** input + quick chips (100/500/1000/1500…).
- **Note** (optional).
- **Create QR** (or Continue).

**QR Code Ready**
- Shows recipient card + **amount (points)**.
- Actions: **Cancel**, **Share/Save**, **Done**.
- When recipient scans & confirms:
  - Deduct from sender, credit recipient, create transaction entries for both, close session.
- Expired QR → clear error; allow new QR creation.

**Rules**
- Minimum transfer (e.g., ≥10 points).
- Sufficient balance required.
- Over daily/one-time limit → require OTP/secondary check (if configured).

**Acceptance**
- Valid input → QR generated.
- Successful scan → “Transfer success” entries appear for both accounts.
- Reuse/expired QR is rejected with clear messaging.

---

### 5.5 Shopping → Cart → Confirm Order → Points + SMS
**Catalog**
- Top bar shows **current points balance** (green banner per UI).
- Product list: image, name, **points cost**, stock status.
- **Add to cart** button per item.

**Cart**
- Items, quantities, subtotal (points), **projected remaining balance**.
- **Confirm order** button.

**Confirm Order**
- Order summary (items × qty, total points, resulting balance).
- On **Confirm**: atomic **points deduction**, create order & transactions, **send SMS**.

**SMS sample**
> “KBTP: Order #12345 confirmed. Used 2,000 pts. Remaining: 13,420 pts. See history in app.”

**Acceptance**
- Insufficient points → cannot confirm; shows actionable error.
- On success → points deducted, order created, history updated, SMS sent.

---

## 6) Functional Requirements

### 6.1 Wallet & Points
- Real-time balance display.
- Full transaction ledger (earn/use/transfer in/out, order).
- Atomic updates/locking for write operations.

### 6.2 Transfer (QR)
- Member directory lookup for recipients.
- Business rule validation (min/max, balance, daily caps).
- Create **transfer session** with short-lived token/QR (TTL ~5 min).
- On scan: verify session, perform atomic transfer, close/expire session.

### 6.3 Shopping
- Catalog with pagination; stock control.
- Cart: add/remove/edit quantity.
- Checkout: atomic point deduction; rollback on failure.
- Post-purchase: send **SMS** (and push notification if available).

### 6.4 Settings
- Update personal data with validation and audit log for key changes.

---

## 7) Non-Functional Requirements
- **Security:** TLS, OAuth/JWT, role-based access, anti-replay for QR, rate limits for transfers.
- **Performance:** Home P95 < 1.5s (cached balance + recent list); QR generation < 500ms.
- **Reliability:** Points operations are ACID-like; dual-entry or rollback on failure.
- **Accessibility:** WCAG AA-aligned labels, sizes, and touch targets.

---

## 8) High-Level Data Model
- **Member**(id, name, phone, email, tier, points_balance, created_at, updated_at)  
- **Transaction**(id, member_id, type\[earn|use|transfer_in|transfer_out|order], amount, ref_id, note, created_at)  
- **TransferSession**(id, from_member, to_member, amount, status\[pending|done|expired], expires_at, qr_payload)  
- **Product**(id, name, points_cost, stock, active)  
- **Order**(id, member_id, total_points, status, created_at)  
- **OrderItem**(id, order_id, product_id, qty, points_cost)  
- **Address**(id, member_id, …) *(optional)*

---

## 9) API (Examples)
**Profile & Wallet**
- `GET /me` → profile + points_balance  
- `GET /transactions?type=&cursor=`

**Transfer**
- `POST /transfer/sessions`  
  Request: `{ "to": "<phone|memberId>", "amount": 1000, "note": "…" }`  
  Response: `{ "session_id": "…", "qr_payload": "…" }`  
- `POST /transfer/sessions/{id}/confirm`

**Catalog & Orders**
- `GET /catalog/products?cursor=`  
- `POST /cart/items` `{ "product_id": "p1", "qty": 2 }`  
- `GET /cart`  
- `POST /orders` *(atomic points deduction + order creation)*

**Notifications**
- Internal call: `POST /notify/sms` `{ "to": "<phone>", "template": "order_confirm", "params": {...} }`

---

## 10) Validation & Business Rules
- Transfer min 10 pts; configurable per-transaction & daily caps.
- Post-transaction points must remain ≥ 0.
- QR is single-use and invalid after expiry.
- Product must have stock at checkout time.
- Idempotency key required for checkout to prevent double submit.

---

## 11) Edge Cases
- Re-scanning a used QR → reject (session=done).
- Network drop after deduction → ensure idempotent retry of SMS/receipt; no double charges.
- Stock change during checkout → show updated cart and require reconfirmation.

---

## 12) Analytics & Metrics
- **Transfer funnel:** Home → Start transfer → QR generated → Transfer success.
- **Shopping funnel:** Home → Shopping → Add to cart → Checkout → Success.

**KPIs**
- Transfer success rate ≥ 97%  
- Add-to-Cart → Checkout conversion ≥ 45%  
- Avg QR generation time < 0.5s  
- SMS delivery success ≥ 99%

---

## 13) QA & Acceptance Criteria (Summary)
- Home quick actions route correctly; balance updates after transactions.
- **Transfer:** valid inputs → QR generated; scan → success entries for both parties; expired/duplicate QR → clear error.
- **Shopping:** add to cart; if points sufficient → successful checkout; points deducted; order + history created; **SMS** sent.
- **Transactions View:** tabs filter correctly; totals reconcile with balance.

---

## 14) Out of Scope / Future Work
- Coupon/code redemption; multi-account linking.
- External merchant settlement integrations.
- Dynamic tier progression engine and advanced loyalty rules.
