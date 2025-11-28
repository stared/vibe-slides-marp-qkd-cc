---
marp: true
theme: default
paginate: true
style: |
  section {
    background: linear-gradient(135deg, #0a0a2e 0%, #1a1a4e 100%);
    color: #e0e0ff;
    font-family: 'Helvetica Neue', Arial, sans-serif;
  }
  h1 {
    color: #00ffff;
    text-shadow: 0 0 20px #00ffff;
    font-size: 2.5em;
  }
  h2 {
    color: #00ffff;
    text-shadow: 0 0 15px #00ffff;
    font-size: 1.8em;
  }
  strong {
    color: #ff00ff;
  }
  em {
    color: #ffff00;
  }
  code {
    background: rgba(0, 255, 255, 0.2);
    color: #00ffff;
    padding: 2px 8px;
    border-radius: 4px;
  }
  ul {
    font-size: 1.1em;
  }
  section.title h1 {
    font-size: 2.8em;
    margin-top: 0.5em;
  }
  section.title h2 {
    color: #ff00ff;
    font-size: 1.4em;
    text-shadow: 0 0 10px #ff00ff;
  }
---

<!-- _class: title -->

![bg](./images/01_title.png)

# Device Independent QKD

## The Ultimate Secure Communication

### Hong Kong 2025

---

![bg right:55%](./images/02_security.png)

## Why Secure Communication?

- **Banking** - Your money, your secrets
- **Messaging** - Private conversations
- **Government** - National security
- **Business** - Trade secrets

The problem: **Eavesdroppers are everywhere**

---

![bg left:50%](./images/03_classical_crypto.png)

## The Classical Crypto Problem

Current encryption (RSA, AES) relies on **computational hardness**

- Hard to factor large numbers... *for now*
- **Quantum computers** will break RSA
- We need security based on **physics**, not math

---

![bg right:55%](./images/04_qkd_concept.png)

## Quantum Key Distribution

**Key insight**: Measuring quantum states *disturbs* them

- Send information encoded in quantum states
- Any eavesdropper leaves traces
- Detect intrusion *before* it's too late

But there's a catch...

---

![bg](./images/05_entanglement.png)

<!-- _class: title -->

# Entanglement

## "Spooky Action at a Distance" — Einstein

---

![bg left:45%](./images/05_entanglement.png)

## Quantum Entanglement

Two particles, **perfectly correlated**

- Measure one → instantly know the other
- Works across *any* distance
- Cannot be explained classically

Alice and Bob share entangled pairs across Hong Kong harbour

---

![bg right:50%](./images/06_bell_inequality.png)

## The Bell Inequality

Can correlations be explained by **hidden variables**?

John Bell (1964): Test it!

**CHSH inequality**:
`S ≤ 2` for any classical theory

Quantum mechanics predicts: `S ≤ 2√2 ≈ 2.83`

---

![bg left:50%](./images/07_bell_meaning.png)

## What Bell Violation Means

If `S > 2`:
- **No pre-determined strategy** could produce these results
- Correlations are *genuinely quantum*
- No hidden "puppet strings"

This is our **security foundation**

---

![bg right:55%](./images/08_device_independence.png)

## The Device Independence Insight

**Standard QKD problem**: Must trust your devices

- What if manufacturer has backdoor?
- What if hardware is compromised?
- What if Eve built your detector?

**DI-QKD solution**: Trust the *physics*, not the device

---

![bg](./images/09_diqkd_protocol.png)

---

![bg left:40%](./images/09_diqkd_protocol.png)

## How DI-QKD Works

1. Alice & Bob receive entangled photons
2. Perform **Bell test** on samples
3. If `S > 2` → Quantum correlations confirmed
4. Extract **secret key** from outcomes
5. Eve *cannot* fake Bell violation

**Security from physics alone**

---

![bg right:50%](./images/10_security_proof.png)

## Security Guarantee

**Monogamous correlations**:

If Alice-Bob are maximally entangled...
→ Eve gets **nothing**

- Quantum correlations cannot be shared
- Maximum correlation = Maximum security
- Mathematical proof, not assumption

---

![bg left:50%](./images/11_challenges.png)

## Current Challenges

- **Loophole-free** Bell tests required
- Need **high-efficiency** detectors (>80%)
- **Distance limitations** (current: ~400m)

**Future**:
- Satellite-based DI-QKD
- Quantum repeaters
- City-wide networks

---

![bg](./images/12_conclusion.png)

---

![bg right:50%](./images/12_conclusion.png)

## The Quantum Future

**DI-QKD** offers:
- Security based on *laws of physics*
- No need to trust devices
- Protection against *any* eavesdropper

Hong Kong: Ready to become a **quantum communication hub**?

---

<!-- _class: title -->

![bg](./images/01_title.png)

# Thank You!

## Questions?

### 多謝！有問題嗎？
