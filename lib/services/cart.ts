/**
 * Cart service – enforces one-store cart rule (BR-001)
 */
import {
  doc,
  getDoc,
  setDoc,
  updateDoc,
  collection,
  addDoc,
  deleteDoc,
  getDocs,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "@/lib/firebase/client";

export async function getCart(customerId: string) {
  const cartRef = doc(db, "carts", customerId);
  const snap = await getDoc(cartRef);
  if (!snap.exists()) return null;
  return { id: snap.id, ...snap.data() };
}

export async function addToCart(
  customerId: string,
  storeId: string,
  item: { storeProductId: string; productId: string; quantity: number }
) {
  const cartRef = doc(db, "carts", customerId);
  const cartSnap = await getDoc(cartRef);

  if (cartSnap.exists()) {
    const data = cartSnap.data();
    if (data.storeId && data.storeId !== storeId) {
      throw new Error("ONE_STORE_CART: Clear cart or switch store before adding items from another store.");
    }
  }

  // Ensure cart exists
  await setDoc(
    cartRef,
    {
      storeId,
      status: "active",
      updatedAt: serverTimestamp(),
      createdAt: cartSnap.exists() ? cartSnap.data().createdAt : serverTimestamp(),
    },
    { merge: true }
  );

  // Add / update item
  const itemsRef = collection(db, "carts", customerId, "items");
  await addDoc(itemsRef, {
    ...item,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });
}

export async function clearCart(customerId: string) {
  const itemsRef = collection(db, "carts", customerId, "items");
  const snap = await getDocs(itemsRef);
  await Promise.all(snap.docs.map((d) => deleteDoc(d.ref)));
  await updateDoc(doc(db, "carts", customerId), {
    storeId: null,
    updatedAt: serverTimestamp(),
  });
}
