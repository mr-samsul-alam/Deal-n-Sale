import { useEffect, useState } from "react";

import { getAuth, onAuthStateChanged, GoogleAuthProvider, signInWithPopup, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, updateProfile } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import InitializeAuthentication from "../FireBase/FireBaseInit";

// initialize firebase app
InitializeAuthentication()

const UseFireBase = () => {
    const [user, setUser] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const [authError, setAuthError] = useState('');
    const [admin, setAdmin] = useState(false);
    const [superAdmin, setSuperAdmin] = useState(false);
    let navigate = useNavigate();

    const auth = getAuth();
    const googleProvider = new GoogleAuthProvider();

    // This is for sign in with Google
    const signUsingGoogle = (location) => {
        setIsLoading(true);
        signInWithPopup(auth, googleProvider)
            .then(result => {
                const destination = location?.state?.from || '/';
                navigate(destination)
                setAuthError('');
                const user = result.user
                setUser(user);
                saveUser(user?.email, user?.displayName, user?.photoURL, "undi", 'PUT')
            }).catch((error) => {
                setAuthError(error.message);
            })
            .finally(() => setIsLoading(false));
    }

    // Email Pass log In and Reg

    const registerUser = (email, password, name, phnNumber) => {
        setIsLoading(true);
        createUserWithEmailAndPassword(auth, email, password)
            .then((result) => {
                const newUser = { email, displayName: name }
                setUser(newUser);
                //save user to the database
                saveUser(email, name, "undi", phnNumber, 'POST');
                //send name to firebase after creation
                updateProfile(auth.currentUser, {
                    displayName: name
                }).then(() => {
                }).catch((error) => {
                });
                setAuthError('');
                navigate('/')
            })
            .catch((error) => {
                setAuthError(error.message);
            })
            .finally(() => setIsLoading(false));
    };

    const loginUser = (email, password, location,) => {
        setIsLoading(true);
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const destination = location?.state?.from || '/';
                navigate(destination);
                setAuthError('');
            })
            .catch((error) => {
                setAuthError(error.message);
            })
            .finally(() => setIsLoading(false));
    }

    useEffect(() => {
        fetch(`http://localhost:5000/admin/${user.email}`)
            .then(res => res.json())
            .then(data => setAdmin(data.admin))
    }, [user.email])

    useEffect(() => {
        const checkSuperAdmin = user?.email === 'contactsamsulalam@gmail.com'
        if (checkSuperAdmin) {
            setSuperAdmin(true)
        }

    }, [user.email])
    console.log(admin);
    console.log(superAdmin);
    // this is using for Log Out
    const logout = () => {
        setIsLoading(true);
        signOut(auth)
            .then(() => {
                setUser({})
            })
            .catch((error) => {
                setAuthError(error);
            }).finally(() => setIsLoading(false));
    }
    const saveUser = (email, displayName, photoURL, phnNumber, method) => {
        const user = { email, displayName, photoURL, phnNumber };
        fetch('http://localhost:5000/users', {
            method: method,
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(user)
        })
            .then()
    }

    // observer user state
    useEffect(() => {
        const unsubscribed = onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser(user);
            } else {
                setUser({})
            }
            setIsLoading(false);
        });
        return () => unsubscribed;
    }, [auth])
    return {
        user,
        superAdmin,
        signUsingGoogle,
        registerUser,
        admin,
        logout,
        loginUser,
        isLoading,
        authError
    }
};

export default UseFireBase;