# GitHub Actions OIDC with AWS

This page summarizes why and how to use **OpenID Connect (OIDC)** so GitHub Actions can call AWS **without** storing long-lived access keys in repository secrets.

## Why OIDC

- **Short-lived credentials** issued at workflow run time.
- **No static keys** to rotate, leak, or duplicate across developers.
- **Fine-grained trust** via IAM conditions on repository, branch, or (with environments) deployment target.

## What you configure

1. **IAM OIDC identity provider** for `https://token.actions.githubusercontent.com` (audience `sts.amazonaws.com`).
2. **IAM role** with a **trust policy** that allows `sts:AssumeRoleWithWebIdentity` for your repo (example: `NickBaynham/calgentik`).
3. **IAM permissions policy** on that role for the actions you need (e.g. S3 sync, CloudFront invalidation).
4. **GitHub** repository variable `AWS_ROLE_TO_ASSUME` set to the role ARN.

In workflows, use:

```yaml
permissions:
  id-token: write
  contents: read

steps:
  - uses: aws-actions/configure-aws-credentials@v4
    with:
      role-to-assume: ${{ vars.AWS_ROLE_TO_ASSUME }}
      aws-region: ${{ vars.AWS_REGION }}
```

## Example policies

Full **example** trust and permission JSON (with `<aws-account-id>` and resource placeholders) lives in **[deployment.md](./deployment.md)** under *GitHub OIDC with AWS*.

## References

- [GitHub: Configuring OpenID Connect in Amazon Web Services](https://docs.github.com/en/actions/deployment/security-hardening-your-deployments/configuring-openid-connect-in-amazon-web-services)
- [AWS: Creating OpenID Connect (OIDC) identity providers](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_roles_providers_create_oidc.html)
