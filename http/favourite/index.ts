import { database } from "@/utils/firebase";
import { ref, child, get, set, push, remove } from "firebase/database";

export async function getUserFavourite(_userRef: string) {
  try {
    const userRef = _userRef.replace(/@gmail.com/g, "");
    const snapshot = await get(child(ref(database), `/favourite/${userRef}`));
    if (snapshot.exists()) {
      return snapshot.val();
    }
    return [];
  } catch (e: any) {
    throw new Error(e.message);
  }
}

export async function addUserFavourite(_userRef: string, payload: any) {
  try {
    const userRef = _userRef.replace(/@gmail.com/g, "");
    const newListRef = push(ref(database, `/favourite/${userRef}`));
    await set(newListRef, payload);
    return true;
  } catch (e: any) {
    throw new Error(e.message);
  }
}

export async function deleteUserFavourite(_userRef: string, id: number) {
  try {
    const userRef = _userRef.replace(/@gmail.com/g, "");
    const snapshot = await getUserFavourite(userRef);
    let dataRef = "";
    for (const key in snapshot) {
      if (snapshot[key].id === id) {
        dataRef = key;
        break;
      }
    }
    await remove(ref(database, `/favourite/${userRef}/${dataRef}`));
    return true;
  } catch (e: any) {
    throw new Error(e.message);
  }
}
