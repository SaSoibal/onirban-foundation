# Contributing Guide

## How to Contribute

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes
4. Run tests (`npm test` and `php artisan test`)
5. Commit your changes (`git commit -m 'Add amazing feature'`)
6. Push to the branch (`git push origin feature/amazing-feature`)
7. Open a Pull Request

## Code Standards

### Backend (Laravel)
- Follow PSR-12 coding standards
- Use Laravel Pint for code formatting
- Use PHPStan for static analysis (level 5)
- Write tests for new features
- Use Form Requests for validation
- Use API Resources for responses

### Frontend (React)
- Use functional components with hooks
- Follow React best practices
- Use Tailwind CSS for styling
- Write tests for new components
- Use the existing component structure

## Commit Messages

- Use conventional commits: `feat:`, `fix:`, `docs:`, `test:`, `chore:`
- Keep commits atomic and focused
- Write clear, descriptive commit messages

## Pull Request Guidelines

- Fill out the PR template completely
- Link related issues
- Ensure all tests pass
- Update documentation if needed
- Keep PRs focused on a single feature/fix

## Code Review

- All PRs require at least one review
- Reviewers check for:
  - Code quality and standards
  - Test coverage
  - Documentation updates
  - Security considerations

## Reporting Bugs

Please use the bug report template and include:
- Steps to reproduce
- Expected vs actual behavior
- Environment details
- Screenshots if applicable

## Suggesting Features

Please use the feature request template and include:
- Problem description
- Proposed solution
- Alternatives considered
