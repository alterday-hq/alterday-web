# AlterDay Privacy Policy

**Last updated:** April 26, 2026

---

## 1. Data Controller

The controller of your personal data is the AlterDay team, operating under the working name **AlterDay** (hereinafter: "AlterDay", "we", "us").

Contact: **privacy@alterday.app**

> *Note: Once formally registered as a legal entity, this section will be updated with full registration details.*

---

## 2. What Data We Collect

### 2.1 Account Data
- Email address
- Password hash (processed exclusively by Supabase Auth — we never store your password in plain text)
- Account registration date and time

### 2.2 Activity and Day Log Data
- Activity name (selected from library or entered manually)
- Activity duration (in minutes)
- Activity start time
- Satisfaction score (1–10 scale)
- Activity category (e.g., sport, learning, sleep)
- Entry date

### 2.3 Technical Data
- IP address (logged by Supabase during authentication)
- Device type, browser, and operating system
- Application error logs (if any occur)

### 2.4 OAuth Data (if you sign in via Google or GitHub)
- Name (if provided by the OAuth provider)
- Email address from the external account
- Account identifier from the OAuth provider

---

## 3. Purposes and Legal Bases for Processing

| Purpose | Legal basis (GDPR) |
|---|---|
| Creating and maintaining user account | Art. 6(1)(b) — performance of a contract |
| Generating alternative day simulations | Art. 6(1)(b) — performance of a contract |
| Personalizing the predictive model | Art. 6(1)(b) — performance of a contract |
| System security and fraud prevention | Art. 6(1)(f) — legitimate interests of the controller |
| Account-related email communication | Art. 6(1)(b) — performance of a contract |
| Aggregate analytics to improve the service | Art. 6(1)(f) — legitimate interests of the controller |

We do not process your data for marketing purposes without your explicit consent.

---

## 4. Data Retention

| Data category | Retention period |
|---|---|
| Account data (email, password hash) | Until account deletion |
| Activity entries and day logs | Until account deletion or upon your request |
| Authentication logs (IP, timestamp) | 90 days |
| Error logs | 30 days |

After the specified period or upon account deletion, data is permanently deleted from our systems and from the data processor's infrastructure (see section 5).

---

## 5. Data Processors

Your data is processed by the following sub-processors with whom we have entered into a data processing agreement:

### Supabase, Inc.
- **Role:** Database, authentication, and file storage provider
- **Headquarters:** 970 Toa Payoh North, Singapore 318992 / infrastructure on AWS
- **Data region:** EU (Frankfurt, eu-central-1) — data is stored within the European Economic Area
- **Supabase Privacy Policy:** https://supabase.com/privacy

Beyond Supabase, we do not share your personal data with any third parties, unless:
- We are required to do so by law (e.g., court order or regulatory authority),
- You have given explicit consent.

---

## 6. International Data Transfers

Authentication data may be transiently processed by Supabase infrastructure outside the EEA (e.g., AWS data centers in the US). Supabase uses Standard Contractual Clauses (SCC) approved by the European Commission as the transfer mechanism under Art. 46 GDPR.

---

## 7. Your Rights as a Data Subject

Under GDPR you have the following rights:

- **Right of access** (Art. 15) — request a copy of the data we process about you
- **Right to rectification** (Art. 16) — correct inaccurate or incomplete data
- **Right to erasure** (Art. 17) — request deletion of your data ("right to be forgotten")
- **Right to restriction** (Art. 18) — request restriction of processing
- **Right to data portability** (Art. 20) — receive your data in a machine-readable format
- **Right to object** (Art. 21) — object to processing based on legitimate interests
- **Right to withdraw consent** — if processing is based on consent, you may withdraw it at any time without affecting the lawfulness of processing done before withdrawal

To exercise any of these rights, contact us at: **privacy@alterday.app**

We will respond to your request within **30 days** of receipt.

---

## 8. Right to Lodge a Complaint

If you believe we are processing your data unlawfully, you have the right to lodge a complaint with a supervisory authority. In Poland, this is:

**President of the Personal Data Protection Office (UODO)**  
ul. Stawki 2, 00-193 Warsaw, Poland  
https://uodo.gov.pl  
kancelaria@uodo.gov.pl

If you reside in another EU country, you may also lodge a complaint with the supervisory authority in your country of residence.

---

## 9. Data Security

We implement the following technical and organisational measures to protect your data:

- Data in transit encryption (TLS 1.2+)
- Password hashing using bcrypt (handled by Supabase Auth)
- Data isolation between users at database level (Row Level Security in PostgreSQL)
- Access to production data restricted to core team members only

---

## 10. Cookies and Local Storage

The AlterDay web app uses `localStorage` exclusively to store:
- Color theme preference (light/dark)
- UI language preference

We do not use cookies for marketing or cross-site tracking. Session tokens are managed by Supabase Auth and stored in secure browser storage.

---

## 11. Children and Minors

AlterDay is intended for users who are at least **16 years old**. We do not knowingly collect personal data from children under 16. If you believe your child has provided us with data without your consent, please contact privacy@alterday.app and we will delete it promptly.

---

## 12. Changes to This Policy

We may update this Privacy Policy. For material changes, we will notify you at least **14 days** before they take effect — via an in-app notice or email. Continued use of the service after that date constitutes acceptance of the updated Policy.

---

## 13. Contact

For questions about this Privacy Policy or how we handle your data:

**Email:** privacy@alterday.app  
**Website:** https://alterday.app
