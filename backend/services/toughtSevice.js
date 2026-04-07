const db = require("../config/firebase");

class ToughtService {
  static async create(data) {
    const doc = await db.collection("toughts").add({
      title: data.title,
      userId: data.userId,
      createdAt: new Date(),
    });

    return {
      id: doc.id,
      ...data,
    };
  }

  static async getAll() {
    const snapshot = await db
      .collection("toughts")
      .orderBy("createdAt", "desc")
      .get();

    const toughts = await Promise.all(
      snapshot.docs.map(async (doc) => {
        const data = doc.data();

        let userName = "Anônimo";

        if (data.userId) {
          const userDoc = await db.collection("users").doc(data.userId).get();
          if (userDoc.exists) {
            userName = userDoc.data().name;
          }
        }

        return {
          id: doc.id,
          ...data,
          userName,
        };
      }),
    );

    return toughts;
  }

  static async getByUser(userId) {
    const snapshot = await db
      .collection("toughts")
      .where("userId", "==", userId)
      .get();

    return snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
  }

  static async getById(id) {
    const doc = await db.collection("toughts").doc(id).get();

    if (!doc.exists) return null;

    const data = doc.data();

    let userName = "Anônimo";

    if (data.userId) {
      const userDoc = await db.collection("users").doc(data.userId).get();
      if (userDoc.exists) {
        userName = userDoc.data().name;
      }
    }

    return {
      id: doc.id,
      ...data,
      userName,
    };
  }

  static async delete(id, userId) {
    const doc = await db.collection("toughts").doc(id).get();

    if (!doc.exists) return null;

    const data = doc.data();

    if (data.userId !== userId) {
      throw new Error("Não autorizado");
    }

    await db.collection("toughts").doc(id).delete();
  }

  static async update(id, userId, title) {
    const docRef = db.collection("toughts").doc(id);
    const doc = await docRef.get();

    if (!doc.exists) return null;

    const data = doc.data();

    if (data.userId !== userId) {
      throw new Error("Não autorizado");
    }

    await docRef.update({ title });

    return { id, title };
  }
}

module.exports = ToughtService;
