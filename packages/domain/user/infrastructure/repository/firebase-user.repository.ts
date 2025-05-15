import { FirebaseServerService } from "@ebuddy/backend/core/service/firebase-server.service";
import { IUserRepository } from "../../repository/user-repository.interface";
import { User } from "@ebuddy/types/entities/user";
import { injectable } from "tsyringe";

const USERS_COLLECTION = "USERS";

@injectable()
export class FirebaseUserRepository implements IUserRepository {
  constructor(private firebaseServerService: FirebaseServerService) {}

  async getUserById(userId: string): Promise<User | null> {
    try {
      // Get user from Firebase Auth
      const authUser = await this.firebaseServerService.app
        .auth()
        .getUser(userId)
        .catch(() => null);

      if (!authUser) {
        return null;
      }

      // Try to get additional user data from Firestore
      const userSnapshot = await this.firebaseServerService.app
        .firestore()
        .collection(USERS_COLLECTION)
        .doc(userId)
        .get();

      // Combine data from Auth and Firestore
      const userData: Partial<User> = {
        id: authUser.uid,
        email: authUser.email || null,
        displayName: authUser.displayName || null,
        createdAt: authUser.metadata.creationTime || new Date().toISOString(),
        updatedAt: authUser.metadata.lastSignInTime || new Date().toISOString(),
      };

      // If we have additional data in Firestore, merge it
      if (userSnapshot.exists) {
        const firestoreData = userSnapshot.data() || {};
        Object.assign(userData, firestoreData);
      } else {
        // If user doesn't exist in Firestore yet, create the document
        await this.firebaseServerService.app
          .firestore()
          .collection(USERS_COLLECTION)
          .doc(userId)
          .set(userData);
      }

      return userData as User;
    } catch (error) {
      console.error("Error fetching user:", error);
      throw error;
    }
  }

  async updateUser(userId: string, userData: Partial<User>): Promise<User> {
    try {
      // Add timestamp
      const updatedData = {
        ...userData,
        updatedAt: new Date().toISOString(),
      };

      // Remove id from data to prevent overwriting document ID
      const { id, ...dataToUpdate } = updatedData as any;
      
      // Update Firebase Auth user if displayName is provided
      if (userData.displayName) {
        const authUpdateData: Record<string, any> = {};
        
        if (userData.displayName) {
          authUpdateData.displayName = userData.displayName;
        }
        
        // Update the Firebase Auth user
        await this.firebaseServerService.app
          .auth()
          .updateUser(userId, authUpdateData);
      }

      // Update Firestore document
      await this.firebaseServerService.app
        .firestore()
        .collection(USERS_COLLECTION)
        .doc(userId)
        .update(dataToUpdate);

      // Get updated user
      return this.getUserById(userId) as Promise<User>;
    } catch (error) {
      console.error("Error updating user:", error);
      throw error;
    }
  }
}
