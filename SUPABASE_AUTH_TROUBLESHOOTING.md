
# Supabase Auth Troubleshooting Guide

## 1. Common Auth Errors and Solutions

### Error 500: Database error querying schema
**Symptom:** Auth requests fail with a 500 Internal Server Error, and logs indicate issues querying the auth schema.
**Cause:** This typically happens when the internal `auth` schema is corrupted, missing tables (`auth.users`, `auth.identities`), or blocked by misconfigured triggers/RLS policies.
**Solution:**
1. Run diagnostic queries to ensure tables exist.
2. Temporarily disable Row Level Security on auth tables.
3. Drop custom triggers attached to `auth.users` that might be failing.

### Error 401: Invalid login credentials
**Symptom:** User cannot log in despite confirming email/password.
**Cause:** Incorrect password, deleted user, or unconfirmed email (if email confirmations are enforced).
**Solution:**
1. Reset the user's password.
2. Check `auth.users` table to ensure the user exists and `email_confirmed_at` is set (if required).

---

## 2. How to Verify Supabase Schema Integrity

You can run these SQL commands in the Supabase SQL Editor to verify the `auth` schema exists and is functional:

