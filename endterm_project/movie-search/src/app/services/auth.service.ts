import { Injectable } from '@angular/core';
import { Auth, user, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, User } from '@angular/fire/auth';
import { Firestore, doc, setDoc, updateDoc, arrayUnion, docData, getDoc } from '@angular/fire/firestore';
import { Observable, switchMap, of, map, take } from 'rxjs';
//5
export interface FavoriteMovie {
  id: string;
  title: string;
  link: string;
  poster?: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  //7 RxJS для реальной логики  AuthService - работа с состоянием пользователя:

  currentUser$: Observable<User | null>;
  private localKey = 'favorites';//9 

  constructor(private auth: Auth, private firestore: Firestore) {
    this.currentUser$ = user(this.auth);//1 observable
  }
  // 8 LOCAL STORAGE
  private getLocalFavorites(): FavoriteMovie[] {
    return JSON.parse(localStorage.getItem(this.localKey) || '[]');//9 taking from local
  }
  private saveLocalFavorites(favs: FavoriteMovie[]) {
    localStorage.setItem(this.localKey, JSON.stringify(favs));//saving to local
  }

  // FAVORITES
  addFavorite(movie: FavoriteMovie): Promise<void> {
    const u = this.auth.currentUser;

    if (!u) {
      //ОФФЛАЙН СТРАТЕГИЯ: сохраняем в LocalStorage при отсутствии сети/авторизации
      const local = this.getLocalFavorites();
      if (!local.find(f => f.id === movie.id)) {
        local.push(movie);
        this.saveLocalFavorites(local);
      }
      return Promise.resolve();
    }

    const ref = doc(this.firestore, `users/${u.uid}`);// 9 auth users
    return updateDoc(ref, { favorites: arrayUnion(movie) })
      .catch(async () => {
        await setDoc(ref, { favorites: [movie] });
      });
  }

  removeFavorite(id: string): Promise<void> {
    const u = this.auth.currentUser;

    if (!u) {
      const local = this.getLocalFavorites().filter(f => f.id !== id);
      this.saveLocalFavorites(local);
      return Promise.resolve();
    }

    const ref = doc(this.firestore, `users/${u.uid}`);
    return getDoc(ref).then(snapshot => {
      const data = snapshot.data();
      const updated = (data?.['favorites'] || []).filter((f: FavoriteMovie) => f.id !== id);
      return updateDoc(ref, { favorites: updated });
    });
  }
//7 Получение избранных с merge логикой:
  getFavoritesMerged(): Observable<FavoriteMovie[]> {
    return this.currentUser$.pipe(
      switchMap(user => {
        if (!user) return of(this.getLocalFavorites());

        const ref = doc(this.firestore, `users/${user.uid}`);
        return docData(ref).pipe(
          map((data: any) => data?.favorites || []),
          take(1),

          // Слияние локальных и серверных данных при восстановлении сети
         map(serverFavs => {
          const local = this.getLocalFavorites();
          if (local.length) {
            const merged = [...serverFavs];
            local.forEach(l => {
              if (!merged.find(f => f.id === l.id)) merged.push({ ...l, poster: l.poster || '' 
      });
    });
    setDoc(ref, { favorites: merged });
    localStorage.removeItem(this.localKey);
    alert('Local favorites merged with account.');
    return merged;
  }
  return serverFavs.map((f: { poster: any; }) => ({...f, poster: f.poster || '' 

  }));
})); }));}

  // PROFILE PHOTO
async uploadProfilePhoto(file: File): Promise<string | null> {
  const currentUser = this.auth.currentUser;
  if (!currentUser) return null;

  // 10 Сжимаем через Web Worker
  const compressedBase64 = await this.compressImageWithWorker(file);

  const userRef = doc(this.firestore, `users/${currentUser.uid}`);
  await updateDoc(userRef, { photoBase64: compressedBase64 });//10 saving to firestore

  return compressedBase64;
}

async getUserPhoto(uid: string): Promise<string | null> {
  const userRef = doc(this.firestore, `users/${uid}`);
  const docSnap = await getDoc(userRef);
  if (!docSnap.exists()) return null;
  return docSnap.data()?.['photoBase64'] || null;//8 caching photo, 10 getting base64 from firestore 
}
compressImage(file: File, quality: number): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const img = new Image();
      img.src = reader.result as string;
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        if (!ctx) return reject('Canvas not supported');

        // Пропорции изображения
        const maxWidth = 500;
        const scale = Math.min(maxWidth / img.width, 1);
        canvas.width = img.width * scale;
        canvas.height = img.height * scale;

        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        const compressed = canvas.toDataURL('image/jpeg', quality);
        resolve(compressed);
      };
      img.onerror = reject;
    };
    reader.onerror = reject;
  });}
  async compressImageWithWorker(file: File, quality = 0.5, maxWidth = 500): Promise<string> {
  return new Promise((resolve, reject) => {
    //10 Вызов Web Worker из AuthService:
    const worker = new Worker(new URL('../workers/image-compress.worker', import.meta.url), { type: 'module' });

    worker.postMessage({ file, quality, maxWidth });

    worker.onmessage = ({ data }) => {
      if (data.error) reject(data.error);
      else resolve(data.base64);
      worker.terminate();
    };

    worker.onerror = (err) => {
      reject(err.message);
      worker.terminate();
    };
  });
}

  //1 AUTH
  login(email: string, password: string): Promise<any> {
    return signInWithEmailAndPassword(this.auth, email, password).then(async cred => {
      const userRef = doc(this.firestore, `users/${cred.user.uid}`);
      const docSnap = await getDoc(userRef);
      if (docSnap.exists()) {
        const serverFavs = docSnap.data()?.['favorites'] || [];
        const localFavs = JSON.parse(localStorage.getItem(this.localKey) || '[]');
        const mergedFavs = [...serverFavs, ...localFavs.filter(
          (lf: FavoriteMovie) => !serverFavs.some((sf: FavoriteMovie) => sf.id === lf.id)
        )];
        await updateDoc(userRef, { favorites: mergedFavs });
        localStorage.removeItem(this.localKey);
      }
      return cred;
    });
  }
//1 
  register(email: string, password: string): Promise<any> {
    return createUserWithEmailAndPassword(this.auth, email, password).then(cred => {
      const userRef = doc(this.firestore, `users/${cred.user.uid}`);
      return setDoc(userRef, { email, favorites: [] }).then(() => cred);
    });
  }
//1
  logout(): Promise<void> {
    return signOut(this.auth);
  }
}