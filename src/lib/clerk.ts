// Safe user data extraction for client components
export const extractUserData = (user: any) => {
  if (!user) return { name: "Demo User", email: "Demo User" };
  
  return {
    name: user.fullName || user.emailAddresses?.[0]?.emailAddress || "Demo User",
    email: user.emailAddresses?.[0]?.emailAddress || "Demo User"
  };
}; 