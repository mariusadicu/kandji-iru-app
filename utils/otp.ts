import * as OTPAuth from 'otpauth';

export function generateOtpCode(secret: string) {
  const totp = new OTPAuth.TOTP({
    secret: secret,
    digits: 6,
    period: 30,
    algorithm: 'SHA1',
  });

  return totp.generate();
}