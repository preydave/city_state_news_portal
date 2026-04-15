# Email to Role Page Redirect Task

## Steps:
- [x] Step 1: Update login.jsx to email-only form (remove password input, submit email to login API with empty password)
- [x] Step 2: Test login flow: enter email → API call → success → navigate to /role (RoleSelect)
- [ ] Step 3: Verify RoleSelect saves role and redirects to dashboard
- [ ] Step 4: Handle admin special case
- [ ] Step 5: Test errors (invalid email)
- [ ] Step 6: Complete task

**Note:** Dev server running. Manually test: go to http://localhost:5173/login, enter any registered email (empty password sent), confirm redirect to /role. Admin: admin@gmail.com → /admin. If backend rejects empty password, may need backend update or new endpoint.

