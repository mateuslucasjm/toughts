const db = require("../config/firebase");

class UserService {
  static async findByEmail(email) {
    const snapshot = await db
      .collection("users")
      .where("email", "==", email)
      .get();

    if (snapshot.empty) return null;

    const doc = snapshot.docs[0];

    return {
      id: doc.id,
      ...doc.data(),
    };
  }

  static async create(userData) {
    const docRef = await db.collection("users").add(userData);

    return {
      id: docRef.id,
      ...userData,
    };
  }
}

module.exports = UserService;
