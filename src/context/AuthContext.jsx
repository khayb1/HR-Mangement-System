import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "../supabase";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 1. Define the role fetcher inside useEffect to avoid dependency issues
    const getRoleAndSetUser = async (session) => {
      if (session?.user) {
        const { data: profile, error } = await supabase
          .from("profile")
          .select("role")
          .eq("id", session.user.id)
          .single();

        setUser(session.user);
        setRole(profile?.role || null);
      } else {
        setUser(null);
        setRole(null);
      }
      setLoading(false);
    };

    // 2. Run initial session check
    supabase.auth.getSession().then(({ data: { session } }) => {
      getRoleAndSetUser(session);
    });

    // 3. Listen for Auth changes
    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        // If the user signs out, clear state immediately
        if (event === "SIGNED_OUT") {
          setUser(null);
          setRole(null);
          setLoading(false);
        } else if (session) {
          getRoleAndSetUser(session);
        }
      }
    );

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  return (
    <AuthContext.Provider value={{ user, role, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
