export function getToken() {
  return localStorage.getItem("token");
}

export function parseJwt(token) {
  if (!token) return null;
  const base64Url = token.split(".")[1];
  const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
  const jsonPayload = decodeURIComponent(
    atob(base64)
      .split("")
      .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
      .join("")
  );
  return JSON.parse(jsonPayload);
}

export function getClaims() {
  const token = getToken();
  return parseJwt(token);
}

export function isSuperuser() {
  const claims = getClaims();
  return claims?.is_superuser === true;
}