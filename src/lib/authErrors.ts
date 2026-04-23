export function mapAuthError(raw: string): string {
  if (raw.startsWith('errors.')) return raw;
  const e = raw.toLowerCase();

  // Supabase error codes (reliable, version-stable)
  if (e === 'user_already_exists' || e === 'email_exists') return 'errors.IDENTITY_EXISTS';
  if (e === 'invalid_credentials') return 'errors.ACCESS_DENIED';
  if (e === 'email_not_confirmed') return 'errors.IDENTITY_UNVERIFIED';
  if (e === 'weak_password') return 'errors.KEY_INSUFFICIENT';
  if (e === 'over_email_send_rate_limit' || e === 'over_request_rate_limit') return 'errors.RATE_LIMIT_EXCEEDED';
  if (e === 'email_address_not_authorized' || e === 'email_address_invalid') return 'errors.INVALID_ADDRESS';
  if (e === 'same_password') return 'errors.KEY_MISMATCH';

  // Message-based fallbacks for older Supabase versions
  if (e.includes('invalid login') || e.includes('invalid credentials') || e.includes('invalid password'))
    return 'errors.ACCESS_DENIED';
  if (e.includes('email not confirmed') || e.includes('not confirmed'))
    return 'errors.IDENTITY_UNVERIFIED';
  if (e.includes('already registered') || e.includes('user already exists') || e.includes('already been registered'))
    return 'errors.IDENTITY_EXISTS';
  if (e.includes('password should be') || e.includes('weak_password') || e.includes('at least 6'))
    return 'errors.KEY_INSUFFICIENT';
  if (e.includes('invalid email') || e.includes('unable to validate') || e.includes('valid email'))
    return 'errors.INVALID_ADDRESS';
  if (e.includes('rate limit') || e.includes('too many') || e.includes('once every'))
    return 'errors.RATE_LIMIT_EXCEEDED';
  if (e.includes('do not match') || e.includes('mismatch'))
    return 'errors.KEY_MISMATCH';

  return 'errors.SYSTEM_FAULT';
}
