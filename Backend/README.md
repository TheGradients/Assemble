# User Controller

### UNPROTECTED ROUTES
- REGISTER - `/api/v1/users/register` ✅
    - VERIFY CODE - `/api/v1/users/verifyCode` ✅
- LOGIN - `/api/v1/users/login` ✅
- FORGOT USERNAME - `/api/v1/users/forgotUsername` ✅
- FORGOT PASSWORD - `/api/v1/users/forgotPasswordVerificationEmail` ✅
    - VERIFY CODE - `/api/v1/users/forgotPasswordVerificationCode` ✅
    - RESET PASSWORD - `/api/v1/users/forgotPassword` ✅

### PROTECTED ROUTES
- LOGOUT - `/api/v1/users/logout` ✅
- ADD DETAILS - `/api/v1/users/addDetails` ✅
- CHANGE EMAIL - `/api/v1/users/changeEmail` ✅
    - VERIFY EMAIL - `/api/v1/users/verifyNewEmail` ✅
- CHANGE USERNAME - `/api/v1/users/changeUsername` ✅
- CHANGE PASSWORD - `/api/v1/users/changePassword` ✅
- USER DATA - `/api/v1/users/data` ✅

# Game ID Controller

### PROTECTED ROUTES
- BGMI ID - `/api/v1/users/games/bgmi` ✅
- CODM ID - `/api/v1/users/games/codm` ✅
- VALORANT ID - `/api/v1/users/games/valorant` ✅
- FREEFIRE ID - `/api/v1/users/games/freefire` ✅
- ASPHALT ID - `/api/v1/users/games/asphalt` ✅