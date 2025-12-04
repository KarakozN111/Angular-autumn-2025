import { Injectable } from '@angular/core';
import { Auth, user, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, User } from '@angular/fire/auth';
import { Firestore, doc, setDoc, updateDoc, arrayUnion, docData, getDoc } from '@angular/fire/firestore';
import { Observable, switchMap, of, from, catchError, map, take } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  currentUser$: Observable<User | null>;
  constructor(private auth: Auth, private firestore: Firestore) {
    this.currentUser$ = user(this.auth);
  }
  async uploadBase64(base64: string): Promise<void> {
    const currentUser = this.auth.currentUser;
    if (!currentUser) return;

    const userRef = doc(this.firestore, `users/${currentUser.uid}`);
    await updateDoc(userRef, { photoBase64: base64 });
  }

  async getUserPhoto(uid: string): Promise<string | null> {
    const userRef = doc(this.firestore, `users/${uid}`);
    const docSnap = await getDoc(userRef);
    if (docSnap.exists()) {
      return docSnap.data()?.['photoBase64'] || null;
    }
    return null;
  }
  login(email: string, password: string) {
    return signInWithEmailAndPassword(this.auth, email, password).then(async cred => {
      const userRef = doc(this.firestore, `users/${cred.user.uid}`);
      const docSnap = await getDoc(userRef);
      if (docSnap.exists()) {
        const serverFavs = docSnap.data()?.['favorites'] || [];
        const localFavs = JSON.parse(localStorage.getItem('favorites') || '[]');
        const mergedFavs = [...serverFavs, ...localFavs.filter(
          (lf: any) => !serverFavs.some((sf: any) => sf.id === lf.id)
        )];
        await updateDoc(userRef, { favorites: mergedFavs });
        localStorage.removeItem('favorites'); 
      }
      return cred;
    });
  }

  register(email: string, password: string) {
    return createUserWithEmailAndPassword(this.auth, email, password).then(cred => {
      const userRef = doc(this.firestore, `users/${cred.user.uid}`);
      return setDoc(userRef, { email, favorites: [] }).then(() => cred);
    });
  }

  logout() {
    return signOut(this.auth);
  }

addFavorite(movie: { id: string; title: string; link: string }) {
  return this.currentUser$.pipe(
    switchMap(user => {
      if (user) {
        const userRef = doc(this.firestore, `users/${user.uid}`);
        return from(updateDoc(userRef, { favorites: arrayUnion(movie) })).pipe(
          catchError(err => {
            alert('Failed to update favorites (offline?)');
            return of(null);
          })
        );
      } else {
       
        return of(null).pipe(
          switchMap(() => {
            throw new Error('Please log in to add favorites');
          })
        );
      }
    })
  );
}


  getFavorites(): Observable<any[]> {
    return this.currentUser$.pipe(
      switchMap(user => {
        if (user) {
          const userRef = doc(this.firestore, `users/${user.uid}`);
          return docData(userRef).pipe(
            map((data: any) => data?.favorites || []),
            catchError(err => {
              console.warn('Failed to load favorites:', err);
              return of([]);
            })
          );
        } else {
          const localFavs = JSON.parse(localStorage.getItem('favorites') || '[]');
          return of(localFavs);
        }
      })
    );
  }

async removeFavorite(movieId: string): Promise<void> {
  const uid = (await this.currentUser$.pipe(take(1)).toPromise())?.uid;
  if (!uid) return;

  const docRef = doc(this.firestore, 'users', uid);
  const userDoc = await getDoc(docRef);
  if (!userDoc.exists()) return;

  const currentFavs = userDoc.data()?.['favorites'] || [];
  const updatedFavs = currentFavs.filter((f: any) => f.id !== movieId);

  await updateDoc(docRef, { favorites: updatedFavs });
}

}