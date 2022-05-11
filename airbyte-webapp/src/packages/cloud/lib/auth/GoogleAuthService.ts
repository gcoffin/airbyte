import {
  Auth,
  User,
  UserCredential,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithEmailLink,
  sendPasswordResetEmail,
  confirmPasswordReset,
  updateProfile,
  applyActionCode,
  sendEmailVerification,
  EmailAuthProvider,
  reauthenticateWithCredential,
  updatePassword,
  updateEmail,
  AuthErrorCodes,
} from "firebase/auth";

import { Provider } from "config";
import { FieldError } from "packages/cloud/lib/errors/FieldError";
import { ErrorCodes } from "packages/cloud/services/auth/types";

interface AuthService {
  login(email: string, password: string): Promise<UserCredential>;

  signOut(): Promise<void>;

  signUp(email: string, password: string): Promise<UserCredential>;

  reauthenticate(email: string, passwordPassword: string): Promise<UserCredential>;

  updatePassword(newPassword: string): Promise<void>;

  resetPassword(email: string): Promise<void>;

  finishResetPassword(code: string, newPassword: string): Promise<void>;

  sendEmailVerifiedLink(): Promise<void>;

  updateEmail(email: string, password: string): Promise<void>;

  signInWithEmailLink(email: string): Promise<UserCredential>;
}

export class GoogleAuthService implements AuthService {
  constructor(private firebaseAuthProvider: Provider<Auth>) {}

  get auth(): Auth {
    return this.firebaseAuthProvider();
  }

  getCurrentUser(): User | null {
    return this.auth.currentUser;
  }

  async login(email: string, password: string): Promise<UserCredential> {
    return signInWithEmailAndPassword(this.auth, email, password).catch((err) => {
      switch (err.code) {
        case AuthErrorCodes.INVALID_EMAIL:
          throw new FieldError("email", ErrorCodes.Invalid);
        case AuthErrorCodes.USER_CANCELLED:
        case AuthErrorCodes.USER_DISABLED:
          throw new FieldError("email", "disabled");
        case AuthErrorCodes.USER_DELETED:
          throw new FieldError("email", "notfound");
        case AuthErrorCodes.INVALID_PASSWORD:
          throw new FieldError("password", ErrorCodes.Invalid);
      }

      throw err;
    });
  }

  async signUp(email: string, password: string): Promise<UserCredential> {
    if (password.length < 12) {
      throw new FieldError("password", "signup.password.minLength");
    }
    return createUserWithEmailAndPassword(this.auth, email, password).catch((err) => {
      switch (err.code) {
        case AuthErrorCodes.EMAIL_EXISTS:
          throw new FieldError("email", ErrorCodes.Duplicate);
        case AuthErrorCodes.INVALID_EMAIL:
          throw new FieldError("email", ErrorCodes.Invalid);
        case AuthErrorCodes.WEAK_PASSWORD:
          throw new FieldError("password", ErrorCodes.Validation);
      }

      throw err;
    });
  }

  async updateProfile(displayName: string): Promise<void> {
    if (this.auth.currentUser === null) {
      throw new Error("Not able to update profile for not loggedIn user!");
    }
    return updateProfile(this.auth.currentUser, { displayName });
  }

  async reauthenticate(email: string, password: string): Promise<UserCredential> {
    if (this.auth.currentUser === null) {
      throw new Error("You must log in first to reauthenticate!");
    }
    const credential = EmailAuthProvider.credential(email, password);
    return reauthenticateWithCredential(this.auth.currentUser, credential);
  }

  async updatePassword(newPassword: string): Promise<void> {
    if (this.auth.currentUser === null) {
      throw new Error("You must log in first to update password!");
    }
    return updatePassword(this.auth.currentUser, newPassword);
  }

  async updateEmail(email: string, password: string): Promise<void> {
    const user = await this.getCurrentUser();

    if (user) {
      await this.reauthenticate(email, password);

      try {
        await updateEmail(user, email);
      } catch (e) {
        switch (e.code) {
          case AuthErrorCodes.INVALID_EMAIL:
            throw new FieldError("email", ErrorCodes.Invalid);
          case AuthErrorCodes.EMAIL_EXISTS:
            throw new FieldError("email", ErrorCodes.Duplicate);
          case AuthErrorCodes.CREDENTIAL_TOO_OLD_LOGIN_AGAIN:
            throw new Error("auth/requires-recent-login");
        }
      }
    }
  }

  async resetPassword(email: string): Promise<void> {
    return sendPasswordResetEmail(this.auth, email);
  }

  async finishResetPassword(code: string, newPassword: string): Promise<void> {
    return confirmPasswordReset(this.auth, code, newPassword);
  }

  async sendEmailVerifiedLink(): Promise<void> {
    const currentUser = this.getCurrentUser();

    if (!currentUser) {
      console.error("sendEmailVerifiedLink should be used within auth flow");
      throw new Error("user is not authorised");
    }

    return sendEmailVerification(currentUser);
  }

  async confirmEmailVerify(code: string): Promise<void> {
    return applyActionCode(this.auth, code);
  }

  async signInWithEmailLink(email: string): Promise<UserCredential> {
    try {
      return await signInWithEmailLink(this.auth, email);
    } catch (e) {
      switch (e?.code) {
        case AuthErrorCodes.INVALID_EMAIL:
          throw new Error("The email provided does not match the email address sent to this invite.");
        case AuthErrorCodes.INVALID_OOB_CODE:
          // Maybe they already activated the link?
          throw new Error("This invite link is no longer valid.");
        case AuthErrorCodes.EXPIRED_OOB_CODE:
          // TODO - Resend invitation
          throw new Error("This invite link has expired.");

        default:
          break;
      }

      throw e;
    }
  }

  signOut(): Promise<void> {
    return this.auth.signOut();
  }
}
