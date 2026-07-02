# Security Policy

## Supported Versions

| Version | Supported          |
| ------- | ------------------ |
| 0.1.x   | :white_check_mark: |
| < 0.1   | :x:                |

## Reporting a Vulnerability

If you discover a security vulnerability within Falak, please send an email to [@7se7en72025](https://github.com/7se7en72025) on GitHub. All security vulnerabilities will be promptly addressed.

**Please do NOT report security vulnerabilities through public GitHub issues.**

### What to include

- Description of the vulnerability
- Steps to reproduce
- Potential impact
- Suggested fix (if any)

### Response timeline

- **Acknowledgment**: Within 48 hours
- **Initial assessment**: Within 1 week
- **Fix**: Depends on severity, typically within 2 weeks

## Security Best Practices

When using Falak in your project:

- Always use the latest version
- Keep dependencies updated (`npm update`)
- Run `npm audit` regularly for known vulnerabilities
- Use environment variables for sensitive data
- Never commit secrets to version control

## Dependencies

We regularly audit our dependencies using:

- GitHub Dependabot (automated updates)
- npm audit (vulnerability scanning)
- Trivy (Docker image scanning)
- CodeQL (SAST analysis)

## Disclosure Policy

We follow coordinated disclosure:

1. Reporter reports vulnerability privately
2. We acknowledge and investigate
3. We develop a fix
4. We release the fix
5. We publicly disclose the vulnerability

Thank you for helping keep Falak and its users safe.
