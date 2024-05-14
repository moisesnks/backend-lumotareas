// Path: utils/index.js


export const parsearFecha = (fecha) => {
    const fechaUnix = fecha.seconds * 1000 + fecha.nanoseconds / 1000000;
    return new Date(fechaUnix);
}

export const extraerReferencia = (referencia) => {
    if (referencia && referencia.path) {
        const segments = referencia.path.split('/');
        return segments[segments.length - 1];
    }
    return null;
};

export const generatePhotoURL = (displayName) => {
    const avatarUrl = `https://ui-avatars.com/api/?name=${encodeURIComponent(displayName)}&background=${randomColor()}&color=fff&size=200`;
    return avatarUrl;
};

export const getUserDataFromRef = async (userRef) => {
    const userDoc = await getDoc(userRef);
    return userDoc.exists() ? userDoc.data() : null;
};

export const getUserRefs = async (userIds) => {
    const userRefsPromises = userIds.map(userId => {
        const userRef = doc(db, 'users', userId);
        return getDoc(userRef);
    });

    const userSnapshots = await Promise.all(userRefsPromises);
    return userSnapshots.filter(snapshot => snapshot.exists).map(snapshot => snapshot.ref);
};