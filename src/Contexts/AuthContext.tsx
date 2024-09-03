import React, {
  createContext,
  ReactNode,
  useState,
  useContext,
  useEffect,
  Dispatch,
  SetStateAction,
} from "react";

// Define the shape of your user data
interface UserData {
  user: { role: string; id: string; email: string };
}

interface AuthContextProps {
  isAuthenticated: boolean;
  login: (userData: UserData) => void;
  logout: () => void;
  userData?: UserData | null;
  setUserData: Dispatch<SetStateAction<UserData | null>>;
}

// Define the type for AuthContext
type AuthContextType = AuthContextProps | undefined;

export const AuthContext = createContext<AuthContextType>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    const storedAuth = localStorage.getItem("isAuthenticated");
    return storedAuth ? JSON.parse(storedAuth) : false;
  });

  const [userData, setUserData] = useState<UserData | null>(() => {
    const storedUserData = localStorage.getItem("userData");
    return storedUserData ? JSON.parse(storedUserData) : null;
  });

  useEffect(() => {
    if (userData) {
      setIsAuthenticated(true);
    }
  }, [userData]);

  const login = (userData: UserData) => {
    setIsAuthenticated(true);
    setUserData(userData);
    console.log(userData);
    localStorage.setItem("isAuthenticated", JSON.stringify(true));
    localStorage.setItem("userData", JSON.stringify(userData));
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUserData(null);
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("userData");
    // resetCart(); // Clear cart items in the context
  };

  return (
    <AuthContext.Provider
      value={{
        userData,
        setUserData,
        login,
        logout,
        isAuthenticated,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
